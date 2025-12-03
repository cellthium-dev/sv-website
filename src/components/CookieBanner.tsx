import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
    console.log("Analytics enabled");
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "essential-only");
    setIsVisible(false);
    console.log("Only essential cookies");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-0 bottom-0 left-0 z-[9999] bg-white p-6 shadow-2xl transition-transform">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <strong>Cookie-Hinweis:</strong> Diese Website verwendet notwendige
            Cookies zur Gewährleistung der Funktionalität. Weitere Informationen
            finden Sie in unserer{" "}
            <a className="text-[#0066CC] hover:underline" href="#datenschutz">
              Datenschutzerklärung
            </a>
            .
          </div>
          <div className="flex flex-shrink-0 gap-3">
            <button
              className="rounded-lg bg-[#0066CC] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#004C99]"
              onClick={acceptCookies}
            >
              Akzeptieren
            </button>
            <button
              className="rounded-lg border-2 border-[#0066CC] bg-transparent px-6 py-3 font-semibold text-[#0066CC] transition-all hover:bg-[#0066CC] hover:text-white"
              onClick={declineCookies}
            >
              Nur notwendige
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
