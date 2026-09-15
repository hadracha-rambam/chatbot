import { Link } from "@tanstack/react-router";
import { AlertTriangle, ChevronRight, Info, Sparkles } from "lucide-react";

import { Icon } from "@/components/Icon";
import {
  SalaryCalculator,
  SalaryComponents,
} from "@/components/SalaryCalculator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { categoryLabel, type RightItem } from "@/data/rights";
import { toneFor } from "@/lib/tone";
import { cn } from "@/lib/utils";


export function RightDetail({ right }: { right: RightItem }) {
  const tone = toneFor(right.category);

  return (
    <article className="animate-rise space-y-4">
      <Link
        to="/rights"
        className="press press-active inline-flex min-h-11 items-center gap-1 text-[14px] font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronRight className="size-4" aria-hidden="true" />
        חזרה לזכויות
      </Link>

      <header className="card-base p-5">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-2xl",
              tone.bg,
              tone.text,
            )}
          >
            <Icon name={right.icon} className="size-6" strokeWidth={1.9} />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                  tone.chip,
                )}
              >
                {categoryLabel[right.category]}
              </span>
            </div>
            <h1 className="mt-2 text-[20px] font-bold leading-snug">
              {right.question}
            </h1>
          </div>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-foreground">
          {right.shortAnswer}
        </p>
      </header>

      {right.id === "salary" && (
        <>
          <SalaryComponents />
          <SalaryCalculator />
        </>
      )}

      {right.keyNumber && (
        <div
          className={cn(
            "card-base flex items-center gap-4 p-5",
            tone.border,
            tone.bg,
          )}
        >
          <span
            className={cn(
              "text-[44px] font-bold leading-none tabular-nums",
              tone.text,
            )}
          >
            {right.keyNumber}
          </span>
          <span className="text-[14px] font-medium leading-snug text-foreground/80">
            {right.keyNumberLabel}
          </span>
        </div>
      )}

      {right.highlight && (
        <div className="card-base flex items-start gap-3 border-orange/20 bg-orange-soft p-4">
          <Sparkles className="mt-0.5 size-5 shrink-0 text-orange" aria-hidden="true" />
          <p className="text-[15px] font-semibold leading-relaxed">
            {right.highlight}
          </p>
        </div>
      )}

      {right.chips && right.chips.length > 0 && (
        <div className="card-base p-5">
          <h2 className="text-[14px] font-semibold text-muted-foreground">
            מה כלול
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {right.chips.map((chip) => (
              <li
                key={chip}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[13px] font-medium",
                  tone.chip,
                )}
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {right.eligibility && (
        <div className="card-base p-5">
          <h2 className="text-[15px] font-bold">מי זכאי.ת?</h2>
          <ul className="mt-3 space-y-2">
            {right.eligibility.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[14px]">
                <Icon
                  name="Check"
                  className={cn("mt-0.5 size-4 shrink-0", tone.text)}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {right.steps && (
        <div className="card-base p-5">
          <h2 className="text-[15px] font-bold">מה צריך לעשות?</h2>
          <ol className="mt-3 space-y-3">
            {right.steps.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-[14px]">
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold tabular-nums",
                    tone.chip,
                  )}
                >
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      {right.secondary && (
        <p className="px-1 text-[14px] leading-relaxed text-muted-foreground">
          {right.secondary}
        </p>
      )}

      {right.importantNote && (
        <div className="card-base flex items-start gap-3 border-brand/15 bg-brand-soft p-4">
          <Info className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
          <div>
            <p className="text-[13px] font-semibold text-brand">חשוב לדעת</p>
            <p className="mt-0.5 text-[14px] leading-relaxed">
              {right.importantNote}
            </p>
          </div>
        </div>
      )}

      {right.more && right.more.length > 0 && (
        <Accordion type="single" collapsible className="card-base px-5">
          <AccordionItem value="more" className="border-none">
            <AccordionTrigger className="text-right text-[15px] font-semibold hover:no-underline">
              {right.moreTitle ?? "לפרטים נוספים"}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 pb-2">
                {right.more.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[14px] leading-relaxed text-foreground/85"
                  >
                    <span className={cn("mt-2 size-1.5 shrink-0 rounded-full", tone.text, "bg-current")} />
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <div className="card-base p-5">
        <h2 className="text-[15px] font-bold">איך עושים את זה ברמב"ם?</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
          {right.rambamProcess ??
            "אנחנו עדיין מעדכנים כאן את התהליך המדויק. בינתיים מומלץ לפנות למשאבי אנוש."}
        </p>
        {right.placeholderNote && (
          <p className="mt-3 flex items-start gap-2 rounded-xl bg-secondary p-3 text-[13px] text-secondary-foreground">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {right.placeholderNote}
          </p>
        )}
      </div>

      <footer className="px-1 pb-2 text-[12px] text-muted-foreground">
        במקרה של סתירה, ההוראות המחייבות הן הקובעות.
      </footer>

    </article>
  );
}
