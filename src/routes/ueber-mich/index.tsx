import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Footer from "../../components/footer";
import Header from "../../components/header";

export const Route = createFileRoute("/ueber-mich/")({
  component: UeberMich,
});

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-6");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const items = el.querySelectorAll(".animate-on-scroll");
    for (const item of items) {
      observer.observe(item);
    }
    return () => observer.disconnect();
  }, []);
  return ref;
}

const certCards = [
  {
    img: "/images/eucert-logo.png",
    alt: "EUcert Logo – Europäische Zertifizierung",
    title: "ISO/IEC 17024 Sachverständiger",
    desc: "Zertifizierter Sachverständiger für Photovoltaikanlagen | EUcert (CYF) | Gültig 2025–2030 | Cert-Nr: 1-25-1092",
  },
  {
    img: "/images/certx-logo.png",
    alt: "CertX Logo – Schweizer Zertifizierungsstelle",
    title: "Functional Safety Red Belt",
    desc: "ISO 26262:2018 – Automotive Functional Safety | CertX AG, Schweiz",
  },
  {
    img: "/images/certx-logo.png",
    alt: "CertX Logo – Schweizer Zertifizierungsstelle",
    title: "Automotive Cyber Security Red Belt",
    desc: "ISO/SAE 21434:2021 – Sichere Kommunikations- & Monitoring-Schnittstellen | CertX AG, Schweiz",
  },
  {
    img: "/images/waw-logo.png",
    alt: "WAW Logo – Westfälisches Ausbildungs-Werk",
    title: "Hochvolt-Qualifikation – Elektrofachkraft Stufe 3",
    desc: "DGUV 200-005 QM 2c & QM 3a – Sicherheitskritisches Arbeiten an Hochvoltsystemen | WAW GmbH & TÜV NORD Bildung",
  },
];

const timelineItems = [
  {
    date: "seit 07/2025",
    title: "Sachverständiger für Photovoltaikanlagen",
    subtitle:
      "Freiberuflich | ISO/IEC 17024 zertifiziert (EUcert, gültig bis 07/2030)",
    items: [
      "Gutachten bei Errichtungsmängeln, Minderertrag und Schadensfällen an PV-Anlagen",
      "Technische Diagnosen vor Ort: Thermografie, Kennlinienmessung, Elektrolumineszenz",
      "Risikobewertung, Dokumentenprüfung und Regulatorik-Beratung",
      "Baubegleitende Abnahme von PV-Neuanlagen und unabhängige Versicherungsgutachten",
      "Beratung zu Sicherheit, Reparierbarkeit und Ertragsoptimierung",
    ],
  },
  {
    date: "seit 07/2023",
    title: "Senior Expert | BMS | Battery | Validation",
    subtitle: "PEM Motion GmbH, Aachen",
    items: [
      "Entwicklung modularer Batterie- und Energiespeichersysteme (LFP, NMC, Na-Ion) für E-Mobilität und stationäre Anwendungen",
      "Tests und Validierung nach IEC 61508, ISO 26262, IEC 62619, IEC 62933-5-2, UN 38.3, UN ECE R100, UL 991 & UL 1998",
      "Safety Manager für Funktionale Sicherheit (ISO 26262 / IEC 61508) und Automotive Cyber Security (ISO/SAE 21434)",
      "BMS-Anforderungsmanagement und Qualitätssicherung (ISO 9001, IATF 16949, VDA 6.3) inkl. Informationssicherheit (ISO 27001, TISAX)",
      "Technischer Projektleiter internationaler Energie-, BESS- und BMS-Projekte",
    ],
  },
  {
    date: "10/2020 – 06/2023",
    title: "Head of Safety & Development | BMS | Battery Systems",
    subtitle: "Futavis GmbH, Aachen",
    items: [
      "Technische Anforderungsspezifikation für BMS & Batteriesysteme (LFP, NMC) als Schnittstelle zwischen Entwicklung, Kunden und Geschäftsführung",
      "Safety Manager: Funktionale Sicherheit (ISO 26262 / IEC 61508) & Automotive Cyber Security (ISO/SAE 21434)",
      "Qualitätsmanagement nach ISO 9001, IATF 16949 & Lieferantenaudits (VDA 6.3)",
      "Technischer Pivot für BMS-Anforderungen in Polarion ALM – von der Kundenspezifikation bis zur Verifikation",
    ],
  },
  {
    date: "10/2019 – 05/2020",
    title: "Lead Engineer | Battery Systems | Cell-to-Storage",
    subtitle: "E-Stream Energy GmbH & Co. KG, Mönchengladbach",
    items: [
      "Entwicklung und Konstruktion modularer Batteriespeichersysteme (19''-Rack, marktreif) für stationäre Anwendungen",
      "HV-Prüfung und Installation von Batteriesystemen in Elektrofahrzeugen inkl. Inbetriebnahme",
      "Risikobewertung für Batteriekonstruktion und HV-Sicherheitskonzepte (DGUV, ISO, VDE)",
      "Benchmarking von Batteriezellen und -modulen inkl. gewichteter Nutzwertanalyse zur Zellauswahl",
    ],
  },
];

