import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  const handleCheckout = () => {
    // Formatear mensaje para WhatsApp
    const phone = '+525534872329';
    let message = '¡Hola Tierra Sagrada! 🌿✨ Me gustaría realizar un pedido de los siguientes productos de medicina natural:\n\n';
    
    cartItems.forEach((item) => {
      message += `• *${item.quantity}x* ${item.name} ($${item.price} MXN c/u) - Subtotal: $${item.price * item.quantity} MXN\n`;
    });
    
    message += `\n*Total a pagar:* $${cartTotal} MXN\n\n`;
    message += '¿Me podrían proporcionar los datos para la transferencia bancaria y coordinar la entrega? Muchas gracias. 🙏💚';
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone.replace('+', '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop con desvanecimiento */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#000',
              zIndex: 999,
              cursor: 'pointer',
            }}
          />

          {/* Contenedor del Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '100%',
              maxWidth: '450px',
              height: '100%',
              backgroundColor: 'var(--color-bg-sand)',
              boxShadow: '-5px 0 25px rgba(0, 0, 0, 0.15)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              borderLeft: '2px solid var(--color-border)',
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.02\'/%3E%3C/svg%3E")',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-title)' }}>Tu Cesta de Medicina</h3>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-earth)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.2rem',
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Listado de Productos */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem',
            }}>
              {cartItems.length === 0 ? (
                <div style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  color: 'var(--color-text-muted)',
                  gap: '1rem',
                }}>
                  <span style={{ fontSize: '3rem' }}>🌿</span>
                  <p style={{ fontFamily: 'var(--font-title)', fontWeight: 600 }}>Tu cesta está vacía</p>
                  <p style={{ fontSize: '0.9rem' }}>Agrega productos medicinales de raíz de oro desde la tienda para iniciar tu pedido.</p>
                  <button
                    className="btn-handwritten"
                    onClick={() => setIsCartOpen(false)}
                    style={{ marginTop: '1rem' }}
                  >
                    Ver Tienda
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      padding: '1rem',
                      backgroundColor: 'var(--color-bg-paper)',
                      borderRadius: '10px 15px 10px 12px / 12px 10px 15px 10px',
                      border: '1px solid var(--color-border)',
                      alignItems: 'center',
                    }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '65px',
                          height: '65px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '1px solid var(--color-border)',
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '65px',
                        height: '65px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--color-accent-soft)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                      }}>
                        🌱
                      </div>
                    )}

                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{item.name}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-accent-terracotta)', fontWeight: 600, margin: '0.2rem 0' }}>
                        ${item.price} MXN
                      </p>
                      
                      {/* Control de cantidad */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem' }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            border: '1px solid var(--color-border)',
                            background: 'white',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.9rem', width: '20px', textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            border: '1px solid var(--color-border)',
                            background: 'white',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text-muted)',
                        cursor: 'pointer',
                        padding: '0.5rem',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent-terracotta)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer con Totales y Checkout */}
            {cartItems.length > 0 && (
              <div style={{
                padding: '1.5rem',
                borderTop: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-paper)',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  fontFamily: 'var(--font-title)',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                }}>
                  <span>Total estimado:</span>
                  <span style={{ color: 'var(--color-accent-terracotta)' }}>${cartTotal} MXN</span>
                </div>
                
                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-text-muted)',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  fontStyle: 'italic',
                }}>
                  *El pedido se enviará detallado a WhatsApp para concretar transferencia bancaria y método de entrega.
                </p>

                <button
                  className="btn-handwritten btn-primary-organic"
                  onClick={handleCheckout}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '1rem',
                  }}
                >
                  <MessageSquare size={18} />
                  Enviar Pedido por WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
