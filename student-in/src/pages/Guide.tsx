import { useMemo, useState } from 'react';
import { ChevronRight, RotateCcw } from 'lucide-react';
import { RightCard } from '../components/RightCard';
import { Notice } from '../components/Notice';
import { GUIDE_DISCLAIMER, GUIDE_TOPICS, type GuideOption, type GuideTopic } from '../data/guide';
import { getRight } from '../data/rights';
import type { RightItem } from '../data/types';

export function Guide() {
  const [topic, setTopic] = useState<GuideTopic | null>(null);
  const [option, setOption] = useState<GuideOption | null>(null);

  const step = topic === null ? 1 : topic.followUp && option === null ? 2 : 3;

  const results = useMemo<RightItem[]>(() => {
    const ids = option?.resultIds ?? topic?.resultIds ?? [];
    return ids.map((id) => getRight(id)).filter((item): item is RightItem => Boolean(item));
  }, [option, topic]);

  function selectTopic(next: GuideTopic) {
    setTopic(next);
    setOption(null);
  }

  function reset() {
    setTopic(null);
    setOption(null);
  }

  return (
    <div className="fade-in">
      <header className="page-intro">
        <h1 className="page-intro__title">מה רלוונטי אליי?</h1>
        <p className="page-intro__subtitle">
          שתי שאלות קצרות, ואנחנו מביאים אותך לזכות הנכונה.
        </p>
      </header>

      <div className="guide-step__progress" aria-hidden="true">
        <span className={`guide-step__dot${step >= 1 ? ' is-active' : ''}`} />
        <span className={`guide-step__dot${step >= 2 ? ' is-active' : ''}`} />
        <span className={`guide-step__dot${step >= 3 ? ' is-active' : ''}`} />
      </div>

      <section>
        <h2 className="section__title" style={{ marginBottom: '12px' }}>
          מה באת לבדוק?
        </h2>
        <div className="guide-options">
          {GUIDE_TOPICS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="guide-option pressable"
              aria-pressed={topic?.id === item.id}
              onClick={() => selectTopic(item)}
            >
              <span className="guide-option__emoji" aria-hidden="true">
                {item.emoji}
              </span>
              {item.label}
            </button>
          ))}
        </div>
      </section>

      {topic?.followUp && (
        <section className="section fade-in">
          <h2 className="section__title" style={{ marginBottom: '12px' }}>
            {topic.followUp.question}
          </h2>
          <div className="guide-options guide-options--single">
            {topic.followUp.options.map((item) => (
              <button
                key={item.id}
                type="button"
                className="guide-option pressable"
                aria-pressed={option?.id === item.id}
                onClick={() => setOption(item)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>
      )}

      {results.length > 0 && (
        <section className="section fade-in">
          <div className="section__head">
            <h2 className="section__title">זה מה שרלוונטי אליך</h2>
            <button type="button" className="section__link" onClick={reset}>
              <RotateCcw size={15} aria-hidden="true" />
              להתחלה
            </button>
          </div>

          {option?.note && (
            <div style={{ marginBottom: '12px' }}>
              <Notice tone="blue" icon="info">
                {option.note}
              </Notice>
            </div>
          )}

          <div className="stack">
            {results.map((right) => (
              <RightCard key={right.id} right={right} />
            ))}
          </div>
        </section>
      )}

      <div style={{ marginTop: '22px' }}>
        <Notice tone="grey" icon="info">
          {GUIDE_DISCLAIMER}
        </Notice>
      </div>

      {topic && (
        <div style={{ marginTop: '14px' }}>
          <button type="button" className="back-link" onClick={reset}>
            <ChevronRight size={17} aria-hidden="true" />
            להתחיל מחדש
          </button>
        </div>
      )}
    </div>
  );
}
