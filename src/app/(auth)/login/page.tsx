'use client';

import Link from 'next/link';
import { useState } from 'react';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const supabaseReady = isSupabaseConfigured();

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-3xl">🧁</span>
            <span className="font-heading text-2xl font-bold text-brand-primary">
              BakeDesk
            </span>
          </Link>
          <p className="text-brand-muted text-sm">
            Sign in to sync your conversations across devices
          </p>
        </div>

        {!supabaseReady ? (
          <div className="bg-white rounded-xl p-6 border border-brand-accent text-center">
            <p className="text-brand-muted text-sm mb-4">
              Auth is not configured yet. BakeDesk works fully without an
              account — your data is saved locally on this device.
            </p>
            <Link
              href="/chat"
              className="inline-block bg-brand-primary text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-brand-primary/90 transition-colors"
            >
              Continue to Chat
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-6 border border-brand-accent">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
                  placeholder="••••••••"
                />
              </div>
              <button className="w-full bg-brand-primary text-white py-2.5 rounded-lg font-medium text-sm hover:bg-brand-primary/90 transition-colors">
                Sign In
              </button>
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/chat"
                className="text-sm text-brand-muted hover:text-brand-primary transition-colors"
              >
                Skip — continue without account
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
