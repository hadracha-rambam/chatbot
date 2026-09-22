import type { Tone } from './types';

/**
 * "מה רלוונטי אליי?" - עוזר ניווט קצר, לא מנוע זכאות משפטי.
 * המטרה היחידה: להביא את הסטודנט.ית לכרטיס הזכות הנכון בשתי לחיצות.
 */

export interface GuideOption {
  id: string;
  label: string;
  /** הזכויות שיוצגו בסוף התהליך. */
  resultIds: string[];
  /** משפט הכוונה קצר, מבוסס אך ורק על תוכן הנוהל. */
  note?: string;
}

export interface GuideTopic {
  id: string;
  label: string;
  emoji: string;
  tone: Tone;
  followUp?: {
    question: string;
    options: GuideOption[];
  };
  /** כשאין שאלת המשך - התוצאות מוצגות מיד. */
  resultIds?: string[];
}

export const GUIDE_DISCLAIMER =
  'המידע נועד לעשות סדר ולהנגיש את הזכויות. במקרה של ספק, יש לפנות למשאבי אנוש.';

export const GUIDE_TOPICS: GuideTopic[] = [
  {
    id: 'hours',
    label: 'שעות ושכר',
    emoji: '🕐',
    tone: 'turquoise',
    followUp: {
      question: 'מה בדיוק מעניין אותך?',
      options: [
        { id: 'monthly', label: 'כמה שעות בחודש', resultIds: ['monthly-hours', 'employment-period'] },
        { id: 'daily', label: 'כמה שעות ביום', resultIds: ['daily-hours'] },
        { id: 'quota', label: 'מה נכנס לתוך המכסה', resultIds: ['hours-quota', 'reserve-duty'] },
        { id: 'pay', label: 'איך נקבע השכר', resultIds: ['salary', 'travel'] },
      ],
    },
  },
  {
    id: 'exam',
    label: 'מבחן',
    emoji: '🎓',
    tone: 'purple',
    followUp: {
      question: 'כמה זמן אתם עובדים ברמב״ם?',
      options: [
        {
          id: 'under3',
          label: 'פחות מ-3 חודשים',
          resultIds: ['exam-day', 'study-confirmation'],
          note: 'הזכאות שמתוארת בנוהל מתחילה מ-3 חודשי עבודה. כדאי לקרוא את התנאים המלאים.',
        },
        {
          id: '3to12',
          label: '3-12 חודשים',
          resultIds: ['exam-day'],
          note: 'בטווח הזה ייתכן שמגיע חלק יחסי מיום ההיעדרות, בהתאם לכללים.',
        },
        {
          id: 'over12',
          label: 'מעל שנה',
          resultIds: ['exam-day'],
          note: 'לאחר 12 חודשי עבודה - יום היעדרות אחד בשנה לצורך בחינה.',
        },
      ],
    },
  },
  {
    id: 'sick',
    label: 'מחלה',
    emoji: '🤒',
    tone: 'green',
    followUp: {
      question: 'יש לך אישור רפואי?',
      options: [
        { id: 'yes', label: 'כן, יש לי אישור', resultIds: ['sick-leave', 'hours-quota'] },
        {
          id: 'no',
          label: 'לא, אין לי אישור',
          resultIds: ['declaration-days', 'sick-leave'],
          note: 'בלי אישור רפואי אפשר לבדוק את ימי ההצהרה.',
        },
      ],
    },
  },
  {
    id: 'vacation',
    label: 'חופשה',
    emoji: '🌴',
    tone: 'green',
    resultIds: ['vacation', 'choice-days', 'holidays'],
  },
  {
    id: 'reserve',
    label: 'מילואים',
    emoji: '🇮🇱',
    tone: 'orange',
    resultIds: ['reserve-duty', 'hours-quota'],
  },
  {
    id: 'parenting',
    label: 'הורות',
    emoji: '👶',
    tone: 'lilac',
    followUp: {
      question: 'במה מדובר?',
      options: [
        { id: 'baby', label: 'ילד עד גיל שנה', resultIds: ['parenting-hour', 'parental-rights'] },
        { id: 'pregnancy', label: 'היריון ובדיקות', resultIds: ['pregnancy'] },
        { id: 'fertility', label: 'טיפולי פוריות', resultIds: ['fertility'] },
        { id: 'other', label: 'משהו אחר', resultIds: ['parental-rights'] },
      ],
    },
  },
  {
    id: 'benefit',
    label: 'הטבה',
    emoji: '🎁',
    tone: 'pink',
    followUp: {
      question: 'כמה זמן אתם עובדים ברמב״ם?',
      options: [
        {
          id: 'under4',
          label: 'פחות מ-4 חודשים',
          resultIds: ['travel', 'pension', 'study-fund'],
          note: 'שי לחג ניתן מעל 4 חודשי עבודה רצופים.',
        },
        {
          id: 'over4',
          label: 'מעל 4 חודשים',
          resultIds: ['holiday-gift', 'travel', 'pension'],
          note: 'מעל 4 חודשי עבודה רצופים קיימת זכאות לשי לחג בהתאם לנוהל.',
        },
      ],
    },
  },
  {
    id: 'ending',
    label: 'סיום לימודים',
    emoji: '🚪',
    tone: 'grey',
    followUp: {
      question: 'כמה זמן אתם עובדים ברמב״ם?',
      options: [
        { id: 'under1', label: 'פחות משנה', resultIds: ['finished-degree', 'study-confirmation'] },
        {
          id: 'over1',
          label: 'שנה ומעלה',
          resultIds: ['finished-degree', 'five-years'],
          note: 'אם השלמת לפחות שנת עבודה אחת, יש לבדוק את זכאותך לפיצויי פיטורים.',
        },
      ],
    },
  },
];
