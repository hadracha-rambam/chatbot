/**
 * Single source of truth for student salary structure and calculation.
 * Used by the salary card, the salary calculator and the "שאלו את iN" knowledge.
 * No duplicated salary logic anywhere else.
 */

export const BASE_HOURLY = 33.6;

export type DegreeLevel = "bachelor" | "master";
export type StudentSeniority = "upTo12" | "12to24" | "over24";
export type ServiceYears = 0 | 1 | 2 | 3;

export const MASTER_ADDITION = 5;
export const SERVICE_PER_YEAR = 0.2;
export const SERVICE_MAX_YEARS = 3;
export const SERVICE_MAX_ADDITION = SERVICE_PER_YEAR * SERVICE_MAX_YEARS; // 0.60

export const studentSeniorityAddition: Record<StudentSeniority, number> = {
  upTo12: 0.8,
  "12to24": 1.3,
  over24: 1.8,
};

export const studentSeniorityLabel: Record<StudentSeniority, string> = {
  upTo12: "עד 12 חודשים",
  "12to24": "מעל שנה ועד שנתיים",
  over24: "מעל שנתיים",
};

export const degreeLabel: Record<DegreeLevel, string> = {
  bachelor: "תואר ראשון",
  master: "תואר שני",
};

export interface SalaryInput {
  degree: DegreeLevel;
  seniority: StudentSeniority;
  serviceYears: ServiceYears;
}

export interface SalaryBreakdown {
  base: number;
  studentSeniority: number;
  serviceSeniority: number;
  masters: number;
  total: number;
}

export function calculateSalary({
  degree,
  seniority,
  serviceYears,
}: SalaryInput): SalaryBreakdown {
  const studentSeniority = studentSeniorityAddition[seniority];
  const serviceSeniority = Math.min(
    serviceYears * SERVICE_PER_YEAR,
    SERVICE_MAX_ADDITION,
  );
  const masters = degree === "master" ? MASTER_ADDITION : 0;
  const total = BASE_HOURLY + studentSeniority + serviceSeniority + masters;
  return {
    base: BASE_HOURLY,
    studentSeniority,
    serviceSeniority,
    masters,
    total: Math.round(total * 100) / 100,
  };
}

export const money = (value: number) => value.toFixed(2);

/** Visual components shown on the salary card. */
export const salaryComponents = [
  { amount: "33.60 ₪", label: "שכר בסיס לשעה" },
  { amount: "עד 0.60 ₪+", label: 'ותק שירות חובה / לאומי' },
  { amount: "עד 1.80 ₪+", label: "ותק כסטודנט בשירות המדינה" },
  { amount: "5 ₪+", label: "תוספת לתואר שני" },
] as const;

export const SALARY_DISCLAIMER =
  "החישוב מציג את רכיבי השכר בהתאם לנתונים שהזנת. השכר בפועל עשוי לכלול התאמות או השלמות נוספות בהתאם להוראות השכר.";

/** Plain-text salary structure for the assistant's knowledge context. */
export const salaryKnowledge = [
  "מבנה השכר לסטודנטים מורכב מרכיבים:",
  "שכר בסיס לשעה: 33.60 ₪.",
  "ותק שירות חובה / שירות לאומי: 0.20 ₪ לשעה על כל שנה מוכרת, עד 3 שנים - כלומר עד 0.60 ₪ לשעה.",
  "ותק כסטודנט בשירות המדינה: עד 12 חודשים +0.80 ₪ לשעה; מעל שנה ועד שנתיים +1.30 ₪ לשעה; מעל שנתיים +1.80 ₪ לשעה.",
  "תואר שני: תוספת של 5 ₪ לשעה, בנוסף לשאר הרכיבים.",
  "אין לחשב סכומים בעצמך - יש להפנות את הסטודנט למחשבון השכר באפליקציה (\"לחשב את השכר שלי\").",
].join("\n");
