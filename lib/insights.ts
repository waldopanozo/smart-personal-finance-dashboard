import type { Expense, ExpenseCategory } from './types';

function totalByCategory(expenses: Expense[]): Record<ExpenseCategory, number> {
  const base: Record<ExpenseCategory, number> = {
    Comida: 0,
    Transporte: 0,
    Vivienda: 0,
    Ocio: 0,
    Salud: 0,
    Otros: 0,
  };
  for (const e of expenses) {
    base[e.category] += e.amount;
  }
  return base;
}

/**
 * “Insights” con lógica legible (estilo asistente) sin LLM obligatorio.
 * Podés sustituir por Vercel AI / OpenAI si configurás API keys.
 */
export function buildInsights(expenses: Expense[]): string[] {
  if (expenses.length === 0) {
    return [
      'Aún no hay gastos registrados. Agregá el primero para ver tendencias y el gráfico por categoría.',
    ];
  }

  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const byCat = totalByCategory(expenses);
  const entries = Object.entries(byCat) as [ExpenseCategory, number][];
  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  const [topCat, topAmt] = sorted[0];
  const share = total > 0 ? Math.round((topAmt / total) * 100) : 0;

  const fmt = (n: number) =>
    n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });

  const lines: string[] = [
    `Gasto total registrado: ${fmt(total)} (${expenses.length} movimientos).`,
    `La categoría con mayor peso es «${topCat}» (~${share}% del total).`,
  ];

  const last = [...expenses].sort((a, b) => b.date.localeCompare(a.date))[0];
  lines.push(
    `Último movimiento: ${last.note || '(sin nota)'} — ${fmt(last.amount)} (${last.date}).`,
  );

  if (share > 45) {
    lines.push(
      `Sugerencia: «${topCat}» concentra casi la mitad o más del gasto; conviene revisar suscripciones o compras recurrentes.`,
    );
  } else {
    lines.push('Distribución relativamente balanceada entre categorías.');
  }

  return lines;
}
