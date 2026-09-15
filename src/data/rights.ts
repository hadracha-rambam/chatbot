export type CategoryId =
  | "work"
  | "leave"
  | "studies"
  | "benefits"
  | "family"
  | "ending";

export type RightStatus =
  | "current"
  | "civil_service"
  | "needs_verification"
  | "rambam_specific";

export interface RightItem {
  id: string;
  category: CategoryId;
  icon: string;
  question: string;
  shortAnswer: string;
  keyNumber?: string;
  keyNumberLabel?: string;
  chips?: string[];
  eligibility?: string[];
  steps?: string[];
  importantNote?: string;
  highlight?: string;
  secondary?: string;
  moreTitle?: string;
  more?: string[];
  rambamProcess?: string;
  placeholderNote?: string;
  source: string;
  sourceYear?: number;
  status: RightStatus;
  keywords: string[];
}

export interface CategoryMeta {
  id: CategoryId;
  title: string;
  subtitle: string;
  icon: string;
  tone: string;
}

export const categories: CategoryMeta[] = [
  {
    id: "work",
    title: "השכר והעבודה שלי",
    subtitle: "שעות, שכר ומה נכנס למכסה",
    icon: "Wallet",
    tone: "turquoise",
  },
  {
    id: "leave",
    title: "חופשה ומחלה",
    subtitle: "כשצריך לקחת רגע מהעבודה",
    icon: "Palmtree",
    tone: "green",
  },
  {
    id: "studies",
    title: "לימודים ומבחנים",
    subtitle: "כי קודם כל - אתם סטודנטים",
    icon: "GraduationCap",
    tone: "purple",
  },
  {
    id: "benefits",
    title: "הטבות וזכויות",
    subtitle: "פנסיה, קרן השתלמות, נסיעות ועוד",
    icon: "Gift",
    tone: "pink",
  },
  {
    id: "family",
    title: "הורות ומשפחה",
    subtitle: "זכויות בתקופות ובמצבים שונים",
    icon: "Heart",
    tone: "rose",
  },
  {
    id: "ending",
    title: "סיום ושינויים",
    subtitle: "סיום לימודים, מעבר וסיום העסקה",
    icon: "DoorOpen",
    tone: "orange",
  },
];

export const categoryLabel: Record<CategoryId, string> = {
  work: "עבודה ושכר",
  leave: "חופשה ומחלה",
  studies: "לימודים",
  benefits: "הטבות",
  family: "משפחה",
  ending: "סיום העסקה",
};

const SOURCE_2022 = "נציבות שירות המדינה - העסקת סטודנטים בשירות המדינה";
const SOURCE_2026 = "Rambam internal update";

