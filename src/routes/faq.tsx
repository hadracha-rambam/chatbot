import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

import { faqs, getRight } from "@/data/rights";
import { toneFor } from "@/lib/tone";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "שאלות ותשובות | STUDENT iN" },
      {
        name: "description",
        content:
          "שאלות של סטודנטים ברמב\"ם בשפה יומיומית, עם קישור ישיר לזכות המתאימה: שעות, מחלה, מבחן, מילואים ואישור לימודים.",
      },
      { property: "og:title", content: "שאלות ותשובות | STUDENT iN" },
      {
        property: "og:description",
        content: "שואלים בשפה שלכם - ואנחנו מפנים לזכות הנכונה.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <div className="animate-rise space-y-5">
      <header className="space-y-1">
        <h1 className="text-[24px] font-bold leading-snug">
          שאלות שבטח עברו גם לכם בראש
        </h1>
        <p className="text-[14px] text-muted-foreground">
          בוחרים שאלה - ופותחים את הזכות שעונה עליה.
        </p>
      </header>

      <ul className="space-y-2">
        {faqs.map((item) => {
          const right = getRight(item.rightId);
          if (!right) return null;
          const tone = toneFor(right.category);
          return (
            <li key={item.q}>
              <Link
                to="/rights/$rightId"
                params={{ rightId: item.rightId }}
                className="card-base press press-active flex min-h-[68px] items-center gap-3 p-4 hover:shadow-lift"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold leading-snug">
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                      tone.chip,
                    )}
                  >
                    {right.question}
                  </span>
                </span>
                <ChevronLeft
                  className="size-5 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
