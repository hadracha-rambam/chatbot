import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import { FAQS } from '../data/faqs';
import { getRight } from '../data/rights';

export function Faq() {
  const [params] = useSearchParams();
  const requestedId = params.get('open');
  const [openId, setOpenId] = useState<string | null>(requestedId);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpenId(requestedId);
    if (!requestedId) return;
    const node = containerRef.current?.querySelector(`#${CSS.escape(requestedId)}`);
    node?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [requestedId]);

  const items = useMemo(
    () =>
      FAQS.map((faq) => ({
        faq,
        right: getRight(faq.rightId),
      })),
    [],
  );

  return (
    <div className="fade-in">
      <header className="page-intro">
        <h1 className="page-intro__title">שאלות שבטח עברו גם לכם בראש</h1>
        <p className="page-intro__subtitle">
          תשובות קצרות, ולידן הקישור לזכות המלאה.
        </p>
      </header>

      <div className="stack" ref={containerRef}>
        {items.map(({ faq, right }) => {
          const open = openId === faq.id;
          return (
            <div key={faq.id} id={faq.id} className={`accordion${open ? ' is-open' : ''}`}>
              <button
                type="button"
                className="accordion__trigger"
                aria-expanded={open}
                aria-controls={`${faq.id}-panel`}
                onClick={() => setOpenId(open ? null : faq.id)}
              >
                <span>{faq.question}</span>
                <ChevronDown className="accordion__chevron" size={20} aria-hidden="true" />
              </button>
              <div className="accordion__panel" id={`${faq.id}-panel`} role="region">
                <div>
                  <div className="accordion__content">
                    {faq.answer}
                    {right && (
                      <div>
                        <Link to={`/rights/${right.id}`} className="faq-answer__link">
                          לזכות המלאה
                          <ChevronLeft size={16} aria-hidden="true" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
