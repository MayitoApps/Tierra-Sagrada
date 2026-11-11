'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Flame, Leaf, Droplet, BookOpen } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { miembrosFamilia } from '../data/familia';

export const Home: React.FC = () => {
  // Variantes para animaciones de desvanecimiento y movimiento
  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const staggerContainer: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* 1. Hero Section */}
      <section style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#2c221e',
        color: '#fbf9f4',
        padding: '4rem 1rem',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <style dangerouslySetInnerHTML={{__html: `
          .hero-bg-image {
            background-size: cover;
            background-position: center;
          }
          @media (min-width: 992px) {
            .hero-bg-image {
              background-size: 175%;
              background-position: center 35%;
            }
          }
        `}} />
        {/* Capa de fondo mística */}
        <div className="hero-bg-image" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(to bottom, rgba(44, 34, 30, 0.6), rgba(44, 34, 30, 0.9)), url("/25.jpeg")',
          zIndex: 1,
        }} />

        {/* Textura de papel hecho a mano */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
          zIndex: 2,
          pointerEvents: 'none',
        }} />

        {/* Contenido */}
        <div className="container-organic" style={{ position: 'relative', zIndex: 3, maxWidth: '800px' }}>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-title)',
              color: 'var(--color-accent-gold)',
              letterSpacing: '0.25em',
              fontSize: '1rem',
              fontWeight: 600,
              display: 'block',
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}
          >
            Embarcadero de Cuemanco • Xochimilco
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
              fontFamily: 'var(--font-title)',
              lineHeight: '1.1',
              marginBottom: '1.5rem',
              color: 'var(--color-bg-sand)',
            }}
          >
            Regresa al Origen de la Tierra
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="divider-handdrawn"
            style={{ backgroundColor: 'var(--color-accent-gold)', width: '150px', margin: '1.5rem auto' }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              marginBottom: '2.5rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              color: 'var(--color-accent-soft)',
              lineHeight: '1.6',
            }}
          >
            Temazcales tradicionales y cantos sagrados en una chinampa ancestral rodeada de canales míticos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{
              display: 'flex',
              gap: '1.2rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/calendario" className="btn-handwritten btn-primary-organic" style={{ border: '2px solid var(--color-accent-gold)', color: '#fff' }}>
              Próximos Eventos
              <ArrowRight size={18} />
            </Link>
            <Link href="/ceremonias" className="btn-handwritten" style={{ borderColor: 'var(--color-bg-sand)', color: 'var(--color-bg-sand)' }}>
              Nuestras Ceremonias
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Filosofía y Conexión Chinampera */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-bg-sand)', position: 'relative' }}>
        <div className="container-organic">
          <style dangerouslySetInnerHTML={{__html: `
            .philosophy-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 4rem;
              align-items: center;
            }
            @media (min-width: 992px) {
              .philosophy-grid {
                grid-template-columns: 1.1fr 0.9fr;
              }
            }
          `}} />
          <div className="philosophy-grid">
            <motion.div {...fadeInUp}>
              <span style={{
                fontFamily: 'var(--font-title)',
                color: 'var(--color-accent-sage)',
                fontWeight: 600,
                fontSize: '0.9rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.5rem',
              }}>
                Filosofía de Vida
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                Un santuario tejido entre cantos, agua y fuego
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                Tierra Sagrada nace del llamado por reconectar con la sabiduría ancestral en el ecosistema chinampero de Xochimilco. Nuestro espacio está diseñado bajo principios de permacultura, rodeado de vegetación endémica y las aguas sagradas de Cuemanco.
              </p>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                Nuestra casa cuida lo sagrado para todos y nuestras familias.
              </p>
              <Link href="/ceremonias" className="btn-handwritten btn-secondary-organic">
                Conoce Nuestras Ceremonias
              </Link>
            </motion.div>

            {/* Imagen Orgánica */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8 }}
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div style={{
                width: '100%',
                maxWidth: '400px',
                height: '450px',
                backgroundImage: 'url("/7.jpeg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '8px 12px 30px rgba(44, 34, 30, 0.12)',
                border: '3px solid var(--color-text-earth)',
              }} className="organic-border-1 animate-float-slow" />
              {/* Elemento decorativo detrás */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                width: '100%',
                maxWidth: '400px',
                height: '450px',
                border: '2px dashed var(--color-accent-terracotta)',
                zIndex: -1,
              }} className="organic-border-1" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Los Cuatro Elementos (Pilares del Lugar) */}
      <section style={{
        padding: '6rem 0',
        backgroundColor: 'var(--color-bg-paper)',
        borderTop: '2px solid var(--color-border)',
        borderBottom: '2px solid var(--color-border)',
      }}>
        <div className="container-organic">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Los Elementos de Sanación</h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Cada una de nuestras ceremonias e integraciones está guiada por la comunión con las cuatro fuerzas elementales.
            </p>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            .elements-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
              gap: 2rem;
            }
          `}} />
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            className="elements-grid"
          >
            {/* FUEGO */}
            <motion.div variants={fadeInUp} className="card-handmade" style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'rgba(200, 107, 75, 0.1)',
                color: 'var(--color-accent-terracotta)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                border: '1px solid var(--color-accent-terracotta)',
              }}>
                <Flame size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', fontFamily: 'var(--font-title)' }}>Fuego (Temazcal)</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                Las abuelitas piedras volcánicas arden al rojo vivo para llevarnos al vientre húmedo de la Madre Tierra, transmutando toxinas y liberando la mente.
              </p>
            </motion.div>

            {/* TIERRA */}
            <motion.div variants={fadeInUp} className="card-handmade" style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'rgba(80, 101, 85, 0.1)',
                color: 'var(--color-accent-sage)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                border: '1px solid var(--color-accent-sage)',
              }}>
                <Leaf size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', fontFamily: 'var(--font-title)' }}>Tierra (Plantas)</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                Medicina natural de la raíz de Chilcuague, copal, salvia y cacao sagrado. Ofrendamos y sembramos en chinampas vivas respetando los ciclos.
              </p>
            </motion.div>

            {/* AGUA */}
            <motion.div variants={fadeInUp} className="card-handmade" style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'rgba(216, 155, 48, 0.1)',
                color: 'var(--color-accent-gold)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                border: '1px solid var(--color-accent-gold)',
              }}>
                <Droplet size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', fontFamily: 'var(--font-title)' }}>Agua (Canales)</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                Los canales ancestrales de Cuemanco fluyen a nuestro alrededor. El agua de Xochimilco limpia el linaje familiar, refresca el cuerpo físico y nutre las emociones.
              </p>
            </motion.div>

            {/* VIENTO */}
            <motion.div variants={fadeInUp} className="card-handmade" style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'rgba(94, 78, 70, 0.1)',
                color: 'var(--color-text-earth)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                border: '1px solid var(--color-text-earth)',
              }}>
                <Compass size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', fontFamily: 'var(--font-title)' }}>Viento (Cantos)</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                El aliento se convierte en canto sagrado, el sonido del caracol abre las direcciones del cosmos y las flautas nativas elevan nuestras intenciones.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3.5. Guardianes de la Medicina */}
      <section style={{
        padding: '6rem 0',
        backgroundColor: 'var(--color-bg-sand)',
        borderBottom: '2px solid var(--color-border)',
      }}>
        <div className="container-organic">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
            <span style={{
              fontFamily: 'var(--font-title)',
              color: 'var(--color-accent-terracotta)',
              fontWeight: 600,
              fontSize: '0.9rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.5rem',
            }}>
              La Familia
            </span>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Nuestra Familia en Tierra Sagrada</h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Te presentamos a quienes cuidamos el fuego, el agua, la chinampa y guiamos los rezos en nuestro espacio sagrado. Haz clic en cualquiera de nosotros para conocer nuestra historia, a qué nos dedicamos y nuestras redes sociales.
            </p>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            .home-team-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
              gap: 2rem;
              margin-bottom: 3rem;
            }
            .home-team-card {
              text-decoration: none;
              color: inherit;
              padding: 0;
              overflow: hidden;
              display: flex;
              flex-direction: column;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
              cursor: pointer;
            }
            .home-team-card:hover {
              transform: translateY(-6px);
              box-shadow: 0 12px 30px rgba(44, 34, 30, 0.12);
            }
            .home-team-card-image {
              width: 100%;
              height: 230px;
              background-size: cover;
              background-position: center;
              border-bottom: 2px solid var(--color-border);
              transition: transform 0.4s ease;
            }
            .home-team-card:hover .home-team-card-image {
              transform: scale(1.04);
            }
          `}} />

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            className="home-team-grid"
          >
            {miembrosFamilia.slice(0, 4).map((miembro) => (
              <motion.div key={miembro.slug} variants={fadeInUp}>
                <Link href={`/nosotros/${miembro.slug}`} className="card-handmade home-team-card">
                  <div style={{ overflow: 'hidden', height: '230px' }}>
                    <div className="home-team-card-image" style={{ backgroundImage: `url("${miembro.foto}")` }} />
                  </div>
                  <div style={{ padding: '1.4rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-accent-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
                      {miembro.rol}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem', margin: '0.2rem 0 0.6rem 0' }}>
                      {miembro.nombre}
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: '1.5', flexGrow: 1, marginBottom: '1rem' }}>
                      {miembro.dedicacion.length > 95 ? miembro.dedicacion.substring(0, 95) + '...' : miembro.dedicacion}
                    </p>
                    <span style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--color-accent-sage)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      borderTop: '1px solid var(--color-border)',
                      paddingTop: '0.8rem',
                    }}>
                      Ver perfil & redes sociales →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/nosotros" className="btn-handwritten btn-secondary-organic">
              Conoce a Toda la Familia
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Llamado a la Acción - Tienda y Medicina */}
      <section style={{
        padding: '6rem 0',
        backgroundColor: 'var(--color-bg-sand)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="container-organic">
          <style dangerouslySetInnerHTML={{__html: `
            .store-cta-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 4rem;
              align-items: center;
            }
            @media (min-width: 992px) {
              .store-cta-grid {
                grid-template-columns: 0.9fr 1.1fr;
              }
            }
          `}} />
          <div className="store-cta-grid">
            {/* Imagen Decorativa */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div style={{
                width: '100%',
                maxWidth: '400px',
                height: '350px',
                backgroundImage: 'url("/12.jpeg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '10px 10px 0px var(--color-accent-sage)',
                border: '3px solid var(--color-text-earth)',
              }} className="organic-border-2" />
            </motion.div>

            {/* Texto */}
            <motion.div {...fadeInUp}>
              <span style={{
                fontFamily: 'var(--font-title)',
                color: 'var(--color-accent-terracotta)',
                fontWeight: 600,
                fontSize: '0.9rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.5rem',
              }}>
                Medicina Natural
              </span>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                Lleva la sabiduría de la tierra contigo
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                Venta y distribución de remedios naturales elaborados artesanalmente en Tierra Sagrada. Nuestro producto insignia es el <strong>Chilcuague</strong> (raíz de oro), una planta medicinal mexicana tradicional con potentes propiedades curativas, anestésicas y desinfectantes.
              </p>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                Apoya a los productores locales y adquiere tinturas, microdosis y pomadas hechos de manera responsable y orgánica.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/tienda" className="btn-handwritten btn-primary-organic">
                  Explorar Tienda
                </Link>
                <Link href="/contacto" className="btn-handwritten">
                  Ubicación & Contacto
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4.5. Sección Pensares (El Rezandero) */}
      <section style={{
        padding: '6rem 0',
        backgroundColor: 'var(--color-bg-paper)',
        borderTop: '2px solid var(--color-border)',
      }}>
        <div className="container-organic">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            <span style={{
              fontFamily: 'var(--font-title)',
              color: 'var(--color-accent-sage)',
              fontWeight: 600,
              fontSize: '0.9rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.5rem',
            }}>
              Pensares
            </span>
            <h2 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>El Rezandero</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
              Palabras del corazón, saberes de herbolaria, crónicas del lago y testimonios vivos de quienes caminan con nosotros en la chinampa.
            </p>
          </div>

          {/* Categorías Principales de Pensares */}
          <style dangerouslySetInnerHTML={{__html: `
            .pensares-category-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 2rem;
              margin-bottom: 4rem;
            }
            .pensares-cat-card {
              background-color: var(--color-bg-sand);
              border: 2px solid var(--color-border);
              border-radius: 18px 8px 18px 8px;
              padding: 2rem 1.8rem;
              text-decoration: none;
              color: inherit;
              display: flex;
              flex-direction: column;
              transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
            }
            .pensares-cat-card:hover {
              transform: translateY(-6px);
              border-color: var(--color-accent-terracotta);
              box-shadow: 0 10px 25px rgba(200, 107, 75, 0.12);
            }
            .home-blog-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 2.5rem;
              margin-bottom: 3rem;
            }
            @media (min-width: 768px) {
              .home-blog-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }
            .home-blog-card {
              display: flex;
              flex-direction: column;
              overflow: hidden;
              padding: 0;
            }
            .home-blog-card-image {
              width: 100%;
              height: 200px;
              background-size: cover;
              background-position: center;
              border-bottom: 2px solid var(--color-border);
              transition: var(--transition-smooth);
            }
            .home-blog-card:hover .home-blog-card-image {
              transform: scale(1.03);
            }
          `}} />

          {/* Lista de Secciones de Pensares solicitada por el usuario */}
          <div className="pensares-category-grid">
            <Link href="/rezandero?categoria=Herbolaria" className="pensares-cat-card">
              <div style={{ fontSize: '2.4rem', marginBottom: '0.8rem' }}>🌿</div>
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.3rem', marginBottom: '0.6rem', color: 'var(--color-text-earth)' }}>
                Herbolaria
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.6', flexGrow: 1, marginBottom: '1.2rem' }}>
                Estudio y preservación de plantas curativas, la raíz de oro (Chilcuague), tinturas y remedios tradicionales de México.
              </p>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-accent-terracotta)' }}>
                Explorar artículos de Herbolaria →
              </span>
            </Link>

            <Link href="/rezandero?categoria=Chinampa" className="pensares-cat-card">
              <div style={{ fontSize: '2.4rem', marginBottom: '0.8rem' }}>🛶</div>
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.3rem', marginBottom: '0.6rem', color: 'var(--color-text-earth)' }}>
                Chinampa
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.6', flexGrow: 1, marginBottom: '1.2rem' }}>
                Conoce los misterios del lago de Xochimilco, la tecnología agrícola milenaria y las labores cotidianas en una chinampa viva.
              </p>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-accent-sage)' }}>
                Explorar relatos de la Chinampa →
              </span>
            </Link>

            <Link href="/rezandero?categoria=Testimonios" className="pensares-cat-card">
              <div style={{ fontSize: '2.4rem', marginBottom: '0.8rem' }}>✨</div>
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.3rem', marginBottom: '0.6rem', color: 'var(--color-text-earth)' }}>
                Testimonios
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.6', flexGrow: 1, marginBottom: '1.2rem' }}>
                Experiencias y relatos reales de personas y familias que han vivido la sanación en el temazcal y los círculos ceremoniales.
              </p>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-accent-gold)' }}>
                Leer Testimonios reales →
              </span>
            </Link>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem' }}>Artículos y Entradas Recientes</h3>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            className="home-blog-grid"
          >
            {/* Artículo 1 */}
            <motion.div variants={fadeInUp} className="card-handmade home-blog-card">
              <div style={{ overflow: 'hidden', height: '200px' }}>
                <div className="home-blog-card-image" style={{ backgroundImage: 'url("/12.jpeg")' }} />
              </div>
              <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent-terracotta)', textTransform: 'uppercase', marginBottom: '0.3rem', display: 'block' }}>Herbolaria</span>
                <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem', margin: '0 0 0.8rem 0', lineHeight: '1.3' }}>Chilcuague: La milagrosa raíz de oro mexicana</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '1.5rem', flexGrow: 1 }}>
                  Originaria de la Sierra Gorda mexicana, la raíz de Chilcuague es venerada por su increíble poder anestésico, antibiótico y estimulante inmunológico.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>Taita Juan</span>
                  <Link href="/rezandero?categoria=Herbolaria" className="btn-handwritten" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', gap: '0.3rem' }}>
                    <BookOpen size={12} />
                    <span>Leer</span>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Artículo 2 */}
            <motion.div variants={fadeInUp} className="card-handmade home-blog-card">
              <div style={{ overflow: 'hidden', height: '200px' }}>
                <div className="home-blog-card-image" style={{ backgroundImage: 'url("/7.jpeg")' }} />
              </div>
              <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent-sage)', textTransform: 'uppercase', marginBottom: '0.3rem', display: 'block' }}>Chinampa</span>
                <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem', margin: '0 0 0.8rem 0', lineHeight: '1.3' }}>El Lago Sagrado y la Chinampa: Qué se hace y cómo se cultiva</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '1.5rem', flexGrow: 1 }}>
                  Descubre las labores ancestrales en las islas de agua de Xochimilco: el uso de los sauces ahuejotes, el fango fértil y el respeto al humedal sagrado.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>Luna Celeste</span>
                  <Link href="/rezandero?categoria=Chinampa" className="btn-handwritten" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', gap: '0.3rem' }}>
                    <BookOpen size={12} />
                    <span>Leer</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/rezandero" className="btn-handwritten btn-primary-organic">
              Ver Todos los Pensares
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Cita Final */}
      <section style={{
        padding: '5rem 1rem',
        backgroundColor: 'var(--color-bg-paper)',
        textAlign: 'center',
        borderTop: '2px solid var(--color-border)',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>🙏</span>
          <p style={{
            fontFamily: 'var(--font-title)',
            fontSize: '1.5rem',
            fontStyle: 'italic',
            lineHeight: '1.6',
            color: 'var(--color-text-earth)',
            marginBottom: '1.5rem',
          }}>
            "Entrar al Temazcal es regresar al útero de nuestra madre tierra para volver a nacer fuertes, limpios y en armonía con todas nuestras relaciones."
          </p>
          <span style={{
            fontSize: '0.8rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--color-accent-sage)',
            fontWeight: 700,
          }}>
            — Rezo Tradicional Lakota / Mexica
          </span>
        </div>
      </section>
    </div>
  );
};
