'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Eye, Loader, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


export interface Producto {
  id: string;
  name: string;
  price: number;
  descripcion: string;
  beneficios: string;
  image?: string;
}

// Productos exclusivos de la Botica de Tierra Sagrada
const fallbackProductos: Producto[] = [
  {
    id: 'medicina-herbal',
    name: 'Medicina Herbal',
    price: 180,
    descripcion: 'Tinturas, extractos e infusiones elaborados artesanalmente con plantas cultivadas y cosechadas en la chinampa bajo el respeto tradicional mexihka.',
    beneficios: 'Auxiliar para equilibrar el organismo, fortalecer el sistema inmunológico y depurar de forma natural, devolviendo la armonía interior.',
    image: '/4.jpeg'
  },
  {
    id: 'cacao-gourmet',
    name: 'Cacao Gourmet',
    price: 220,
    descripcion: 'Cacao criollo fino de aroma de origen orgánico, tostado y molido en metate de piedra con el calor del fuego y el canto medicina.',
    beneficios: 'Abre el corazón, estimula las endorfinas, aporta un alto valor antioxidante y facilita procesos de introspección profunda.',
    image: '/2.jpeg'
  },
  {
    id: 'extracto-chilcuague',
    name: 'Extracto de Chilcuague',
    price: 250,
    descripcion: 'Contiene afinina, una alcamida con propiedades medicinales indicada para aliviar boca seca, tos, infecciones virales, fuegos, aftas, mal aliento, dolor de muelas y gingivitis, o simplemente refrescar la boca. En la piel ayuda con micosis como el pie de atleta y problemas de cicatrización. Presentación: Atomizador de 30ml.',
    beneficios: 'Ingredientes: Extracto de chilcuague, (Mandarina-Miel: extracto de mandarina y miel), (Lyptus: miel y extracto de eucalipto, romero y romero).',
    image: '/extracto-chilcuague.jpeg'
  },
  {
    id: 'extracto-nasal-chilcuague',
    name: 'Extracto Nasal de Chilcuague',
    price: 300,
    descripcion: 'Extracto con la concentración ideal para realizar una limpieza nasal profunda. Indicado para aliviar molestias relacionadas al resfriado, tos, gripa, sinusitis y rinitis. Presentación: Atomizador nasal de 30ml.',
    beneficios: 'Ingredientes: Extracto de chilcuague, agua, sal de mar, extracto de romero y extracto de eucalipto.',
    image: '/extracto-nasal-chilcuague.jpeg'
  },
  {
    id: 'jabon-intimo-espuma-cannabis',
    name: 'Jabón Íntimo en Espuma',
    price: 300,
    descripcion: 'Promueve orgasmos más potentes, duraderos y placenteros. Amplía el espectro sensorial sensibilizando los tejidos y relajando los músculos. Úsalo también como aceite de masajes. Presentación: Espumador de 120ml.',
    beneficios: 'Ingredientes: Aceite de cannabis, aceite de coco organico, aceite de oliva orgánico.',
    image: '/jabon-intimo-espuma.jpeg'
  },
  {
    id: 'aceite-cbd-300mg',
    name: 'Aceite Medicinal CBD (300mg / 20ml)',
    price: 650,
    descripcion: 'Aliado en la reducción del dolor físico, control de ansiedad, insomnio, procesos convulsivos, síntomas por quimioterapia, regulación del apetito y el estrés. Presentación: Gotero de 20ml.',
    beneficios: 'Ingredientes: aceite esencial de cannabis de espectro completo rico en CBD y aceite de oliva orgánico.',
    image: '/aceite-medicinal-cbd.jpeg'
  },
  {
    id: 'aceite-cbd-600mg',
    name: 'Aceite Medicinal CBD (600mg / 40ml)',
    price: 750,
    descripcion: 'Aliado en la reducción del dolor físico, control de ansiedad, insomnio, procesos convulsivos, síntomas por quimioterapia, regulación del apetito y el estrés. Presentación: Gotero de 40ml.',
    beneficios: 'Ingredientes: aceite esencial de cannabis de espectro completo rico en CBD y aceite de oliva orgánico.',
    image: '/aceite-medicinal-cbd.jpeg'
  },
  {
    id: 'pomada-terapeutica-cannabis',
    name: 'Pomada Terapéutica',
    price: 350,
    descripcion: 'Analgésica y antiinflamatoria, alivia los dolores musculares y articulares provocados por enfermedades como artritis, fibromialgia o por golpes. Brinda humectación aliviando los síntomas de dermatitis, psoriasis y eccema. Presentación: Envase de 62ml.',
    beneficios: 'Ingredientes: Aceite de cannabis, aceite de oliva orgánico, cera de abeja, manteca de cacao, aceites esenciales (aroma).',
    image: '/pomada-terapeutica.jpeg'
  },
  {
    id: 'lubricante-intimo-cannabis',
    name: 'Lubricante Íntimo Cannabis',
    price: 300,
    descripcion: 'Promueve orgasmos más potentes, duraderos y placenteros. Amplía el espectro sensorial sensibilizando los tejidos y relajando los músculos. Úsalo también como aceite de masajes. Presentación: Envase de 30ml.',
    beneficios: 'Ingredientes: Aceite de cannabis, aceite de coco organico, aceite de oliva orgánico.',
    image: '/lubricante-intimo-cannabis.jpeg'
  },
  {
    id: 'jabon-anti-acne',
    name: 'Jabon Anti-Acne',
    price: 110,
    descripcion: 'Jabón saponificado en frío a base de carbón vegetal activado, arcillas minerales y aceites esenciales desinfectantes y purificantes.',
    beneficios: 'Limpia profundamente las impurezas, controla la secreción sebácea y desinflama brotes sin dañar el manto lipídico natural.',
    image: '/8.jpeg'
  },
  {
    id: 'espuma-intima',
    name: 'Espuma Intima',
    price: 140,
    descripcion: 'Fórmula sumamente suave y respetuosa con infusión de caléndula, manzanilla fresca y ácido láctico vegetal para el cuidado íntimo diario.',
    beneficios: 'Mantiene el pH equilibrado de la zona íntima, alivia la irritación, previene infecciones y brinda frescura de origen vegetal.',
    image: '/22.jpeg'
  },
  {
    id: 'pomadas',
    name: 'Pomadas',
    price: 150,
    descripcion: 'Ungüento tradicional de fitoterapia elaborado con cera de abeja melipona, aceite de coco extra virgen y extractos concentrados de plantas medicinales.',
    beneficios: 'Excelente desinflamatorio y analgésico local. Alivia dolores de articulaciones, golpes, torceduras y suaviza la piel agrietada.',
    image: '/16.jpeg'
  },
  {
    id: 'aceites-medicinales',
    name: 'Aceites Medicinales',
    price: 190,
    descripcion: 'Macerados herbales en frío durante cuarenta días con plantas sagradas como el árnica, la caléndula y la ruda, adicionados con aceites esenciales.',
    beneficios: 'Ideales para masajes terapéuticos, liberar tensiones musculares y propiciar un descanso reparador y profunda relajación.',
    image: '/22.jpeg'
  },
  {
    id: 'copal',
    name: 'Copal',
    price: 90,
    descripcion: 'Resina sagrada de copal blanco puro, recolectada a mano en comunidades mexicanas. Alimento para el fuego de los altares ceremoniales.',
    beneficios: 'Purifica el aire, transmuta energías densas en vibración elevada y propicia una atmósfera de profunda meditación y recogimiento.',
    image: '/17.jpg'
  },
  {
    id: 'tabaco-organico',
    name: 'Tabaco Organico (Taita Sairi)',
    price: 130,
    descripcion: 'Tabaco tradicional cultivado de forma 100% natural sin pesticidas ni aditivos nocivos, ideal para rezo, ofrendas o sahumación ritual.',
    beneficios: 'Conecta con la tierra, aclara la mente, ayuda a centrar las intenciones en el rezo y limpia las energías densas del entorno.',
    image: '/4.jpeg'
  }
];

