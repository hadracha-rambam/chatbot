import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Compass, Flame, GraduationCap } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { RightCard } from '../components/RightCard';
import { CategoryCard } from '../components/CategoryCard';
import { EmptyState } from '../components/EmptyState';
import { CATEGORIES } from '../data/categories';
import { QUICK_ACTIONS, TRENDING_FAQ_IDS } from '../data/quickActions';
import { FAQS } from '../data/faqs';
import { search } from '../lib/search';

export function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const results = useMemo(() => search(query, 8), [query]);
  const trending = useMemo(
    () => TRENDING_FAQ_IDS.map((id) => FAQS.find((faq) => faq.id === id)).filter(Boolean),
    [],
  );

  const isSearching = query.trim().length > 1;

  return (
    <div className="fade-in">
      <section className="hero">
        <p className="hero__eyebrow">STUDENT iN</p>
        <h1 className="hero__greeting">
          <span>היי 👋</span>
          <span className="hero__question">מה באת לברר?</span>
        </h1>

        <div className="hero__search">
          <SearchBar
            value={query}
            onChange={setQuery}
            label="חיפוש בזכויות ובשאלות הנפוצות"
          />
        </div>

        {isSearching && (
          <div className="search-results" aria-live="polite">
            {results.length === 0 ? (
              <EmptyState
                title="לא מצאנו התאמה"
                description="אפשר לנסות מילה אחרת, למשל: מבחן, מחלה, מילואים או שעות."
              />
            ) : (
              <>
                <p className="search-results__count">
                  <span className="num">{results.length}</span> תוצאות
                </p>
                {results.map((result) =>
                  result.right ? (
                    <RightCard key={result.right.id} right={result.right} />
                  ) : (
                    <Link
                      key={result.faq!.id}
                      to={`/faq?open=${result.faq!.id}`}
                      className="right-card pressable"
                      data-tone="grey"
                    >
                      <span className="right-card__body">
                        <span className="right-card__title">{result.faq!.question}</span>
                        <span className="right-card__preview">{result.faq!.answer}</span>
                        <span className="right-card__meta">
                          <span className="chip chip--plain">שאלה נפוצה</span>
                        </span>
                      </span>
                      <ChevronLeft className="right-card__chevron" size={20} aria-hidden="true" />
                    </Link>
                  ),
                )}
              </>
            )}
          </div>
        )}
      </section>

      {!isSearching && (
        <>
          <section aria-label="קיצורי דרך">
            <div className="scroller">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  className="quick-action"
                  data-tone={action.tone}
                  onClick={() =>
                    navigate(
                      action.rightId
                        ? `/rights/${action.rightId}`
                        : `/rights?cat=${action.categoryId}`,
                    )
                  }
                >
                  <span className="quick-action__emoji" aria-hidden="true">
                    {action.emoji}
                  </span>
                  {action.label}
                </button>
              ))}
            </div>
          </section>

          <section className="section">
            <Link to="/guide" className="guide-banner pressable">
              <span className="guide-banner__icon">
                <Compass size={22} strokeWidth={1.9} aria-hidden="true" />
              </span>
              <span style={{ flex: 1 }}>
                <span className="guide-banner__title">מה רלוונטי אליי?</span>
                <span className="guide-banner__subtitle">
                  שתי שאלות קצרות, ואנחנו מביאים לך בדיוק את מה שצריך.
                </span>
              </span>
              <ChevronLeft size={20} aria-hidden="true" />
            </Link>
          </section>

          <section className="section">
            <div className="section__head">
              <h2 className="section__title">מה מעניין אותך?</h2>
              <Link to="/rights" className="section__link">
                כל הזכויות
                <ChevronLeft size={15} aria-hidden="true" />
              </Link>
            </div>
            <div className="category-grid">
              {CATEGORIES.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>

          <section className="section">
            <Link to="/rights/study-confirmation" className="spotlight pressable">
              <span className="spotlight__badge">
                <GraduationCap size={15} strokeWidth={2} aria-hidden="true" />
                אישור לימודים
              </span>
              <span className="spotlight__title">מתחילה שנת לימודים חדשה?</span>
              <span className="spotlight__body">
                המשך ההעסקה במשרת סטודנט מותנה בהצגת אישור לימודים תקף.
              </span>
              <span className="spotlight__cta">
                מה צריך לדעת?
                <ChevronLeft size={17} aria-hidden="true" />
              </span>
            </Link>
          </section>

          <section className="section">
            <div className="section__head">
              <h2 className="section__title">
                הכי נשאל עכשיו <Flame size={17} strokeWidth={2} aria-hidden="true" />
              </h2>
              <Link to="/faq" className="section__link">
                כל השאלות
                <ChevronLeft size={15} aria-hidden="true" />
              </Link>
            </div>
            <div className="stack">
              {trending.map((faq) => (
                <Link
                  key={faq!.id}
                  to={`/faq?open=${faq!.id}`}
                  className="right-card pressable"
                  data-tone="orange"
                >
                  <span className="right-card__body">
                    <span className="right-card__title">{faq!.question}</span>
                    <span className="right-card__preview">{faq!.answer}</span>
                  </span>
                  <ChevronLeft className="right-card__chevron" size={20} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
