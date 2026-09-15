import { createFileRoute } from "@tanstack/react-router";
import { Clock, Users } from "lucide-react";

import { Icon } from "@/components/Icon";
import { tones } from "@/lib/tone";
import { cn } from "@/lib/utils";

const contacts = [
  { title: "משאבי אנוש - סטודנטים", icon: "Users", tone: "brand" },
  { title: "שכר", icon: "Wallet", tone: "turquoise" },
  { title: "נוכחות", icon: "Clock", tone: "green" },
  { title: "רווחה", icon: "HeartHandshake", tone: "pink" },
  { title: "קרן השתלמות ופנסיה", icon: "PiggyBank", tone: "purple" },
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "למי פונים? | STUDENT iN" },
      {
        name: "description",
        content:
          "מרכז הפניות לסטודנטים ברמב\"ם: משאבי אנוש, שכר, נוכחות, רווחה וקרן השתלמות. פרטי הקשר יעודכנו כאן.",
      },
      { property: "og:title", content: "למי פונים? | STUDENT iN" },
      {
        property: "og:description",
        content: "כל הגורמים הרלוונטיים במקום אחד.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="animate-rise space-y-5">
      <header className="space-y-1">
        <h1 className="text-[24px] font-bold">למי פונים?</h1>
        <p className="text-[14px] text-muted-foreground">
          צריכים עזרה? אלה הגורמים שיכולים לעזור. פרטי הקשר יתעדכנו כאן.
        </p>
      </header>

      <div className="grid gap-2 md:grid-cols-2">
        {contacts.map((c) => {
          const tone = tones[c.tone] ?? tones["brand"]!;
          return (
            <div key={c.title} className="card-base flex items-center gap-3 p-4">
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-xl",
                  tone.bg,
                  tone.text,
                )}
              >
                <Icon name={c.icon} className="size-5" strokeWidth={1.9} />
              </span>
              <div className="min-w-0">
                <h2 className="text-[15px] font-semibold">{c.title}</h2>
                <p className="mt-0.5 text-[13px] text-muted-foreground">
                  פרטי קשר יעודכנו כאן
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card-base flex items-start gap-3 border-brand/15 bg-brand-soft p-4">
        <Users className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
        <p className="text-[14px] leading-relaxed">
          במקרה של ספק לגבי זכאות אישית, מומלץ לפנות למשאבי אנוש.
        </p>
      </div>

      <p className="flex items-center gap-2 px-1 text-[12px] text-muted-foreground">
        <Clock className="size-4" aria-hidden="true" />
        במקרה של סתירה, ההוראות המחייבות הן הקובעות.
      </p>
    </div>
  );
}
