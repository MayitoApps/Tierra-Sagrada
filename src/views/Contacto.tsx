'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Contacto: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: 'temazcal',
    mensaje: '',
  });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular envío a Firestore o servicio de correos
    console.log('Mensaje de contacto enviado:', formData);
    
    // Abrir WhatsApp con un resumen del contacto si el usuario así lo desea,
    // o simplemente mostrar un mensaje de éxito. Haremos ambos de forma inteligente:
    // Mostramos mensaje de éxito en pantalla, y le damos la opción de enviarlo directo a WhatsApp.
    setEnviado(true);
  };

  const handleSendToWhatsApp = () => {
    const phone = '+525534872329';
    const msg = `¡Hola Tierra Sagrada! 🌿 Mi nombre es *${formData.nombre}*.\n\n*Correo:* ${formData.email}\n*Teléfono:* ${formData.telefono}\n*Interés:* ${formData.servicio}\n*Mensaje:* ${formData.mensaje}`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${phone.replace('+', '')}?text=${encoded}`, '_blank');
  };

  return (
    <div style={{ padding: '4rem 0', backgroundColor: 'var(--color-bg-sand)' }}>
      <div className="container-organic">
        {/* Encabezado */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
          <span style={{
            fontFamily: 'var(--font-title)',
            color: 'var(--color-accent-sage)',
            fontWeight: 600,
            fontSize: '0.9rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Ponte en Contacto
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', margin: '1rem 0' }}>Conecta con Nosotros</h1>
          <div className="divider-handdrawn" style={{ width: '120px', margin: '1rem auto' }} />
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem' }}>
            ¿Tienes dudas sobre los temazcales, deseas agendar un evento privado o comprar medicina? Estamos para escucharte.
          </p>
        </div>

        {/* Grid Principal */}
        <style dangerouslySetInnerHTML={{__html: `
          .contact-layout-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          @media (min-width: 992px) {
            .contact-layout-grid {
              grid-template-columns: 1fr 1.2fr;
            }
          }
        `}} />
        
        <div className="contact-layout-grid">
          {/* Columna Izquierda: Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>Datos del Altar</h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Nuestras ceremonias se realizan cruzando en canoa desde el Embarcadero de Cuemanco. Por favor, agenda tu cita previamente para coordinar tu cruce chinampero.
            </p>

            {/* Tarjetas de contacto */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {/* Teléfono */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                padding: '1.2rem',
                backgroundColor: 'var(--color-bg-paper)',
                border: '1px solid var(--color-border)',
                borderRadius: '10px 15px 12px 10px',
              }}>
                <div style={{
                  width: '45px',
                  height: '45px',
                  backgroundColor: 'rgba(200, 107, 75, 0.1)',
                  color: 'var(--color-accent-terracotta)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--color-accent-terracotta)',
                }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Teléfono / WhatsApp</h4>
                  <a href="tel:+525534872329" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-earth)' }}>
                    +52 55 3487 2329
                  </a>
                </div>
              </div>

              {/* Correo */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                padding: '1.2rem',
                backgroundColor: 'var(--color-bg-paper)',
                border: '1px solid var(--color-border)',
                borderRadius: '10px 12px 15px 10px',
              }}>
                <div style={{
                  width: '45px',
                  height: '45px',
                  backgroundColor: 'rgba(80, 101, 85, 0.1)',
                  color: 'var(--color-accent-sage)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--color-accent-sage)',
                }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Correo Electrónico</h4>
                  <a href="mailto:tierraxochsagrada@gmail.com" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-earth)' }}>
                    tierraxochsagrada@gmail.com
                  </a>
                </div>
              </div>

              {/* Dirección */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                padding: '1.2rem',
                backgroundColor: 'var(--color-bg-paper)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px 10px 10px 15px',
              }}>
                <div style={{
                  width: '45px',
                  height: '45px',
                  backgroundColor: 'rgba(216, 155, 48, 0.1)',
                  color: 'var(--color-accent-gold)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--color-accent-gold)',
                }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ubicación</h4>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-earth)' }}>
                    Lago Xochimilco, embarcadero cuemanco, Mexico City, Mexico
                  </span>
                </div>
              </div>

              {/* Redes Sociales */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                padding: '1.2rem',
                backgroundColor: 'var(--color-bg-paper)',
                border: '1px solid var(--color-border)',
                borderRadius: '10px 10px 12px 15px',
              }}>
                <div style={{
                  width: '45px',
                  height: '45px',
                  backgroundColor: 'rgba(80, 101, 85, 0.1)',
                  color: 'var(--color-accent-sage)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--color-accent-sage)',
                }}>
                  <span style={{ fontSize: '1.25rem' }}>🌐</span>
                </div>
                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>Síguenos en Redes</h4>
                  <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <a
                      href="https://www.facebook.com/tierrasagradaxoch/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: 'var(--color-text-earth)',
                        transition: 'var(--transition-fast)',
                        display: 'inline-flex',
                        alignItems: 'center',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-terracotta)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-earth)'}
                    >
                      Facebook
                    </a>
                    <a
                      href="https://www.instagram.com/tierrasagradaxoch/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: 'var(--color-text-earth)',
                        transition: 'var(--transition-fast)',
                        display: 'inline-flex',
                        alignItems: 'center',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-terracotta)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-earth)'}
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa Embebido */}
            <div style={{
              width: '100%',
              height: '220px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '2px solid var(--color-border)',
              boxShadow: '3px 5px 15px rgba(0,0,0,0.05)',
            }}>
              <iframe
                title="Mapa Tierra Sagrada - Embarcadero Cuemanco"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.7317769974246!2d-99.10373282498263!3d19.294025181954316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce03a2fb4a8b79%3A0x633526543126bebb!2sEmbarcadero%20Cuemanco!5e0!3m2!1ses-419!2smx!4v1716942000000!5m2!1ses-419!2smx"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Columna Derecha: Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="card-handmade" style={{ padding: '2.5rem' }}>
              <AnimatePresence mode="wait">
                {!enviado ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
                  >
                    <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.6rem', marginBottom: '0.2rem' }}>Enviar Mensaje</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                      Escríbenos y un guardián del espacio responderá a la brevedad.
                    </p>

                    {/* Campo Nombre */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-earth)' }}>Nombre completo</label>
                      <input
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid var(--color-border)',
                          backgroundColor: 'white',
                          fontFamily: 'var(--font-body)',
                          outline: 'none',
                        }}
                      />
                    </div>

                    {/* Campo Correo */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-earth)' }}>Correo electrónico</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid var(--color-border)',
                          backgroundColor: 'white',
                          fontFamily: 'var(--font-body)',
                          outline: 'none',
                        }}
                      />
                    </div>

                    {/* Campo Teléfono */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-earth)' }}>Teléfono</label>
                      <input
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid var(--color-border)',
                          backgroundColor: 'white',
                          fontFamily: 'var(--font-body)',
                          outline: 'none',
                        }}
                      />
                    </div>

                    {/* Tipo de Servicio */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-earth)' }}>¿En qué estás interesado?</label>
                      <select
                        value={formData.servicio}
                        onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid var(--color-border)',
                          backgroundColor: 'white',
                          fontFamily: 'var(--font-body)',
                          outline: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="temazcal">Temazcal Tradicional</option>
                        <option value="cacao">Ceremonia de Cacao</option>
                        <option value="circulo">Círculo de Mujeres</option>
                        <option value="tepezcohuite">Ceremonia de Tepezcohuite</option>
                        <option value="karmica">Liberación Kármica</option>
                        <option value="tienda">Productos de la Tienda</option>
                        <option value="otro">Otro Asunto</option>
                      </select>
                    </div>

                    {/* Campo Mensaje */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-earth)' }}>Mensaje</label>
                      <textarea
                        rows={4}
                        required
                        value={formData.mensaje}
                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid var(--color-border)',
                          backgroundColor: 'white',
                          fontFamily: 'var(--font-body)',
                          outline: 'none',
                          resize: 'vertical',
                        }}
                      />
                    </div>

                    {/* Botón Enviar */}
                    <button
                      type="submit"
                      className="btn-handwritten btn-primary-organic"
                      style={{
                        marginTop: '0.5rem',
                        justifyContent: 'center',
                      }}
                    >
                      <Send size={16} />
                      Enviar Formulario
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      textAlign: 'center',
                      padding: '2rem 1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1.2rem',
                    }}
                  >
                    <CheckCircle size={56} style={{ color: 'var(--color-accent-sage)' }} />
                    <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.5rem' }}>¡Gracias por conectar!</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                      Hemos recibido tu mensaje con rezos de abundancia. ¿Te gustaría también enviarlo directamente por WhatsApp para agilizar tu respuesta?
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%', marginTop: '1rem' }}>
                      <button
                        className="btn-handwritten btn-primary-organic"
                        onClick={handleSendToWhatsApp}
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        <MessageSquare size={18} />
                        Enviar por WhatsApp
                      </button>
                      <button
                        className="btn-handwritten"
                        onClick={() => {
                          setEnviado(false);
                          setFormData({ nombre: '', email: '', telefono: '', servicio: 'temazcal', mensaje: '' });
                        }}
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        Enviar otro mensaje
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
