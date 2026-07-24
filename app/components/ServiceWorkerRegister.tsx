"use client";

import { useEffect } from "react";

// Registers public/sw.js. Kept as a tiny isolated client component so the
// rest of the tree (layout, pages) can stay server components. See
// docs/DESIGN_SYSTEM.md / ROADMAP.md Stage 5 for the PWA plan.
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;

    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Silently ignore — offline support is a progressive enhancement,
        // not a hard requirement for the app to function.
      });
    });
  }, []);

  return null;
}
