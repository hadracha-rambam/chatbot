import { ChevronDown } from 'lucide-react';
import { useId, useState, type ReactNode } from 'react';

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

/** גילוי מדורג: הכותרת תמיד גלויה, הפירוט נפתח רק בלחיצה. */
export function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className={`accordion${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="accordion__trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{title}</span>
        <ChevronDown className="accordion__chevron" size={20} aria-hidden="true" />
      </button>
      <div className="accordion__panel" id={panelId} role="region" aria-hidden={!open}>
        <div>
          <div className="accordion__content">{children}</div>
        </div>
      </div>
    </div>
  );
}
