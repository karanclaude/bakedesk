'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/chat', label: 'Chat', icon: '💬' },
  { href: '/toolkit', label: 'Toolkit', icon: '🧰' },
  { href: '/history', label: 'History', icon: '📋' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-brand-accent">
      <div
        className="grid grid-cols-4 h-16"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors ${
                isActive ? 'text-brand-primary' : 'text-brand-muted'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
