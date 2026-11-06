import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Clock, User, DollarSign, UserCheck, MessageSquare, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Evento {
  id: string;
  titulo: string;
  facilitador: string;
  fecha: string; // formato YYYY-MM-DD
  hora: string;
  descripcion: string;
  aportacion: number;
  cupo: number;
  tipoCeremonia: string;
}

// Eventos de respaldo en caso de que no haya conexión a Firestore o no existan registros aún
const fallbackEventos: Evento[] = [
  {
    id: 'fb1',
    titulo: 'Temazcal de Luna Nueva & Sahumación',
    facilitador: 'Abuela María Guadalupe & Taita Juan',
    fecha: '2026-06-21',
    hora: '16:00',
    descripcion: 'Celebramos la llegada de la Luna Nueva. Una siembra de propósitos dentro del vientre caliente de la Madre Tierra, limpia de aura individual y cantos sagrados alrededor del fuego sagrado.',
    aportacion: 500,
    cupo: 15,
    tipoCeremonia: 'Temazcal',
  },
  {
    id: 'fb2',
    titulo: 'Ceremonia de Cacao y Canto Medicina',
    facilitador: 'Sofía Amatista',
    fecha: '2026-06-28',
    hora: '17:00',
    descripcion: 'Una hermosa comunión con el Cacao Sagrado de Chiapas. Cantos medicinales para elevar el espíritu y abrir las compuertas del amor propio, la compasión y el autoreconocimiento.',
    aportacion: 400,
    cupo: 20,
    tipoCeremonia: 'Cacao',
  },
  {
    id: 'fb3',
    titulo: 'Círculo de Mujeres y Sanación de Útero',
    facilitador: 'Luna Celeste',
    fecha: '2026-07-05',
    hora: '11:00',
    descripcion: 'Espacio de hermandad femenina. Realizaremos un rezo colectivo de sahumación y una meditación profunda guiada para sanar memorias ancestrales, acompañadas de té de hierbas curativas.',
    aportacion: 350,
    cupo: 12,
    tipoCeremonia: 'Círculo de Mujeres',
  },
  {
    id: 'fb4',
    titulo: 'Temazcal y Ceremonia de Tepezcohuite',
    facilitador: 'Taita Juan & Chamán Tepeu',
    fecha: '2026-07-12',
    hora: '15:00',
    descripcion: 'Una ceremonia de medicina profunda tradicional de Tepezcohuite. Incluye limpieza con copal, temazcal terapéutico de 4 puertas y sesión de integración psicológica posterior.',
    aportacion: 1200,
    cupo: 10,
    tipoCeremonia: 'Tepezcohuite',
  }
];

const getInitialEventos = (): Evento[] => {
  const cached = localStorage.getItem('tierra_sagrada_eventos');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      return fallbackEventos;
    }
  }
  return fallbackEventos;
};

