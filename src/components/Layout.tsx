import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { motion, type Variants } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const [scrollY, setScrollY] = useState(0);

  // Scroll to top en cada cambio de página
  useEffect(() => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      setScrollY(0);
    });
  }, [pathname]);

  // Detector de scroll para la aparición del agua y las plantas
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Proporción de scroll (0 al tope superior, llegando a 1 tras hacer scroll de 300px)
  const scrollRatio = Math.min(scrollY / 300, 1);

  // Opacidades dinámicas y sutiles (evitan estorbar la lectura)
  const opacityLeftTop = 0.05 + scrollRatio * 0.45; // 5% de opacidad inicial, sube hasta 50%
  const opacityBottom = scrollRatio * 0.60;        // Invisible arriba, sube hasta 60% al hacer scroll

  // Desplazamiento dinámico (emerger)
  const transformLeftTop = `translate(${-30 + 30 * scrollRatio}px, ${-40 + 40 * scrollRatio}px) scale(${0.85 + 0.15 * scrollRatio})`;
  const transformLeftBottom = `translate(${-25 + 15 * scrollRatio}px, ${90 - 90 * scrollRatio}px)`;
  const transformRightBottom = `translate(${25 - 15 * scrollRatio}px, ${110 - 110 * scrollRatio}px)`;

  // Variantes de animación de página para transiciones fluidas
  const pageVariants: Variants = {
    initial: {
      opacity: 0,
      y: 15,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1], // Transition cúbica suave
      },
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      {/* Elementos decorativos de Chinampa (laterales fijos, con sway animado y efecto de agua) */}
      
      {/* Lado izquierdo superior: Sauce Llorón colgante */}
      <div className="chinampa-decor-left chinampa-sway-left" style={{
        position: 'fixed',
        left: '-50px', // Puesto más al extremo para no tapar los textos
        top: '-20px',
        height: '400px',
        width: '180px',
        zIndex: 50,
        pointerEvents: 'none',
        opacity: opacityLeftTop,
        transform: transformLeftTop,
        transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease-out',
      }}>
        <svg viewBox="0 0 180 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <path d="M0 0 C 40 20, 80 15, 120 0 C 130 10, 140 30, 100 45 C 70 50, 40 40, 0 35" fill="var(--color-text-earth)" opacity="0.9" />
          <path d="M40 18 C 50 100, 30 200, 45 320" stroke="var(--color-accent-sage)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M80 12 C 95 120, 80 240, 105 350" stroke="var(--color-accent-sage)" strokeWidth="2" strokeLinecap="round" />
          <path d="M110 5 C 120 80, 110 180, 125 280" stroke="var(--color-accent-sage)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M20 25 C 25 90, 15 170, 22 250" stroke="var(--color-accent-sage)" strokeWidth="2" strokeLinecap="round" />

          {/* Hojas rama 1 */}
          <path d="M40 50 Q 55 55 42 70 Q 32 60 40 50" fill="var(--color-accent-sage)" />
          <path d="M41 90 Q 58 98 43 115 Q 32 105 41 90" fill="var(--color-accent-sage)" />
          <path d="M37 140 Q 54 150 39 168 Q 28 156 37 140" fill="var(--color-accent-sage)" />
          <path d="M36 190 Q 50 200 37 218 Q 26 206 36 190" fill="var(--color-accent-sage)" />
          <path d="M38 240 Q 52 252 39 270 Q 28 258 38 240" fill="var(--color-accent-sage)" />
          <path d="M42 290 Q 56 300 43 315 Q 32 305 42 290" fill="var(--color-accent-sage)" />

          {/* Hojas rama 2 */}
          <path d="M81 40 Q 98 45 83 60 Q 72 50 81 40" fill="var(--color-accent-sage)" opacity="0.9" />
          <path d="M84 85 Q 102 92 86 108 Q 74 98 84 85" fill="var(--color-accent-sage)" opacity="0.9" />
          <path d="M86 135 Q 104 142 88 158 Q 76 148 86 135" fill="var(--color-accent-sage)" opacity="0.9" />
          <path d="M84 185 Q 100 195 85 210 Q 74 200 84 185" fill="var(--color-accent-sage)" opacity="0.9" />
          <path d="M89 235 Q 105 245 90 260 Q 79 250 89 235" fill="var(--color-accent-sage)" opacity="0.9" />
          <path d="M96 285 Q 112 295 97 310 Q 86 300 96 285" fill="var(--color-accent-sage)" opacity="0.9" />
          <path d="M102 325 Q 118 335 103 348 Q 92 338 102 325" fill="var(--color-accent-sage)" opacity="0.9" />

          {/* Hojas rama 3 */}
          <path d="M112 35 Q 127 40 114 55 Q 103 45 112 35" fill="var(--color-accent-sage)" opacity="0.8" />
          <path d="M114 80 Q 129 88 116 102 Q 105 92 114 80" fill="var(--color-accent-sage)" opacity="0.8" />
          <path d="M115 130 Q 130 138 117 152 Q 106 142 115 130" fill="var(--color-accent-sage)" opacity="0.8" />
          <path d="M116 180 Q 131 188 118 202 Q 107 192 116 180" fill="var(--color-accent-sage)" opacity="0.8" />
          <path d="M119 230 Q 134 238 121 252 Q 110 242 119 230" fill="var(--color-accent-sage)" opacity="0.8" />

          {/* Hojas rama 4 */}
          <path d="M22 55 Q 35 60 23 72 Q 12 65 22 55" fill="var(--color-accent-sage)" />
          <path d="M23 100 Q 36 105 24 118 Q 13 110 23 100" fill="var(--color-accent-sage)" />
          <path d="M20 150 Q 33 155 21 168 Q 10 160 20 150" fill="var(--color-accent-sage)" />
          <path d="M18 200 Q 30 205 19 218 Q 8 210 18 200" fill="var(--color-accent-sage)" />
        </svg>
      </div>

      {/* Lado izquierdo inferior: Juncos, Tules y Olas de agua */}
      <div className="chinampa-decor-left-bottom chinampa-sway-left" style={{
        position: 'fixed',
        left: '-35px', // Desplazado al borde
        bottom: '-10px',
        height: '300px',
        width: '120px',
        zIndex: 50,
        pointerEvents: 'none',
        opacity: opacityBottom,
        transform: transformLeftBottom,
        transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease-out',
      }}>
        <svg viewBox="0 0 120 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <path d="M0 300 C 10 200, 5 100, 20 0 C 15 100, 5 200, 0 300" fill="var(--color-accent-sage)" />
          <path d="M10 300 C 25 180, 20 90, 45 10 C 35 90, 20 180, 10 300" fill="var(--color-accent-sage)" opacity="0.95" />
          <path d="M25 300 C 40 220, 35 140, 55 40 C 45 140, 30 220, 25 300" fill="var(--color-accent-sage)" opacity="0.9" />
          <path d="M5 300 C 12 240, 0 160, 8 70 C 0 160, 5 240, 5 300" fill="var(--color-accent-sage)" opacity="0.8" />
          
          {/* Espigas */}
          <rect x="18" y="0" width="4" height="25" rx="2" fill="var(--color-text-earth)" opacity="0.8" />
          <rect x="43" y="10" width="4" height="25" rx="2" fill="var(--color-text-earth)" opacity="0.8" />
          <rect x="53" y="40" width="3" height="20" rx="1.5" fill="var(--color-text-earth)" opacity="0.75" />

          {/* Olas de agua en la base del tule (aparecen al hacer scroll) */}
          <path className="water-wave-anim" d="M -10 285 Q 20 280 50 285 T 110 285 L 110 300 L -10 300 Z" fill="rgba(80, 101, 85, 0.25)" />
          <path className="water-wave-anim" style={{ animationDelay: '-2.5s' }} d="M -10 290 Q 25 287 60 290 T 110 290 L 110 300 L -10 300 Z" fill="rgba(80, 101, 85, 0.45)" />
        </svg>
      </div>

      {/* Lado derecho inferior: Tules, Olas y Flor de Loto flotante */}
      <div className="chinampa-decor-right chinampa-sway-right" style={{
        position: 'fixed',
        right: '-45px', // Desplazado al borde
        bottom: '-10px',
        height: '350px',
        width: '160px',
        zIndex: 50,
        pointerEvents: 'none',
        opacity: opacityBottom,
        transform: transformRightBottom,
        transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease-out',
      }}>
        <svg viewBox="0 0 160 350" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <path d="M160 350 C 145 220, 150 110, 130 10 C 140 110, 150 220, 160 350" fill="var(--color-accent-sage)" />
          <path d="M140 350 C 120 240, 115 130, 95 30 C 105 130, 120 240, 140 350" fill="var(--color-accent-sage)" opacity="0.95" />
          <path d="M150 350 C 135 260, 130 180, 115 80 C 125 180, 135 260, 150 350" fill="var(--color-accent-sage)" opacity="0.9" />
          <path d="M120 350 C 105 280, 95 190, 80 95 C 90 190, 105 280, 120 350" fill="var(--color-accent-sage)" opacity="0.85" />

          {/* Espigas */}
          <rect x="128" y="10" width="4" height="25" rx="2" fill="var(--color-text-earth)" opacity="0.8" />
          <rect x="93" y="30" width="4" height="25" rx="2" fill="var(--color-text-earth)" opacity="0.8" />
          <rect x="113" y="80" width="3" height="20" rx="1.5" fill="var(--color-text-earth)" opacity="0.75" />

          {/* Olas de agua en la base de la flor y tule */}
          <path className="water-wave-anim" d="M -10 332 Q 35 328 80 332 T 170 332 L 170 350 L -10 350 Z" fill="rgba(80, 101, 85, 0.25)" />
          <path className="water-wave-anim" style={{ animationDelay: '-2.5s' }} d="M -10 337 Q 40 334 90 337 T 170 337 L 170 350 L -10 350 Z" fill="rgba(80, 101, 85, 0.45)" />

          {/* Flor de loto/lirio flotando en la base del canal */}
          <path d="M60 330 C 20 330, 10 350, 70 350 C 120 350, 110 330, 60 330 Z" fill="var(--color-accent-sage)" opacity="0.9" />
          <path d="M55 330 C 50 330, 48 335, 55 335 Z" fill="var(--color-bg-sand)" />
          
          <path d="M60 315 C 50 325, 40 335, 60 340 C 80 335, 70 325, 60 315 Z" fill="#f8d7da" opacity="0.95" />
          <path d="M50 320 C 42 328, 35 336, 52 340 C 65 338, 58 328, 50 320 Z" fill="#f5c6cb" opacity="0.9" />
          <path d="M70 320 C 78 328, 85 336, 68 340 C 55 338, 62 328, 70 320 Z" fill="#f5c6cb" opacity="0.9" />
          <path d="M42 328 C 32 334, 28 342, 48 342 C 55 340, 48 334, 42 328 Z" fill="#e83e8c" opacity="0.8" />
          <path d="M78 328 C 88 334, 92 342, 72 342 C 65 340, 72 334, 78 328 Z" fill="#e83e8c" opacity="0.8" />
          <circle cx="60" cy="334" r="4" fill="var(--color-accent-gold)" />
        </svg>
      </div>

      {/* Barra de navegación */}
      <Navbar />

      {/* Carrito lateral */}
      <CartDrawer />

      {/* Contenido principal animado */}
      <motion.main
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </motion.main>

      {/* Pie de página */}
      <Footer />
    </div>
  );
};
