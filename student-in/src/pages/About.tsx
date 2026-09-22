import { CONTENT_LAST_UPDATED, SOURCE_CIVIL_2022, SOURCE_RAMBAM_2026 } from '../data/rights';

export function About() {
  return (
    <div className="fade-in page--narrow">
      <header className="page-intro">
        <h1 className="page-intro__title">על המידע באפליקציה</h1>
      </header>

      <p className="about-text">
        המידע באפליקציה נועד להנגיש את עיקרי הזכויות והתנאים לסטודנטים המועסקים ברמב״ם.
        במקרה של סתירה בין המידע המוצג לבין הוראות הדין, התקשי״ר, הסכמים קיבוציים או הנחיות
        מחייבות ועדכניות - ההוראות המחייבות הן הקובעות.
      </p>

      <section className="right-block">
        <h2 className="right-block__title">מקורות התוכן</h2>
        <ul className="bullets">
          <li>
            <span className="bullets__marker" aria-hidden="true">
              •
            </span>
            {SOURCE_RAMBAM_2026} - מכסת השעות החודשית ומספר שעות העבודה ביום.
          </li>
          <li>
            <span className="bullets__marker" aria-hidden="true">
              •
            </span>
            {SOURCE_CIVIL_2022} - נציבות שירות המדינה, שאר הזכויות.
          </li>
        </ul>
      </section>

      <p className="source-footer">
        עדכון תוכן אחרון: <span className="num">{CONTENT_LAST_UPDATED}</span>
      </p>

      <div className="about-logo">
        <img
          src="/rambam-logo.webp"
          alt="מערך למידה ופיתוח ארגוני, רמב״ם - הקריה הרפואית לבריאות האדם"
        />
      </div>
    </div>
  );
}
