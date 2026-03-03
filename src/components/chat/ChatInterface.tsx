'use client';

import { useEffect, useRef } from 'react';
import { useChat } from '@/lib/hooks/useChat';
import { useConversations } from '@/lib/hooks/useConversations';
import { usePreferences } from '@/lib/hooks/usePreferences';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';

interface ChatInterfaceProps {
  conversationId?: string;
}

export function ChatInterface({ conversationId }: ChatInterfaceProps) {
  const { preferences } = usePreferences();
  const { messages, isLoading, sendMessage, stopGenerating, resetChat, loadMessages } =
    useChat(preferences);
  const { saveConversation, getConversation } = useConversations();
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(
    conversationId || `conv_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
  );

  // Load existing conversation
  useEffect(() => {
    if (conversationId) {
      const existing = getConversation(conversationId);
      if (existing) {
        loadMessages(existing.messages);
        idRef.current = conversationId;
      }
    }
  }, [conversationId, getConversation, loadMessages]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Save conversation when messages change (skip initial welcome-only state)
  useEffect(() => {
    if (messages.length > 1) {
      saveConversation(idRef.current, messages);
    }
  }, [messages, saveConversation]);

  const handleNewChat = () => {
    idRef.current = `conv_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    resetChat();
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-3.5rem-4.5rem)] sm:h-[calc(100dvh-3.5rem)]">
      {/* New chat button */}
      <div className="px-4 py-2 flex justify-end">
        <button
          onClick={handleNewChat}
          className="text-xs text-brand-muted hover:text-brand-primary border border-brand-accent hover:border-brand-primary/30 px-3 py-1.5 rounded-lg transition-colors"
        >
          + New Chat
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4">
        <div className="max-w-3xl mx-auto space-y-4 pb-4">
          {messages.map((msg, i) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isStreaming={isLoading && i === messages.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Input */}
      <ChatInput
        onSend={sendMessage}
        onStop={stopGenerating}
        isLoading={isLoading}
      />
    </div>
  );
}
