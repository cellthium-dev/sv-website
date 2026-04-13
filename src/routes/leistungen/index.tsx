import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CheckIcon,
  ClipboardListIcon,
  CompassIcon,
  FileDownIcon,
  type LucideIcon,
  MailIcon,
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
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Footer from "../../components/footer";
import Header from "../../components/header";

export const Route = createFileRoute("/leistungen/")({
  component: LeistungenPage,
});

// ─── Data ────────────────────────────────────────────────────────────────────

type ServiceCard = {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  audiences: string[];
  ctaText: string;
  ctaTab: "anfrage" | "termin";
};

const HAUPTLEISTUNGEN: ServiceCard[] = [
  {
    icon: ScanSearchIcon,
    title: "Fehlerdiagnose & Schadenanalyse",
    description:
      "Präzise Identifikation und Bewertung technischer Probleme an PV-Anlagen und Batteriespeichern. Von Ertragsminderungen über Moduldefekte bis hin zu Wechselrichterausfällen.",
    features: [
      "Thermografische Untersuchung (Hotspot-Erkennung)",
      "Kennlinienmessung (I-V-Kurvenanalyse)",
      "Stringanalyse & Fehlersuche",
      "Wechselrichter-Diagnose & Batteriespeicher-Prüfung",
    ],
    audiences: ["Versicherer", "Betreiber", "Rechtsanwälte"],
    ctaText: "Schadenfall melden",
    ctaTab: "anfrage",
  },
  {
    icon: ClipboardListIcon,
    title: "Anlagenabnahme & Inbetriebnahmeprüfung",
    description:
      "Normgerechte Prüfung bei Neuinstallation, Erweiterung oder Repowering nach VDE 0100-712 und DIN EN 62446-1. Unabhängige Qualitätssicherung vor der Inbetriebnahme.",
    features: [
      "Vor-Ort-Prüfung bei Inbetriebnahme",
      "Dokumentenprüfung & Konformitätsbewertung",
      "Prüfung Schutzmaßnahmen & Erdung",
      "Isolationsmessung & Überspannungsschutz-Prüfung",
    ],
    audiences: ["Bauherren", "Unternehmen", "Installateure"],
    ctaText: "Abnahme beauftragen",
    ctaTab: "anfrage",
  },
  {
    icon: TrendingUpIcon,
    title: "Ertragsprüfung & Wirtschaftlichkeit",
    description:
      "Analyse bei Leistungsabweichungen und fundierte Bewertung der tatsächlichen Anlageneffizienz. Vergleich von Ertragsprognose und Realertrag mit konkreten Optimierungsempfehlungen.",
    features: [
      "Ertragsprognose vs. Realertrag (Performance Ratio)",
      "Monitoring-Datenauswertung & Vergleichsanalyse",
      "Amortisationsrechnung & ROI-Berechnung",
      "Degradationsanalyse & Optimierungsempfehlungen",
    ],
    audiences: ["Investoren", "Privat", "Käufer"],
    ctaText: "Ertragsprüfung starten",
    ctaTab: "anfrage",
  },
  {
    icon: ShieldCheckIcon,
    title: "Schadensgutachten & Versicherungsfälle",
    description:
      "Gutachterliche Bewertung nach Sturm, Hagel, Brand, Überspannung oder Installationsfehlern. Klarer Fokus auf Ursache, Umfang und wirtschaftliche Folgen – normkonform und gerichtsfest.",
    features: [
      "Schadensursachenermittlung & Dokumentation",
      "Bewertung für Versicherungsregulierung",
      "Beweissicherungsgutachten",
      "Gerichtsgutachten nach ZPO",
    ],
    audiences: ["Versicherer", "Rechtsanwälte", "Betreiber"],
    ctaText: "Schadensfall melden",
    ctaTab: "anfrage",
  },
  {
    icon: WrenchIcon,
    title: "Batteriespeicher & Hochvoltprüfung",
    description:
      "Bewertung von Batteriespeichern und Hochvoltsystemen hinsichtlich Aufbau, Sicherheit und Einhaltung einschlägiger Normen. Expertise aus über 5 Jahren BMS-Entwicklung.",
    features: [
      "Bewertung Zellchemie & BMS-Logik",
      "Sicherheitsprüfung (Brandrisiko, Aufstellung)",
      "Ladeprofil-Analyse & Systemintegration",
      "Konformität nach IEC 62933, UN 38.3, UL-Normen",
    ],
    audiences: ["Betreiber", "Unternehmen", "Hersteller"],
    ctaText: "Speicher prüfen lassen",
    ctaTab: "anfrage",
  },
  {
    icon: MessageSquareIcon,
    title: "Second-Opinion & Streitfälle",
    description:
      "Objektive Zweitmeinung bei Konflikten mit Installateuren, Versicherungen oder unklaren Erstgutachten. Neutrale Neubewertung als Grundlage für Gewährleistungsansprüche, Schlichtung oder Gerichtsverfahren.",
    features: [
      "Neutrale Bewertung bestehender Gutachten",
      "Unterstützung bei Gewährleistungsfällen",
      "Schlichtung Betreiber–Installateur",
      "Gerichtsfeste Dokumentation",
    ],
    audiences: ["Rechtsanwälte", "Betreiber", "Versicherer"],
    ctaText: "Zweitmeinung einholen",
    ctaTab: "anfrage",
  },
];

