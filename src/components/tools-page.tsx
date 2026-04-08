import { Link } from "@tanstack/react-router";
import {
  ActivityIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
  BarChart2Icon,
  BatteryChargingIcon,
  BatteryIcon,
  BotIcon,
  CalculatorIcon,
  CarIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CoinsIcon,
  EuroIcon,
  FileTextIcon,
  GitMergeIcon,
  HomeIcon,
  InfoIcon,
  LanguagesIcon,
  LeafIcon,
  RefreshCwIcon,
  SendIcon,
  SunIcon,
  ZapIcon,
} from "lucide-react";
import { type ReactNode, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// ── Calculation helpers ──────────────────────────────────────────────────────

const REF_YIELDS: Record<string, number> = {
  norddeutschland: 880,
  mitteldeutschland: 950,
  sueddeutschland: 1050,
  oesterreich_nord: 970,
  oesterreich_sued: 1100,
  schweiz_mittelland: 1000,
  schweiz_alpen: 1150,
};
const REF_LABELS: Record<string, string> = {
  norddeutschland: "Norddeutschland",
  mitteldeutschland: "Mitteldeutschland",
  sueddeutschland: "Süddeutschland",
  oesterreich_nord: "Österreich Nord",
  oesterreich_sued: "Österreich Süd",
  schweiz_mittelland: "Schweiz Mittelland",
  schweiz_alpen: "Schweiz Alpenregion",
};
const ORIENTATION_FACTORS: Record<string, number> = {
  sued: 1.0,
  suedost_suedwest: 0.95,
  ost_west: 0.85,
  nord: 0.55,
};
const ORIENTATION_LABELS: Record<string, string> = {
  sued: "Süd",
  suedost_suedwest: "Südost/Südwest",
  ost_west: "Ost/West",
  nord: "Nord",
};
const TILT_FACTORS: Record<string, number> = {
  flach: 0.93,
  leicht: 0.97,
  mittel: 1.0,
  steil: 0.92,
};

function fmt(n: number, d = 0) {
  return n.toLocaleString("de-DE", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
}
function fmtE(n: number) {
  return n.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function calcSollErtrag(
  kwp: number,
  standort: string,
  ausrichtung: string,
  neigung: string,
  alter: number
): number {
  const ref = REF_YIELDS[standort] ?? 950;
  const ori = ORIENTATION_FACTORS[ausrichtung] ?? 1;
  const tilt = TILT_FACTORS[neigung] ?? 1;
  const deg = (1 - 0.005) ** alter;
  return kwp * ref * ori * tilt * deg;
}

const EV_TABLE: [number, number][] = [
  [0.25, 0.8],
  [0.5, 0.55],
  [0.75, 0.38],
  [1.0, 0.3],
  [1.25, 0.25],
  [1.5, 0.22],
  [2.0, 0.17],
];
function getEigenverbrauch(ratio: number): number {
  if (ratio <= 0.25) return 0.85;
  if (ratio >= 2.0) return 0.15;
  for (let i = 0; i < EV_TABLE.length - 1; i++) {
    if (ratio >= EV_TABLE[i][0] && ratio <= EV_TABLE[i + 1][0]) {
      const t =
        (ratio - EV_TABLE[i][0]) / (EV_TABLE[i + 1][0] - EV_TABLE[i][0]);
      return EV_TABLE[i][1] + t * (EV_TABLE[i + 1][1] - EV_TABLE[i][1]);
    }
  }
  return 0.17;
}

const SPEICHER_TABLE: [number, number][] = [
  [0.5, 0.1],
  [1.0, 0.2],
  [1.5, 0.25],
  [2.0, 0.28],
];
function getSpeicherZusatz(spezGr: number): number {
  if (spezGr <= 0) return 0;
  if (spezGr >= 2.0) return 0.28;
  if (spezGr <= 0.5) return (spezGr / 0.5) * 0.1;
  for (let i = 0; i < SPEICHER_TABLE.length - 1; i++) {
    if (spezGr >= SPEICHER_TABLE[i][0] && spezGr <= SPEICHER_TABLE[i + 1][0]) {
      const t =
        (spezGr - SPEICHER_TABLE[i][0]) /
        (SPEICHER_TABLE[i + 1][0] - SPEICHER_TABLE[i][0]);
      return (
        SPEICHER_TABLE[i][1] +
        t * (SPEICHER_TABLE[i + 1][1] - SPEICHER_TABLE[i][1])
      );
    }
  }
  return 0.28;
}

// ── C1 Translator fallback DB ────────────────────────────────────────────────

type TranslationResult = {
  erklaerung: string;
  risikostufe: "gruen" | "gelb" | "rot";
  leistungsverweis: string;
};

const TRANSLATIONS_FALLBACK: Record<string, TranslationResult> = {
  vref_error: {
    erklaerung:
      "Ein VRef_Error (Referenzspannungsfehler) bedeutet, dass der Wechselrichter eine Abweichung in der internen Referenzspannung festgestellt hat. Dies kann auf eine Alterung elektronischer Bauteile oder ein Problem mit der Spannungsversorgung hindeuten.",
    risikostufe: "gelb",
    leistungsverweis: "Fehlerdiagnose & Schadenanalyse",
  },
  "string voltage mismatch": {
    erklaerung:
      "Ein String Voltage Mismatch bedeutet, dass der Wechselrichter unterschiedliche Spannungen zwischen den Modulsträngen erkennt. Mögliche Ursachen: verschattete oder defekte Module, fehlerhafte Steckverbindungen oder Bypassdioden-Defekte.",
    risikostufe: "gelb",
    leistungsverweis: "Fehlerdiagnose & Schadenanalyse",
  },
  "inverter fault": {
    erklaerung:
      "Ein interner Wechselrichterfehler wurde erkannt – häufig im Bereich der Leistungselektronik. Je nach Hersteller kann es sich um einen Überstrom, einen Erdschluss oder einen Defekt an einem IGBT-Modul handeln.",
    risikostufe: "rot",
    leistungsverweis: "Wechselrichter-Diagnose & Batteriespeicher-Prüfung",
  },
  "iso-fehler": {
    erklaerung:
      "Ein Isolationsfehler zeigt an, dass der Wechselrichter einen zu niedrigen Isolationswiderstand zwischen den Solarmodul-Leitern und Erde gemessen hat. Isolationsfehler können ein Sicherheitsrisiko (Brandgefahr, Stromschlag) darstellen.",
    risikostufe: "rot",
    leistungsverweis: "Fehlerdiagnose & Schadenanalyse",
  },
  derating: {
    erklaerung:
      "Derating bedeutet, dass der Wechselrichter seine Leistung automatisch reduziert, um sich vor Überlastung oder Überhitzung zu schützen. Häufige Ursachen: unzureichende Belüftung oder zu hohe Umgebungstemperatur.",
    risikostufe: "gelb",
    leistungsverweis: "Ertragsprüfung & Wirtschaftlichkeit",
  },
  pid: {
    erklaerung:
      "PID (Potential Induced Degradation) ist ein Degradationseffekt, bei dem hohe Spannungsdifferenzen zu Leistungsverlusten führen. Betroffene Module können 30–80 % ihrer Leistung einbüßen.",
    risikostufe: "rot",
    leistungsverweis: "Fehlerdiagnose & Schadenanalyse",
  },
  hotspot: {
    erklaerung:
      "Ein Hotspot ist eine lokal überhitzte Stelle auf einem Solarmodul. Hotspots können zu irreversiblen Zellschäden und im Extremfall zu Brandgefahr führen.",
    risikostufe: "rot",
    leistungsverweis: "Fehlerdiagnose & Schadenanalyse",
  },
};

function findFallbackTranslation(input: string): TranslationResult {
  const key = input
    .toLowerCase()
    .replace(/[^a-zäöüß0-9\s_-]/g, "")
    .trim();
  for (const [k, v] of Object.entries(TRANSLATIONS_FALLBACK)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  const isError = /error|fehler|fault|mismatch|warning|alarm|störung/i.test(
    input
  );
  return {
    erklaerung: isError
      ? `Die Fehlermeldung „${input}" deutet auf eine Störungsanzeige hin. Ohne genaue Zuordnung zum Hersteller lässt sich die Ursache nicht eindeutig bestimmen. Mögliche Ursachen reichen von harmlosen Kommunikationsfehlern bis zu ernsthaften Komponentendefekten.`
      : `Der Begriff „${input}" beschreibt einen technischen Parameter Ihrer PV-Anlage. Die genaue Bedeutung hängt vom Hersteller und Gerätetyp ab. Eine fachkundige Einordnung kann klären, ob Handlungsbedarf besteht.`,
    risikostufe: isError ? "gelb" : "gruen",
    leistungsverweis: "Fehlerdiagnose & Schadenanalyse",
  };
}

// ── C2 Chat KB ───────────────────────────────────────────────────────────────

type ChatMsg = { text: string; isUser: boolean };

const CHAT_KB: Record<string, string> = {
  ablauf:
    "Ein Gutachten läuft in fünf Schritten ab:\n**1. Kontaktaufnahme** – Sie schildern Ihr Anliegen.\n**2. Erstgespräch** – Wir klären Details und Umfang.\n**3. Angebot** – Transparentes Festpreisangebot.\n**4. Vor-Ort-Prüfung** – Messtechnische Untersuchung (Thermografie, Kennlinienmessung, Sichtprüfung).\n**5. Gutachten & Empfehlung** – Schriftlicher Bericht mit Handlungsempfehlungen.",
  kosten:
    "Die Kosten hängen vom Umfang der Begutachtung ab. Typische Richtwerte:\n• **Kurzgutachten / Fernbewertung:** ab ca. 300–500 EUR\n• **Vor-Ort-Begutachtung (Standardanlage):** ab ca. 800–1.500 EUR\n• **Umfassendes Gutachten (Gerichtsgutachten):** individuell nach Aufwand\n\nSie erhalten stets ein transparentes Festpreisangebot vor Auftragserteilung.",
  unterlagen:
    "Für eine effiziente Begutachtung sind hilfreich:\n• Datenblätter der Module und Wechselrichter\n• Monitoring-Daten der letzten 12 Monate\n• Installationsprotokoll (DIN EN 62446)\n• Fotos der Anlage\n• Ggf. Versicherungsunterlagen oder Schriftverkehr\n\nKeine Sorge – wir arbeiten auch mit unvollständigen Unterlagen.",
  leistung:
    "Unser Leistungsspektrum umfasst:\n• Fehlerdiagnose & Schadenanalyse\n• Anlagenabnahme & Inbetriebnahmeprüfung\n• Ertragsprüfung & Wirtschaftlichkeit\n• Schadensgutachten & Versicherungsfälle\n• Wechselrichter-Diagnose & Batteriespeicher-Prüfung\n• Second Opinion\n• Technische Beratung & Projektbegleitung\n• Online-Gutachten & Ferndiagnose",
  normen:
    "Wir arbeiten nach anerkannten technischen Normen:\n• **VDE 0100-712** – Errichten von Niederspannungsanlagen (PV)\n• **DIN EN 62446** – Prüfung und Dokumentation von PV-Systemen\n• **IEC 61724** – Leistungsüberwachung von PV-Systemen\n• **IEC 61215** – Bauarteignungsprüfung kristalliner PV-Module\n• **IEC 62109** – Sicherheit von Wechselrichtern",
};

function getLocalChatResponse(q: string): string {
  const lower = q.toLowerCase();
  if (
    lower.includes("ablauf") ||
    lower.includes("wie läuft") ||
    lower.includes("prozess") ||
    lower.includes("schritte")
  )
    return CHAT_KB.ablauf;
  if (
    lower.includes("kosten") ||
    lower.includes("preis") ||
    lower.includes("was kostet") ||
    lower.includes("teuer")
  )
    return CHAT_KB.kosten;
  if (
    lower.includes("unterlagen") ||
    lower.includes("dokument") ||
    lower.includes("mitbringen")
  )
    return CHAT_KB.unterlagen;
  if (
    lower.includes("leistung") ||
    lower.includes("service") ||
    lower.includes("was bieten")
  )
    return CHAT_KB.leistung;
  if (
    lower.includes("norm") ||
    lower.includes("vde") ||
    lower.includes("din") ||
    lower.includes("iec")
  )
    return CHAT_KB.normen;
  if (
    lower.includes("fehler") ||
    lower.includes("störung") ||
    lower.includes("defekt")
  )
    return "Aus dem, was Sie schildern, könnte ein technisches Problem vorliegen. Eine messtechnische Überprüfung – etwa Thermografie, Kennlinienmessung oder Wechselrichterdiagnose – wäre der empfohlene nächste Schritt. Möchten Sie mehr über den Ablauf einer solchen Prüfung erfahren?";
  if (lower.includes("ertrag") || lower.includes("weniger"))
    return "Ertragsminderungen können vielfältige Ursachen haben – von Verschattung über Moduldefekte bis zu Wechselrichterproblemen. Eine professionelle Ertragsprüfung mit Monitoring-Datenauswertung identifiziert die Ursache präzise.";
  if (
    lower.includes("versicher") ||
    lower.includes("hagel") ||
    lower.includes("sturm")
  )
    return "Bei einem Versicherungsschaden ist eine unabhängige sachverständige Dokumentation besonders wichtig. Wir erstellen normkonforme Schadensgutachten, die von Versicherungen anerkannt werden.";
  if (
    lower.includes("speicher") ||
    lower.includes("batterie") ||
    lower.includes("akku")
  )
    return "Batteriespeichersysteme erfordern eine spezialisierte Prüfung – insbesondere hinsichtlich Kapazitätsdegradation, Systemkommunikation und Sicherheit. Wir bieten sowohl Prüfungen bestehender Speicher als auch Dimensionierungsberatung an.";
  return "Vielen Dank für Ihre Nachricht. Ich helfe Ihnen gerne bei Fragen zum Ablauf, zu Kosten, Unterlagen oder Leistungen weiter. Können Sie Ihr Anliegen etwas genauer beschreiben? Zum Beispiel: Um welche Anlage geht es? Was ist das Problem oder Ihr Ziel?";
}

// ── D Schnellcheck data ──────────────────────────────────────────────────────

type FollowUpQuestion = { key: string; q: string; opts: string[] };

const FOLLOW_UPS: Record<string, FollowUpQuestion[]> = {
  ertrag: [
    {
      key: "seit_wann",
      q: "Seit wann beobachten Sie die Minderleistung?",
      opts: ["< 1 Monat", "1–6 Monate", "> 6 Monate", "Seit Inbetriebnahme"],
    },
    {
      key: "monitoring",
      q: "Haben Sie Zugang zu Monitoring-Daten?",
      opts: ["Ja, digital", "Ja, nur Zählerstand", "Nein"],
    },
    {
      key: "alter",
      q: "Wie alt ist Ihre Anlage?",
      opts: ["< 2 Jahre", "2–10 Jahre", "> 10 Jahre"],
    },
  ],
  fehler: [
    {
      key: "komponente",
      q: "An welcher Komponente tritt die Meldung auf?",
      opts: ["Wechselrichter", "Monitoring/App", "Speichersystem", "Unbekannt"],
    },
    {
      key: "haeufigkeit",
      q: "Tritt die Meldung dauerhaft oder sporadisch auf?",
      opts: ["Dauerhaft", "Sporadisch", "Nur bei bestimmtem Wetter"],
    },
    {
      key: "leistung",
      q: "Hat sich die Erzeugungsleistung verändert?",
      opts: [
        "Ja, deutlich weniger",
        "Ja, Totalausfall",
        "Nein, scheint normal",
        "Kann ich nicht beurteilen",
      ],
    },
  ],
  schaden: [
    {
      key: "art",
      q: "Welche Art von Beschädigung?",
      opts: [
        "Glasbruch/Risse",
        "Verfärbungen/Braunfärbung",
        "Brandspuren",
        "Hagelschäden",
        "Sturmschäden",
        "Sonstiges",
      ],
    },
    {
      key: "zeitpunkt",
      q: "Wann ist der Schaden aufgetreten?",
      opts: ["Nach Unwetter", "Schleichend", "Bei Inspektion", "Unbekannt"],
    },
    {
      key: "versicherung",
      q: "Wurde der Schaden der Versicherung gemeldet?",
      opts: ["Ja", "Nein", "Keine Versicherung"],
    },
  ],
  kaufverkauf: [
    {
      key: "richtung",
      q: "Möchten Sie kaufen oder verkaufen?",
      opts: ["Kaufen (Due Diligence)", "Verkaufen (Wertgutachten)"],
    },
    {
      key: "groesse",
      q: "Wie groß ist die Anlage?",
      opts: ["< 10 kWp", "10–100 kWp", "> 100 kWp"],
    },
    {
      key: "doku",
      q: "Liegt eine aktuelle Dokumentation vor?",
      opts: ["Ja, vollständig", "Teilweise", "Nein"],
    },
  ],
  konflikt: [
    {
      key: "thema",
      q: "Um was geht es?",
      opts: [
        "Gewährleistungsanspruch",
        "Versicherungsschaden",
        "Mangelhafte Installation",
        "Ertragsgarantie nicht eingehalten",
        "Sonstiges",
      ],
    },
    {
      key: "verfahren",
      q: "Gibt es bereits Schriftverkehr oder ein Verfahren?",
      opts: [
        "Ja, außergerichtlich",
        "Ja, gerichtlich",
        "Nein, noch in Klärung",
      ],
    },
  ],
  neuanlage: [
    {
      key: "stadium",
      q: "In welchem Stadium befindet sich die Anlage?",
      opts: [
        "Vor Baubeginn (Planprüfung)",
        "Während Installation",
        "Fertiggestellt, Abnahme steht an",
      ],
    },
    {
      key: "wunsch",
      q: "Was wünschen Sie?",
      opts: ["Baubegleitung", "Abnahmeprüfung", "Beides", "Unsicher"],
    },
  ],
  sonstiges: [],
};

type ScResult = {
  color: "green" | "yellow" | "red";
  banner: string;
  detail: string;
  service: string;
};

function getScResult(situation: string): ScResult {
  switch (situation) {
    case "ertrag":
      return {
        color: "yellow",
        banner:
          "Es gibt Hinweise auf ein Problem – eine professionelle Prüfung wäre sinnvoll.",
        detail:
          "Ertragsminderungen können vielfältige Ursachen haben: Verschattung, Moduldegradation, Wechselrichterverluste oder partielle Moduldefekte.",
        service:
          "Empfohlen: Ertragsprüfung mit Monitoring-Datenauswertung und Vergleichsanalyse.",
      };
    case "fehler":
      return {
        color: "red",
        banner:
          "Ihre Schilderung deutet auf einen ernstzunehmenden Mangel hin – zeitnahes Handeln ist empfohlen.",
        detail:
          "Fehlermeldungen können auf Isolationsfehler, Erdschlüsse, Komponentendefekte oder Kommunikationsprobleme hindeuten.",
        service:
          "Empfohlen: Fehlerdiagnose mit Thermografie, Kennlinienmessung, Wechselrichterdiagnose.",
      };
    case "schaden":
      return {
        color: "red",
        banner:
          "Ihre Schilderung deutet auf einen ernstzunehmenden Mangel hin – zeitnahes Handeln ist empfohlen.",
        detail:
          "Sichtbare Beschädigungen können die Sicherheit und den Ertrag erheblich beeinträchtigen. Eine zeitnahe Dokumentation ist besonders bei Versicherungsfällen entscheidend.",
        service:
          "Empfohlen: Schadensgutachten mit Thermografie und fotografischer Dokumentation.",
      };
    case "kaufverkauf":
      return {
        color: "yellow",
        banner:
          "Eine unabhängige technische Bewertung schützt Käufer und Verkäufer.",
        detail:
          "Eine Due-Diligence-Prüfung schafft Transparenz über den tatsächlichen Anlagenzustand und -wert.",
        service:
          "Empfohlen: Due-Diligence-Prüfung bzw. Wertgutachten mit technischer Bestandsaufnahme.",
      };
    case "konflikt":
      return {
        color: "red",
        banner:
          "Bei Konflikten ist eine unabhängige Bewertung besonders wichtig.",
        detail:
          "Ein normkonformes Sachverständigengutachten bildet die Grundlage für eine sachliche Klärung.",
        service:
          "Empfohlen: Unabhängiges Sachverständigengutachten zur Dokumentation und Bewertung.",
      };
    case "neuanlage":
      return {
        color: "green",
        banner:
          "Ihre Situation klingt unkritisch – eine unabhängige Abnahme ist dennoch empfehlenswert.",
        detail:
          "Eine Abnahmeprüfung stellt sicher, dass die Anlage normkonform installiert ist und optimal arbeitet.",
        service:
          "Empfohlen: Anlagenabnahme nach DIN EN 62446-1 mit Sichtprüfung und messtechnischer Prüfung.",
      };
    default:
      return {
        color: "yellow",
        banner:
          "Es gibt Hinweise auf ein Problem – eine professionelle Prüfung wäre sinnvoll.",
        detail:
          "Ohne genauere Informationen empfehlen wir ein unverbindliches Erstgespräch.",
        service:
          "Empfohlen: Unverbindliches Erstgespräch zur Klärung Ihres Anliegens.",
      };
  }
}

// ── Shared UI helpers ────────────────────────────────────────────────────────

function CalcDisclaimer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-lg border border-border bg-muted/40 px-4 py-3 text-muted-foreground text-xs leading-relaxed">
      {children}
    </div>
  );
}

function CalcCta({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-4">
      <Button asChild className="gap-2" size="sm">
        <Link to={href as "/kontakt"}>
          {label}
          <ArrowRightIcon className="size-3.5" />
        </Link>
      </Button>
    </div>
  );
}

function ResultCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="font-bold text-2xl text-foreground">{value}</p>
      {hint && <p className="text-muted-foreground text-xs">{hint}</p>}
    </div>
  );
}

