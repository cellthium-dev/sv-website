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
    email: "service@sv-bauten.de",
    address: "Banker-Feld-Str. 1, 52072 Aachen",
    location: "Aachen, NRW",
    coverage: "Deutschlandweit tätig mit Schwerpunkt NRW",
  },

  /** Navigation items */
  nav: [
    { label: "Startseite", href: "#home" },
    { label: "Leistungen", href: "#leistungen" },
    { label: "Wissen", href: "#wissen" },
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
      iconKey: "clipboard-list",
      title: "Technische Gutachten",
      description:
        "Umfassende technische Begutachtung von Photovoltaikanlagen und Batteriespeichersystemen nach VDE/DIN-Normen.",
      features: [
        "Anlagenabnahme & Inbetriebnahme",
        "Bestandsaufnahme & Zustandsbewertung",
        "Konformitätsprüfung",
        "Versicherungsgutachten",
      ],
      ctaText: "Gutachten anfordern",
      ctaLink: "#kontakt",
      highlight: false,
    },
    {
      iconKey: "scan-search",
      title: "Schadenanalyse",
      description:
        "Detaillierte Untersuchung von Schäden und Leistungsminderungen an PV-Anlagen und Batteriesystemen.",
      features: [
        "Fehlerdiagnose & Ursachenanalyse",
        "Thermografie-Untersuchungen",
        "Elektrische Messungen (IV-Kennlinien)",
        "Dokumentation für Versicherungen",
      ],
      ctaText: "Schadenfall melden",
      ctaLink: "#kontakt",
      highlight: false,
    },
    {
      iconKey: "trending-up",
      title: "Wirtschaftlichkeitsprüfung",
      description:
        "Analyse und Bewertung der Wirtschaftlichkeit und Ertragsprognose Ihrer PV-Anlage.",
      features: [
        "Ertragsprüfung & Vergleichsanalyse",
        "Performance Ratio Berechnung",
        "Amortisationsrechnung",
        "Optimierungsempfehlungen",
      ],
      ctaText: "Ertragsprüfung starten",
      ctaLink: "#kontakt",
      highlight: false,
    },
    {
      iconKey: "wrench",
      title: "Beratung für Installateure",
      description:
        "Fachliche Unterstützung für Installationsbetriebe bei komplexen Projekten.",
      features: [
        "Planungsberatung",
        "Normenkonformität",
        "Qualitätssicherung",
        "Schulungen",
      ],
      ctaText: "Beratung buchen",
      ctaLink: "#kontakt",
      highlight: false,
    },
    {
      iconKey: "shield-check",
      title: "Versicherungsberatung",
      description:
        "Neutrale Expertise für Versicherungen bei Schadenfällen und Leistungsbewertungen.",
      features: [
        "Schadensbewertung",
        "Wertermittlung",
        "Gutachten für Regulierung",
        "Technische Klärung",
      ],
      ctaText: "Anfrage stellen",
      ctaLink: "#kontakt",
      highlight: false,
    },
    {
      iconKey: "monitor",
      title: "Online-Gutachten",
      description:
        "Schnelle Erstbewertung per Bild-Upload mit Festpreis-Transparenz.",
      features: [
        "Express-Rückmeldung (48h)",
        "Festpreis ab 249€",
        "Bild-Upload & Datenanalyse",
        "Digitales Gutachten (PDF)",
      ],
      ctaText: "Online-Gutachten starten",
      ctaLink: "#kontakt",
      highlight: true, // Featured service
    },
  ],

  /** Footer links */
  footerLinks: {
    services: [
      { label: "Technische Gutachten", href: "#leistungen" },
      { label: "Schadenanalyse", href: "#leistungen" },
      { label: "Wirtschaftlichkeitsprüfung", href: "#leistungen" },
      { label: "Online-Gutachten", href: "#leistungen" },
    ],
    info: [
      { label: "Über mich", href: "#ueber-mich" },
      { label: "Wissensbereich", href: "#wissen" },
      { label: "Kontakt", href: "#kontakt" },
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
