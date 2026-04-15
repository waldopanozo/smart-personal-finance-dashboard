'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Expense } from './types';

const STORAGE_KEY = 'smart-finance-expenses-v1';

function load(): Expense[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Expense[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useLocalExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setExpenses(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses, ready]);

  const add = useCallback((e: Omit<Expense, 'id'>) => {
    const id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setExpenses((prev) => [{ ...e, id }, ...prev]);
  }, []);

  const remove = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((x) => x.id !== id));
  }, []);

  return { expenses, add, remove, ready };
}
