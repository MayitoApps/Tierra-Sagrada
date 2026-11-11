'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ShieldCheck, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { miembrosFamilia } from '../data/familia';

export const Nosotros: React.FC = () => {

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
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', margin: '1rem 0' }}>El Origen y La Familia</h1>
          <div className="divider-handdrawn" style={{ width: '120px', margin: '1rem auto' }} />
          <p style={{ color: 'var(--color-text-earth)', fontSize: '1.05rem', lineHeight: '1.7' }}>
            Nuestra casa cuida lo sagrado para todos y nuestras familias. Tierra Sagrada es una chinampa viva en Xochimilco concebida como un altar a cielo abierto, dedicada a la preservación del conocimiento herbolario, ceremonial y del buen vivir.
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
              Xochimilco, declarado Patrimonio de la Humanidad, guarda en sus canales una de las tecnologías de cultivo y coexistencia ecológica más antiguas de América: la Chinampa. Estar rodeados de agua y sauces (ahuejotes) nos permite propiciar un campo de silencio y pureza idóneo para procesos terapéuticos profundos.
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

        {/* Sección: La Familia */}
        <div style={{ borderTop: '2px solid var(--color-border)', paddingTop: '5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 4rem auto' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--color-accent-sage)',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '0.5rem',
            }}>
              <Sparkles size={16} /> Caminantes y Guardianes
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', marginBottom: '1rem' }}>La Familia</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
              Nuestra casa cuida lo sagrado para todos y nuestras familias. Haz clic en cada uno para conocer su presentación, a qué se dedica y contactarlo en sus redes.
            </p>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            .team-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 2.5rem;
            }
            .team-card {
              display: flex;
              flex-direction: column;
              text-decoration: none;
              color: inherit;
              background-color: var(--color-bg-card);
              border-radius: var(--radius-organic);
              overflow: hidden;
              transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
            }
            .team-card:hover {
              transform: translateY(-6px);
              box-shadow: var(--shadow-organic-hover);
              border-color: var(--color-accent-terracotta);
            }
            .team-card-image {
              width: 100%;
              height: 280px;
              background-size: cover;
              background-position: center;
              border-bottom: 2px solid var(--color-border);
              transition: transform 0.5s ease;
            }
            .team-card:hover .team-card-image {
              transform: scale(1.04);
            }
          `}} />
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="team-grid"
          >
            {miembrosFamilia.map((fac) => (
              <motion.div
                key={fac.slug}
                variants={fadeInUp}
              >
                <Link
                  href={`/nosotros/${fac.slug}`}
                  className="card-handmade team-card"
                  style={{
                    padding: 0,
                    height: '100%',
                  }}
                >
                  {/* Imagen */}
                  <div style={{ overflow: 'hidden', height: '280px' }}>
                    <div
                      className="team-card-image"
                      style={{ backgroundImage: `url("${fac.foto}")` }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ padding: '1.8rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
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
                      fontSize: '1.35rem',
                      margin: '0.4rem 0 0.8rem 0',
                      color: 'var(--color-text-earth)',
                    }}>
                      {fac.nombre}
                    </h3>

                    <p style={{
                      color: 'var(--color-text-muted)',
                      fontSize: '0.9rem',
                      lineHeight: '1.6',
                      marginBottom: '1.5rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      flexGrow: 1,
                    }}>
                      {fac.dedicacion}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--color-border)',
                      color: 'var(--color-accent-sage)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}>
                      <span>Conoce su historia y redes</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
