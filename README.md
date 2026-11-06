# Tierra Sagrada 🌿

Sitio web oficial de **Tierra Sagrada**, un espacio sagrado de sanación, medicina tradicional mexihka, temazcales, ceremonias ancestrales y productos naturales elaborados en la chinampa de Xochimilco, Ciudad de México.

---

## 🛠️ Tecnologías

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Estilos**: Vanilla CSS con variables de diseño orgánico inspiradas en la tierra y la naturaleza
- **Despliegue**: Optimizado de forma nativa para [Vercel](https://vercel.com/) (Zero-Config)

---

## 🚀 Inicio Rápido (Desarrollo Local)

### 1. Clonar el repositorio
```bash
git clone https://github.com/MayitoApps/Tierra-Sagrada.git
cd Tierra-Sagrada
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar servidor de desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la página.

### 4. Compilar para producción
```bash
npm run build
```

---

## ☁️ Despliegue en Vercel

Este proyecto no requiere bases de datos externas ni variables de entorno para funcionar. Todo el catálogo, calendario, galería y blog vienen integrados de forma nativa.

### Pasos para desplegar en Vercel:

1. **Entra a [vercel.com](https://vercel.com)** e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New..."** > **"Project"**.
3. Selecciona el repositorio **`MayitoApps/Tierra-Sagrada`**.
4. Haz clic en **"Deploy"** (Vercel detecta Next.js automáticamente sin necesidad de configurar nada).
5. ¡Listo! Tu página estará en vivo en segundos con SSL gratuito y rendimiento ultra rápido en el Edge de Vercel.

---

## 📁 Estructura del Proyecto

```
Tierra-Sagrada/
├── public/              # Archivos multimedia, imágenes y fotos de las ceremonias
├── src/
│   ├── app/             # Rutas y páginas de Next.js (App Router)
│   │   ├── layout.tsx   # Layout global (Metadatos, CartProvider, Estructura)
│   │   ├── page.tsx     # Página de inicio
│   │   ├── ceremonias/  # Vista de ceremonias
│   │   ├── calendario/  # Vista de calendario
│   │   ├── nosotros/    # Vista de guardianes y facilitadores
│   │   ├── rezandero/   # Vista de blog y lecturas medicinales
│   │   ├── tienda/      # Catálogo de productos y medicina natural
│   │   ├── galeria/     # Galería de fotos y videos
│   │   ├── contacto/    # Ubicación y contacto
│   │   └── admin/       # Panel administrativo local
│   ├── components/      # Componentes (Navbar, Footer, CartDrawer, Layout)
│   ├── context/         # Contexto global (Carrito de compras)
│   ├── views/           # Vistas y componentes de página desacoplados
│   └── index.css        # Sistema de estilos y variables orgánicas
├── next.config.mjs      # Configuración de Next.js
└── package.json         # Scripts y dependencias
```
