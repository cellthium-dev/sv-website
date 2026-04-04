import { createFileRoute } from "@tanstack/react-router";
import {
  BatteryFullIcon,
  CalendarIcon,
  FileCheckIcon,
  GlobeIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SendIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/config/site";
import BookingSystem from "../../components/booking-system";
import ContactForm from "../../components/contact-form";
import Footer from "../../components/footer";
import Header from "../../components/header";

export const Route = createFileRoute("/kontakt/")({
  component: KontaktPage,
});

const TRUST_BADGES = [
  {
    icon: ShieldCheckIcon,
    title: "Unabhängig",
    desc: "Kein Verkauf, keine Herstellerbindung",
  },
  {
    icon: FileCheckIcon,
    title: "Normkonform",
    desc: "VDE, DIN, DGUV, IEC",
  },
  {
    icon: GlobeIcon,
    title: "ISO/IEC 17024",
    desc: "Gerichtsfest & versicherungsanerkannt",
  },
  {
    icon: BatteryFullIcon,
    title: "BMS-Expertise",
    desc: "5+ Jahre Entwicklungserfahrung",
  },
];

function KontaktPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section
          aria-label="Kontakt Hero"
          className="bg-dark-surface py-20 md:py-28"
        >
          <div className="section-container">
            <div className="mx-auto max-w-2xl text-center">
              <div className="section-label mb-4 justify-center">
                <span className="solar-bar" />
                <span className="text-dark-surface-foreground/70">Kontakt</span>
              </div>
              <h1
                className="mb-5 font-extrabold text-4xl text-dark-surface-foreground tracking-tight md:text-5xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ihr direkter Draht zum{" "}
                <span className="text-solar">Sachverständigen</span>
              </h1>
              <p className="mb-10 text-dark-surface-foreground/75 text-lg leading-relaxed">
                Ob akuter Schadensfall oder langfristige Planung – wir sind Ihr
                neutraler Partner für alle Fragen rund um Photovoltaik.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
                <a
                  aria-label={`Telefon: ${siteConfig.contact.phone}`}
                  className="flex items-center gap-3 text-dark-surface-foreground transition-opacity hover:opacity-80"
                  href={`tel:${siteConfig.contact.phone}`}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <PhoneIcon className="size-5 text-solar" />
                  </span>
                  <div className="text-left">
                    <p className="font-semibold text-dark-surface-foreground/50 text-xs uppercase tracking-widest">
                      Rufen Sie uns an
                    </p>
                    <p className="font-semibold text-dark-surface-foreground text-sm">
                      {siteConfig.contact.phone}
                    </p>
                  </div>
                </a>

                <div className="hidden h-10 w-px bg-white/10 sm:block" />

                <a
                  aria-label={`E-Mail: ${siteConfig.contact.email}`}
                  className="flex items-center gap-3 text-dark-surface-foreground transition-opacity hover:opacity-80"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <MailIcon className="size-5 text-solar" />
                  </span>
                  <div className="text-left">
                    <p className="font-semibold text-dark-surface-foreground/50 text-xs uppercase tracking-widest">
                      E-Mail schreiben
                    </p>
                    <p className="font-semibold text-dark-surface-foreground text-sm">
                      {siteConfig.contact.email}
                    </p>
                  </div>
                </a>

                <div className="hidden h-10 w-px bg-white/10 sm:block" />

                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <MapPinIcon className="size-5 text-solar" />
                  </span>
                  <div className="text-left">
                    <p className="font-semibold text-dark-surface-foreground/50 text-xs uppercase tracking-widest">
                      Standort
                    </p>
                    <p className="font-semibold text-dark-surface-foreground text-sm">
                      {siteConfig.contact.address} · Bundesweit tätig
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-8 flex items-center justify-center gap-2 text-dark-surface-foreground/50 text-xs">
                <ShieldCheckIcon className="size-3.5 shrink-0 text-solar" />
                ISO/IEC 17024 zertifiziert · Unabhängig · Gerichtsfest
              </p>
            </div>
          </div>
        </section>

        {/* ── Anfrage / Termin Tabs ─────────────────────────────────── */}
        <div className="bg-muted/30 pt-10 pb-0">
          <div className="section-container">
            <div className="mb-14 max-w-2xl">
              <div className="section-label mb-4">
                <span className="solar-bar" />
                <span>Kontakt</span>
              </div>
              <h2
                className="mb-4 hyphens-auto font-extrabold text-4xl tracking-tight md:text-5xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Kontakt & Terminbuchung
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nehmen Sie Kontakt auf oder buchen Sie direkt einen Termin für
                Ihre Beratung.
              </p>
            </div>

            <Tabs className="w-full" defaultValue="anfrage">
              <TabsList className="h-12 w-full max-w-xs p-1">
                <TabsTrigger
                  className="flex-1 gap-2 font-semibold"
                  value="anfrage"
                >
                  <SendIcon className="size-4" />
                  Anfrage senden
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 gap-2 font-semibold"
                  value="termin"
                >
                  <CalendarIcon className="size-4" />
                  Termin buchen
                </TabsTrigger>
              </TabsList>
              <TabsContent className="mt-0" value="anfrage">
                <ContactForm />
              </TabsContent>
              <TabsContent className="mt-0" value="termin">
                <BookingSystem />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* ── Standort & Vertrauen ──────────────────────────────────── */}
        <section
          aria-label="Standort und Vertrauen"
          className="bg-muted/30 py-20 md:py-28"
        >
          <div className="section-container">
            <div className="mb-12">
              <div className="section-label mb-3">
                <span className="solar-bar" />
                <span>Standort</span>
              </div>
              <h2
                className="font-extrabold text-3xl tracking-tight md:text-4xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ihr Standort, unsere{" "}
                <span className="text-primary">Expertise.</span>
              </h2>
            </div>

            <div className="grid gap-10 md:grid-cols-2">
              {/* Info column */}
              <div className="flex flex-col gap-5">
                <p className="text-muted-foreground leading-relaxed">
                  Unser Hauptsitz ist in Aachen, doch wir sind für unsere Kunden
                  deutschlandweit im Einsatz. Online-Gutachten ermöglichen eine
                  schnelle Fernbewertung – egal, wo sich Ihre Anlage befindet.
                </p>

                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MapPinIcon className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">
                      Büro Aachen
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {siteConfig.contact.address}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {siteConfig.contact.hours}
                    </p>
                    <a
                      className="mt-1 inline-block text-primary text-sm hover:underline"
                      href={`tel:${siteConfig.contact.phone}`}
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <GlobeIcon className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">
                      Bundesweiter Einsatz
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Vor-Ort-Prüfungen in ganz Deutschland. Anfahrt wird
                      transparent im Angebot ausgewiesen.
                    </p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-muted/40 text-muted-foreground">
                <MapPinIcon className="size-12 opacity-30" />
                <p className="font-medium text-sm">Karte wird geladen …</p>
                <p className="text-muted-foreground/60 text-xs">
                  Google Maps-Embed hier einsetzen
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {TRUST_BADGES.map(({ icon: Icon, title, desc }) => (
                <div
                  className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center"
                  key={title}
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{title}</p>
                    <p className="mt-0.5 text-muted-foreground text-xs">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quick CTA strip ───────────────────────────────────────── */}
        <div className="border-border border-t bg-muted/30 py-8">
          <div className="section-container">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-center text-muted-foreground text-sm sm:text-left">
                Sie möchten keinen Termin buchen, haben aber eine kurze Frage?
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 font-medium text-foreground text-sm transition-colors hover:border-primary/40 hover:text-primary"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  <MailIcon className="size-4" />
                  {siteConfig.contact.email}
                </a>
                <a
                  className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 font-medium text-foreground text-sm transition-colors hover:border-primary/40 hover:text-primary"
                  href={`tel:${siteConfig.contact.phone}`}
                >
                  <PhoneIcon className="size-4" />
                  {siteConfig.contact.phone}
                </a>
                <a
                  aria-label="WhatsApp schreiben"
                  className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 font-medium text-foreground text-sm transition-colors hover:border-[#25D366]/40 hover:text-[#25D366]"
                  href="https://wa.me/4915679790851"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    aria-hidden="true"
                    className="size-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
