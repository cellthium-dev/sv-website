export default function Footer() {
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
    <footer className="mt-16 bg-gray-200 py-12">
      <div className="container mx-auto px-5">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div>
            <h4 className="mb-4 font-bold text-[#0066CC] text-xl">
              Andreas Bauten
            </h4>
            <p className="mb-2">
              Sachverständigenbüro für
              <br />
              Photovoltaik & Batteriesysteme
            </p>
            <p>
              ISO-17024 zertifiziert
              <br />
              BDSF-Mitglied
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-[#0066CC] text-xl">
              Leistungen
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  className="text-gray-700 transition-colors hover:text-[#0066CC]"
                  href="#leistungen"
                  onClick={(e) => handleScroll(e, "#leistungen")}
                >
                  Technische Gutachten
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 transition-colors hover:text-[#0066CC]"
                  href="#leistungen"
                  onClick={(e) => handleScroll(e, "#leistungen")}
                >
                  Schadenanalyse
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 transition-colors hover:text-[#0066CC]"
                  href="#leistungen"
                  onClick={(e) => handleScroll(e, "#leistungen")}
                >
                  Wirtschaftlichkeitsprüfung
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 transition-colors hover:text-[#0066CC]"
                  href="#leistungen"
                  onClick={(e) => handleScroll(e, "#leistungen")}
                >
                  Online-Gutachten
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-[#0066CC] text-xl">
              Informationen
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  className="text-gray-700 transition-colors hover:text-[#0066CC]"
                  href="#ueber-mich"
                  onClick={(e) => handleScroll(e, "#ueber-mich")}
                >
                  Über mich
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 transition-colors hover:text-[#0066CC]"
                  href="#referenzen"
                  onClick={(e) => handleScroll(e, "#referenzen")}
                >
                  Referenzen
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 transition-colors hover:text-[#0066CC]"
                  href="#wissen"
                  onClick={(e) => handleScroll(e, "#wissen")}
                >
                  Wissensbereich
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 transition-colors hover:text-[#0066CC]"
                  href="#kontakt"
                  onClick={(e) => handleScroll(e, "#kontakt")}
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-[#0066CC] text-xl">
              Rechtliches
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  className="text-gray-700 transition-colors hover:text-[#0066CC]"
                  href="#impressum"
                >
                  Impressum
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 transition-colors hover:text-[#0066CC]"
                  href="#datenschutz"
                >
                  Datenschutzerklärung
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 transition-colors hover:text-[#0066CC]"
                  href="#agb"
                >
                  AGB
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 transition-colors hover:text-[#0066CC]"
                  href="#widerruf"
                >
                  Widerrufsrecht
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-gray-300 border-t pt-8 text-center text-gray-600 text-sm">
          <p>
            &copy; 2026 Andreas Bauten - Sachverständigenbüro. Alle Rechte
            vorbehalten.
          </p>
          <p className="mt-2">
            Standort: Banker-Feld-Str. 1, 52072 Aachen | Deutschlandweit tätig
            mit Schwerpunkt NRW
          </p>
        </div>
      </div>
    </footer>
  );
}
