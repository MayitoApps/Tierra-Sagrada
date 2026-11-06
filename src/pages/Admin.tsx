import React, { useState, useEffect, useCallback } from 'react';
import { auth, db, storage } from '../firebase/config';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
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

const ALLOWED_EMAILS = ['artes.grupoorganico@gmail.com', 'tierrasagradaxoch@gmail.com'];

export const Admin: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
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
    imageLink: '', // Permite poner un URL directo
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

  // 1. Escuchar estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Validar si el email está permitido
        if (user.email && ALLOWED_EMAILS.includes(user.email.toLowerCase())) {
          setCurrentUser(user);
          setAuthError('');
        } else {
          // No autorizado -> cerrar sesión de inmediato
          signOut(auth);
          setCurrentUser(null);
          setAuthError('Tu cuenta de correo no está autorizada para acceder a este panel.');
        }
      } else {
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Cargar listas si hay usuario logueado
  const loadData = useCallback(async () => {
    queueMicrotask(() => {
      setActionLoading(true);
    });
    try {
      if (activeTab === 'eventos') {
        const querySnapshot = await getDocs(query(collection(db, 'eventos'), orderBy('fecha', 'asc')));
        const list: Evento[] = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as Evento);
        });
        setEventos(list);
      } else if (activeTab === 'productos') {
        const querySnapshot = await getDocs(collection(db, 'productos'));
        const list: Producto[] = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as Producto);
        });
        setProductos(list);
      } else if (activeTab === 'galeria') {
        const querySnapshot = await getDocs(collection(db, 'galeria'));
        const list: GaleriaItem[] = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as GaleriaItem);
        });
        setGaleriaItems(list);
      }
    } catch (e) {
      console.error('Error cargando datos de Firestore: ', e);
    } finally {
      setActionLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (currentUser) {
      void (async () => {
        await loadData();
      })();
    }
  }, [currentUser, loadData]);

  // 3. Control de Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      if (!ALLOWED_EMAILS.includes(loginEmail.toLowerCase().trim())) {
        setAuthError('Tu cuenta de correo no está autorizada para acceder a este panel.');
        setAuthLoading(false);
        return;
      }
      
      await signInWithEmailAndPassword(auth, loginEmail.trim(), loginPassword);
    } catch (error: unknown) {
      console.error('Error al iniciar sesión:', error);
      const authError = error as { code?: string };
      if (authError.code === 'auth/wrong-password' || authError.code === 'auth/user-not-found' || authError.code === 'auth/invalid-credential') {
        setAuthError('Correo o contraseña incorrectos.');
      } else {
        setAuthError('Ocurrió un error al intentar iniciar sesión.');
      }
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  // 4. Alta de Evento
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await addDoc(collection(db, 'eventos'), eventForm);
      // Limpiar formulario
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
      loadData();
      alert('¡Evento creado exitosamente! 🎉');
    } catch (err) {
      console.error('Error al guardar evento:', err);
      alert('Error al guardar el evento. Asegúrate de configurar las reglas en Firestore.');
    } finally {
      setActionLoading(false);
    }
  };

  // 5. Alta de Producto (Con soporte de Storage o Link directo)
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      let finalImageUrl = productForm.imageLink;

      // Si seleccionó un archivo físico, subirlo a Firebase Storage
      if (productImageFile) {
        const fileRef = ref(storage, `productos/${Date.now()}_${productImageFile.name}`);
        const uploadTask = uploadBytesResumable(fileRef, productImageFile);

        // Esperar la subida
        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProductUploadProgress(Math.round(progress));
            },
            (error) => reject(error),
            async () => {
              finalImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      const newProduct = {
        name: productForm.name,
        price: Number(productForm.price),
        descripcion: productForm.descripcion,
        beneficios: productForm.beneficios,
        image: finalImageUrl || '',
      };

      await addDoc(collection(db, 'productos'), newProduct);

      // Resetear
      setProductForm({
        name: '',
        price: 0,
        descripcion: '',
        beneficios: '',
        imageLink: '',
      });
      setProductImageFile(null);
      setProductUploadProgress(null);
      loadData();
      alert('¡Producto agregado exitosamente! 🌿');
    } catch (err) {
      console.error('Error al guardar producto:', err);
      alert('Error al guardar el producto.');
    } finally {
      setActionLoading(false);
    }
  };

  // 6. Alta de Galería (Storage o Link)
  const handleUploadGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      let finalMediaUrl = galleryForm.imageLink;

      // Si seleccionó archivo físico
      if (galleryFile) {
        const fileRef = ref(storage, `galeria/${Date.now()}_${galleryFile.name}`);
        const uploadTask = uploadBytesResumable(fileRef, galleryFile);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setGalleryUploadProgress(Math.round(progress));
            },
            (error) => reject(error),
            async () => {
              finalMediaUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      if (!finalMediaUrl) {
        alert('Por favor selecciona un archivo o ingresa un enlace web directo.');
        setActionLoading(false);
        return;
      }

      const newGalleryItem = {
        url: finalMediaUrl,
        tipo: galleryForm.tipo,
        categoria: galleryForm.categoria,
        titulo: galleryForm.titulo || '',
      };

      await addDoc(collection(db, 'galeria'), newGalleryItem);

      // Resetear
      setGalleryForm({
        titulo: '',
        categoria: 'temazcal',
        tipo: 'foto',
        imageLink: '',
      });
      setGalleryFile(null);
      setGalleryUploadProgress(null);
      loadData();
      alert('¡Elemento agregado a la galería con éxito! 📷');
    } catch (err) {
      console.error('Error al subir multimedia:', err);
      alert('Error al subir archivo a la galería.');
    } finally {
      setActionLoading(false);
    }
  };

  // 7. Borrar elemento genérico
  const handleDelete = async (coleccion: string, id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este elemento permanentemente?')) return;
    setActionLoading(true);
    try {
      await deleteDoc(doc(db, coleccion, id));
      loadData();
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
              Usa tus credenciales oficiales de Google / Firebase
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

          {/* LISTADO DE ELEMENTOS EXISTENTES EN FIRESTORE (COLUMNA DERECHA) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
              Registros en Base de Datos ({activeTab})
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
                  eventos.length === 0 ? <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>No hay eventos cargados en Firestore.</p> :
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
                  productos.length === 0 ? <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>No hay productos cargados en Firestore.</p> :
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
                  galeriaItems.length === 0 ? <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>No hay multimedia en la galería de Firestore.</p> :
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
