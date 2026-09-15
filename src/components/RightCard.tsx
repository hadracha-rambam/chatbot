import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

import { Icon } from "@/components/Icon";
import { categoryLabel, type RightItem } from "@/data/rights";
import { toneFor } from "@/lib/tone";
import { cn } from "@/lib/utils";

export function RightCard({
  right,
  showCategory = true,
  className,
}: {
  right: RightItem;
  showCategory?: boolean;
  className?: string;
}) {
  const tone = toneFor(right.category);

  return (
    <Link
      to="/rights/$rightId"
      params={{ rightId: right.id }}
      className={cn(
        "card-base press press-active flex min-h-[76px] items-center gap-3 p-4 hover:shadow-lift",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-xl",
          tone.bg,
          tone.text,
        )}
      >
        <Icon name={right.icon} className="size-5" strokeWidth={1.9} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold leading-snug">
          {right.question}
        </span>
        <span className="mt-0.5 block truncate text-[13px] text-muted-foreground">
          {right.keyNumber
            ? `${right.keyNumber} · ${right.keyNumberLabel ?? ""}`
            : right.shortAnswer}
        </span>
        {showCategory && (
          <span
            className={cn(
              "mt-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium",
              tone.chip,
            )}
          >
            {categoryLabel[right.category]}
          </span>
        )}
      </span>

      <ChevronLeft
        className="size-5 shrink-0 text-muted-foreground"
        aria-hidden="true"
      />
    </Link>
  );
}
