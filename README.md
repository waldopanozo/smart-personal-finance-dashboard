# Smart Personal Finance Dashboard

Aplicación web para **registrar gastos**, ver **distribución por categoría** (gráfico tipo dona con **Chart.js**) y **insights** generados en el cliente a partir de tus datos. UI en **tema oscuro** con acentos tipo **glassmorphism**, iconos **Lucide**. Pensada para el taller **Vibe Coding / AI-Driven UI** (Cursor + despliegue en **Vercel**).

## Stack

| Herramienta | Uso |
|-------------|-----|
| Next.js 14 | App Router, SSR/SSG según página |
| TypeScript | Tipado |
| Tailwind CSS | Estilos, tema oscuro, paneles “glass” |
| lucide-react | Iconos |
| chart.js + react-chartjs-2 | Gráfico de gastos por categoría |

Los gastos se guardan en **localStorage** del navegador (no requiere base de datos para la demo).

## Requisitos

- Node.js 18+ (recomendado: 20, ver `.node-version` para fnm)

## Desarrollo local

```bash
cd smart-personal-finance-dashboard
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Despliegue en Vercel

1. Subí el proyecto a un **repositorio GitHub** (esta carpeta como raíz del repo o monorepo con `root` apuntando aquí).
2. En [vercel.com/new](https://vercel.com/new) importá el repo; framework **Next.js** (detección automática).
3. Build: `npm run build`, output por defecto de Next.js.
4. Copiá la **URL de producción** (p. ej. `https://tu-app.vercel.app`) para la entrega del curso.

## Entrega del taller (checklist)

- [ ] Enlace al **repositorio** (GitHub u otro).
- [ ] **URL en producción** (Vercel).

## Roadmap del brief (sugerido)

1. **Project genesis**: describí en Composer el stack y la visión del dashboard.
2. **Context research**: `@Web` para benchmark de dashboards financieros recientes.
3. **Visual polish**: prompts con *glassmorphism* y esquema oscuro (ya aplicado en `globals.css` + clases `glass-panel`).

## Licencia

MIT
