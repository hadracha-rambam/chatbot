import { Info } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AboutInfo() {
  return (
    <Dialog>
      <DialogTrigger className="press press-active inline-flex min-h-11 items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground">
        <Info className="size-4" aria-hidden="true" />
        על המידע באפליקציה
      </DialogTrigger>
      <DialogContent dir="rtl" className="max-w-[420px] text-right">
        <DialogHeader className="text-right">
          <DialogTitle className="text-right">על המידע באפליקציה</DialogTitle>
          <DialogDescription className="text-right text-[14px] leading-relaxed">
            המידע באפליקציה נועד להנגיש את עיקרי הזכויות והתנאים לסטודנטים
            המועסקים ברמב"ם. במקרה של סתירה, ההוראות המחייבות הן הקובעות.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