export const Tienda: React.FC = () => {
  const [productos] = useState<Producto[]>(fallbackProductos);
  const [loading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const { addToCart } = useCart();


  return (
    <div style={{ padding: '4rem 0', backgroundColor: 'var(--color-bg-sand)', minHeight: '80vh' }}>
      <div className="container-organic">
        {/* Encabezado */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
          <span style={{
            fontFamily: 'var(--font-title)',
            color: 'var(--color-accent-terracotta)',
            fontWeight: 600,
            fontSize: '0.9rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Medicina Chinampera
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', margin: '1rem 0' }}>Botica de Medicina Natural</h1>
          <div className="divider-handdrawn" style={{ width: '120px', margin: '1rem auto' }} />
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem' }}>
            Remedios naturales y sagrados preparados con respeto espiritual e higiene artesanal en Xochimilco.
          </p>
        </div>

        {/* Sección de Explicación de Chilcuague */}
        <style dangerouslySetInnerHTML={{__html: `
          .chilcuague-info-card {
            background-color: var(--color-bg-paper);
            border: 2px solid var(--color-accent-sage);
            border-radius: 18px 12px 18px 12px;
            padding: 2.5rem;
            margin-bottom: 5rem;
            position: relative;
          }
          .chilcuague-info-layout {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            align-items: center;
          }
          @media (min-width: 768px) {
            .chilcuague-info-layout {
              grid-template-columns: 1fr 2.5fr;
            }
          }
        `}} />
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="chilcuague-info-card"
        >
          <div style={{ position: 'absolute', top: '-15px', left: '30px', backgroundColor: 'var(--color-accent-sage)', color: 'white', padding: '0.3rem 1rem', borderRadius: '15px', fontFamily: 'var(--font-title)', fontSize: '0.8rem', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Info size={14} />
            SABIDURÍA DE LA RAÍZ
          </div>
          
          <div className="chilcuague-info-layout">
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '4.5rem', display: 'block', marginBottom: '0.5rem' }}>🌾</span>
              <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--color-accent-sage)', fontSize: '1.4rem' }}>¿Qué es el Chilcuague?</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontStyle: 'italic', marginTop: '0.2rem' }}>"Heliopsis longipes" o Raíz de Oro</p>
            </div>
            
            <div style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
              <p style={{ marginBottom: '1rem' }}>
                El <strong>Chilcuague</strong> es una joya botánica endémica de México, venerada por los pueblos Chichimeca y Pame desde hace siglos. Al morder o aplicar su raíz, se libera una molécula llamada <em>espliantol</em>, la cual causa una intensa salivación y un adormecimiento bucal terapéutico inmediato.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Propiedades curativas asombrosas:</strong>
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-earth)' }}>
                <div>🔹 <strong>Anestésico local:</strong> Calma dolores de muela y garganta.</div>
                <div>🔹 <strong>Antiséptico natural:</strong> Combate bacterias y hongos.</div>
                <div>🔹 <strong>Estimulante salival:</strong> Ayuda a la digestión e higiene bucal.</div>
                <div>🔹 <strong>Inmunomodulador:</strong> Eleva las defensas biológicas.</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Título Catálogo */}
        <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.8rem', marginBottom: '2rem', textAlign: 'center' }}>
          Medicinas Disponibles
        </h2>

        {/* Loader o Catálogo */}
        {loading && productos.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px', flexDirection: 'column', gap: '1rem' }}>
            <Loader size={36} className="animate-float-slow" style={{ color: 'var(--color-accent-terracotta)' }} />
            <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>Cosechando raíces curativas...</p>
          </div>
        ) : (
          <div>
            <style dangerouslySetInnerHTML={{__html: `
              .products-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 2.5rem;
              }
              .product-card {
                display: flex;
                flex-direction: column;
                height: 100%;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
              }
              .product-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0,0,0,0.05);
              }
              .product-image-container {
                width: 100%;
                height: 320px;
                overflow: hidden;
                border-bottom: 2px solid var(--color-border);
              }
              .product-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.5s ease;
              }
              .product-card:hover .product-image {
                transform: scale(1.04);
              }
              .modal-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 2rem;
              }
              @media (min-width: 768px) {
                .modal-grid {
                  grid-template-columns: 1.1fr 0.9fr;
                  align-items: center;
                }
              }
              .modal-image-container {
                width: 100%;
              }
              .modal-image {
                width: 100%;
                height: 320px;
                object-fit: cover;
                border-radius: 10px;
                border: 2px solid var(--color-border);
              }
              @media (min-width: 768px) {
                .modal-image {
                  height: 460px;
                }
              }
            `}} />
            
            <div className="products-grid">
              {productos.map((prod) => (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="card-handmade product-card"
                  style={{ padding: 0, overflow: 'hidden' }}
                >
                  <div className="product-image-container">
                    {prod.image ? (
                      <img src={prod.image} alt={prod.name} className="product-image" loading="lazy" />
                    ) : (
                      <div style={{
                        height: '100%',
                        backgroundColor: 'var(--color-accent-soft)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                      }}>
                        🌱
                      </div>
                    )}
                  </div>

                  {/* Info Producto */}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.4rem', minHeight: '2.8rem', display: 'flex', alignItems: 'center' }}>
                      {prod.name}
                    </h3>
                    
                    <span style={{
                      fontFamily: 'var(--font-title)',
                      fontSize: '1.25rem',
                      color: 'var(--color-accent-terracotta)',
                      fontWeight: 700,
                      display: 'block',
                      marginBottom: '1.2rem',
                    }}>
                      ${prod.price} MXN
                    </span>

                    {/* Botones de acción */}
                    <div style={{ display: 'flex', gap: '0.6rem', marginTop: 'auto' }}>
                      <button
                        onClick={() => setSelectedProduct(prod)}
                        style={{
                          border: '1px solid var(--color-border)',
                          background: '#fff',
                          borderRadius: '8px',
                          padding: '0.6rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-text-earth)',
                        }}
                        title="Detalles"
                      >
                        <Eye size={18} />
                      </button>
                      
                      <button
                        className="btn-handwritten btn-primary-organic"
                        onClick={() => addToCart({ id: prod.id, name: prod.name, price: prod.price, image: prod.image })}
                        style={{
                          flex: 1,
                          padding: '0.6rem 1rem',
                          fontSize: '0.8rem',
                          justifyContent: 'center',
                          borderRadius: '8px',
                        }}
                      >
                        <ShoppingBag size={14} />
                        Agregar
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox / Modal de Detalle de Producto */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '1rem',
            }}
          >
            {/* Backdrop */}
            <div
              onClick={() => setSelectedProduct(null)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                cursor: 'pointer',
              }}
            />
            
            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '850px',
                maxHeight: '90vh',
                overflowY: 'auto',
                backgroundColor: 'var(--color-bg-sand)',
                border: '3px solid var(--color-text-earth)',
                zIndex: 10000,
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.02\'/%3E%3C/svg%3E")',
                padding: '2rem',
              }}
              className="card-handmade"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: 'var(--color-text-earth)',
                  zIndex: 10,
                }}
              >
                ✕
              </button>

              <div className="modal-grid">
                {/* Columna Izquierda: Imagen */}
                <div className="modal-image-container">
                  {selectedProduct.image ? (
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="modal-image"
                    />
                  ) : (
                    <div style={{
                      height: '320px',
                      backgroundColor: 'var(--color-accent-soft)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '4rem',
                      borderRadius: '10px',
                    }}>
                      🌱
                    </div>
                  )}
                </div>

                {/* Columna Derecha: Información */}
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                  <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.6rem', marginBottom: '0.4rem', marginTop: 0 }}>
                    {selectedProduct.name}
                  </h2>
                  
                  <span style={{
                    fontFamily: 'var(--font-title)',
                    fontSize: '1.4rem',
                    color: 'var(--color-accent-terracotta)',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '1rem',
                  }}>
                    ${selectedProduct.price} MXN
                  </span>

                  <div style={{ marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--color-accent-sage)', marginBottom: '0.2rem', fontSize: '1.05rem' }}>Descripción:</h4>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{selectedProduct.descripcion}</p>
                    
                    <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--color-accent-sage)', marginBottom: '0.2rem', fontSize: '1.05rem' }}>Beneficios e indicaciones:</h4>
                    <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>{selectedProduct.beneficios}</p>
                  </div>

                  <button
                    className="btn-handwritten btn-primary-organic"
                    onClick={() => {
                      addToCart({ id: selectedProduct.id, name: selectedProduct.name, price: selectedProduct.price, image: selectedProduct.image });
                      setSelectedProduct(null);
                    }}
                    style={{ width: '100%', justifyContent: 'center', padding: '0.8rem' }}
                  >
                    <ShoppingBag size={18} />
                    Agregar a la Cesta
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
