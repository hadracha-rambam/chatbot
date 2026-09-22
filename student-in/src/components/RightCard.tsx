import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import { CATEGORY_BY_ID } from '../data/categories';
import type { RightItem } from '../data/types';

interface RightCardProps {
  right: RightItem;
  showCategory?: boolean;
}

/** כרטיס זכות קומפקטי - שאלה, שורת תצוגה מקדימה וצ'יפ קטגוריה. */
export function RightCard({ right, showCategory = true }: RightCardProps) {
  const category = CATEGORY_BY_ID[right.category];

  return (
    <Link
      to={`/rights/${right.id}`}
      className="right-card pressable"
      data-tone={category.tone}
    >
      <span className="right-card__icon">
        <Icon name={right.icon} size={20} />
      </span>
      <span className="right-card__body">
        <span className="right-card__title">{right.question}</span>
        <span className="right-card__preview">{right.shortAnswer}</span>
        {showCategory && (
          <span className="right-card__meta">
            <span className="chip" data-tone={category.tone}>
              {category.filterLabel}
            </span>
            {right.keyNumber && (
              <span className="chip chip--plain">
                <span className="num">
                  {right.keyNumberPrefix ? `${right.keyNumberPrefix} ` : ''}
                  {right.keyNumber}
                </span>
              </span>
            )}
          </span>
        )}
      </span>
      <ChevronLeft className="right-card__chevron" size={20} aria-hidden="true" />
    </Link>
  );
}
