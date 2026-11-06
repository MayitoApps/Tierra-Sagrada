'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, ShoppingBag, Image as ImageIcon, Plus, Trash2, LogOut, Lock, ShieldAlert, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

// Interfaces locales
import type { Evento } from './Calendario';
import type { Producto } from './Tienda';

interface GaleriaItem {
  id: string;
  url: string;
  tipo: 'foto' | 'video';
  categoria: string;
  titulo?: string;
}

interface AdminUser {
  email: string;
}

const ALLOWED_EMAILS = ['artes.grupoorganico@gmail.com', 'tierrasagradaxoch@gmail.com'];

export const Admin: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'eventos' | 'productos' | 'galeria'>('eventos');

  // List states
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [galeriaItems, setGaleriaItems] = useState<GaleriaItem[]>([]);
  const [actionLoading, setActionLoading] = useState(false);

  // Form states - Evento
  const [eventForm, setEventForm] = useState({
    titulo: '',
    facilitador: '',
    fecha: '',
    hora: '',
    descripcion: '',
    aportacion: 0,
    cupo: 12,
    tipoCeremonia: 'Temazcal',
  });

  // Form states - Producto
  const [productForm, setProductForm] = useState({
    name: '',
    price: 0,
    descripcion: '',
    beneficios: '',
    imageLink: '',
  });
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [productUploadProgress, setProductUploadProgress] = useState<number | null>(null);

  // Form states - Galería
  const [galleryForm, setGalleryForm] = useState({
    titulo: '',
    categoria: 'temazcal',
    tipo: 'foto' as 'foto' | 'video',
    imageLink: '',
  });
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [galleryUploadProgress, setGalleryUploadProgress] = useState<number | null>(null);

  // 1. Escuchar estado de autenticación (guardado en sesión local)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('tierra_admin_user');
        if (stored && ALLOWED_EMAILS.includes(stored.toLowerCase())) {
          requestAnimationFrame(() => {
            setCurrentUser({ email: stored });
          });
        }
      }
    } catch {
      // ignore
    } finally {
      setAuthLoading(false);
    }
  }, []);

  // 2. Cargar listas si hay usuario logueado
  const loadData = useCallback(() => {
    if (typeof window === 'undefined') return;
    setActionLoading(true);
    try {
      if (activeTab === 'eventos') {
        const stored = localStorage.getItem('tierra_sagrada_eventos');
        if (stored) {
          setEventos(JSON.parse(stored));
        } else {
          setEventos([
            {
              id: 'ev-1',
              titulo: 'Temazcal de Luna Nueva & Sahumación',
              facilitador: 'Abuela María Guadalupe & Taita Juan',
              fecha: '2026-06-21',
              hora: '16:00',
              descripcion: 'Siembra de propósitos dentro del vientre caliente de la Madre Tierra.',
              aportacion: 500,
              cupo: 15,
              tipoCeremonia: 'Temazcal',
            }
          ]);
        }
      } else if (activeTab === 'productos') {
        const stored = localStorage.getItem('tierra_sagrada_productos');
        if (stored) {
          setProductos(JSON.parse(stored));
        } else {
          setProductos([
            {
              id: 'p-1',
              name: 'Extracto de Chilcuague',
              price: 250,
              descripcion: 'Contiene afinina, alcamida medicinal para boca seca y defensas.',
              beneficios: 'Extracto puro de chilcuague y miel.',
              image: '/extracto-chilcuague.jpeg',
            }
          ]);
        }
      } else if (activeTab === 'galeria') {
        const stored = localStorage.getItem('tierra_sagrada_galeria');
        if (stored) {
          setGaleriaItems(JSON.parse(stored));
        } else {
          setGaleriaItems([
            { id: 'g-1', url: '/1.jpeg', tipo: 'foto', categoria: 'temazcal', titulo: 'Preparación del Temazcal' },
            { id: 'g-2', url: '/2.jpeg', tipo: 'foto', categoria: 'cacao', titulo: 'Ceremonia de Cacao' }
          ]);
        }
      }
    } catch (e) {
      console.error('Error cargando datos: ', e);
    } finally {
      setActionLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (currentUser) {
      requestAnimationFrame(() => {
        loadData();
      });
    }
  }, [currentUser, loadData]);

  // 3. Control de Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    const cleanEmail = loginEmail.toLowerCase().trim();
    if (!ALLOWED_EMAILS.includes(cleanEmail)) {
      setAuthError('Tu cuenta de correo no está autorizada para acceder a este panel.');
      setAuthLoading(false);
      return;
    }

    if (!loginPassword) {
      setAuthError('Por favor ingresa tu contraseña.');
      setAuthLoading(false);
      return;
    }

    try {
      localStorage.setItem('tierra_admin_user', cleanEmail);
      setCurrentUser({ email: cleanEmail });
    } catch {
      setAuthError('Error al guardar sesión.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('tierra_admin_user');
    } catch {
      // ignore
    }
    setCurrentUser(null);
  };

  // 4. Alta de Evento
  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const newEvent: Evento = {
        id: 'ev-' + Date.now(),
        ...eventForm,
      };
      const updated = [newEvent, ...eventos];
      setEventos(updated);
      localStorage.setItem('tierra_sagrada_eventos', JSON.stringify(updated));
      setEventForm({
        titulo: '',
        facilitador: '',
        fecha: '',
        hora: '',
        descripcion: '',
        aportacion: 0,
        cupo: 12,
        tipoCeremonia: 'Temazcal',
      });
      alert('¡Evento creado exitosamente! 🎉');
    } catch (err) {
      console.error('Error al guardar evento:', err);
      alert('Error al guardar el evento.');
    } finally {
      setActionLoading(false);
    }
  };

  // 5. Alta de Producto
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      let finalImageUrl = productForm.imageLink;

      if (productImageFile) {
        setProductUploadProgress(50);
        finalImageUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(productImageFile);
        });
        setProductUploadProgress(100);
      }

      const newProduct: Producto = {
        id: 'p-' + Date.now(),
        name: productForm.name,
        price: Number(productForm.price),
        descripcion: productForm.descripcion,
        beneficios: productForm.beneficios,
        image: finalImageUrl || '',
      };

      const updated = [newProduct, ...productos];
      setProductos(updated);
      localStorage.setItem('tierra_sagrada_productos', JSON.stringify(updated));

      setProductForm({
        name: '',
        price: 0,
        descripcion: '',
        beneficios: '',
        imageLink: '',
      });
      setProductImageFile(null);
      setProductUploadProgress(null);
      alert('¡Producto agregado exitosamente! 🌿');
    } catch (err) {
      console.error('Error al guardar producto:', err);
      alert('Error al guardar el producto.');
    } finally {
      setActionLoading(false);
    }
  };

  // 6. Alta de Galería
  const handleUploadGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      let finalMediaUrl = galleryForm.imageLink;

      if (galleryFile) {
        setGalleryUploadProgress(50);
        finalMediaUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(galleryFile);
        });
        setGalleryUploadProgress(100);
      }

      if (!finalMediaUrl) {
        alert('Por favor selecciona un archivo o ingresa un enlace web directo.');
        setActionLoading(false);
        return;
      }

      const newGalleryItem: GaleriaItem = {
        id: 'g-' + Date.now(),
        url: finalMediaUrl,
        tipo: galleryForm.tipo,
        categoria: galleryForm.categoria,
        titulo: galleryForm.titulo || '',
      };

      const updated = [newGalleryItem, ...galeriaItems];
      setGaleriaItems(updated);
      localStorage.setItem('tierra_sagrada_galeria', JSON.stringify(updated));

      setGalleryForm({
        titulo: '',
        categoria: 'temazcal',
        tipo: 'foto',
        imageLink: '',
      });
      setGalleryFile(null);
      setGalleryUploadProgress(null);
      alert('¡Elemento agregado a la galería con éxito! 📷');
    } catch (err) {
      console.error('Error al subir multimedia:', err);
      alert('Error al subir archivo a la galería.');
    } finally {
      setActionLoading(false);
    }
  };

  // 7. Borrar elemento genérico
  const handleDelete = (coleccion: string, id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este elemento permanentemente?')) return;
    setActionLoading(true);
    try {
      if (coleccion === 'eventos') {
        const updated = eventos.filter((x) => x.id !== id);
        setEventos(updated);
        localStorage.setItem('tierra_sagrada_eventos', JSON.stringify(updated));
      } else if (coleccion === 'productos') {
        const updated = productos.filter((x) => x.id !== id);
        setProductos(updated);
        localStorage.setItem('tierra_sagrada_productos', JSON.stringify(updated));
      } else if (coleccion === 'galeria') {
        const updated = galeriaItems.filter((x) => x.id !== id);
        setGaleriaItems(updated);
        localStorage.setItem('tierra_sagrada_galeria', JSON.stringify(updated));
      }
    } catch (err) {
      console.error('Error al borrar:', err);
      alert('No se pudo borrar el elemento.');
    } finally {
      setActionLoading(false);
    }
  };

  // VISTA ANTES DE LOGUEAR (PÁGINA DE LOGIN)
  if (!currentUser) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        backgroundColor: 'var(--color-bg-sand)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-handmade"
          style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '55px',
              height: '55px',
              backgroundColor: 'rgba(200, 107, 75, 0.1)',
              color: 'var(--color-accent-terracotta)',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--color-accent-terracotta)',
              marginBottom: '1rem',
            }}>
              <Lock size={22} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.6rem' }}>Acceso Administrativo</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.3rem' }}>
              Ingresa con tu correo autorizado de Tierra Sagrada
            </p>
          </div>

          {authError && (
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              backgroundColor: 'rgba(200, 107, 75, 0.1)',
              color: 'var(--color-accent-terracotta)',
              padding: '0.8rem',
              borderRadius: '8px',
              fontSize: '0.8rem',
              marginBottom: '1.2rem',
              alignItems: 'center',
              border: '1px solid var(--color-accent-terracotta)',
            }}>
              <ShieldAlert size={18} style={{ flexShrink: 0 }} />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Correo electrónico</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'white',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                }}
                placeholder="ejemplo@correo.com"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Contraseña</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'white',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                }}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="btn-handwritten btn-primary-organic"
              disabled={authLoading}
              style={{ justifyContent: 'center', padding: '0.8rem', marginTop: '0.5rem' }}
            >
              {authLoading ? (
                <>
                  <Loader size={16} className="animate-float-slow" />
                  <span>Validando...</span>
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // VISTA LOGUEADO (PANEL DE DASHBOARD)
  return (
    <div style={{ padding: '4rem 0', backgroundColor: 'var(--color-bg-sand)', minHeight: '80vh' }}>
      <div className="container-organic">
        {/* Header Dashboard */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          borderBottom: '2px solid var(--color-border)',
          paddingBottom: '1.5rem',
          marginBottom: '3rem',
        }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent-sage)', letterSpacing: '0.1em' }}>SESIÓN ACTIVA: {currentUser.email}</span>
            <h1 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-title)', marginTop: '0.2rem' }}>Panel de Control</h1>
          </div>
          <button
            onClick={handleLogout}
            className="btn-handwritten"
            style={{
              padding: '0.5rem 1.2rem',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              borderColor: 'var(--color-accent-terracotta)',
              color: 'var(--color-accent-terracotta)',
            }}
          >
            <LogOut size={16} />
            Cerrar Sesión
          </button>
        </div>

        {/* Pestañas de Navegación */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
        }}>
          <button
            className="btn-handwritten"
            onClick={() => setActiveTab('eventos')}
            style={{
              gap: '0.5rem',
              backgroundColor: activeTab === 'eventos' ? 'var(--color-accent-sage)' : 'transparent',
              color: activeTab === 'eventos' ? '#fff' : 'var(--color-text-earth)',
              borderColor: activeTab === 'eventos' ? 'var(--color-accent-sage)' : 'var(--color-border)',
            }}
          >
            <Calendar size={18} />
            Gestionar Eventos
          </button>
          
          <button
            className="btn-handwritten"
            onClick={() => setActiveTab('productos')}
            style={{
              gap: '0.5rem',
              backgroundColor: activeTab === 'productos' ? 'var(--color-accent-sage)' : 'transparent',
              color: activeTab === 'productos' ? '#fff' : 'var(--color-text-earth)',
              borderColor: activeTab === 'productos' ? 'var(--color-accent-sage)' : 'var(--color-border)',
            }}
          >
            <ShoppingBag size={18} />
            Gestionar Tienda
          </button>

          <button
            className="btn-handwritten"
            onClick={() => setActiveTab('galeria')}
            style={{
              gap: '0.5rem',
              backgroundColor: activeTab === 'galeria' ? 'var(--color-accent-sage)' : 'transparent',
              color: activeTab === 'galeria' ? '#fff' : 'var(--color-text-earth)',
              borderColor: activeTab === 'galeria' ? 'var(--color-accent-sage)' : 'var(--color-border)',
            }}
          >
            <ImageIcon size={18} />
            Gestionar Galería
          </button>
        </div>

        {/* GRID DE GESTIÓN (FORMULARIO E IZQUIERDA Y LISTADO A DERECHA) */}
        <style dangerouslySetInnerHTML={{__html: `
          .admin-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          @media (min-width: 992px) {
            .admin-grid {
              grid-template-columns: 1fr 1.2fr;
            }
          }
        `}} />

        <div className="admin-grid">
          {/* PANELES DE FORMULARIO DE CREACIÓN */}
          <div>
            {/* 1. SECCIÓN EVENTOS */}
            {activeTab === 'eventos' && (
              <div className="card-handmade">
                <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plus size={20} /> Crear Nuevo Evento
                </h2>
                
                <form onSubmit={handleCreateEvent} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Título del Evento</label>
                    <input
                      type="text"
                      required
                      value={eventForm.titulo}
                      onChange={(e) => setEventForm({ ...eventForm, titulo: e.target.value })}
                      style={{ padding: '0.6rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                      placeholder="Temazcal de Solsticio"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Fecha</label>
                      <input
                        type="date"
                        required
                        value={eventForm.fecha}
                        onChange={(e) => setEventForm({ ...eventForm, fecha: e.target.value })}
                        style={{ padding: '0.6rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Hora (Ej: 16:00)</label>
                      <input
                        type="text"
                        required
                        value={eventForm.hora}
                        onChange={(e) => setEventForm({ ...eventForm, hora: e.target.value })}
                        style={{ padding: '0.6rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                        placeholder="16:00"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Aportación ($ MXN)</label>
                      <input
                        type="number"
                        required
                        value={eventForm.aportacion}
                        onChange={(e) => setEventForm({ ...eventForm, aportacion: Number(e.target.value) })}
                        style={{ padding: '0.6rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Cupo (Personas)</label>
                      <input
                        type="number"
                        required
                        value={eventForm.cupo}
                        onChange={(e) => setEventForm({ ...eventForm, cupo: Number(e.target.value) })}
                        style={{ padding: '0.6rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Facilitador</label>
                      <input
                        type="text"
                        required
                        value={eventForm.facilitador}
                        onChange={(e) => setEventForm({ ...eventForm, facilitador: e.target.value })}
                        style={{ padding: '0.6rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                        placeholder="Abuela María Guadalupe"
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Tipo de Ceremonia</label>
                      <select
                        value={eventForm.tipoCeremonia}
                        onChange={(e) => setEventForm({ ...eventForm, tipoCeremonia: e.target.value })}
                        style={{ padding: '0.6rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                      >
                        <option value="Temazcal">Temazcal</option>
                        <option value="Cacao">Ceremonia de Cacao</option>
                        <option value="Círculo de Mujeres">Círculo de Mujeres</option>
                        <option value="Tepezcohuite">Tepezcohuite</option>
                        <option value="Liberación Kármica">Liberación Kármica</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Descripción</label>
                    <textarea
                      rows={3}
                      required
                      value={eventForm.descripcion}
                      onChange={(e) => setEventForm({ ...eventForm, descripcion: e.target.value })}
                      style={{ padding: '0.6rem', border: '1px solid var(--color-border)', borderRadius: '6px', resize: 'vertical' }}
                      placeholder="Escribe los detalles y beneficios de la ceremonia..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-handwritten btn-primary-organic"
                    style={{ justifyContent: 'center', marginTop: '0.5rem' }}
                  >
                    Publicar Evento
                  </button>
                </form>
              </div>
            )}

            {/* 2. SECCIÓN PRODUCTOS */}
            {activeTab === 'productos' && (
              <div className="card-handmade">
                <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plus size={20} /> Agregar Producto a la Tienda
                </h2>
                
                <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Nombre del Producto</label>
                    <input
                      type="text"
                      required
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      style={{ padding: '0.6rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                      placeholder="Pomada de Chilcuague"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Precio ($ MXN)</label>
                    <input
                      type="number"
                      required
                      value={productForm.price || ''}
                      onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                      style={{ padding: '0.6rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                      placeholder="150"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Descripción Comercial</label>
                    <textarea
                      rows={2}
                      required
                      value={productForm.descripcion}
                      onChange={(e) => setProductForm({ ...productForm, descripcion: e.target.value })}
                      style={{ padding: '0.6rem', border: '1px solid var(--color-border)', borderRadius: '6px', resize: 'vertical' }}
                      placeholder="Breve descripción del frasco, atomizador o contenido..."
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Beneficios y Modo de Uso</label>
                    <textarea
                      rows={2}
                      required
                      value={productForm.beneficios}
                      onChange={(e) => setProductForm({ ...productForm, beneficios: e.target.value })}
                      style={{ padding: '0.6rem', border: '1px solid var(--color-border)', borderRadius: '6px', resize: 'vertical' }}
                      placeholder="Anestésico local, aplicar 2 atomizaciones en la boca..."
                    />
                  </div>

                  {/* Imagen del producto: Archivo de Storage o Enlace */}
                  <div style={{ border: '1px dashed var(--color-border)', padding: '1rem', borderRadius: '6px', backgroundColor: 'rgba(0,0,0,0.01)' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Imagen del Producto</span>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {/* Subida física */}
                      <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>Subir archivo de imagen (Recomendado):</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setProductImageFile(e.target.files ? e.target.files[0] : null)}
                          style={{ fontSize: '0.8rem' }}
                        />
                        {productUploadProgress !== null && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-accent-terracotta)', marginTop: '0.2rem' }}>
                            Progreso de subida: {productUploadProgress}%
                          </div>
                        )}
                      </div>

                      <div style={{ fontSize: '0.75rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>— O BIEN —</div>

                      {/* Enlace URL */}
                      <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>Ingresar enlace de imagen directo (URL):</label>
                        <input
                          type="text"
                          value={productForm.imageLink}
                          onChange={(e) => setProductForm({ ...productForm, imageLink: e.target.value })}
                          style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '0.8rem' }}
                          placeholder="https://ejemplo.com/imagen.jpg"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-handwritten btn-primary-organic"
                    style={{ justifyContent: 'center', marginTop: '0.5rem' }}
                  >
                    Agregar Producto
                  </button>
                </form>
              </div>
            )}

            {/* 3. SECCIÓN GALERÍA */}
            {activeTab === 'galeria' && (
              <div className="card-handmade">
                <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plus size={20} /> Agregar a Galería
                </h2>
                
                <form onSubmit={handleUploadGallery} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Título de la Imagen/Video</label>
                    <input
                      type="text"
                      required
                      value={galleryForm.titulo}
                      onChange={(e) => setGalleryForm({ ...galleryForm, titulo: e.target.value })}
                      style={{ padding: '0.6rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                      placeholder="Rezo del Fuego"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Categoría</label>
                      <select
                        value={galleryForm.categoria}
                        onChange={(e) => setGalleryForm({ ...galleryForm, categoria: e.target.value })}
                        style={{ padding: '0.6rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                      >
                        <option value="temazcal">Temazcal</option>
                        <option value="cacao">Cacao</option>
                        <option value="chinampa">Chinampa / Xochimilco</option>
                        <option value="plantas">Plantas Medicinales</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Tipo de Archivo</label>
                      <select
                        value={galleryForm.tipo}
                        onChange={(e) => setGalleryForm({ ...galleryForm, tipo: e.target.value as 'foto' | 'video' })}
                        style={{ padding: '0.6rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                      >
                        <option value="foto">Foto</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                  </div>

                  {/* Carga del archivo */}
                  <div style={{ border: '1px dashed var(--color-border)', padding: '1rem', borderRadius: '6px', backgroundColor: 'rgba(0,0,0,0.01)' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Archivo Multimedia</span>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>Subir Foto o Video local (Recomendado):</label>
                        <input
                          type="file"
                          accept={galleryForm.tipo === 'foto' ? 'image/*' : 'video/*'}
                          onChange={(e) => setGalleryFile(e.target.files ? e.target.files[0] : null)}
                          style={{ fontSize: '0.8rem' }}
                        />
                        {galleryUploadProgress !== null && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-accent-terracotta)', marginTop: '0.2rem' }}>
                            Progreso de subida: {galleryUploadProgress}%
                          </div>
                        )}
                      </div>

                      <div style={{ fontSize: '0.75rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>— O BIEN —</div>

                      <div>
                        <label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>Ingresar enlace directo (URL externa):</label>
                        <input
                          type="text"
                          value={galleryForm.imageLink}
                          onChange={(e) => setGalleryForm({ ...galleryForm, imageLink: e.target.value })}
                          style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '0.8rem' }}
                          placeholder="https://ejemplo.com/video.mp4"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-handwritten btn-primary-organic"
                    style={{ justifyContent: 'center', marginTop: '0.5rem' }}
                  >
                    Publicar en Galería
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* LISTADO DE ELEMENTOS EXISTENTES (COLUMNA DERECHA) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
              Registros del Catálogo ({activeTab})
            </h2>

            {actionLoading ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <Loader size={24} className="animate-float-slow" style={{ color: 'var(--color-accent-terracotta)', display: 'inline' }} />
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Actualizando la chinampa...</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '70vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
                {/* LISTA EVENTOS */}
                {activeTab === 'eventos' && (
                  eventos.length === 0 ? <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>No hay eventos registrados en el catálogo.</p> :
                  eventos.map((ev) => (
                    <div key={ev.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'var(--color-bg-paper)', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                      <div>
                        <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>{ev.titulo}</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          📅 {ev.fecha} | 🕒 {ev.hora} | 🧘 Guía: {ev.facilitador}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete('eventos', ev.id)}
                        style={{ border: 'none', background: 'none', color: 'var(--color-accent-terracotta)', cursor: 'pointer', padding: '0.4rem' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}

                {/* LISTA PRODUCTOS */}
                {activeTab === 'productos' && (
                  productos.length === 0 ? <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>No hay productos registrados en el catálogo.</p> :
                  productos.map((prod) => (
                    <div key={prod.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'var(--color-bg-paper)', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                        {prod.image ? (
                          <img src={prod.image} alt={prod.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                        ) : (
                          <span style={{ fontSize: '1.5rem' }}>🌱</span>
                        )}
                        <div>
                          <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>{prod.name}</h4>
                          <p style={{ fontSize: '0.75rem', color: 'var(--color-accent-terracotta)', fontWeight: 700 }}>
                            ${prod.price} MXN
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete('productos', prod.id)}
                        style={{ border: 'none', background: 'none', color: 'var(--color-accent-terracotta)', cursor: 'pointer', padding: '0.4rem' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}

                {/* LISTA GALERÍA */}
                {activeTab === 'galeria' && (
                  galeriaItems.length === 0 ? <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>No hay elementos en la galería.</p> :
                  galeriaItems.map((item) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'var(--color-bg-paper)', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                        {item.tipo === 'foto' ? (
                          <img src={item.url} alt={item.titulo} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                        ) : (
                          <div style={{ width: '40px', height: '40px', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', color: '#fff', fontSize: '0.6rem' }}>VIDEO</div>
                        )}
                        <div>
                          <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.titulo || 'Sin Título'}</h4>
                          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                            {item.categoria} ({item.tipo})
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete('galeria', item.id)}
                        style={{ border: 'none', background: 'none', color: 'var(--color-accent-terracotta)', cursor: 'pointer', padding: '0.4rem' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
