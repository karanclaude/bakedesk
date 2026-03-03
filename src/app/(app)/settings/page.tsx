'use client';

import { usePreferences } from '@/lib/hooks/usePreferences';
import { BUSINESS_TYPES, BUSINESS_STAGES, CURRENCIES } from '@/types';
import { APP_NAME } from '@/lib/constants';

export default function SettingsPage() {
  const { preferences, setPreferences } = usePreferences();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
      <h1 className="font-heading text-xl font-bold text-brand-dark mb-1">Settings</h1>
      <p className="text-sm text-brand-muted mb-6">
        Personalize {APP_NAME} so the AI gives you more relevant advice
      </p>

      <div className="space-y-6">
        {/* Business Profile */}
        <section className="bg-white rounded-xl border border-brand-accent p-5">
          <h2 className="font-heading text-base font-bold text-brand-dark mb-4">Business Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-brand-dark mb-1">Business Name</label>
              <input
                type="text"
                value={preferences.businessName || ''}
                onChange={(e) => setPreferences({ businessName: e.target.value })}
                placeholder="e.g. Sweet Surrender Bakery"
                className="w-full px-3 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-brand-dark mb-1">Business Type</label>
              <select
                value={preferences.businessType || ''}
                onChange={(e) => setPreferences({ businessType: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
              >
                <option value="">Select your business type</option>
                {BUSINESS_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-brand-dark mb-1">Business Stage</label>
              <select
                value={preferences.stage || ''}
                onChange={(e) => setPreferences({ stage: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
              >
                <option value="">Select your stage</option>
                {BUSINESS_STAGES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-brand-dark mb-1">Location</label>
                <input
                  type="text"
                  value={preferences.location || ''}
                  onChange={(e) => setPreferences({ location: e.target.value })}
                  placeholder="e.g. Mumbai, India"
                  className="w-full px-3 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-brand-dark mb-1">Currency</label>
                <select
                  value={preferences.currency || '₹'}
                  onChange={(e) => setPreferences({ currency: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.symbol} value={c.symbol}>
                      {c.symbol} — {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="bg-white rounded-xl border border-brand-accent p-5">
          <h2 className="font-heading text-base font-bold text-brand-dark mb-3">About</h2>
          <div className="space-y-2 text-sm text-brand-muted">
            <p><strong className="text-brand-dark">{APP_NAME}</strong> — Your AI Bakery Business Consultant</p>
            <p>Built by TruffleNation Pastry Academy</p>
            <p className="text-xs">Version 1.0.0 · PWA Enabled</p>
          </div>
        </section>

        {/* Data */}
        <section className="bg-white rounded-xl border border-brand-accent p-5">
          <h2 className="font-heading text-base font-bold text-brand-dark mb-3">Data</h2>
          <p className="text-xs text-brand-muted mb-3">
            All data is stored locally on your device. Clearing data will remove all conversations and preferences.
          </p>
          <button
            onClick={() => {
              if (confirm('This will delete all your conversations and preferences. Are you sure?')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="px-4 py-2 rounded-lg border border-danger text-danger text-sm font-medium hover:bg-danger/5 transition-colors"
          >
            Clear All Data
          </button>
        </section>
      </div>
    </div>
  );
}