export const rights: RightItem[] = [
  {
    id: "monthly-hours",
    category: "work",
    icon: "CalendarClock",
    question: "כמה שעות מותר לי לעבוד בחודש?",
    shortAnswer:
      "ככלל, משרת סטודנט מוגדרת בהיקף של עד 96 שעות בחודש. בהתאם לצורך ולהסכמה ניתן להגדיל את ההיקף, אבל בכל מקרה לא ניתן לעבור 120 שעות בחודש.",
    keyNumber: "120",
    keyNumberLabel: "מקסימום שעות בחודש",
    chips: ["96 שעות - היקף משרה נפוץ"],
    importantNote: "120 שעות הן תקרה חודשית ולא ניתן לחרוג ממנה.",
    rambamProcess: "פרטי התהליך ברמב\"ם יעודכנו כאן.",
    source: SOURCE_2026,
    status: "current",
    keywords: ["שעות", "מכסה", "חודש", "120", "96", "היקף משרה", "כמה שעות"],
  },
  {
    id: "daily-hours",
    category: "work",
    icon: "Clock",
    question: "כמה שעות אפשר לעבוד ביום?",
    shortAnswer: "ניתן לדווח ולקבל שכר עבור עד 8 שעות עבודה ביום.",
    keyNumber: "8",
    keyNumberLabel: "שעות עבודה ביום",
    importantNote: "עבודה מעבר ל-8 שעות ביום אינה מזכה בתשלום שעות נוספות.",
    rambamProcess: "פרטי התהליך ברמב\"ם יעודכנו כאן.",
    source: SOURCE_2026,
    status: "current",
    keywords: ["שעות ביום", "8 שעות", "יום עבודה", "דיווח שעות", "משמרת"],
  },
  {
    id: "hours-quota",
    category: "work",
    icon: "ListChecks",
    question: "מה נחשב בתוך מכסת השעות שלי?",
    shortAnswer:
      "מכסת השעות החודשית כוללת לא רק שעות עבודה בפועל, אלא גם היעדרויות מסוימות בתשלום.",
    chips: [
      "עבודה בפועל",
      "חופשה",
      "מחלה",
      "חג",
      "יום בחינה",
      "יום בחירה",
      "היעדרויות מאושרות נוספות",
    ],
    highlight: "ימי מילואים אינם נכללים במכסת שעות ההעסקה החודשית.",
    rambamProcess: "פרטי התהליך ברמב\"ם יעודכנו כאן.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["מכסה", "נחשב", "היעדרות", "חג", "מילואים", "שעות"],
  },
  {
    id: "salary",
    category: "work",
    icon: "Wallet",
    question: "איך נקבע השכר שלי?",
    shortAnswer:
      "השכר שלך מורכב משכר בסיס ומכמה תוספות שיכולות להשתנות בהתאם לוותק, לשירות ולתואר.",
    secondary:
      "אפשר לחשב את השכר המשולב בעזרת המחשבון - לפי התואר, הוותק כסטודנט ושנות השירות המוכרות.",
    more: [
      "שכר בסיס: 33.60 ₪ לשעה.",
      "ותק שירות חובה / שירות לאומי: 0.20 ₪ לשעה על כל שנה מוכרת, עד 3 שנים (עד 0.60 ₪ לשעה).",
      "ותק כסטודנט בשירות המדינה: עד 12 חודשים +0.80 ₪; מעל שנה ועד שנתיים +1.30 ₪; מעל שנתיים +1.80 ₪ לשעה.",
      "תואר שני: תוספת של 5 ₪ לשעה, בנוסף לשאר הרכיבים.",
    ],
    moreTitle: "פירוט רכיבי השכר",
    rambamProcess: "פרטי התהליך ברמב\"ם יעודכנו כאן.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: [
      "שכר",
      "תעריף",
      "שכר לשעה",
      "שכר בסיס",
      "תוספת",
      "ותק",
      "מחשבון",
      "כסף",
      "משכורת",
      "שעתי",
      "תואר",
      "תואר שני",
      "שירות חובה",
      "שירות לאומי",
    ],
  },
  {
    id: "employment-period",
    category: "work",
    icon: "CalendarRange",
    question: "כמה זמן אפשר לעבוד במשרת סטודנט?",
    shortAnswer:
      "תקופת ההעסקה הכוללת במשרת סטודנט בשירות המדינה מוגבלת לעד 5 שנים, בכפוף להמשך הזכאות כסטודנט.",
    keyNumber: "5",
    keyNumberLabel: "שנים לכל היותר",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["תקופה", "5 שנים", "ותק", "כמה זמן"],
  },
  {
    id: "extra-job",
    category: "work",
    icon: "Briefcase",
    question: "יש לי עוד עבודה - צריך לדווח?",
    shortAnswer:
      "כן. עבודה נוספת מעבר למשרת הסטודנט בשירות המדינה דורשת קבלת היתר לעבודה פרטית בהתאם לכללים.",
    highlight: "אין לבצע עבודה פרטית ללא קבלת היתר כנדרש.",
    rambamProcess: "הליך הגשת הבקשה ברמב\"ם יעודכן כאן.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["עוד עבודה", "עבודה נוספת", "היתר", "עבודה פרטית", "אישור"],
  },
  {
    id: "vacation",
    category: "leave",
    icon: "Palmtree",
    question: "כמה ימי חופשה מגיעים לי?",
    shortAnswer:
      "הזכאות לימי חופשה נקבעת לפי מספר ימי העבודה בשבוע ובהתאם להיקף ההעסקה.",
    keyNumber: "12",
    keyNumberLabel: "ימי חופשה בשנה במקום עבודה של 5 ימים בשבוע",
    secondary: "במקום שבו נהוג שבוע עבודה של 6 ימים - 14 ימים בשנה.",
    importantNote:
      "הזכאות וניצול החופשה מושפעים מהיקף ההעסקה וממכסת השעות החודשית.",
    moreTitle: "עוד חשוב לדעת",
    more: [
      "חופשה מנוצלת בימים מלאים בהתאם לנוהל.",
      "לא ניתן להוסיף יום חופשה בתשלום לאחר שכבר הושלמה מלוא מכסת השעות החודשית.",
      "קיימים כללים לצבירת ימי חופשה.",
    ],
    rambamProcess: "פרטי התהליך ברמב\"ם יעודכנו כאן.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["חופשה", "חופש", "ימי חופשה", "צבירה", "חופשה שנתית"],
  },
  {
    id: "sick-leave",
    category: "leave",
    icon: "Thermometer",
    question: "אני חולה - מה מגיע לי?",
    shortAnswer:
      "התשלום ניתן עבור ימים שבהם היית אמור.ה לעבוד, ועד למכסת ימי המחלה שעומדת לרשותך.",
    keyNumber: "עד 18",
    keyNumberLabel: "ימי מחלה בשנה, בהתאם לחלקיות ההעסקה",
    highlight: "התשלום הוא מהיום הראשון",
    secondary:
      "מכסת ימי המחלה עשויה לכלול בהתאם לכללים גם מחלת ילד, הורה או בן.בת זוג.",
    rambamProcess: "פרטי התהליך ברמב\"ם יעודכנו כאן.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["חולה", "מחלה", "ימי מחלה", "אישור מחלה", "יום ראשון"],
  },
  {
    id: "declaration-days",
    category: "leave",
    icon: "FileCheck",
    question: "אפשר לקחת יום מחלה בלי אישור רפואי?",
    shortAnswer:
      "סטודנט.ית זכאי.ת לשני ימי הצהרה בשנה מתוך מכסת ימי המחלה, בהתאם לכללים.",
    keyNumber: "2",
    keyNumberLabel: "ימי הצהרה בשנה",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["יום הצהרה", "הצהרה", "בלי אישור", "מחלה"],
  },
  {
    id: "holidays",
    category: "leave",
    icon: "PartyPopper",
    question: "מה קורה בחגים?",
    shortAnswer:
      "סטודנט.ית זכאי.ת לתשלום עבור ימי חג ומועד בהתאם לדת ולבחירה ובהתאם לכללים.",
    importantNote:
      "אם כבר הושלמה מלוא מכסת השעות החודשית, לא משולם תשלום נוסף מעבר למכסה.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["חג", "חגים", "מועד", "תשלום חג"],
  },
  {
    id: "choice-days",
    category: "leave",
    icon: "CalendarHeart",
    question: "מה זה יום בחירה?",
    shortAnswer:
      "בכפוף לתנאי הזכאות, סטודנט.ית זכאי.ת לשני ימי בחירה בשנה.",
    keyNumber: "2",
    keyNumberLabel: "ימי בחירה בשנה",
    secondary:
      "במהלך ששת חודשי העבודה הראשונים ניתן לנצל יום בחירה אחד לאחר השלמת שלושה חודשי עבודה רצופים, בהתאם לכללים.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["יום בחירה", "בחירה", "חופשה"],
  },
  {
    id: "reserve-duty",
    category: "leave",
    icon: "Shield",
    question: "יצאתי למילואים - מה קורה עם העבודה?",
    shortAnswer:
      "תקופת מילואים מזכה בתשלום בהתאם לכללים ובכפוף להצגת אישור רשמי.",
    highlight: "ימי מילואים אינם נכללים בתוך מכסת שעות העבודה החודשית.",
    rambamProcess: "פרטי התהליך ברמב\"ם יעודכנו כאן.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["מילואים", "צבא", "שירות מילואים", "אישור"],
  },
  {
    id: "exam-day",
    category: "studies",
    icon: "PenLine",
    question: "יש לי מבחן - מגיע לי יום היעדרות?",
    shortAnswer:
      "סטודנט.ית שהשלים.ה 12 חודשי עבודה זכאי.ת ליום היעדרות אחד בשנה לצורך השתתפות בבחינה במסגרת הלימודים.",
    keyNumber: "1",
    keyNumberLabel: "יום היעדרות בשנה לאחר 12 חודשי עבודה",
    secondary:
      "מי שעבד.ה לפחות 3 חודשים אך פחות משנה עשוי.ה להיות זכאי.ת לחלק יחסי מהיום.",
    steps: [
      "לתאם מראש עם הממונה.",
      "לבצע את התיאום לפחות שבועיים לפני מועד ההיעדרות.",
      "לדווח את ההיעדרות בהתאם לתהליך ברמב\"ם.",
    ],
    importantNote:
      "לא ניתן לעבוד בפועל ובמקביל לדווח על היעדרות לבחינה באותו היום.",
    more: [
      "יום בחינה שלא נוצל יכול להיצבר לשנה העוקבת כל עוד ממשיכים להיות מועסקים כסטודנטים, בהתאם לכללים.",
    ],
    moreTitle: "עוד חשוב לדעת",
    rambamProcess: "פרטי התהליך ברמב\"ם יעודכנו כאן.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["מבחן", "בחינה", "מבחנים", "יום מבחן", "היעדרות", "לימודים"],
  },
  {
    id: "study-confirmation",
    category: "studies",
    icon: "FileBadge",
    question: "צריך להגיש אישור לימודים?",
    shortAnswer:
      "כן. המשך העסקה במשרת סטודנט מותנה בהצגת אישור לימודים תקף.",
    highlight:
      "בלי אישור לימודים תקף, לא ניתן להמשיך את ההעסקה במשרת סטודנט.",
    rambamProcess: "איפה מגישים ברמב\"ם? פרטי התהליך יעודכנו כאן.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["אישור לימודים", "אישור", "שנת לימודים", "הרשמה", "תואר"],
  },
  {
    id: "who-is-student",
    category: "studies",
    icon: "GraduationCap",
    question: "מי יכול להיות מועסק במשרת סטודנט?",
    shortAnswer:
      "הזכאות להעסקה במשרת סטודנט תלויה בסוג המסגרת הלימודית שבה לומדים.",
    eligibility: [
      "לימודים לתואר ראשון",
      "תואר ראשון נוסף",
      "תואר שני",
      "תואר שני נוסף",
      "תואר שלישי",
      "מוסד מוכר להשכלה גבוהה",
      "הנדסאים וטכנאים במסגרות המוכרות",
      "מכינה קדם-אקדמית",
      "שנת השלמה במסלולים המוכרים בנוהל",
    ],
    importantNote:
      "לימודי תעודה בלבד אינם מזכים בהעסקה במשרת סטודנט לפי הנוהל.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["מי זכאי", "תואר", "סטודנט", "מכינה", "הנדסאי", "לימודים"],
  },
  {
    id: "pension",
    category: "benefits",
    icon: "PiggyBank",
    question: "יש לי פנסיה גם כסטודנט.ית?",
    shortAnswer: "כן. בהתאם לנוהל קיימות הפרשות לביטוח פנסיוני.",
    moreTitle: "לפרטים נוספים",
    more: [
      "מעסיק: 7.5% תגמולים",
      "מעסיק: 6% פיצויים",
      "עובד: 7% מהשכר המבוטח",
    ],
    importantNote:
      "הנתונים העדכניים מתפרסמים מול משאבי אנוש.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "needs_verification",
    keywords: ["פנסיה", "ביטוח פנסיוני", "הפרשות", "תגמולים", "פיצויים"],
  },
  {
    id: "study-fund",
    category: "benefits",
    icon: "Landmark",
    question: "יש לי קרן השתלמות?",
    shortAnswer: "בהתאם לנוהל, קיימת זכאות לקרן השתלמות.",
    chips: ["מעסיק: 7.5%", "עובד: 2.5%"],
    secondary:
      "בקליטה נדרש להסדיר את הבחירה בהתאם לטפסים הרלוונטיים.",
    importantNote: "לפרטים העדכניים כדאי לוודא מול משאבי אנוש.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "needs_verification",
    keywords: ["קרן השתלמות", "חיסכון", "הפרשות"],
  },
  {
    id: "travel",
    category: "benefits",
    icon: "Bus",
    question: "מגיע לי החזר נסיעות?",
    shortAnswer:
      "כן. קיימת זכאות להשתתפות בהוצאות הנסיעה מהבית לעבודה ובחזרה עבור ימים שבהם עבדת בפועל, בהתאם לכללים ולתקרה הרלוונטית.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["נסיעות", "החזר נסיעות", "אוטובוס", "רכבת", "תחבורה"],
  },
  {
    id: "recuperation",
    category: "benefits",
    icon: "Sun",
    question: "אני זכאי.ת לדמי הבראה?",
    shortAnswer:
      "בהתאם לנוהל, סטודנט.ית זכאי.ת לקצובת הבראה המחושבת בהתאם להיקף העבודה.",
    placeholderNote: "הסכום העדכני יעודכן כאן.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["הבראה", "דמי הבראה", "קצובה"],
  },
  {
    id: "clothing",
    category: "benefits",
    icon: "Shirt",
    question: "יש לסטודנטים קצובת ביגוד?",
    shortAnswer:
      "בהתאם לנוהל, קיימת זכאות לקצובת ביגוד בהתאם להיקף העבודה ולכללים הרלוונטיים.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["ביגוד", "קצובת ביגוד", "בגדים"],
  },
  {
    id: "holiday-gift",
    category: "benefits",
    icon: "Gift",
    question: "מגיע לי שי לחג?",
    shortAnswer:
      "סטודנט.ית המועסק.ת מעל 4 חודשים רצופים זכאי.ת לשי לחג בהתאם לנוהל.",
    keyNumber: "4+",
    keyNumberLabel: "חודשי עבודה רצופים",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["שי לחג", "מתנה", "חג", "שי"],
  },
  {
    id: "training",
    category: "benefits",
    icon: "BookOpen",
    question: "מותר לי להשתתף בקורסים והדרכות?",
    shortAnswer:
      "ניתן להשתתף בהכשרות מוסדיות בהתאם לתפקיד, לצורך המקצועי, לאישור ולתקציב.",
    importantNote:
      "שעות השתתפות מאושרות בהכשרה נחשבות לשעות עבודה מתוך המכסה החודשית.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["הדרכה", "קורס", "הכשרה", "לימודים"],
  },
  {
    id: "team-days",
    category: "benefits",
    icon: "Users",
    question: "סטודנטים יכולים להשתתף בימי גיבוש?",
    shortAnswer:
      "כן. בהתאם לנוהל סטודנטים זכאים להשתתף בימי גיבוש ובסיורים לימודיים בהתאם לכללים.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["גיבוש", "יום גיבוש", "סיור", "רווחה"],
  },
  {
    id: "sports",
    category: "benefits",
    icon: "Dumbbell",
    question: "ומה לגבי פעילות ספורט?",
    shortAnswer:
      "בהתאם לנוהל קיימת אפשרות להשתתף בפעילות ספורט עד שעה וחצי בשבוע, בכפוף לתנאים.",
    importantNote: "כדאי לוודא שהזכאות עדיין בתוקף מול משאבי אנוש.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "needs_verification",
    keywords: ["ספורט", "חדר כושר", "פעילות"],
  },
  {
    id: "parental-rights",
    category: "family",
    icon: "Baby",
    question: "אילו זכויות יש לי כהורה?",
    shortAnswer:
      "לבדיקת הזכאות המלאה יש לפתוח את הזכות הרלוונטית.",
    chips: [
      "תקופת לידה והורות",
      "שעת הורות",
      "מחלת ילד",
      "הורה לילד עם מוגבלות",
      "תוספת מעונות",
      "קייטנות",
    ],
    rambamProcess: "פרטי התהליך ברמב\"ם יעודכנו כאן.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["הורות", "הורה", "ילד", "לידה", "מעונות", "קייטנה", "משפחה"],
  },
  {
    id: "parenting-hour",
    category: "family",
    icon: "Clock4",
    question: "מהי שעת הורות?",
    shortAnswer:
      "בהתאם לתנאים, הורה לילד עד גיל שנה המועסק לפחות 6 שעות רצופות ביום עשוי להיות זכאי לשעת הורות.",
    secondary:
      "אושרו לך 6 שעות עבודה ביום? בהתאם לתנאים, ניתן לעבוד 5 שעות ולקבל דיווח של 6 שעות.",
    importantNote: "יש לבדוק זכאות פרטנית.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["שעת הורות", "הורות", "תינוק", "שעה"],
  },
  {
    id: "pregnancy",
    category: "family",
    icon: "Stethoscope",
    question: "יש זכאות להיעדר לבדיקות היריון?",
    shortAnswer:
      "כן. בהתאם לתנאים, קיימת זכאות להיעדר לצורך בדיקות רפואיות הקשורות בהיריון ללא ניכוי ממכסת החופשה או המחלה.",
    importantNote: "בדיקת התנאים מול משאבי אנוש מומלצת.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["היריון", "הריון", "בדיקות", "רופא"],
  },
  {
    id: "fertility",
    category: "family",
    icon: "HeartPulse",
    question: "מה לגבי טיפולי פוריות?",
    shortAnswer:
      "קיימות זכויות היעדרות בגין טיפולי פוריות בכפוף לאישור רפואי ולתנאים הקבועים בנוהל.",
    importantNote: "מומלץ לבדוק את הזכאות הפרטנית מול משאבי אנוש.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["פוריות", "טיפולי פוריות", "היעדרות"],
  },
  {
    id: "finished-degree",
    category: "ending",
    icon: "DoorOpen",
    question: "סיימתי את התואר - מה קורה עכשיו?",
    shortAnswer:
      "סיום חובות הלימודים משפיע על הזכאות להמשיך להיות מועסק.ת במשרת סטודנט.",
    highlight:
      "במקרים מסוימים, סיום העסקה עקב סיום הלימודים עשוי לזכות בפיצויי פיטורים, בכפוף לתנאים.",
    secondary:
      "אם השלמת לפחות שנת עבודה אחת, יש לבדוק את זכאותך לפיצויי פיטורים.",
    rambamProcess: "פרטי התהליך ברמב\"ם יעודכנו כאן.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["סיום תואר", "סיימתי", "תואר", "פיצויים", "סיום העסקה"],
  },
  {
    id: "five-years",
    category: "ending",
    icon: "Hourglass",
    question: "הגעתי ל-5 שנות העסקה - מה עכשיו?",
    shortAnswer:
      "השלמת חמש שנות העסקה במשרת סטודנט היא אחת העילות לסיום ההעסקה במעמד זה.",
    keyNumber: "5",
    keyNumberLabel: "שנות העסקה מקסימום",
    highlight:
      "בהתאם לנוהל, סיום העסקה בשל השלמת 5 שנים עשוי לזכות בפיצויי פיטורים בכפוף לתנאים.",
    source: SOURCE_2022,
    sourceYear: 2022,
    status: "civil_service",
    keywords: ["5 שנים", "סיום העסקה", "פיצויים", "ותק"],
  },
];

