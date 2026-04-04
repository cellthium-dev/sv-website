import { Link } from "@tanstack/react-router";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-border/60 border-b bg-background/95 backdrop-blur-sm transition-all">
      <div className="section-container">
        <div className="flex h-16 items-center justify-between md:h-18">
          {/* Logo */}
          <Link className="group flex items-center gap-3" to="/">
            <img
              alt="SV Bauten Logo"
              className="size-9 shrink-0"
              height={36}
              src="/favicon.svg"
              width={36}
            />
            <div className="flex flex-col leading-none">
              <span
                className="font-bold text-base text-foreground tracking-tight transition-colors group-hover:text-primary"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {siteConfig.name}
              </span>
              <span className="hidden text-muted-foreground text-xs sm:block">
                {siteConfig.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => (
              <Link
                className="rounded-md px-4 py-2 font-medium text-muted-foreground text-sm transition-all hover:bg-muted hover:text-foreground"
                key={item.href}
                to={item.href as never}
              >
                {item.label}
              </Link>
            ))}
            <div className="ml-2">
              <Button asChild className="h-9 px-5 font-semibold" size="sm">
                <Link to="/kontakt">Kontakt</Link>
              </Button>
            </div>
          </nav>

          {/* Mobile toggle */}
          <button
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
            className="flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
          >
            {isMenuOpen ? (
              <XIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </button>
        </div>

        {/* Mobile nav */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 md:hidden",
            isMenuOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <Separator className="mb-3" />
          <nav className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => (
              <Link
                className="rounded-md px-3 py-2.5 font-medium text-foreground text-sm transition-all hover:bg-muted"
                key={item.href}
                onClick={() => setIsMenuOpen(false)}
                to={item.href as never}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 px-3">
              <Button asChild className="w-full font-semibold">
                <Link onClick={() => setIsMenuOpen(false)} to="/kontakt">
                  Kontakt aufnehmen
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
