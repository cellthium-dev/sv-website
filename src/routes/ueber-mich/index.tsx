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
      "Vor-Ort-PV-Bewertungen, technische Diagnosen und Leistungsanalysen",
      "Normkonforme Gutachten nach DIN/IEC bei Schadensfällen",
      "Risikobewertung, Dokumentenprüfung und Regulatorik-Beratung",
      "Beratung zu Reparierbarkeit, Sicherheit und Ertragsoptimierung",
    ],
  },
  {
    date: "seit 07/2023",
    title: "Senior Expert BMS | Battery | Validation",
    subtitle: "PEM Motion GmbH, Aachen",
    items: [
      "Entwicklung modularer Batterie- und Energiespeichersysteme (LFP/Na-Ion)",
      "Tests und Validierung nach UN 38.3, ECE R100, UL 991 & UL 1998",
      "Safety Engineer für Funktionale Sicherheit (ISO 26262 / IEC 61508)",
      "Technischer Projektleiter internationaler Energie- und BMS-Projekte",
    ],
  },
  {
    date: "10/2020 – 06/2023",
    title: "System Development Manager",
    subtitle: "Futavis GmbH, Aachen",
    items: [
      "Technische Anforderungsspezifikation für BMS & Batteriesysteme",
      "Safety Manager: Funktionale Sicherheit (ISO 26262) & Cybersecurity (ISO/SAE 21434)",
      "Qualitätsmanagement nach ISO 9001, IATF 16949 & Lieferantenaudits (VDA 6.3)",
    ],
  },
  {
    date: "10/2019 – 05/2020",
    title: "System Engineer – Batteriespeicher & E-Mobilität",
    subtitle: "E-Stream Energy GmbH & Co. KG, Mönchengladbach",
    items: [
      "Entwicklung und Konstruktion modularer Batteriespeichersysteme (19''-Rack, marktreif)",
      "HV-Prüfung und Installation von Batteriesystemen in Elektrofahrzeugen",
      "Risikobewertung für Batteriekonstruktion und HV-Sicherheitskonzepte",
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
    desc: "Seit 2016 arbeite ich kontinuierlich mit den Sicherheitsnormen ISO 26262 und IEC 61508 – von der Gefahrenanalyse (HARA) über FMEA/FTA bis zur Safety-Case-Dokumentation. Diese sicherheitstechnische Denkweise fließt in jedes Gutachten ein: Ich bewerte PV-Anlagen nicht nur nach Ertrag, sondern systematisch nach Risiko- und Schutzkonzepten.",
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
    desc: "Entwicklung, Integration und Validierung von Batteriemanagementsystemen (LFP, Na-Ion) nach UN 38.3, ECE R100, UL 991 und UL 1998 – insbesondere für PV-Speichersysteme habe ich ein tiefgehendes Verständnis der Zellchemie, Ladelogik und BMS-Kommunikation, das über das Prüfschema klassischer PV-Gutachter hinausgeht.",
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
    desc: "M.Sc. Elektrotechnik (RWTH Aachen), Schwerpunkt Energietechnik – mit internationaler Forschungserfahrung (Taiwan, Österreich). Ich bringe nicht nur Normenwissen mit, sondern kann Fehlerbilder auf Komponentenebene analysieren: von der Thermografie über I-V-Kennlinien bis hin zur FEM-Simulation.",
  },
];

const galleryPlaceholders = [
  "Außenansicht des fertigen Fahrzeugs",
  "Hochvolt-Batteriesystem im Einbauraum",
  "BMS-Integration und Verkabelung",
  "Motorraum mit E-Motor und Inverter",
];

