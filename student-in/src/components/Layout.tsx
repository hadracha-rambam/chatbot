import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Info } from 'lucide-react';
import { BottomNav, TopNav } from './Nav';
import { LOGO_ALT, LOGO_SRC } from '../lib/assets';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, search]);

  return null;
}

export function Layout() {
  return (
    <div className="shell">
      <ScrollToTop />
      <a className="skip-link" href="#main">
        דילוג לתוכן הראשי
      </a>

      <p className="draft-strip" role="note">
        גרסת תצוגה - התוכן טרם אושר להפצה
      </p>

      <header className="app-header">
        <div className="app-header__inner">
          <Link to="/" className="brand" aria-label="STUDENT iN - לדף הבית">
            <span className="brand__mark">
              STUDENT <i>iN</i>
            </span>
            <span className="brand__divider" aria-hidden="true" />
            <img className="brand__logo" src={LOGO_SRC} alt={LOGO_ALT} />
          </Link>
          <TopNav />
        </div>
      </header>

      <main id="main" className="page">
        <Outlet />
      </main>

      <footer className="app-footer">
        <Link to="/about" className="app-footer__link">
          <Info size={15} aria-hidden="true" />
          על המידע באפליקציה
        </Link>
      </footer>

      <BottomNav />
    </div>
  );
}
