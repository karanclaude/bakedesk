'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';

function ChatContent() {
  const params = useSearchParams();
  const conversationId = params.get('id') || undefined;

  return <ChatInterface conversationId={conversationId} />;
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64 text-brand-muted">
          Loading chat...
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
