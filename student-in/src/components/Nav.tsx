import { CircleHelp, Home, LifeBuoy, ScrollText, type LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface NavEntry {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

export const NAV_ITEMS: NavEntry[] = [
  { to: '/', label: 'בית', icon: Home, end: true },
  { to: '/rights', label: 'הזכויות שלי', icon: ScrollText },
  { to: '/faq', label: 'שאלות', icon: CircleHelp },
  { to: '/contacts', label: 'למי פונים?', icon: LifeBuoy },
];

function NavItems() {
  return (
    <>
      {NAV_ITEMS.map(({ to, label, icon: ItemIcon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => `nav-item${isActive ? ' is-active' : ''}`}
        >
          {({ isActive }) => (
            <>
              <span className="nav-item__icon">
                <ItemIcon size={21} strokeWidth={isActive ? 2.3 : 1.8} aria-hidden="true" />
              </span>
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </>
  );
}

/** ניווט עליון - נפתח רק בדסקטופ. */
export function TopNav() {
  return (
    <nav className="top-nav" aria-label="ניווט ראשי">
      <NavItems />
    </nav>
  );
}

/** ניווט תחתון - ברירת המחדל במובייל. */
export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="ניווט ראשי">
      <div className="bottom-nav__inner">
        <NavItems />
      </div>
    </nav>
  );
}
