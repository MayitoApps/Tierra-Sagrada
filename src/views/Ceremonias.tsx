'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface ElementoSanacion {
  id: string;
  nombre: string;
  descripcion: string;
  duracion: string;
  aportacion: string;
  imagen: string;
}

export const Ceremonias: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ceremonias' | 'servicios'>('ceremonias');

  const listaCeremonias: ElementoSanacion[] = [
    {
      id: 'bendicion-semillas',
      nombre: 'Ceremonia de Bendición de Semillas (2 de Febrero)',
      descripcion: 'Un rezo tradicional que coincide con la fiesta de la Candelaria y el inicio del año agrícola mexihka. Ofrendamos y bendecimos las semillas que nutrirán el suelo y nuestros cuerpos.',
      duracion: '3 horas',
      aportacion: '$350 MXN',
      imagen: '/3.jpeg',
    },
    {
      id: 'sacbe-espiral',
      nombre: 'Ceremonia de Sacbe (Espiral Sagrada)',
      descripcion: 'Caminata meditativa en una espiral trazada sobre la tierra. Simboliza el viaje hacia tu propio centro espiritual para liberar bloqueos y encontrar tu camino verdadero (Sacbe).',
      duracion: '2 horas',
      aportacion: '$300 MXN',
      imagen: '/11.jpeg',
    },
    {
      id: 'siembra-nombre',
      nombre: 'Ceremonia de Siembra de Nombre',
      descripcion: 'Rito de iniciación tradicional mexihka donde se otorga y siembra tu nombre en la tierra según tu Tonalamatl, vinculando tu espíritu con tu misión cósmica.',
      duracion: '3 a 4 horas',
      aportacion: 'Consulta previa',
      imagen: '/7.jpeg',
    },
    {
      id: 'bendicion-amor',
      nombre: 'Bendición de Amor (Ceremonia de Unión)',
      descripcion: 'Lazo espiritual y unión de almas bajo el rezo prehispánico frente al fuego sagrado. Un tejido de intenciones y promesas ante los elementos del universo.',
      duracion: '3 a 4 horas',
      aportacion: 'Consulta previa',
      imagen: '/14.jpeg',
    },
    {
      id: 'despedida',
      nombre: 'Ceremonia de Despedida',
      descripcion: 'Ritual para honrar los procesos de cierre, divorcio, mudanza o pérdidas. Sahumación profunda para soltar con amor, gratitud y paz interior lo que ya cumplió su ciclo.',
      duracion: '2.5 horas',
      aportacion: '$450 MXN',
      imagen: '/17.jpg',
    },
    {
      id: 'bendicion-camino',
      nombre: 'Bendición de Camino',
      descripcion: 'Ofrenda para proteger e intencionar nuevos comienzos: viajes, proyectos, estudios o emprendimientos. Alineación con las fuerzas rectoras de las direcciones cósmicas.',
      duracion: '2 horas',
      aportacion: '$400 MXN',
      imagen: '/18.jpeg',
    },
    {
      id: 'bendicion-difuntos',
      nombre: 'Ceremonia de Bendición a los Difuntos (Tzompantli)',
      descripcion: 'Rito solemne para honrar y alumbrar el caminar de los seres amados que han trascendido al Mictlán, brindándoles luz, cantos y copal para su descanso eterno.',
      duracion: '3 horas',
      aportacion: '$400 MXN',
      imagen: '/13.jpg',
    },
    {
      id: 'circulo-cacao',
      nombre: 'Círculo de Cacao',
      descripcion: 'Apertura del corazón mediante la toma consciente de cacao criollo orgánico preparado con cantos medicina, permitiendo la introspección emocional y la palabra dulce.',
      duracion: '3 horas',
      aportacion: '$500 MXN',
      imagen: '/2.jpeg',
    },
    {
      id: 'menarquia',
      nombre: 'Ceremonia de Menarquia (Bienvenida a la Menstruación)',
      descripcion: 'Rito de paso para jovencitas que reciben su primer ciclo. Un espacio de contención femenina para honrar el cuerpo, el linaje y el despertar a la fertilidad sagrada.',
      duracion: '3 horas',
      aportacion: 'Consulta previa',
      imagen: '/10.jpg',
    },
    {
      id: 'sanacion-cuerpo-espiritual',
      nombre: 'Ceremonia de Sanación del Cuerpo Espiritual',
      descripcion: 'Indicado tras cirugías, accidentes o enfermedades graves. Un rezo que restaura el tono vital y reintegra el cuerpo áurico debilitado en sintonía con el fuego.',
      duracion: '3 horas',
      aportacion: 'Consulta previa',
      imagen: '/23.jpeg',
    },
    {
      id: 'circulo-mujeres',
      nombre: 'Círculo de Mujeres',
      descripcion: 'Espacio de hermandad, sahumaciones e introspección gestáltica. Nos reunimos para sanar en colectivo, cantar y resignificar los ciclos femeninos.',
      duracion: '2.5 horas',
      aportacion: '$350 MXN',
      imagen: '/14.jpeg',
    },
    {
      id: 'circulo-hombres',
      nombre: 'Círculo de Hombres',
      descripcion: 'Espacio de rezo y palabra libre para hombres. Buscamos integrar de manera equilibrada la fuerza, la sensibilidad y el sentido de comunidad con el tambor.',
      duracion: '2.5 horas',
      aportacion: '$350 MXN',
      imagen: '/5.jpeg',
    }
  ];

  const listaServicios: ElementoSanacion[] = [
    {
      id: 'temazcal',
      nombre: 'Temazcal Tradicional',
      descripcion: 'Baño de vapor ritual de barro. Suda toxinas, limpia tu sistema respiratorio y renace del vientre húmedo de la Madre Tierra entre cantos y hierbas medicinales.',
      duracion: '3 a 4 horas',
      aportacion: '$450 MXN',
      imagen: '/1.jpeg',
    },
    {
      id: 'limpias',
      nombre: 'Limpias Energéticas',
      descripcion: 'Armonización de tu campo magnético a través de copal ceremonial, ramos de plantas medicinales frescas e imposición de plumas para disipar energías densas.',
      duracion: '1 hora',
      aportacion: '$350 MXN',
      imagen: '/17.jpg',
    },
    {
      id: 'tonalamatl',
      nombre: 'Tonalamatl (Interpretación Astrológica Mexihka)',
      descripcion: 'Lectura de tu carta natal basada en el calendario ancestral del Anáhuac. Conoce tus signos regentes, elementos protectores y el propósito cósmico de tu nacimiento.',
      duracion: '1.5 horas',
      aportacion: '$600 MXN',
      imagen: '/22.jpeg',
    },
    {
      id: 'cierre-cadera',
      nombre: 'Cierre de Cadera con Rebozo',
      descripcion: 'Terapia física y emocional tradicional para mujeres posparto o tras pérdidas. Ajustes corporales suaves con rebozos de telar para reubicar la energía vital.',
      duracion: '2 horas',
      aportacion: '$550 MXN',
      imagen: '/19.jpeg',
    },
    {
      id: 'herbolaria-aplicada',
      nombre: 'Herbolaria Aplicada',
      descripcion: 'Asesoría especializada sobre el uso correcto de plantas, tés y tinturas chinamperas para aliviar padecimientos físicos o fortalecer tus órganos internos.',
      duracion: '1 hora',
      aportacion: '$300 MXN',
      imagen: '/4.jpeg',
    },
    {
      id: 'acompanamientos-emocionales',
      nombre: 'Acompañamientos Emocionales',
      descripcion: 'Espacio de escucha y contención integrativa de tipo gestáltico en un entorno de paz natural para asimilar duelos, miedos y transiciones difíciles.',
      duracion: '1.5 horas',
      aportacion: '$400 MXN',
      imagen: '/15.jpeg',
    },
    {
      id: 'terapias-energeticas',
      nombre: 'Terapias Energéticas',
      descripcion: 'Alineación de centros energéticos e imposición de manos asistida por sahumaciones y microdosis herbolarias, promoviendo el equilibrio interno.',
      duracion: '1.5 horas',
      aportacion: '$450 MXN',
      imagen: '/8.jpeg',
    },
    {
      id: 'masajes-terapeuticos',
      nombre: 'Masajes Terapéuticos y Relajantes',
      descripcion: 'Liberación de contracturas musculares y fatiga crónica empleando aceites herbales y pomadas calientes preparadas en el espacio.',
      duracion: '1 a 1.5 horas',
      aportacion: '$500 MXN',
      imagen: '/16.jpeg',
    },
    {
      id: 'belleza-xochiquetzalli',
      nombre: 'Belleza Xochiquetzali',
      descripcion: 'Tratamientos faciales y capilares rústicos empleando barro medicinal, mascarillas naturales de metate y arcillas con cacao.',
      duracion: '1.5 horas',
      aportacion: '$400 MXN',
      imagen: '/24.jpeg',
    },
    {
      id: 'acompanamiento-materno',
      nombre: 'Acompañamiento Materno',
      descripcion: 'Orientación integral física y emocional durante el embarazo y postparto, asistida por el calor del temazcal maternal y cantos dulces de rezo.',
      duracion: '2 horas',
      aportacion: 'Consulta previa',
      imagen: '/20.jpeg',
    },
    {
      id: 'asesorias-lactancia',
      nombre: 'Asesorías de Lactancia',
      descripcion: 'Guía y apoyo a madres lactantes sobre posturas cómodas, bancos de leche y contención emocional en la sagrada etapa del apego.',
      duracion: '1.5 horas',
      aportacion: '$350 MXN',
      imagen: '/6.jpeg',
    }
  ];

  const items = activeTab === 'ceremonias' ? listaCeremonias : listaServicios;

  const containerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.08 } }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div style={{ padding: '4rem 0', backgroundColor: 'var(--color-bg-sand)', minHeight: '85vh' }}>
      <div className="container-organic">
        {/* Encabezado */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <span style={{
            fontFamily: 'var(--font-title)',
            color: 'var(--color-accent-terracotta)',
            fontWeight: 600,
            fontSize: '0.9rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Servicios y Altar
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', margin: '1rem 0' }}>Ceremonias & Servicios</h1>
          <div className="divider-handdrawn" style={{ width: '120px', margin: '1rem auto' }} />
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Explora las diversas herramientas de medicina y rezo tradicional que ponemos a tu disposición en la chinampa. Llevamos a cabo cada espacio con profundo respeto y preparación ancestral.
          </p>
        </div>

        {/* Pestañas (Tabs) de navegación interactiva */}
        <style dangerouslySetInnerHTML={{__html: `
          .tab-menu-container {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-bottom: 4rem;
            border-bottom: 2px solid var(--color-border);
            padding-bottom: 1rem;
          }
          .tab-button {
            font-family: var(--font-title);
            font-size: 1.1rem;
            font-weight: 600;
            background: none;
            border: none;
            padding: 0.5rem 1.5rem;
            cursor: pointer;
            color: var(--color-text-muted);
            transition: var(--transition-fast);
            position: relative;
          }
          .tab-button.active {
            color: var(--color-accent-terracotta);
          }
          .tab-button-indicator {
            position: absolute;
            bottom: -18px;
            left: 0;
            width: 100%;
            height: 4px;
            background-color: var(--color-accent-terracotta);
            border-radius: 4px;
          }
          
          .grid-ceremonias-servicios {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          @media (min-width: 768px) {
            .grid-ceremonias-servicios {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1200px) {
            .grid-ceremonias-servicios {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          .cs-card {
            display: flex;
            flex-direction: column;
            overflow: hidden;
            padding: 0;
            height: 100%;
          }
          .cs-card-img-wrapper {
            width: 100%;
            height: 200px;
            overflow: hidden;
            border-bottom: 2px solid var(--color-border);
          }
          .cs-card-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: var(--transition-smooth);
          }
          .cs-card:hover .cs-card-img {
            transform: scale(1.05);
          }
        `}} />

        <div className="tab-menu-container">
          <button
            onClick={() => setActiveTab('ceremonias')}
            className={`tab-button ${activeTab === 'ceremonias' ? 'active' : ''}`}
          >
            Ceremonias Sagradas
            {activeTab === 'ceremonias' && (
              <motion.div layoutId="tabActiveBar" className="tab-button-indicator" />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('servicios')}
            className={`tab-button ${activeTab === 'servicios' ? 'active' : ''}`}
          >
            Servicios de Sanación
            {activeTab === 'servicios' && (
              <motion.div layoutId="tabActiveBar" className="tab-button-indicator" />
            )}
          </button>
        </div>

        {/* Grids de contenido */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, y: -10 }}
            className="grid-ceremonias-servicios"
          >
            {items.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className="card-handmade cs-card"
              >
                <div className="cs-card-img-wrapper">
                  <img src={item.imagen} alt={item.nombre} className="cs-card-img" loading="lazy" />
                </div>
                
                <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-title)',
                    fontSize: '1.25rem',
                    marginBottom: '0.8rem',
                    color: 'var(--color-text-earth)',
                    lineHeight: '1.3'
                  }}>
                    {item.nombre}
                  </h3>
                  
                  <p style={{
                    fontSize: '0.88rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    flexGrow: 1
                  }}>
                    {item.descripcion}
                  </p>
                  


                  <a
                    href={`https://wa.me/525534872329?text=${encodeURIComponent(`Hola Tierra Sagrada, me gustaría consultar y agendar la ceremonia o servicio de *${item.nombre}* en Cuemanco. 🙏✨`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-handwritten"
                    style={{
                      width: '100%',
                      padding: '0.5rem 1rem',
                      fontSize: '0.8rem',
                      justifyContent: 'center',
                      marginTop: 'auto'
                    }}
                  >
                    <MessageCircle size={16} />
                    <span>Consultar / Agendar</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