function Ampel({
  color,
  text,
}: {
  color: "green" | "yellow" | "red";
  text: string;
}) {
  const cls = {
    green: "bg-emerald-500 text-white",
    yellow: "bg-amber-400 text-gray-900",
    red: "bg-red-500 text-white",
  };
  return (
    <div
      className={cn(
        "mt-3 rounded-lg px-4 py-2.5 font-semibold text-sm",
        cls[color]
      )}
    >
      {text}
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
  id,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  id: string;
}) {
  return (
    <div className="mb-8" id={id}>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </span>
        <h2
          className="font-extrabold text-2xl text-foreground tracking-tight md:text-3xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h2>
      </div>
      <p className="text-muted-foreground leading-relaxed">{subtitle}</p>
    </div>
  );
}

// ── C1 – Übersetzer ──────────────────────────────────────────────────────────

function TranslatorSection() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const translate = () => {
    if (!input.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(findFallbackTranslation(input.trim()));
      setLoading(false);
    }, 600);
  };

  const riskConfig = {
    gruen: {
      cls: "bg-emerald-500 text-white",
      label: "Unkritisch – Beobachten genügt",
    },
    gelb: {
      cls: "bg-amber-400 text-gray-900",
      label: "Potenzielles Risiko – Prüfung empfohlen",
    },
    rot: {
      cls: "bg-red-500 text-white",
      label: "Handlungsbedarf – Zeitnahe Prüfung ratsam",
    },
  };

  return (
    <>
      <Dialog onOpenChange={(open) => !open && setResult(null)} open={!!result}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mb-1 flex items-center gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <LanguagesIcon className="size-4" />
              </span>
              <DialogTitle>{input.trim()}</DialogTitle>
            </div>
            <DialogDescription>
              KI-Fachjargon-Übersetzer · Erste Orientierung
            </DialogDescription>
          </DialogHeader>

          {result && (
            <div className="space-y-3">
              <p className="text-foreground/80 text-sm leading-relaxed">
                {result.erklaerung}
              </p>
              <div
                className={cn(
                  "rounded-lg px-3 py-2 font-semibold text-xs",
                  riskConfig[result.risikostufe].cls
                )}
              >
                {riskConfig[result.risikostufe].label}
              </div>
              <p className="text-muted-foreground text-xs">
                <span className="font-semibold">Passende Leistung:</span>{" "}
                {result.leistungsverweis}
              </p>
              <p className="text-muted-foreground/60 text-xs italic">
                Diese Ersteinschätzung bietet Orientierung und ersetzt keine
                professionelle Fehlerdiagnose.
              </p>
            </div>
          )}

          <DialogFooter>
            <Button asChild size="sm">
              <Link to="/kontakt">Beratung anfragen</Link>
            </Button>
            <DialogClose asChild>
              <Button onClick={() => setInput("")} size="sm" variant="outline">
                Schließen
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <LanguagesIcon className="size-5" />
          </span>
          <div>
            <h3 className="font-bold text-foreground">
              KI-Fachjargon-Übersetzer
            </h3>
            <p className="text-muted-foreground text-xs">
              Fehlermeldungen verständlich erklärt – kostenlos & sofort
            </p>
          </div>
        </div>

        <div className="relative mb-3 flex-1">
          <Textarea
            className="h-full text-sm"
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              "z.\u00a0B. \u201eVRef_Error\u201c, \u201eString voltage mismatch\u201c, \u201eIso-Fehler\u201c, \u201eDerating Wechselrichter\u201c\u2026"
            }
            rows={4}
            value={input}
          />
          <span className="absolute right-2 bottom-2 text-muted-foreground text-xs">
            {input.length}/500
          </span>
        </div>

        <Button
          className="w-full gap-2 font-semibold"
          disabled={!input.trim() || loading}
          onClick={translate}
        >
          {loading ? (
            <>
              <RefreshCwIcon className="size-4 animate-spin" />
              Wird analysiert…
            </>
          ) : (
            <>
              <ArrowRightIcon className="size-4" />
              Übersetzen
            </>
          )}
        </Button>
      </div>
    </>
  );
}

