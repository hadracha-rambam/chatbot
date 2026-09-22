import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { KeyNumber } from '../components/KeyNumber';
import { Notice } from '../components/Notice';
import { Accordion } from '../components/Accordion';
import { RightCard } from '../components/RightCard';
import { EmptyState } from '../components/EmptyState';
import { CATEGORY_BY_ID } from '../data/categories';
import { getRight } from '../data/rights';
import type { ContentStatus, RightItem } from '../data/types';

const STATUS_LABEL: Record<ContentStatus, string> = {
  current_2026: 'כלל עדכני · 2026',
  based_on_2022: 'מבוסס נוהל 2022',
  needs_verification: 'ממתין לאימות מול עדכוני 2026',
  rambam_specific: 'תהליך פנימי ברמב״ם',
};

function isPlaceholderProcess(text: string): boolean {
  return text.includes('יעודכנו') || text.includes('יעודכן');
}

function Block({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="right-block">
      {title && <h2 className="right-block__title">{title}</h2>}
      {children}
    </section>
  );
}

export function RightDetail() {
  const { rightId } = useParams();
  const right = getRight(rightId);

  if (!right) {
    return (
      <div className="fade-in">
        <EmptyState
          title="הזכות לא נמצאה"
          description="ייתכן שהקישור השתנה. אפשר לחזור לרשימת הזכויות ולנסות שוב."
        />
        <div style={{ textAlign: 'center' }}>
          <Link to="/rights" className="section__link">
            לכל הזכויות
          </Link>
        </div>
      </div>
    );
  }

  const category = CATEGORY_BY_ID[right.category];
  const related = (right.relatedIds ?? [])
    .map((id) => getRight(id))
    .filter((item): item is RightItem => Boolean(item));

  return (
    <article className="fade-in" data-tone={category.tone}>
      <Link to={`/rights?cat=${right.category}`} className="back-link">
        <ChevronRight size={17} aria-hidden="true" />
        {category.title}
      </Link>

      <header className="right-detail__head">
        <span className="right-detail__icon">
          <Icon name={right.icon} size={26} />
        </span>
        <div>
          <h1 className="right-detail__question">{right.question}</h1>
          <div className="right-detail__category">
            <span className="chip" data-tone={category.tone}>
              {category.filterLabel}
            </span>
          </div>
        </div>
      </header>

      <p className="right-detail__answer">{right.shortAnswer}</p>

      {right.highlight && (
        <div style={{ marginTop: '16px' }}>
          <div className="highlight-banner">
            <Sparkles size={19} strokeWidth={2} aria-hidden="true" />
            <span>{right.highlight}</span>
          </div>
        </div>
      )}

      {right.keyNumber && (
        <Block>
          <KeyNumber
            value={right.keyNumber}
            prefix={right.keyNumberPrefix}
            label={right.keyNumberLabel}
          />
        </Block>
      )}

      {right.chips && right.chips.length > 0 && (
        <Block title="מה נכנס לזה?">
          <ul className="chip-row">
            {right.chips.map((chip) => (
              <li key={chip} className="chip" data-tone={category.tone}>
                {chip}
              </li>
            ))}
          </ul>
        </Block>
      )}

      {right.secondary && (
        <Block>
          <p className="muted">{right.secondary}</p>
        </Block>
      )}

      {right.breakdown && (
        <Block title="הפרשות">
          <div className="kv-grid">
            {right.breakdown.map((block) => (
              <div key={block.title} className="kv-block">
                <p className="kv-block__title">{block.title}</p>
                {block.rows.map((row) => (
                  <div key={row.label} className="kv-row">
                    <span className="kv-row__label">{row.label}</span>
                    <span className="kv-row__value">{row.value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Block>
      )}

      {right.statusNote && (
        <Block>
          <span className="status-note">
            <Icon name="info" size={14} />
            {right.statusNote}
          </span>
        </Block>
      )}

      {right.eligibility && right.eligibility.length > 0 && (
        <Block title="מי זכאי.ת?">
          <ul className="bullets">
            {right.eligibility.map((item) => (
              <li key={item}>
                <span className="bullets__marker" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Block>
      )}

      {right.steps && right.steps.length > 0 && (
        <Block title="מה צריך לעשות?">
          <ol className="steps">
            {right.steps.map((step, index) => (
              <li key={step}>
                <span className="steps__num">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </Block>
      )}

      {right.topics && right.topics.length > 0 && (
        <Block title="הנושאים בקטגוריה">
          <div className="related-grid">
            {right.topics.map((topic) =>
              topic.targetId ? (
                <Link
                  key={topic.label}
                  to={`/rights/${topic.targetId}`}
                  className="topic-card pressable"
                >
                  {topic.label}
                  <ChevronLeft size={18} aria-hidden="true" />
                </Link>
              ) : (
                <div key={topic.label} className="topic-card topic-card--static">
                  {topic.label}
                  <span className="topic-card__hint">יש לבדוק מול משאבי אנוש</span>
                </div>
              ),
            )}
          </div>
        </Block>
      )}

      {right.importantNote && (
        <Block>
          <Notice title="חשוב לדעת" tone="orange" icon="info">
            {right.importantNote}
          </Notice>
        </Block>
      )}

      {right.expandable && right.expandable.length > 0 && (
        <Block>
          <div className="stack">
            {right.expandable.map((block) => (
              <Accordion key={block.title} title={block.title}>
                <ul className="bullets">
                  {block.items.map((item) => (
                    <li key={item}>
                      <span className="bullets__marker" aria-hidden="true">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Accordion>
            ))}
          </div>
        </Block>
      )}

      {right.placeholder && (
        <Block>
          <Notice tone="grey" icon="info">
            {right.placeholder}
          </Notice>
        </Block>
      )}

      {right.rambamProcess && (
        <Block title="איך עושים את זה ברמב״ם?">
          <Notice tone="blue" icon="sparkles">
            {isPlaceholderProcess(right.rambamProcess)
              ? 'אנחנו עדיין מעדכנים כאן את התהליך המדויק. בינתיים מומלץ לפנות למשאבי אנוש.'
              : right.rambamProcess}
          </Notice>
        </Block>
      )}

      {related.length > 0 && (
        <Block title="קשור לזה">
          <div className="stack">
            {related.map((item) => (
              <RightCard key={item.id} right={item} showCategory={false} />
            ))}
          </div>
        </Block>
      )}

      <footer className="source-footer">
        <span className="status-note">{STATUS_LABEL[right.status]}</span>
        <p style={{ marginTop: '8px' }}>
          מקור: {right.source}
          {right.sourceYear ? (
            <>
              {' · '}
              <span className="num">{right.sourceYear}</span>
            </>
          ) : null}
        </p>
      </footer>
    </article>
  );
}
