import { initializeApp, getApps } from "firebase/app";
import {
  getAnalytics,
  isSupported,
  Analytics,
  logEvent,
} from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics
let analytics: Analytics | null = null;
// Detectar si estamos en entorno de desarrollo local
const isLocalEnvironment = process.env.NODE_ENV === "development";

if (typeof window !== "undefined" && !isLocalEnvironment) {
  // Updated solution for Analytics - production only
  (async () => {
    try {
      const analyticsSupported = await isSupported();
      if (analyticsSupported) {
        analytics = getAnalytics(app);
      } else {
      }
    } catch (err) {
      console.error("Error initializing Firebase Analytics:", err);
    }
  })();
} else if (isLocalEnvironment) {
  console.log("Firebase Analytics disabled in local development environment");
}

/**
 * Tipo para los parámetros de eventos de Firebase Analytics
 * Esto evita el uso de 'any' y proporciona un tipo más específico
 */
type EventParams = Record<string, string | number | boolean | null | undefined>;

/**
 * Función para registrar eventos de Analytics
 * @param eventName Nombre del evento a registrar
 * @param eventParams Parámetros adicionales del evento
 */
export const trackEvent = (eventName: string, eventParams?: EventParams) => {
  // Si estamos en entorno local, no enviar eventos a Firebase Analytics
  if (isLocalEnvironment) {
    console.log(
      `[DEV] Event would be tracked in production: ${eventName}`,
      eventParams
    );
    return;
  }

  if (analytics) {
    logEvent(analytics, eventName, eventParams);
  }
};

// Export Firebase instances
export { app, analytics };
