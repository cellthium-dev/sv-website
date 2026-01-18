import type { TimelineItem } from "../types";

export default function About() {
  const timelineItems: TimelineItem[] = [
    {
      date: "seit 10/2020",
      title: "System Development Manager",
      company: "Futavis GmbH, Aachen",
      description: [
        "• Anforderungsmanagement für BMS & Batteriesysteme",
        "• Safety Manager für Functional Safety (ISO 26262) & Cyber Security (ISO/SAE 21434)",
        "• Qualitätsmanagement nach ISO 9001 & IATF 16949",
        "• Lieferantenaudits (VDA 6.3)",
      ],
    },
    {
      date: "10/2019 - 05/2020",
      title: "System Engineer",
      company: "E-Stream Energy GmbH & Co. KG",
      description: [
        '• Entwicklung von 19"-Batteriespeicher-Racks',
        "• Benchmarking von Batteriezellen & Modulen",
        "• HV-Prüfung von Batteriesystemen",
        "• Installation und Inbetriebnahme in Elektrofahrzeugen",
        "• Risikobewertung für Batteriekonstruktion",
      ],
    },
    {
      date: "02/2019 - 08/2019",
      title: "Elektroingenieur",
      company: "ATESTEO GmbH & Co. KG, Alsdorf",
      description: [
        "• Benchmarking von Hybrid- & EV-Antriebssträngen",
        "• CAN-Bus-Dekodierung & Sensoranalyse",
        "• Kommunikation Ladestation-Fahrzeug (CCS, ISO 15118)",
        "• Batterieprüfstandsmodellierung",
      ],
    },
    {
      date: "09/2015 - 02/2016",
      title: "Wissenschaftliche Hilfskraft",
      company: "Institut für Elektrische Maschinen, RWTH Aachen",
      description: [
        "• FEM-Analyse & Modellierung von 3-Phasen-Transformatoren",
      ],
    },
  ];

  return (
    <section className="bg-gray-50 py-12 md:py-16" id="ueber-mich">
      <div className="container mx-auto px-5">
        <h2 className="mb-8 text-center font-bold text-3xl md:mb-16 md:text-4xl">
          Über mich
        </h2>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div>
            <h3 className="mb-3 font-bold text-xl md:mb-4 md:text-2xl">
              Kompetenz durch Expertise
            </h3>
            <p className="mb-3 text-sm leading-relaxed md:mb-4 md:text-base">
              Als ISO-17024 zertifizierter Sachverständiger für
              Photovoltaikanlagen und Batteriesysteme verfüge ich über
              umfassende akademische Ausbildung und langjährige praktische
              Erfahrung in der Energietechnik. Mit meinem technischen Background
              unterstütze ich Privatpersonen, Unternehmen, Versicherungen und
              Installateure bei allen Fragen rund um Photovoltaik und
              Batteriespeicher.
            </p>

            <h4 className="mt-6 mb-3 font-bold text-lg md:mt-8 md:mb-4 md:text-xl">
              Akademischer Werdegang
            </h4>
            <ul className="mb-4 space-y-2 text-sm md:mb-6 md:space-y-3 md:text-base">
              <li>
                <strong>
                  M.Sc. Elektrotechnik, Informationstechnik und Technische
                  Informatik
                </strong>
                <br />
                RWTH Aachen (2016-2019)
                <br />
                Schwerpunkt: Energietechnik
              </li>
              <li>
                <strong>
                  B.Sc. Elektrotechnik, Informationstechnik und Technische
                  Informatik
                </strong>
                <br />
                RWTH Aachen (2011-2015)
                <br />
                Schwerpunkt: Energietechnik
              </li>
              <li>
                <strong>Auslandssemester</strong>
                <br />
                National Chiao Tung University (NCTU), Taiwan (2016)
              </li>
            </ul>

            <h4 className="mt-6 mb-3 font-bold text-lg md:mt-8 md:mb-4 md:text-xl">
              Zertifizierungen & Qualifikationen
            </h4>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <strong>ISO-17024 Zertifizierung</strong> als freier
                Sachverständiger für Photovoltaikanlagen
              </li>
              <li>
                <strong>BDSF-Mitgliedschaft</strong> (Bundesverband der
                Sachverständigen)
              </li>
              <li>
                <strong>ISO 26262:2018</strong> - Automotive Functional Safety
                Red Belt (CertX AG)
              </li>
              <li>
                <strong>ISO/SAE 21434:2021</strong> - Automotive Cyber Security
                Red Belt (CertX AG)
              </li>
              <li>
                <strong>Hochvoltqualifikation nach DGUV 200-005</strong> (QM 2c
                & QM 3a)
              </li>
              <li>
                <strong>VDA 6.3</strong> Lieferantenaudit
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="mb-3 font-bold text-xl md:mb-4 md:text-2xl">
              Berufliche Expertise
            </h3>
            <div className="relative border-[#2563EB] border-l-2 pl-8 md:pl-12">
              {timelineItems.map((item, index) => (
                <div className="relative mb-6 pl-6 md:mb-8 md:pl-8" key={index}>
                  <div className="absolute top-[5px] left-[-34px] h-2.5 w-2.5 rounded-full border-[3px] border-white bg-[#2563EB] md:left-[-42px] md:h-3 md:w-3" />
                  <div className="mb-1.5 font-bold text-[#2563EB] text-sm md:mb-2 md:text-base">
                    {item.date}
                  </div>
                  <div className="mb-1 font-semibold text-sm md:text-base">
                    {item.title}
                  </div>
                  <div className="text-gray-600 text-xs md:text-sm">
                    <strong>{item.company}</strong>
                    {item.description.map((desc, i) => (
                      <div key={i}>{desc}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <h4 className="mt-6 mb-3 font-bold text-lg md:mt-8 md:mb-4 md:text-xl">
              Technische Kompetenzen
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
              <div>
                <h5 className="mb-1.5 font-semibold text-sm md:mb-2 md:text-base">
                  Qualitätswerkzeuge
                </h5>
                <p className="text-xs md:text-sm">
                  FMEA, FTA, DOE, QFD, 8D, Six Sigma, APQP, 5s/5WHY,
                  Risikofilter
                </p>
              </div>
              <div>
                <h5 className="mb-1.5 font-semibold text-sm md:mb-2 md:text-base">
                  Prüfstandards
                </h5>
                <p className="text-xs md:text-sm">
                  DGUV V3, DGUV 314-003, ECE R 100, VDE 0701-702, DIN EN 61000,
                  ISO 15118
                </p>
              </div>
              <div>
                <h5 className="mb-1.5 font-semibold text-sm md:mb-2 md:text-base">
                  Software & Tools
                </h5>
                <p className="text-xs md:text-sm">
                  Matlab/Simulink, ANSYS, CANape, CANoe, Polarion ALM, LiBal BMS
                  Creator
                </p>
              </div>
              <div>
                <h5 className="mb-1.5 font-semibold text-sm md:mb-2 md:text-base">
                  Normenkompetenz
                </h5>
                <p className="text-xs md:text-sm">
                  ISO 26262, ISO 21434, ISO 9001, ISO 13849, ISO 21780, IATF
                  16949
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center md:mt-12">
          <h4 className="mb-3 font-bold text-xl md:mb-4 md:text-2xl">
            Tätigkeitsbereich
          </h4>
          <p className="px-4 text-base md:text-lg">
            Standort: <strong>Aachen</strong> | Deutschlandweit tätig mit
            Schwerpunkt <strong>Nordrhein-Westfalen</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
