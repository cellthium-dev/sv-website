import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const TICKER_ITEMS = [
  "Ihre Anlage bringt weniger Ertrag als erwartet?",
  "Ihre Versicherung lehnt den Schaden ab?",
  "Ihr Installateur behauptet, alles sei normgerecht?",
  "Sie brauchen ein Gutachten für Gericht oder Versicherung?",
  "Ihr Batteriespeicher verliert auffällig schnell Kapazität?",
  "Sie möchten Ihre Neuanlage unabhängig prüfen lassen?",
  "Sie stehen vor einem Hagelschaden und wissen nicht weiter?",
];

export default function Hero() {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setTickerIndex((i) => (i + 1) % TICKER_ITEMS.length);
        setVisible(true);
      }, 500);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[url('/marquee/marquee_2.png')] bg-center bg-cover text-dark-surface-foreground"
      id="home"
    >
      {/* Dark overlay for text legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-black/70"
      />

      {/* Background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="-top-32 -right-32 absolute size-[600px] rounded-full border border-white/5" />
        <div className="-top-16 -right-16 absolute size-[400px] rounded-full border border-white/5" />
        <div className="absolute top-0 right-0 h-full w-1/3 bg-linear-to-l from-primary/10 to-transparent" />
        <div className="absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="section-container relative py-24 text-center md:py-32">
        {/* Badge */}
        <div className="mb-7 animate-fade-in opacity-0">
          <span className="inline-block rounded-full border border-(--solar)/30 bg-(--solar)/12 px-5 py-2 font-semibold text-solar text-xs uppercase tracking-[1.5px]">
            ISO/IEC 17024 Zertifizierter Sachverständiger
          </span>
        </div>

        {/* Headline */}
        <h1
          className="mx-auto mb-6 max-w-3xl animate-fade-in font-extrabold text-4xl leading-[1.1] tracking-tight opacity-0 delay-100 sm:text-5xl md:text-6xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Ihre PV-Anlage verdient{" "}
          <span className="text-primary brightness-150">Gewissheit.</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-8 max-w-2xl animate-fade-in text-(--dark-surface-foreground)/70 text-lg leading-relaxed opacity-0 delay-200 md:text-xl">
          Unabhängige Sachverständigenprüfung für Photovoltaikanlagen und
          Batteriespeicher – messtechnisch fundiert, rechtssicher dokumentiert,
          verständlich erklärt.
        </p>

        {/* Rotating ticker */}
        <div
          aria-live="polite"
          className="mb-10 flex h-10 items-center justify-center"
        >
          <p
            className="text-(--dark-surface-foreground)/60 text-base italic transition-opacity duration-500 md:text-lg"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {TICKER_ITEMS[tickerIndex]}
          </p>
        </div>

        {/* CTAs */}
        <div className="flex animate-fade-in flex-col items-center gap-4 opacity-0 delay-300 sm:flex-row sm:justify-center">
          <Button asChild className="h-12 px-8 font-semibold text-base">
            <Link to="/kontakt">
              Jetzt unverbindlich anfragen
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            className="h-12 border-white/20 bg-transparent px-8 font-semibold text-base text-dark-surface-foreground hover:border-white/30 hover:bg-white/10 hover:text-white"
            variant="outline"
          >
            <Link to="/leistungen">Leistungen entdecken</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
