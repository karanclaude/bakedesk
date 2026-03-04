'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthContext } from '@/components/providers/AuthProvider';

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthContext();

  const title =
    pathname === '/chat'
      ? 'Chat'
      : pathname === '/toolkit'
        ? 'Toolkit'
        : pathname?.startsWith('/toolkit/')
          ? 'Tool'
          : pathname === '/history'
            ? 'History'
            : pathname === '/settings'
              ? 'Settings'
              : 'BakeDesk';

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-bg/90 backdrop-blur-md border-b border-brand-accent">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Link href="/">
            <Image src="/logo.svg" alt="BakeDesk" width={32} height={32} />
          </Link>
          <h1 className="font-heading text-lg font-bold text-brand-primary">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {[
              { href: '/chat', label: 'Chat' },
              { href: '/toolkit', label: 'Toolkit' },
              { href: '/history', label: 'History' },
              { href: '/settings', label: 'Settings' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-brand-primary text-white'
                    : 'text-brand-muted hover:text-brand-primary hover:bg-brand-accent/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth button */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-xs text-brand-muted hover:text-brand-primary border border-brand-accent px-2.5 py-1 rounded-lg transition-colors"
              title={user?.email || ''}
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="text-xs text-brand-primary border border-brand-primary/30 px-2.5 py-1 rounded-lg hover:bg-brand-primary hover:text-white transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
