'use client';

import { Sparkles } from 'lucide-react';

export function InsightsPanel({ lines }: { lines: string[] }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sky-300">
        <Sparkles className="h-5 w-5 shrink-0" aria-hidden />
        <h3 className="text-sm font-semibold tracking-wide">Insights inteligentes</h3>
      </div>
      <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
        {lines.map((line, i) => (
          <li key={i} className="rounded-lg border border-sky-500/10 bg-sky-500/5 px-3 py-2">
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