type AdvisoryCard = {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaTab: "anfrage" | "termin";
  priceBadge?: string;
};

const BERATUNGSLEISTUNGEN: AdvisoryCard[] = [
  {
    icon: WrenchIcon,
    title: "Beratung für Installateure",
    description:
      "Fachliche Unterstützung für Installationsbetriebe bei komplexen Projekten. Von der Planungsberatung über Normenkonformität bis zur Qualitätssicherung und Schulung.",
    features: [
      "Planungsberatung & Anlagendimensionierung",
      "Normenkonformität (VDE/DIN/IEC)",
      "Qualitätssicherung & Abnahmebegleitung",
      "Schulungen & Workshops",
    ],
    ctaText: "Beratung buchen",
    ctaTab: "termin",
  },
  {
    icon: CompassIcon,
    title: "Technische Beratung & Projektbegleitung",
    description:
      "Support bei technischen Fragestellungen, Planungsprüfung und Projektbegleitung für Neubauprojekte und Bestandsanlagen. Beratung zu Repowering, Anlagenerweiterung und technischer Due Diligence.",
    features: [
      "Technische Due Diligence bei Anlagenkauf",
      "Planungsprüfung & Machbarkeitsanalyse",
      "Baubegleitende Qualitätskontrolle",
      "Repowering-Beratung",
    ],
    ctaText: "Termin vereinbaren",
    ctaTab: "termin",
  },
  {
    icon: MonitorIcon,
    title: "Online-Gutachten & Ferndiagnose",
    description:
      "Schnelle Ersteinschätzung auf Basis von Fotos, Monitoring-Daten und Unterlagen – bundesweit, ohne Vor-Ort-Termin. Kurzfristige Rückmeldung mit klarer Empfehlung zum weiteren Vorgehen.",
    features: [
      "Express-Rückmeldung innerhalb 24–48 Stunden",
      "Bild-Upload & Dokumentenanalyse",
      "Digitales Gutachten (PDF)",
    ],
    ctaText: "Online-Gutachten starten",
    ctaTab: "anfrage",
  },
];

type TargetGroup = {
  icon: LucideIcon;
  title: string;
  description: string;
  highlights: string[];
  ctaText: string;
  ctaTab: "anfrage" | "termin";
};

const ZIELGRUPPEN: TargetGroup[] = [
  {
    icon: ShieldCheckIcon,
    title: "Für Versicherer",
    description:
      "Schnelle, normkonforme Schadensbewertung bei PV-Anlagen und Batteriespeichern. Standardisierte Prozesse, kurze Turnaround-Zeiten und höchste technische Sorgfalt.",
    highlights: ["Rahmenverträge möglich", "Kurze Turnaround-Zeiten"],
    ctaText: "Anfrage stellen",
    ctaTab: "anfrage",
  },
  {
    icon: BriefcaseIcon,
    title: "Für Installateure",
    description:
      "Qualitätssicherung, Abnahmebegleitung und Konfliktklärung bei komplexen Projekten. Fachliche Rückendeckung durch unabhängige Expertise.",
    highlights: ["Begleitende Qualitätsprüfung", "Schulungsangebote"],
    ctaText: "Zusammenarbeit anfragen",
    ctaTab: "anfrage",
  },
  {
    icon: TrendingUpIcon,
    title: "Für Unternehmen & Investoren",
    description:
      "Bewertung gewerblicher Anlagen, Wirtschaftlichkeitsprüfung und technische Due Diligence. Belastbare Grundlage für Kaufentscheidungen und Portfoliobewertungen.",
    highlights: ["Technische Due Diligence", "Portfoliobewertung"],
    ctaText: "Beratung anfragen",
    ctaTab: "anfrage",
  },
];

