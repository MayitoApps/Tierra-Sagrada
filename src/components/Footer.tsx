'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: 'var(--color-bg-paper)',
      borderTop: '2px solid var(--color-border)',
      padding: '4rem 0 2rem 0',
      color: 'var(--color-text-earth)',
      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
    }}>
      <div className="container-organic" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2.5rem',
        marginBottom: '3rem',
      }}>
        {/* Columna 1: Filosofía */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-title)',
            fontSize: '1.2rem',
            marginBottom: '1.2rem',
            color: 'var(--color-accent-terracotta)',
          }}>
            Tierra Sagrada
          </h3>
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--color-text-muted)',
            marginBottom: '1rem',
          }}>
            Nuestra casa cuida lo sagrado para todos y nuestras familias. Un espacio ceremonial en el corazón de los canales de Cuemanco, Xochimilco, dedicado a la medicina tradicional, cantos y rezos ancestrales.
          </p>
          <span style={{ fontSize: '1.5rem' }}>🌿🔥💧🌬️</span>
          <div style={{ marginTop: '1.2rem', display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
            <a 
              href="https://www.facebook.com/tierrasagradaxoch/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                color: 'var(--color-text-muted)',
                transition: 'var(--transition-fast)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }} 
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-terracotta)'} 
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'} 
              aria-label="Facebook Tierra Sagrada"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a 
              href="https://www.instagram.com/tierrasagradaxoch/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                color: 'var(--color-text-muted)',
                transition: 'var(--transition-fast)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }} 
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-terracotta)'} 
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'} 
              aria-label="Instagram Tierra Sagrada"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
          </div>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-title)',
            fontSize: '1.2rem',
            marginBottom: '1.2rem',
          }}>
            Navegación
          </h3>
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            fontSize: '0.9rem',
          }}>
            <li><Link href="/" style={{ transition: 'var(--transition-fast)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-terracotta)'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Inicio</Link></li>
            <li><Link href="/ceremonias" style={{ transition: 'var(--transition-fast)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-terracotta)'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Ceremonias y Servicios</Link></li>
            <li><Link href="/calendario" style={{ transition: 'var(--transition-fast)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-terracotta)'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Calendario de Eventos</Link></li>
            <li><Link href="/nosotros" style={{ transition: 'var(--transition-fast)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-terracotta)'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>La Familia</Link></li>
            <li><Link href="/rezandero" style={{ transition: 'var(--transition-fast)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-terracotta)'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Pensares (Blog)</Link></li>
            <li><Link href="/tienda" style={{ transition: 'var(--transition-fast)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-terracotta)'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Tienda de Medicina</Link></li>
            <li><Link href="/galeria" style={{ transition: 'var(--transition-fast)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-terracotta)'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Galería de Fotos</Link></li>
            <li><Link href="/contacto" style={{ transition: 'var(--transition-fast)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-terracotta)'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Contacto</Link></li>
          </ul>
        </div>

        {/* Columna 3: Información de Contacto */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-title)',
            fontSize: '1.2rem',
            marginBottom: '1.2rem',
          }}>
            Contacto
          </h3>
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            fontSize: '0.9rem',
            color: 'var(--color-text-muted)',
          }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
              <Phone size={18} style={{ color: 'var(--color-accent-sage)', flexShrink: 0, marginTop: '0.2rem' }} />
              <a href="tel:+525534872329" style={{ transition: 'var(--transition-fast)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-earth)'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
                +52 55 3487 2329
              </a>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
              <Mail size={18} style={{ color: 'var(--color-accent-sage)', flexShrink: 0, marginTop: '0.2rem' }} />
              <a href="mailto:tierraxochsagrada@gmail.com" style={{ transition: 'var(--transition-fast)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-earth)'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
                tierraxochsagrada@gmail.com
              </a>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
              <MapPin size={18} style={{ color: 'var(--color-accent-sage)', flexShrink: 0, marginTop: '0.2rem' }} />
              <span>
                Lago Xochimilco, Embarcadero Cuemanco, Ciudad de México, México.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="divider-handdrawn" style={{ width: '90%', margin: '0 auto 2rem auto' }} />

      {/* Footer Bottom */}
      <div className="container-organic" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.8rem',
        color: 'var(--color-text-muted)',
        gap: '1rem',
      }}>
        <style dangerouslySetInnerHTML={{__html: `
          @media (min-width: 768px) {
            .footer-bottom-wrapper { flex-direction: row !important; }
          }
        `}} />
        <div className="footer-bottom-wrapper" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: '1rem',
        }}>
          <p>© {currentYear} Tierra Sagrada. Todos los derechos reservados.</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ fontStyle: 'italic' }}>Hecho con amor y conexión a la tierra 🌾</span>
            
            {/* Link discreto al panel de administrador */}
            <Link
              href="/admin"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                color: 'rgba(94, 78, 70, 0.4)',
                transition: 'var(--transition-fast)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-terracotta)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(94, 78, 70, 0.4)'}
            >
              <Shield size={12} />
              <span>Acceso Administrador</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
