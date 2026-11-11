import { Suspense } from 'react';
import { Rezandero } from '../../views/Rezandero';

export const metadata = {
  title: 'Pensares | El Rezandero de Tierra Sagrada',
  description: 'Palabras del corazón, saberes de herbolaria tradicional, vida en la chinampa y testimonios de sanación.',
};

export default function RezanderoPage() {
  return (
    <Suspense fallback={<div style={{ padding: '6rem 0', textAlign: 'center', color: 'var(--color-text-earth)' }}>Cargando Pensares...</div>}>
      <Rezandero />
    </Suspense>
  );
}

