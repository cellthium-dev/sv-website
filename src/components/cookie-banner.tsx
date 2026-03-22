import { CookieIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookieConsent", "essential-only");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed right-4 bottom-4 left-4 z-50 animate-scale-in sm:right-4 sm:left-auto sm:max-w-sm">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-2xl shadow-black/10">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <CookieIcon className="size-4" />
          </div>
          <div>
            <p
              className="mb-1 font-semibold text-foreground text-sm"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Cookie-Einstellungen
            </p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Diese Website verwendet Cookies für eine bessere Nutzererfahrung.
              Weitere Informationen in der{" "}
              <a className="text-primary hover:underline" href="/datenschutz">
                Datenschutzerklärung
              </a>
              .
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            className="flex-1 font-medium"
            onClick={decline}
            size="sm"
            variant="outline"
          >
            Ablehnen
          </Button>
          <Button className="flex-1 font-medium" onClick={accept} size="sm">
            Akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
}
