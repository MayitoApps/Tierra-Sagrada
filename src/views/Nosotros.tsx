'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ShieldCheck, Heart } from 'lucide-react';

interface Facilitador {
  nombre: string;
  rol: string;
  foto: string;
}

export const Nosotros: React.FC = () => {
  const facilitadores: Facilitador[] = [
    {
      nombre: 'Abel Hombono Tatanka',
      rol: 'Temazcaltiani, Jefe de danza del sol',
      foto: '/Abel.jpeg',
    },
    {
      nombre: 'Oso',
      rol: 'Águila de Fuego, danzante del sol',
      foto: '/oso.jpeg',
    },
    {
      nombre: 'Abraham Ortiz',
      rol: 'Águila de fuego, danzante del sol',
      foto: '/Abraham.jpeg',
    },
    {
      nombre: 'Enrique Itzcuauhtli',
      rol: 'Águila de Fuego, Danzante del sol',
      foto: '/Enrique.jpeg',
    },
    {
      nombre: 'Monica Alvarez Xochitlmeztlaxohtli',
      rol: 'Mujer Medicina, danzante de luna',
      foto: '/Moni.jpeg',
    },
    {
      nombre: 'Abuela Lulu Xochiquetzali',
      rol: 'Mujer Medicina, portadora de la tierra, danzante del sol, danzante de luna',
      foto: '/6.jpeg',
    },
    {
      nombre: 'Abuela Leticia Acatzin',
      rol: 'Mujer Medicina, portadora de fuego, danzante del sol, danzante de luna',
      foto: '/19.jpeg',
    },
    {
      nombre: 'Abuela Diana Quiahuitzin',
      rol: 'Mujer medicina, portadora del agua, danzante del sol, danzante de luna',
      foto: '/15.jpeg',
    },
    {
      nombre: 'Abuela Laura Miztlixochitl',
      rol: 'Mujer medicina, portadora del viento, danzante del sol, danzante de luna',
      foto: '/20.jpeg',
    }
  ];

  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div style={{ padding: '4rem 0', backgroundColor: 'var(--color-bg-sand)' }}>
      <div className="container-organic">
        {/* Encabezado */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem auto' }}>
          <span style={{
            fontFamily: 'var(--font-title)',
            color: 'var(--color-accent-sage)',
            fontWeight: 600,
            fontSize: '0.9rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Nuestra Esencia
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', margin: '1rem 0' }}>El Origen y el Equipo</h1>
          <div className="divider-handdrawn" style={{ width: '120px', margin: '1rem auto' }} />
          <p style={{ color: 'var(--color-text-earth)', fontSize: '1.05rem', lineHeight: '1.7' }}>
            Tierra Sagrada no es solo un lugar físico; es una chinampa viva en Xochimilco concebida como un altar a cielo abierto, dedicada a la preservación del conocimiento herbolario y ceremonial mesoamericano.
          </p>
        </div>

        {/* Sección: Nuestra Chinampa */}
        <style dangerouslySetInnerHTML={{__html: `
          .chinampa-section {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
            align-items: center;
            margin-bottom: 6rem;
          }
          @media (min-width: 992px) {
            .chinampa-section {
              grid-template-columns: 0.95fr 1.05fr;
            }
          }
        `}} />
        
        <div className="chinampa-section">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{
              width: '100%',
              maxWidth: '450px',
              height: '350px',
              backgroundImage: 'url("/15.jpeg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '3px solid var(--color-text-earth)',
              boxShadow: '10px 10px 0px var(--color-accent-terracotta)',
            }} className="organic-border-3" />
          </motion.div>

          <motion.div {...fadeInUp}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.2rem', fontFamily: 'var(--font-title)' }}>
              El Misticismo de Cuemanco
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              Xochimilco, declarado Patrimonio de la Humanidad, guarda en sus canales una de las tecnologías de cultivo y coexistencia ecológica más antiguas de América: la Chinampa. Estar rodeados de agua y sauce llorón (ahuejotes) nos permite propiciar un campo de silencio y pureza idóneo para procesos terapéuticos profundos.
            </p>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Nuestras cabañas ceremoniales, el Temazcal de barro tradicional y nuestro jardín de medicina sagrada están integrados respetuosamente con este entorno, protegiendo a la flora y fauna local de la reserva ecológica de Cuemanco.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-earth)' }}>
                <ShieldCheck size={18} style={{ color: 'var(--color-accent-sage)' }} />
                <span>Espacio ecológico sustentable con sanitarios secos y manejo de composta.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-earth)' }}>
                <Heart size={18} style={{ color: 'var(--color-accent-sage)' }} />
                <span>Cruzado en canoa rústica tradicional desde el embarcadero de Cuemanco.</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sección: Facilitadores */}
        <div style={{ borderTop: '2px solid var(--color-border)', paddingTop: '5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Guardianes de la Medicina</h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Las personas encargadas de sostener y guiar las ceremonias, compartiendo su rezo con responsabilidad y tradición.
            </p>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            .team-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 3rem;
            }
            .team-card-image {
              width: 100%;
              height: 250px;
              background-size: cover;
              background-position: center;
              border-bottom: 2px solid var(--color-border);
              transition: var(--transition-smooth);
            }
            .team-card:hover .team-card-image {
              transform: scale(1.03);
            }
          `}} />
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="team-grid"
          >
            {facilitadores.map((fac) => (
              <motion.div
                key={fac.nombre}
                variants={fadeInUp}
                className="card-handmade team-card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Imagen del facilitador */}
                <div style={{ overflow: 'hidden', height: '250px' }}>
                  <div
                    className="team-card-image"
                    style={{ backgroundImage: `url("${fac.foto}")` }}
                  />
                </div>

                {/* Info */}
                <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--color-accent-terracotta)',
                    letterSpacing: '0.1em',
                  }}>
                    {fac.rol}
                  </span>
                  
                  <h3 style={{
                    fontFamily: 'var(--font-title)',
                    fontSize: '1.25rem',
                    margin: '0.3rem 0 0.8rem 0',
                    color: 'var(--color-text-earth)',
                  }}>
                    {fac.nombre}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
