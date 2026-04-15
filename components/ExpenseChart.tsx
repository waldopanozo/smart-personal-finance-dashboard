'use client';

import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  type ChartData,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import type { Expense, ExpenseCategory } from '@/lib/types';

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS: Record<ExpenseCategory, string> = {
  Comida: 'rgba(251, 191, 36, 0.9)',
  Transporte: 'rgba(56, 189, 248, 0.9)',
  Vivienda: 'rgba(167, 139, 250, 0.9)',
  Ocio: 'rgba(244, 114, 182, 0.9)',
  Salud: 'rgba(52, 211, 153, 0.9)',
  Otros: 'rgba(148, 163, 184, 0.9)',
};

function aggregate(expenses: Expense[]) {
  const map = new Map<ExpenseCategory, number>();
  const cats: ExpenseCategory[] = [
    'Comida',
    'Transporte',
    'Vivienda',
    'Ocio',
    'Salud',
    'Otros',
  ];
  for (const c of cats) map.set(c, 0);
  for (const e of expenses) {
    map.set(e.category, (map.get(e.category) ?? 0) + e.amount);
  }
  return map;
}

export function ExpenseChart({ expenses }: { expenses: Expense[] }) {
  const agg = aggregate(expenses);
  const labels = Array.from(agg.keys()).filter((k) => (agg.get(k) ?? 0) > 0);
  const dataVals = labels.map((k) => agg.get(k) ?? 0);
  const bg = labels.map((k) => COLORS[k]);

  const data: ChartData<'doughnut'> = {
    labels,
    datasets: [
      {
        data: dataVals,
        backgroundColor: bg,
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  if (labels.length === 0) {
    return (
      <div className="flex h-56 items-center justify-center text-sm text-slate-400">
        Sin datos para el gráfico. Agregá gastos con monto mayor a 0.
      </div>
    );
  }

  return (
    <div className="mx-auto h-56 w-full max-w-xs">
      <Doughnut
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#e2e8f0',
                padding: 12,
                font: { size: 11 },
              },
            },
          },
        }}
      />
    </div>
  );
}
