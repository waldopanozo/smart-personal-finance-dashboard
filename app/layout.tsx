import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smart Finance — Panel de gastos',
  description: 'Seguimiento de gastos e insights con estilo glassmorphism.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={outfit.className}>
      <body>{children}</body>
    </html>
  );
}
