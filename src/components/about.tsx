import { MapPinIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { TimelineItem } from "../types";

const timelineItems: TimelineItem[] = [
  {
    date: "seit 10/2020",
    title: "System Development Manager",
    company: "Futavis GmbH, Aachen",
    description: [
      "Anforderungsmanagement für BMS & Batteriesysteme",
      "Safety Manager für Functional Safety (ISO 26262) & Cyber Security (ISO/SAE 21434)",
      "Qualitätsmanagement nach ISO 9001 & IATF 16949",
      "Lieferantenaudits (VDA 6.3)",
    ],
  },
  {
    date: "10/2019 – 05/2020",
    title: "System Engineer",
    company: "E-Stream Energy GmbH & Co. KG",
    description: [
      'Entwicklung von 19"-Batteriespeicher-Racks',
      "Benchmarking von Batteriezellen & Modulen",
      "HV-Prüfung von Batteriesystemen",
      "Installation und Inbetriebnahme in Elektrofahrzeugen",
    ],
  },
  {
    date: "02/2019 – 08/2019",
    title: "Elektroingenieur",
    company: "ATESTEO GmbH & Co. KG, Alsdorf",
    description: [
      "Benchmarking von Hybrid- & EV-Antriebssträngen",
      "CAN-Bus-Dekodierung & Sensoranalyse",
      "Kommunikation Ladestation-Fahrzeug (CCS, ISO 15118)",
    ],
  },
  {
    date: "09/2015 – 02/2016",
    title: "Wissenschaftliche Hilfskraft",
    company: "Institut für Elektrische Maschinen, RWTH Aachen",
    description: ["FEM-Analyse & Modellierung von 3-Phasen-Transformatoren"],
  },
];

const certifications = [
  {
    label: "ISO-17024",
    detail: "freier Sachverständiger für Photovoltaikanlagen",
  },
  { label: "BDSF-Mitglied", detail: "Bundesverband der Sachverständigen" },
  { label: "ISO 26262:2018", detail: "Automotive Functional Safety Red Belt" },
  { label: "ISO/SAE 21434:2021", detail: "Automotive Cyber Security Red Belt" },
  { label: "DGUV 200-005", detail: "Hochvoltqualifikation QM 2c & QM 3a" },
  { label: "VDA 6.3", detail: "Lieferantenaudit" },
];

const competences = [
  {
    title: "Qualitätswerkzeuge",
    items: "FMEA, FTA, DOE, QFD, 8D, Six Sigma, APQP, 5s/5WHY, Risikofilter",
  },
  {
    title: "Prüfstandards",
    items:
      "DGUV V3, DGUV 314-003, ECE R 100, VDE 0701-702, DIN EN 61000, ISO 15118",
  },
  {
    title: "Software & Tools",
    items:
      "Matlab/Simulink, ANSYS, CANape, CANoe, Polarion ALM, LiBal BMS Creator",
  },
  {
    title: "Normenkompetenz",
    items: "ISO 26262, ISO 21434, ISO 9001, ISO 13849, ISO 21780, IATF 16949",
  },
];

export default function About() {
  return (
    <section
      className="scroll-mt-60 bg-muted/40 py-20 md:py-28"
      id="ueber-mich"
    >
      <div className="section-container">
        {/* Section header */}
        <div className="mb-14 max-w-2xl">
          <div className="section-label mb-4">
            <span className="solar-bar" />
            <span>Über mich</span>
          </div>
          <h2
            className="mb-4 font-extrabold text-4xl tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Kompetenz durch Expertise
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Als ISO-17024 zertifizierter Sachverständiger verfüge ich über
            umfassende akademische Ausbildung und langjährige praktische
            Erfahrung in der Energietechnik.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Credentials + Competences */}
          <div className="flex flex-col gap-8">
            {/* Academic path */}
            <div>
              <h3
                className="mb-4 font-bold text-xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Akademischer Werdegang
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  {
                    degree:
                      "M.Sc. Elektrotechnik, Informationstechnik und Technische Informatik",
                    institution: "RWTH Aachen (2016–2019)",
                    note: "Schwerpunkt: Energietechnik",
                  },
                  {
                    degree:
                      "B.Sc. Elektrotechnik, Informationstechnik und Technische Informatik",
                    institution: "RWTH Aachen (2011–2015)",
                    note: "Schwerpunkt: Energietechnik",
                  },
                  {
                    degree: "Auslandssemester",
                    institution:
                      "National Chiao Tung University (NCTU), Taiwan (2016)",
                    note: "",
                  },
                ].map((edu, i) => (
                  <div className="flex gap-3" key={i}>
                    <div className="flex flex-col items-center pt-1">
                      <div className="size-2 shrink-0 rounded-full bg-primary" />
                      {i < 2 && (
                        <div className="mt-1.5 min-h-4 w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div className="pb-2">
                      <p className="font-semibold text-foreground text-sm">
                        {edu.degree}
                      </p>
                      <p className="mt-0.5 text-muted-foreground text-sm">
                        {edu.institution}
                      </p>
                      {edu.note && (
                        <p className="mt-0.5 text-muted-foreground/70 text-xs">
                          {edu.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Certifications */}
            <div>
              <h3
                className="mb-4 font-bold text-xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Zertifizierungen & Qualifikationen
              </h3>
              <div className="flex flex-col gap-3">
                {certifications.map((cert) => (
                  <div className="flex items-start gap-3" key={cert.label}>
                    <Badge
                      className="mt-0.5 shrink-0 font-mono text-xs"
                      variant="secondary"
                    >
                      {cert.label}
                    </Badge>
                    <span className="text-muted-foreground text-sm">
                      {cert.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Technical competences */}
            <div>
              <h3
                className="mb-4 font-bold text-xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Technische Kompetenzen
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {competences.map((comp) => (
                  <Card className="bg-background" key={comp.title} size="sm">
                    <CardHeader>
                      <CardTitle className="font-semibold text-muted-foreground text-xs uppercase tracking-widest">
                        {comp.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/80 text-xs leading-relaxed">
                        {comp.items}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Timeline */}
          <div>
            <h3
              className="mb-6 font-bold text-xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Berufliche Expertise
            </h3>

            <div className="relative flex flex-col gap-0">
              {/* Timeline line */}
              <div className="absolute top-2 bottom-2 left-[7px] w-px bg-border" />

              {timelineItems.map((item, index) => (
                <div className="relative flex gap-6 pb-8 last:pb-0" key={index}>
                  {/* Dot */}
                  <div className="flex flex-col items-center">
                    <div className="relative z-10 mt-1 size-3.5 shrink-0 rounded-full border-2 border-primary bg-background" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 font-semibold text-primary text-xs uppercase tracking-wider">
                      {item.date}
                    </div>
                    <div className="mb-0.5 font-semibold text-base text-foreground">
                      {item.title}
                    </div>
                    <div className="mb-3 font-medium text-muted-foreground text-sm">
                      {item.company}
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {item.description.map((desc, i) => (
                        <li
                          className="text-foreground/70 text-sm leading-snug"
                          key={i}
                        >
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Location banner */}
            <div className="mt-8 flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3.5">
              <MapPinIcon className="size-5 shrink-0 text-primary" />
              <div className="text-sm">
                <span className="font-semibold">Standort: Aachen</span>
                <span className="text-muted-foreground">
                  {" "}
                  · Deutschlandweit tätig mit Schwerpunkt{" "}
                  <strong className="text-foreground">
                    Nordrhein-Westfalen
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