const PROZESS_SCHRITTE = [
  {
    num: "1",
    title: "Kontaktaufnahme",
    desc: "Telefonisch, per E-Mail oder über das Kontaktformular",
  },
  {
    num: "2",
    title: "Erstgespräch",
    desc: "Klärung Ihres Anliegens und unverbindliche Einschätzung",
  },
  {
    num: "3",
    title: "Angebot",
    desc: "Transparentes, individuelles Angebot – fair und nachvollziehbar",
  },
  {
    num: "4",
    title: "Vor-Ort-Prüfung",
    desc: "Prüfung mit modernster Messtechnik (Thermografie, Kennlinie, Drohne)",
  },
  {
    num: "5",
    title: "Gutachten & Empfehlung",
    desc: "Normkonformer Bericht mit klaren Handlungsempfehlungen",
  },
];

const NORMEN = [
  [
    "VDE 0100-712",
    "DIN EN 62446-1",
    "DGUV Vorschrift 3",
    "VDE 0100-600",
    "VDE 0105-100",
    "DIN EN 61000 (EMV)",
  ],
  [
    "ISO 26262",
    "IEC 61508",
    "IEC 62933",
    "UN 38.3",
    "ECE R 100",
    "UL 991 / UL 1998",
  ],
  ["ISO 9001", "IATF 16949", "ISO/SAE 21434", "ISO 12100", "ISO/IEC 17024"],
];

// ─── Component ────────────────────────────────────────────────────────────────

function LeistungenPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section aria-label="Leistungsübersicht" className="py-20 md:py-28">
          <div className="section-container">
            <div className="mx-auto max-w-2xl text-center">
              <Badge className="mb-5 bg-primary/10 font-semibold text-primary hover:bg-primary/10">
                ISO/IEC 17024 zertifiziert
              </Badge>
              <h1 className="mb-4 font-extrabold text-4xl tracking-tight md:text-5xl">
                Meine Leistungen
              </h1>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
                Umfassende Sachverständigenleistungen für Photovoltaikanlagen
                und Batteriespeichersysteme – unabhängig, normgerecht und
                praxisorientiert.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild size="lg">
                  <Link
                    hash="kontakt-formular"
                    search={{ tab: "termin" }}
                    to="/kontakt"
                  >
                    Kostenlose Erstberatung
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="/leistungen/Leistungsübersicht_Sachverstaendinger-Bauten_Photovoltaik-Batteriespeicher.pdf">
                    Leistungsübersicht als PDF
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Hauptleistungen ────────────────────────────────────── */}
        <section
          aria-labelledby="hauptleistungen-title"
          className="bg-muted/40 py-20 md:py-28"
        >
          <div className="section-container">
            <div className="mb-12 text-center">
              <div className="section-label mb-3 justify-center">
                <span className="solar-bar" />
                <span>Kernleistungen</span>
              </div>
              <h2
                className="mb-3 font-extrabold text-3xl tracking-tight md:text-4xl"
                id="hauptleistungen-title"
              >
                Technische Gutachten & Prüfungen
              </h2>
              <p className="text-muted-foreground">
                Kernleistungen für Anlagenbetreiber, Versicherer und Gerichte
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {HAUPTLEISTUNGEN.map((s) => {
                const Icon = s.icon;
                return (
                  <Card
                    className="hover:-translate-y-1 flex flex-col transition-all duration-300 hover:shadow-xl"
                    key={s.title}
                  >
                    <CardHeader className="pb-2">
                      <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <CardTitle className="font-bold text-xl">
                        {s.title}
                      </CardTitle>
                      <CardDescription className="mt-1 text-sm leading-relaxed">
                        {s.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col gap-4">
                      <ul className="flex flex-col gap-2">
                        {s.features.map((f) => (
                          <li
                            className="flex items-start gap-2.5 text-sm"
                            key={f}
                          >
                            <CheckIcon className="mt-0.5 size-4 shrink-0 text-solar" />
                            <span className="text-foreground/80">{f}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5 border-border border-t pt-3">
                        {s.audiences.map((a) => (
                          <span
                            className="rounded-full bg-muted px-3 py-0.5 font-medium text-muted-foreground text-xs"
                            key={a}
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button asChild className="w-full" variant="outline">
                        <Link
                          hash="kontakt-formular"
                          search={{ tab: s.ctaTab }}
                          to="/kontakt"
                        >
                          {s.ctaText}
                          <ArrowRightIcon className="ml-1 size-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Beratung & Zusatzleistungen ────────────────────────── */}
        <section aria-labelledby="beratung-title" className="py-20 md:py-28">
          <div className="section-container">
            <div className="mb-12 text-center">
              <div className="section-label mb-3 justify-center">
                <span className="solar-bar" />
                <span>Beratung</span>
              </div>
              <h2
                className="mb-3 font-extrabold text-3xl tracking-tight md:text-4xl"
                id="beratung-title"
              >
                Beratung & Zusatzleistungen
              </h2>
              <p className="text-muted-foreground">
                Individuelle Unterstützung für Fachbetriebe, Unternehmen und
                Projektbeteiligte
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {BERATUNGSLEISTUNGEN.map((s) => {
                const Icon = s.icon;
                return (
                  <Card
                    className={cn(
                      "hover:-translate-y-1 relative flex flex-col transition-all duration-300 hover:shadow-xl",
                      s.priceBadge
                        ? "shadow-lg shadow-primary/10 ring-2 ring-primary"
                        : ""
                    )}
                    key={s.title}
                  >
                    {s.priceBadge ? (
                      <div className="absolute top-3 right-4">
                        <Badge className="bg-solar px-3 py-1 font-bold text-solar-foreground brightness-110">
                          {s.priceBadge}
                        </Badge>
                      </div>
                    ) : null}

                    <CardHeader className="pb-2">
                      <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <CardTitle
                        className={cn(
                          "font-bold text-xl",
                          s.priceBadge ? "text-primary" : ""
                        )}
                      >
                        {s.title}
                      </CardTitle>
                      <CardDescription className="mt-1 text-sm leading-relaxed">
                        {s.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1">
                      <ul className="flex flex-col gap-2">
                        {s.features.map((f) => (
                          <li
                            className="flex items-start gap-2.5 text-sm"
                            key={f}
                          >
                            <CheckIcon className="mt-0.5 size-4 shrink-0 text-solar" />
                            <span className="text-foreground/80">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter>
                      <Button
                        asChild
                        className="w-full font-semibold"
                        variant={s.priceBadge ? "default" : "outline"}
                      >
                        <Link
                          hash="kontakt-formular"
                          search={{ tab: s.ctaTab }}
                          to="/kontakt"
                        >
                          {s.ctaText}
                          <ArrowRightIcon className="ml-1 size-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Zielgruppen ────────────────────────────────────────── */}
        <section
          aria-labelledby="zielgruppen-title"
          className="bg-dark-surface py-20 md:py-28"
        >
          <div className="section-container">
            <div className="mb-12">
              <div
                className="section-label mb-3"
                style={{ color: "oklch(0.65 0.01 265)" }}
              >
                <span className="solar-bar" />
                <span>Zielgruppen</span>
              </div>
              <h2
                className="mb-3 font-extrabold text-3xl text-dark-surface-foreground tracking-tight md:text-4xl"
                id="zielgruppen-title"
              >
                Spezielle Angebote für Zielgruppen
              </h2>
              <p className="text-dark-surface-foreground/65">
                Passgenaue Leistungspakete für Ihre spezifischen Anforderungen
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {ZIELGRUPPEN.map((g) => {
                const Icon = g.icon;
                return (
                  <div
                    className="hover:-translate-y-1 flex flex-col rounded-xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:bg-white/8 hover:shadow-xl"
                    key={g.title}
                  >
                    <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-white/8">
                      <Icon className="size-5 text-solar" />
                    </div>
                    <h3 className="mb-3 font-bold text-dark-surface-foreground text-xl">
                      {g.title}
                    </h3>
                    <p className="mb-5 flex-1 text-dark-surface-foreground/75 text-sm leading-relaxed">
                      {g.description}
                    </p>
                    <ul className="mb-6 flex flex-col gap-2.5">
                      {g.highlights.map((h) => (
                        <li
                          className="flex items-center gap-2.5 text-dark-surface-foreground/85 text-sm"
                          key={h}
                        >
                          <CheckIcon className="size-4 shrink-0 text-solar" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className="border-white/30 hover:border-white hover:bg-white/10 hover:text-dark-surface-foreground"
                      variant="outline"
                    >
                      <Link
                        hash="kontakt-formular"
                        search={{ tab: g.ctaTab }}
                        to="/kontakt"
                      >
                        {g.ctaText}
                        <ArrowRightIcon className="ml-1 size-4" />
                      </Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Ablauf & Prozess ───────────────────────────────────── */}
        <section aria-labelledby="ablauf-title" className="py-20 md:py-28">
          <div className="section-container">
            <div className="mb-12 text-center">
              <div className="section-label mb-3 justify-center">
                <span className="solar-bar" />
                <span>Ablauf</span>
              </div>
              <h2
                className="mb-3 font-extrabold text-3xl tracking-tight md:text-4xl"
                id="ablauf-title"
              >
                So läuft eine Begutachtung ab
              </h2>
              <p className="text-muted-foreground">
                Von der Erstanfrage bis zum fertigen Gutachten – transparent und
                planbar
              </p>
            </div>

            {/* Process steps – horizontal on desktop, vertical on mobile */}
            <div className="relative">
              {/* Dashed connector line (desktop only) */}
              <div
                aria-hidden="true"
                className="absolute top-5 right-[10%] left-[10%] hidden border-border border-t-2 border-dashed md:block"
              />
              <ol className="relative flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-4">
                {PROZESS_SCHRITTE.map((step) => (
                  <li
                    className="relative z-10 flex flex-col items-center text-center md:flex-1"
                    key={step.num}
                  >
                    <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-primary font-bold text-base text-primary-foreground">
                      {step.num}
                    </div>
                    <p className="mb-1 font-semibold text-foreground text-sm">
                      {step.title}
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {step.desc}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── Normen & Standards ─────────────────────────────────── */}
        <section
          aria-labelledby="normen-title"
          className="bg-muted/40 py-20 md:py-28"
        >
          <div className="section-container">
            <div className="mb-12 text-center">
              <h2
                className="mb-3 font-extrabold text-3xl tracking-tight md:text-4xl"
                id="normen-title"
              >
                Prüfgrundlagen & Normen
              </h2>
              <p className="text-muted-foreground">
                Alle Bewertungen basieren auf aktuellen Normen und anerkannten
                Regeln der Technik
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              {NORMEN.map((row, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static data
                <div className="flex flex-wrap justify-center gap-2.5" key={i}>
                  {row.map((tag) => (
                    <span
                      className="whitespace-nowrap rounded-full border border-border bg-background px-5 py-2 font-medium text-foreground/80 text-sm"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────── */}
        <section
          aria-labelledby="cta-leistungen-title"
          className="bg-primary py-20 md:py-28"
          id="cta"
        >
          <div className="section-container">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <h2
                  className="mb-4 font-extrabold text-3xl text-primary-foreground tracking-tight md:text-4xl"
                  id="cta-leistungen-title"
                >
                  Individuelle Beratung gewünscht?
                </h2>
                <p className="mb-6 text-lg text-primary-foreground/85 leading-relaxed">
                  Jedes Projekt ist einzigartig. Ich erstelle ein
                  maßgeschneidertes Angebot für Ihre Anforderungen –
                  unverbindlich und kostenlos.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-primary-foreground/85 text-sm">
                    <MailIcon className="size-4 shrink-0 text-solar" />
                    <span>Antwort innerhalb von 24 Stunden</span>
                  </div>
                  <div className="flex items-center gap-3 text-primary-foreground/85 text-sm">
                    <MapPinIcon className="size-4 shrink-0 text-solar" />
                    <span>Bundesweit tätig – Aachen & ganz Deutschland</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Button
                  asChild
                  className="bg-solar font-bold text-solar-foreground hover:brightness-95"
                  size="lg"
                >
                  <Link
                    hash="kontakt-formular"
                    search={{ tab: "termin" }}
                    to="/kontakt"
                  >
                    Kostenlose Erstberatung
                  </Link>
                </Button>
                <Button
                  asChild
                  className="border-white/40 hover:border-white hover:bg-white/10"
                  size="lg"
                  variant="outline"
                >
                  <Link
                    hash="kontakt-formular"
                    search={{ tab: "anfrage" }}
                    to="/kontakt"
                  >
                    Anfrage senden
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── PDF Bar ────────────────────────────────────────────── */}
        <section
          aria-label="PDF-Download"
          className="border-border border-t py-10"
          id="pdf-download"
        >
          <div className="section-container text-center">
            <a
              className="inline-flex items-center gap-2.5 rounded-lg border border-border px-5 py-3 font-semibold text-primary text-sm transition-all hover:border-primary/30 hover:bg-primary/5"
              download="Leistungsübersicht_Sachverstaendinger-Bauten_Photovoltaik-Batteriespeicher.pdf"
              href="/leistungen/Leistungsübersicht_Sachverstaendinger-Bauten_Photovoltaik-Batteriespeicher.pdf"
            >
              <FileDownIcon className="size-5 shrink-0" />
              Leistungsübersicht als PDF herunterladen
            </a>
            <p className="mt-2 text-muted-foreground text-sm">
              Alle Gutachtenarten, typische Anwendungsfälle und Abläufe
              übersichtlich auf einer Seite – ideal zum internen Teilen oder
              Ausdrucken.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
