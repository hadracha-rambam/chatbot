import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, MessageCircle, Search, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";


import heroStudent from "@/assets/hero-student.png";

import { AboutInfo } from "@/components/AboutInfo";
import { BrandMark } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { RightCard } from "@/components/RightCard";
import {
  categories,
  quickActions,
  searchRights,
} from "@/data/rights";
import { toneFor } from "@/lib/tone";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STUDENT iN | מה שכדאי לדעת כסטודנט.ית ברמב\"ם" },
      {
        name: "description",
        content:
          "כל מה שחשוב לדעת כסטודנט.ית ברמב\"ם במקום אחד: שעות עבודה, שכר, חופשה, מחלה, מבחנים והטבות.",
      },
      { property: "og:title", content: "STUDENT iN | סטודנט.ית ברמב\"ם" },
      {
        property: "og:description",
        content:
          "שעות, שכר, חופשה, מחלה, מבחנים והטבות - בשפה ברורה ובלי לחפש בתוך נהלים.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

/** Soft tint per quick action, so the row feels colorful but calm. */
const quickTints = [
  "border-turquoise/25 bg-turquoise-soft",
  "border-rose/25 bg-rose-soft",
  "border-brand/25 bg-brand-soft",
  "border-purple/25 bg-purple-soft",
  "border-green/25 bg-green-soft",
  "border-orange/25 bg-orange-soft",
];

function Home() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const results = useMemo(() => searchRights(submitted), [submitted]);
  const resultsRef = useRef<HTMLElement>(null);

  const runSearch = () => {
    const q = query.trim();
    setSubmitted(q);
    if (!q) return;
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="space-y-8">
      <section className="animate-rise relative -mx-4 overflow-hidden rounded-b-[2.5rem] bg-gradient-to-b from-brand-soft via-turquoise-soft/60 to-background px-4 pb-8 pt-6 md:mx-0 md:rounded-[2.5rem] md:px-8 md:pb-10">
        {/* Soft branded background blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-brand/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-24 size-52 rounded-full bg-pink/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-1/3 size-40 rounded-full bg-purple/10 blur-3xl"
        />

        <div className="relative flex flex-col items-center text-center">
          <BrandMark className="h-12 md:h-14" />

          <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-card/85 px-3.5 py-1.5 text-[13px] font-semibold text-brand shadow-soft">
            ✨ ברוכים הבאים ל-STUDENT iN
          </span>

          <h1 className="font-display mt-5 max-w-[16ch] text-[34px] font-black leading-[1.08] tracking-tight text-foreground md:text-[48px]">
            כל מה שצריך לדעת
            <br />
            כסטודנט.ית ברמב"ם
          </h1>

          <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
            מהזכויות שלך ועד הדברים שחשוב להכיר - הכול במקום אחד.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              runSearch();
            }}
            role="search"
            className="mt-6 flex w-full max-w-md flex-col gap-2 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <label htmlFor="search" className="sr-only">
                חיפוש בזכויות ובשאלות
              </label>
              <input
                id="search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="חיפוש: מבחן, מחלה, חופשה, שכר..."
                className="card-base h-14 w-full rounded-3xl ps-12 pe-12 text-[15px] shadow-lift outline-none placeholder:text-muted-foreground focus-visible:border-brand/40"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setSubmitted("");
                  }}
                  aria-label="ניקוי חיפוש"
                  className="press absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-2xl text-muted-foreground hover:bg-secondary"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="press press-active flex h-14 items-center justify-center gap-2 rounded-3xl bg-brand px-6 text-[15px] font-bold text-primary-foreground shadow-lift hover:opacity-95"
            >
              <Search className="size-4" aria-hidden="true" />
              חיפוש
            </button>
          </form>

          <div className="mt-3 flex w-full max-w-md flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link
              to="/rights"
              className="press press-active card-base flex min-h-12 w-full items-center justify-center gap-1 rounded-2xl bg-card/85 px-6 text-[15px] font-bold text-brand hover:shadow-lift sm:w-auto"
            >
              מה מגיע לי?
              <ChevronLeft className="size-4" aria-hidden="true" />
            </Link>
            <Link
              to="/faq"
              className="press press-active card-base flex min-h-12 w-full items-center justify-center rounded-2xl bg-card/85 px-6 text-[15px] font-bold text-brand hover:shadow-lift sm:w-auto"
            >
              בואו נתחיל
            </Link>
          </div>

          {/* Integrated hero visual: character merges into branded shapes */}
          <div className="relative -mb-6 mt-4 w-full max-w-xl md:-mb-8 md:mt-6">
            {/* organic branded shapes behind the character */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-4 bottom-2 top-8 rounded-[46%_54%_40%_60%/56%_44%_56%_44%] bg-gradient-to-tr from-turquoise/20 via-brand/15 to-pink/20 blur-2xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 left-1/2 h-24 w-[76%] -translate-x-1/2 rounded-[50%] bg-brand/10 blur-2xl"
            />

            {/* delicate abstract accents (no text callouts) */}
            <span
              aria-hidden="true"
              className="animate-float-slow absolute right-6 top-10 size-2.5 rounded-full bg-turquoise/50"
            />
            <span
              aria-hidden="true"
              className="animate-float absolute left-8 top-20 size-3.5 rounded-full border border-pink/40"
            />
            <span
              aria-hidden="true"
              className="animate-float-slow absolute left-2 bottom-24 size-2 rounded-full bg-purple/40"
            />

            <img
              src={heroStudent}
              alt="סטודנט.ית עם טלפון ומחשב נייד בקמפוס רמב&quot;ם"
              width={1024}
              height={1024}
              className="hero-fade relative z-[5] mx-auto w-[88%] max-w-[400px] select-none"
            />
          </div>
        </div>
      </section>

      {submitted && (
        <section
          ref={resultsRef}
          aria-labelledby="results"
          className="animate-rise scroll-mt-20 space-y-3"
        >
          <div className="flex items-baseline justify-between px-1">
            <h2 id="results" className="text-[17px] font-bold">
              זה מה שמצאנו
            </h2>
            {results.length > 0 && (
              <span className="text-[13px] text-muted-foreground">
                {results.length} תוצאות
              </span>
            )}
          </div>

          {results.length > 0 ? (
            <div className="space-y-2">
              {results.map((r) => (
                <RightCard key={r.id} right={r} />
              ))}
            </div>
          ) : (
            <div className="card-base space-y-3 rounded-3xl p-6 text-center">
              <p className="text-[14px] leading-relaxed text-muted-foreground">
                לא מצאנו תוצאה מתאימה. אפשר לנסות מילה אחרת או לשאול את iN.
              </p>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("askin:open"))}
                className="press press-active inline-flex min-h-11 items-center gap-2 rounded-2xl bg-pink px-5 text-[14px] font-bold text-primary-foreground shadow-soft hover:opacity-95"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                שאלו את iN
              </button>
            </div>
          )}
        </section>
      )}




      {!submitted && (
        <>
          <section aria-labelledby="quick" className="space-y-3">
            <h2 id="quick" className="px-1 text-[15px] font-bold">
              מה באת לבדוק היום?
            </h2>
            <ul className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
              {quickActions.map((action, i) => {
                const tint = quickTints[i % quickTints.length];
                const classes = cn(
                  "press press-active card-base flex min-h-11 items-center whitespace-nowrap rounded-2xl px-4 py-3 text-[14px] font-semibold hover:shadow-lift",
                  tint,
                );
                return (
                  <li key={action.label} className="snap-start">
                    <Link
                      to="/rights/$rightId"
                      params={{ rightId: action.rightId }}
                      className={classes}
                    >
                      {action.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="study-confirm">
            <Link
              to="/rights/$rightId"
              params={{ rightId: "study-confirmation" }}
              className="press press-active card-base block rounded-3xl border-purple/20 bg-purple-soft p-5 hover:shadow-lift"
            >
              <span className="text-[13px] font-semibold text-purple">
                🎓 אישור לימודים
              </span>
              <h2
                id="study-confirm"
                className="mt-1.5 text-[18px] font-bold leading-snug"
              >
                מתחילה שנת לימודים חדשה?
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-foreground/80">
                כדאי לוודא שאישור הלימודים שלך מעודכן - זה מה ששומר על משרת
                הסטודנט.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-[14px] font-semibold text-purple">
                מה צריך לדעת?
                <ChevronLeft className="size-4" aria-hidden="true" />
              </span>
            </Link>
          </section>

          <section aria-labelledby="cats" className="space-y-3">
            <h2 id="cats" className="px-1 text-[15px] font-bold">
              במה נעזור?
            </h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {categories.map((cat) => {
                const tone = toneFor(cat.id);
                return (
                  <Link
                    key={cat.id}
                    to="/rights"
                    search={{ cat: cat.id }}
                    className={cn(
                      "press press-active card-base flex flex-col gap-2 rounded-3xl p-4 hover:shadow-lift",
                      tone.bg,
                      tone.border,
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-11 items-center justify-center rounded-2xl bg-card",
                        tone.text,
                      )}
                    >
                      <Icon name={cat.icon} className="size-5" strokeWidth={1.9} />
                    </span>
                    <span className="text-[14px] font-bold leading-snug">
                      {cat.title}
                    </span>
                    <span className="text-[12px] leading-snug text-foreground/60">
                      {cat.subtitle}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          <footer className="flex flex-col items-center gap-2 pt-2 md:hidden">
            <BrandMark className="h-6 opacity-70" />
            <AboutInfo />
          </footer>
        </>
      )}
    </div>
  );
}
