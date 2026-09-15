import { Calculator, RotateCcw } from "lucide-react";
import { useState } from "react";

import {
  calculateSalary,
  degreeLabel,
  money,
  salaryComponents,
  SALARY_DISCLAIMER,
  studentSeniorityLabel,
  type DegreeLevel,
  type ServiceYears,
  type StudentSeniority,
} from "@/lib/salary";
import { cn } from "@/lib/utils";

const componentTints = [
  "border-turquoise/25 bg-turquoise-soft text-turquoise",
  "border-brand/25 bg-brand-soft text-brand",
  "border-purple/25 bg-purple-soft text-purple",
  "border-pink/25 bg-pink-soft text-pink",
];

const serviceOptions: { value: ServiceYears; label: string }[] = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3 ומעלה" },
];

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "press press-active min-h-12 rounded-2xl border px-4 text-[14px] font-semibold transition",
        selected
          ? "border-brand bg-brand text-primary-foreground shadow-lift"
          : "border-border bg-card text-foreground hover:bg-secondary",
      )}
    >
      {children}
    </button>
  );
}

export function SalaryComponents() {
  return (
    <div className="card-base p-5">
      <h2 className="text-[15px] font-bold">רכיבי השכר</h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {salaryComponents.map((c, i) => (
          <div
            key={c.label}
            className={cn(
              "flex flex-col gap-1 rounded-2xl border p-4",
              componentTints[i % componentTints.length],
            )}
          >
            <span className="text-[20px] font-black leading-none tabular-nums">
              {c.amount}
            </span>
            <span className="text-[12px] font-medium leading-snug text-foreground/70">
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SalaryCalculator() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [degree, setDegree] = useState<DegreeLevel | null>(null);
  const [seniority, setSeniority] = useState<StudentSeniority | null>(null);
  const [serviceYears, setServiceYears] = useState<ServiceYears | null>(null);

  const reset = () => {
    setStep(0);
    setDegree(null);
    setSeniority(null);
    setServiceYears(null);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="press press-active card-base flex w-full min-h-14 items-center justify-center gap-2 rounded-3xl border-brand/25 bg-brand px-6 text-[15px] font-bold text-primary-foreground shadow-lift hover:opacity-95"
      >
        <Calculator className="size-5" aria-hidden="true" />
        כמה השכר שלי?
      </button>
    );
  }

  const result =
    degree && seniority && serviceYears !== null
      ? calculateSalary({ degree, seniority, serviceYears })
      : null;

  return (
    <section className="card-base space-y-4 p-5">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-[15px] font-bold">
          <Calculator className="size-4 text-brand" aria-hidden="true" />
          מחשבון השכר
        </h2>
        <button
          type="button"
          onClick={reset}
          className="press inline-flex items-center gap-1 rounded-full px-2 py-1 text-[13px] font-medium text-muted-foreground hover:bg-secondary"
        >
          <RotateCcw className="size-3.5" aria-hidden="true" />
          מהתחלה
        </button>
      </div>

      {!result && (
        <p className="text-[12px] font-medium text-muted-foreground">
          שלב {Math.min(step + 1, 3)} מתוך 3
        </p>
      )}

      {result ? (
        <div className="space-y-4">
          <div className="rounded-3xl bg-brand-soft p-5 text-center">
            <p className="text-[13px] font-semibold text-brand">
              השכר המשולב המחושב שלך
            </p>
            <p className="mt-1 text-[44px] font-black leading-none tabular-nums text-brand">
              {money(result.total)} ₪
            </p>
            <p className="mt-1 text-[13px] font-medium text-foreground/70">
              לשעה
            </p>
          </div>

          <ul className="space-y-2 text-[14px]">
            {[
              { label: "שכר בסיס", value: money(result.base) },
              { label: "ותק סטודנט", value: `+${money(result.studentSeniority)}` },
              { label: "ותק שירות", value: `+${money(result.serviceSeniority)}` },
              { label: "תואר שני", value: `+${money(result.masters)}` },
            ].map((row) => (
              <li
                key={row.label}
                className="flex items-center justify-between rounded-xl bg-secondary/60 px-3 py-2"
              >
                <span className="text-foreground/80">{row.label}</span>
                <span className="font-semibold tabular-nums">{row.value} ₪</span>
              </li>
            ))}
          </ul>

          <p className="rounded-2xl bg-secondary p-3 text-[12px] leading-relaxed text-secondary-foreground">
            {SALARY_DISCLAIMER}
          </p>
        </div>
      ) : step === 0 ? (
        <div className="space-y-3">
          <p className="text-[15px] font-semibold">מה אתם לומדים?</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {(["bachelor", "master"] as DegreeLevel[]).map((d) => (
              <OptionButton
                key={d}
                selected={degree === d}
                onClick={() => {
                  setDegree(d);
                  setStep(1);
                }}
              >
                {degreeLabel[d]}
              </OptionButton>
            ))}
          </div>
        </div>
      ) : step === 1 ? (
        <div className="space-y-3">
          <p className="text-[15px] font-semibold">
            כמה זמן אתם מועסקים כסטודנטים בשירות המדינה?
          </p>
          <div className="grid gap-2">
            {(["upTo12", "12to24", "over24"] as StudentSeniority[]).map((s) => (
              <OptionButton
                key={s}
                selected={seniority === s}
                onClick={() => {
                  setSeniority(s);
                  setStep(2);
                }}
              >
                {studentSeniorityLabel[s]}
              </OptionButton>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-[15px] font-semibold">
            כמה שנות שירות חובה / שירות לאומי מוכרות יש לכם?
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {serviceOptions.map((o) => (
              <OptionButton
                key={o.value}
                selected={serviceYears === o.value}
                onClick={() => setServiceYears(o.value)}
              >
                {o.label}
              </OptionButton>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
