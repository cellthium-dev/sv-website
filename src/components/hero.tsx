import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  GraduationCapIcon,
  type LucideIcon,
  ShieldCheckIcon,
  ZapIcon,
} from "lucide-react";

const badgeIcons: LucideIcon[] = [
  CheckCircle2Icon,
  ZapIcon,
  ShieldCheckIcon,
  GraduationCapIcon,
];

const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  document
    .querySelector(href)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Hero() {
  return (
    <section
      className="relative scroll-mt-40 overflow-hidden bg-[var(--dark-surface)] text-[var(--dark-surface-foreground)] md:scroll-mt-16"
      id="home"
    >
      {/* Geometric background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Large subtle circle */}
        <div className="-top-32 -right-32 absolute size-[600px] rounded-full border border-white/5" />
        <div className="-top-16 -right-16 absolute size-[400px] rounded-full border border-white/5" />
        {/* Primary blue gradient glow */}
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-primary/10 to-transparent" />
        {/* Bottom grid line */}
        <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="section-container relative py-20 md:py-28 lg:py-36">
        {/* Section label */}
        <div className="section-label mb-6 animate-fade-in opacity-0">
          <span className="solar-bar" />
          <span className="text-primary brightness-150">
            {siteConfig.contact.coverage}
          </span>
        </div>

        {/* Headline */}
        <h1
          className="mb-6 max-w-4xl animate-fade-in hyphens-auto font-extrabold text-3xl leading-[1.05] tracking-tight opacity-0 delay-100 sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Unabhängige Gutachten für{" "}
          <span className="text-primary">Photovoltaik</span> &{" "}
          <span className="text-primary">Batteriesysteme</span>
        </h1>

        {/* Subline */}
        <p className="mb-10 max-w-2xl animate-fade-in text-[var(--dark-surface-foreground)]/70 text-lg leading-relaxed opacity-0 delay-200 md:text-xl">
          {siteConfig.hero.subline}
        </p>

        {/* CTAs */}
        <div className="mb-16 flex animate-fade-in flex-col gap-4 opacity-0 delay-300 sm:flex-row">
          <Button asChild className="h-12 px-8 font-semibold text-base">
            <a href="#kontakt" onClick={(e) => scrollTo(e, "#kontakt")}>
              Jetzt Beratung buchen
              <ArrowRightIcon />
            </a>
          </Button>

          <Button
            asChild
            className="h-12 border-white/20 bg-transparent px-8 font-semibold text-[var(--dark-surface-foreground)] text-base hover:border-white/30 hover:bg-white/10 hover:text-white"
            variant="outline"
          >
            <a href="#leistungen" onClick={(e) => scrollTo(e, "#leistungen")}>
              Leistungen ansehen
            </a>
          </Button>
        </div>

        {/* Trust badges */}
        <div className="flex animate-fade-in flex-wrap gap-3 opacity-0 delay-400">
          {siteConfig.badges.map((badge, i) => {
            const Icon = badgeIcons[i];
            return (
              <div
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-medium text-[var(--dark-surface-foreground)]/80 text-sm"
                key={badge.text}
              >
                {Icon && <Icon className="size-4 shrink-0 text-primary" />}
                {badge.text}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom decorative edge */}
      <div className="absolute right-0 bottom-0 left-0">
        <svg
          aria-hidden
          className="h-8 w-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1440 32"
        >
          <path d="M0 32L1440 0V32H0Z" fill="var(--background)" />
        </svg>
      </div>
    </section>
  );
}
