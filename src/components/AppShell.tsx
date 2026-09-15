import { Link } from "@tanstack/react-router";
import { Home, ListChecks, MessageCircleQuestion, Phone } from "lucide-react";

import logoAsset from "@/assets/student-in-logo.png.asset.json";
import { AboutInfo } from "@/components/AboutInfo";
import { AskIn } from "@/components/AskIn";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "בית", icon: Home },
  { to: "/rights", label: "הזכויות שלי", icon: ListChecks },
  { to: "/faq", label: "שאלות", icon: MessageCircleQuestion },
  { to: "/contact", label: "למי פונים?", icon: Phone },
] as const;

function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="STUDENT iN"
      width={1920}
      height={632}
      className={cn("h-7 w-auto select-none", className)}
    />
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop / tablet navigation */}
      <header className="sticky top-0 z-30 hidden border-b border-border bg-card/85 backdrop-blur md:block">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <BrandMark className="text-lg" />
            <nav aria-label="ניווט ראשי" className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="press flex min-h-11 items-center gap-2 rounded-xl px-3 text-[14px] font-medium text-muted-foreground hover:bg-secondary hover:text-foreground data-[status=active]:bg-brand-soft data-[status=active]:text-brand"
                >
                  <item.icon className="size-4" aria-hidden="true" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <AboutInfo />
        </div>
      </header>

      <main className="mx-auto w-full max-w-[560px] px-4 pb-28 pt-4 md:max-w-3xl md:px-6 md:pb-16 md:pt-8">
        {children}
      </main>

      {/* Mobile bottom navigation */}
      <nav
        aria-label="ניווט ראשי"
        className="fixed bottom-0 z-40 w-full border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        <ul className="mx-auto flex max-w-[560px] items-stretch justify-between px-2">
          {navItems.map((item) => (
            <li key={item.to} className="flex-1">
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="press press-active flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-xl py-2 text-[11px] font-medium text-muted-foreground data-[status=active]:text-brand"
              >
                <item.icon className="size-5" aria-hidden="true" strokeWidth={1.9} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <AskIn />
    </div>
  );
}

export { BrandMark };
