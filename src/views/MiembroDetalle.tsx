'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Heart, Sparkles, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import type { MiembroFamilia } from '../data/familia';

const InstagramIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

interface MiembroDetalleProps {
  miembro: MiembroFamilia;
}

export const MiembroDetalle: React.FC<MiembroDetalleProps> = ({ miembro }) => {
  return (
    <div style={{ padding: '4rem 0', backgroundColor: 'var(--color-bg-sand)', minHeight: '90vh' }}>
      <div className="container-organic">
        {/* Botón de regreso */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Link
            href="/nosotros"
            className="btn-handwritten"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.2rem',
              fontSize: '0.88rem',
            }}
          >
            <ArrowLeft size={16} />
            <span>Volver a La Familia</span>
          </Link>
        </div>

        {/* Tarjeta Principal de Presentación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card-handmade"
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}>
            {/* Columna Izquierda: Retrato & Redes Sociales */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{
                width: '100%',
                maxWidth: '320px',
                height: '380px',
                borderRadius: '24px 8px 24px 8px',
                overflow: 'hidden',
                border: '3px solid var(--color-border)',
                boxShadow: '0 12px 30px rgba(44, 34, 30, 0.08)',
                marginBottom: '1.5rem',
                position: 'relative',
              }}>
                <img
                  src={miembro.foto}
                  alt={miembro.nombre}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Redes Sociales y Contacto */}
              <div style={{
                width: '100%',
                maxWidth: '320px',
                backgroundColor: 'var(--color-bg-paper)',
                padding: '1.2rem',
                borderRadius: '16px',
                border: '1px solid var(--color-border)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-title)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--color-accent-terracotta)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: '1rem',
                }}>
                  Redes Sociales & Contacto
                </span>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {miembro.redes.whatsapp && (
                    <a
                      href={miembro.redes.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-handwritten"
                      style={{
                        backgroundColor: '#25D366',
                        color: '#fff',
                        borderColor: '#25D366',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: '0.85rem',
                        padding: '0.6rem 1rem',
                      }}
                    >
                      <MessageCircle size={16} />
                      <span>Mensaje por WhatsApp</span>
                    </a>
                  )}

                  {miembro.redes.instagram && (
                    <a
                      href={miembro.redes.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-handwritten"
                      style={{
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: '0.85rem',
                        padding: '0.6rem 1rem',
                      }}
                    >
                      <InstagramIcon size={16} />
                      <span>Instagram</span>
                    </a>
                  )}

                  {miembro.redes.facebook && (
                    <a
                      href={miembro.redes.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-handwritten"
                      style={{
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: '0.85rem',
                        padding: '0.6rem 1rem',
                      }}
                    >
                      <FacebookIcon size={16} />
                      <span>Facebook</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Columna Derecha: Información, ¿A qué se dedica? y Presentación */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
              <div>
                <span style={{
                  fontFamily: 'var(--font-title)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--color-accent-sage)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  marginBottom: '0.5rem',
                }}>
                  <Heart size={14} /> La Familia Tierra Sagrada
                </span>
                <h1 style={{
                  fontFamily: 'var(--font-title)',
                  fontSize: 'clamp(2rem, 4vw, 2.6rem)',
                  margin: '0.2rem 0 0.5rem 0',
                  color: 'var(--color-text-earth)',
                  lineHeight: '1.2',
                }}>
                  {miembro.nombre}
                </h1>
                <p style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'var(--color-accent-terracotta)',
                  fontStyle: 'italic',
                }}>
                  {miembro.rol}
                </p>
              </div>

              {/* Sección: ¿A qué se dedica? */}
              <div style={{
                backgroundColor: 'rgba(235, 220, 203, 0.4)',
                padding: '1.4rem',
                borderRadius: '16px',
                borderLeft: '4px solid var(--color-accent-gold)',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-title)',
                  fontSize: '1.1rem',
                  margin: '0 0 0.6rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--color-text-earth)',
                }}>
                  <Compass size={18} color="var(--color-accent-gold)" />
                  ¿A qué se dedica?
                </h3>
                <p style={{
                  fontSize: '0.98rem',
                  color: 'var(--color-text-earth)',
                  lineHeight: '1.6',
                  margin: 0,
                }}>
                  {miembro.dedicacion}
                </p>
              </div>

              {/* Sección: Texto de Presentación */}
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-title)',
                  fontSize: '1.2rem',
                  margin: '0 0 0.8rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--color-text-earth)',
                }}>
                  <Sparkles size={18} color="var(--color-accent-sage)" />
                  Presentación y Camino
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: '1.75',
                  margin: 0,
                }}>
                  {miembro.presentacion}
                </p>
              </div>

              {/* Especialidades */}
              {miembro.especialidades && miembro.especialidades.length > 0 && (
                <div>
                  <h4 style={{
                    fontFamily: 'var(--font-title)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--color-text-earth)',
                    marginBottom: '0.8rem',
                  }}>
                    Especialidades & Saberes
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                    {miembro.especialidades.map((esp, i) => (
                      <span
                        key={i}
                        style={{
                          backgroundColor: 'var(--color-bg-paper)',
                          border: '1px solid var(--color-border)',
                          padding: '0.4rem 0.9rem',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          color: 'var(--color-text-earth)',
                          fontWeight: 500,
                        }}
                      >
                        • {esp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Llamado a la acción */}
              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', marginTop: '1rem' }}>
                <Link
                  href="/calendario"
                  className="btn-handwritten btn-primary-organic"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                  }}
                >
                  <span>Participar en una Ceremonia con {miembro.nombre.split(' ')[0]}</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
