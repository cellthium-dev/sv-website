import type { Testimonial } from "../types";

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      rating: 5,
      text: "Herr Bauten hat unsere PV-Anlage nach einem Hagelschaden begutachtet. Die Analyse war äußerst professionell und detailliert. Dank seiner Expertise konnten wir den Schaden vollständig mit der Versicherung regulieren.",
      author: "Familie Müller",
      meta: "Privathaushalt, Düsseldorf",
    },
    {
      rating: 5,
      text: "Als Installateur haben wir Herrn Bauten für ein komplexes Batteriespeicher-Projekt hinzugezogen. Seine technische Tiefe und Normenkompetenz haben uns sehr geholfen. Absolute Empfehlung!",
      author: "Stefan Weber",
      meta: "SolarTech GmbH, Köln",
    },
    {
      rating: 5,
      text: "Die Wirtschaftlichkeitsprüfung unserer gewerblichen PV-Anlage war sehr aufschlussreich. Herr Bauten hat konkrete Optimierungsvorschläge gemacht, die unseren Ertrag um 12% steigern konnten.",
      author: "Michael Schmidt",
      meta: "Produktionsbetrieb, Aachen",
    },
    {
      rating: 5,
      text: "Schnelle, unkomplizierte Abwicklung über das Online-Gutachten. Innerhalb von 48 Stunden hatten wir ein fundiertes Gutachten für die Versicherung. Preis-Leistung absolut fair.",
      author: "Lisa Hoffmann",
      meta: "Privathaushalt, Bonn",
    },
  ];

  const trustBadges = [
    "BDSF-Mitglied",
    "TÜV-geprüft",
    "ISO-17024",
    "VDE-konform",
  ];

  return (
    <section className="bg-gray-50 py-16" id="referenzen">
      <div className="container mx-auto px-5">
        <h2 className="mb-16 text-center font-bold text-4xl">
          Referenzen & Kundenstimmen
        </h2>

        <div className="mb-12 grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div
              className="rounded-xl border-[#0066CC] border-l-4 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              key={index}
            >
              <div className="mb-3 text-xl text-yellow-400">
                {"★".repeat(testimonial.rating)}
              </div>
              <p className="mb-4 text-gray-600 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="font-semibold text-[#0066CC]">
                {testimonial.author}
              </div>
              <div className="text-gray-500 text-sm">{testimonial.meta}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h4 className="mb-6 font-bold text-2xl">
            Vertrauenswürdige Partnerschaften
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {trustBadges.map((badge, index) => (
              <div
                className="rounded-lg border bg-white px-4 py-2 shadow-sm"
                key={index}
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
