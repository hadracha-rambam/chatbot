import type { CategoryMeta, CategoryId } from './types';

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'work',
    title: 'השכר והעבודה שלי',
    subtitle: 'שעות, שכר ומה נכנס למכסה',
    icon: 'wallet',
    tone: 'turquoise',
    filterLabel: 'עבודה ושכר',
  },
  {
    id: 'timeoff',
    title: 'חופשה ומחלה',
    subtitle: 'כשצריך לקחת רגע מהעבודה',
    icon: 'palm',
    tone: 'green',
    filterLabel: 'חופשה ומחלה',
  },
  {
    id: 'studies',
    title: 'לימודים ומבחנים',
    subtitle: 'כי קודם כל - אתם סטודנטים',
    icon: 'graduation',
    tone: 'purple',
    filterLabel: 'לימודים',
  },
  {
    id: 'benefits',
    title: 'הטבות וזכויות',
    subtitle: 'פנסיה, קרן השתלמות, נסיעות ועוד',
    icon: 'gift',
    tone: 'pink',
    filterLabel: 'הטבות',
  },
  {
    id: 'family',
    title: 'הורות ומשפחה',
    subtitle: 'זכויות בתקופות ובמצבים שונים',
    icon: 'heart',
    tone: 'lilac',
    filterLabel: 'משפחה',
  },
  {
    id: 'ending',
    title: 'סיום ושינויים',
    subtitle: 'סיום לימודים, מעבר וסיום העסקה',
    icon: 'door',
    tone: 'blue',
    filterLabel: 'סיום העסקה',
  },
];

export const CATEGORY_BY_ID: Record<CategoryId, CategoryMeta> = CATEGORIES.reduce(
  (acc, category) => {
    acc[category.id] = category;
    return acc;
  },
  {} as Record<CategoryId, CategoryMeta>,
);