export const Calendario: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>(getInitialEventos);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        // Consultar eventos programados ordenados por fecha ascendente
        const hoy = new Date().toISOString().split('T')[0]; // Fecha actual YYYY-MM-DD
        const eventosRef = collection(db, 'eventos');
        // Traer eventos que ocurran hoy o en el futuro
        const q = query(
          eventosRef,
          where('fecha', '>=', hoy),
          orderBy('fecha', 'asc')
        );
        
        const querySnapshot = await getDocs(q);
        const dataList: Evento[] = [];
        
        querySnapshot.forEach((doc) => {
          dataList.push({ id: doc.id, ...doc.data() } as Evento);
        });

        if (dataList.length > 0) {
          setEventos(dataList);
          localStorage.setItem('tierra_sagrada_eventos', JSON.stringify(dataList));
        } else {
          // Si la colección está vacía, usar el fallback
          setEventos(fallbackEventos);
          localStorage.removeItem('tierra_sagrada_eventos');
        }
      } catch (error) {
        console.error('Error al recuperar eventos de Firestore: ', error);
        // Mantenemos los datos de caché/fallback que ya están en el estado
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  // Formatear la fecha para que sea legible en español
  const formatFechaLegible = (fechaStr: string) => {
    const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    const date = new Date(fechaStr);
    return date.toLocaleDateString('es-MX', opciones);
  };

  const handleReserva = (evento: Evento) => {
    const phone = '+525534872329';
    const message = `¡Hola Tierra Sagrada! 🌿✨ Me gustaría reservar un lugar para el evento:\n\n*${evento.titulo}*\n📅 *Fecha:* ${formatFechaLegible(evento.fecha)}\n🕒 *Hora:* ${evento.hora} hrs\n🧘 *Facilitador:* ${evento.facilitador}\n\n¿Me podrían confirmar si aún tienen cupo disponible y los detalles del punto de encuentro en el Embarcadero de Cuemanco? 🙏`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone.replace('+', '')}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div style={{ padding: '4rem 0', backgroundColor: 'var(--color-bg-sand)', minHeight: '80vh' }}>
      <div className="container-organic">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
          <span style={{
            fontFamily: 'var(--font-title)',
            color: 'var(--color-accent-sage)',
            fontWeight: 600,
            fontSize: '0.9rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Agenda de Sanación
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', margin: '1rem 0' }}>Próximas Ceremonias</h1>
          <div className="divider-handdrawn" style={{ width: '120px', margin: '1rem auto' }} />
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem' }}>
            Encuentra el momento perfecto para reconectar con tu esencia. Reserva tu lugar con anticipación, ya que los cupos son limitados para garantizar una experiencia íntima y ceremonial.
          </p>
        </div>

        {/* Loader */}
        {loading && eventos.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px', flexDirection: 'column', gap: '1rem' }}>
            <Loader size={36} className="animate-float-slow" style={{ color: 'var(--color-accent-terracotta)' }} />
            <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>Escuchando los murmullos de la chinampa...</p>
          </div>
        ) : (
          <div>
            {eventos.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                backgroundColor: 'var(--color-bg-paper)',
                border: '2px dashed var(--color-border)',
                borderRadius: '12px',
              }}>
                <span style={{ fontSize: '3rem' }}>🧘</span>
                <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', marginTop: '1rem', marginBottom: '0.5rem' }}>Sin eventos programados</h3>
                <p style={{ color: 'var(--color-text-muted)' }}>Por el momento no hay ceremonias calendarizadas. Vuelve pronto o contáctanos directamente para agendar un evento privado.</p>
              </div>
            ) : (
              <style dangerouslySetInnerHTML={{__html: `
                .events-list {
                  display: flex;
                  flex-direction: column;
                  gap: 2.5rem;
                }
                .event-card {
                  display: flex;
                  flex-direction: column;
                  background-color: var(--color-bg-paper);
                  border: 2px solid var(--color-border);
                  border-radius: 15px 12px 18px 10px / 12px 15px 10px 18px;
                  overflow: hidden;
                  transition: var(--transition-smooth);
                }
                .event-card:hover {
                  transform: translateY(-4px);
                  border-color: var(--color-text-earth);
                  box-shadow: 5px 8px 25px rgba(44, 34, 30, 0.06);
                }
                .event-card-header {
                  background-color: var(--color-accent-sage);
                  color: white;
                  padding: 1.5rem;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  flex-shrink: 0;
                }
                .event-card-header-date {
                  font-family: var(--font-title);
                  font-size: 1.6rem;
                  font-weight: 700;
                  line-height: 1.2;
                }
                .event-card-header-month {
                  font-size: 0.85rem;
                  text-transform: uppercase;
                  letter-spacing: 0.2em;
                  margin-top: 0.3rem;
                }
                .event-card-body {
                  padding: 2rem;
                  flex-grow: 1;
                  display: flex;
                  flex-direction: column;
                }
                
                @media (min-width: 768px) {
                  .event-card {
                    flex-direction: row;
                  }
                  .event-card-header {
                    width: 160px;
                    border-right: 2px solid var(--color-border);
                  }
                }
              `}} />
            )}

            <div className="events-list">
              {eventos.map((evento) => {
                // Obtener día y mes abreviado del string YYYY-MM-DD
                const dateObj = new Date(evento.fecha);
                const dia = dateObj.getUTCDate();
                const mes = dateObj.toLocaleDateString('es-MX', { month: 'short', timeZone: 'UTC' }).replace('.', '');
                
                // Color del banner por tipo de evento
                let headerBg = 'var(--color-accent-sage)';
                if (evento.tipoCeremonia.toLowerCase().includes('temazcal')) {
                  headerBg = 'var(--color-accent-terracotta)';
                } else if (evento.tipoCeremonia.toLowerCase().includes('cacao')) {
                  headerBg = 'var(--color-accent-gold)';
                } else if (evento.tipoCeremonia.toLowerCase().includes('mujer')) {
                  headerBg = '#a17282'; // Rosa viejo místico
                }

                return (
                  <motion.div
                    key={evento.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="event-card"
                  >
                    {/* Lateral de Fecha */}
                    <div className="event-card-header" style={{ backgroundColor: headerBg }}>
                      <span className="event-card-header-date">{dia}</span>
                      <span className="event-card-header-month">{mes}</span>
                      <span style={{ fontSize: '0.75rem', marginTop: '0.4rem', opacity: 0.8 }}>{dateObj.getUTCFullYear()}</span>
                    </div>

                    {/* Contenido del Evento */}
                    <div className="event-card-body">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '0.8rem' }}>
                        <span style={{
                          backgroundColor: 'var(--color-accent-soft)',
                          color: 'var(--color-text-earth)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '15px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                        }}>
                          {evento.tipoCeremonia}
                        </span>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                          <Clock size={14} />
                          <span>{evento.hora} hrs</span>
                        </div>
                      </div>

                      <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-title)', marginBottom: '0.8rem', color: 'var(--color-text-earth)' }}>
                        {evento.titulo}
                      </h3>

                      <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', flexGrow: 1 }}>
                        {evento.descripcion}
                      </p>

                      {/* Detalles Rápidos del Evento */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '1rem',
                        borderTop: '1px solid var(--color-border)',
                        paddingTop: '1rem',
                        marginBottom: '1.5rem',
                        fontSize: '0.85rem',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)' }}>
                          <User size={15} style={{ color: 'var(--color-accent-sage)' }} />
                          <span><strong>Guía:</strong> {evento.facilitador}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)' }}>
                          <DollarSign size={15} style={{ color: 'var(--color-accent-sage)' }} />
                          <span><strong>Aportación:</strong> ${evento.aportacion} MXN</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)' }}>
                          <UserCheck size={15} style={{ color: 'var(--color-accent-sage)' }} />
                          <span><strong>Cupo máximo:</strong> {evento.cupo} personas</span>
                        </div>
                      </div>

                      {/* Botón Reservar */}
                      <div style={{ alignSelf: 'flex-start' }}>
                        <button
                          className="btn-handwritten btn-primary-organic"
                          onClick={() => handleReserva(evento)}
                          style={{ gap: '0.5rem' }}
                        >
                          <MessageSquare size={16} />
                          Reservar por WhatsApp
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
