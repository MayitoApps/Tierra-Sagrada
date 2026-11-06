'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft, Calendar, Clock, Send, BookOpen } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  date: string;
  author: string;
  authorRole: string;
  category: 'Herbolaria' | 'Rituales' | 'Chinampa';
  image: string;
  readTime: string;
  summary: string;
  content: string[];
  quotes?: string[];
}

export const Rezandero: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const articles: Article[] = [
    {
      id: 'temazcal-vientre-madre',
      title: 'La medicina del Temazcal: Volver al vientre de la Madre Tierra',
      date: '15 de Junio, 2026',
      author: 'Abuela María Guadalupe',
      authorRole: 'Temazcalera y Curandera Tradicional',
      category: 'Rituales',
      image: '/1.jpeg',
      readTime: '6 min de lectura',
      summary: 'El temazcal representa la matriz de la Madre Tierra. Entrar en este baño de vapor sagrado es una oportunidad de morir a lo viejo y renacer purificado a través de las piedras volcánicas y cantos ancestrales.',
      content: [
        'El Temazcal, proveniente del náhuatl "temazcalli" (casa de baño de vapor), no es un simple sauna, sino uno de los rituales terapéuticos y espirituales más antiguos y vivos de Mesoamérica. Estructuralmente, su forma de cúpula de barro representa la matriz de la Madre Tierra (Tonantzin). Al entrar en él, nos introducimos al vientre materno para confrontar nuestra propia oscuridad y emerger renovados.',
        'El corazón del temazcal son las "Abuelitas", piedras volcánicas ardientes que se introducen en el centro de la estructura. La persona que guía el temazcal vierte infusiones de hierbas medicinales (como copal, eucalipto, salvia, manzanilla y romero) sobre las piedras calientes. Este vapor medicinal, cargado de la energía del fuego y las plantas, ingresa a través del sistema respiratorio y los poros de la piel, desencadenando una profunda purificación física y celular.',
        'Durante las "puertas" o etapas del temazcal, la oscuridad y el calor nos invitan a la introspección. Acompañados por el canto medicinal y los latidos del tambor, soltamos los miedos, las tensiones físicas y los patrones mentales que ya no nos sirven. Es un acto de entrega absoluta al elemento agua y al espíritu del fuego, donde sudamos todo lo que envenena nuestro cuerpo y nuestra mente.',
        'Al salir del temazcal, el choque con el aire fresco y el viento de la chinampa se siente como un auténtico nacimiento. Sentirse vivo, con los sentidos agudizados y un corazón aligerado, es la mayor prueba de que hemos sido devueltos a la tierra con un nuevo rezo en los labios. Ometéotl.'
      ],
      quotes: [
        'En la oscuridad del temazcal no hay rostros ni diferencias. Todos somos un solo latido en el vientre de la tierra.',
        'El sudor limpia el cuerpo, el llanto limpia el alma y el canto fortalece el espíritu.'
      ]
    },
    {
      id: 'chilcuague-raiz-oro',
      title: 'Chilcuague: La milagrosa raíz de oro mexicana',
      date: '02 de Junio, 2026',
      author: 'Taita Juan',
      authorRole: 'Guardián del Canto y Plantas Sagradas',
      category: 'Herbolaria',
      image: '/12.jpeg',
      readTime: '5 min de lectura',
      summary: 'Originaria de la Sierra Gorda mexicana, la raíz de Chilcuague (Heliopsis longipes) es venerada por su increíble poder anestésico, antibiótico y estimulante de las defensas naturales.',
      content: [
        'El Chilcuague (Heliopsis longipes), comúnmente llamado "Raíz de Oro", es un tesoro botánico endémico de la región de la Sierra Gorda de Guanajuato, Querétaro y San Luis Potosí. Tradicionalmente utilizado por los pueblos chichimecas y otomíes, este tallo subterráneo guarda propiedades farmacológicas tan asombrosas que la ciencia moderna apenas comienza a comprender formalmente.',
        'Al masticar una pequeña porción de raíz de chilcuague, se desata una intensa sensación de hormigueo acompañada de una abundante salivación. Este efecto es provocado por las alcamidas, componentes activos que estimulan de inmediato las glándulas salivales. La saliva no solo lubrica, sino que contiene enzimas inmunoglobulinas que defienden el cuerpo. El chilcuague es un anestésico local formidable para dolores dentales, infecciones de garganta e inflamación de encías.',
        'Además de su poder físico, el chilcuague posee propiedades antimicrobianas, antimicóticas y antiparasitarias sumamente potentes. Los arrieros del México antiguo la llevaban en sus bolsillos para tratar picaduras de insectos, desinfectar heridas e incluso purificar el agua del campo. Masticar raíz de chilcuague antes de internarse en climas difíciles ayudaba a prevenir infecciones estomacales.',
        'En nuestro caminar medicinal, honramos al chilcuague como un guardián del fuego interno. Ayuda a limpiar las palabras atascadas en la garganta y activa la energía de autocuración del organismo. En Tierra Sagrada, elaboramos tinturas y atomizadores con chilcuague orgánico para compartir la bendición de esta planta de poder.'
      ],
      quotes: [
        'La raíz de oro despierta el agua viva de nuestra boca, la medicina más cercana que poseemos para protegernos.',
        'Un regalo de la Sierra Gorda que limpia la palabra y restaura el aliento divino.'
      ]
    },
    {
      id: 'chinampa-tecnologia-ancestral',
      title: 'La Chinampa: Tecnologías ancestrales y cultivos vivos en Xochimilco',
      date: '28 de Mayo, 2026',
      author: 'Luna Celeste',
      authorRole: 'Guía de Círculos Femeninos y Rezo Lunar',
      category: 'Chinampa',
      image: '/7.jpeg',
      readTime: '7 min de lectura',
      summary: 'Explora la maravillosa arquitectura ecológica de las chinampas: islas artificiales que combinan lodo fértil, raíces de ahuejote y canales de agua para alimentar y sanar a generaciones.',
      content: [
        'La chinampa es una de las mayores hazañas de ingeniería agrícola de la humanidad. Concebida por las civilizaciones mesoamericanas hace más de mil años en la cuenca del Valle de México, esta técnica consiste en la creación de islas artificiales cultivables sobre el lecho del lago de poca profundidad. En Xochimilco, mantenemos viva esta tradición que fusiona agua y tierra fértil.',
        'La construcción de una chinampa comienza delimitando el área con estacas de ahuejotes (Salix bonplandiana), un tipo de sauce llorón nativo cuyas raíces crecen verticalmente hacia abajo buscando el fondo lodoso. Estas raíces actúan como anclas biológicas vivas que amarran el perímetro de la isla impidiendo que la tierra se deslave hacia los canales. Luego, se rellenan estas áreas con capas alternadas de vegetación acuática (lirio y tule) y lodo extraído del fondo del canal, rico en materia orgánica en descomposición.',
        'Esta disposición permite que la chinampa reciba humedad constante por capilaridad desde el nivel inferior, reduciendo drásticamente la necesidad de riego externo. El agua que rodea las islas actúa como un regulador térmico natural, protegiendo los cultivos de heladas extremas y creando un microclima sumamente productivo capaz de dar hasta cuatro cosechas al año.',
        'Nuestra chinampa en Tierra Sagrada no es solo una parcela de hortalizas; es un santuario biológico donde sembramos plantas medicinales, flores ceremoniales como el cempasúchil y hierbas de olor. Al caminar sobre el lodo chinampero, pisamos la memoria de nuestros ancestros y honramos un ciclo hidrológico sagrado que sigue alimentando el espíritu de Xochimilco.'
      ],
      quotes: [
        'El ahuejote es el guardián de madera que sostiene el suelo que pisamos. Sin sauce, no hay chinampa.',
        'La chinampa nos enseña que el lodo más profundo puede dar origen a las flores más hermosas.'
      ]
    },
    {
      id: 'cacao-medicina-corazon',
      title: 'El despertar del Cacao: La medicina que late en el corazón',
      date: '10 de Mayo, 2026',
      author: 'Sofía Amatista',
      authorRole: 'Facilitadora de Cacao y Canto Medicina',
      category: 'Rituales',
      image: '/2.jpeg',
      readTime: '5 min de lectura',
      summary: 'El cacao es mucho más que chocolate; es una medicina ancestral que nutre el sistema cardiovascular, libera endorfinas y abre sutilmente las puertas de nuestra sensibilidad emocional.',
      content: [
        'Para las civilizaciones maya y mexica, el cacao ("kakaw") era el alimento de los dioses. No se consumía como golosina, sino como una bebida sagrada reservada para guerreros, sacerdotes y ceremonias especiales de unión y transición. En la actualidad, el rezo del cacao regresa para recordarnos cómo habitar el corazón.',
        'Desde la perspectiva bioquímica, el cacao puro es una de las fuentes de antioxidantes y magnesio más concentradas del reino vegetal. Además, contiene teobromina, un estimulante suave que dilata los vasos sanguíneos y activa la circulación del corazón de forma prolongada, a diferencia de la cafeína que altera el sistema nervioso. Consumir cacao en un entorno ceremonial relaja el cuerpo y estimula la liberación de dopamina y anandamida, conocida como el neurotransmisor del bienestar.',
        'En una ceremonia de cacao, preparamos la pasta de cacao natural 100% puro en agua de manantial, endulzada ligeramente con miel silvestre o especias como chile criollo y canela para activar su calor. Al beberlo con intención, entramos en un espacio de escucha sensible. El cacao no altera la conciencia ni produce visiones; en su lugar, afina nuestra capacidad de sentir, perdonar y expresar lo que guardamos.',
        'El cacao actúa como un suave abridor del pecho. Acompañado de cantos medicina que resuenan en la chinampa, nos conecta con la vibración del amor propio y la gratitud profunda hacia la existencia, recordándonos que la curación verdadera siempre comienza por el amor.'
      ],
      quotes: [
        'El cacao viaja directo al corazón. Te recuerda quién eres cuando dejas de pensar tanto.',
        'Una semilla que guarda la memoria del sol y de la selva cálida, lista para derretir la frialdad del alma.'
      ]
    }
  ];

  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          art.summary.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          art.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const containerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div style={{ padding: '4rem 0', backgroundColor: 'var(--color-bg-sand)', minHeight: '90vh' }}>
      <div className="container-organic">
        <AnimatePresence mode="wait">
          {!activeArticle ? (
            /* VISTA DEL LISTADO DE ENTRADAS */
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Encabezado del Blog */}
              <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
                <span style={{
                  fontFamily: 'var(--font-title)',
                  color: 'var(--color-accent-sage)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}>
                  El Rezandero
                </span>
                <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', margin: '1rem 0' }}>
                  Sabiduría y Medicina Tradicional
                </h1>
                <div className="divider-handdrawn" style={{ width: '120px', margin: '1rem auto' }} />
                <p style={{ color: 'var(--color-text-earth)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                  Bienvenido a nuestro espacio de palabra escrita. Aquí compartimos los saberes de la herbolaria mexicana, los secretos del cultivo chinampero y el rezo espiritual de nuestras ceremonias ancestrales.
                </p>
              </div>

              {/* Filtros e Input de Búsqueda */}
              <style dangerouslySetInnerHTML={{__html: `
                .search-filter-wrapper {
                  display: flex;
                  flex-direction: column;
                  gap: 1.5rem;
                  margin-bottom: 3rem;
                  background-color: var(--color-bg-paper);
                  padding: 1.5rem;
                  border-radius: 12px 18px 12px 12px;
                  border: 1px solid var(--color-border);
                }
                .search-input-container {
                  position: relative;
                  width: 100%;
                }
                .search-input {
                  width: 100%;
                  padding: 0.8rem 1rem 0.8rem 2.8rem;
                  border: 2px solid var(--color-border);
                  border-radius: 30px;
                  background-color: var(--color-bg-sand);
                  font-family: var(--font-body);
                  font-size: 0.95rem;
                  color: var(--color-text-earth);
                  outline: none;
                  transition: var(--transition-fast);
                }
                .search-input:focus {
                  border-color: var(--color-accent-terracotta);
                  box-shadow: 0 0 0 3px rgba(200, 107, 75, 0.1);
                }
                .filter-buttons {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 0.6rem;
                }
                .filter-btn {
                  font-family: var(--font-title);
                  font-size: 0.85rem;
                  font-weight: 600;
                  background: none;
                  border: 1px solid var(--color-border);
                  padding: 0.5rem 1.2rem;
                  border-radius: 20px;
                  cursor: pointer;
                  color: var(--color-text-muted);
                  transition: var(--transition-fast);
                }
                .filter-btn.active {
                  background-color: var(--color-accent-sage);
                  color: #fff;
                  border-color: var(--color-accent-sage);
                }
                .filter-btn:hover:not(.active) {
                  border-color: var(--color-accent-terracotta);
                  color: var(--color-accent-terracotta);
                }
                @media (min-width: 768px) {
                  .search-filter-wrapper {
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.2rem 2rem;
                  }
                  .search-input-container {
                    width: 300px;
                  }
                }
              `}} />

              <div className="search-filter-wrapper">
                <div className="filter-buttons">
                  {['Todas', 'Herbolaria', 'Rituales', 'Chinampa'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="search-input-container">
                  <Search
                    size={18}
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--color-text-muted)'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Buscar artículos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>

              {/* Grid de Artículos */}
              <style dangerouslySetInnerHTML={{__html: `
                .articles-grid {
                  display: grid;
                  grid-template-columns: 1fr;
                  gap: 3rem;
                  margin-bottom: 5rem;
                }
                @media (min-width: 768px) {
                  .articles-grid {
                    grid-template-columns: repeat(2, 1fr);
                  }
                }
                .article-img-wrapper {
                  width: 100%;
                  height: 220px;
                  overflow: hidden;
                  border-bottom: 2px solid var(--color-border);
                  position: relative;
                }
                .article-img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  transition: var(--transition-smooth);
                }
                .article-card:hover .article-img {
                  transform: scale(1.05);
                }
                .article-category-badge {
                  position: absolute;
                  top: 1rem;
                  right: 1rem;
                  background-color: rgba(251, 249, 244, 0.95);
                  color: var(--color-accent-sage);
                  font-family: var(--font-title);
                  font-size: 0.75rem;
                  font-weight: 700;
                  padding: 0.2rem 0.8rem;
                  border-radius: 12px;
                  border: 1px solid var(--color-border);
                }
              `}} />

              {filteredArticles.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                  className="articles-grid"
                >
                  {filteredArticles.map((art) => (
                    <motion.div
                      key={art.id}
                      variants={cardVariants}
                      className="card-handmade article-card"
                      style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                    >
                      <div className="article-img-wrapper">
                        <img src={art.image} alt={art.title} className="article-img" />
                        <span className="article-category-badge">{art.category}</span>
                      </div>

                      <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        {/* Meta */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          fontSize: '0.8rem',
                          color: 'var(--color-text-muted)',
                          marginBottom: '1rem'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Calendar size={13} />
                            <span>{art.date}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Clock size={13} />
                            <span>{art.readTime}</span>
                          </div>
                        </div>

                        <h2 style={{
                          fontSize: '1.4rem',
                          lineHeight: '1.3',
                          marginBottom: '1rem',
                          fontFamily: 'var(--font-title)',
                          color: 'var(--color-text-earth)'
                        }}>
                          {art.title}
                        </h2>

                        <p style={{
                          fontSize: '0.9rem',
                          color: 'var(--color-text-muted)',
                          lineHeight: '1.6',
                          marginBottom: '1.5rem',
                          flexGrow: 1
                        }}>
                          {art.summary}
                        </p>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderTop: '1px solid var(--color-border)',
                          paddingTop: '1rem'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>👤</span>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-earth)' }}>
                                {art.author}
                              </span>
                              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
                                {art.authorRole}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setActiveArticle(art);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="btn-handwritten"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', gap: '0.3rem' }}
                          >
                            <BookOpen size={14} />
                            <span>Leer</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--color-text-muted)' }}>
                  <span style={{ fontSize: '3rem' }}>🍃</span>
                  <h3 style={{ margin: '1rem 0' }}>No encontramos artículos con esos filtros</h3>
                  <p style={{ fontSize: '0.9rem' }}>Prueba con otra palabra o selecciona otra categoría.</p>
                </div>
              )}

              {/* Caja de Suscripción al Newsletter */}
              <style dangerouslySetInnerHTML={{__html: `
                .newsletter-container {
                  max-width: 700px;
                  margin: 6rem auto 2rem auto;
                  padding: 3rem;
                  background-color: var(--color-bg-paper);
                  border: 2px dashed var(--color-accent-sage);
                  border-radius: 16px;
                  text-align: center;
                }
                .newsletter-form {
                  display: flex;
                  flex-direction: column;
                  gap: 1rem;
                  margin-top: 2rem;
                }
                .newsletter-input {
                  flex-grow: 1;
                  padding: 0.8rem 1.5rem;
                  border: 2px solid var(--color-border);
                  border-radius: 30px;
                  background-color: var(--color-bg-sand);
                  font-family: var(--font-body);
                  color: var(--color-text-earth);
                  outline: none;
                }
                .newsletter-input:focus {
                  border-color: var(--color-accent-sage);
                }
                @media (min-width: 576px) {
                  .newsletter-form {
                    flex-direction: row;
                  }
                }
              `}} />

              <div className="newsletter-container">
                <span style={{ fontSize: '2rem' }}>📮</span>
                <h2 style={{ fontSize: '1.8rem', margin: '0.8rem 0 0.5rem 0', fontFamily: 'var(--font-title)' }}>
                  El Rezo de la Tierra
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                  Inscríbete a nuestro boletín para recibir reflexiones, recetas de medicina herbolaria tradicional e invitaciones a nuestras ceremonias en Xochimilco.
                </p>

                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <input
                    type="email"
                    required
                    placeholder="Tu correo electrónico..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-input"
                  />
                  <button type="submit" className="btn-handwritten btn-primary-organic" style={{ gap: '0.5rem' }}>
                    <Send size={16} />
                    <span>Suscribirme</span>
                  </button>
                </form>

                <AnimatePresence>
                  {subscribed && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ color: 'var(--color-accent-sage)', fontWeight: 600, fontSize: '0.9rem', marginTop: '1rem' }}
                    >
                      ✓ ¡Gracias por sembrar tu palabra! Te hemos enviado un correo de confirmación.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            /* VISTA DEL DETALLE DEL ARTÍCULO */
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              style={{ maxWidth: '850px', margin: '0 auto' }}
            >
              {/* Botón de volver */}
              <button
                onClick={() => {
                  setActiveArticle(null);
                  window.scrollTo({ top: 0 });
                }}
                className="btn-handwritten"
                style={{ marginBottom: '2.5rem', padding: '0.6rem 1.2rem', gap: '0.4rem', alignSelf: 'flex-start' }}
              >
                <ArrowLeft size={16} />
                <span>Volver al blog</span>
              </button>

              {/* Encabezado del Artículo */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  fontSize: '0.85rem',
                  color: 'var(--color-text-muted)',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    backgroundColor: 'var(--color-accent-soft)',
                    color: 'var(--color-text-earth)',
                    fontWeight: 700,
                    padding: '0.2rem 0.8rem',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-title)',
                    fontSize: '0.75rem'
                  }}>
                    {activeArticle.category}
                  </span>
                  <span>•</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={14} />
                    <span>{activeArticle.date}</span>
                  </div>
                  <span>•</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={14} />
                    <span>{activeArticle.readTime}</span>
                  </div>
                </div>

                <h1 style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                  lineHeight: '1.2',
                  marginBottom: '1.5rem',
                  color: 'var(--color-text-earth)',
                  fontFamily: 'var(--font-title)'
                }}>
                  {activeArticle.title}
                </h1>

                {/* Perfil del Autor */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  padding: '1rem 0',
                  borderTop: '1px solid var(--color-border)',
                  borderBottom: '1px solid var(--color-border)'
                }}>
                  <span style={{ fontSize: '2rem' }}>👤</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-earth)' }}>
                      Por {activeArticle.author}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {activeArticle.authorRole}
                    </p>
                  </div>
                </div>
              </div>

              {/* Imagen Destacada con Borde Orgánico */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  style={{
                    width: '100%',
                    maxHeight: '450px',
                    objectFit: 'cover',
                    border: '3px solid var(--color-text-earth)',
                    boxShadow: '10px 10px 0 var(--color-accent-sage)',
                  }}
                  className="organic-border-2"
                />
              </div>

              {/* Contenido de lectura */}
              <style dangerouslySetInnerHTML={{__html: `
                .article-body-p {
                  font-size: 1.1rem;
                  line-height: 1.85;
                  color: var(--color-text-earth);
                  margin-bottom: 2rem;
                  text-align: justify;
                }
                .article-quote-box {
                  background-color: var(--color-bg-paper);
                  border-left: 4px solid var(--color-accent-terracotta);
                  padding: 1.5rem 2rem;
                  margin: 2.5rem 0;
                  border-radius: 0 16px 16px 0;
                }
                .article-quote-text {
                  font-family: var(--font-title);
                  font-size: 1.25rem;
                  font-style: italic;
                  color: var(--color-text-earth);
                  line-height: 1.4;
                  margin-bottom: 0.5rem;
                }
                .article-quote-symbol {
                  font-size: 2.5rem;
                  color: var(--color-accent-terracotta);
                  opacity: 0.3;
                  line-height: 0;
                  font-family: serif;
                  height: 10px;
                  display: block;
                }
              `}} />

              <div style={{ padding: '0 0.5rem 4rem 0.5rem' }}>
                {activeArticle.content.map((paragraph, index) => (
                  <React.Fragment key={index}>
                    <p className="article-body-p">{paragraph}</p>
                    
                    {/* Insertar Cita Destacada a mitad de camino */}
                    {index === 1 && activeArticle.quotes && activeArticle.quotes[0] && (
                      <div className="article-quote-box">
                        <span className="article-quote-symbol">“</span>
                        <p className="article-quote-text">{activeArticle.quotes[0]}</p>
                      </div>
                    )}

                    {/* Insertar Segunda Cita */}
                    {index === 2 && activeArticle.quotes && activeArticle.quotes[1] && (
                      <div className="article-quote-box">
                        <span className="article-quote-symbol">“</span>
                        <p className="article-quote-text">{activeArticle.quotes[1]}</p>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Botón inferior de volver */}
              <div style={{
                borderTop: '2px solid var(--color-border)',
                paddingTop: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    window.scrollTo({ top: 0 });
                  }}
                  className="btn-handwritten"
                  style={{ padding: '0.6rem 1.2rem', gap: '0.4rem' }}
                >
                  <ArrowLeft size={16} />
                  <span>Volver al blog</span>
                </button>

                <span style={{ fontSize: '1.2rem' }}>🌿🔥💧🌬️</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
