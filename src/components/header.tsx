import { Link } from "@tanstack/react-router";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const anchorItems = [
    { href: "#home", label: "Startseite" },
    { href: "#leistungen", label: "Leistungen" },
    { href: "#wissen", label: "Wissen" },
    // { href: "#referenzen", label: "Referenzen" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = `/${href}`;
    }
  };

  return (
    <header className="sticky top-0 z-1000 bg-white shadow-md transition-shadow">
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between py-4">
          <Link className="flex flex-col" to="/">
            <div className="font-bold text-2xl text-[#2563EB]">
              Andreas Bauten
            </div>
            <span className="font-normal text-gray-500 text-sm">
              Sachverständiger für Photovoltaik & Batteriesysteme
            </span>
          </Link>

          <button
            aria-label="Menü öffnen"
            className="text-2xl text-gray-900 md:hidden"
            onClick={toggleMenu}
          >
            ☰
          </button>

          <nav
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } absolute top-full right-0 left-0 flex-col items-center gap-8 bg-white p-4 shadow-md md:relative md:top-auto md:flex md:flex-row md:bg-transparent md:p-0 md:shadow-none`}
            role="navigation"
          >
            {anchorItems.map((item) => (
              <a
                className="rounded px-4 py-2 font-medium text-gray-900 transition-all hover:bg-gray-100"
                href={item.href}
                key={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <Link
              className="rounded px-4 py-2 font-medium text-gray-900 transition-all hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
              to="/ueber-mich"
            >
              Über mich
            </Link>
            <a
              className="hover:-translate-y-0.5 rounded-lg bg-[#2563EB] px-6 py-3 font-semibold text-white transition-all hover:bg-[#004C99] hover:shadow-lg"
              href="/#kontakt"
              onClick={(e) => handleNavClick(e, "#kontakt")}
            >
              Kontakt
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