const whyCards = [
  {
    icon: (
      <svg
        aria-hidden={true}
        className="size-6 text-primary"
        fill="none"
        role="presentation"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Fast 10 Jahre Funktionale Sicherheit",
    desc: "Seit 2016 arbeite ich kontinuierlich mit den Sicherheitsnormen ISO 26262 und IEC 61508 – von der Gefahrenanalyse (HARA) über FMEA/FTA bis zur Safety-Case-Dokumentation. Diese sicherheitstechnische Denkweise fließt in jedes Gutachten ein: Ich bewerte PV-Anlagen und Batteriespeicher nicht nur nach Ertrag, sondern systematisch nach Risiko-, Brand- und Schutzkonzepten.",
  },
  {
    icon: (
      <svg
        aria-hidden={true}
        className="size-6 text-primary"
        fill="none"
        role="presentation"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "BMS- & Batterieexperte",
    desc: "Entwicklung, Integration und Validierung von Batteriemanagementsystemen (BMS bzgl. LFP, NMC, Na-Ion) für PV-Speichersysteme und BESS nach IEC 60364-7-712, IEC 62619, IEC 62933-5-2, IEC 62109 und IEC 62485-5 – durch mein tiefgehendes Verständnis der Zellchemie, Ladelogik, BMS-Kommunikation und Systemarchitektur geht meine Analysetiefe weit über das Prüfschema klassischer PV-Gutachter hinaus.",
  },
  {
    icon: (
      <svg
        aria-hidden={true}
        className="size-6 text-primary"
        fill="none"
        role="presentation"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Ingenieur aus Überzeugung",
    desc: "M.Sc. Elektrotechnik (RWTH Aachen), Schwerpunkt Energietechnik – mit internationaler Erfahrung in Leistungselektronik und Energiesystemen (Taiwan, Österreich). Ich bringe nicht nur Normenwissen mit, sondern kann Fehler und Schäden an PV-Anlagen bis auf Komponentenebene analysieren: von der Thermografie über Elektrolumineszenz bis hin zur Kennlinienmessung.",
  },
];

function UeberMich() {
  const pageRef = useScrollAnimation();

  return (
    <div className="min-h-screen bg-white" ref={pageRef}>
      <Header />
      <main>
        {/* ── section 1: HERO ── */}
        <section aria-label="Über Andreas Bauten" className="py-20 md:py-28">
          <div className="section-container">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Left – text */}
              <div>
                <Badge className="mb-5 bg-primary/10 font-semibold text-primary hover:bg-primary/10">
                  ISO/IEC 17024 zertifiziert
                </Badge>

                <h1 className="mb-2 font-extrabold text-4xl tracking-tight md:text-5xl">
                  Andreas Bauten, M.Sc.
                </h1>
                <p className="mb-5 font-semibold text-lg text-muted-foreground">
                  Sachverständiger für Photovoltaikanlagen
                </p>
                <p className="mb-8 max-w-lg text-muted-foreground leading-relaxed">
                  Als nach ISO/IEC 17024 zertifizierter Sachverständiger für
                  Photovoltaikanlagen bringe ich über ein Jahrzehnt
                  Ingenieurserfahrung aus BMS-Entwicklung, Batteriesicherheit
                  und funktionaler Sicherheit mit – als BMS-Engineer, Safety
                  Manager und TÜV-abgenommener Elektrofahrzeug-Konstrukteur. Ich
                  bewerte PV-Anlagen und Speichersysteme nicht nur nach Ertrag,
                  sondern systematisch nach Risiko- und Schutzkonzepten. Vor Ort
                  setze ich Thermografie, Isolationsmessung, Kennlinienmessung
                  und Elektrolumineszenz ein. Mein tiefes Verständnis von
                  Zellchemie, BMS-Kommunikation und Systemarchitektur ermöglicht
                  eine Analyse bis auf Komponentenebene – normgerecht
                  dokumentiert.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link
                      hash="kontakt-formular"
                      search={{ tab: "anfrage" }}
                      to="/kontakt"
                    >
                      Kontakt aufnehmen
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/leistungen">Leistungen ansehen</Link>
                  </Button>
                </div>
              </div>

              {/* Right – seal image */}
              <div className="flex items-center justify-center">
                <img
                  alt="EUcert Zertifizierungssiegel – ISO/IEC 17024 – Andreas Bauten"
                  className="max-w-[260px] rotate-3 drop-shadow-xl transition-transform duration-500 hover:rotate-0 hover:scale-105"
                  height={260}
                  src="/images/siegel-3d.png"
                  width={260}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── section 2: WAS MICH AUSZEICHNET ── */}
        <section className="bg-muted/40 px-6 py-[90px]">
          <div className="container mx-auto max-w-[1140px]">
            <div className="mb-14 translate-y-6 animate-on-scroll text-center opacity-0 transition-all duration-[600ms] ease-out">
              <div className="section-label mb-3 justify-center">
                <span className="solar-bar" />
                <span>Expertise</span>
              </div>
              <h2 className="mb-4 font-semibold text-3xl text-foreground leading-snug">
                Was mich als Sachverständigen auszeichnet
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground">
                Meine Gutachten basieren nicht nur auf normativer Kompetenz,
                sondern auf jahrelanger praktischer Ingenieursarbeit an
                Batterie-, Sicherheits- und Hochvoltsystemen – Erfahrungswerte,
                die in rein theoretischen Prüfberichten fehlen.
              </p>
            </div>
            <div className="grid gap-7 md:grid-cols-3">
              {whyCards.map((card) => (
                <div
                  className="hover:-translate-y-1 translate-y-6 animate-on-scroll rounded-xl border border-border bg-white p-8 opacity-0 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-[600ms] ease-out hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
                  key={card.title}
                >
                  <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                    {card.icon}
                  </div>
                  <h3 className="mb-3 font-semibold text-primary text-xl leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-[15px] text-muted-foreground leading-[1.7]">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── section 3: BERUFLICHE MEILENSTEINE ── */}
        <section className="px-6 py-[90px]">
          <div className="container mx-auto max-w-[1140px]">
            <div className="mb-12 translate-y-6 animate-on-scroll opacity-0 transition-all duration-[600ms] ease-out">
              <div className="section-label mb-3">
                <span className="solar-bar" />
                <span>Berufserfahrung</span>
              </div>
              <h2 className="font-semibold text-3xl text-foreground leading-snug">
                Berufliche Meilensteine
              </h2>
            </div>
            <div className="relative border-primary border-l-2 pl-10">
              {timelineItems.map((item) => (
                <div
                  className="relative mb-12 translate-y-6 animate-on-scroll opacity-0 transition-all duration-[600ms] ease-out last:mb-0"
                  key={item.title}
                >
                  <div className="-left-[47px] absolute top-0 size-3 rounded-full border-[3px] border-background bg-primary ring-1 ring-primary" />
                  <div className="rounded-xl border border-border bg-white p-7 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                    <span className="mb-1.5 block font-semibold text-primary text-sm tracking-[0.3px]">
                      {item.date}
                    </span>
                    <h3 className="mb-1 font-semibold text-foreground text-xl">
                      {item.title}
                    </h3>
                    <p className="mb-3 text-[15px] text-muted-foreground italic">
                      {item.subtitle}
                    </p>
                    <ul className="space-y-1.5">
                      {item.items.map((li) => (
                        <li
                          className="relative pl-5 text-[15px] text-muted-foreground leading-[1.6]"
                          key={li}
                        >
                          <span className="absolute top-[10px] left-0 block h-1.5 w-1.5 rounded-full bg-primary" />
                          {li}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── section 4: BMW PROJEKT ── */}
        <section className="relative overflow-hidden bg-[var(--dark-surface)] px-6 py-[90px]">
          <div className="-right-[100px] -top-[100px] pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(26,115,181,0.1)_0%,transparent_70%)]" />
          <div className="container mx-auto max-w-[1140px]">
            <div className="section-label mb-5">
              <span className="solar-bar" />
              <span className="text-primary brightness-150">
                Projekterfahrung
              </span>
            </div>

            <h2 className="mb-2 translate-y-6 animate-on-scroll font-semibold text-3xl text-white leading-snug opacity-0 transition-all duration-[600ms] ease-out">
              Vollständige Elektrifizierung eines BMW 3 (Baujahr 1978)
            </h2>
            <p className="mb-6 translate-y-6 animate-on-scroll text-[var(--dark-surface-foreground)]/80 text-lg opacity-0 transition-all duration-[600ms] ease-out">
              Privates Ingenieursprojekt | 2020–2023 | Mit TÜV-EBE-Abnahme und
              Straßenzulassung
            </p>
            <p className="mb-12 max-w-[700px] translate-y-6 animate-on-scroll text-[var(--dark-surface-foreground)]/80 leading-[1.75] opacity-0 transition-all duration-[600ms] ease-out">
              Was als persönliche Leidenschaft begann, wurde zum umfassendsten
              Kompetenznachweis meiner Ingenieurslaufbahn: die vollständige
              Elektrifizierung eines klassischen BMW 3er – von der leeren
              Karosserie bis zur bestandenen TÜV-Einzelbetriebserlaubnis (EBE)
              für den öffentlichen Straßenverkehr. Dieses Projekt vereint
              Systemarchitektur, Hochvoltsicherheit, BMS-Engineering und
              regulatorische Dokumentation auf höchstem Niveau – Kompetenzen,
              die ich heute unmittelbar in meine Arbeit als Sachverständiger für
              Photovoltaikanlagen und Batteriespeichersysteme einbringe.
            </p>

            <div className="grid gap-12 lg:grid-cols-2">
              <div className="translate-y-6 animate-on-scroll opacity-0 transition-all duration-[600ms] ease-out">
                <h3 className="mb-4 font-semibold text-[var(--solar)] text-xl">
                  Systemintegration & Entwicklung
                </h3>
                <ul className="mb-8 space-y-2">
                  {[
                    "Eigenständige Entwicklung der vollständigen EV-Antriebsarchitektur – vom Konzept über die Auslegung bis zur Umsetzung",
                    "E-Motor-Auswahl, Integration und Abstimmung mit Inverter & DC/DC-Wandler",
                    "Konstruktion eines maßgeschneiderten Hochvolt-Batteriesystems mit HV-Sicherheitskonzept nach DGUV und VDE",
                    "Umrüstung der analogen Tankanzeige auf batteriebasierte SoC-Anzeige und Integration einer Bluetooth-Schnittstelle zur mobilen HV-Batterieüberwachung via App",
                    "BMS-Auslegung, Parametrierung, Kalibrierung und Validierung",
                  ].map((li) => (
                    <li
                      className="relative pl-5 text-[15px] text-[var(--dark-surface-foreground)]/80 leading-[1.6]"
                      key={li}
                    >
                      <span className="absolute top-[10px] left-0 block h-1.5 w-1.5 rounded-full bg-[var(--solar)]" />
                      {li}
                    </li>
                  ))}
                </ul>
                <h3 className="mb-4 font-semibold text-[var(--solar)] text-xl">
                  Zulassung & Dokumentation
                </h3>
                <ul className="space-y-2">
                  {[
                    "Integration von Ladeelektronik (OBC) mit CCS-Ladekommunikation nach IEC 61851, optimiert für öffentliche und private Ladeinfrastruktur",
                    "Komplettes E/E-Redesign mit CAN-Kommunikation und HV-Freigaben",
                    "Vollständige technische Dokumentation für die TÜV-Prüfung nach §21 StVZO",
                    "Erfolgreiche TÜV-EBE-Abnahme – Nachweis höchster System-, Sicherheits- und Integrationskompetenz",
                  ].map((li) => (
                    <li
                      className="relative pl-5 text-[15px] text-[var(--dark-surface-foreground)]/80 leading-[1.6]"
                      key={li}
                    >
                      <span className="absolute top-[10px] left-0 block h-1.5 w-1.5 rounded-full bg-[var(--solar)]" />
                      {li}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="overflow-x-auto sm:overflow-visible">
                <div className="grid min-w-[520px] translate-y-6 animate-on-scroll grid-cols-2 gap-4 opacity-0 transition-all duration-[600ms] ease-out sm:min-w-0">
                  {[
                    {
                      src: "/about-me/bmw-1.JPG",
                      alt: "Außenansicht des fertigen Fahrzeugs",
                    },
                    {
                      src: "/about-me/bmw-2.JPG",
                      alt: "Hochvolt-Batteriesystem im Einbauraum",
                    },
                    {
                      src: "/about-me/bmw-3.JPG",
                      alt: "BMS-Integration und Verkabelung",
                    },
                    {
                      src: "/about-me/bmw-4.JPG",
                      alt: "Motorraum mit E-Motor und Inverter",
                    },
                  ].map(({ src, alt }) => (
                    <img
                      alt={alt}
                      className="aspect-[4/3] w-full rounded-xl object-cover"
                      key={src}
                      src={src}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 flex translate-y-6 animate-on-scroll flex-wrap justify-center gap-4 opacity-0 transition-all duration-[600ms] ease-out">
              {["HV-Kompetenz", "TÜV-EBE-Abnahme"].map((chip) => (
                <Badge
                  className="bg-blue-50 font-semibold text-primary hover:bg-blue-50"
                  key={chip}
                >
                  {chip}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* ── section 5: ZERTIFIZIERUNGEN ── */}
        <section className="bg-muted/40 px-6 py-[90px]">
          <div className="container mx-auto max-w-[1140px]">
            <div className="mb-14 translate-y-6 animate-on-scroll text-center opacity-0 transition-all duration-[600ms] ease-out">
              <div className="section-label mb-3 justify-center">
                <span className="solar-bar" />
                <span>Zertifizierungen</span>
              </div>
              <h2 className="mb-4 font-semibold text-3xl text-foreground leading-snug">
                Zertifizierungen & Qualifikationen
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground">
                Offiziell zertifizierte Kompetenz – jede Qualifikation durch
                anerkannte Institutionen bestätigt.
              </p>
            </div>
            <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {certCards.map((cert) => (
                <div
                  className="hover:-translate-y-1 flex translate-y-6 animate-on-scroll flex-col items-center rounded-xl border border-border bg-white p-8 text-center opacity-0 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-[600ms] ease-out hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
                  key={cert.title}
                >
                  <div className="mb-5 flex h-20 items-center justify-center">
                    <img
                      alt={cert.alt}
                      className="max-h-20 max-w-full object-contain"
                      height={80}
                      src={cert.img}
                      width={120}
                    />
                  </div>
                  <h3 className="mb-2.5 flex min-h-[44px] items-center justify-center font-semibold text-[17px] text-primary leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-[1.6]">
                    {cert.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="translate-y-6 animate-on-scroll border-border border-t pt-6 text-center opacity-0 transition-all duration-[600ms] ease-out">
              <p className="text-muted-foreground text-sm">
                Zusätzlich: Qualitätserfahrung nach ISO 9001, IATF 16949 sowie
                Lieferantenaudit-Kompetenz (VDA 6.3)
              </p>
            </div>
          </div>
        </section>

        {/* ── section 6: TECHNISCHE KOMPETENZEN ── */}
        <section className="px-6 py-[90px]">
          <div className="container mx-auto max-w-[1140px]">
            <div className="mb-12 translate-y-6 animate-on-scroll opacity-0 transition-all duration-[600ms] ease-out">
              <div className="section-label mb-3">
                <span className="solar-bar" />
                <span>Kompetenzen</span>
              </div>
              <h2 className="font-semibold text-3xl text-foreground leading-snug">
                Technische Kompetenzen
              </h2>
            </div>
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="space-y-8">
                {[
                  {
                    title: "Mess- & Prüfverfahren",
                    items: [
                      "Thermografie (Modulhotspots, Anschlussfehler, Dioden-Defekte)",
                      "I-V-Kennlinienmessung & Stringanalyse",
                      "Elektrolumineszenz-Prüfung (Mikrorisse, Zellbrüche, inaktive Zellbereiche)",
                      "Isolationsmessung & Erdungsprüfung",
                      "Schutzmaßnahmenprüfung nach VDE 0100-712 (IEC 60364-7-712)",
                      "Ertragsdiagramm- und Monitoring-Datenanalyse",
                    ],
                  },
                  {
                    title: "Normen & Standards",
                    items: [
                      "IEC 60364-7-712 (VDE 0100-712), IEC 62446-1, IEC 61730, IEC 61215",
                      "IEC 62619, IEC 63056, IEC 62933-5-2, IEC 62485-5",
                      "ISO 26262, IEC 61508, ISO/SAE 21434",
                      "UN 38.3, UN ECE R100, DGUV Information 200-005",
                      "VDE-AR-N 4105, VDE-AR-E 2510-50",
                    ],
                  },
                ].map((group) => (
                  <div
                    className="translate-y-6 animate-on-scroll opacity-0 transition-all duration-[600ms] ease-out"
                    key={group.title}
                  >
                    <h3 className="mb-4 border-primary/15 border-b-2 pb-2 font-semibold text-primary text-xl">
                      {group.title}
                    </h3>
                    <ul className="space-y-2">
                      {group.items.map((li) => (
                        <li
                          className="relative pl-5 text-[15px] text-muted-foreground leading-[1.6]"
                          key={li}
                        >
                          <span className="absolute top-[10px] left-0 block h-1.5 w-1.5 rounded-full bg-primary" />
                          {li}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="space-y-8">
                {[
                  {
                    title: "Tools & Software",
                    items: [
                      "APIS IQ-FMEA, Polarion ALM, CodeBeamer ALM",
                      "Matlab/Simulink, CANoe/CANape",
                      "Altium Designer, LTSpice, PSpice",
                      "ANSYS FEM, LabView",
                      "PV*SOL, PVsyst – PV-Ertragsanalyse & Speichersimulation",
                      "Monitoring-Plattformen: Fronius Solar.web, SMA Sunny Portal, SolarEdge, Hoymiles S-Miles",
                    ],
                  },
                  {
                    title: "Spezielle Expertise",
                    items: [
                      "Bewertung Moduldegradation (LID/LeTID) und Alterungsanalyse",
                      "Analyse typischer Fehlerbilder (PID, Hotspots, Delamination, Mikrorisse, Schneckenspuren)",
                      "Bewertung Batteriespeicher im PV-Kontext (Zellchemie, BMS-Logik, Ladeprofile, Thermomanagement)",
                      "Risikobasierte Entscheidungsmodelle (FMEA, FTA, HARA)",
                      "Interpretation Monitoring-Systeme (Fronius, SMA, Hoymiles, SolarEdge) und Ertragsabweichungsanalyse",
                    ],
                  },
                ].map((group) => (
                  <div
                    className="translate-y-6 animate-on-scroll opacity-0 transition-all duration-[600ms] ease-out"
                    key={group.title}
                  >
                    <h3 className="mb-4 border-primary/15 border-b-2 pb-2 font-semibold text-primary text-xl">
                      {group.title}
                    </h3>
                    <ul className="space-y-2">
                      {group.items.map((li) => (
                        <li
                          className="relative pl-5 text-[15px] text-muted-foreground leading-[1.6]"
                          key={li}
                        >
                          <span className="absolute top-[10px] left-0 block h-1.5 w-1.5 rounded-full bg-primary" />
                          {li}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── section 7: STANDORT & CTA ── */}
        <section className="bg-muted/40 px-6 py-[90px] text-center">
          <div className="container mx-auto max-w-[1140px]">
            <div className="section-label mb-3 justify-center">
              <span className="solar-bar" />
              <span>Standort</span>
            </div>
            <h2 className="mb-4 translate-y-6 animate-on-scroll font-semibold text-3xl text-foreground leading-snug opacity-0 transition-all duration-[600ms] ease-out">
              Standort & Tätigkeitsbereich
            </h2>
            <p className="mx-auto mb-8 max-w-[700px] translate-y-6 animate-on-scroll text-muted-foreground opacity-0 transition-all duration-[600ms] ease-out">
              Standort: Aachen, Nordrhein-Westfalen. Bundesweit tätig mit
              Schwerpunkt NRW, Rheinland, Ruhrgebiet und Niederrhein.
              Online-Gutachten und Ferndiagnosen deutschlandweit möglich.
            </p>
            <div className="mb-10 flex translate-y-6 animate-on-scroll flex-wrap justify-center gap-2.5 opacity-0 transition-all duration-[600ms] ease-out">
              {[
                "Aachen",
                "NRW",
                "Rheinland",
                "Ruhrgebiet",
                "Niederrhein",
                "Bundesweit",
              ].map((tag) => (
                <span
                  className="rounded-full px-[18px] py-1.5 font-medium text-foreground text-sm"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mb-10 translate-y-6 animate-on-scroll opacity-0 transition-all duration-[600ms] ease-out">
              <Link
                className="hover:-translate-y-0.5 inline-block rounded-lg bg-primary px-10 py-4 font-semibold text-base text-white transition-all hover:bg-primary/90"
                hash="kontakt-formular"
                search={{ tab: "termin" }}
                to="/kontakt"
              >
                Jetzt Beratung anfragen
              </Link>
            </div>
            <div className="flex translate-y-6 animate-on-scroll justify-center opacity-0 transition-all duration-[600ms] ease-out">
              <img
                alt="Offizieller Stempel – Andreas Bauten, zertifizierter Sachverständiger"
                className="w-[110px] opacity-70 grayscale-[20%] transition-opacity hover:opacity-90"
                height={110}
                src="/images/stempel.png"
                width={110}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
