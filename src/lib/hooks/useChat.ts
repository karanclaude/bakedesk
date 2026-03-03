'use client';

import { useState, useCallback, useRef } from 'react';
import { Message, UserPreferences } from '@/types';
import { WELCOME_MESSAGE } from '@/lib/constants';

function createMessage(role: 'user' | 'assistant', content: string): Message {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    timestamp: Date.now(),
  };
}

export function useChat(preferences?: UserPreferences) {
  const [messages, setMessages] = useState<Message[]>([
    createMessage('assistant', WELCOME_MESSAGE),
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      setError(null);
      const userMsg = createMessage('user', content.trim());
      const assistantMsg = createMessage('assistant', '');

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setIsLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        // Build messages for API (skip welcome message)
        const apiMessages = [...messages.filter((m) => m.id !== messages[0]?.id), userMsg].map(
          (m) => ({ role: m.role, content: m.content })
        );

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: apiMessages,
            preferences: preferences || undefined,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `Request failed (${response.status})`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response stream');

        const decoder = new TextDecoder();
        let accumulated = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          accumulated += decoder.decode(value, { stream: true });

          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              content: accumulated,
            };
            return updated;
          });
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;

        const errorMessage =
          err instanceof Error ? err.message : 'Something went wrong. Please try again.';
        setError(errorMessage);

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content:
              "I'm sorry, I couldn't process that request. Please check that the API key is configured and try again.",
          };
          return updated;
        });
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [messages, isLoading, preferences]
  );

  const stopGenerating = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
  }, []);

  const loadMessages = useCallback((msgs: Message[]) => {
    setMessages(msgs);
  }, []);

  const resetChat = useCallback(() => {
    setMessages([createMessage('assistant', WELCOME_MESSAGE)]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    stopGenerating,
    loadMessages,
    resetChat,
  };
}
