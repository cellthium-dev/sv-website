import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  CheckIcon,
  ClipboardListIcon,
  FileTextIcon,
  type LucideIcon,
  MonitorIcon,
  ScanSearchIcon,
  ShieldCheckIcon,
  StarIcon,
  TrendingUpIcon,
  WrenchIcon,
} from "lucide-react";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "clipboard-list": ClipboardListIcon,
  "scan-search": ScanSearchIcon,
  "trending-up": TrendingUpIcon,
  wrench: WrenchIcon,
  "shield-check": ShieldCheckIcon,
  monitor: MonitorIcon,
};

const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  document
    .querySelector(href)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Services() {
  return (
    <section
      className="scroll-mt-60 py-20 md:scroll-mt-0 md:py-28"
      id="leistungen"
    >
      <div className="section-container">
        {/* Section header */}
        <div className="mb-14 max-w-2xl">
          <div className="section-label mb-4">
            <span className="solar-bar" />
            <span>Leistungen</span>
          </div>
          <h2
            className="mb-4 font-extrabold text-4xl tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Meine Leistungen
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Umfassende Sachverständigenleistungen für Photovoltaik und
            Batteriesysteme — unabhängig, präzise, rechtssicher.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((service, index) => (
            <Card
              className={cn(
                "hover:-translate-y-1 relative flex flex-col transition-all duration-300 hover:shadow-xl",
                service.highlight &&
                  "shadow-lg shadow-primary/10 ring-2 ring-primary"
              )}
              key={index.toString()}
            >
              {service.highlight && (
                <div className="absolute top-3 right-4">
                  <Badge className="bg-solar px-3 py-1 font-semibold text-solar-foreground brightness-110">
                    <StarIcon className="mr-1 size-3 fill-solar-foreground" />
                    Empfohlen
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-2">
                <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {(() => {
                    const Icon = SERVICE_ICONS[service.iconKey];
                    return Icon ? <Icon className="size-5" /> : null;
                  })()}
                </div>
                <CardTitle
                  className={cn(
                    "font-bold text-xl",
                    service.highlight ? "text-primary" : "text-foreground"
                  )}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {service.title}
                </CardTitle>
                <CardDescription className="mt-1 text-sm leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="flex flex-col gap-2">
                  {service.features.map((feature, i) => (
                    <li className="flex items-start gap-2.5 text-sm" key={i}>
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  asChild
                  className="w-full font-semibold"
                  variant={service.highlight ? "default" : "outline"}
                >
                  <a
                    href={service.ctaLink}
                    onClick={(e) => scrollTo(e, service.ctaLink)}
                  >
                    {service.ctaText}
                    <ArrowRightIcon data-icon="inline-end" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex justify-center">
          <a
            className="inline-flex items-center gap-2.5 rounded-lg border border-border px-5 py-3 font-medium text-muted-foreground text-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            href="#"
          >
            <FileTextIcon className="size-4 shrink-0" />
            Leistungsübersicht als PDF herunterladen
          </a>
        </div>
      </div>
    </section>
  );
}
