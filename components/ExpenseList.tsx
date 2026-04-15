'use client';

import { Trash2 } from 'lucide-react';
import type { Expense } from '@/lib/types';

export function ExpenseList({
  expenses,
  onRemove,
}: {
  expenses: Expense[];
  onRemove: (id: string) => void;
}) {
  if (expenses.length === 0) {
    return (
      <p className="text-center text-sm text-slate-500">No hay gastos todavía.</p>
    );
  }

  return (
    <ul className="max-h-72 space-y-2 overflow-y-auto pr-1">
      {expenses.map((e) => (
        <li
          key={e.id}
          className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-slate-900/40 px-3 py-2 text-sm"
        >
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-slate-100">
              {e.amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}{' '}
              <span className="text-slate-400">· {e.category}</span>
            </p>
            {e.note ? (
              <p className="truncate text-xs text-slate-500">{e.note}</p>
            ) : null}
            <p className="text-xs text-slate-600">{e.date}</p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(e.id)}
            className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-red-500/15 hover:text-red-400"
            aria-label="Eliminar gasto"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </li>
      ))}
    </ul>
  );
}