export const notIncluded = [
  {
    title: "גמול השתלמות",
    text: "במשרת סטודנט אין זכאות לגמול השתלמות.",
  },
  {
    title: "מימון לימודים אקדמיים",
    text: "אין זכאות להשתתפות ברכישת השכלה אקדמית לפי הנוהל.",
  },
  {
    title: "כוננות",
    text: "ככלל, סטודנט אינו זכאי לתשלום עבור כוננות או קריאת פתע.",
  },
  {
    title: "חל\"ת",
    text: "במשרת סטודנט אין זכאות לחל\"ת.",
  },
];

/** Natural-language entry points. Answers live only on the right pages. */
export const faqs: { q: string; rightId: string }[] = [
  {
    q: "כמה שעות מותר לעבוד בחודש?",
    rightId: "monthly-hours",
  },
  {
    q: "אפשר לעבור 120 שעות?",
    rightId: "monthly-hours",
  },
  {
    q: "עבדתי יותר מ-8 שעות היום - מה קורה?",
    rightId: "daily-hours",
  },
  {
    q: "יש לי מבחן, מגיע לי יום?",
    rightId: "exam-day",
  },
  {
    q: "כמה ימי מחלה יש לי?",
    rightId: "sick-leave",
  },
  {
    q: "משלמים מחלה מהיום הראשון?",
    rightId: "sick-leave",
  },
  {
    q: "מה זה יום הצהרה?",
    rightId: "declaration-days",
  },
  {
    q: "מגיע לי שי לחג?",
    rightId: "holiday-gift",
  },
  {
    q: "יש לי עוד עבודה, צריך אישור?",
    rightId: "extra-job",
  },
  {
    q: "יש לי מילואים, זה יורד מהמכסה?",
    rightId: "reserve-duty",
  },
  {
    q: "סיימתי תואר, מה קורה עם המשרה?",
    rightId: "finished-degree",
  },
  {
    q: "צריך להגיש אישור לימודים כל שנה?",
    rightId: "study-confirmation",
  },
];

/** Shortcuts only - each one opens an existing canonical right page. */
export const quickActions = [
  { label: "יש לי מבחן 🎓", rightId: "exam-day" },
  { label: "אני חולה 🤒", rightId: "sick-leave" },
  { label: "כמה שעות מותר לי לעבוד? 🕐", rightId: "monthly-hours" },
  { label: "יש לי מילואים 🇮🇱", rightId: "reserve-duty" },
];

export const getRight = (id: string) => rights.find((r) => r.id === id);

export function searchRights(query: string): RightItem[] {
  const q = query.trim();
  if (!q) return [];
  return rights.filter((r) => {
    const haystack = [
      r.question,
      r.shortAnswer,
      r.secondary ?? "",
      ...(r.keywords ?? []),
      ...(r.chips ?? []),
      categoryLabel[r.category],
    ].join(" ");
    return haystack.includes(q);
  });
}