// ── C2 – Chatbot ─────────────────────────────────────────────────────────────

const QUICK_ACTIONS = [
  "Wie läuft ein Gutachten ab?",
  "Was kostet ein Gutachten?",
  "Welche Unterlagen brauche ich?",
  "Welche Leistungen bieten Sie an?",
  "Nach welchen Normen arbeiten Sie?",
];

function renderChatText(text: string) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: static render
      <p className="mb-0.5" key={i}>
        {parts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**") ? (
            // biome-ignore lint/suspicious/noArrayIndexKey: static render
            <strong key={j}>{part.slice(2, -2)}</strong>
          ) : (
            part
          )
        )}
      </p>
    );
  });
}

function ChatbotCard({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <BotIcon className="size-5" />
        </span>
        <div>
          <h3 className="font-bold text-foreground">KI-Erstberater</h3>
          <p className="text-muted-foreground text-xs">
            Fragen zu Ablauf, Kosten, Unterlagen und Leistungen
          </p>
        </div>
      </div>
      <p className="mb-3 flex-1 text-muted-foreground text-sm">
        Haben Sie Fragen zum Ablauf, zu Kosten oder zu benötigten Unterlagen?
        Unser Chatbot hilft bei der ersten Orientierung.
      </p>
      <Button className="w-full gap-2 font-semibold" onClick={onOpen}>
        <BotIcon className="size-4" />
        Chatbot öffnen
      </Button>
    </div>
  );
}

