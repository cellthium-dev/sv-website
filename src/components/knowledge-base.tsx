"use client";

import { Link } from "@tanstack/react-router";
import {
  ArrowRightIcon,
  CalendarIcon,
  FileDownIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ─── Types ────────────────────────────────────────────────────────────────────

type Article = {
  id: number;
  badge: string;
  badgeColor: string;
  date: string;
  title: string;
  bullets: string[];
  tags: string[];
  thema: string;
  zielgruppe: string;
  anlass: string;
  imgBg: string;
  imgIcon: string;
};

type Download = {
  id: number;
  icon: string;
  title: string;
  desc: string;
};

type Case = {
  id: number;
  badge: string;
  badgeColor: string;
  title: string;
  meta: string;
  teaser: string;
  tags: string[];
};

// ─── Data ────────────────────────────────────────────────────────────────────

const ARTICLES: Article[] = [
  {
    id: 1,
    badge: "Fehleranalyse",
    badgeColor: "#EF4444",
    date: "15.11.2024",
    title:
      "Typische Fehlerquellen bei Photovoltaikanlagen – ein Überblick für Betreiber",
    bullets: [
      "Welche technischen Probleme am häufigsten auftreten – von Hotspots über Wechselrichterausfälle bis zu Verschattungsproblemen",
      "Woran Sie als Betreiber erkennen, dass etwas nicht stimmt",
      "Wann eine professionelle Fehlerdiagnose sinnvoll ist",
    ],
    tags: ["Fehleranalyse", "Hotspot", "Wechselrichter", "Ertragsminderung"],
    thema: "fehleranalyse",
    zielgruppe: "privatperson",
    anlass: "ertragsminderung",
    imgBg: "linear-gradient(135deg,#DC2626,#991B1B)",
    imgIcon: "☀️",
  },
  {
    id: 2,
    badge: "Wirtschaftlichkeit",
    badgeColor: "#F59E0B",
    date: "08.11.2024",
    title:
      "Was tun bei Ertragsminderung? Ursachen, Prüfung und rechtliche Aspekte",
    bullets: [
      "Die häufigsten Gründe, warum PV-Anlagen weniger Strom liefern als prognostiziert",
      "Welche Schritte Sie selbst unternehmen können – und ab wann ein Sachverständiger hilft",
      "Wann Sie Anspruch auf Nachbesserung oder Schadensersatz haben",
    ],
    tags: ["Ertragsminderung", "Wirtschaftlichkeit", "Ertragsprognose"],
    thema: "wirtschaftlichkeit",
    zielgruppe: "privatperson",
    anlass: "ertragsminderung",
    imgBg: "linear-gradient(135deg,#F59E0B,#D97706)",
    imgIcon: "📊",
  },
  {
    id: 3,
    badge: "Batteriespeicher",
    badgeColor: "#8B5CF6",
    date: "30.10.2024",
    title:
      "Fehleranalyse bei Batteriespeichern – typische Probleme aus Sachverständigensicht",
    bullets: [
      "Welche Defekte bei Heimspeichern und gewerblichen Systemen am häufigsten auftreten",
      "Warum das Battery Management System (BMS) eine Schlüsselrolle spielt",
      "Wie Sachverständige Speicherfehler systematisch identifizieren",
    ],
    tags: ["Batteriespeicher", "BMS", "Hochvolt", "Sicherheitsprüfung"],
    thema: "batteriespeicher",
    zielgruppe: "privatperson",
    anlass: "ertragsminderung",
    imgBg: "linear-gradient(135deg,#8B5CF6,#6D28D9)",
    imgIcon: "🔋",
  },
  {
    id: 4,
    badge: "Recht & Normen",
    badgeColor: "#6366F1",
    date: "25.10.2024",
    title:
      "PV-Gutachten: Aufbau, Aussagekraft und Bedeutung für Versicherungen",
    bullets: [
      "Was ein technisches Gutachten beinhalten muss, um vor Gericht und bei Versicherungen zu bestehen",
      "Welche Normen und Standards die Qualität eines Gutachtens bestimmen",
      "Warum Neutralität und ISO/IEC-17024-Zertifizierung entscheidend sind",
    ],
    tags: ["Gutachten", "Versicherung", "Normen", "ISO 17024"],
    thema: "recht",
    zielgruppe: "versicherer",
    anlass: "schadensfall",
    imgBg: "linear-gradient(135deg,#6366F1,#4338CA)",
    imgIcon: "⚖️",
  },
  {
    id: 5,
    badge: "Wartung",
    badgeColor: "#10B981",
    date: "18.10.2024",
    title:
      "Checkliste: Jährliche Wartung von PV-Anlagen – was wirklich geprüft werden muss",
    bullets: [
      "Welche Prüfpunkte bei der jährlichen Wartung unverzichtbar sind",
      "Von der Sichtprüfung über elektrische Messungen bis zur Dokumentation",
      "Was ein vollständiger Wartungsbericht enthalten sollte",
    ],
    tags: ["Wartung", "Instandhaltung", "Prüfprotokoll", "Anlagencheck"],
    thema: "wartung",
    zielgruppe: "privatperson",
    anlass: "qualitaetssicherung",
    imgBg: "linear-gradient(135deg,#10B981,#059669)",
    imgIcon: "🔧",
  },
  {
    id: 6,
    badge: "Recht & Normen",
    badgeColor: "#6366F1",
    date: "10.10.2024",
    title:
      "Sachverständigenwesen: Neutralität und Unabhängigkeit – warum das für Ihr Gutachten entscheidend ist",
    bullets: [
      "Welche rechtlichen Grundlagen das Sachverständigenwesen in Deutschland regeln",
      "Warum öffentliche Bestellung, Zertifizierung und Verbandsanerkennung nicht dasselbe bedeuten",
      "Woran Sie einen wirklich unabhängigen Sachverständigen erkennen",
    ],
    tags: ["Sachverständiger", "Neutralität", "Zertifizierung"],
    thema: "recht",
    zielgruppe: "rechtsanwalt",
    anlass: "gewaehrleistung",
    imgBg: "linear-gradient(135deg,#6366F1,#4338CA)",
    imgIcon: "🏛️",
  },
  {
    id: 7,
    badge: "Fehleranalyse",
    badgeColor: "#EF4444",
    date: "02.10.2024",
    title:
      "Thermografie bei PV-Anlagen: Was Wärmebilder verraten – und was nicht",
    bullets: [
      "Wie Infrarot-Thermografie funktioniert und welche Defekte sie sichtbar macht",
      "Typische Wärmebild-Muster: Hotspots, Substring-Ausfälle, PID-Effekte",
      "Grenzen der Methode und wann zusätzliche Prüfverfahren nötig sind",
    ],
    tags: ["Thermografie", "Hotspot", "Infrarot", "PID"],
    thema: "fehleranalyse",
    zielgruppe: "installateur",
    anlass: "ertragsminderung",
    imgBg: "linear-gradient(135deg,#EF4444,#B91C1C)",
    imgIcon: "🌡️",
  },
  {
    id: 8,
    badge: "Sicherheit",
    badgeColor: "#DC2626",
    date: "25.09.2024",
    title: "Wie erkenne ich, ob meine PV-Anlage fachgerecht installiert wurde?",
    bullets: [
      "Die wichtigsten Kontrollpunkte, die auf Installationsmängel hindeuten",
      "Was Sie als Betreiber selbst prüfen können – und was nur ein Fachmann sieht",
      "Warum eine unabhängige Abnahmeprüfung bei Neuanlagen sinnvoll ist",
    ],
    tags: ["Installation", "Qualitätssicherung", "Abnahme", "Neuanlage"],
    thema: "sicherheit",
    zielgruppe: "privatperson",
    anlass: "inbetriebnahme",
    imgBg: "linear-gradient(135deg,#DC2626,#991B1B)",
    imgIcon: "🔍",
  },
  {
    id: 9,
    badge: "Fehleranalyse",
    badgeColor: "#EF4444",
    date: "18.09.2024",
    title:
      "Hagelschäden an PV-Modulen: Erkennung, Bewertung und Versicherungsregulierung",
    bullets: [
      "Warum Hagelschäden oft unsichtbar sind und nur durch spezielle Prüfverfahren entdeckt werden",
      "Wie Elektrolumineszenz und Leistungsmessung versteckte Zellbrüche aufdecken",
      "Was Betreiber und Versicherer bei der Schadensregulierung beachten müssen",
    ],
    tags: ["Hagelschaden", "Elektrolumineszenz", "Versicherung", "Zellbruch"],
    thema: "fehleranalyse",
    zielgruppe: "versicherer",
    anlass: "schadensfall",
    imgBg: "linear-gradient(135deg,#EF4444,#B91C1C)",
    imgIcon: "🌨️",
  },
  {
    id: 10,
    badge: "Monitoring",
    badgeColor: "#3B82F6",
    date: "10.09.2024",
    title:
      "Monitoring richtig nutzen: Wie Datenauswertung verborgene Anlagenfehler sichtbar macht",
    bullets: [
      "Welche Kennzahlen Sie im Monitoring im Blick behalten sollten",
      "Wie Stringvergleiche und Performance-Ratio-Analysen Fehler aufdecken",
      "Wann Monitoring-Daten als Beweismittel bei Gewährleistungsansprüchen dienen können",
    ],
    tags: ["Monitoring", "Performance Ratio", "Stringvergleich"],
    thema: "monitoring",
    zielgruppe: "unternehmen",
    anlass: "ertragsminderung",
    imgBg: "linear-gradient(135deg,#3B82F6,#1D4ED8)",
    imgIcon: "📈",
  },
  {
    id: 11,
    badge: "Sicherheit",
    badgeColor: "#DC2626",
    date: "01.09.2024",
    title:
      "Blitzschutz und Erdung bei PV-Anlagen: Pflichten, Risiken und häufige Installationsfehler",
    bullets: [
      "Welche Blitzschutzanforderungen für PV-Anlagen gelten",
      "Typische Fehler bei der Erdung und deren Konsequenzen im Schadensfall",
      "Wie ein Blitzschutzgutachten zur Absicherung gegenüber der Versicherung dient",
    ],
    tags: ["Blitzschutz", "Erdung", "Sicherheit", "Überspannungsschutz"],
    thema: "sicherheit",
    zielgruppe: "privatperson",
    anlass: "qualitaetssicherung",
    imgBg: "linear-gradient(135deg,#DC2626,#991B1B)",
    imgIcon: "⚡",
  },
  {
    id: 12,
    badge: "Wirtschaftlichkeit",
    badgeColor: "#F59E0B",
    date: "22.08.2024",
    title:
      "Ertragsprognose vs. Realität: Warum Ihre Anlage weniger liefert als versprochen",
    bullets: [
      "Die häufigsten Ursachen für die Diskrepanz zwischen Prognose und tatsächlichem Ertrag",
      "Welche Rolle optimistische Annahmen, Verschattung und Degradation spielen",
      "Ab welcher Abweichung eine fachliche Ertragsprüfung sinnvoll wird",
    ],
    tags: ["Ertragsprognose", "Minderertrag", "Verschattung", "Degradation"],
    thema: "wirtschaftlichkeit",
    zielgruppe: "unternehmen",
    anlass: "ertragsminderung",
    imgBg: "linear-gradient(135deg,#F59E0B,#D97706)",
    imgIcon: "📉",
  },
  {
    id: 13,
    badge: "Sicherheit",
    badgeColor: "#DC2626",
    date: "15.08.2024",
    title:
      "Steckverbinder und Lichtbogenrisiko: Die unterschätzte Gefahr auf dem Dach",
    bullets: [
      "Warum inkompatible oder fehlerhaft verrastete Steckverbinder Brände verursachen können",
      'Was „Cross-Mating" bedeutet und wie häufig dieses Problem in der Praxis auftritt',
      "Welche Prüfungen das Risiko minimieren",
    ],
    tags: ["Steckverbinder", "Lichtbogen", "Brandgefahr", "Cross-Mating"],
    thema: "sicherheit",
    zielgruppe: "installateur",
    anlass: "qualitaetssicherung",
    imgBg: "linear-gradient(135deg,#DC2626,#991B1B)",
    imgIcon: "🔥",
  },
  {
    id: 14,
    badge: "Fehleranalyse",
    badgeColor: "#EF4444",
    date: "05.08.2024",
    title: "Wechselrichter-Ausfälle: Ursachen, Diagnose und Handlungsoptionen",
    bullets: [
      "Die häufigsten Ausfallursachen bei String- und Hybridwechselrichtern",
      "Wie Fehlercodes richtig interpretiert werden – und wann sie irreführend sind",
      "Welche Ansprüche Sie gegenüber Hersteller und Installateur haben",
    ],
    tags: ["Wechselrichter", "Ausfall", "Fehlercode", "Diagnose", "Garantie"],
    thema: "fehleranalyse",
    zielgruppe: "privatperson",
    anlass: "gewaehrleistung",
    imgBg: "linear-gradient(135deg,#EF4444,#B91C1C)",
    imgIcon: "⚙️",
  },
  {
    id: 15,
    badge: "Recht & Normen",
    badgeColor: "#6366F1",
    date: "28.07.2024",
    title:
      "Photovoltaik und Versicherung: Welche Unterlagen im Schadensfall wirklich helfen",
    bullets: [
      "Welche Dokumente Ihre Versicherung im Ernstfall sehen möchte",
      "Warum Installationsprotokoll, Stringplan und Monitoring-Daten entscheidend sind",
      "Wie ein Sachverständigengutachten die Regulierung beschleunigt",
    ],
    tags: ["Versicherung", "Schadensfall", "Dokumentation", "Regulierung"],
    thema: "recht",
    zielgruppe: "versicherer",
    anlass: "schadensfall",
    imgBg: "linear-gradient(135deg,#6366F1,#4338CA)",
    imgIcon: "📋",
  },
  {
    id: 16,
    badge: "Moduldefekte",
    badgeColor: "#EC4899",
    date: "20.07.2024",
    title:
      "Moduldefekte und Degradation: Alterung erkennen und wirtschaftliche Folgen bewerten",
    bullets: [
      "Welche Alterungserscheinungen bei PV-Modulen normal sind – und welche auf Defekte hinweisen",
      "PID, Snail Trails, Delamination und Zellbrüche: Was bedeuten diese Begriffe für Ihren Ertrag?",
      "Ab wann sich ein Modultausch wirtschaftlich lohnt",
    ],
    tags: ["Degradation", "PID", "Snail Trails", "Moduldefekt"],
    thema: "moduldefekte",
    zielgruppe: "privatperson",
    anlass: "ertragsminderung",
    imgBg: "linear-gradient(135deg,#EC4899,#BE185D)",
    imgIcon: "🔬",
  },
  {
    id: 17,
    badge: "Wartung",
    badgeColor: "#10B981",
    date: "12.07.2024",
    title:
      "Wiederholungsprüfung nach DGUV V3: Was Betreiber gewerblicher PV-Anlagen wissen müssen",
    bullets: [
      "Warum die DGUV Vorschrift 3 auch für Photovoltaikanlagen gilt",
      "Welche Prüffristen einzuhalten sind und was bei Versäumnis droht",
      "Was eine normgerechte Wiederholungsprüfung konkret umfasst",
    ],
    tags: ["DGUV V3", "Wiederholungsprüfung", "Betreiberpflicht", "Gewerblich"],
    thema: "wartung",
    zielgruppe: "unternehmen",
    anlass: "qualitaetssicherung",
    imgBg: "linear-gradient(135deg,#10B981,#059669)",
    imgIcon: "📝",
  },
  {
    id: 18,
    badge: "Wirtschaftlichkeit",
    badgeColor: "#F59E0B",
    date: "05.07.2024",
    title:
      "Angebote richtig vergleichen: Worauf Sie bei der Auswahl des Installateurs achten sollten",
    bullets: [
      "Die kritischen Punkte in PV-Angeboten, die Laien oft übersehen",
      "Warum der niedrigste Preis nicht immer die beste Wahl ist",
      "Welche Qualitätsmerkmale ein seriöses Angebot auszeichnen",
    ],
    tags: ["Angebotsvergleich", "Installateur", "Planung", "Qualität"],
    thema: "wirtschaftlichkeit",
    zielgruppe: "privatperson",
    anlass: "neuinstallation",
    imgBg: "linear-gradient(135deg,#F59E0B,#D97706)",
    imgIcon: "💰",
  },
];

const DOWNLOADS: Download[] = [
  {
    id: 1,
    icon: "📋",
    title: "Checkliste: Ertragsminderung – was Sie selbst prüfen können",
    desc: "10 Prüfpunkte, die Betreiber bei Ertragsrückgang sofort selbst kontrollieren können – bevor ein Sachverständiger hinzugezogen wird.",
  },
  {
    id: 2,
    icon: "📄",
    title: "Übergabeprotokoll PV-Anlage (Muster)",
    desc: "Was ein ordentliches Abnahmedokument enthalten sollte – mit allen Messgrößen, Checklisten und Unterschriftenfeldern.",
  },
  {
    id: 3,
    icon: "🗣️",
    title: "Leitfaden: Gespräch mit dem Installateur vorbereiten",
    desc: "Ihre Argumente, Ihre Rechte, Ihre nächsten Schritte – strukturiert aufbereitet für ein sachliches und zielführendes Gespräch.",
  },
  {
    id: 4,
    icon: "🛡️",
    title: "Checkliste: Schadensfall melden – was Ihre Versicherung braucht",
    desc: "Welche Fotos, Dokumente und Informationen Sie zusammenstellen sollten, damit die Regulierung reibungslos verläuft.",
  },
  {
    id: 5,
    icon: "✅",
    title: "Schnellcheck: Ist Ihre PV-Anlage normkonform installiert?",
    desc: "10 Punkte, die Sie als Betreiber selbst kontrollieren können – mit Verweis auf die zutreffenden Normen und Richtlinien.",
  },
];

const CASES: Case[] = [
  {
    id: 1,
    badge: "Fehlerdiagnose",
    badgeColor: "#EF4444",
    title: "Ertragseinbruch um 40 % – defekte Bypass-Dioden als Ursache",
    meta: "Aufdachanlage, 9,8 kWp · 6 Jahre · Plötzlicher Ertragsrückgang",
    teaser:
      "Ein Eigenheimbesitzer bemerkte einen unerklärlichen Ertragsrückgang. Die Monitoring-Daten zeigten String-Abweichungen. Unsere Thermografie-Untersuchung identifizierte vier Module mit defekten Bypass-Dioden – ein Serienfehler des Herstellers. Gewährleistungsanspruch erfolgreich durchgesetzt.",
    tags: [
      "Bypass-Diode",
      "Thermografie",
      "Ertragsminderung",
      "Gewährleistung",
    ],
  },
  {
    id: 2,
    badge: "Versicherungsfall",
    badgeColor: "#F59E0B",
    title:
      "Hagelschaden oder Installationsfehler? Versicherung lehnte Regulierung ab",
    meta: "Schrägdachanlage, 15 kWp · 3 Jahre · Mikrorisse nach Hagel",
    teaser:
      "Nach einem schweren Hagelunwetter verweigerte die Versicherung die Regulierung mit dem Argument, die Schäden seien vorbestehend. Unsere Elektrolumineszenz-Aufnahmen bewiesen eindeutig den Zusammenhang zwischen Hagelereignis und Zellbruchmuster.",
    tags: [
      "Hagelschaden",
      "Elektrolumineszenz",
      "Versicherung",
      "Beweissicherung",
    ],
  },
  {
    id: 3,
    badge: "Batteriespeicher",
    badgeColor: "#8B5CF6",
    title: "Batteriespeicher: Kapazitätsverlust von 35 % nach nur 2 Jahren",
    meta: "Heimspeicher LFP, 10 kWh · 2 Jahre · Beschleunigte Alterung",
    teaser:
      "Der Speicher eines Eigenheimbesitzers lieferte nach 2 Jahren nur noch 65 % der Nennkapazität. Unsere BMS-Datenanalyse und Impedanzmessung ergaben eine fehlerhafte Zellbalancierung als Grundursache – ein Garantiefall.",
    tags: ["Kapazitätsverlust", "BMS", "Impedanzmessung", "Garantie"],
  },
  {
    id: 4,
    badge: "Installationsmangel",
    badgeColor: "#DC2626",
    title: "Neubau-PV-Anlage: 23 dokumentierte Installationsmängel bei Abnahme",
    meta: "Aufdachanlage, 12 kWp · Neuanlage · Mangelhafte Installation",
    teaser:
      "Ein Bauherr beauftragte eine unabhängige Abnahmeprüfung seiner neuen PV-Anlage. Die Inspektion offenbarte 23 Mängel – von fehlenden Zugentlastungen über Cross-Mating bei Steckverbindern bis zu unterschrittenem Biegeradius der DC-Leitungen.",
    tags: ["Abnahmeprüfung", "Installation", "Cross-Mating", "Neuanlage"],
  },
];

const STATS = [
  { number: "500+", label: "begutachtete PV-Anlagen" },
  { number: "78 %", label: "vermeidbare Installationsmängel festgestellt" },
  { number: "22 %", label: "durchschnittliche Ertragsrückgewinnung" },
  { number: "85 %", label: "erfolgreiche Regulierungen nach Gutachten" },
];

// ─── Filter options ───────────────────────────────────────────────────────────

const THEMA_OPTIONS = [
  { value: "fehleranalyse", label: "Fehleranalyse & Diagnose" },
  { value: "wartung", label: "Wartung & Instandhaltung" },
  { value: "recht", label: "Recht & Normen" },
  { value: "wirtschaftlichkeit", label: "Wirtschaftlichkeit & Ertrag" },
  { value: "batteriespeicher", label: "Batteriespeicher & Hochvolt" },
  { value: "sicherheit", label: "Sicherheit & Brandschutz" },
  { value: "moduldefekte", label: "Moduldefekte & Degradation" },
  { value: "monitoring", label: "Monitoring & Datenauswertung" },
];

const ZIELGRUPPE_OPTIONS = [
  { value: "privatperson", label: "Privatperson / Anlagenbetreiber" },
  { value: "versicherer", label: "Versicherer" },
  { value: "installateur", label: "Installateur / Fachbetrieb" },
  { value: "unternehmen", label: "Unternehmen / Investor" },
  { value: "rechtsanwalt", label: "Rechtsanwalt / Gericht" },
  { value: "bauherr", label: "Bauherr / Planer" },
];

const ANLASS_OPTIONS = [
  { value: "neuinstallation", label: "Neuinstallation & Planung" },
  { value: "inbetriebnahme", label: "Inbetriebnahme & Abnahme" },
  { value: "ertragsminderung", label: "Ertragsminderung" },
  { value: "schadensfall", label: "Schadensfall & Versicherung" },
  { value: "gewaehrleistung", label: "Gewährleistung & Streitfall" },
  { value: "qualitaetssicherung", label: "Qualitätssicherung & Dokumentation" },
];

const BATCH = 6;

// ─── Component ────────────────────────────────────────────────────────────────

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterThema, setFilterThema] = useState("all");
  const [filterZielgruppe, setFilterZielgruppe] = useState("all");
  const [filterAnlass, setFilterAnlass] = useState("all");
  const [shown, setShown] = useState(BATCH);

  const filtered = ARTICLES.filter((a) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      q === "" ||
      a.title.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q));
    const matchThema = filterThema === "all" || a.thema === filterThema;
    const matchZielgruppe =
      filterZielgruppe === "all" || a.zielgruppe.includes(filterZielgruppe);
    const matchAnlass = filterAnlass === "all" || a.anlass === filterAnlass;
    return matchSearch && matchThema && matchZielgruppe && matchAnlass;
  });

  const hasActiveFilters =
    searchQuery !== "" ||
    filterThema !== "all" ||
    filterZielgruppe !== "all" ||
    filterAnlass !== "all";

  function resetFilters() {
    setSearchQuery("");
    setFilterThema("all");
    setFilterZielgruppe("all");
    setFilterAnlass("all");
    setShown(BATCH);
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        aria-label="Wissensbereich"
        className="bg-dark-surface px-6 py-20 md:py-28"
      >
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="section-label mb-4 justify-center"
            style={{ color: "oklch(0.65 0.01 265)" }}
          >
            <span className="solar-bar" />
            <span>Wissensbereich</span>
          </div>
          <h1 className="mb-4 font-extrabold text-4xl text-dark-surface-foreground tracking-tight md:text-5xl">
            Wissensbereich
          </h1>
          <p className="mb-10 text-dark-surface-foreground/75 text-lg leading-relaxed">
            Fachartikel, Ratgeber und aktuelle Informationen rund um
            Photovoltaik und Batteriespeichersysteme – fachlich fundiert,
            laienverständlich aufbereitet.
          </p>

          {/* Search box */}
          <div className="mx-auto max-w-3xl rounded-2xl bg-background p-5 text-left shadow-2xl">
            <div className="mb-4 flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 text-muted-foreground" />
                <Input
                  className="h-12 pl-9"
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShown(BATCH);
                  }}
                  placeholder="Suchen Sie nach Themen, Fehlercodes, Normen oder Fachbegriffen…"
                  type="text"
                  value={searchQuery}
                />
              </div>
              <Button
                className="h-12 px-5 font-semibold"
                onClick={() => setShown(BATCH)}
              >
                Suchen
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Select
                onValueChange={(v) => {
                  setFilterThema(v);
                  setShown(BATCH);
                }}
                value={filterThema}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Alle Themen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Themen</SelectItem>
                  {THEMA_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(v) => {
                  setFilterZielgruppe(v);
                  setShown(BATCH);
                }}
                value={filterZielgruppe}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Alle Zielgruppen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Zielgruppen</SelectItem>
                  {ZIELGRUPPE_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(v) => {
                  setFilterAnlass(v);
                  setShown(BATCH);
                }}
                value={filterAnlass}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Alle Anlässe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Anlässe</SelectItem>
                  {ANLASS_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground text-xs">
                  {filtered.length} Ergebnis
                  {filtered.length !== 1 ? "se" : ""}
                </span>
                <button
                  className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-muted-foreground text-xs hover:bg-primary/10 hover:text-primary"
                  onClick={resetFilters}
                  type="button"
                >
                  <XIcon className="size-3" />
                  Filter zurücksetzen
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Fachartikel ──────────────────────────────────────────── */}
      <section
        aria-labelledby="articles-title"
        className="py-20 md:py-28"
        id="articles"
      >
        <div className="section-container">
          <div className="mb-12">
            <div className="section-label mb-3">
              <span className="solar-bar" />
              <span>Fachartikel</span>
            </div>
            <h2
              className="mb-3 font-extrabold text-3xl tracking-tight md:text-4xl"
              id="articles-title"
            >
              Fachartikel, Ratgeber & Praxiswissen
            </h2>
            <p className="text-muted-foreground">
              Fundierte Beiträge zu den häufigsten Fragen rund um Photovoltaik
              und Speichersysteme.
            </p>
          </div>

          {filtered.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.slice(0, shown).map((article) => (
                  <ArticleCard article={article} key={article.id} />
                ))}
              </div>

              {shown < filtered.length && (
                <div className="mt-10 flex justify-center">
                  <Button
                    className="px-8 font-semibold"
                    onClick={() => setShown((n) => n + BATCH)}
                    variant="outline"
                  >
                    Mehr Artikel laden (
                    {Math.min(BATCH, filtered.length - shown)} weitere)
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center">
              <p className="mb-1 font-medium text-lg">
                Keine Artikel gefunden.
              </p>
              <p className="mb-4 text-muted-foreground text-sm">
                Versuchen Sie eine andere Suche oder passen Sie die Filter an.
              </p>
              <Button onClick={resetFilters} variant="outline">
                Filter zurücksetzen
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── Downloads ────────────────────────────────────────────── */}
      <section
        aria-labelledby="downloads-title"
        className="bg-muted/40 py-20 md:py-28"
        id="downloads"
      >
        <div className="section-container">
          <div className="mb-12 text-center">
            <div className="section-label mb-3 justify-center">
              <span className="solar-bar" />
              <span>Downloads</span>
            </div>
            <h2
              className="mb-3 font-extrabold text-3xl tracking-tight md:text-4xl"
              id="downloads-title"
            >
              Kostenlose Checklisten & Downloads
            </h2>
            <p className="text-muted-foreground">
              Praxishilfen für Anlagenbetreiber, Installateure und Unternehmen –
              sofort einsetzbar.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DOWNLOADS.map((d) => (
              <div
                className="flex flex-col rounded-xl border border-border bg-background p-6 transition-all hover:shadow-md"
                key={d.id}
              >
                <div className="mb-4 text-4xl">{d.icon}</div>
                <h3 className="mb-2 font-bold text-base text-foreground leading-snug">
                  {d.title}
                </h3>
                <p className="mb-5 flex-1 text-muted-foreground text-sm leading-relaxed">
                  {d.desc}
                </p>
                <Button className="w-full" disabled size="sm" variant="outline">
                  <FileDownIcon className="mr-2 size-4" />
                  In Kürze verfügbar
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Praxisfälle ──────────────────────────────────────────── */}
      <section
        aria-labelledby="cases-title"
        className="py-20 md:py-28"
        id="cases"
      >
        <div className="section-container">
          <div className="mb-12">
            <div className="section-label mb-3">
              <span className="solar-bar" />
              <span>Praxisfälle</span>
            </div>
            <h2
              className="mb-3 font-extrabold text-3xl tracking-tight md:text-4xl"
              id="cases-title"
            >
              Aus der Praxis – Echte Fälle, echte Lösungen
            </h2>
            <p className="text-muted-foreground">
              Anonymisierte Fallstudien aus unserer täglichen Gutachterarbeit.
              Finden Sie den Fall, der Ihrer Situation ähnelt.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                className="rounded-xl border border-border bg-card p-5 text-center"
                key={s.label}
              >
                <div className="mb-1 font-extrabold text-3xl text-primary">
                  {s.number}
                </div>
                <div className="text-muted-foreground text-sm leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Case cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {CASES.map((c) => (
              <div
                className="hover:-translate-y-0.5 flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg"
                key={c.id}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <span
                    className="inline-block rounded-md px-2.5 py-1 font-semibold text-white text-xs"
                    style={{ background: c.badgeColor }}
                  >
                    {c.badge}
                  </span>
                </div>
                <h3 className="mb-2 font-bold text-foreground text-lg leading-snug">
                  {c.title}
                </h3>
                <p className="mb-3 font-medium text-muted-foreground/80 text-xs">
                  {c.meta}
                </p>
                <p className="mb-5 flex-1 text-muted-foreground text-sm leading-relaxed">
                  {c.teaser}
                </p>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span
                      className="rounded-full bg-muted px-2.5 py-0.5 text-muted-foreground text-xs"
                      key={t}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Button asChild size="sm" variant="outline">
                  <Link to="/kontakt">
                    Ähnlichen Fall besprechen
                    <ArrowRightIcon className="ml-1 size-3.5" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ───────────────────────────────────────── */}
      <section
        aria-label="Gratis Checkliste"
        className="bg-primary py-20 md:py-28"
        id="newsletter"
      >
        <div className="section-container">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-5 bg-white/20 font-semibold text-primary-foreground hover:bg-white/20">
              📄 PDF-Download · 100% Kostenlos
            </Badge>
            <h2 className="mb-4 font-extrabold text-3xl text-primary-foreground tracking-tight md:text-4xl">
              Gratis Checkliste: 10 Punkte bei Ertragsminderung
            </h2>
            <p className="mb-8 text-lg text-primary-foreground/85 leading-relaxed">
              10 Punkte, die Betreiber bei Ertragsminderung sofort prüfen
              sollten. Vermeiden Sie unnötige Kosten durch einfache Checks
              vorab.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Input
                className="h-12 max-w-xs border-white/30 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:border-white"
                placeholder="Ihre E-Mail-Adresse"
                type="email"
              />
              <Button
                className="h-12 bg-solar px-6 font-bold text-solar-foreground hover:brightness-95"
                size="lg"
              >
                Checkliste anfordern
              </Button>
            </div>
            <p className="mt-4 text-primary-foreground/50 text-xs">
              Kein Spam, keine Weitergabe. Download-Link kommt per E-Mail.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Article Card ─────────────────────────────────────────────────────────────

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="hover:-translate-y-1 flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* Colored header strip */}
      <div
        aria-hidden="true"
        className="flex h-36 items-center justify-center text-5xl"
        style={{ background: article.imgBg }}
      >
        {article.imgIcon}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {/* Badge + date */}
        <div className="mb-3 flex items-center gap-2">
          <span
            className="inline-block rounded-md px-2 py-0.5 font-semibold text-white text-xs"
            style={{ background: article.badgeColor }}
          >
            {article.badge}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground text-xs">
            <CalendarIcon className="size-3" />
            {article.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-3 line-clamp-2 font-bold text-base text-foreground leading-snug">
          {article.title}
        </h3>

        {/* Bullets */}
        <ul className="mb-4 flex flex-1 flex-col gap-1.5">
          {article.bullets.map((b) => (
            <li
              className="flex items-start gap-1.5 text-muted-foreground text-xs leading-relaxed"
              key={b}
            >
              <span className="mt-1 size-1 shrink-0 rounded-full bg-muted-foreground/50" />
              {b}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1">
          {article.tags.slice(0, 3).map((t) => (
            <span
              className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs"
              key={t}
            >
              {t}
            </span>
          ))}
        </div>

        <Button className="w-full" size="sm" variant="outline">
          Weiterlesen
        </Button>
      </div>
    </article>
  );
}
