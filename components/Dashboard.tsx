'use client';

import { PiggyBank, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { buildInsights } from '@/lib/insights';
import { useLocalExpenses } from '@/lib/useLocalExpenses';
import { ExpenseChart } from './ExpenseChart';
import { ExpenseForm } from './ExpenseForm';
import { ExpenseList } from './ExpenseList';
import { InsightsPanel } from './InsightsPanel';

export function Dashboard() {
  const { expenses, add, remove, ready } = useLocalExpenses();

  const insights = useMemo(() => buildInsights(expenses), [expenses]);

  const total = useMemo(
    () => expenses.reduce((s, e) => s + e.amount, 0),
    [expenses],
  );

  if (!ready) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate-400">
        Cargando…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-10 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-1 text-xs font-medium text-sky-200">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden />
          Vibe Coding · AI-Driven UI
        </div>
        <h1 className="bg-gradient-to-r from-sky-200 to-indigo-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
          Smart Personal Finance
        </h1>
        <p className="mt-2 text-slate-400">
          Gastos en el navegador (local) · Gráfico por categoría · Insights automáticos
        </p>
      </header>

      <div className="mb-6 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
        <span className="inline-flex items-center gap-2">
          <PiggyBank className="h-4 w-4 text-amber-300" aria-hidden />
          Total:{' '}
          <strong className="text-lg text-white">
            {total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
          </strong>
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="glass-panel p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Nuevo gasto</h2>
          <ExpenseForm onAdd={add} />
        </section>

        <section className="glass-panel p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Distribución</h2>
          <ExpenseChart expenses={expenses} />
        </section>

        <section className="glass-panel p-6 lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-white">Insights</h2>
          <InsightsPanel lines={insights} />
        </section>

        <section className="glass-panel p-6 lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-white">Movimientos</h2>
          <ExpenseList expenses={expenses} onRemove={remove} />
        </section>
      </div>

      <footer className="mt-12 text-center text-xs text-slate-600">
        Datos solo en tu navegador (localStorage). Desplegá en Vercel para compartir la demo.
      </footer>
    </div>
  );
}
