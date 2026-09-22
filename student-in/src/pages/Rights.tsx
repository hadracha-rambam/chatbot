import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { RightCard } from '../components/RightCard';
import { EmptyState } from '../components/EmptyState';
import { CATEGORIES, CATEGORY_BY_ID } from '../data/categories';
import { RIGHTS } from '../data/rights';
import { searchRights } from '../lib/search';
import type { CategoryId, RightItem } from '../data/types';

const ALL = 'all';

function groupBySection(rights: RightItem[]): [string, RightItem[]][] {
  const groups = new Map<string, RightItem[]>();
  for (const right of rights) {
    const key = right.section ?? '';
    const list = groups.get(key);
    if (list) list.push(right);
    else groups.set(key, [right]);
  }
  return [...groups.entries()];
}

export function Rights() {
  const [params, setParams] = useSearchParams();
  const activeCategory = params.get('cat') ?? ALL;
  const query = params.get('q') ?? '';

  const category =
    activeCategory !== ALL ? CATEGORY_BY_ID[activeCategory as CategoryId] : undefined;

  const visible = useMemo(() => {
    const base = query.trim() ? searchRights(query) : RIGHTS;
    return activeCategory === ALL
      ? base
      : base.filter((right) => right.category === activeCategory);
  }, [activeCategory, query]);

  const grouped = useMemo(() => groupBySection(visible), [visible]);

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (!value || value === ALL) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  }

  return (
    <div className="fade-in">
      <header className="page-intro">
        <h1 className="page-intro__title">{category ? category.title : 'הזכויות שלי'}</h1>
        <p className="page-intro__subtitle">
          {category ? category.subtitle : 'כל מה שחשוב לדעת, בלי לחפש בתוך נהלים.'}
        </p>
      </header>

      <SearchBar
        value={query}
        onChange={(value) => updateParam('q', value)}
        label="חיפוש בזכויות"
        placeholder="חיפוש: חופשה, מבחן, מחלה, שכר..."
      />

      <div className="scroller" style={{ marginTop: '14px' }} role="group" aria-label="סינון לפי נושא">
        <button
          type="button"
          className="filter-chip"
          aria-pressed={activeCategory === ALL}
          onClick={() => updateParam('cat', ALL)}
        >
          הכול
        </button>
        {CATEGORIES.map((item) => (
          <button
            key={item.id}
            type="button"
            className="filter-chip"
            aria-pressed={activeCategory === item.id}
            onClick={() => updateParam('cat', item.id)}
          >
            {item.filterLabel}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '18px' }} aria-live="polite">
        {visible.length === 0 ? (
          <EmptyState
            title="לא מצאנו זכות שמתאימה"
            description="אפשר לנסות מילה אחרת או לבחור נושא מהרשימה למעלה."
          />
        ) : (
          grouped.map(([section, items]) => (
            <section key={section || 'main'} style={{ marginBottom: '22px' }}>
              {section && (
                <div className="section__head">
                  <h2 className="section__title">{section}</h2>
                </div>
              )}
              <div className="stack">
                {items.map((right) => (
                  <RightCard key={right.id} right={right} showCategory={activeCategory === ALL} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
