# Smart Personal Finance Dashboard

Aplicación web para **registrar gastos**, ver **distribución por categoría** (gráfico tipo dona con **Chart.js**) y **insights** generados en el cliente. UI en **tema oscuro** con acentos tipo **glassmorphism** e iconos **Lucide**. Proyecto del taller **Vibe Coding / AI-Driven UI** (Cursor + **Vercel**).

---

## Enlaces del proyecto

| Recurso | Enlace |
|---------|--------|
| **Aplicación en producción (Vercel)** | **[https://smart-personal-finance-dashboard-rho.vercel.app/](https://smart-personal-finance-dashboard-rho.vercel.app/)** |
| **Código fuente (GitHub)** | [github.com/waldopanozo/smart-personal-finance-dashboard](https://github.com/waldopanozo/smart-personal-finance-dashboard) |

> Los datos de gastos se guardan en **localStorage del navegador**; cada visitante ve su propia sesión. En producción la URL anterior sirve la misma app que en local.

---

## Índice

1. [Descripción y funcionalidades](#descripción-y-funcionalidades)
2. [Stack técnico](#stack-técnico)
3. [Requisitos y Node (fnm)](#requisitos-y-node-fnm)
4. [Instalación y desarrollo local](#instalación-y-desarrollo-local)
5. [Build de producción local](#build-de-producción-local)
6. [Despliegue en Vercel](#despliegue-en-vercel)
7. [Error: Output Directory `public`](#error-output-directory-public-en-vercel)
8. [Entrega del taller (checklist)](#entrega-del-taller-checklist)
9. [Roadmap del brief](#roadmap-del-brief)
10. [Estructura del repositorio](#estructura-del-repositorio)
11. [Licencia](#licencia)

---

## Descripción y funcionalidades

- **Alta de gastos:** monto, categoría (Comida, Transporte, Vivienda, Ocio, Salud, Otros), nota y fecha.
- **Listado y eliminación** de movimientos.
- **Gráfico de dona** con agregación por categoría (Chart.js).
- **Insights** en texto generados en el cliente (`lib/insights.ts`) a partir de totales y tendencias (sin backend obligatorio).
- Persistencia solo en el **navegador** (`localStorage`, clave `smart-finance-expenses-v1`).

---

## Stack técnico

| Herramienta | Uso |
|-------------|-----|
| Next.js 14 | App Router |
| TypeScript | Tipado |
| Tailwind CSS | Tema oscuro, utilidades `glass-panel`, fondo en `app/globals.css` |
| lucide-react | Iconos |
| chart.js + react-chartjs-2 | Gráfico de gastos por categoría |

---

## Requisitos y Node (fnm)

- **Node.js** 18+ (recomendado **20**, ver `.node-version` para [fnm](https://github.com/Schniz/fnm)).

```bash
cd smart-personal-finance-dashboard
fnm use
npm install
```

---

## Instalación y desarrollo local

```bash
cd smart-personal-finance-dashboard
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000). El comportamiento es el mismo que en la **URL de Vercel**, salvo que los datos son locales a tu máquina.

---

## Build de producción local

```bash
npm run build
npm start
```

Por defecto el servidor escucha en el puerto **3000** (salvo que definas `PORT`).

---

## Despliegue en Vercel

Este proyecto está **desplegado** en:

**[https://smart-personal-finance-dashboard-rho.vercel.app/](https://smart-personal-finance-dashboard-rho.vercel.app/)**

Pasos típicos (por si replicás el flujo o conectás otro repo):

1. Repositorio en **GitHub**: [waldopanozo/smart-personal-finance-dashboard](https://github.com/waldopanozo/smart-personal-finance-dashboard).
2. En [vercel.com/new](https://vercel.com/new) importar el proyecto; framework **Next.js** (detección automática).
3. Comando de build: `npm run build`; directorio de salida el predeterminado de Next.js.
4. Tras el deploy, Vercel asigna un dominio `*.vercel.app` (en este caso el listado arriba).

Cada push a la rama conectada puede disparar un **nuevo despliegue** según la configuración del proyecto en Vercel.

En la raíz del repo hay un **`vercel.json`** con `"framework": "nextjs"` para que Vercel trate el proyecto como **Next.js** (salida en `.next/`, no en `public/`).

---

### Error: Output Directory `public` en Vercel

Si ves: *No Output Directory named "public" found after the Build completed*:

1. **Next.js no usa `public` como carpeta de salida del build.** Esa carpeta es solo para archivos estáticos (imágenes, etc.). El build genera **`.next/`** y Vercel lo entiende solo si el preset es Next.js.
2. En [Vercel](https://vercel.com) → tu proyecto → **Settings** → **General** → **Build & Development Settings**:
   - **Framework Preset:** **Next.js**
   - **Output Directory:** dejalo **vacío** o en **Default** (no pongas `public`, ni `out`, ni `.next` a mano salvo que sepas lo que hacés).
   - **Build Command:** `npm run build` (o vacío para autodetección).
   - **Install Command:** `npm install` (o vacío).
3. Si el repo está dentro de un **monorepo**, configurá **Root Directory** apuntando a la carpeta donde está este `package.json`.
4. Guardá, volvé a desplegar (**Redeploy**).

No hace falta definir `outputDirectory` en `vercel.json` para esta app (no usamos `next export`).

---

## Entrega del taller (checklist)

Requisitos habituales del brief *Smart Personal Finance Dashboard*:

| Requisito | Estado |
|-----------|--------|
| Enlace al **repositorio** (código) | [GitHub — smart-personal-finance-dashboard](https://github.com/waldopanozo/smart-personal-finance-dashboard) |
| **URL de producción** (Vercel) | [https://smart-personal-finance-dashboard-rho.vercel.app/](https://smart-personal-finance-dashboard-rho.vercel.app/) |

---

## Roadmap del brief

1. **Project genesis:** stack y visión del dashboard (Composer / Cursor).
2. **Context research:** `@Web` para benchmark de dashboards financieros 2024/2025.
3. **Visual polish:** *glassmorphism* y esquema oscuro (`globals.css`, clases `glass-panel` en `tailwind.config.ts`).

Convenciones adicionales: **`.cursorrules`** en la raíz del proyecto.

---

## Estructura del repositorio

```
smart-personal-finance-dashboard/
├── .cursorrules
├── .node-version
├── README.md
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Dashboard.tsx
│   ├── ExpenseChart.tsx
│   ├── ExpenseForm.tsx
│   ├── ExpenseList.tsx
│   └── InsightsPanel.tsx
├── lib/
│   ├── insights.ts
│   ├── types.ts
│   └── useLocalExpenses.ts
├── public/
│   └── .gitkeep
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

---

## Licencia

MIT
