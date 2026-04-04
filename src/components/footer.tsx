import { Link } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-[var(--dark-surface)] text-[var(--dark-surface-foreground)]">
      <div className="section-container py-16">
        {/* Top row */}
        <div className="mb-12 grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img
                alt="SV Bauten Logo"
                className="size-8 shrink-0"
                height={32}
                src="/favicon.svg"
                width={32}
              />
              <span
                className="font-bold text-[var(--dark-surface-foreground)] text-base"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {siteConfig.name}
              </span>
            </div>
            <p className="max-w-xs text-[var(--dark-surface-foreground)]/60 text-sm leading-relaxed">
              Sachverständigenbüro für Photovoltaik & Batteriesysteme. ISO-17024
              zertifiziert · BDSF-Mitglied
            </p>
          </div>

          {/* Services */}
          <div>
            <h4
              className="mb-4 font-semibold text-[var(--dark-surface-foreground)]/40 text-xs uppercase tracking-widest"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Leistungen
            </h4>
            <ul className="flex flex-col gap-2.5">
              {siteConfig.footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    className="text-[var(--dark-surface-foreground)]/60 text-sm transition-colors hover:text-[var(--dark-surface-foreground)]"
                    to={link.href as never}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4
              className="mb-4 font-semibold text-[var(--dark-surface-foreground)]/40 text-xs uppercase tracking-widest"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Informationen
            </h4>
            <ul className="flex flex-col gap-2.5">
              {siteConfig.footerLinks.info.map((link) => (
                <li key={link.label}>
                  <Link
                    className="text-[var(--dark-surface-foreground)]/60 text-sm transition-colors hover:text-[var(--dark-surface-foreground)]"
                    to={link.href as never}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              className="mb-4 font-semibold text-[var(--dark-surface-foreground)]/40 text-xs uppercase tracking-widest"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Rechtliches
            </h4>
            <ul className="flex flex-col gap-2.5">
              {siteConfig.footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    className="text-[var(--dark-surface-foreground)]/60 text-sm transition-colors hover:text-[var(--dark-surface-foreground)]"
                    to={link.href as never}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-3 pt-8 sm:flex-row">
          <p className="text-[var(--dark-surface-foreground)]/40 text-xs">
            &copy; {siteConfig.copyrightYear} {siteConfig.name} —
            Sachverständigenbüro. Alle Rechte vorbehalten.
          </p>
          <p className="text-[var(--dark-surface-foreground)]/40 text-xs">
            {siteConfig.contact.address}
          </p>
        </div>
      </div>
    </footer>
  );
}
