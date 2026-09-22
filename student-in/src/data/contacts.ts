import type { ContactCard } from './types';

/**
 * מוקדי הפנייה ברמב"ם.
 * הערכים ריקים בכוונה - לא ממציאים טלפונים, מיילים או שמות.
 * כשיתקבלו הפרטים, מספיק למלא את value בכל ערוץ והממשק יתעדכן.
 */
export const CONTACTS: ContactCard[] = [
  {
    id: 'hr-students',
    title: 'משאבי אנוש · סטודנטים',
    description: 'קליטה, אישור לימודים, מעמד ההעסקה וזכאויות.',
    icon: 'userCheck',
    tone: 'blue',
    channels: [
      { type: 'phone', label: 'טלפון' },
      { type: 'email', label: 'אימייל' },
    ],
  },
  {
    id: 'payroll',
    title: 'שכר',
    description: 'תלוש, תעריפים, נסיעות והחזרים.',
    icon: 'wallet',
    tone: 'turquoise',
    channels: [
      { type: 'phone', label: 'טלפון' },
      { type: 'email', label: 'אימייל' },
    ],
  },
  {
    id: 'attendance',
    title: 'נוכחות',
    description: 'דיווח שעות, היעדרויות ותיקוני דיווח.',
    icon: 'clock',
    tone: 'purple',
    channels: [
      { type: 'phone', label: 'טלפון' },
      { type: 'link', label: 'מערכת הנוכחות' },
    ],
  },
  {
    id: 'welfare',
    title: 'רווחה',
    description: 'שי לחג, ימי גיבוש ופעילויות.',
    icon: 'gift',
    tone: 'pink',
    channels: [
      { type: 'phone', label: 'טלפון' },
      { type: 'whatsapp', label: 'וואטסאפ' },
    ],
  },
  {
    id: 'funds',
    title: 'קרן השתלמות ופנסיה',
    description: 'הפרשות, טפסים והסדרת הבחירה.',
    icon: 'piggy',
    tone: 'green',
    channels: [
      { type: 'email', label: 'אימייל' },
      { type: 'link', label: 'טפסים' },
    ],
  },
];

export const CONTACT_PLACEHOLDER = 'פרטי קשר יעודכנו כאן';
