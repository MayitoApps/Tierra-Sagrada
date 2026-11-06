import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Ceremonias } from './pages/Ceremonias';
import { Calendario } from './pages/Calendario';
import { Nosotros } from './pages/Nosotros';
import { Rezandero } from './pages/Rezandero';
import { Tienda } from './pages/Tienda';
import { Galeria } from './pages/Galeria';
import { Contacto } from './pages/Contacto';
import { Admin } from './pages/Admin';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ceremonias" element={<Ceremonias />} />
              <Route path="/calendario" element={<Calendario />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/rezandero" element={<Rezandero />} />
              <Route path="/tienda" element={<Tienda />} />
              <Route path="/galeria" element={<Galeria />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/admin" element={<Admin />} />
              {/* Ruta comodín de redirección */}
              <Route path="*" element={<Home />} />
            </Routes>
          </AnimatePresence>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;
