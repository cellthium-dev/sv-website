"use client";

import { Link } from "@tanstack/react-router";
import {
  ActivityIcon,
  AlertCircleIcon,
  ArrowRightIcon,
  BarChart2Icon,
  BatteryLowIcon,
  CalendarIcon,
  CheckSquareIcon,
  ClipboardListIcon,
  CloudSnowIcon,
  CoinsIcon,
  CpuIcon,
  EyeIcon,
  FileCheckIcon,
  FileDownIcon,
  FileTextIcon,
  FlameIcon,
  type LucideIcon,
  MessageSquareIcon,
  ScaleIcon,
  ScanIcon,
  SearchIcon,
  ShieldCheckIcon,
  ShieldIcon,
  ThermometerIcon,
  TrendingDownIcon,
  WrenchIcon,
  XIcon,
  ZapIcon,
} from "lucide-react";
import { useState } from "react";
import {
  Comparison,
  ComparisonHandle,
  ComparisonItem,
} from "@/components/kibo-ui/comparison";
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
import { cn } from "@/lib/utils";

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
  imgIcon: LucideIcon;
};

type Download = {
  id: number;
  icon: LucideIcon;
  title: string;
  desc: string;
};

type Case = {
  id: number;
  badge: string;
  badgeColor: string;
  title: string;
  meta: string;
  problem: string;
  solution: string;
  tags: string[];
};

type GlossaryTerm = {
  id: string;
  tab: "glossar" | "normen";
  title: string;
  category: string;
  catKey: string;
  docType: string;
  docTypeKey: string;
  relevanz: string;
  relevanzKey: string;
  abstract: string;
  tags: string[];
  refs: string;
  catColor: string;
};

type ComparisonType = {
  id: number;
  theme: string;
  schwere: string;
  title: string;
  badColor: string;
  goodColor: string;
  explain2: string;
  explain3: string;
  tags: string[];
  badIcon: string;
  goodIcon: string;
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
    imgIcon: AlertCircleIcon,
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
    imgIcon: TrendingDownIcon,
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
    imgIcon: BatteryLowIcon,
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
    imgIcon: ScaleIcon,
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
    imgIcon: WrenchIcon,
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
    imgIcon: ShieldCheckIcon,
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
    imgIcon: ThermometerIcon,
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
    imgIcon: ShieldIcon,
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
    imgIcon: CloudSnowIcon,
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
    imgIcon: ActivityIcon,
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
    imgIcon: ZapIcon,
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
    imgIcon: BarChart2Icon,
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
    imgIcon: FlameIcon,
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
    imgIcon: CpuIcon,
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
    imgIcon: FileCheckIcon,
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
    imgIcon: ScanIcon,
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
    imgIcon: FileTextIcon,
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
    imgIcon: CoinsIcon,
  },
];

const DOWNLOADS: Download[] = [
  {
    id: 1,
    icon: ClipboardListIcon,
    title: "Checkliste: Ertragsminderung – was Sie selbst prüfen können",
    desc: "10 Prüfpunkte, die Betreiber bei Ertragsrückgang sofort selbst kontrollieren können – bevor ein Sachverständiger hinzugezogen wird.",
  },
  {
    id: 2,
    icon: FileTextIcon,
    title: "Übergabeprotokoll PV-Anlage (Muster)",
    desc: "Was ein ordentliches Abnahmedokument enthalten sollte – mit allen Messgrößen, Checklisten und Unterschriftenfeldern.",
  },
  {
    id: 3,
    icon: MessageSquareIcon,
    title: "Leitfaden: Gespräch mit dem Installateur vorbereiten",
    desc: "Ihre Argumente, Ihre Rechte, Ihre nächsten Schritte – strukturiert aufbereitet für ein sachliches und zielführendes Gespräch.",
  },
  {
    id: 4,
    icon: ShieldIcon,
    title: "Checkliste: Schadensfall melden – was Ihre Versicherung braucht",
    desc: "Welche Fotos, Dokumente und Informationen Sie zusammenstellen sollten, damit die Regulierung reibungslos verläuft.",
  },
  {
    id: 5,
    icon: CheckSquareIcon,
    title: "Schnellcheck: Ist Ihre PV-Anlage normkonform installiert?",
    desc: "10 Punkte, die Sie als Betreiber selbst kontrollieren können – mit Verweis auf die zutreffenden Normen und Richtlinien.",
  },
];

const CASES: Case[] = [
  {
    id: 1,
    badge: "Fehlerdiagnose",
    badgeColor: "#EF4444",
    title: "Ertragseinbruch um 40 %",
    meta: "Aufdachanlage, 9,8 kWp · 6 Jahre alt",
    problem:
      "Unerklärlicher Ertragsrückgang um 40 %. Monitoring zeigt String-Abweichungen. Wechselrichter meldet keine Fehler. Installateur sieht keinen Handlungsbedarf.",
    solution:
      "Thermografie identifizierte 4 Module mit defekten Bypass-Dioden – Serienfehler des Herstellers. Gutachten sicherte Gewährleistungsanspruch. Vollständiger Ersatz auf Herstellerkosten durchgesetzt.",
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
    title: "Hagelschaden – Versicherung verweigert Regulierung",
    meta: "Schrägdachanlage, 15 kWp · 3 Jahre alt",
    problem:
      "Nach schwerem Hagel verweigert die Versicherung die Regulierung. Begründung: Schäden seien vorbestehend und nicht hagelbedingt. Schadensumme: 18.400 €.",
    solution:
      "Elektrolumineszenz-Aufnahmen bewiesen den direkten Zusammenhang zwischen Hagelereignis und Zellbruchmuster. Gutachten als Beweismittel – vollständige Regulierung erzielt.",
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
    title: "Speicher verliert 35 % Kapazität in 2 Jahren",
    meta: "Heimspeicher LFP, 10 kWh · 2 Jahre alt",
    problem:
      "Speicher liefert nach 2 Jahren nur noch 65 % der Nennkapazität. Hersteller behauptet normale Alterung. Eigenverbrauchsquote eingebrochen. Garantieanspruch unklar.",
    solution:
      "BMS-Datenanalyse und Impedanzmessung ergaben fehlerhafte Zellbalancierung als Grundursache – kein normaler Verschleiß. Gutachten bestätigte Garantiefall. Austausch auf Herstellerkosten.",
    tags: ["Kapazitätsverlust", "BMS", "Impedanzmessung", "Garantie"],
  },
  {
    id: 4,
    badge: "Installationsmangel",
    badgeColor: "#DC2626",
    title: "Neuanlage: 23 Mängel bei Abnahmeprüfung",
    meta: "Aufdachanlage, 12 kWp · Neuanlage",
    problem:
      "Neue PV-Anlage wirft Fragen auf. Kein Abnahmeprotokoll übergeben. Installateur weicht Detailfragen aus. Anlage läuft, aber Qualität unklar.",
    solution:
      "Unabhängige Abnahmeprüfung offenbarte 23 dokumentierte Mängel: fehlende Zugentlastungen, Cross-Mating bei Steckverbindern, unterschrittener Biegeradius der DC-Leitungen. Mängelbeseitigung auf Installateurkosten.",
    tags: ["Abnahmeprüfung", "Installation", "Cross-Mating", "Neuanlage"],
  },
];

