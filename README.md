# Tierra Sagrada 🌿

Sitio web oficial de **Tierra Sagrada**, un espacio de sanación, medicina tradicional mexihka, temazcales, ceremonias ancestrales y productos naturales elaborados en la chinampa de Xochimilco, Ciudad de México.

---

## 🛠️ Tecnologías

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Empaquetador**: [Vite](https://vite.dev/)
- **Enrutamiento**: [React Router DOM v7](https://reactrouter.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Base de Datos y Autenticación**: [Firebase](https://firebase.google.com/) (Firestore, Auth, Storage)
- **Despliegue**: Optimizado para [Vercel](https://vercel.com/)

---

## 🚀 Inicio Rápido (Desarrollo Local)

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/Tierra-Sagrada.git
cd Tierra-Sagrada
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Copia el archivo `.env.example` y renómbralo a `.env.local`:
```bash
cp .env.example .env.local
```
Rellena las credenciales correspondientes a tu proyecto de Firebase.

### 4. Iniciar servidor de desarrollo
```bash
npm run dev
```

### 5. Compilar para producción
```bash
npm run build
```

---

## ☁️ Despliegue en Vercel

Este proyecto cuenta con `vercel.json` configurado para manejar el enrutamiento de aplicación de una sola página (SPA / Single Page Application) sin errores 404 al recargar rutas como `/tienda`, `/ceremonias`, `/admin`, etc.

### Pasos para conectar a Vercel:

1. **Subir el código a GitHub**:
   Asegúrate de haber subido este repositorio a tu cuenta de GitHub.
2. **Importar en Vercel**:
   - Entra a tu cuenta en [vercel.com](https://vercel.com).
   - Haz clic en **"Add New..."** > **"Project"**.
   - Selecciona el repositorio `Tierra-Sagrada`.
3. **Variables de Entorno en Vercel**:
   En la sección **"Environment Variables"** dentro de la configuración del proyecto en Vercel, agrega las variables de tu archivo `.env.example`:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
4. **Desplegar**:
   Haz clic en **"Deploy"**. Vercel detectará Vite automáticamente y compilará la aplicación en segundos.

---

## 📁 Estructura del Proyecto

```
Tierra-Sagrada/
├── public/              # Archivos estáticos e imágenes servidas directamente
├── src/
│   ├── assets/          # Logotipos y recursos importados
│   ├── components/      # Componentes reutilizables (Navbar, Footer, CartDrawer, Layout)
│   ├── context/         # Contexto global (Carrito de compras)
│   ├── firebase/        # Configuración e inicialización de Firebase
│   └── pages/           # Vistas principales (Home, Tienda, Ceremonias, Admin, etc.)
├── vercel.json          # Reglas de reescritura SPA para Vercel
├── .env.example         # Plantilla de variables de entorno
├── vite.config.ts       # Configuración de Vite
└── package.json         # Scripts y dependencias
```
