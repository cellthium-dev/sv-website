/**
 * Central site configuration.
 * Edit this file to update all site content — no need to touch individual components.
 */

export const siteConfig = {
  /** Business identity */
  name: "Andreas Bauten",
  tagline: "Sachverständiger für Photovoltaik & Batteriesysteme",
  shortTagline: "PV & Batteriesysteme",
  description:
    "ISO-17024 zertifizierter Sachverständiger für Photovoltaikanlagen und Batteriesysteme. Unabhängige Gutachten, Schadenanalyse und Beratung — deutschlandweit.",

  /** Contact details */
  contact: {
    email: "info@sv-bauten.de",
    phone: "+49 (0) 1567-9790851",
    address: "52072 Aachen",
    location: "Aachen, NRW",
    coverage: "Deutschlandweit tätig mit Schwerpunkt NRW",
    hours: "Mo–Fr: 09:00–17:00 Uhr",
  },

  /** Navigation items (Kontakt is separate CTA button) */
  nav: [
    { label: "Über mich", href: "/ueber-mich" },
    { label: "Leistungen", href: "/leistungen" },
    { label: "Wissensbereich", href: "/wissen" },
    { label: "Tools", href: "/tools" },
  ] as Array<{ label: string; href: string }>,

  /** Trust / credential badges shown in the hero */
  badges: [
    { text: "ISO-17024 zertifiziert" },
    { text: "BDSF-Mitglied" },
    { text: "Functional Safety Expert" },
    { text: "M.Sc. Elektrotechnik" },
  ],

  /** Hero section */
  hero: {
    headline:
      "Unabhängige Sachverständigen-Gutachten für Photovoltaik & Batteriesysteme",
    subline: "ISO-17024 zertifiziert · Deutschlandweit tätig · Schwerpunkt NRW",
    primaryCta: { label: "Jetzt Beratung buchen", href: "#kontakt" },
    secondaryCta: { label: "Leistungen ansehen", href: "#leistungen" },
  },

  /** Services offered */
  services: [
    {
      iconKey: "scan-search",
      title: "Fehlerdiagnose & Schadenanalyse",
      description:
        "Präzise Identifikation und Bewertung technischer Probleme an PV-Anlagen und Batteriespeichern. Von Ertragsminderungen über Moduldefekte bis hin zu Wechselrichterausfällen.",
      features: [
        "Thermografische Untersuchung (Hotspot-Erkennung)",
        "Kennlinienmessung (I-V-Kurvenanalyse)",
        "Stringanalyse & Fehlersuche",
        "Wechselrichter-Diagnose & Batteriespeicher-Prüfung",
      ],
      ctaText: "Schadenfall melden",
      ctaLink: "#kontakt",
      highlight: false,
    },
    {
      iconKey: "clipboard-list",
      title: "Anlagenabnahme & Inbetriebnahmeprüfung",
      description:
        "Normgerechte Prüfung bei Neuinstallation, Erweiterung oder Repowering nach VDE 0100-712 und DIN EN 62446-1. Unabhängige Qualitätssicherung vor der Inbetriebnahme.",
      features: [
        "Vor-Ort-Prüfung bei Inbetriebnahme",
        "Dokumentenprüfung & Konformitätsbewertung",
        "Prüfung Schutzmaßnahmen & Erdung",
        "Isolationsmessung & Überspannungsschutz-Prüfung",
      ],
      ctaText: "Abnahme beauftragen",
      ctaLink: "#kontakt",
      highlight: false,
    },
    {
      iconKey: "trending-up",
      title: "Ertragsprüfung & Wirtschaftlichkeit",
      description:
        "Analyse bei Leistungsabweichungen und fundierte Bewertung der tatsächlichen Anlageneffizienz. Vergleich von Ertragsprognose und Realertrag mit konkreten Optimierungsempfehlungen.",
      features: [
        "Ertragsprognose vs. Realertrag (Performance Ratio)",
        "Monitoring-Datenauswertung & Vergleichsanalyse",
        "Amortisationsrechnung & ROI-Berechnung",
        "Degradationsanalyse & Optimierungsempfehlungen",
      ],
      ctaText: "Ertragsprüfung starten",
      ctaLink: "#kontakt",
      highlight: false,
    },
    {
      iconKey: "shield-check",
      title: "Schadensgutachten & Versicherungsfälle",
      description:
        "Gutachterliche Bewertung nach Sturm, Hagel, Brand, Überspannung oder Installationsfehlern. Klarer Fokus auf Ursache, Umfang und wirtschaftliche Folgen – normkonform und gerichtsfest.",
      features: [
        "Schadensursachenermittlung & Dokumentation",
        "Bewertung für Versicherungsregulierung",
        "Beweissicherungsgutachten",
        "Gerichtsgutachten nach ZPO",
      ],
      ctaText: "Schadensfall melden",
      ctaLink: "#kontakt",
      highlight: false,
    },
    {
      iconKey: "wrench",
      title: "Batteriespeicher & Hochvoltprüfung",
      description:
        "Bewertung von Batteriespeichern und Hochvoltsystemen hinsichtlich Aufbau, Sicherheit und Einhaltung einschlägiger Normen. Expertise aus über 5 Jahren BMS-Entwicklung.",
      features: [
        "Bewertung Zellchemie & BMS-Logik",
        "Sicherheitsprüfung (Brandrisiko, Aufstellung)",
        "Ladeprofil-Analyse & Systemintegration",
        "Konformität nach IEC 62933, UN 38.3, UL-Normen",
      ],
      ctaText: "Speicher prüfen lassen",
      ctaLink: "#kontakt",
      highlight: false,
    },
    {
      iconKey: "monitor",
      title: "Online-Gutachten & Ferndiagnose",
      description:
        "Schnelle Ersteinschätzung auf Basis von Fotos, Monitoring-Daten und Unterlagen – bundesweit, ohne Vor-Ort-Termin. Kurzfristige Rückmeldung mit klarer Empfehlung.",
      features: [
        "Express-Rückmeldung innerhalb 24–48 Stunden",
        "Festpreis ab 249 €",
        "Bild-Upload & Dokumentenanalyse",
        "Digitales Gutachten (PDF)",
      ],
      ctaText: "Online-Gutachten starten",
      ctaLink: "#kontakt",
      highlight: true,
    },
  ],

  /** Footer links */
  footerLinks: {
    services: [
      { label: "Fehlerdiagnose & Schadenanalyse", href: "/leistungen" },
      { label: "Anlagenabnahme & Inbetriebnahme", href: "/leistungen" },
      { label: "Ertragsprüfung & Wirtschaftlichkeit", href: "/leistungen" },
      { label: "Online-Gutachten ab 249 €", href: "/leistungen" },
    ],
    info: [
      { label: "Über mich", href: "/ueber-mich" },
      { label: "Wissensbereich", href: "/wissen" },
      { label: "Tools", href: "/tools" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    legal: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutzerklärung", href: "/datenschutz" },
      { label: "AGB", href: "/agb" },
      { label: "Widerrufsrecht", href: "/widerruf" },
    ],
  },

  /** Copyright year */
  copyrightYear: 2026,
} as const;

export type SiteConfig = typeof siteConfig;
