import type { Metadata } from 'next';
import '../index.css';
import { CartProvider } from '../context/CartContext';
import { Layout } from '../components/Layout';

export const metadata: Metadata = {
  title: 'Tierra Sagrada | Medicina Tradicional y Espiritualidad Ancestral',
  description: 'Tierra Sagrada - Espacio sagrado de sanación, medicina tradicional mexihka, temazcal, ceremonias ancestrales y productos naturales en la chinampa de Xochimilco.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Layout>
            {children}
          </Layout>
        </CartProvider>
      </body>
    </html>
  );
}
