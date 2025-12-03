import type { Badge } from "../types";

export default function Hero() {
  const badges: Badge[] = [
    { icon: "✓", text: "ISO-17024 zertifiziert" },
    { icon: "⚡", text: "BDSF-Mitglied" },
    { icon: "🔒", text: "Functional Safety Expert" },
    { icon: "🎓", text: "M.Sc. Elektrotechnik" },
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
    <section
      className="bg-gradient-to-br from-[#0066CC] to-[#004C99] py-16 text-center text-white"
      id="home"
    >
      <div className="container mx-auto px-5">
        <h1 className="mb-8 font-bold text-5xl md:text-6xl">
          Unabhängige Sachverständigen-Gutachten für Photovoltaik &
          Batteriesysteme
        </h1>
        <p className="mb-8 text-xl opacity-95">
          ISO-17024 zertifiziert | Deutschlandweit tätig | Schwerpunkt NRW
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            className="hover:-translate-y-0.5 inline-block rounded-lg border-2 border-transparent bg-[#0066CC] px-8 py-4 font-semibold text-lg text-white transition-all hover:bg-[#004C99] hover:shadow-xl"
            href="#kontakt"
            onClick={(e) => handleScroll(e, "#kontakt")}
          >
            Jetzt Beratung buchen
          </a>
          <a
            className="inline-block rounded-lg border-2 border-white bg-transparent px-8 py-4 font-semibold text-lg text-white transition-all hover:bg-white hover:text-[#0066CC]"
            href="#leistungen"
            onClick={(e) => handleScroll(e, "#leistungen")}
          >
            Leistungen ansehen
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
          {badges.map((badge, index) => (
            <div
              className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-sm"
              key={index}
            >
              <span className="text-2xl">{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
