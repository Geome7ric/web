"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/firebase";
import { logEvent, Analytics } from "firebase/analytics";

export default function FirebaseAnalytics() {
  useEffect(() => {
    if (analytics) {
      // Registra una vista de página cuando el componente se monta
      logEvent(analytics as Analytics, "page_view", {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }
  }, []);

  // Este componente no renderiza nada visible
  return null;
}
