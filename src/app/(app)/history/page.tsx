'use client';

import { useRouter } from 'next/navigation';
import { useConversations } from '@/lib/hooks/useConversations';

export default function HistoryPage() {
  const router = useRouter();
  const { conversations, deleteConversation } = useConversations();

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
      <h1 className="font-heading text-xl font-bold text-brand-dark mb-1">Chat History</h1>
      <p className="text-sm text-brand-muted mb-6">Your past conversations with BakeDesk AI</p>

      {conversations.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">💬</div>
          <h3 className="font-semibold text-brand-dark mb-1">No conversations yet</h3>
          <p className="text-sm text-brand-muted mb-4">Start chatting with BakeDesk to see your history here</p>
          <button
            onClick={() => router.push('/chat')}
            className="px-4 py-2 bg-brand-primary text-white rounded-xl text-sm font-medium"
          >
            Start a Chat
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className="bg-white rounded-xl border border-brand-accent p-4 hover:border-brand-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <button
                  onClick={() => router.push(`/chat?id=${conv.id}`)}
                  className="flex-1 text-left"
                >
                  <h3 className="text-sm font-semibold text-brand-dark line-clamp-1">
                    {conv.title}
                  </h3>
                  <p className="text-xs text-brand-muted mt-1">
                    {conv.messages.length} messages · {formatDate(conv.updatedAt)}
                  </p>
                </button>
                <button
                  onClick={() => deleteConversation(conv.id)}
                  className="shrink-0 text-brand-muted hover:text-danger text-lg leading-none"
                  title="Delete conversation"
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
