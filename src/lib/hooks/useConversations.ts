'use client';

import { useState, useEffect, useCallback } from 'react';
import { Conversation, Message } from '@/types';
import { STORAGE_KEYS } from '@/lib/constants';

const MAX_CONVERSATIONS = 50;

function loadLocalConversations(): Conversation[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveLocalConversations(conversations: Conversation[]) {
  try {
    localStorage.setItem(
      STORAGE_KEYS.CONVERSATIONS,
      JSON.stringify(conversations.slice(0, MAX_CONVERSATIONS))
    );
  } catch {}
}

function generateTitle(messages: Message[]): string {
  const firstUser = messages.find((m) => m.role === 'user');
  if (!firstUser) return 'New Conversation';
  const text = firstUser.content.slice(0, 60);
  return text.length < firstUser.content.length ? text + '...' : text;
}

export function useConversations(isAuthenticated?: boolean) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/conversations')
        .then((r) => r.json())
        .then((data) => {
          if (data.conversations?.length) {
            setConversations(data.conversations);
            saveLocalConversations(data.conversations);
          } else {
            setConversations(loadLocalConversations());
          }
        })
        .catch(() => setConversations(loadLocalConversations()))
        .finally(() => setLoaded(true));
    } else {
      setConversations(loadLocalConversations());
      setLoaded(true);
    }
  }, [isAuthenticated]);

  const saveConversation = useCallback(
    (id: string, messages: Message[]) => {
      setConversations((prev) => {
        const title = generateTitle(messages);
        const existing = prev.find((c) => c.id === id);
        let next: Conversation[];

        if (existing) {
          next = prev.map((c) =>
            c.id === id ? { ...c, messages, title, updatedAt: Date.now() } : c
          );
        } else {
          const newConv: Conversation = {
            id,
            title,
            messages,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          next = [newConv, ...prev];
        }

        next.sort((a, b) => b.updatedAt - a.updatedAt);
        saveLocalConversations(next);

        if (isAuthenticated) {
          fetch('/api/conversations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, title, messages }),
          }).catch(() => {});
        }

        return next;
      });
    },
    [isAuthenticated]
  );

  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => {
        const next = prev.filter((c) => c.id !== id);
        saveLocalConversations(next);
        return next;
      });

      if (isAuthenticated) {
        fetch(`/api/conversations/${id}`, { method: 'DELETE' }).catch(() => {});
      }
    },
    [isAuthenticated]
  );

  const getConversation = useCallback(
    (id: string): Conversation | undefined => {
      return conversations.find((c) => c.id === id);
    },
    [conversations]
  );

  const clearAll = useCallback(() => {
    setConversations([]);
    try {
      localStorage.removeItem(STORAGE_KEYS.CONVERSATIONS);
    } catch {}
  }, []);

  return {
    conversations,
    loaded,
    saveConversation,
    deleteConversation,
    getConversation,
    clearAll,
  };
}
