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

export function usePreferences() {
  const [preferences, setPreferencesState] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      if (stored) {
        setPreferencesState({ ...DEFAULT_PREFERENCES, ...JSON.parse(stored) });
      }
    } catch {}
    setLoaded(true);
  }, []);

  const setPreferences = useCallback((update: Partial<UserPreferences>) => {
    setPreferencesState((prev) => {
      const next = { ...prev, ...update };
      try {
        localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferencesState(DEFAULT_PREFERENCES);
    try {
      localStorage.removeItem(STORAGE_KEYS.PREFERENCES);
    } catch {}
  }, []);

  return { preferences, setPreferences, resetPreferences, loaded };
}
