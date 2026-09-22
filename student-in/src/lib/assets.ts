/**
 * קבצים מתוך public/ אינם עוברים עיבוד של Vite כשמפנים אליהם מתוך קוד,
 * ולכן צריך להרכיב את הנתיב מול BASE_URL. אחרת הלוגו נשבר כשהאתר
 * מתפרסם תחת /chatbot/ במקום בשורש.
 */
export const LOGO_SRC = `${import.meta.env.BASE_URL}rambam-logo.webp`;

export const LOGO_ALT =
  'מערך למידה ופיתוח ארגוני, רמב״ם - הקריה הרפואית לבריאות האדם';