const CameraIcon = () => (
  <svg
    aria-hidden={true}
    className="h-8 w-8 text-white/40"
    fill="none"
    role="presentation"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function UeberMich() {
  const pageRef = useScrollAnimation();

  return (
    <div className="min-h-screen bg-white" ref={pageRef}>
      <Header />
      <main>
        {/* ── section 1: HERO ── */}
        <section
          aria-label="Über Andreas Bauten"
          className="bg-muted py-20 md:py-28"
        >
          <div className="section-container">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Left – text */}
              <div>
                <Badge className="mb-5 bg-primary/10 font-semibold text-primary hover:bg-primary/10">
                  ISO/IEC 17024 Zertifizierter Sachverständiger
                </Badge>
                <h1 className="mb-2 font-extrabold text-4xl tracking-tight md:text-5xl">
                  Andreas Bauten, M.Sc.
                </h1>
                <p className="mb-5 font-semibold text-lg text-muted-foreground">
                  Sachverständiger für Photovoltaikanlagen
                </p>
                <p className="mb-8 max-w-lg text-muted-foreground leading-relaxed">
                  Als unabhängiger, nach DIN EN ISO/IEC 17024 zertifizierter
                  Sachverständiger für Photovoltaikanlagen verbinde ich über ein
                  Jahrzehnt Erfahrung in Energietechnik, Batteriesicherheit und
                  funktionaler Sicherheit mit der Fähigkeit, komplexe technische
                  Sachverhalte verständlich und praxisnah aufzubereiten.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link to="/kontakt">Kontakt aufnehmen</Link>
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
        <section className="bg-white px-6 py-[90px]">
          <div className="container mx-auto max-w-[1140px]">
            <div className="mb-14 translate-y-6 animate-on-scroll text-center opacity-0 transition-all duration-[600ms] ease-out">
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
        <section className="bg-muted px-6 py-[90px]">
          <div className="container mx-auto max-w-[1140px]">
            <div className="mb-12 translate-y-6 animate-on-scroll opacity-0 transition-all duration-[600ms] ease-out">
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
            <span className="mb-5 inline-block translate-y-6 animate-on-scroll rounded-full border border-[var(--solar)]/30 bg-[var(--solar)]/15 px-4 py-1.5 font-semibold text-[var(--solar)] text-xs uppercase tracking-widest opacity-0 transition-all duration-[600ms] ease-out">
              Besonderes Projekt
            </span>
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
              regulatorische Dokumentation auf höchstem Niveau.
            </p>

            <div className="grid gap-12 lg:grid-cols-2">
              <div className="translate-y-6 animate-on-scroll opacity-0 transition-all duration-[600ms] ease-out">
                <h3 className="mb-4 font-semibold text-[var(--solar)] text-xl">
                  Systemintegration & Entwicklung
                </h3>
                <ul className="mb-8 space-y-2">
                  {[
                    "Eigenständige Entwicklung der vollständigen EV-Antriebsarchitektur",
                    "E-Motor-Auswahl, Integration und Abstimmung mit Inverter & DC/DC-Wandler",
                    "Konstruktion eines maßgeschneiderten Hochvolt-Batteriesystems mit Sicherheitskonzept",
                    "BMS-Auslegung, Parametrierung, Kalibrierung und Validierung (inkl. Bluetooth-Monitoring)",
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
                    "Integration von Ladeelektronik (OBC), optimiert für öffentliche und private Ladeinfrastruktur",
                    "Komplettes E/E-Redesign mit CAN-Kommunikation und HV-Freigaben",
                    "Vollständige technische Dokumentation für die TÜV-Prüfung",
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
                  {galleryPlaceholders.map((label) => (
                    <div
                      className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-xl border border-white/30 border-dashed bg-white/10 transition-colors hover:bg-white/15"
                      key={label}
                    >
                      <CameraIcon />
                      <span className="px-3 text-center text-[13px] text-white/50">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 flex translate-y-6 animate-on-scroll flex-wrap justify-center gap-4 opacity-0 transition-all duration-[600ms] ease-out">
              {["HV-Kompetenz", "TÜV-EBE-Abnahme"].map((chip) => (
                <span
                  className="rounded-full border border-primary/40 bg-primary/25 px-6 py-2 font-semibold text-sm text-white"
                  key={chip}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── section 5: ZERTIFIZIERUNGEN ── */}
        <section className="bg-white px-6 py-[90px]">
          <div className="container mx-auto max-w-[1140px]">
            <div className="mb-14 translate-y-6 animate-on-scroll text-center opacity-0 transition-all duration-[600ms] ease-out">
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
        <section className="bg-muted px-6 py-[90px]">
          <div className="container mx-auto max-w-[1140px]">
            <div className="mb-12 translate-y-6 animate-on-scroll opacity-0 transition-all duration-[600ms] ease-out">
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
                      "Isolationsmessung & Erdungsprüfung",
                      "Schutzmaßnahmenprüfung nach VDE 0100-712",
                      "Ertragsdiagramm- und Monitoring-Datenanalyse",
                    ],
                  },
                  {
                    title: "Normen & Standards",
                    items: [
                      "VDE 0100-712, DIN EN 62446-1, IEC 62933/62619",
                      "ISO 26262, IEC 61508, ISO/SAE 21434",
                      "UN 38.3, ECE R100, DGUV-Regeln",
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
                      "PV*SOL, PVsyst – PV-Analyse & Simulation",
                    ],
                  },
                  {
                    title: "Spezielle Expertise",
                    items: [
                      "Bewertung Moduldegradation (LID/LeTID)",
                      "Analyse typischer Fehlerbilder (PID, Hotspots, Delamination, Mikrorisse)",
                      "Bewertung Batteriespeicher im PV-Kontext (Zellchemie, BMS-Logik, Ladeprofile)",
                      "Risikobasierte Entscheidungsmodelle (FMEA, FTA, HARA)",
                      "Interpretation Monitoring-Systeme (Fronius, SMA, Hoymiles, SolarEdge)",
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
        <section className="bg-white px-6 py-[90px] text-center">
          <div className="container mx-auto max-w-[1140px]">
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
                  className="rounded-full bg-muted px-[18px] py-1.5 font-medium text-foreground text-sm"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mb-10 translate-y-6 animate-on-scroll opacity-0 transition-all duration-[600ms] ease-out">
              <Link
                className="hover:-translate-y-0.5 inline-block rounded-lg bg-primary px-10 py-4 font-semibold text-base text-white transition-all hover:bg-[var(--dark-surface)]"
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