const STATS = [
  { number: "500+", label: "begutachtete PV-Anlagen" },
  { number: "78 %", label: "vermeidbare Installationsmängel festgestellt" },
  { number: "22 %", label: "durchschnittliche Ertragsrückgewinnung" },
  { number: "85 %", label: "erfolgreiche Regulierungen nach Gutachten" },
];

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "g1",
    tab: "glossar",
    title: "Bypass-Diode",
    category: "Modultechnik",
    catKey: "modultechnik",
    docType: "Fachbegriff",
    docTypeKey: "fachbegriff",
    relevanz: "Grundwissen",
    relevanzKey: "grundwissen",
    abstract:
      "Schutzkomponente im PV-Modul, die bei Teilverschattung oder Zelldefekt den Strom um die betroffene Zellgruppe herumleitet. Ein Ausfall führt zu Hotspots und Ertragseinbußen.",
    tags: ["Modul", "Hotspot", "Verschattung", "Diode", "Schutz"],
    refs: "IEC 61215, DIN EN 62446-1",
    catColor: "#EC4899",
  },
  {
    id: "g2",
    tab: "glossar",
    title: "Isolationswiderstand",
    category: "Sicherheit & Brandschutz",
    catKey: "sicherheit",
    docType: "Fachbegriff",
    docTypeKey: "fachbegriff",
    relevanz: "Fortgeschritten",
    relevanzKey: "fortgeschritten",
    abstract:
      "Messgröße für die Qualität der elektrischen Isolation zwischen spannungsführenden Leitern und Erde. Ein zu niedriger Wert weist auf Feuchtigkeitseintritt, Kabelschäden oder Alterung hin und kann den Versicherungsschutz gefährden.",
    tags: ["Sicherheit", "Messung", "Isolation", "Erdung", "Prüfung"],
    refs: "DIN VDE 0100-600, DGUV Vorschrift 3",
    catColor: "#DC2626",
  },
  {
    id: "g3",
    tab: "glossar",
    title: "Performance Ratio (PR)",
    category: "Ertrag & Monitoring",
    catKey: "ertrag",
    docType: "Fachbegriff",
    docTypeKey: "fachbegriff",
    relevanz: "Grundwissen",
    relevanzKey: "grundwissen",
    abstract:
      "Verhältnis zwischen dem tatsächlichen und dem theoretisch möglichen Ertrag einer PV-Anlage unter realen Bedingungen. Der PR-Wert ist die wichtigste Kennzahl zur Bewertung der Anlageneffizienz.",
    tags: ["Ertrag", "Kennzahl", "Monitoring", "Effizienz", "Vergleich"],
    refs: "IEC 61724, Ertragsprognose",
    catColor: "#3B82F6",
  },
  {
    id: "g4",
    tab: "glossar",
    title: "PID (Potential Induced Degradation)",
    category: "Modultechnik",
    catKey: "modultechnik",
    docType: "Fachbegriff",
    docTypeKey: "fachbegriff",
    relevanz: "Fortgeschritten",
    relevanzKey: "fortgeschritten",
    abstract:
      "Spannungsinduzierte Degradation, bei der hohe Systemspannungen zu einem Leistungsverlust einzelner Zellen führen. Tritt bevorzugt bei negativem Pol zur Erde auf und ist in vielen Fällen reversibel.",
    tags: [
      "Degradation",
      "Spannung",
      "Moduldefekt",
      "Leistungsverlust",
      "Zelle",
    ],
    refs: "IEC 62804, Isolationswiderstand",
    catColor: "#EC4899",
  },
  {
    id: "g5",
    tab: "glossar",
    title: "String",
    category: "Modultechnik",
    catKey: "modultechnik",
    docType: "Fachbegriff",
    docTypeKey: "fachbegriff",
    relevanz: "Grundwissen",
    relevanzKey: "grundwissen",
    abstract:
      "Reihenschaltung mehrerer PV-Module, die gemeinsam an einen Wechselrichter-Eingang angeschlossen sind. String-Fehler betreffen alle Module der Reihe und verursachen überproportionale Ertragsverluste.",
    tags: [
      "Verschaltung",
      "Modul",
      "Wechselrichter",
      "Reihenschaltung",
      "Ertrag",
    ],
    refs: "Stringplan, DIN EN 62446-1",
    catColor: "#EC4899",
  },
  {
    id: "g6",
    tab: "glossar",
    title: "Kennlinienmessung (I-V-Kurve)",
    category: "Ertrag & Monitoring",
    catKey: "ertrag",
    docType: "Fachbegriff",
    docTypeKey: "fachbegriff",
    relevanz: "Fortgeschritten",
    relevanzKey: "fortgeschritten",
    abstract:
      "Messtechnisches Verfahren, bei dem die Strom-Spannungs-Kennlinie eines Moduls oder Strings aufgezeichnet wird. Ermöglicht die Identifikation von Zelldefekten, Verschattungseinflüssen und Kontaktproblemen.",
    tags: ["Messung", "Kennlinie", "Diagnose", "String", "Prüfverfahren"],
    refs: "IEC 62446-1, Performance Ratio",
    catColor: "#3B82F6",
  },
  {
    id: "g7",
    tab: "glossar",
    title: "Elektrolumineszenz (EL)",
    category: "Modultechnik",
    catKey: "modultechnik",
    docType: "Fachbegriff",
    docTypeKey: "fachbegriff",
    relevanz: "Expertenwissen",
    relevanzKey: "expertenwissen",
    abstract:
      "Bildgebendes Prüfverfahren, bei dem Module mit Strom beaufschlagt werden und die resultierende Infrarotemission Zellbrüche, Risse und Kontaktfehler sichtbar macht. Standardverfahren bei Hagelschadenbewertung.",
    tags: [
      "Prüfverfahren",
      "Zellbruch",
      "Hagel",
      "Bildgebung",
      "Qualitätskontrolle",
    ],
    refs: "IEC 61215, Hagelschaden",
    catColor: "#EC4899",
  },
  {
    id: "g8",
    tab: "glossar",
    title: "Cross-Mating",
    category: "Sicherheit & Brandschutz",
    catKey: "sicherheit",
    docType: "Fachbegriff",
    docTypeKey: "fachbegriff",
    relevanz: "Fortgeschritten",
    relevanzKey: "fortgeschritten",
    abstract:
      "Unzulässige Kombination von DC-Steckverbindern unterschiedlicher Hersteller. Führt zu erhöhtem Übergangswiderstand, Lichtbogenrisiko und im Extremfall zu Bränden – einer der häufigsten sicherheitsrelevanten Installationsmängel.",
    tags: ["Steckverbinder", "Lichtbogen", "Brand", "Installation", "MC4"],
    refs: "DIN EN 62852, Steckverbinder",
    catColor: "#DC2626",
  },
  {
    id: "g9",
    tab: "glossar",
    title: "BMS (Battery Management System)",
    category: "Speichersysteme",
    catKey: "speichersysteme",
    docType: "Fachbegriff",
    docTypeKey: "fachbegriff",
    relevanz: "Fortgeschritten",
    relevanzKey: "fortgeschritten",
    abstract:
      "Elektronisches Steuerungssystem eines Batteriespeichers, das Ladezustand, Temperatur, Zellspannungen und Balancierung überwacht. BMS-Fehler sind die häufigste Ursache für vorzeitige Speicheralterung.",
    tags: [
      "Batterie",
      "Speicher",
      "Steuerung",
      "Zellbalancierung",
      "Sicherheit",
    ],
    refs: "IEC 62619, Betreiberpflicht Speicherprüfung",
    catColor: "#8B5CF6",
  },
  {
    id: "g10",
    tab: "glossar",
    title: "Hotspot",
    category: "Modultechnik",
    catKey: "modultechnik",
    docType: "Fachbegriff",
    docTypeKey: "fachbegriff",
    relevanz: "Grundwissen",
    relevanzKey: "grundwissen",
    abstract:
      "Lokale Überhitzung einer Solarzelle, verursacht durch Zelldefekte, Teilverschattung oder defekte Bypass-Dioden. Erkennbar durch Thermografie. Im Extremfall Brandursache.",
    tags: ["Thermografie", "Zelldefekt", "Überhitzung", "Modul", "Brandgefahr"],
    refs: "Bypass-Diode, Thermografie, IEC 61215",
    catColor: "#EC4899",
  },
  {
    id: "g11",
    tab: "glossar",
    title: "Potentialausgleich",
    category: "Sicherheit & Brandschutz",
    catKey: "sicherheit",
    docType: "Fachbegriff",
    docTypeKey: "fachbegriff",
    relevanz: "Fortgeschritten",
    relevanzKey: "fortgeschritten",
    abstract:
      "Elektrische Verbindung aller leitfähigen Teile einer PV-Anlage mit der Erdungsanlage. Verhindert gefährliche Berührungsspannungen und ist normativ zwingend vorgeschrieben.",
    tags: ["Erdung", "Blitzschutz", "Sicherheit", "Installation", "Gestell"],
    refs: "DIN VDE 0100-540, DIN EN 62305",
    catColor: "#DC2626",
  },
  {
    id: "g12",
    tab: "glossar",
    title: "Degradation",
    category: "Modultechnik",
    catKey: "modultechnik",
    docType: "Fachbegriff",
    docTypeKey: "fachbegriff",
    relevanz: "Grundwissen",
    relevanzKey: "grundwissen",
    abstract:
      "Alterungsbedingte Leistungsabnahme von PV-Modulen. Unterschieden wird zwischen anfänglicher Degradation (LID/LeTID) und linearer Langzeitdegradation. Herstellergarantien decken typisch 80–85 % nach 25 Jahren.",
    tags: ["Alterung", "Leistungsgarantie", "LID", "Modul", "Langzeit"],
    refs: "Performance Ratio, PID, Leistungsgarantie",
    catColor: "#EC4899",
  },
  {
    id: "g13",
    tab: "glossar",
    title: "Stringplan",
    category: "Montage & Verkabelung",
    catKey: "montage",
    docType: "Fachbegriff",
    docTypeKey: "fachbegriff",
    relevanz: "Grundwissen",
    relevanzKey: "grundwissen",
    abstract:
      "Technische Zeichnung, die die Verschaltung aller Module dokumentiert. Unverzichtbares Dokument für Wartung, Fehlersuche und Versicherungsfall.",
    tags: ["Dokumentation", "Verschaltung", "Modul", "Wartung", "Planung"],
    refs: "DIN EN 62446-1, String",
    catColor: "#F59E0B",
  },
  {
    id: "g14",
    tab: "glossar",
    title: "AFDD (Arc Fault Detection Device)",
    category: "Sicherheit & Brandschutz",
    catKey: "sicherheit",
    docType: "Fachbegriff",
    docTypeKey: "fachbegriff",
    relevanz: "Expertenwissen",
    relevanzKey: "expertenwissen",
    abstract:
      "Fehlerlichtbogen-Schutzeinrichtung, die serielle Lichtbögen auf der DC-Seite erkennt und den Stromkreis unterbricht. In Deutschland empfohlen – insbesondere bei Anlagen auf brennbaren Dächern.",
    tags: [
      "Lichtbogen",
      "Brandschutz",
      "DC-Schutz",
      "Schutzeinrichtung",
      "Sicherheit",
    ],
    refs: "Cross-Mating, Steckverbinder, DIN VDE 0100-712",
    catColor: "#DC2626",
  },
  {
    id: "g15",
    tab: "glossar",
    title: "MPP-Tracking",
    category: "Wechselrichter",
    catKey: "wechselrichter",
    docType: "Fachbegriff",
    docTypeKey: "fachbegriff",
    relevanz: "Grundwissen",
    relevanzKey: "grundwissen",
    abstract:
      "Regelverfahren des Wechselrichters, das den Arbeitspunkt der PV-Module kontinuierlich auf den Punkt maximaler Leistung einstellt. Fehlerhaftes MPP-Tracking führt zu messbaren Ertragsverlusten.",
    tags: ["Wechselrichter", "Leistung", "Optimierung", "Ertrag", "Regelung"],
    refs: "Kennlinienmessung, Performance Ratio",
    catColor: "#6366F1",
  },
  {
    id: "n1",
    tab: "normen",
    title: "DIN EN 62446-1",
    category: "Montage & Verkabelung",
    catKey: "montage",
    docType: "DIN-/VDE-Norm",
    docTypeKey: "din-norm",
    relevanz: "Grundwissen",
    relevanzKey: "grundwissen",
    abstract:
      "Anforderungen an die Dokumentation, Inbetriebnahmeprüfung und periodische Prüfung von PV-Anlagen. Die zentrale Norm für die Abnahme und laufende Überwachung.",
    tags: [
      "Dokumentation",
      "Inbetriebnahme",
      "Prüfung",
      "Abnahme",
      "Protokoll",
    ],
    refs: "Isolationswiderstand, Stringplan, Kennlinienmessung",
    catColor: "#F59E0B",
  },
  {
    id: "n2",
    tab: "normen",
    title: "DIN VDE 0100-600",
    category: "Sicherheit & Brandschutz",
    catKey: "sicherheit",
    docType: "DIN-/VDE-Norm",
    docTypeKey: "din-norm",
    relevanz: "Fortgeschritten",
    relevanzKey: "fortgeschritten",
    abstract:
      "Erstprüfung elektrischer Anlagen. Definiert Prüfschritte wie Isolationswiderstandsmessung, Schleifenimpedanzmessung und Schutzleiterprüfung, die bei Inbetriebnahme nachweislich durchgeführt werden müssen.",
    tags: [
      "Erstprüfung",
      "Elektrosicherheit",
      "Messung",
      "Inbetriebnahme",
      "Protokoll",
    ],
    refs: "Isolationswiderstand, Potentialausgleich",
    catColor: "#DC2626",
  },
  {
    id: "n3",
    tab: "normen",
    title: "DGUV Vorschrift 3",
    category: "Sicherheit & Brandschutz",
    catKey: "sicherheit",
    docType: "Betreiberpflicht",
    docTypeKey: "betreiberpflicht",
    relevanz: "Fortgeschritten",
    relevanzKey: "fortgeschritten",
    abstract:
      "Vorschrift der Deutschen Gesetzlichen Unfallversicherung. Verpflichtet gewerbliche Betreiber zu regelmäßigen Wiederholungsprüfungen in festgelegten Intervallen.",
    tags: [
      "Wiederholungsprüfung",
      "Betreiberpflicht",
      "Gewerblich",
      "Unfallversicherung",
      "Prüffrist",
    ],
    refs: "Isolationswiderstand, DIN VDE 0100-600",
    catColor: "#DC2626",
  },
  {
    id: "n4",
    tab: "normen",
    title: "DIN EN 62305 (Blitzschutz)",
    category: "Sicherheit & Brandschutz",
    catKey: "sicherheit",
    docType: "DIN-/VDE-Norm",
    docTypeKey: "din-norm",
    relevanz: "Fortgeschritten",
    relevanzKey: "fortgeschritten",
    abstract:
      "Normreihe zum Blitzschutz baulicher Anlagen. Regelt äußeren und inneren Blitzschutz, Trennungsabstand zu PV-Anlagen und Überspannungsschutz.",
    tags: [
      "Blitzschutz",
      "Überspannung",
      "Erdung",
      "Trennungsabstand",
      "Gebäude",
    ],
    refs: "Potentialausgleich, Erdung",
    catColor: "#DC2626",
  },
  {
    id: "n5",
    tab: "normen",
    title: "IEC 61215",
    category: "Modultechnik",
    catKey: "modultechnik",
    docType: "DIN-/VDE-Norm",
    docTypeKey: "din-norm",
    relevanz: "Fortgeschritten",
    relevanzKey: "fortgeschritten",
    abstract:
      "Internationale Baumusterprüfung für kristalline PV-Module. Definiert Prüfsequenzen wie Hageltest, Feuchte-Wärme-Test und mechanische Belastung, die ein Modul bestehen muss.",
    tags: ["Modulprüfung", "Zertifizierung", "Baumuster", "Qualität", "Test"],
    refs: "Bypass-Diode, Elektrolumineszenz, Degradation",
    catColor: "#EC4899",
  },
  {
    id: "n6",
    tab: "normen",
    title: "EEG (Erneuerbare-Energien-Gesetz)",
    category: "Wirtschaftlichkeit & Förderung",
    catKey: "wirtschaftlichkeit",
    docType: "EEG-Paragraph",
    docTypeKey: "eeg",
    relevanz: "Grundwissen",
    relevanzKey: "grundwissen",
    abstract:
      "Gesetzlicher Rahmen für Einspeisung, Vergütung und Pflichten von Betreibern erneuerbarer Energieanlagen. Regelt Einspeisevergütung, Direktvermarktung, Meldepflichten und Netzanschluss.",
    tags: [
      "Einspeisevergütung",
      "Förderung",
      "Pflicht",
      "Vergütung",
      "Meldepflicht",
    ],
    refs: "Marktstammdatenregister, Betreiberpflichten",
    catColor: "#F59E0B",
  },
  {
    id: "n7",
    tab: "normen",
    title: "DIN VDE 0100-712",
    category: "Montage & Verkabelung",
    catKey: "montage",
    docType: "DIN-/VDE-Norm",
    docTypeKey: "din-norm",
    relevanz: "Fortgeschritten",
    relevanzKey: "fortgeschritten",
    abstract:
      "Spezifische Errichtungsbestimmung für PV-Stromversorgungssysteme. Regelt Kabeldimensionierung, Schutzmaßnahmen, Trenneinrichtungen und Kennzeichnung.",
    tags: ["Errichtung", "Kabel", "Schutz", "Installation", "Planung"],
    refs: "Cross-Mating, AFDD, Stringplan",
    catColor: "#F59E0B",
  },
  {
    id: "n8",
    tab: "normen",
    title: "IEC 62619",
    category: "Speichersysteme",
    catKey: "speichersysteme",
    docType: "DIN-/VDE-Norm",
    docTypeKey: "din-norm",
    relevanz: "Fortgeschritten",
    relevanzKey: "fortgeschritten",
    abstract:
      "Sicherheitsanforderungen für industrielle Lithium-Akkumulatoren. Definiert Prüfungen für thermische, elektrische und mechanische Sicherheit.",
    tags: ["Batterie", "Sicherheit", "Lithium", "Zulassung", "Prüfung"],
    refs: "BMS, Speichersystem",
    catColor: "#8B5CF6",
  },
  {
    id: "n9",
    tab: "normen",
    title: "Marktstammdatenregister (MaStR)",
    category: "Wirtschaftlichkeit & Förderung",
    catKey: "wirtschaftlichkeit",
    docType: "Betreiberpflicht",
    docTypeKey: "betreiberpflicht",
    relevanz: "Grundwissen",
    relevanzKey: "grundwissen",
    abstract:
      "Bundesnetzagentur-Register, in dem alle Strom- und Gaserzeugungsanlagen registriert sein müssen. Die Registrierung und regelmäßige Aktualisierung ist gesetzliche Pflicht.",
    tags: [
      "Registrierung",
      "Bundesnetzagentur",
      "Meldepflicht",
      "Vergütung",
      "Pflicht",
    ],
    refs: "EEG, Betreiberpflichten",
    catColor: "#F59E0B",
  },
  {
    id: "n10",
    tab: "normen",
    title: "VDE-AR-E 2510-50",
    category: "Speichersysteme",
    catKey: "speichersysteme",
    docType: "Technische Richtlinie",
    docTypeKey: "richtlinie",
    relevanz: "Fortgeschritten",
    relevanzKey: "fortgeschritten",
    abstract:
      "VDE-Anwendungsregel für stationäre Energiespeichersysteme mit Lithium-Batterien. Definiert Anforderungen an Aufstellung, Belüftung, Brandschutz und Zugänglichkeit.",
    tags: ["Speicher", "Aufstellung", "Brandschutz", "Belüftung", "Sicherheit"],
    refs: "BMS, IEC 62619",
    catColor: "#8B5CF6",
  },
  {
    id: "n11",
    tab: "normen",
    title: "DIN EN 62852",
    category: "Montage & Verkabelung",
    catKey: "montage",
    docType: "DIN-/VDE-Norm",
    docTypeKey: "din-norm",
    relevanz: "Expertenwissen",
    relevanzKey: "expertenwissen",
    abstract:
      "Anforderungen an Steckverbinder für DC-Anwendungen in PV-Systemen. Verbietet explizit die Kombination von Steckverbindern unterschiedlicher Hersteller (Cross-Mating).",
    tags: ["Steckverbinder", "DC", "Zulassung", "Kompatibilität", "Sicherheit"],
    refs: "Cross-Mating, Lichtbogen",
    catColor: "#F59E0B",
  },
  {
    id: "n12",
    tab: "normen",
    title: "Betriebssicherheitsverordnung (BetrSichV)",
    category: "Sicherheit & Brandschutz",
    catKey: "sicherheit",
    docType: "Betreiberpflicht",
    docTypeKey: "betreiberpflicht",
    relevanz: "Fortgeschritten",
    relevanzKey: "fortgeschritten",
    abstract:
      "Bundesverordnung zur Sicherheit überwachungsbedürftiger Anlagen. Verpflichtet Arbeitgeber, Gefährdungsbeurteilungen durchzuführen und Prüfungen durch befähigte Personen sicherzustellen.",
    tags: [
      "Betreiberpflicht",
      "Gefährdungsbeurteilung",
      "Prüfpflicht",
      "Gewerblich",
      "Arbeitgeber",
    ],
    refs: "DGUV Vorschrift 3, Wiederholungsprüfung",
    catColor: "#DC2626",
  },
];

