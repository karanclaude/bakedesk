'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserPreferences } from '@/types';
import { STORAGE_KEYS } from '@/lib/constants';

const DEFAULT_PREFERENCES: UserPreferences = {
  businessType: '',
  businessName: '',
  location: '',
  currency: 'INR',
  stage: '',
};

export function usePreferences(isAuthenticated?: boolean) {
  const [preferences, setPreferencesState] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load from localStorage first
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      if (stored) {
        setPreferencesState({ ...DEFAULT_PREFERENCES, ...JSON.parse(stored) });
      }
    } catch {}

    // Then overlay from DB if authenticated
    if (isAuthenticated) {
      fetch('/api/preferences')
        .then((r) => r.json())
        .then((data) => {
          if (data.preferences) {
            const merged = { ...DEFAULT_PREFERENCES, ...data.preferences };
            setPreferencesState(merged);
            try {
              localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(merged));
            } catch {}
          }
        })
        .catch(() => {})
        .finally(() => setLoaded(true));
    } else {
      setLoaded(true);
    }
  }, [isAuthenticated]);

  const setPreferences = useCallback(
    (update: Partial<UserPreferences>) => {
      setPreferencesState((prev) => {
        const next = { ...prev, ...update };
        try {
          localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(next));
        } catch {}

        if (isAuthenticated) {
          fetch('/api/preferences', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(next),
          }).catch(() => {});
        }

        return next;
      });
    },
    [isAuthenticated]
  );

  const resetPreferences = useCallback(() => {
    setPreferencesState(DEFAULT_PREFERENCES);
    try {
      localStorage.removeItem(STORAGE_KEYS.PREFERENCES);
    } catch {}
  }, []);

  return { preferences, setPreferences, resetPreferences, loaded };
}
