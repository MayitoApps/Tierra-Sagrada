'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft, Calendar, Clock, Send, BookOpen, Sparkles, Sprout, Trees, HeartHandshake } from 'lucide-react';

export interface Article {
  id: string;
  title: string;
  date: string;
  author: string;
  authorRole: string;
  category: 'Herbolaria' | 'Chinampa' | 'Testimonios';
  image: string;
  readTime: string;
  summary: string;
  content: string[];
  quotes?: string[];
}

export const Rezandero: React.FC = () => {
  const searchParams = useSearchParams();
  const categoriaFromUrl = searchParams.get('categoria');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (categoriaFromUrl && ['Herbolaria', 'Chinampa', 'Testimonios'].includes(categoriaFromUrl)) {
      return categoriaFromUrl;
    }
    return 'Todas';
  });
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (categoriaFromUrl && ['Herbolaria', 'Chinampa', 'Testimonios'].includes(categoriaFromUrl)) {
      const frame = requestAnimationFrame(() => {
        setSelectedCategory(categoriaFromUrl);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [categoriaFromUrl]);

  const articles: Article[] = [
    // HERBOLARIA
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
        'Al masticar una pequeña porción de raíz de chilcuague, se desata una intensa sensación de hormigueo acompañada de una abundante salivación. Este efecto es provocado por las alcamidas (particularmente la afinina), componentes activos que estimulan de inmediato las glándulas salivales. La saliva no solo lubrica, sino que contiene enzimas inmunoglobulinas que defienden el cuerpo. El chilcuague es un anestésico local formidable para dolores dentales, infecciones de garganta e inflamación de encías.',
        'Además de su poder físico, el chilcuague posee propiedades antimicrobianas, antimicóticas y antiparasitarias sumamente potentes. Los caminantes del México antiguo la llevaban en sus itacates para tratar picaduras de insectos, desinfectar heridas e incluso purificar el agua del campo. Masticar raíz de chilcuague antes de internarse en climas difíciles ayudaba a prevenir infecciones gastrointestinales.',
        'En nuestro caminar medicinal, honramos al chilcuague como un guardián del fuego interno. Ayuda a limpiar las palabras atascadas en la garganta y activa la energía de autocuración del organismo. En Tierra Sagrada, elaboramos extractos y atomizadores con chilcuague orgánico cultivado y cosechado con rezo para compartir la bendición de esta planta de poder.'
      ],
      quotes: [
        'La raíz de oro despierta el agua viva de nuestra boca, la medicina más cercana que poseemos para protegernos.',
        'Un regalo de la Sierra Gorda que limpia la palabra y restaura el aliento sagrado.'
      ]
    },
    {
      id: 'plantas-sagradas-infusiones',
      title: 'Herbolaria viva: Copal, Salvia, Romero y Pericón en el rezo tradicional',
      date: '18 de Mayo, 2026',
      author: 'Abuela Lulu Xochiquetzali',
      authorRole: 'Mujer Medicina y Portadora de la Tierra',
      category: 'Herbolaria',
      image: '/14.jpeg',
      readTime: '6 min de lectura',
      summary: 'Las plantas no solo curan el cuerpo; cada hoja, resina y flor guarda una memoria elemental que limpia el campo áurico y calma la mente inquieta.',
      content: [
        'En la cosmovisión ancestral de nuestra tierra, las plantas no son tratadas como simples ingredientes pasivos, sino como hermanas sabias con espíritu (nahual). Cuando recolectamos una planta en la chinampa, primero pedimos permiso con tabaco y agradecimiento, reconociendo que su esencia nos brindará equilibrio.',
        'El Romero (Rosmarinus officinalis) es el guardián de la memoria y la circulación. Su aroma penetrante ahuyenta el cansancio psíquico, vigoriza el corazón y, cuando se vierte en té sobre las piedras ardientes del temazcal, despeja los bronquios y relaja los músculos en tensión acumulada.',
        'La Salvia y el Pericón (Tagetes lucida, la flor dorada de Tláloc) se utilizan tradicionalmente para sahumar y templar las energías del hogar. El pericón, cosechado al final de las lluvias, protege contra las energías pesadas y el susto, mientras que la salvia blanca y morada purifica los pensamientos densos y calma el sistema nervioso.',
        'Unidas al humo del Copal blanco (resina sagrada del árbol Bursera), estas plantas crean una atmósfera de respeto y recogimiento. En Tierra Sagrada, cada infusión que preparamos para los asistentes es elaborada con plantas frescas cortadas el mismo día, respetando sus tiempos lunares de cosecha.'
      ],
      quotes: [
        'La planta cura cuando tú reconoces su vida y ella reconoce tu rezo humilde.',
        'El sahumerio eleva en humo lo que el corazón ya no necesita cargar.'
      ]
    },

    // CHINAMPA
    {
      id: 'chinampa-tecnologia-ancestral',
      title: 'La Chinampa: Agricultura milenaria y preservación viva en Xochimilco',
      date: '28 de Mayo, 2026',
      author: 'Abel Hombono Tatanka',
      authorRole: 'Temazcaltiani y Guardián del Fuego',
      category: 'Chinampa',
      image: '/7.jpeg',
      readTime: '7 min de lectura',
      summary: 'Explora la maravillosa arquitectura ecológica de las chinampas: islas de cultivo lacustre que combinan lodo fértil, raíces de ahuejote y canales de agua limpia para nutrir a la vida.',
      content: [
        'La chinampa es una de las mayores hazañas de ingeniería agrícola de la humanidad. Concebida por las civilizaciones mesoamericanas hace más de mil años en la cuenca del Valle de México, esta técnica consiste en la creación de islas artificiales cultivables sobre el lecho del lago de poca profundidad. En Xochimilco, mantenemos viva esta tradición que fusiona agua y tierra fértil.',
        'La construcción de una chinampa comienza delimitando el área con estacas de ahuejotes (Salix bonplandiana), un tipo de sauce nativo cuyas raíces crecen verticalmente hacia abajo buscando el fondo lodoso. Estas raíces actúan como anclas biológicas vivas que amarran el perímetro de la isla impidiendo que la tierra se deslave hacia los canales. Luego, se rellenan estas áreas con capas alternadas de vegetación acuática (lirio y tule) y lodo extraído del fondo del canal, rico en materia orgánica en descomposición.',
        'Esta disposición permite que la chinampa reciba humedad constante por capilaridad desde el nivel inferior, reduciendo drásticamente la necesidad de riego externo. El agua que rodea las islas actúa como un regulador térmico natural, protegiendo los cultivos de heladas extremas y creando un microclima sumamente productivo capaz de dar hasta cuatro cosechas al año.',
        'Nuestra chinampa en Tierra Sagrada no es solo una parcela de hortalizas; es un santuario biológico donde sembramos plantas medicinales, flores ceremoniales como el cempasúchil y hierbas de olor. Al caminar sobre el lodo chinampero, pisamos la memoria de nuestros ancestros y honramos un ciclo hidrológico sagrado que sigue alimentando el espíritu de Xochimilco.'
      ],
      quotes: [
        'El ahuejote es el guardián de madera que sostiene el suelo que pisamos. Sin sauce, no hay chinampa.',
        'La chinampa nos enseña que el lodo más profundo puede dar origen a las flores más hermosas.'
      ]
    },
    {
      id: 'el-lago-y-la-vida-chinampera',
      title: 'El misterio del Lago: ¿Qué se hace y cómo se vive el día a día en una chinampa?',
      date: '20 de Abril, 2026',
      author: 'Abraham Ortiz',
      authorRole: 'Águila de Fuego y Navegante de los Canales',
      category: 'Chinampa',
      image: '/15.jpeg',
      readTime: '6 min de lectura',
      summary: 'El agua tranquila de Cuemanco, el remar en canoa al amanecer y el cuidado de los bancales. Conoce cómo es la vida en el corazón del lago alejado del ruido de la ciudad.',
      content: [
        'Mucha gente asocia a Xochimilco exclusivamente con la fiesta y las trajineras decoradas del centro del pueblo. Sin embargo, en la zona de reserva ecológica de Cuemanco existe otro Xochimilco: uno en silencio profundo, donde el único sonido es el aleteo de las garzas, el chapoteo de los remos y el crujido de las ramas al viento.',
        'El día en la chinampa comienza antes de que despunte el sol. Tomamos la canoa rústica en el embarcadero y remamos a través de canales estrechos flanqueados por ahuejotes centenarios. La neblina matutina cubre el agua como un manto sagrado, creando una sensación de viaje temporal donde el estrés de la metrópoli queda completamente atrás.',
        '¿Qué se hace en una chinampa? El trabajo es constante, manual y en profunda armonía con los ciclos naturales: desmalezar a mano, airear los bancales con herramientas de madera, alimentar la composta con materia vegetal seca, sembrar almácigos (chapines) de barro y cuidar que el agua fluya libremente por las orillas.',
        'No utilizamos pesticidas ni agroquímicos industriales; la propia riqueza microbiana del lodo lacustre provee los nutrientes necesarios para que crezca la salvia, el cempasúchil, la caléndula y el romero. Vivir y trabajar en la chinampa nos recuerda la virtud de la paciencia: todo germina a su debido tiempo cuando el agua y la tierra se respetan mutuamente.'
      ],
      quotes: [
        'En los canales de Cuemanco el tiempo se detiene; basta remar diez minutos para entrar a otro siglo.',
        'El lago no exige prisa, exige atención y reverencia hacia cada forma de vida.'
      ]
    },

    // TESTIMONIOS
    {
      id: 'testimonio-renacer-temazcal',
      title: 'Testimonio: "El día que entré al vientre del temazcal y solté cinco años de dolor"',
      date: '10 de Mayo, 2026',
      author: 'Carolina Morales (Participante)',
      authorRole: 'Círculo de Sanación de Cuemanco',
      category: 'Testimonios',
      image: '/1.jpeg',
      readTime: '5 min de lectura',
      summary: 'Relato real de una participante que vivió la ceremonia del temazcal tradicional: la confrontación con la oscuridad, las lágrimas sanadoras y la ligereza del renacimiento.',
      content: [
        '"Llegué a Tierra Sagrada un sábado por la mañana con el pecho comprimido. Había cargado con la pérdida de mi madre durante cinco años sin permitirme llorar de verdad, sintiendo que debía ser fuerte para todos los demás.',
        'Desde el trayecto en canoa sentí un cambio de frecuencia. El silencio del agua de Xochimilco y la bienvenida cálida de los facilitadores con sahumación de copal me hicieron bajar la guardia. Cuando nos invitaron a entrar a gatas al temazcal, diciendo "Por todas mis relaciones", sentí un nudo en la garganta.',
        'En la segunda puerta, con el calor de las piedras volcánicas al rojo vivo y el aroma del eucalipto y la salvia inundando el domo, el facilitador entonó un canto a las madres y a la tierra. Algo en mi interior se rompió para bien: comencé a llorar con un llanto hondo y liberador que nunca había experimentado. No había juicio, nadie te mira en la oscuridad sagrada; solo se escuchaban respiraciones profundas y rezos de gratitud.',
        'Al abrirse la cuarta puerta y salir al pasto fresco de la chinampa, sentí como si me hubieran quitado cincuenta kilos de la espalda. Tomar el té tibio de hierbas mirando el cielo reflejado en el canal fue el momento de mayor paz que he vivido en años. Volví a nacer."',
      ],
      quotes: [
        '"En la oscuridad sagrada del temazcal entendí que soltar el dolor no es olvidar, sino honrar el amor."',
        '"Salí con el corazón ligero y con la certeza de que la Madre Tierra siempre nos sostiene."'
      ]
    },
    {
      id: 'testimonio-reencuentro-familiar',
      title: 'Testimonio de Familia: Cruzar en canoa a la chinampa y recordar quiénes somos',
      date: '25 de Abril, 2026',
      author: 'Familia Ramírez Gómez',
      authorRole: 'Visita Ceremonial Familiar',
      category: 'Testimonios',
      image: '/2.jpeg',
      readTime: '6 min de lectura',
      summary: 'Cómo una familia de tres generaciones encontró un espacio para dejar las pantallas, sentarse junto al fuego sagrado y sanar sus lazos familiares.',
      content: [
        '"Vivimos en el ritmo acelerado del sur de la Ciudad de México: trabajo, tráfico, escuelas y cada quien con la mirada pegada al teléfono. Decidimos venir en familia —abuelos, padres e hijos adolescentes— a una jornada en Tierra Sagrada sin saber exactamente qué esperar.',
        'El solo hecho de apagar los teléfonos celulares al subir a la canoa en Cuemanco provocó una conversación que no habíamos tenido en meses. Los muchachos miraban asombrados a los patos buceadores y los ahuejotes, mientras mis papás recordaban cómo era el México de su juventud.',
        'Al llegar a la chinampa, La Familia de facilitadores nos recibió como si fuéramos parientes de toda la vida. Participamos en el encendido del fuego y después compartimos una taza de cacao caliente en círculo. Por primera vez en mucho tiempo, escuché a mi hijo de 16 años expresar con lágrimas lo agradecido que estaba con sus abuelos.',
        'Nuestra casa cuida lo sagrado para todos y nuestras familias: esa frase cobra un sentido total cuando estás ahí. Tierra Sagrada no es un parque temático, es un santuario vivo que nos devolvió la ternura familiar que la rutina de la ciudad nos había arrebatado."'
      ],
      quotes: [
        '"Basta una mañana sin señal de celular y frente al fuego para que una familia vuelva a mirarse a los ojos."',
        '"El cacao y la palabra dulce nos abrieron la puerta a una reconciliación que creíamos imposible."'
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
              <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
                <span style={{
                  fontFamily: 'var(--font-title)',
                  color: 'var(--color-accent-sage)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}>
                  <Sparkles size={16} /> Pensares
                </span>
                <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', margin: '1rem 0' }}>
                  El Rezandero y la Sabiduría del Lago
                </h1>
                <div className="divider-handdrawn" style={{ width: '120px', margin: '1rem auto' }} />
                <p style={{ color: 'var(--color-text-earth)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                  Nuestra casa cuida lo sagrado para todos y nuestras familias. Un espacio de palabra escrita donde compartimos los saberes de la herbolaria viva, la vida cotidiana en la chinampa de Xochimilco y testimonios de sanación en nuestras ceremonias.
                </p>
              </div>

              {/* Categorías destacadas en tarjetas superiores */}
              <style dangerouslySetInnerHTML={{__html: `
                .category-showcase-grid {
                  display: grid;
                  grid-template-columns: 1fr;
                  gap: 1.5rem;
                  margin-bottom: 3rem;
                }
                @media (min-width: 768px) {
                  .category-showcase-grid {
                    grid-template-columns: repeat(3, 1fr);
                  }
                }
                .category-showcase-card {
                  background-color: var(--color-bg-paper);
                  border: 2px solid var(--color-border);
                  border-radius: var(--radius-organic);
                  padding: 1.5rem;
                  cursor: pointer;
                  text-align: left;
                  transition: all 0.3s ease;
                  display: flex;
                  flex-direction: column;
                }
                .category-showcase-card:hover, .category-showcase-card.active {
                  border-color: var(--color-accent-terracotta);
                  background-color: #fff;
                  transform: translateY(-4px);
                  box-shadow: var(--shadow-organic);
                }
                .category-showcase-card.active {
                  border-color: var(--color-accent-sage);
                }
              `}} />

              <div className="category-showcase-grid">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('Herbolaria')}
                  className={`category-showcase-card ${selectedCategory === 'Herbolaria' ? 'active' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                    <div style={{
                      backgroundColor: 'rgba(92, 114, 91, 0.15)',
                      color: 'var(--color-accent-sage)',
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Sprout size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', margin: 0, fontFamily: 'var(--font-title)' }}>Herbolaria</h3>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                    Plantas sagradas, infusiones medicinales, sahumerios y el poder de la raíz de chilcuague.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCategory('Chinampa')}
                  className={`category-showcase-card ${selectedCategory === 'Chinampa' ? 'active' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                    <div style={{
                      backgroundColor: 'rgba(200, 107, 75, 0.15)',
                      color: 'var(--color-accent-terracotta)',
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Trees size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', margin: 0, fontFamily: 'var(--font-title)' }}>Chinampa</h3>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                    El misterio del lago, los ahuejotes, la siembra tradicional y cómo se vive en la chinampa.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCategory('Testimonios')}
                  className={`category-showcase-card ${selectedCategory === 'Testimonios' ? 'active' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                    <div style={{
                      backgroundColor: 'rgba(164, 118, 77, 0.15)',
                      color: 'var(--color-text-earth)',
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <HeartHandshake size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', margin: 0, fontFamily: 'var(--font-title)' }}>Testimonios</h3>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                    Historias reales de personas y familias que sanaron y renacieron en el temazcal sagrado.
                  </p>
                </button>
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
                  {(['Todas', 'Herbolaria', 'Chinampa', 'Testimonios'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
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
                    placeholder="Buscar en Pensares..."
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
                            <span style={{ fontSize: '1.5rem' }}>🌿</span>
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
                            type="button"
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
                type="button"
                onClick={() => {
                  setActiveArticle(null);
                  window.scrollTo({ top: 0 });
                }}
                className="btn-handwritten"
                style={{ marginBottom: '2.5rem', padding: '0.6rem 1.2rem', gap: '0.4rem', alignSelf: 'flex-start' }}
              >
                <ArrowLeft size={16} />
                <span>Volver a Pensares</span>
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
                  <span style={{ fontSize: '2rem' }}>🌿</span>
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
                  type="button"
                  onClick={() => {
                    setActiveArticle(null);
                    window.scrollTo({ top: 0 });
                  }}
                  className="btn-handwritten"
                  style={{ padding: '0.6rem 1.2rem', gap: '0.4rem' }}
                >
                  <ArrowLeft size={16} />
                  <span>Volver a Pensares</span>
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
