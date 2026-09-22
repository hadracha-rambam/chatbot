import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import type { CategoryMeta } from '../data/types';

/** אחד מששת עולמות התוכן במסך הבית. */
export function CategoryCard({ category }: { category: CategoryMeta }) {
  return (
    <Link
      to={`/rights?cat=${category.id}`}
      className="category-card pressable"
      data-tone={category.tone}
    >
      <span className="category-card__icon">
        <Icon name={category.icon} size={22} />
      </span>
      <span className="category-card__title">{category.title}</span>
      <span className="category-card__subtitle">{category.subtitle}</span>
    </Link>
  );
}
