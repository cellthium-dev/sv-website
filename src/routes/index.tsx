import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRightIcon,
  BatteryChargingIcon,
  CalculatorIcon,
  ClipboardListIcon,
  FileTextIcon,
  MapPinIcon,
  MessageSquareIcon,
  MonitorIcon,
  ScanSearchIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  WrenchIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import CookieBanner from "../components/cookie-banner";
import Footer from "../components/footer";
import Header from "../components/header";
import Hero from "../components/hero";

export const Route = createFileRoute("/")({
  component: HomePage,
});

// ── Trust bar ──────────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: ShieldCheckIcon, label: "Zertifiziert nach ISO/IEC 17024" },
  { icon: ScanSearchIcon, label: "Messtechnische Vor-Ort-Prüfung" },
  { icon: FileTextIcon, label: "Gerichtsfeste Dokumentation" },
  { icon: MapPinIcon, label: "Bundesweit verfügbar" },
];

function TrustBar() {
  return (
    <div className="border-border/60 border-b bg-muted/50">
      <div className="section-container py-5">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <div
              className="flex items-center gap-2.5 font-medium text-muted-foreground text-sm"
              key={label}
            >
              <Icon className="size-4 shrink-0 text-primary" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Über mich intro ────────────────────────────────────────────────────────
function AboutIntro() {
  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="section-label mb-4">
              <span className="solar-bar" />
              <span>Über Ihren Sachverständigen</span>
            </div>
            <h2
              className="mb-6 font-extrabold text-3xl tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ingenieur aus Überzeugung.{" "}
              <span className="text-primary">Sachverständiger</span> aus
              Kompetenz.
            </h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              M.Sc. Elektrotechnik (RWTH Aachen), über ein Jahrzehnt Erfahrung
              in BMS-Entwicklung, Batteriesicherheit und funktionaler Sicherheit
              – und seit 2025 zertifizierter Sachverständiger für
              Photovoltaikanlagen nach DIN EN ISO/IEC 17024.
            </p>
            <p className="mb-8 text-muted-foreground leading-relaxed">
              Mein Hintergrund als Ingenieur – vom BMS-Entwickler über den
              Safety Manager bis zum Elektrofahrzeug-Konstrukteur mit
              TÜV-Abnahme – gibt mir eine Analysetiefe, die weit über die reine
              PV-Begutachtung hinausgeht. Ob Errichtungsmängel, Minderertrag,
              Brandschaden oder Speicherprobleme: Ich bewerte Ihre Anlage nicht
              nur nach Ertrag, sondern systematisch nach Risiko- und
              Schutzkonzepten.
            </p>
            <Button asChild className="font-semibold" variant="outline">
              <Link to="/ueber-mich">
                Mehr über mich erfahren
                <ArrowRightIcon className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <img
              alt="EUcert Zertifizierungssiegel – DIN EN ISO/IEC 17024 – Andreas Bauten"
              className="w-52 rotate-3 drop-shadow-xl transition-transform duration-500 hover:rotate-0 hover:scale-105"
              height={208}
              loading="lazy"
              src="/images/siegel-3d.png"
              width={208}
            />
            <p className="text-center text-muted-foreground text-sm">
              Cert-Nr: 1-25-1092 | Gültig bis 07/2030
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Leistungen intro ───────────────────────────────────────────────────────
const SERVICE_ICONS: Record<string, typeof ShieldCheckIcon> = {
  "scan-search": ScanSearchIcon,
  "clipboard-list": ClipboardListIcon,
  "trending-up": TrendingUpIcon,
  "shield-check": ShieldCheckIcon,
  wrench: WrenchIcon,
  monitor: MonitorIcon,
};

function ServicesIntro() {
  return (
    <section className="bg-muted/40 py-20 md:py-28">
      <div className="section-container">
        <div className="mb-12">
          <div className="section-label mb-4">
            <span className="solar-bar" />
            <span>Leistungsübersicht</span>
          </div>
          <h2
            className="mb-4 max-w-2xl font-extrabold text-3xl tracking-tight md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Unabhängige Gutachten & Prüfungen –{" "}
            <span className="text-primary">für jede Situation</span> die
            richtige Lösung
          </h2>
          <p className="max-w-2xl text-muted-foreground leading-relaxed">
            Von der Fehlerdiagnose über die Anlagenabnahme bis zur
            gerichtsfesten Schadensbewertung – als zertifizierter
            Sachverständiger biete ich das gesamte Leistungsspektrum, das
            Betreiber, Versicherer, Anwälte und Investoren benötigen.
          </p>
        </div>
        <div className="mb-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((service) => {
            const Icon = SERVICE_ICONS[service.iconKey] ?? ClipboardListIcon;
            return (
              <Card
                className="hover:-translate-y-0.5 transition-all duration-200 hover:shadow-md"
                key={service.title}
              >
                <CardHeader className="pb-4">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle
                    className="text-lg"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
        <div className="flex justify-center">
          <Button asChild className="px-8 font-semibold">
            <Link to="/leistungen">
              Alle Leistungen im Detail
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

// ── Gallery marquee ────────────────────────────────────────────────────────
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/kibo-ui/marquee";

const MARQUEE_IMAGES = [
  { src: "/marquee/marquee_1.png", alt: "PV-Anlage Praxisaufnahme 1" },
  { src: "/marquee/marquee_2.png", alt: "PV-Anlage Praxisaufnahme 2" },
  { src: "/marquee/marquee_3.png", alt: "PV-Anlage Praxisaufnahme 3" },
  { src: "/marquee/marquee_4.png", alt: "PV-Anlage Praxisaufnahme 4" },
  { src: "/marquee/marquee_5.png", alt: "PV-Anlage Praxisaufnahme 5" },
  { src: "/marquee/marquee_6.png", alt: "PV-Anlage Praxisaufnahme 6" },
  { src: "/marquee/marquee_7.png", alt: "PV-Anlage Praxisaufnahme 7" },
];

function GalleryMarquee() {
  return (
    <div aria-hidden className="border-border/60 border-y bg-muted/30 py-5">
      <Marquee>
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />
        <MarqueeContent speed={40}>
          {MARQUEE_IMAGES.map(({ src, alt }) => (
            <MarqueeItem key={src}>
              <div className="h-36 w-60 overflow-hidden rounded-xl border border-border">
                <img
                  alt={alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  src={src}
                />
              </div>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
  );
}

// ── Wissensbereich intro ───────────────────────────────────────────────────
const KNOWLEDGE_PREVIEW = [
  {
    tag: "Fehleranalyse",
    title: "Typische Fehlerquellen bei PV-Anlagen",
    desc: "Hotspots, Wechselrichterausfälle, Verschattungsprobleme – ein Überblick über die häufigsten technischen Probleme und wie Sie diese erkennen.",
  },
  {
    tag: "Praxisvergleich",
    title: "Gut vs. Schlecht – Installation im Vergleich",
    desc: "Anonymisierte Realbeispiele aus der Gutachterpraxis: Erkennen Sie auf den ersten Blick, was gute von schlechter PV-Arbeit unterscheidet.",
  },
  {
    tag: "Recht & Normen",
    title: "PV-Gutachten: Was es beinhalten muss",
    desc: "Aufbau, Aussagekraft und Bedeutung eines technischen Gutachtens für Versicherungen und Gerichte – und warum Zertifizierung entscheidend ist.",
  },
];

function KnowledgeIntro() {
  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <div className="mb-12">
          <div className="section-label mb-4">
            <span className="solar-bar" />
            <span>Wissensbereich</span>
          </div>
          <h2
            className="mb-4 max-w-xl font-extrabold text-3xl tracking-tight md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Fachwissen, das Sie{" "}
            <span className="text-primary">weiterbringt</span>
          </h2>
          <p className="max-w-2xl text-muted-foreground leading-relaxed">
            Fachartikel, Praxisbeispiele und Checklisten – fachlich fundiert und
            laienverständlich aufbereitet. Verstehen Sie, worauf es bei Ihrer
            PV-Anlage wirklich ankommt.
          </p>
        </div>
        <div className="mb-10 grid gap-5 md:grid-cols-3">
          {KNOWLEDGE_PREVIEW.map((item) => (
            <Card
              className="hover:-translate-y-0.5 transition-all duration-200 hover:shadow-md"
              key={item.title}
            >
              <CardHeader>
                <Badge className="mb-2 w-fit" variant="secondary">
                  {item.tag}
                </Badge>
                <CardTitle
                  className="text-base leading-snug"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {item.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <Button asChild className="font-semibold" variant="outline">
          <Link to="/wissen">
            Alle Fachartikel, Fallstudien & Downloads
            <ArrowRightIcon className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

// ── Tools intro ────────────────────────────────────────────────────────────
const TOOL_ITEMS = [
  { icon: CalculatorIcon, label: "Ertragsrechner & Soll-Ist-Vergleich" },
  { icon: BatteryChargingIcon, label: "Speicherdimensionierung" },
  { icon: TrendingUpIcon, label: "Wirtschaftlichkeitsrechner" },
  { icon: MessageSquareIcon, label: "KI-Chatbot & Foto-Upload" },
];

function ToolsIntro() {
  return (
    <section className="bg-muted/40 py-20 md:py-28">
      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="section-label mb-4">
              <span className="solar-bar" />
              <span>Kostenlose Online-Tools</span>
            </div>
            <h2
              className="mb-5 font-extrabold text-3xl tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ihre PV-Anlage in Zahlen –{" "}
              <span className="text-primary">sofort und kostenlos</span>
            </h2>
            <p className="mb-7 text-muted-foreground leading-relaxed">
              Ertragsrechner, Eigenverbrauchsanalyse,
              Wirtschaftlichkeitsrechner, Speicherdimensionierung und mehr –
              interaktive Berechnungstools für eine datengestützte
              Erstorientierung. Dazu: KI-gestützte Sofort-Hilfe mit
              Fehlermeldungs-Decoder, Chatbot und Foto-Upload-Analyse.
            </p>
            <ul className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {TOOL_ITEMS.map(({ icon: Icon, label }) => (
                <li
                  className="flex items-center gap-2.5 font-medium text-sm"
                  key={label}
                >
                  <Icon className="size-4 shrink-0 text-primary" />
                  {label}
                </li>
              ))}
            </ul>
            <Button asChild className="font-semibold">
              <Link to="/tools">
                Tools kostenlos nutzen
                <ArrowRightIcon className="size-4" />
              </Link>
            </Button>
          </div>

          {/* Decorative preview */}
          <div
            aria-hidden
            className="hidden rounded-2xl border border-border bg-card p-7 shadow-lg lg:block"
          >
            <div className="mb-5 flex items-center gap-2">
              <div className="size-2.5 rounded-full bg-border" />
              <div className="size-2.5 rounded-full bg-border" />
              <div className="size-2.5 rounded-full bg-border" />
            </div>
            {[
              { label: "Jahresertrag (Soll vs. Ist)", w: "78%" },
              { label: "Eigenverbrauchsquote", w: "62%" },
              { label: "Speichernutzungsgrad", w: "45%" },
            ].map(({ label, w }) => (
              <div className="mb-4" key={label}>
                <p className="mb-1.5 text-muted-foreground text-xs">{label}</p>
                <div className="h-2.5 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: w }}
                  />
                </div>
              </div>
            ))}
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {[
                "Anlagenleistung (kWp)",
                "Ausrichtung (°)",
                "Jahresverbrauch (kWh)",
                "Speicherkapazität (kWh)",
              ].map((placeholder) => (
                <div
                  className="rounded-md border border-border bg-muted px-3 py-2.5 text-muted-foreground text-xs"
                  key={placeholder}
                >
                  {placeholder}
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-md bg-primary px-3 py-2.5 text-center font-semibold text-primary-foreground text-xs">
              Berechnung starten →
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact CTA ────────────────────────────────────────────────────────────
function ContactCTA() {
  return (
    <section className="bg-primary py-24 text-white">
      <div className="section-container text-center">
        <h2
          className="mx-auto mb-5 max-w-2xl font-extrabold text-3xl tracking-tight md:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Bereit für Klarheit?
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-lg text-white/75 leading-relaxed">
          Ob akuter Schadensfall, unabhängige Abnahme oder technische
          Zweitmeinung – der erste Schritt ist eine unverbindliche Anfrage. Ich
          melde mich innerhalb von 24 Stunden.
        </p>
        <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            asChild
            className="h-12 bg-[var(--solar)] px-8 font-semibold text-[var(--solar-foreground)] text-base hover:bg-[var(--solar)]/90"
          >
            <Link
              hash="kontakt-formular"
              search={{ tab: "anfrage" }}
              to="/kontakt"
            >
              Anfrage senden
            </Link>
          </Button>
          <Button
            asChild
            className="h-12 border-white/30 bg-transparent px-8 font-semibold text-base text-white hover:border-white/50 hover:bg-white/10"
            variant="outline"
          >
            <Link
              hash="kontakt-formular"
              search={{ tab: "termin" }}
              to="/kontakt"
            >
              Termin buchen
            </Link>
          </Button>
        </div>
        <p className="text-sm text-white tracking-wide">
          ISO/IEC 17024 zertifiziert · Unabhängig & neutral · Antwort innerhalb
          von 24h
        </p>
      </div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <AboutIntro />
        <ServicesIntro />
        <GalleryMarquee />
        <KnowledgeIntro />
        <ToolsIntro />
        <ContactCTA />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
