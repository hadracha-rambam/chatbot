import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/pages.css';

/**
 * ב-GitHub Pages האתר יושב תחת /chatbot/, ולכן הראוטר חייב לדעת מהו
 * הנתיב הבסיסי. BASE_URL מגיע מ-Vite: '/chatbot/' בבנייה, '/' בפיתוח.
 */
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
