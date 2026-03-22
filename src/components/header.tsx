import { Link } from "@tanstack/react-router";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = `/${href}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 border-border/60 border-b bg-background/95 backdrop-blur-sm transition-all">
      <div className="section-container">
        <div className="flex h-16 items-center justify-between md:h-18">
          {/* Logo */}
          <Link className="group flex items-center gap-3" to="/">
            <img
              alt="SV Bauten Logo"
              className="size-9 shrink-0"
              src="/favicon.svg"
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
          <nav className="hidden items-center gap-1 md:flex" role="navigation">
            {siteConfig.nav.map((item) => (
              <a
                className="rounded-md px-4 py-2 font-medium text-muted-foreground text-sm transition-all hover:bg-muted hover:text-foreground"
                href={item.href}
                key={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <Link
              className="rounded-md px-4 py-2 font-medium text-muted-foreground text-sm transition-all hover:bg-muted hover:text-foreground"
              to="/ueber-mich"
            >
              Über mich
            </Link>
            <div className="ml-2">
              <Button asChild className="h-9 px-5 font-semibold" size="sm">
                <a
                  href="#kontakt"
                  onClick={(e) => handleNavClick(e, "#kontakt")}
                >
                  Kontakt
                </a>
              </Button>
            </div>
          </nav>

          {/* Mobile toggle */}
          <button
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
            className="flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
          <nav className="flex flex-col gap-1" role="navigation">
            {siteConfig.nav.map((item) => (
              <a
                className="rounded-md px-3 py-2.5 font-medium text-foreground text-sm transition-all hover:bg-muted"
                href={item.href}
                key={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <Link
              className="rounded-md px-3 py-2.5 font-medium text-foreground text-sm transition-all hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
              to="/ueber-mich"
            >
              Über mich
            </Link>
            <div className="mt-2 px-3">
              <Button asChild className="w-full font-semibold">
                <a
                  href="#kontakt"
                  onClick={(e) => handleNavClick(e, "#kontakt")}
                >
                  Kontakt aufnehmen
                </a>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
