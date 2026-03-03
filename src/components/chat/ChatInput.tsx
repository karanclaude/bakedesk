'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop?: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSend, onStop, isLoading, disabled }: ChatInputProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  }, [text]);

  const handleSubmit = () => {
    if (!text.trim() || isLoading || disabled) return;
    onSend(text);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-brand-bg border-t border-brand-accent px-4 py-3">
      <div className="max-w-3xl mx-auto flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about pricing, marketing, licensing..."
          rows={1}
          disabled={disabled}
          className="flex-1 resize-none rounded-xl border border-brand-accent bg-white px-4 py-2.5 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary disabled:opacity-50 placeholder:text-brand-muted/60"
        />
        {isLoading ? (
          <button
            onClick={onStop}
            className="shrink-0 bg-danger text-white h-10 w-10 rounded-xl flex items-center justify-center hover:bg-danger/90 transition-colors"
            title="Stop generating"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <rect width="14" height="14" rx="2" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || disabled}
            className="shrink-0 bg-brand-primary text-white h-10 w-10 rounded-xl flex items-center justify-center hover:bg-brand-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            title="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
