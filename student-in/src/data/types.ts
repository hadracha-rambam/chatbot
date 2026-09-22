/**
 * מודל התוכן המרכזי של STUDENT iN.
 *
 * כל הזכויות באפליקציה מגיעות מקובץ אחד (`src/data/rights.ts`) ובנויות
 * באותו מבנה בדיוק. עדכון תוכן = עדכון אובייקט אחד, וכל המסכים מתעדכנים.
 * המבנה מיועד להתחבר בהמשך ל-CMS או ל-Supabase בלי לגעת בממשק.
 */

/** ששת עולמות התוכן שמוצגים במסך הבית ובמסנני "הזכויות שלי". */
export type CategoryId =
  | 'work'
  | 'timeoff'
  | 'studies'
  | 'benefits'
  | 'family'
  | 'ending';

/** מקור וסטטוס התוכן - מאפשר לסמן מה עדכני ומה ממתין לאימות. */
export type ContentStatus =
  | 'current_2026'
  | 'based_on_2022'
  | 'needs_verification'
  | 'rambam_specific';

/** שמות האייקונים המותרים (ממופים ל-lucide-react ב-Icon.tsx). */
export type IconName =
  | 'wallet'
  | 'clock'
  | 'calendar'
  | 'palm'
  | 'stethoscope'
  | 'thermometer'
  | 'graduation'
  | 'fileCheck'
  | 'userCheck'
  | 'gift'
  | 'piggy'
  | 'trending'
  | 'bus'
  | 'sun'
  | 'shirt'
  | 'shield'
  | 'partyPopper'
  | 'heart'
  | 'baby'
  | 'family'
  | 'briefcase'
  | 'door'
  | 'timer'
  | 'users'
  | 'dumbbell'
  | 'bookOpen'
  | 'info'
  | 'sparkles';

export interface KeyValueRow {
  label: string;
  value: string;
}

export interface Breakdown {
  title: string;
  rows: KeyValueRow[];
}

export interface ExpandableBlock {
  title: string;
  items: string[];
}

export interface RelatedTopic {
  label: string;
  /** מזהה זכות קיימת. אם חסר - הנושא מוצג כתווית מידע בלבד. */
  targetId?: string;
}

export interface RightItem {
  id: string;
  category: CategoryId;
  /** כותרת משנה בתוך הקטגוריה, למשל "רווחה והטבות" או "לא הכול כלול". */
  section?: string;
  icon: IconName;
  /** השאלה כפי שסטודנט.ית באמת שואל.ת. */
  question: string;
  /** תשובה קצרה - משפט או שניים, לא יותר. */
  shortAnswer: string;
  /** המספר המרכזי, מוצג גדול. */
  keyNumber?: string;
  keyNumberPrefix?: string;
  keyNumberLabel?: string;
  /** צ'יפים תומכים מתחת למספר. */
  chips?: string[];
  /** מידע משני, שורה אחת. */
  secondary?: string;
  /** מי זכאי.ת - תנאים קצרים. */
  eligibility?: string[];
  /** מה צריך לעשות - עד 4 צעדים. */
  steps?: string[];
  /** חשוב לדעת - הערה מודגשת. */
  importantNote?: string;
  /** הדגשה חזקה במיוחד (מוצגת כבאנר צבעוני בראש הזכות). */
  highlight?: string;
  /** פירוט מספרי, למשל אחוזי הפרשה. */
  breakdown?: Breakdown[];
  /** תוכן שנפתח בלחיצה - גילוי מדורג. */
  expandable?: ExpandableBlock[];
  /** נושאים מקושרים (כרטיסיות בתוך הזכות). */
  topics?: RelatedTopic[];
  /** איך זה עובד ברמב"ם. */
  rambamProcess?: string;
  /** מציין שחסר מידע מספרי ספציפי. */
  placeholder?: string;
  source: string;
  sourceYear?: number;
  status: ContentStatus;
  /** הערת סטטוס גלויה, למשל "נתונים מתוך נוהל 2022". */
  statusNote?: string;
  /** מילות חיפוש נרדפות בעברית טבעית. */
  keywords: string[];
  relatedIds?: string[];
}

export interface CategoryMeta {
  id: CategoryId;
  title: string;
  subtitle: string;
  icon: IconName;
  /** שם הטון הצבעוני (מוגדר ב-tokens.css). */
  tone: Tone;
  /** התווית הקצרה במסנני "הזכויות שלי". */
  filterLabel: string;
}

export type Tone =
  | 'blue'
  | 'turquoise'
  | 'purple'
  | 'green'
  | 'pink'
  | 'lilac'
  | 'orange'
  | 'grey';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  /** הזכות המלאה שאליה מפנים. */
  rightId?: string;
  keywords: string[];
}

export interface QuickAction {
  id: string;
  label: string;
  emoji: string;
  tone: Tone;
  /** יעד הניווט: זכות מלאה או מסך קטגוריה. */
  rightId?: string;
  categoryId?: CategoryId;
}

export interface ContactCard {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  tone: Tone;
  /** ערוצי קשר עתידיים. כרגע ריקים בכוונה - לא ממציאים פרטים. */
  channels: ContactChannel[];
}

export interface ContactChannel {
  type: 'phone' | 'email' | 'whatsapp' | 'link';
  label: string;
  /** יתמלא בעתיד. ריק = "פרטי קשר יעודכנו כאן". */
  value?: string;
}
