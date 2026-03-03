'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '@/types';

interface MessageBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

export function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[88%] sm:max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-brand-primary text-white rounded-br-md'
            : 'bg-white border border-brand-accent rounded-bl-md'
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        ) : (
          <div
            className={`chat-markdown text-sm ${
              isStreaming && !message.content ? 'typing-cursor' : ''
            }`}
          >
            {message.content ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            ) : (
              <span className="typing-cursor text-brand-muted">Thinking</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
