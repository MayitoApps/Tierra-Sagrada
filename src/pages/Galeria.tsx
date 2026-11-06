import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Loader, Play, X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MediaItem {
  id: string;
  url: string;
  tipo: 'foto' | 'video';
  categoria: 'temazcal' | 'cacao' | 'chinampa' | 'plantas';
  titulo?: string;
}

// Elementos de respaldo en caso de que no haya conexión a Firestore
const fallbackMedia: MediaItem[] = [
  {
    id: 'm1',
    url: '/1.jpeg',
    tipo: 'foto',
    categoria: 'temazcal',
    titulo: 'Preparación del Temazcal',
  },
  {
    id: 'm2',
    url: '/2.jpeg',
    tipo: 'foto',
    categoria: 'cacao',
    titulo: 'Ceremonia de Cacao',
  },
  {
    id: 'm3',
    url: '/3.jpeg',
    tipo: 'foto',
    categoria: 'chinampa',
    titulo: 'Atardecer en la Chinampa',
  },
  {
    id: 'm4',
    url: '/4.jpeg',
    tipo: 'foto',
    categoria: 'plantas',
    titulo: 'Plantas Sagradas de Medicina',
  },
  {
    id: 'm5',
    url: '/5.jpeg',
    tipo: 'foto',
    categoria: 'temazcal',
    titulo: 'El Fuego Sagrado',
  },
  {
    id: 'm6',
    url: '/6.jpeg',
    tipo: 'foto',
    categoria: 'cacao',
    titulo: 'Círculo de Cantos y Cacao',
  },
  {
    id: 'm7',
    url: '/7.jpeg',
    tipo: 'foto',
    categoria: 'chinampa',
    titulo: 'Canales de Cuemanco',
  },
  {
    id: 'm8',
    url: '/8.jpeg',
    tipo: 'foto',
    categoria: 'plantas',
    titulo: 'Cosecha de Hierbas',
  },
  {
    id: 'm9',
    url: '/9.jpeg',
    tipo: 'foto',
    categoria: 'temazcal',
    titulo: 'Entrada al Temazcal',
  },
  {
    id: 'm10',
    url: '/10.jpg',
    tipo: 'foto',
    categoria: 'cacao',
    titulo: 'Medicina de Cacao Orgánico',
  },
  {
    id: 'm11',
    url: '/11.jpeg',
    tipo: 'foto',
    categoria: 'chinampa',
    titulo: 'El Altar a Cielo Abierto',
  },
  {
    id: 'm12',
    url: '/12.jpeg',
    tipo: 'foto',
    categoria: 'plantas',
    titulo: 'Chilcuague o Raíz de Oro',
  },
  {
    id: 'm13',
    url: '/13.jpg',
    tipo: 'foto',
    categoria: 'temazcal',
    titulo: 'Abuelitas Piedras Volcánicas',
  },
  {
    id: 'm14',
    url: '/14.jpeg',
    tipo: 'foto',
    categoria: 'cacao',
    titulo: 'Apertura de Corazón',
  },
  {
    id: 'm15',
    url: '/15.jpeg',
    tipo: 'foto',
    categoria: 'chinampa',
    titulo: 'Sauce Llorón y Agua',
  },
  {
    id: 'm16',
    url: '/16.jpeg',
    tipo: 'foto',
    categoria: 'plantas',
    titulo: 'Secado de Plantas Curativas',
  },
  {
    id: 'm17',
    url: '/17.jpg',
    tipo: 'foto',
    categoria: 'temazcal',
    titulo: 'Limpieza y Sahumación',
  },
  {
    id: 'm18',
    url: '/18.jpeg',
    tipo: 'foto',
    categoria: 'chinampa',
    titulo: 'Navegación en Canoa',
  },
  {
    id: 'm19',
    url: '/19.jpeg',
    tipo: 'foto',
    categoria: 'temazcal',
    titulo: 'Sahumadora Ceremonial',
  },
  {
    id: 'm20',
    url: '/20.jpeg',
    tipo: 'foto',
    categoria: 'cacao',
    titulo: 'Compartiendo la Medicina',
  },
  {
    id: 'm21',
    url: '/21.jpeg',
    tipo: 'foto',
    categoria: 'chinampa',
    titulo: 'Cultivos Chinamperos Orgánicos',
  },
  {
    id: 'm22',
    url: '/22.jpeg',
    tipo: 'foto',
    categoria: 'plantas',
    titulo: 'Hierbas Secas en el Altar',
  },
  {
    id: 'm23',
    url: '/23.jpeg',
    tipo: 'foto',
    categoria: 'temazcal',
    titulo: 'El Rezo ante el Fuego',
  },
  {
    id: 'm24',
    url: '/24.jpeg',
    tipo: 'foto',
    categoria: 'cacao',
    titulo: 'Cacao Molido en Metate',
  }
];

const getInitialMedia = (): MediaItem[] => {
  const cached = localStorage.getItem('tierra_sagrada_galeria');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      return fallbackMedia;
    }
  }
  return fallbackMedia;
};

