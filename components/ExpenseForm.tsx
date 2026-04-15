'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import type { ExpenseCategory } from '@/lib/types';

const CATEGORIES: ExpenseCategory[] = [
  'Comida',
  'Transporte',
  'Vivienda',
  'Ocio',
  'Salud',
  'Otros',
];

export function ExpenseForm({
  onAdd,
}: {
  onAdd: (e: {
    amount: number;
    category: ExpenseCategory;
    note: string;
    date: string;
  }) => void;
}) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Comida');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const n = parseFloat(amount.replace(',', '.'));
    if (Number.isNaN(n) || n <= 0) return;
    onAdd({ amount: n, category, note: note.trim(), date });
    setAmount('');
    setNote('');
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Monto
          <input
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            value={amount}
            onChange={(ev) => setAmount(ev.target.value)}
            className="rounded-xl border border-white/10 bg-slate-900/50 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-sky-400/40"
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Categoría
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value as ExpenseCategory)}
            className="rounded-xl border border-white/10 bg-slate-900/50 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-sky-400/40"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm text-slate-300">
        Nota
        <input
          type="text"
          placeholder="Ej. Supermercado, nafta…"
          value={note}
          onChange={(ev) => setNote(ev.target.value)}
          className="rounded-xl border border-white/10 bg-slate-900/50 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-sky-400/40"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-300">
        Fecha
        <input
          type="date"
          value={date}
          onChange={(ev) => setDate(ev.target.value)}
          className="rounded-xl border border-white/10 bg-slate-900/50 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-sky-400/40"
          required
        />
      </label>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500/90 px-4 py-2.5 text-sm font-medium text-slate-950 shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
      >
        <Plus className="h-4 w-4" aria-hidden />
        Registrar gasto
      </button>
    </form>
  );
}
