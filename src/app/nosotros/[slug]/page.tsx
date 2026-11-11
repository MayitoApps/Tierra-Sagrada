import { notFound } from 'next/navigation';
import { miembrosFamilia, getMiembroBySlug } from '../../../data/familia';
import { MiembroDetalle } from '../../../views/MiembroDetalle';

export async function generateStaticParams() {
  return miembrosFamilia.map((m) => ({
    slug: m.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const miembro = getMiembroBySlug(slug);
  if (!miembro) {
    return {
      title: 'Miembro no encontrado | Tierra Sagrada',
    };
  }
  return {
    title: `${miembro.nombre} | La Familia de Tierra Sagrada`,
    description: `${miembro.rol} en Tierra Sagrada. ${miembro.dedicacion}`,
  };
}

export default async function MiembroPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const miembro = getMiembroBySlug(slug);

  if (!miembro) {
    notFound();
  }

  return <MiembroDetalle miembro={miembro} />;
}