const COMPARISONS: ComparisonType[] = [
  {
    id: 1,
    theme: "modulinstallation",
    schwere: "technisch",
    title: "Modulklemmen: korrekt mittig gesetzt vs. zu weit am Rand montiert",
    badColor: "linear-gradient(135deg,#FCA5A5,#EF4444)",
    goodColor: "linear-gradient(135deg,#6EE7B7,#10B981)",
    explain2:
      "Falsch positionierte Klemmen erzeugen Biegespannung im Modulrahmen. Über Jahre entstehen Mikrorisse, die zu Hotspots und Ertragsverlusten führen.",
    explain3:
      "Klemmenposition im markierten Klemmbereich, typisch bei 20–25 % der Modullänge ab Außenkante. Drehmoment gemäß Herstellerangabe.",
    tags: ["Modulklemme", "Montage", "Biegeradius", "Mikroriss", "Drehmoment"],
    badIcon: "⊠ Klemme am Rand",
    goodIcon: "✓ Klemme mittig",
  },
  {
    id: 2,
    theme: "modulinstallation",
    schwere: "technisch",
    title:
      "Modulabstand für Hinterlüftung: eingehalten vs. Module ohne Belüftungsspalt",
    badColor: "linear-gradient(135deg,#FCA5A5,#EF4444)",
    goodColor: "linear-gradient(135deg,#6EE7B7,#10B981)",
    explain2:
      "Fehlende Hinterlüftung erhöht die Modultemperatur um bis zu 15 °C. Pro Grad Celsius sinkt die Leistung um 0,35–0,45 % – summiert sich zu mehreren Prozent Jahresertragsverlust.",
    explain3:
      "Modulabstand gemäß Herstellerdatenblatt. Bei Aufdachmontage mind. 10–15 cm Abstand für ausreichende Konvektionskühlung.",
    tags: [
      "Hinterlüftung",
      "Temperatur",
      "Ertragsverlust",
      "Montage",
      "Modulabstand",
    ],
    badIcon: "⊠ Kein Spalt",
    goodIcon: "✓ 2cm Abstand",
  },
  {
    id: 3,
    theme: "kabel",
    schwere: "sicherheit",
    title:
      "DC-Kabelführung: UV-geschützt und zugentlastet vs. frei hängende Kabel",
    badColor: "linear-gradient(135deg,#FCA5A5,#EF4444)",
    goodColor: "linear-gradient(135deg,#6EE7B7,#10B981)",
    explain2:
      "Frei hängende Kabel sind UV, Wind und Abrieb ausgesetzt. Fehlende Zugentlastung lockert Kontakte – Ausgangspunkt für Lichtbögen und Brände.",
    explain3:
      "Kabelführung in UV-beständigem Wellrohr gemäß DIN VDE 0100-712. Zugentlastung an jedem Steckverbinder.",
    tags: [
      "Kabelführung",
      "UV-Schutz",
      "Zugentlastung",
      "DC-Seite",
      "Brandschutz",
    ],
    badIcon: "⊠ Frei hängend",
    goodIcon: "✓ UV-geschützt",
  },
  {
    id: 4,
    theme: "kabel",
    schwere: "normen",
    title:
      "Steckverbinder: gleicher Hersteller korrekt verrastet vs. Cross-Mating",
    badColor: "linear-gradient(135deg,#FCA5A5,#EF4444)",
    goodColor: "linear-gradient(135deg,#6EE7B7,#10B981)",
    explain2:
      "Cross-Mating ist gemäß DIN EN 62852 verboten. Unterschiedliche Kontaktgeometrien führen zu Temperaturen über 300 °C – eine der häufigsten Brandursachen bei PV-Anlagen.",
    explain3:
      "Ausschließlich Stecker und Buchsen desselben Herstellers verwenden. Verrastung durch hörbares Einrasten und Zugprüfung verifizieren.",
    tags: ["Cross-Mating", "Steckverbinder", "Normenverstoß", "Brand", "MC4"],
    badIcon: "⊠ Cross-Mating",
    goodIcon: "✓ Gleicher Hersteller",
  },
  {
    id: 5,
    theme: "thermografie",
    schwere: "technisch",
    title: "Thermografie: gleichmäßiges Wärmebild vs. Hotspot durch Zelldefekt",
    badColor: "linear-gradient(135deg,#FCA5A5,#FCD34D)",
    goodColor: "linear-gradient(135deg,#6EE7B7,#10B981)",
    explain2:
      "Ein Hotspot weist auf Zellbruch, Kontaktfehler oder defekte Bypass-Diode hin. Leistungsverlust und beschleunigte Alterung – im Extremfall Brandgefahr.",
    explain3:
      "Regelmäßige Thermografie-Inspektion gemäß IEC TS 62446-3. Hotspots > 20 °C Differenz erfordern zeitnahe elektrische Prüfung.",
    tags: ["Thermografie", "Hotspot", "Infrarot", "Zelldefekt", "Temperatur"],
    badIcon: "⊠ Hotspot >30°C",
    goodIcon: "✓ Gleichmäßig",
  },
  {
    id: 6,
    theme: "thermografie",
    schwere: "technisch",
    title: "String-Thermografie: mit und ohne Bypass-Dioden-Fehler",
    badColor: "linear-gradient(135deg,#FCA5A5,#FCD34D)",
    goodColor: "linear-gradient(135deg,#6EE7B7,#10B981)",
    explain2:
      "Bei Ausfall einer Bypass-Diode wird das geschwächte Segment durch den String-Strom aufgeheizt. Leistungsverlust und Alterungsbeschleunigung.",
    explain3:
      "Bypass-Dioden-Test mittels Thermografie oder I-V-Kennlinienmessung. Bei Ausfall: Austausch der Anschlussdose durch Fachbetrieb.",
    tags: [
      "Bypass-Diode",
      "Thermografie",
      "String",
      "Zellsegment",
      "Anschlussdose",
    ],
    badIcon: "⊠ 1/3 Segmente heiß",
    goodIcon: "✓ Gleichmäßig",
  },
  {
    id: 7,
    theme: "dach",
    schwere: "sicherheit",
    title: "Dachdurchführung: EPDM-Manschette vs. Baumarkt-Silikon",
    badColor: "linear-gradient(135deg,#FCA5A5,#EF4444)",
    goodColor: "linear-gradient(135deg,#6EE7B7,#10B981)",
    explain2:
      "Silikon-Fugen verspröden unter UV-Einwirkung. Wassereintritt in die Dachkonstruktion – die Versicherung kann die Regulierung ablehnen.",
    explain3:
      "Dachdurchführungen mit EPDM-Dichtmanschetten und Eindeckrahmen, eingebunden in die Dacheindeckung. Nur UV- und witterungsbeständige Materialien.",
    tags: [
      "Dachdurchführung",
      "Abdichtung",
      "EPDM",
      "Wasserschaden",
      "Dachintegration",
    ],
    badIcon: "⊠ Silikon rissig",
    goodIcon: "✓ EPDM-Manschette",
  },
  {
    id: 8,
    theme: "dokumentation",
    schwere: "normen",
    title: "Anlagendokumentation: vollständig vs. unzureichend",
    badColor: "linear-gradient(135deg,#FCA5A5,#EF4444)",
    goodColor: "linear-gradient(135deg,#6EE7B7,#10B981)",
    explain2:
      "Unvollständige Dokumentation verstößt gegen DIN EN 62446-1 und kann dazu führen, dass Gewährleistungs- oder Versicherungsansprüche abgelehnt werden.",
    explain3:
      "Anlagenübersichtsplan, Stringplan, Messprotokolle (Isolationswiderstand, Leerlaufspannung je String), Inbetriebnahmeprotokoll mit Unterschrift.",
    tags: [
      "Dokumentation",
      "Protokoll",
      "Stringplan",
      "Isolationsmessung",
      "DIN 62446",
    ],
    badIcon: "⊠ Lose Zettel",
    goodIcon: "✓ Vollständig",
  },
  {
    id: 9,
    theme: "blitzschutz",
    schwere: "normen",
    title: "Potentialausgleich: normgerecht angeschlossen vs. fehlende Erdung",
    badColor: "linear-gradient(135deg,#FCA5A5,#EF4444)",
    goodColor: "linear-gradient(135deg,#6EE7B7,#10B981)",
    explain2:
      "Fehlender Potentialausgleich erzeugt bei Blitzeinschlag oder Isolationsfehlern lebensgefährliche Berührungsspannungen. Kann den Versicherungsschutz aushebeln.",
    explain3:
      "Alle leitfähigen Teile gemäß DIN VDE 0100-540 mit dem Hauptpotentialausgleich verbinden. Zugelassene Erdungsklemmstellen verwenden.",
    tags: [
      "Potentialausgleich",
      "Erdung",
      "Blitzschutz",
      "Sicherheit",
      "Unterkonstruktion",
    ],
    badIcon: "⊠ Keine Erdung",
    goodIcon: "✓ PA angeschlossen",
  },
  {
    id: 10,
    theme: "speicher",
    schwere: "sicherheit",
    title:
      "Speicheraufstellung: normkonform im belüfteten Raum vs. im Abstellraum",
    badColor: "linear-gradient(135deg,#FCA5A5,#EF4444)",
    goodColor: "linear-gradient(135deg,#6EE7B7,#10B981)",
    explain2:
      "Im Falle eines Thermal Runaway setzt eine Lithium-Zelle toxische Gase frei. Ohne Belüftung und Abstände zu brennbarem Material kann ein unkontrollierbarer Brand entstehen.",
    explain3:
      "Aufstellung gemäß VDE-AR-E 2510-50: Mindestabstände zu brennbaren Materialien, natürliche Belüftung, Zugang für Wartung und Rettungskräfte.",
    tags: [
      "Speicher",
      "Aufstellung",
      "Thermal Runaway",
      "Belüftung",
      "Brandschutz",
    ],
    badIcon: "⊠ Abstellraum",
    goodIcon: "✓ Technikraum",
  },
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

  // Glossary state
  const [activeTab, setActiveTab] = useState<"glossar" | "normen">("glossar");
  const [glossarySearch, setGlossarySearch] = useState("");
  const [glossaryCat, setGlossaryCat] = useState("all");
  const [glossaryRelevanz, setGlossaryRelevanz] = useState("all");

  // Comparison state
  const [compThema, setCompThema] = useState("all");
  const [compSchwere, setCompSchwere] = useState("all");

  const filteredGlossary = GLOSSARY_TERMS.filter((t) => {
    if (t.tab !== activeTab) return false;
    const q = glossarySearch.toLowerCase();
    const matchSearch =
      q === "" ||
      t.title.toLowerCase().includes(q) ||
      t.abstract.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q));
    const matchCat = glossaryCat === "all" || t.catKey === glossaryCat;
    const matchRel =
      glossaryRelevanz === "all" || t.relevanzKey === glossaryRelevanz;
    return matchSearch && matchCat && matchRel;
  });

  const filteredComparisons = COMPARISONS.filter((c) => {
    const matchThema = compThema === "all" || c.theme === compThema;
    const matchSchwere = compSchwere === "all" || c.schwere === compSchwere;
    return matchThema && matchSchwere;
  });

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
            {DOWNLOADS.map((d) => {
              const DlIcon = d.icon;
              return (
                <div
                  className="flex flex-col rounded-xl border border-border bg-background p-6 transition-all hover:shadow-md"
                  key={d.id}
                >
                  <div className="mb-4">
                    <DlIcon className="size-8 text-primary" />
                  </div>
                  <h3 className="mb-2 font-bold text-base text-foreground leading-snug">
                    {d.title}
                  </h3>
                  <p className="mb-5 flex-1 text-muted-foreground text-sm leading-relaxed">
                    {d.desc}
                  </p>
                  <Button
                    className="w-full"
                    disabled
                    size="sm"
                    variant="outline"
                  >
                    <FileDownIcon className="mr-2 size-4" />
                    In Kürze verfügbar
                  </Button>
                </div>
              );
            })}
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
                <div className="mb-3 flex items-start gap-3">
                  <span
                    className="mt-0.5 shrink-0 rounded-md px-2.5 py-1 font-semibold text-white text-xs"
                    style={{ background: c.badgeColor }}
                  >
                    {c.badge}
                  </span>
                  <div>
                    <h3 className="font-bold text-foreground text-sm leading-snug">
                      {c.title}
                    </h3>
                    <p className="mt-0.5 text-muted-foreground text-xs">
                      {c.meta}
                    </p>
                  </div>
                </div>
                <p className="mb-1 text-muted-foreground text-sm leading-relaxed">
                  <span className="font-semibold text-foreground">
                    Problem:{" "}
                  </span>
                  {c.problem}
                </p>
                <p className="mb-5 flex-1 text-muted-foreground text-sm leading-relaxed">
                  <span className="font-semibold text-foreground">
                    Ergebnis:{" "}
                  </span>
                  {c.solution}
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
                  <Link
                    hash="kontakt-formular"
                    search={{ tab: "anfrage" }}
                    to="/kontakt"
                  >
                    Ähnlichen Fall besprechen
                    <ArrowRightIcon className="ml-1 size-3.5" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Glossar & Normen ─────────────────────────────────────── */}
      <section
        aria-labelledby="glossary-title"
        className="bg-muted/40 py-20 md:py-28"
        id="glossary"
      >
        <div className="section-container">
          <div className="mb-10 text-center">
            <div className="section-label mb-3 justify-center">
              <span className="solar-bar" />
              <span>Wissensarchiv</span>
            </div>
            <h2
              className="mb-3 font-extrabold text-3xl tracking-tight md:text-4xl"
              id="glossary-title"
            >
              Verstehen, was zählt: PV-Fachbegriffe und Ihr rechtlicher Kompass
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Fachbegriffe nachschlagen, Normen verstehen und die Pflichten
              kennen, die für den Betrieb Ihrer Anlage tatsächlich gelten.
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex gap-2">
            {(
              [
                { key: "glossar", label: "Fachbegriffe A–Z" },
                { key: "normen", label: "Normen, Gesetze & Pflichten" },
              ] as const
            ).map((tab) => (
              <button
                className={cn(
                  "rounded-lg border px-5 py-2 font-semibold text-sm transition-all",
                  activeTab === tab.key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setGlossarySearch("");
                  setGlossaryCat("all");
                  setGlossaryRelevanz("all");
                }}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 text-muted-foreground" />
              <Input
                className="h-10 pl-9"
                onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder="Suchbegriff, Norm oder Pflicht eingeben…"
                type="text"
                value={glossarySearch}
              />
            </div>
            <Select onValueChange={setGlossaryCat} value={glossaryCat}>
              <SelectTrigger className="h-10 w-full sm:w-56">
                <SelectValue placeholder="Alle Kategorien" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Kategorien</SelectItem>
                <SelectItem value="modultechnik">Modultechnik</SelectItem>
                <SelectItem value="wechselrichter">Wechselrichter</SelectItem>
                <SelectItem value="speichersysteme">Speichersysteme</SelectItem>
                <SelectItem value="montage">Montage & Verkabelung</SelectItem>
                <SelectItem value="ertrag">Ertrag & Monitoring</SelectItem>
                <SelectItem value="sicherheit">
                  Sicherheit & Brandschutz
                </SelectItem>
                <SelectItem value="wirtschaftlichkeit">
                  Wirtschaftlichkeit & Förderung
                </SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={setGlossaryRelevanz}
              value={glossaryRelevanz}
            >
              <SelectTrigger className="h-10 w-full sm:w-48">
                <SelectValue placeholder="Alle Stufen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Stufen</SelectItem>
                <SelectItem value="grundwissen">Grundwissen</SelectItem>
                <SelectItem value="fortgeschritten">Fortgeschritten</SelectItem>
                <SelectItem value="expertenwissen">Expertenwissen</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredGlossary.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGlossary.map((term) => (
                <GlossaryCard key={term.id} term={term} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-muted-foreground">
              <p className="font-medium">Kein Eintrag gefunden.</p>
              <button
                className="mt-2 text-primary text-sm hover:underline"
                onClick={() => {
                  setGlossarySearch("");
                  setGlossaryCat("all");
                  setGlossaryRelevanz("all");
                }}
                type="button"
              >
                Filter zurücksetzen
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Gut vs. Schlecht ─────────────────────────────────────── */}
      <section
        aria-labelledby="comparison-title"
        className="py-20 md:py-28"
        id="comparison"
      >
        <div className="section-container">
          <div className="mb-10">
            <div className="section-label mb-3">
              <span className="solar-bar" />
              <span>Praxisbeispiele</span>
            </div>
            <h2
              className="mb-3 font-extrabold text-3xl tracking-tight md:text-4xl"
              id="comparison-title"
            >
              Auf den zweiten Blick: Was gute von schlechter PV-Praxis
              unterscheidet
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Anonymisierte Realbeispiele aus der täglichen Gutachterpraxis.
              Schulen Sie Ihr Auge für die Qualitätsmerkmale, die über
              Sicherheit, Ertrag und Werterhalt entscheiden.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-3">
            <Select onValueChange={setCompThema} value={compThema}>
              <SelectTrigger className="h-10 w-full sm:w-64">
                <SelectValue placeholder="Alle Themenfelder" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Themenfelder</SelectItem>
                <SelectItem value="modulinstallation">
                  Modulinstallation
                </SelectItem>
                <SelectItem value="kabel">
                  Kabelführung & Steckverbinder
                </SelectItem>
                <SelectItem value="thermografie">
                  Thermografie-Auffälligkeiten
                </SelectItem>
                <SelectItem value="dach">
                  Dachintegration & Unterkonstruktion
                </SelectItem>
                <SelectItem value="speicher">
                  Speichersystem & Batterieraum
                </SelectItem>
                <SelectItem value="blitzschutz">
                  Blitzschutz & Erdung
                </SelectItem>
                <SelectItem value="dokumentation">
                  Dokumentation & Kennzeichnung
                </SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setCompSchwere} value={compSchwere}>
              <SelectTrigger className="h-10 w-full sm:w-56">
                <SelectValue placeholder="Alle Schweregrade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Schweregrade</SelectItem>
                <SelectItem value="optisch">Optischer Mangel</SelectItem>
                <SelectItem value="technisch">Technischer Mangel</SelectItem>
                <SelectItem value="sicherheit">
                  Sicherheitsrelevanter Mangel
                </SelectItem>
                <SelectItem value="normen">Normenverstoß</SelectItem>
              </SelectContent>
            </Select>
            {(compThema !== "all" || compSchwere !== "all") && (
              <button
                className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-muted-foreground text-sm hover:border-primary/30 hover:text-primary"
                onClick={() => {
                  setCompThema("all");
                  setCompSchwere("all");
                }}
                type="button"
              >
                <XIcon className="size-3.5" />
                Zurücksetzen
              </button>
            )}
          </div>

          {filteredComparisons.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-1">
              {filteredComparisons.map((c) => (
                <ComparisonCard comparison={c} key={c.id} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-muted-foreground">
              <p className="font-medium">
                Keine Vergleiche für diese Filterauswahl.
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-dark-surface p-10 text-center">
            <h3 className="mb-3 font-bold text-2xl text-dark-surface-foreground">
              Sie haben Ähnlichkeiten mit Ihrer eigenen Anlage entdeckt?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-dark-surface-foreground/75 leading-relaxed">
              Viele der hier gezeigten Mängel sind mit bloßem Auge nicht
              erkennbar. Eine professionelle Prüfung – vor Ort oder als
              Fernbewertung anhand Ihrer Fotos – gibt Ihnen belastbare
              Grundlagen.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant={"default"}>
                <Link
                  hash="kontakt-formular"
                  search={{ tab: "termin" }}
                  to="/kontakt"
                >
                  Vor-Ort-Prüfung anfragen
                </Link>
              </Button>
              <Button asChild variant={"outline"}>
                <Link
                  hash="kontakt-formular"
                  search={{ tab: "anfrage" }}
                  to="/kontakt"
                >
                  Fernbewertung starten
                </Link>
              </Button>
            </div>
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
            <Badge className="mb-5 gap-1.5 bg-white/20 font-semibold text-primary-foreground hover:bg-white/20">
              <FileDownIcon className="size-3.5" />
              PDF-Download · 100% Kostenlos
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
  const ImgIcon = article.imgIcon;
  return (
    <article className="hover:-translate-y-1 flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* Colored header strip */}
      <div
        aria-hidden="true"
        className="flex h-36 items-center justify-center"
        style={{ background: article.imgBg }}
      >
        <ImgIcon className="size-12 text-white opacity-90" />
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

// ─── Glossary Card ────────────────────────────────────────────────────────────

function GlossaryCard({ term }: { term: GlossaryTerm }) {
  const relevanzColors: Record<string, string> = {
    grundwissen: "bg-emerald-100 text-emerald-700",
    fortgeschritten: "bg-blue-100 text-blue-700",
    expertenwissen: "bg-violet-100 text-violet-700",
  };
  const docTypeColors: Record<string, string> = {
    norm: "bg-amber-100 text-amber-700",
    richtlinie: "bg-sky-100 text-sky-700",
    merkblatt: "bg-orange-100 text-orange-700",
    fachbegriff: "bg-slate-100 text-slate-700",
  };
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="font-bold text-base text-foreground leading-snug">
          {term.title}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 font-semibold text-xs ${docTypeColors[term.docTypeKey] ?? "bg-muted text-muted-foreground"}`}
        >
          {term.docType}
        </span>
      </div>

      {/* Category + relevance */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        <span
          className="rounded-full px-2 py-0.5 font-medium text-xs"
          style={{ background: term.catColor + "22", color: term.catColor }}
        >
          {term.category}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 font-medium text-xs ${relevanzColors[term.relevanzKey] ?? "bg-muted text-muted-foreground"}`}
        >
          {term.relevanz}
        </span>
      </div>

      {/* Abstract */}
      <p className="mb-4 flex-1 text-muted-foreground text-sm leading-relaxed">
        {term.abstract}
      </p>

      {/* Tags */}
      <div className="mb-3 flex flex-wrap gap-1">
        {term.tags.map((t) => (
          <span
            className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs"
            key={t}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Refs */}
      {term.refs && (
        <p className="text-muted-foreground/60 text-xs">
          <span className="font-medium">Quellen:</span> {term.refs}
        </p>
      )}
    </div>
  );
}

// ─── Comparison Card ──────────────────────────────────────────────────────────

function ComparisonCard({ comparison: c }: { comparison: ComparisonType }) {
  const themaLabel: Record<string, string> = {
    modulinstallation: "Modulinstallation",
    kabel: "Kabel & Stecker",
    thermografie: "Thermografie",
    dach: "Dach & Unterkonstruktion",
    speicher: "Speichersystem",
    blitzschutz: "Blitzschutz & Erdung",
    dokumentation: "Dokumentation",
  };
  const severityLabel: Record<string, string> = {
    optisch: "Optisch",
    technisch: "Technisch",
    sicherheit: "Sicherheitsrelevant",
    normen: "Normenverstoß",
  };
  const severityIcon: Record<string, React.ReactNode> = {
    optisch: <EyeIcon className="size-3" />,
    technisch: <WrenchIcon className="size-3" />,
    sicherheit: <AlertCircleIcon className="size-3" />,
    normen: <FileCheckIcon className="size-3" />,
  };
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Title bar */}
      <div className="flex items-center justify-between border-border border-b bg-muted/40 px-5 py-3">
        <p className="mb-2 font-semibold text-foreground text-sm leading-snug">
          {c.title}
        </p>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant={"default"}>{themaLabel[c.theme] ?? c.theme}</Badge>
          <Badge className="gap-1" variant="secondary">
            {severityIcon[c.schwere]}
            {severityLabel[c.schwere] ?? c.schwere}
          </Badge>
        </div>
      </div>

      {/* Comparison slider */}
      <Comparison className="h-56" mode="drag">
        {/* Left – Mangelhaft */}
        <ComparisonItem
          className="flex flex-col gap-3 bg-red-50 p-5 dark:bg-red-950/30"
          position="left"
        >
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-red-100 px-2.5 py-0.5 font-semibold text-red-700 text-xs dark:bg-red-900/50 dark:text-red-400">
              {c.badIcon}
            </span>
            <span className="font-bold text-red-700 text-xs uppercase tracking-wider dark:text-red-400">
              Mangelhaft
            </span>
          </div>
          <p className="text-foreground/80 text-sm leading-relaxed">
            {c.explain2}
          </p>
        </ComparisonItem>

        {/* Right – Normgerecht */}
        <ComparisonItem
          className="flex flex-col gap-3 bg-green-50 p-5 dark:bg-green-950/30"
          position="right"
        >
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 font-semibold text-green-700 text-xs dark:bg-green-900/50 dark:text-green-400">
              {c.goodIcon}
            </span>
            <span className="font-bold text-green-700 text-xs uppercase tracking-wider dark:text-green-400">
              Normgerecht
            </span>
          </div>
          <p className="text-foreground/80 text-sm leading-relaxed">
            {c.explain3}
          </p>
        </ComparisonItem>

        <ComparisonHandle />
      </Comparison>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 border-border border-t px-5 py-3">
        {c.tags.map((t) => (
          <span
            className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs"
            key={t}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