function ChatbotSection({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      text: "Guten Tag! Ich bin Ihr digitaler PV-Erstberater. Wie kann ich Ihnen heute helfen?",
      isUser: false,
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const addMsg = (text: string, isUser: boolean) => {
    setMessages((prev) => [...prev, { text, isUser }]);
    setTimeout(
      () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
      50
    );
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    addMsg(text, true);
    const response = getLocalChatResponse(text);
    setTimeout(() => addMsg(response, false), 500);
  };

  const handleSend = () => {
    sendMessage(inputVal);
    setInputVal("");
  };

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && (
        <div className="flex w-[min(360px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-border border-b bg-muted/40 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BotIcon className="size-4" />
              </span>
              <div>
                <p className="font-semibold text-foreground text-sm leading-none">
                  KI-Erstberater
                </p>
                <p className="mt-0.5 text-muted-foreground text-xs">
                  Erste Orientierung · Kein Ersatz für Gutachten
                </p>
              </div>
            </div>
            <Button
              className="size-7 shrink-0"
              onClick={() => setOpen(false)}
              size="icon"
              variant="ghost"
            >
              <ChevronDownIcon className="size-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex max-h-72 flex-col gap-2 overflow-y-auto bg-muted/10 p-3">
            {messages.map((m, i) => (
              <div
                className={cn(
                  "max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed",
                  m.isUser
                    ? "self-end bg-primary text-primary-foreground"
                    : "self-start bg-card text-foreground shadow-sm"
                )}
                // biome-ignore lint/suspicious/noArrayIndexKey: static list
                key={i}
              >
                {renderChatText(m.text)}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-1.5 border-border border-t px-3 py-2">
            {QUICK_ACTIONS.map((q) => (
              <button
                className="rounded-full border border-border px-2.5 py-0.5 text-muted-foreground text-xs transition-colors hover:border-primary/40 hover:text-primary"
                key={q}
                onClick={() => sendMessage(q)}
                type="button"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 border-border border-t px-3 py-3">
            <Input
              className="flex-1 text-sm"
              maxLength={500}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ihre Frage…"
              value={inputVal}
            />
            <Button
              disabled={!inputVal.trim()}
              onClick={handleSend}
              size="icon"
            >
              <SendIcon className="size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* FAB */}
      <Button
        aria-label={open ? "Chatbot schließen" : "Chatbot öffnen"}
        className="h-14 gap-2.5 rounded-full pr-5 pl-4 shadow-lg"
        onClick={() => setOpen(!open)}
        size="lg"
      >
        <BotIcon className="size-5" />
        <span className="font-semibold text-sm">KI-Erstberater</span>
      </Button>
    </div>
  );
}

// ── C3 – Online-Gutachten ────────────────────────────────────────────────────

function GutachtenCard() {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-lg bg-solar/20 text-solar-foreground">
          <FileTextIcon className="size-5" />
        </span>
        <div>
          <h3 className="font-bold text-foreground">
            Online-Gutachten (Fernbewertung)
          </h3>
        </div>
      </div>
      <p className="mb-4 flex-1 text-muted-foreground text-sm leading-relaxed">
        Sichtbare Schäden? Ertragsminderung? Streit mit dem Installateur? Laden
        Sie Fotos und Dokumente hoch – wir prüfen und bewerten innerhalb von 48
        Stunden.
      </p>
      <ul className="mb-5 space-y-1.5">
        {[
          "Express-Rückmeldung innerhalb 24–48 Stunden",
          "Bild-Upload & Dokumentenanalyse",
          "Digitales Gutachten (PDF)",
          "Bundesweit – ohne Vor-Ort-Termin",
        ].map((f) => (
          <li className="flex items-center gap-2 text-sm" key={f}>
            <CheckIcon className="size-3.5 shrink-0 text-emerald-500" />
            <span className="text-muted-foreground">{f}</span>
          </li>
        ))}
      </ul>
      <Button asChild className="gap-2 font-semibold">
        <Link to="/kontakt">
          <FileTextIcon className="size-4" />
          Online-Gutachten starten
        </Link>
      </Button>
    </div>
  );
}

// ── D – Schnellcheck ─────────────────────────────────────────────────────────

type ScStage =
  | { phase: "q1" }
  | { phase: "q2" }
  | { phase: "followup"; idx: number }
  | { phase: "result" };

function SchnellcheckSection() {
  const [stage, setStage] = useState<ScStage>({ phase: "q1" });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [followUps, setFollowUps] = useState<FollowUpQuestion[]>([]);
  const [result, setResult] = useState<ScResult | null>(null);

  const systemOpts = [
    {
      value: "pv_only",
      label: "PV-Anlage ohne Speicher",
      icon: <SunIcon className="size-8" />,
    },
    {
      value: "pv_battery",
      label: "PV-Anlage mit Batteriespeicher",
      icon: <BatteryChargingIcon className="size-8" />,
    },
    {
      value: "battery_only",
      label: "Batteriespeicher allein",
      icon: <BatteryIcon className="size-8" />,
    },
  ];

  const situationOpts = [
    { value: "ertrag", label: "Anlage liefert weniger Ertrag als erwartet" },
    {
      value: "fehler",
      label: "Fehlermeldung am Wechselrichter oder im Monitoring",
    },
    {
      value: "schaden",
      label: "Sichtbare Beschädigungen an Modulen oder Komponenten",
    },
    {
      value: "kaufverkauf",
      label: "Anlage vor einem Kauf/Verkauf prüfen lassen",
    },
    { value: "konflikt", label: "Konflikt mit Installateur oder Versicherung" },
    { value: "neuanlage", label: "Neuanlage vor Inbetriebnahme prüfen lassen" },
    { value: "sonstiges", label: "Sonstiges / Ich bin unsicher" },
  ];

  const pickSystem = (v: string) => {
    setAnswers((a) => ({ ...a, system: v }));
    setStage({ phase: "q2" });
  };

  const pickSituation = (v: string) => {
    setAnswers((a) => ({ ...a, situation: v }));
    const fus = FOLLOW_UPS[v] ?? [];
    setFollowUps(fus);
    if (fus.length === 0) {
      setResult(getScResult(v));
      setStage({ phase: "result" });
    } else {
      setStage({ phase: "followup", idx: 0 });
    }
  };

  const pickFollowUp = (key: string, val: string, idx: number) => {
    setAnswers((a) => ({ ...a, [key]: val }));
    const next = idx + 1;
    if (next >= followUps.length) {
      setResult(getScResult(answers.situation ?? "sonstiges"));
      setStage({ phase: "result" });
    } else {
      setStage({ phase: "followup", idx: next });
    }
  };

  const reset = () => {
    setStage({ phase: "q1" });
    setAnswers({});
    setFollowUps([]);
    setResult(null);
  };

  const totalSteps = 2 + followUps.length + 1;
  const currentStep =
    stage.phase === "q1"
      ? 1
      : stage.phase === "q2"
        ? 2
        : stage.phase === "followup"
          ? 3 + stage.idx
          : totalSteps;
  const progressPct =
    stage.phase === "result"
      ? 100
      : ((currentStep - 1) / (totalSteps - 1)) * 100;

  const resultColors = {
    green: "border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20",
    yellow: "border-amber-200 bg-amber-50 dark:bg-amber-950/20",
    red: "border-red-200 bg-red-50 dark:bg-red-950/20",
  };
  const resultBannerColors = {
    green: "bg-emerald-500 text-white",
    yellow: "bg-amber-400 text-gray-900",
    red: "bg-red-500 text-white",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Progress bar */}
      <div className="h-1.5 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="p-6 md:p-8">
        {/* Q1 – System */}
        {stage.phase === "q1" && (
          <div>
            <p className="mb-1 text-muted-foreground text-xs uppercase tracking-widest">
              Schritt 1 von {totalSteps}
            </p>
            <h3 className="mb-5 font-bold text-foreground text-xl">
              Um welche Art von System geht es?
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {systemOpts.map((o) => (
                <button
                  className="flex flex-col items-center gap-2 rounded-xl border border-border p-4 text-center transition-all hover:border-primary/40 hover:bg-primary/5"
                  key={o.value}
                  onClick={() => pickSystem(o.value)}
                  type="button"
                >
                  <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {o.icon}
                  </span>
                  <span className="font-medium text-foreground text-sm">
                    {o.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Q2 – Situation */}
        {stage.phase === "q2" && (
          <div>
            <p className="mb-1 text-muted-foreground text-xs uppercase tracking-widest">
              Schritt 2 von {totalSteps}
            </p>
            <h3 className="mb-5 font-bold text-foreground text-xl">
              Was beschreibt Ihre Situation am besten?
            </h3>
            <div className="flex flex-col gap-2">
              {situationOpts.map((o) => (
                <button
                  className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-left transition-all hover:border-primary/40 hover:bg-primary/5"
                  key={o.value}
                  onClick={() => pickSituation(o.value)}
                  type="button"
                >
                  <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
                  <span className="text-foreground text-sm">{o.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Follow-up questions */}
        {stage.phase === "followup" && (
          <div>
            <p className="mb-1 text-muted-foreground text-xs uppercase tracking-widest">
              Schritt {3 + stage.idx} von {totalSteps}
            </p>
            <h3 className="mb-5 font-bold text-foreground text-xl">
              {followUps[stage.idx].q}
            </h3>
            <div className="flex flex-col gap-2">
              {followUps[stage.idx].opts.map((o) => (
                <button
                  className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-left transition-all hover:border-primary/40 hover:bg-primary/5"
                  key={o}
                  onClick={() =>
                    pickFollowUp(
                      followUps[
                        (stage as { phase: "followup"; idx: number }).idx
                      ].key,
                      o,
                      (stage as { phase: "followup"; idx: number }).idx
                    )
                  }
                  type="button"
                >
                  <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
                  <span className="text-foreground text-sm">{o}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {stage.phase === "result" && result && (
          <div
            className={cn("rounded-xl border p-5", resultColors[result.color])}
          >
            <div
              className={cn(
                "mb-4 rounded-lg px-4 py-2.5 font-semibold text-sm",
                resultBannerColors[result.color]
              )}
            >
              {result.banner}
            </div>
            <p className="mb-3 text-foreground text-sm leading-relaxed">
              {result.detail}
            </p>
            <p className="mb-4 font-medium text-foreground text-sm">
              {result.service}
            </p>
            <p className="mb-4 text-muted-foreground text-xs italic">
              Diese Ersteinschätzung basiert auf Ihren Angaben und ersetzt keine
              professionelle Vor-Ort-Begutachtung.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm">
                <Link to="/kontakt">Jetzt unverbindlich anfragen</Link>
              </Button>
              <Button
                className="gap-1.5"
                onClick={reset}
                size="sm"
                variant="outline"
              >
                <RefreshCwIcon className="size-3.5" />
                Schnellcheck erneut starten
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Collapsible calc wrapper ──────────────────────────────────────────────────

function CalcTool({
  id,
  icon,
  title,
  badge,
  children,
}: {
  id: string;
  icon: ReactNode;
  title: string;
  badge: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
      id={id}
    >
      <button
        className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-muted/30"
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </span>
        <div className="flex-1">
          <p className="font-bold text-foreground">{title}</p>
          <p className="text-muted-foreground text-xs">{badge}</p>
        </div>
        <ChevronDownIcon
          className={cn(
            "size-5 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="border-border border-t px-6 py-5">{children}</div>
      )}
    </div>
  );
}

function FormGroup({
  label,
  tooltip,
  children,
}: {
  label: string;
  tooltip?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm" title={tooltip}>
        {label}
        {tooltip && (
          <span
            className="cursor-help text-muted-foreground text-xs"
            title={tooltip}
          >
            <InfoIcon className="size-4" />
          </span>
        )}
      </Label>
      {children}
    </div>
  );
}

// ── E1 – Soll-Ertrags-Rechner ─────────────────────────────────────────────────

function CalcE1() {
  const [kwp, setKwp] = useState("");
  const [standort, setStandort] = useState("");
  const [ausrichtung, setAusrichtung] = useState("sued");
  const [neigung, setNeigung] = useState("mittel");
  const [alter, setAlter] = useState("0");
  const [result, setResult] = useState<{
    ertrag: number;
    spez: number;
    warn: boolean;
  } | null>(null);

  const calc = () => {
    const k = Number.parseFloat(kwp);
    if (!(k && standort)) return;
    const ertrag = calcSollErtrag(
      k,
      standort,
      ausrichtung,
      neigung,
      Number.parseInt(alter) || 0
    );
    setResult({ ertrag, spez: ertrag / k, warn: ertrag / k < 750 });
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FormGroup
          label="Anlagenleistung (kWp)"
          tooltip="Die Nennleistung Ihrer PV-Anlage. Typische Hausanlagen: 5–15 kWp."
        >
          <Input
            min="0.1"
            onChange={(e) => setKwp(e.target.value)}
            placeholder="z. B. 10"
            step="0.1"
            type="number"
            value={kwp}
          />
        </FormGroup>
        <FormGroup
          label="Standort"
          tooltip="Die solare Einstrahlung variiert regional erheblich."
        >
          <Select onValueChange={setStandort} value={standort}>
            <SelectTrigger>
              <SelectValue placeholder="Bitte wählen" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(REF_LABELS).map(([k, v]) => (
                <SelectItem key={k} value={k}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormGroup>
        <FormGroup
          label="Dachausrichtung"
          tooltip="Südausrichtung erzielt den höchsten Ertrag."
        >
          <Select onValueChange={setAusrichtung} value={ausrichtung}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(ORIENTATION_LABELS).map(([k, v]) => (
                <SelectItem key={k} value={k}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormGroup>
        <FormGroup
          label="Dachneigung"
          tooltip="Optimaler Neigungswinkel in der DACH-Region: ca. 30–35°."
        >
          <Select onValueChange={setNeigung} value={neigung}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flach">Flachdach (0–10°)</SelectItem>
              <SelectItem value="leicht">Leichte Neigung (10–25°)</SelectItem>
              <SelectItem value="mittel">Mittlere Neigung (25–40°)</SelectItem>
              <SelectItem value="steil">Steile Neigung (40–60°)</SelectItem>
            </SelectContent>
          </Select>
        </FormGroup>
        <FormGroup
          label="Alter der Anlage (Jahre)"
          tooltip="Module degradieren ca. 0,5 % pro Jahr."
        >
          <Input
            max="40"
            min="0"
            onChange={(e) => setAlter(e.target.value)}
            type="number"
            value={alter}
          />
        </FormGroup>
      </div>
      <Button className="mt-4 gap-2" onClick={calc}>
        <CalculatorIcon className="size-4" />
        Berechnen
      </Button>
      {result && (
        <div className="mt-5 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <ResultCard
              hint={`Spezifischer Ertrag: ${fmt(result.spez)} kWh/kWp`}
              label="Geschätzter Jahresertrag"
              value={`${fmt(result.ertrag)} kWh`}
            />
          </div>
          {result.warn && (
            <Ampel
              color="yellow"
              text="Dieser Wert liegt unter dem üblichen Minimum – prüfen Sie Ihre Eingaben."
            />
          )}
          <CalcDisclaimer>
            Ein tatsächlicher Ertrag deutlich unter diesem Schätzwert kann auf
            Verschattung, Moduldefekte oder Wechselrichterprobleme hindeuten.
          </CalcDisclaimer>
          <CalcCta href="/kontakt" label="Ertragsprüfung anfragen" />
        </div>
      )}
    </>
  );
}

// ── E2 – Soll-Ist-Ertragsvergleich ───────────────────────────────────────────

function CalcE2() {
  const [ist, setIst] = useState("");
  const [kwp, setKwp] = useState("");
  const [standort, setStandort] = useState("");
  const [ausrichtung, setAusrichtung] = useState("sued");
  const [neigung, setNeigung] = useState("mittel");
  const [alter, setAlter] = useState("0");
  const [result, setResult] = useState<{
    quotient: number;
    soll: number;
    color: "green" | "yellow" | "red";
    text: string;
  } | null>(null);

  const calc = () => {
    const i = Number.parseFloat(ist);
    const k = Number.parseFloat(kwp);
    if (!(i && k && standort)) return;
    const soll = calcSollErtrag(
      k,
      standort,
      ausrichtung,
      neigung,
      Number.parseInt(alter) || 0
    );
    const q = (i / soll) * 100;
    let color: "green" | "yellow" | "red";
    let text: string;
    if (q >= 90) {
      color = "green";
      text = "Ihr Ertrag liegt im erwartbaren Bereich.";
    } else if (q >= 75) {
      color = "yellow";
      text =
        "Ihr Ertrag liegt spürbar unter dem Erwartungswert. Mögliche Ursachen: Verschattung, Moduldegradation oder Wechselrichterverluste.";
    } else {
      color = "red";
      text =
        "Ihr Ertrag weicht erheblich vom Erwartungswert ab – ein deutlicher Hinweis auf ein technisches Problem.";
    }
    setResult({ quotient: q, soll, color, text });
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FormGroup label="Tatsächlicher Jahresertrag (kWh)">
          <Input
            onChange={(e) => setIst(e.target.value)}
            placeholder="z. B. 8500"
            type="number"
            value={ist}
          />
        </FormGroup>
        <FormGroup label="Anlagenleistung (kWp)">
          <Input
            onChange={(e) => setKwp(e.target.value)}
            placeholder="z. B. 10"
            step="0.1"
            type="number"
            value={kwp}
          />
        </FormGroup>
        <FormGroup label="Standort">
          <Select onValueChange={setStandort} value={standort}>
            <SelectTrigger>
              <SelectValue placeholder="Bitte wählen" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(REF_LABELS).map(([k, v]) => (
                <SelectItem key={k} value={k}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormGroup>
        <FormGroup label="Dachausrichtung">
          <Select onValueChange={setAusrichtung} value={ausrichtung}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(ORIENTATION_LABELS).map(([k, v]) => (
                <SelectItem key={k} value={k}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormGroup>
        <FormGroup label="Dachneigung">
          <Select onValueChange={setNeigung} value={neigung}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flach">Flachdach (0–10°)</SelectItem>
              <SelectItem value="leicht">Leichte Neigung (10–25°)</SelectItem>
              <SelectItem value="mittel">Mittlere Neigung (25–40°)</SelectItem>
              <SelectItem value="steil">Steile Neigung (40–60°)</SelectItem>
            </SelectContent>
          </Select>
        </FormGroup>
        <FormGroup label="Alter der Anlage (Jahre)">
          <Input
            max="40"
            min="0"
            onChange={(e) => setAlter(e.target.value)}
            type="number"
            value={alter}
          />
        </FormGroup>
      </div>
      <Button className="mt-4 gap-2" onClick={calc}>
        <CalculatorIcon className="size-4" />
        Berechnen
      </Button>
      {result && (
        <div className="mt-5 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <ResultCard
              hint={`Sollertrag: ${fmt(result.soll)} kWh`}
              label="Erreichter Soll-Anteil"
              value={`${fmt(result.quotient, 1)} %`}
            />
          </div>
          <Ampel color={result.color} text={result.text} />
          <CalcDisclaimer>
            Dieser Vergleich basiert auf regionalen Durchschnittswerten. Lokale
            Besonderheiten werden nicht abgebildet. Erst eine professionelle
            Ertragsprüfung ermittelt die tatsächliche Performance Ratio nach IEC
            61724.
          </CalcDisclaimer>
          <CalcCta href="/kontakt" label="Ertragsprüfung anfragen" />
        </div>
      )}
    </>
  );
}

// ── E3 – Eigenverbrauch & Autarkiegrad ───────────────────────────────────────

function CalcE3() {
  const [verbrauch, setVerbrauch] = useState("");
  const [ertrag, setErtrag] = useState("");
  const [hatSpeicher, setHatSpeicher] = useState(false);
  const [speicherKwh, setSpeicherKwh] = useState("");
  const [result, setResult] = useState<{
    ev: number;
    autarkie: number;
    einspeisung: number;
  } | null>(null);

  const calc = () => {
    const v = Number.parseFloat(verbrauch);
    const e = Number.parseFloat(ertrag);
    if (!(v && e)) return;
    const ratio = e / v;
    let ev = getEigenverbrauch(ratio);
    if (hatSpeicher) {
      const sk = Number.parseFloat(speicherKwh) || 0;
      if (sk > 0) {
        const kwpApprox = e / 950;
        ev = Math.min(ev + getSpeicherZusatz(sk / kwpApprox), 0.9);
      }
    }
    setResult({
      ev: ev * 100,
      autarkie: ((e * ev) / v) * 100,
      einspeisung: (1 - ev) * 100,
    });
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormGroup
          label="Jahresstromverbrauch (kWh)"
          tooltip="Ihren Verbrauch finden Sie auf Ihrer Jahresstromrechnung."
        >
          <Input
            onChange={(e) => setVerbrauch(e.target.value)}
            placeholder="z. B. 4000"
            type="number"
            value={verbrauch}
          />
        </FormGroup>
        <FormGroup
          label="PV-Jahresertrag (kWh)"
          tooltip="Den Ertrag finden Sie im Monitoring-Portal Ihres Wechselrichters."
        >
          <Input
            onChange={(e) => setErtrag(e.target.value)}
            placeholder="z. B. 9500"
            type="number"
            value={ertrag}
          />
        </FormGroup>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <input
          checked={hatSpeicher}
          className="size-4 accent-primary"
          id="e3-speicher"
          onChange={(e) => setHatSpeicher(e.target.checked)}
          type="checkbox"
        />
        <Label className="cursor-pointer text-sm" htmlFor="e3-speicher">
          Ich habe einen Batteriespeicher
        </Label>
      </div>
      {hatSpeicher && (
        <div className="mt-3">
          <FormGroup label="Speicherkapazität (kWh)">
            <Input
              className="max-w-xs"
              onChange={(e) => setSpeicherKwh(e.target.value)}
              placeholder="z. B. 10"
              type="number"
              value={speicherKwh}
            />
          </FormGroup>
        </div>
      )}
      <Button className="mt-4 gap-2" onClick={calc}>
        <CalculatorIcon className="size-4" />
        Berechnen
      </Button>
      {result && (
        <div className="mt-5 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <ResultCard
              hint={`${fmt(result.einspeisung, 0)} % wird ins Netz eingespeist.`}
              label="Eigenverbrauchsquote"
              value={`${fmt(result.ev, 0)} %`}
            />
            <ResultCard
              hint="Ihres Strombedarfs durch Solarstrom gedeckt."
              label="Autarkiegrad"
              value={`${fmt(result.autarkie, 0)} %`}
            />
          </div>
          <CalcDisclaimer>
            Diese Berechnung basiert auf typischen Haushaltslastprofilen nach
            HTW Berlin. Ihr individueller Eigenverbrauch kann erheblich
            abweichen (Homeoffice, Wärmepumpe, E-Auto).
          </CalcDisclaimer>
          <CalcCta href="/kontakt" label="Speicherberatung anfragen" />
        </div>
      )}
    </>
  );
}

// ── E4 – Wirtschaftlichkeitsrechner ──────────────────────────────────────────

function CalcE4() {
  const [invest, setInvest] = useState("");
  const [ertrag, setErtrag] = useState("");
  const [eigen, setEigen] = useState("30");
  const [strompreis, setStrompreis] = useState("31");
  const [verguetung, setVerguetung] = useState("7.78");
  const [betrieb, setBetrieb] = useState("150");
  const [laufzeit, setLaufzeit] = useState("20");
  const [result, setResult] = useState<{
    amort: number;
    lcoe: number;
    jahrErtrag: number;
    gesamtRendite: number;
    annuRendite: number;
  } | null>(null);

  const calc = () => {
    const inv = Number.parseFloat(invest);
    const e = Number.parseFloat(ertrag);
    if (!(inv && e)) return;
    const eigenPct = Number.parseFloat(eigen) / 100;
    const sp = Number.parseFloat(strompreis) / 100;
    const vg = Number.parseFloat(verguetung) / 100;
    const bt = Number.parseFloat(betrieb);
    const lz = Number.parseInt(laufzeit);
    const evEin = e * eigenPct * sp;
    const einsEin = e * (1 - eigenPct) * vg;
    const jahrErtrag = evEin + einsEin - bt;
    const amort = jahrErtrag > 0 ? inv / jahrErtrag : 999;
    const degFactor = lz * (1 - (0.005 * (lz - 1)) / 2);
    const lcoe = ((inv + bt * lz) / (e * degFactor)) * 100;
    const gesamtEin = jahrErtrag * lz;
    const gesamtRendite = inv > 0 ? ((gesamtEin - inv) / inv) * 100 : 0;
    setResult({
      amort,
      lcoe,
      jahrErtrag,
      gesamtRendite,
      annuRendite: gesamtRendite / lz,
    });
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FormGroup label="Investitionskosten (EUR)">
          <Input
            onChange={(e) => setInvest(e.target.value)}
            placeholder="z. B. 18000"
            type="number"
            value={invest}
          />
        </FormGroup>
        <FormGroup label="PV-Jahresertrag (kWh)">
          <Input
            onChange={(e) => setErtrag(e.target.value)}
            placeholder="z. B. 9500"
            type="number"
            value={ertrag}
          />
        </FormGroup>
        <FormGroup
          label="Eigenverbrauchsanteil (%)"
          tooltip="Anteil des PV-Stroms, den Sie selbst verbrauchen."
        >
          <Input
            max="100"
            min="0"
            onChange={(e) => setEigen(e.target.value)}
            type="number"
            value={eigen}
          />
        </FormGroup>
        <FormGroup label="Strompreis (ct/kWh)">
          <Input
            min="0"
            onChange={(e) => setStrompreis(e.target.value)}
            step="0.1"
            type="number"
            value={strompreis}
          />
        </FormGroup>
        <FormGroup label="Einspeisevergütung (ct/kWh)">
          <Input
            min="0"
            onChange={(e) => setVerguetung(e.target.value)}
            step="0.01"
            type="number"
            value={verguetung}
          />
        </FormGroup>
        <FormGroup label="Jährl. Betriebskosten (EUR)">
          <Input
            min="0"
            onChange={(e) => setBetrieb(e.target.value)}
            type="number"
            value={betrieb}
          />
        </FormGroup>
        <FormGroup label="Nutzungsdauer (Jahre)">
          <Input
            max="40"
            min="1"
            onChange={(e) => setLaufzeit(e.target.value)}
            type="number"
            value={laufzeit}
          />
        </FormGroup>
      </div>
      <Button className="mt-4 gap-2" onClick={calc}>
        <CalculatorIcon className="size-4" />
        Berechnen
      </Button>
      {result && (
        <div className="mt-5 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ResultCard
              hint={`Gewinnzone ab Jahr ${Math.ceil(result.amort)}`}
              label="Amortisationszeit"
              value={`${fmt(result.amort, 1)} Jahre`}
            />
            <ResultCard
              label="Stromgestehungskosten"
              value={`${fmtE(result.lcoe)} ct/kWh`}
            />
            <ResultCard
              label="Jährl. Einsparung"
              value={`${fmt(result.jahrErtrag, 0)} EUR`}
            />
            <ResultCard
              hint={`${fmt(result.annuRendite, 1)} % p.a.`}
              label="Gesamtrendite"
              value={`${fmt(result.gesamtRendite, 0)} %`}
            />
          </div>
          <CalcDisclaimer>
            Diese Berechnung unterstellt gleichbleibende Strompreise und
            Vergütungen. Inflation, Steuerwirkungen und Finanzierungskosten
            werden nicht berücksichtigt.
          </CalcDisclaimer>
          <CalcCta
            href="/kontakt"
            label="Wirtschaftlichkeitsanalyse anfragen"
          />
        </div>
      )}
    </>
  );
}

// ── E5 – Speicherdimensionierung ──────────────────────────────────────────────

function CalcE5() {
  const [kwp, setKwp] = useState("");
  const [verbrauch, setVerbrauch] = useState("");
  const [ertrag, setErtrag] = useState("");
  const [nutzertyp, setNutzertyp] = useState("teilweise");
  const [wp, setWp] = useState(false);
  const [ev, setEv] = useState(false);
  const [result, setResult] = useState<{
    empfohlen: number;
    autOhne: number;
    autMit: number;
  } | null>(null);

  const calc = () => {
    const k = Number.parseFloat(kwp);
    const v = Number.parseFloat(verbrauch);
    if (!(k && v)) return;
    const e = Number.parseFloat(ertrag) || k * 950;
    const profilFaktoren: Record<string, number> = {
      abwesend: 1.2,
      teilweise: 1.0,
      zuhause: 0.8,
      gewerbe: 0.6,
    };
    let basis = k * (profilFaktoren[nutzertyp] ?? 1.0);
    if (wp) basis += 2;
    if (ev) basis += 3;
    const empfohlen = Math.max(5, Math.round(basis));
    const ratio = e / v;
    const evOhne = getEigenverbrauch(ratio);
    const autOhne = ((e * evOhne) / v) * 100;
    const spezGr = empfohlen / k;
    const evMit = Math.min(evOhne + getSpeicherZusatz(spezGr), 0.9);
    const autMit = ((e * evMit) / v) * 100;
    setResult({ empfohlen, autOhne, autMit: Math.min(autMit, 100) });
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FormGroup label="Anlagenleistung (kWp)">
          <Input
            min="0.1"
            onChange={(e) => setKwp(e.target.value)}
            placeholder="z. B. 10"
            step="0.1"
            type="number"
            value={kwp}
          />
        </FormGroup>
        <FormGroup label="Jahresstromverbrauch (kWh)">
          <Input
            onChange={(e) => setVerbrauch(e.target.value)}
            placeholder="z. B. 4000"
            type="number"
            value={verbrauch}
          />
        </FormGroup>
        <FormGroup
          label="PV-Jahresertrag (kWh)"
          tooltip="Optional – wenn leer, wird ein Näherungswert berechnet."
        >
          <Input
            onChange={(e) => setErtrag(e.target.value)}
            placeholder="Optional"
            type="number"
            value={ertrag}
          />
        </FormGroup>
        <FormGroup label="Nutzungsprofil">
          <Select onValueChange={setNutzertyp} value={nutzertyp}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="abwesend">Tagsüber abwesend</SelectItem>
              <SelectItem value="teilweise">Teilweise anwesend</SelectItem>
              <SelectItem value="zuhause">Ganztags zuhause</SelectItem>
              <SelectItem value="gewerbe">
                Gewerbe (tagsüber Verbrauch)
              </SelectItem>
            </SelectContent>
          </Select>
        </FormGroup>
      </div>
      <div className="mt-3 flex flex-wrap gap-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            checked={wp}
            className="size-4 accent-primary"
            onChange={(e) => setWp(e.target.checked)}
            type="checkbox"
          />{" "}
          Wärmepumpe vorhanden
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            checked={ev}
            className="size-4 accent-primary"
            onChange={(e) => setEv(e.target.checked)}
            type="checkbox"
          />{" "}
          E-Auto-Ladung vorhanden
        </label>
      </div>
      <Button className="mt-4 gap-2" onClick={calc}>
        <CalculatorIcon className="size-4" />
        Berechnen
      </Button>
      {result && (
        <div className="mt-5 space-y-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <ResultCard
              label="Empfohlene Speichergröße"
              value={`ca. ${result.empfohlen} kWh`}
            />
            <ResultCard
              label="Autarkiegrad ohne Speicher"
              value={`${fmt(result.autOhne, 0)} %`}
            />
            <ResultCard
              hint={`Steigerung: +${fmt(result.autMit - result.autOhne, 0)} Prozentpunkte`}
              label="Autarkiegrad mit Speicher"
              value={`${fmt(result.autMit, 0)} %`}
            />
          </div>
          <CalcDisclaimer>
            Diese Empfehlung basiert auf Faustregel-Dimensionierung. Die
            optimale Speichergröße erfordert eine Analyse Ihres individuellen
            Lastprofils.
          </CalcDisclaimer>
          <CalcCta href="/kontakt" label="Speicherberatung anfragen" />
        </div>
      )}
    </>
  );
}

// ── E6 – Degradation & Restleistung ──────────────────────────────────────────

function CalcE6() {
  const [wp, setWp] = useState("");
  const [anzahl, setAnzahl] = useState("");
  const [alter, setAlter] = useState("");
  const [typ, setTyp] = useState("mono");
  const [garantie, setGarantie] = useState("80");
  const [result, setResult] = useState<{
    restPro: number;
    gesamtKwp: number;
    verlustPct: number;
    restPct: number;
    inGarantie: boolean;
  } | null>(null);

  const calc = () => {
    const w = Number.parseFloat(wp);
    const a = Number.parseInt(anzahl);
    const al = Number.parseInt(alter);
    if (!(w && a) || isNaN(al)) return;
    const koeff: Record<string, number> = {
      mono: 0.4,
      poly: 0.5,
      duennschicht: 0.7,
      unbekannt: 0.5,
    };
    const k = koeff[typ] ?? 0.5;
    const restPro = w * (1 - k / 100) ** al;
    const verlustPct = (1 - restPro / w) * 100;
    const restPct = 100 - verlustPct;
    const gar = Number.parseFloat(garantie) || 80;
    const garantieGrenze = 100 - ((100 - gar) / 25) * al;
    setResult({
      restPro,
      gesamtKwp: (restPro * a) / 1000,
      verlustPct,
      restPct,
      inGarantie: restPct > garantieGrenze,
    });
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FormGroup label="Nennleistung pro Modul (Wp)">
          <Input
            min="1"
            onChange={(e) => setWp(e.target.value)}
            placeholder="z. B. 400"
            type="number"
            value={wp}
          />
        </FormGroup>
        <FormGroup label="Anzahl Module">
          <Input
            min="1"
            onChange={(e) => setAnzahl(e.target.value)}
            placeholder="z. B. 25"
            type="number"
            value={anzahl}
          />
        </FormGroup>
        <FormGroup label="Alter der Anlage (Jahre)">
          <Input
            max="40"
            min="0"
            onChange={(e) => setAlter(e.target.value)}
            placeholder="z. B. 8"
            type="number"
            value={alter}
          />
        </FormGroup>
        <FormGroup label="Modultyp">
          <Select onValueChange={setTyp} value={typ}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mono">Monokristallin</SelectItem>
              <SelectItem value="poly">Polykristallin</SelectItem>
              <SelectItem value="duennschicht">Dünnschicht</SelectItem>
              <SelectItem value="unbekannt">Unbekannt</SelectItem>
            </SelectContent>
          </Select>
        </FormGroup>
        <FormGroup
          label="Leistungsgarantie nach 25 J. (%)"
          tooltip="Typisch: 80 % (Standard), 87–92 % (High-End)."
        >
          <Input
            max="100"
            min="50"
            onChange={(e) => setGarantie(e.target.value)}
            type="number"
            value={garantie}
          />
        </FormGroup>
      </div>
      <Button className="mt-4 gap-2" onClick={calc}>
        <CalculatorIcon className="size-4" />
        Berechnen
      </Button>
      {result && (
        <div className="mt-5 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ResultCard
              hint={`${fmt(result.restPct, 1)} % der Nennleistung`}
              label="Restleistung pro Modul"
              value={`${fmt(result.restPro, 0)} Wp`}
            />
            <ResultCard
              label="Gesamt-Restleistung"
              value={`${fmtE(result.gesamtKwp)} kWp`}
            />
            <ResultCard
              label="Leistungsverlust"
              value={`${fmt(result.verlustPct, 1)} %`}
            />
            <ResultCard
              hint={
                result.inGarantie
                  ? "Innerhalb des Garantierahmens."
                  : "Möglicher Garantieanspruch."
              }
              label="Garantie-Check"
              value={result.inGarantie ? "✓ OK" : "⚠ Prüfen"}
            />
          </div>
          <CalcDisclaimer>
            Die berechnete Degradation ist ein statistischer Erwartungswert. Nur
            eine Kennlinienmessung (I-V-Kurvenanalyse) liefert exakte
            Ergebnisse.
          </CalcDisclaimer>
          <CalcCta href="/kontakt" label="Modulprüfung anfragen" />
        </div>
      )}
    </>
  );
}

// ── E7 – DC-Leitungsverlust ───────────────────────────────────────────────────

function CalcE7() {
  const [impp, setImpp] = useState("");
  const [umpp, setUmpp] = useState("");
  const [laenge, setLaenge] = useState("");
  const [querschnitt, setQuerschnitt] = useState("6");
  const [material, setMaterial] = useState("kupfer");
  const [result, setResult] = useState<{
    deltaU: number;
    deltaUPct: number;
    pVerlust: number;
    verlustPct: number;
    jahresVerlust: number;
    color: "green" | "yellow" | "red";
    text: string;
  } | null>(null);

  const calc = () => {
    const i = Number.parseFloat(impp);
    const u = Number.parseFloat(umpp);
    const l = Number.parseFloat(laenge);
    const q = Number.parseFloat(querschnitt);
    if (!(i && u && l)) return;
    const leitf = material === "kupfer" ? 56 : 35;
    const R = (2 * l) / (leitf * q);
    const pVerlust = i * i * R;
    const pMPP = u * i;
    const verlustPct = (pVerlust / pMPP) * 100;
    const deltaU = i * R;
    const deltaUPct = (deltaU / u) * 100;
    const jahresVerlust = verlustPct * 0.7 * (pMPP / 1000) * 950;
    let color: "green" | "yellow" | "red";
    let text: string;
    if (deltaUPct < 1) {
      color = "green";
      text =
        "Kabel gut dimensioniert – Spannungsfall innerhalb der VDE-Empfehlung.";
    } else if (deltaUPct <= 2) {
      color = "yellow";
      text =
        "Akzeptabel, aber an der Grenze. Bei langen Leitungswegen größeren Querschnitt prüfen.";
    } else {
      color = "red";
      text =
        "Zu hoch – VDE empfiehlt max. 1 % auf DC-Strangleitungen. Dauerhafter Ertragsverlust möglich.";
    }
    setResult({
      deltaU,
      deltaUPct,
      pVerlust,
      verlustPct,
      jahresVerlust,
      color,
      text,
    });
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FormGroup label="Strom im MPP / Impp (A)">
          <Input
            min="0"
            onChange={(e) => setImpp(e.target.value)}
            placeholder="z. B. 9.5"
            step="0.1"
            type="number"
            value={impp}
          />
        </FormGroup>
        <FormGroup label="Spannung im MPP / Umpp (V)">
          <Input
            min="0"
            onChange={(e) => setUmpp(e.target.value)}
            placeholder="z. B. 380"
            type="number"
            value={umpp}
          />
        </FormGroup>
        <FormGroup label="Leitungslänge einfach (m)">
          <Input
            min="0"
            onChange={(e) => setLaenge(e.target.value)}
            placeholder="z. B. 20"
            type="number"
            value={laenge}
          />
        </FormGroup>
        <FormGroup label="Kabelquerschnitt (mm²)">
          <Select onValueChange={setQuerschnitt} value={querschnitt}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4">4 mm²</SelectItem>
              <SelectItem value="6">6 mm²</SelectItem>
              <SelectItem value="10">10 mm²</SelectItem>
              <SelectItem value="16">16 mm²</SelectItem>
            </SelectContent>
          </Select>
        </FormGroup>
        <FormGroup label="Leitermaterial">
          <Select onValueChange={setMaterial} value={material}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kupfer">Kupfer</SelectItem>
              <SelectItem value="aluminium">Aluminium</SelectItem>
            </SelectContent>
          </Select>
        </FormGroup>
      </div>
      <Button className="mt-4 gap-2" onClick={calc}>
        <CalculatorIcon className="size-4" />
        Berechnen
      </Button>
      {result && (
        <div className="mt-5 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <ResultCard
              label="Spannungsfall"
              value={`${fmtE(result.deltaU)} V (${fmtE(result.deltaUPct)} %)`}
            />
            <ResultCard
              hint={`ca. ${fmt(result.jahresVerlust, 0)} kWh/Jahr`}
              label="Verlustleistung"
              value={`${fmtE(result.pVerlust)} W`}
            />
          </div>
          <Ampel color={result.color} text={result.text} />
          <CalcDisclaimer>
            Erhöhter Spannungsfall weist häufig auf zu dünne Querschnitte oder
            fehlerhafte Steckverbindungen hin.
          </CalcDisclaimer>
          <CalcCta href="/kontakt" label="Abnahme anfragen" />
        </div>
      )}
    </>
  );
}

// ── E8 – CO2-Einsparung ───────────────────────────────────────────────────────

function CalcE8() {
  const [ertrag, setErtrag] = useState("");
  const [alter, setAlter] = useState("1");
  const [restlaufzeit, setRestlaufzeit] = useState("20");
  const [result, setResult] = useState<{
    jaehrlich: number;
    bisherig: number;
    zukuenftig: number;
    gesamt: number;
    autoKm: number;
    baeume: number;
    benzin: number;
  } | null>(null);

  const calc = () => {
    const e = Number.parseFloat(ertrag);
    if (!e) return;
    const al = Number.parseInt(alter) || 1;
    const rl = Number.parseInt(restlaufzeit) || 20;
    const co2Faktor = 0.627;
    const jaehrlich = (e * co2Faktor) / 1000;
    let bisherig = 0;
    for (let i = 0; i < al; i++)
      bisherig += (e * (1 - 0.005) ** i * co2Faktor) / 1000;
    let zukuenftig = 0;
    for (let i = al; i < al + rl; i++)
      zukuenftig += (e * (1 - 0.005) ** i * co2Faktor) / 1000;
    const gesamt = bisherig + zukuenftig;
    setResult({
      jaehrlich,
      bisherig,
      zukuenftig,
      gesamt,
      autoKm: Math.round(gesamt * 4800),
      baeume: Math.round(gesamt * 80),
      benzin: Math.round(gesamt * 420),
    });
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <FormGroup label="PV-Jahresertrag (kWh)">
          <Input
            onChange={(e) => setErtrag(e.target.value)}
            placeholder="z. B. 9500"
            type="number"
            value={ertrag}
          />
        </FormGroup>
        <FormGroup label="Alter der Anlage (Jahre)">
          <Input
            max="40"
            min="0"
            onChange={(e) => setAlter(e.target.value)}
            type="number"
            value={alter}
          />
        </FormGroup>
        <FormGroup label="Verbleibende Laufzeit (Jahre)">
          <Input
            max="40"
            min="1"
            onChange={(e) => setRestlaufzeit(e.target.value)}
            type="number"
            value={restlaufzeit}
          />
        </FormGroup>
      </div>
      <Button className="mt-4 gap-2" onClick={calc}>
        <CalculatorIcon className="size-4" />
        Berechnen
      </Button>
      {result && (
        <div className="mt-5 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ResultCard
              label="Jährl. CO₂-Einsparung"
              value={`${fmtE(result.jaehrlich)} t`}
            />
            <ResultCard
              label="Bisherige Einsparung"
              value={`${fmtE(result.bisherig)} t`}
            />
            <ResultCard
              label="Zukünftige Einsparung"
              value={`${fmtE(result.zukuenftig)} t`}
            />
            <ResultCard
              label="Lebensdauer-Gesamteinsparung"
              value={`${fmtE(result.gesamt)} t`}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                icon: <CarIcon className="size-5" />,
                value: `${fmt(result.autoKm)} km`,
                label: "Autofahrt eingespart",
              },
              {
                icon: <LeafIcon className="size-5" />,
                value: fmt(result.baeume),
                label: "Buchen (Jahresbindung)",
              },
              {
                icon: <LeafIcon className="size-5" />,
                value: `${fmt(result.benzin)} L`,
                label: "Benzin vermieden",
              },
            ].map((c) => (
              <div
                className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card py-3 text-center"
                key={c.label}
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {c.icon}
                </span>
                <span className="font-bold text-foreground text-sm">
                  {c.value}
                </span>
                <span className="text-muted-foreground text-xs">{c.label}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground/60 text-xs italic">
            CO₂-Vermeidungsfaktor: 627 g/kWh (Quelle: Umweltbundesamt)
          </p>
          <CalcCta href="/kontakt" label="Anlagenprüfung anfragen" />
        </div>
      )}
    </>
  );
}

// ── E9 – Strang-Konfiguration ─────────────────────────────────────────────────

function CalcE9() {
  const [voc, setVoc] = useState("");
  const [vmpp, setVmpp] = useState("");
  const [tk, setTk] = useState("-0.29");
  const [module, setModule] = useState("");
  const [mpptMin, setMpptMin] = useState("");
  const [mpptMax, setMpptMax] = useState("");
  const [dcMax, setDcMax] = useState("1000");
  const [tMin, setTMin] = useState("-10");
  const [tMax, setTMax] = useState("70");
  const [result, setResult] = useState<{
    vocMax: number;
    vmppMin: number;
    vmppMax2: number;
    check1: boolean;
    check2: boolean;
    check3: boolean;
    minMod: number;
    maxMod: number;
    inRange: boolean;
  } | null>(null);

  const calc = () => {
    const v = Number.parseFloat(voc);
    const vm = Number.parseFloat(vmpp);
    const t = Number.parseFloat(tk);
    const m = Number.parseInt(module);
    const mn = Number.parseFloat(mpptMin);
    const mx = Number.parseFloat(mpptMax);
    const dc = Number.parseFloat(dcMax);
    const tmi = Number.parseFloat(tMin);
    const tma = Number.parseFloat(tMax);
    if (!(v && vm && m && mn && mx && dc)) return;
    const vocMax = v * (1 + (t / 100) * (tmi - 25)) * m;
    const vmppMin = vm * (1 + (t / 100) * (tma - 25)) * m;
    const vmppMax2 = vm * (1 + (t / 100) * (tmi - 25)) * m;
    const minMod = Math.ceil(mn / (vm * (1 + (t / 100) * (tma - 25))));
    const maxMod = Math.floor(dc / (v * (1 + (t / 100) * (tmi - 25))));
    setResult({
      vocMax,
      vmppMin,
      vmppMax2,
      check1: vocMax > dc,
      check2: vmppMax2 > mx,
      check3: vmppMin < mn,
      minMod,
      maxMod,
      inRange: m >= minMod && m <= maxMod,
    });
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FormGroup label="Leerlaufspannung Voc (V)">
          <Input
            min="0"
            onChange={(e) => setVoc(e.target.value)}
            placeholder="z. B. 43.6"
            step="0.1"
            type="number"
            value={voc}
          />
        </FormGroup>
        <FormGroup label="MPP-Spannung Vmpp (V)">
          <Input
            min="0"
            onChange={(e) => setVmpp(e.target.value)}
            placeholder="z. B. 36.8"
            step="0.1"
            type="number"
            value={vmpp}
          />
        </FormGroup>
        <FormGroup
          label="Temp.-Koeffizient Voc (%/°C)"
          tooltip="Typisch: -0,25 bis -0,35 %/°C. Auf dem Datenblatt."
        >
          <Input
            onChange={(e) => setTk(e.target.value)}
            step="0.01"
            type="number"
            value={tk}
          />
        </FormGroup>
        <FormGroup label="Anzahl Module im Strang">
          <Input
            min="1"
            onChange={(e) => setModule(e.target.value)}
            placeholder="z. B. 20"
            type="number"
            value={module}
          />
        </FormGroup>
        <FormGroup label="MPPT-Spannungsbereich Min (V)">
          <Input
            min="0"
            onChange={(e) => setMpptMin(e.target.value)}
            placeholder="z. B. 180"
            type="number"
            value={mpptMin}
          />
        </FormGroup>
        <FormGroup label="MPPT-Spannungsbereich Max (V)">
          <Input
            min="0"
            onChange={(e) => setMpptMax(e.target.value)}
            placeholder="z. B. 850"
            type="number"
            value={mpptMax}
          />
        </FormGroup>
        <FormGroup label="Max. DC-Eingangsspannung (V)">
          <Input
            min="0"
            onChange={(e) => setDcMax(e.target.value)}
            type="number"
            value={dcMax}
          />
        </FormGroup>
        <FormGroup label="Min. Temperatur am Standort (°C)">
          <Input
            onChange={(e) => setTMin(e.target.value)}
            type="number"
            value={tMin}
          />
        </FormGroup>
        <FormGroup
          label="Max. Zelltemperatur (°C)"
          tooltip="Typisch 70–85 °C (Nennleistungstest STC: 25 °C)."
        >
          <Input
            onChange={(e) => setTMax(e.target.value)}
            type="number"
            value={tMax}
          />
        </FormGroup>
      </div>
      <Button className="mt-4 gap-2" onClick={calc}>
        <CalculatorIcon className="size-4" />
        Berechnen
      </Button>
      {result && (
        <div className="mt-5 space-y-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <ResultCard
              label="Voc bei min. Temp."
              value={`${fmt(result.vocMax, 1)} V`}
            />
            <ResultCard
              label="Vmpp bei max. Temp."
              value={`${fmt(result.vmppMin, 1)} V`}
            />
            <ResultCard
              label="Vmpp bei min. Temp."
              value={`${fmt(result.vmppMax2, 1)} V`}
            />
          </div>
          <div className="space-y-2 rounded-xl border border-border bg-muted/20 p-4">
            {[
              {
                ok: !result.check1,
                okText: `Voc bei Kälte (${fmt(result.vocMax, 1)} V) liegt unter der max. DC-Spannung (${fmt(Number.parseFloat(dcMax), 0)} V). ✓`,
                errText: `KRITISCH: Voc bei Kälte (${fmt(result.vocMax, 1)} V) überschreitet die max. DC-Eingangsspannung!`,
                isErr: result.check1,
              },
              {
                ok: !result.check2,
                okText: `Vmpp bei Kälte (${fmt(result.vmppMax2, 1)} V) liegt innerhalb der MPPT-Grenze. ✓`,
                errText:
                  "WARNUNG: Vmpp bei Kälte überschreitet die obere MPPT-Grenze.",
                isErr: result.check2,
              },
              {
                ok: !result.check3,
                okText: `Vmpp bei Hitze (${fmt(result.vmppMin, 1)} V) liegt über der min. MPPT-Spannung. ✓`,
                errText:
                  "WARNUNG: Vmpp bei Hitze unterschreitet die untere MPPT-Grenze.",
                isErr: result.check3,
              },
            ].map((c, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static list
              <div className="flex items-start gap-2 text-sm" key={i}>
                {c.ok ? (
                  <CheckCircleIcon className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                ) : (
                  <AlertTriangleIcon
                    className={cn(
                      "mt-0.5 size-4 shrink-0",
                      c.isErr ? "text-red-500" : "text-amber-500"
                    )}
                  />
                )}
                <span
                  className={
                    c.ok
                      ? "text-foreground"
                      : c.isErr
                        ? "font-semibold text-red-600"
                        : "text-amber-700"
                  }
                >
                  {c.ok ? c.okText : c.errText}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm">
            <strong>Empfohlene Stranggröße:</strong> {result.minMod}–
            {result.maxMod} Module pro Strang
          </p>
          <Ampel
            color={result.inRange ? "green" : "yellow"}
            text={
              result.inRange
                ? `Ihre Konfiguration (${module} Module) liegt im empfohlenen Bereich. ✓`
                : `Ihre gewählte Modulanzahl (${module}) liegt außerhalb des empfohlenen Bereichs!`
            }
          />
          <CalcDisclaimer>
            Die String-Konfiguration wird im Rahmen einer normkonformen
            Anlagenabnahme nach VDE 0100-712 messtechnisch verifiziert.
          </CalcDisclaimer>
          <CalcCta href="/kontakt" label="Abnahme oder Prüfung anfragen" />
        </div>
      )}
    </>
  );
}

// ── E10 – Einspeise- & Vergütungsrechner ──────────────────────────────────────

function CalcE10() {
  const [ertrag, setErtrag] = useState("");
  const [verbrauch, setVerbrauch] = useState("");
  const [kwp, setKwp] = useState("");
  const [strompreis, setStrompreis] = useState("31");
  const [hatSpeicher, setHatSpeicher] = useState(false);
  const [speicherKwh, setSpeicherKwh] = useState("");
  const [result, setResult] = useState<{
    bilanzA: number;
    bilanzB: number;
    evEinsparung: number;
    ueberschussVerg: number;
    einspeiseEinnahmen: number;
    netzkosten: number;
    vergTeil: number;
    vergVoll: number;
    aWins: boolean;
  } | null>(null);

  const calc = () => {
    const e = Number.parseFloat(ertrag);
    const v = Number.parseFloat(verbrauch);
    const k = Number.parseFloat(kwp);
    if (!(e && v && k)) return;
    const sp = Number.parseFloat(strompreis) / 100;
    const getVergTeil = (kWp: number) =>
      kWp <= 10 ? 7.78 : (10 * 7.78 + (kWp - 10) * 6.73) / kWp;
    const getVergVoll = (kWp: number) =>
      kWp <= 10 ? 12.34 : (10 * 12.34 + (kWp - 10) * 10.35) / kWp;
    const vergTeil = getVergTeil(k) / 100;
    const vergVoll = getVergVoll(k) / 100;
    const ratio = e / v;
    let evQuote = getEigenverbrauch(ratio);
    if (hatSpeicher) {
      const sk = Number.parseFloat(speicherKwh) || 0;
      if (sk > 0) evQuote = Math.min(evQuote + getSpeicherZusatz(sk / k), 0.9);
    }
    const evEinsparung = e * evQuote * sp;
    const ueberschussVerg = e * (1 - evQuote) * vergTeil;
    const bilanzA = evEinsparung + ueberschussVerg;
    const einspeiseEinnahmen = e * vergVoll;
    const netzkosten = v * sp;
    const bilanzB = einspeiseEinnahmen - netzkosten;
    setResult({
      bilanzA,
      bilanzB,
      evEinsparung,
      ueberschussVerg,
      einspeiseEinnahmen,
      netzkosten,
      vergTeil,
      vergVoll,
      aWins: bilanzA >= bilanzB,
    });
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FormGroup label="PV-Jahresertrag (kWh)">
          <Input
            onChange={(e) => setErtrag(e.target.value)}
            placeholder="z. B. 9500"
            type="number"
            value={ertrag}
          />
        </FormGroup>
        <FormGroup label="Jahresstromverbrauch (kWh)">
          <Input
            onChange={(e) => setVerbrauch(e.target.value)}
            placeholder="z. B. 4000"
            type="number"
            value={verbrauch}
          />
        </FormGroup>
        <FormGroup label="Anlagenleistung (kWp)">
          <Input
            min="0.1"
            onChange={(e) => setKwp(e.target.value)}
            step="0.1"
            type="number"
            value={kwp}
          />
        </FormGroup>
        <FormGroup label="Strompreis (ct/kWh)">
          <Input
            min="0"
            onChange={(e) => setStrompreis(e.target.value)}
            step="0.1"
            type="number"
            value={strompreis}
          />
        </FormGroup>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <input
          checked={hatSpeicher}
          className="size-4 accent-primary"
          id="e10-speicher"
          onChange={(e) => setHatSpeicher(e.target.checked)}
          type="checkbox"
        />
        <Label className="cursor-pointer text-sm" htmlFor="e10-speicher">
          Batteriespeicher vorhanden
        </Label>
      </div>
      {hatSpeicher && (
        <div className="mt-3">
          <FormGroup label="Speicherkapazität (kWh)">
            <Input
              className="max-w-xs"
              onChange={(e) => setSpeicherKwh(e.target.value)}
              placeholder="z. B. 10"
              type="number"
              value={speicherKwh}
            />
          </FormGroup>
        </div>
      )}
      <Button className="mt-4 gap-2" onClick={calc}>
        <CalculatorIcon className="size-4" />
        Berechnen
      </Button>
      {result && (
        <div className="mt-5 space-y-3">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Teileinspeisung",
                winner: result.aWins,
                lines: [
                  {
                    label: "Eigenverbrauchseinsparung",
                    val: `${fmt(result.evEinsparung, 0)} EUR/Jahr`,
                  },
                  {
                    label: "Überschuss-Vergütung",
                    val: `${fmt(result.ueberschussVerg, 0)} EUR/Jahr`,
                  },
                  {
                    label: `Vergütungssatz: ${fmtE(result.vergTeil * 100)} ct/kWh`,
                    val: "",
                  },
                ],
                total: result.bilanzA,
              },
              {
                title: "Volleinspeisung",
                winner: !result.aWins,
                lines: [
                  {
                    label: "Einspeisevergütung",
                    val: `${fmt(result.einspeiseEinnahmen, 0)} EUR/Jahr`,
                  },
                  {
                    label: "./. Netzstromkosten",
                    val: `-${fmt(result.netzkosten, 0)} EUR/Jahr`,
                  },
                  {
                    label: `Vergütungssatz: ${fmtE(result.vergVoll * 100)} ct/kWh`,
                    val: "",
                  },
                ],
                total: result.bilanzB,
              },
            ].map((c) => (
              <div
                className={cn(
                  "rounded-xl border p-4",
                  c.winner
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card"
                )}
                key={c.title}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-bold text-foreground">{c.title}</h4>
                  {c.winner && <Badge className="text-xs">Vorteilhafter</Badge>}
                </div>
                {c.lines
                  .filter((l) => l.val)
                  .map((l) => (
                    <div className="flex justify-between text-sm" key={l.label}>
                      <span className="text-muted-foreground">{l.label}</span>
                      <span className="font-semibold">{l.val}</span>
                    </div>
                  ))}
                <div className="mt-3 border-border border-t pt-2 font-bold text-foreground">
                  Nettobilanz: {fmt(c.total, 0)} EUR/Jahr
                </div>
              </div>
            ))}
          </div>
          <CalcDisclaimer>
            Vergütungssätze Stand 02/2026 (EEG). Sätze sinken halbjährlich um 1
            %. Die Wahl hat langfristige vertragliche Konsequenzen.
          </CalcDisclaimer>
          <CalcCta href="/kontakt" label="Beratung anfragen" />
        </div>
      )}
    </>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function ToolsPage() {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="bg-dark-surface py-16 md:py-24">
        <div className="section-container grid">
          <div className="section-label mb-4 justify-center text-center">
            <span className="solar-bar" />
            <span className="text-dark-surface-foreground/70">
              Digitale Tools
            </span>
          </div>
          <h1
            className="mb-4 text-center font-extrabold text-4xl text-dark-surface-foreground tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Digitale Selbsthilfe-Tools
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-center text-dark-surface-foreground/75 text-lg leading-relaxed">
            Erste Orientierung für Ihr Anliegen – niedrigschwellig, kostenlos
            und unverbindlich. Von der Fehlermeldungs-Übersetzung über
            Ertragsberechnungen bis zur Wirtschaftlichkeitsanalyse.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: "KI-gestützte Module", href: "#ki-tools" },
              { label: "PV-Schnellcheck", href: "#schnellcheck" },
              { label: "Berechnungstools", href: "#berechnungstools" },
            ].map((l) => (
              <a
                className="rounded-full bg-blue-50 px-4 py-1.5 font-semibold text-primary text-sm transition-colors hover:bg-blue-100"
                href={l.href}
                key={l.label}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section C: KI-Module ────────────────────────────────────── */}
      <section className="py-16 md:py-24" id="ki-tools">
        <div className="section-container">
          <SectionHeader
            icon={<ZapIcon className="size-5" />}
            id="ki-tools-header"
            subtitle="Drei intelligente Werkzeuge für Ihre erste Orientierung – kostenlos und sofort nutzbar."
            title="KI-gestützte Sofort-Hilfe"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            <TranslatorSection />
            <ChatbotCard onOpen={() => setChatOpen(true)} />
            <GutachtenCard />
          </div>
        </div>
      </section>

      {/* ── Section D: Schnellcheck ──────────────────────────────────── */}
      <section className="bg-muted/30 py-16 md:py-24" id="schnellcheck">
        <div className="section-container">
          <SectionHeader
            icon={<CheckIcon className="size-5" />}
            id="schnellcheck-header"
            subtitle="Finden Sie in 2 Minuten heraus, ob Ihre Anlage ein Problem hat und welche Leistung empfohlen wird."
            title="PV-Anlagen-Schnellcheck"
          />
          <SchnellcheckSection />
        </div>
      </section>

      {/* ── Section E: Berechnungstools ─────────────────────────────── */}
      <section className="py-16 md:py-24" id="berechnungstools">
        <div className="section-container">
          <SectionHeader
            icon={<CalculatorIcon className="size-5" />}
            id="berechnungstools-header"
            subtitle="Interaktive Rechenmodule für eine sofortige, datengestützte Erstorientierung. Alle Tools arbeiten mit geprüften Branchenkennwerten."
            title="Kostenlose Berechnungstools"
          />
          <div className="space-y-4">
            <CalcTool
              badge="Für Privatpersonen · Anlagenbetreiber · Investoren"
              icon={<SunIcon className="size-5" />}
              id="tool-e1"
              title="Soll-Ertrags-Rechner"
            >
              <CalcE1 />
            </CalcTool>
            <CalcTool
              badge="Für Anlagenbetreiber · Installateure · Versicherer"
              icon={<BarChart2Icon className="size-5" />}
              id="tool-e2"
              title="Soll-Ist-Ertragsvergleich"
            >
              <CalcE2 />
            </CalcTool>
            <CalcTool
              badge="Für Privatpersonen · Betreiber"
              icon={<HomeIcon className="size-5" />}
              id="tool-e3"
              title="Eigenverbrauch- & Autarkiegrad-Rechner"
            >
              <CalcE3 />
            </CalcTool>
            <CalcTool
              badge="Für Investoren · Betreiber · Installateure"
              icon={<CoinsIcon className="size-5" />}
              id="tool-e4"
              title="Wirtschaftlichkeitsrechner"
            >
              <CalcE4 />
            </CalcTool>
            <CalcTool
              badge="Für Privatpersonen · Betreiber · Installateure"
              icon={<BatteryChargingIcon className="size-5" />}
              id="tool-e5"
              title="Speicherdimensionierungs-Rechner"
            >
              <CalcE5 />
            </CalcTool>
            <CalcTool
              badge="Für Betreiber · Versicherer · Gutachter"
              icon={<ActivityIcon className="size-5" />}
              id="tool-e6"
              title="Degradations- & Restleistungs-Rechner"
            >
              <CalcE6 />
            </CalcTool>
            <CalcTool
              badge="Für Installateure · Betreiber · Planer"
              icon={<ZapIcon className="size-5" />}
              id="tool-e7"
              title="DC-Leitungsverlust-Rechner"
            >
              <CalcE7 />
            </CalcTool>
            <CalcTool
              badge="Für alle Betreiber"
              icon={<LeafIcon className="size-5" />}
              id="tool-e8"
              title="CO₂-Einsparungsrechner"
            >
              <CalcE8 />
            </CalcTool>
            <CalcTool
              badge="Für Installateure · Planer · Sachverständige"
              icon={<GitMergeIcon className="size-5" />}
              id="tool-e9"
              title="Strang-Konfigurations-Rechner"
            >
              <CalcE9 />
            </CalcTool>
            <CalcTool
              badge="Für Betreiber · Investoren"
              icon={<EuroIcon className="size-5" />}
              id="tool-e10"
              title="Einspeise- & Vergütungsrechner"
            >
              <CalcE10 />
            </CalcTool>
          </div>
        </div>
      </section>

      <ChatbotSection open={chatOpen} setOpen={setChatOpen} />

      {/* ── CTA strip ───────────────────────────────────────────────── */}
      <section className="bg-primary py-16">
        <div className="section-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="mb-3 font-extrabold text-2xl text-primary-foreground md:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Tools als Orientierung – Gutachten für Sicherheit
            </h2>
            <p className="mb-6 text-primary-foreground/80 leading-relaxed">
              Unsere Rechner bieten eine erste Einschätzung. Für eine
              rechtsverbindliche Bewertung – etwa bei Versicherungsfällen,
              Gewährleistungsansprüchen oder gerichtlichen Auseinandersetzungen
              – ist eine sachverständige Begutachtung erforderlich.
            </p>
            <Button
              asChild
              className="gap-2 bg-solar px-6 font-bold text-solar-foreground hover:brightness-95"
              size="lg"
            >
              <Link to="/kontakt">
                Jetzt unverbindlich anfragen
                <ArrowRightIcon className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
