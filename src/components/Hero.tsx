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
        <h1 className="mb-6 font-bold text-3xl leading-tight sm:text-4xl md:mb-8 md:text-5xl lg:text-6xl">
          Unabhängige Sachverständigen-Gutachten für Photovoltaik &
          Batteriesysteme
        </h1>
        <p className="mb-6 px-4 text-base opacity-95 sm:text-lg md:mb-8 md:text-xl">
          ISO-17024 zertifiziert | Deutschlandweit tätig | Schwerpunkt NRW
        </p>

        <div className="flex flex-col flex-wrap justify-center gap-3 px-4 sm:flex-row sm:gap-4">
          <a
            className="hover:-translate-y-0.5 inline-block w-full rounded-lg border-2 border-transparent bg-[#0066CC] px-6 py-3 font-semibold text-base text-white transition-all hover:bg-[#004C99] hover:shadow-xl sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
            href="#kontakt"
            onClick={(e) => handleScroll(e, "#kontakt")}
          >
            Jetzt Beratung buchen
          </a>
          <a
            className="inline-block w-full rounded-lg border-2 border-white bg-transparent px-6 py-3 font-semibold text-base text-white transition-all hover:bg-white hover:text-[#0066CC] sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
            href="#leistungen"
            onClick={(e) => handleScroll(e, "#leistungen")}
          >
            Leistungen ansehen
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 px-2 sm:gap-4 md:mt-8 md:gap-8">
          {badges.map((badge, index) => (
            <div
              className="flex items-center gap-1.5 rounded-lg bg-white/20 px-3 py-2 text-xs sm:gap-2 sm:px-4 sm:text-sm"
              key={index}
            >
              <span className="text-lg sm:text-2xl">{badge.icon}</span>
              <span className="whitespace-nowrap">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
