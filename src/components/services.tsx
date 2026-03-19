import type { Service } from "../types";

export default function Services() {
  const services: Service[] = [
    {
      icon: "📋",
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
    },
    {
      icon: "🔍",
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
    },
    {
      icon: "💰",
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
    },
    {
      icon: "🏗️",
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
    },
    {
      icon: "🛡️",
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
    },
    {
      icon: "💻",
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
    },
  ];

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-16" id="leistungen">
      <div className="container mx-auto px-5">
        <h2 className="mb-4 text-center font-bold text-4xl">
          Meine Leistungen
        </h2>
        <p className="mb-16 text-center text-gray-600 text-lg">
          Umfassende Sachverständigenleistungen für Photovoltaik und
          Batteriesysteme
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              className="hover:-translate-y-1 rounded-xl border border-gray-200 bg-white p-8 transition-all hover:shadow-2xl"
              key={index}
            >
              <div className="mb-4 text-5xl text-[#2563EB]">{service.icon}</div>
              <h3 className="mb-4 font-bold text-2xl text-[#2563EB]">
                {service.title}
              </h3>
              <p className="mb-4 text-gray-600">{service.description}</p>
              <ul className="mb-6 space-y-2">
                {service.features.map((feature, i) => (
                  <li className="text-gray-700" key={i}>
                    • {feature}
                  </li>
                ))}
              </ul>
              <a
                className="block w-full rounded-lg bg-[#2563EB] px-6 py-3 text-center font-semibold text-white transition-all hover:bg-[#004C99] hover:shadow-lg"
                href={service.ctaLink}
                onClick={(e) => handleScroll(e, service.ctaLink)}
              >
                {service.ctaText}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-gray-100 px-6 py-4 transition-all hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
            href="#"
          >
            <span>📄</span>
            <span>Leistungsübersicht als PDF herunterladen</span>
          </a>
        </div>
      </div>
    </section>
  );
}
