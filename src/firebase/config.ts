import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Validar que las variables de entorno estén presentes
const isConfigValid = firebaseConfig.apiKey && firebaseConfig.apiKey !== 'tu_api_key_aqui';

if (!isConfigValid) {
  console.warn(
    'Tierra Sagrada Firebase: Las credenciales de Firebase no están configuradas o usan valores de plantilla. ' +
    'Por favor, configura las variables de entorno reales en tu panel de control o archivo .env.local.'
  );
}

// Inicializar Firebase (evitando inicializaciones múltiples en Hot Reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
