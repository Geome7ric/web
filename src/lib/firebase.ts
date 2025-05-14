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
if (typeof window !== "undefined") {
  // Solución actualizada para Analytics
  (async () => {
    try {
      const analyticsSupported = await isSupported();
      if (analyticsSupported) {
        analytics = getAnalytics(app);
        console.log("Firebase Analytics initialized successfully");
      } else {
        console.log("Firebase Analytics is not supported in this environment");
      }
    } catch (err) {
      console.error("Error initializing Firebase Analytics:", err);
    }
  })();
}

// Log initialization status
console.log("Firebase core initialized with config:", {
  projectId: firebaseConfig.projectId,
  appId: firebaseConfig.appId?.substring(0, 5) + "...",
});

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
  if (analytics) {
    logEvent(analytics, eventName, eventParams);
    console.log(`Event tracked: ${eventName}`, eventParams);
  } else {
    console.log(
      `Analytics not available, could not track: ${eventName}`,
      eventParams
    );
  }
};

// Export Firebase instances
export { app, analytics };
