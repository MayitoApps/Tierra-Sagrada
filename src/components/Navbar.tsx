'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const pathname = usePathname();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Ceremonias', path: '/ceremonias' },
    { name: 'Calendario', path: '/calendario' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'El Rezandero', path: '/rezandero' },
    { name: 'Tienda', path: '/tienda' },
    { name: 'Galería', path: '/galeria' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const isActive = (path: string) => {
    if (!pathname) return false;
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(251, 249, 244, 0.94)',
      backdropFilter: 'blur(10px)',
      borderBottom: '2px solid var(--color-border)',
      padding: '0.6rem 0',
      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.02\'/%3E%3C/svg%3E")',
    }}>
      <div className="container-organic" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/* Brand/Logo - Clean layout with Logo & Brand name only */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <img
            src="/Tierra-Sagrada.png"
            alt="Tierra Sagrada Logo"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            style={{
              height: '42px',
              width: '42px',
              objectFit: 'contain',
              borderRadius: '50%',
              border: '1px solid var(--color-border)',
              backgroundColor: '#fff',
            }}
          />
          <span style={{
            fontFamily: 'var(--font-title)',
            fontWeight: 700,
            fontSize: '1.25rem',
            letterSpacing: '0.12em',
            color: 'var(--color-text-earth)',
            lineHeight: 1,
          }}>
            TIERRA SAGRADA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div style={{ display: 'none', gap: '1.1rem', alignItems: 'center' }} className="desktop-menu-wrapper">
          <style dangerouslySetInnerHTML={{__html: `
            @media (min-width: 1024px) {
              .desktop-menu-wrapper { display: flex !important; }
              .mobile-toggle { display: none !important; }
            }
          `}} />
          
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              style={{
                fontFamily: 'var(--font-title)',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: isActive(link.path) ? 'var(--color-accent-terracotta)' : 'var(--color-text-earth)',
                padding: '0.5rem 0.2rem',
                position: 'relative',
                transition: 'var(--transition-fast)',
                letterSpacing: '0.05em',
              }}
              className="nav-link-item"
              onMouseEnter={(e) => {
                if (!isActive(link.path)) e.currentTarget.style.color = 'var(--color-accent-terracotta)';
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.path)) e.currentTarget.style.color = 'var(--color-text-earth)';
              }}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div
                  layoutId="activeIndicator"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: 'var(--color-accent-terracotta)',
                    borderRadius: '2px',
                  }}
                />
              )}
            </Link>
          ))}

          {/* Action divider */}
          <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--color-border)', margin: '0 0.2rem' }} />

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              padding: '0.5rem',
              color: 'var(--color-text-earth)',
              display: 'flex',
              alignItems: 'center',
              transition: 'var(--transition-fast)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-terracotta)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-earth)'}
            aria-label="Abrir carrito"
          >
            <ShoppingBag size={20} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'var(--color-accent-terracotta)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="mobile-toggle" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          {/* Cart Trigger (Mobile) */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              padding: '0.5rem',
              color: 'var(--color-text-earth)',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Abrir carrito móvil"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: 'var(--color-accent-terracotta)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Toggle Menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-earth)',
              padding: '0.3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              overflow: 'hidden',
              backgroundColor: 'var(--color-bg-sand)',
              borderBottom: '2px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              padding: '1rem 0 2rem 0',
            }}
          >
            <div className="container-organic" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  style={{
                    fontFamily: 'var(--font-title)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: isActive(link.path) ? 'var(--color-accent-terracotta)' : 'var(--color-text-earth)',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(0,0,0,0.03)',
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