export const Galeria: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaItem[]>(getInitialMedia);
  const [loading, setLoading] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState<string>('todos');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'galeria'));
        const dataList: MediaItem[] = [];
        
        querySnapshot.forEach((doc) => {
          dataList.push({ id: doc.id, ...doc.data() } as MediaItem);
        });

        if (dataList.length > 0) {
          setMediaList(dataList);
          localStorage.setItem('tierra_sagrada_galeria', JSON.stringify(dataList));
        } else {
          setMediaList(fallbackMedia);
          localStorage.removeItem('tierra_sagrada_galeria');
        }
      } catch (error) {
        console.error('Error al recuperar galería de Firestore: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const categorias = [
    { key: 'todos', label: 'Todos' },
    { key: 'temazcal', label: 'Temazcal' },
    { key: 'cacao', label: 'Cacao' },
    { key: 'chinampa', label: 'La Chinampa' },
    { key: 'plantas', label: 'Plantas Medicinales' },
  ];

  const filteredMedia = categoriaActiva === 'todos'
    ? mediaList
    : mediaList.filter(item => item.categoria === categoriaActiva);

  return (
    <div style={{ padding: '4rem 0', backgroundColor: 'var(--color-bg-sand)', minHeight: '80vh' }}>
      <div className="container-organic">
        {/* Encabezado */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <span style={{
            fontFamily: 'var(--font-title)',
            color: 'var(--color-accent-terracotta)',
            fontWeight: 600,
            fontSize: '0.9rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Galería Visual
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', margin: '1rem 0' }}>El Rezo en Imágenes</h1>
          <div className="divider-handdrawn" style={{ width: '120px', margin: '1rem auto' }} />
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem' }}>
            Un destello de las ceremonias, la chinampa viva de Cuemanco y las hierbas medicinales.
          </p>
        </div>

        {/* Filtros de Categorías */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.8rem',
          flexWrap: 'wrap',
          marginBottom: '3rem',
        }}>
          {categorias.map((cat) => {
            const isActive = categoriaActiva === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setCategoriaActiva(cat.key)}
                className="btn-handwritten"
                style={{
                  padding: '0.5rem 1.2rem',
                  fontSize: '0.85rem',
                  backgroundColor: isActive ? 'var(--color-accent-sage)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--color-text-earth)',
                  borderColor: isActive ? 'var(--color-accent-sage)' : 'var(--color-border)',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Loader */}
        {loading && mediaList.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px', flexDirection: 'column', gap: '1rem' }}>
            <Loader size={36} className="animate-float-slow" style={{ color: 'var(--color-accent-terracotta)' }} />
            <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>Revelando imágenes sagradas...</p>
          </div>
        ) : (
          <div>
            <style dangerouslySetInnerHTML={{__html: `
              .gallery-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 2rem;
              }
              .gallery-card {
                position: relative;
                height: 250px;
                overflow: hidden;
                border: 2px solid var(--color-border);
                border-radius: 12px 18px 10px 15px / 15px 10px 18px 12px;
                cursor: pointer;
                transition: var(--transition-smooth);
              }
              .gallery-card:hover {
                transform: scale(1.02) rotate(0.5deg);
                border-color: var(--color-text-earth);
                box-shadow: 5px 8px 20px rgba(44, 34, 30, 0.08);
              }
              .gallery-card-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: var(--transition-smooth);
              }
              .gallery-card-hover {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(44, 34, 30, 0.6);
                opacity: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: #fff;
                transition: var(--transition-smooth);
                padding: 1rem;
                text-align: center;
              }
              .gallery-card:hover .gallery-card-hover {
                opacity: 1;
              }
            `}} />
            
            <motion.div
              layout
              className="gallery-grid"
            >
              <AnimatePresence>
                {filteredMedia.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="gallery-card"
                    onClick={() => setSelectedMedia(item)}
                  >
                    {item.tipo === 'foto' ? (
                      <img src={item.url} alt={item.titulo || 'Galería Tierra Sagrada'} className="gallery-card-image" loading="lazy" />
                    ) : (
                      // Placeholder o miniatura para video
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <img src={item.url} alt={item.titulo || 'Video de Galería'} className="gallery-card-image" loading="lazy" />
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: 'rgba(200, 107, 75, 0.9)',
                          color: '#fff',
                          borderRadius: '50%',
                          width: '50px',
                          height: '50px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 0 15px rgba(0,0,0,0.2)',
                          zIndex: 2,
                        }}>
                          <Play size={22} style={{ marginLeft: '3px' }} />
                        </div>
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="gallery-card-hover">
                      <div style={{
                        border: '1.5px solid #fff',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.8rem',
                      }}>
                        <Eye size={18} />
                      </div>
                      <h4 style={{ color: '#fff', fontFamily: 'var(--font-title)', fontSize: '1.1rem' }}>
                        {item.titulo || 'Ver Multimedia'}
                      </h4>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.3rem', color: 'var(--color-accent-gold)' }}>
                        {item.categoria}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedMedia && (
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
              backgroundColor: 'rgba(20, 15, 12, 0.95)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
            }}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setSelectedMedia(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '0.5rem',
                zIndex: 10,
              }}
            >
              <X size={32} />
            </button>

            {/* Contenido multimedia expandido */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              style={{
                position: 'relative',
                maxWidth: '90%',
                maxHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {selectedMedia.tipo === 'foto' ? (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.titulo}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '75vh',
                    objectFit: 'contain',
                    border: '3px solid white',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  }}
                />
              ) : (
                // Para video reproducir usando tag HTML5 (o un embed de YouTube si el url es de youtube)
                <video
                  src={selectedMedia.url}
                  controls
                  autoPlay
                  style={{
                    maxWidth: '100%',
                    maxHeight: '75vh',
                    border: '3px solid white',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  }}
                />
              )}

              {selectedMedia.titulo && (
                <p style={{
                  color: 'white',
                  fontFamily: 'var(--font-title)',
                  fontSize: '1.25rem',
                  marginTop: '1.2rem',
                  textAlign: 'center',
                  letterSpacing: '0.05em',
                }}>
                  {selectedMedia.titulo}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
