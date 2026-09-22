import type { QuickAction } from './types';

/** קיצורי דרך למצבים שסטודנט.ית באמת נתקל.ת בהם. */
export const QUICK_ACTIONS: QuickAction[] = [
  { id: 'qa-exam', label: 'יש לי מבחן', emoji: '🎓', tone: 'purple', rightId: 'exam-day' },
  { id: 'qa-sick', label: 'אני חולה', emoji: '🤒', tone: 'green', rightId: 'sick-leave' },
  {
    id: 'qa-hours',
    label: 'כמה שעות מותר לי לעבוד?',
    emoji: '🕐',
    tone: 'turquoise',
    rightId: 'monthly-hours',
  },
  {
    id: 'qa-all',
    label: 'איפה רואים מה מגיע לי?',
    emoji: '👀',
    tone: 'blue',
    categoryId: 'benefits',
  },
  { id: 'qa-reserve', label: 'יש לי מילואים', emoji: '🇮🇱', tone: 'orange', rightId: 'reserve-duty' },
  {
    id: 'qa-finished',
    label: 'סיימתי את הלימודים',
    emoji: '🎓',
    tone: 'grey',
    rightId: 'finished-degree',
  },
];

/** "הכי נשאל עכשיו" - מזהי שאלות מתוך FAQS. */
export const TRENDING_FAQ_IDS = [
  'faq-exam',
  'faq-monthly-hours',
  'faq-sick-first-day',
  'faq-second-job',
  'faq-finished-degree',
];
