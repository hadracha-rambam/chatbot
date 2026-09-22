import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * האתר מתפרסם ב-GitHub Pages תחת הנתיב /chatbot/, אבל בפיתוח מקומי
 * הוא מוגש מהשורש. לכן ה-base נקבע לפי הפקודה:
 *   vite        (dev)  -> '/'
 *   vite build  (prod) -> '/chatbot/'
 *
 * מעבר לדומיין אחר בעתיד = שינוי המחרוזת הזו בלבד. הקוד באפליקציה
 * קורא את הערך דרך import.meta.env.BASE_URL ולא מקודד אותו קשיח.
 */
const PAGES_BASE = '/chatbot/';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? PAGES_BASE : '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: false,
  },
}));
