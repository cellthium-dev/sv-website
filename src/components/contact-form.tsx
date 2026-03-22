import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MailIcon,
  MapPinIcon,
  SendIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { FormData } from "../types";

const STEPS = ["Anfragetyp", "Details", "Kontaktdaten", "Bestätigung"];

const REQUEST_TYPES = [
  { value: "gutachten", label: "Technisches Gutachten" },
  { value: "schadenanalyse", label: "Schadenanalyse" },
  { value: "wirtschaftlichkeit", label: "Wirtschaftlichkeitsprüfung" },
  { value: "anlagenabnahme", label: "Anlagenabnahme" },
  { value: "beratung-installateur", label: "Beratung für Installateure" },
  { value: "versicherung", label: "Anfrage Versicherung" },
  { value: "online-gutachten", label: "Online-Gutachten (Express)" },
  { value: "sonstiges", label: "Sonstige Anfrage" },
];

const CUSTOMER_TYPES = [
  { value: "privatperson", label: "Privatperson" },
  { value: "unternehmen", label: "Unternehmen" },
  { value: "installateur", label: "Installateur/Fachbetrieb" },
  { value: "versicherung", label: "Versicherung" },
];

const PREFERRED_TIMES = [
  { value: "morning", label: "Vormittags (9–12 Uhr)" },
  { value: "afternoon", label: "Nachmittags (12–15 Uhr)" },
  { value: "evening", label: "Spätnachmittag (15–18 Uhr)" },
];

const EMPTY_FORM: FormData = {
  requestType: "",
  customerType: "",
  description: "",
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  street: "",
  zip: "",
  city: "",
  preferredTime: "",
  privacy: false,
  newsletter: false,
};

const getRequestTypeLabel = (v: string) =>
  REQUEST_TYPES.find((t) => t.value === v)?.label ?? v;

const getCustomerTypeLabel = (v: string) =>
  CUSTOMER_TYPES.find((t) => t.value === v)?.label ?? v;

const isCompanyType = (v: string) =>
  v === "unternehmen" || v === "installateur";

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (key: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateStep = (step: number): boolean => {
    if (step === 1)
      return formData.requestType !== "" && formData.customerType !== "";
    if (step === 2) return formData.description.trim() !== "";
    if (step === 3)
      return (
        formData.firstName.trim() !== "" &&
        formData.lastName.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.phone.trim() !== "" &&
        formData.privacy
      );
    return true;
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      alert("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }
    if (currentStep < 4) {
      setCurrentStep((s) => s + 1);
      document
        .getElementById("kontakt")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData(EMPTY_FORM);
    setCurrentStep(1);
  };

  return (
    <section className="scroll-mt-16 bg-muted/30 py-20 md:py-28" id="kontakt">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-14 max-w-2xl">
          <div className="section-label mb-4">
            <span className="solar-bar" />
            <span>Kontakt</span>
          </div>
          <h2
            className="mb-4 font-extrabold text-4xl tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Kontakt & Terminbuchung
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nehmen Sie Kontakt auf oder buchen Sie direkt einen Termin für Ihre
            Beratung.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Form card */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            {submitted ? (
              /* Success state */
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckIcon className="size-8" />
                </div>
                <h3
                  className="font-bold text-2xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Anfrage gesendet!
                </h3>
                <p className="max-w-sm text-muted-foreground">
                  Vielen Dank. Sie erhalten innerhalb von 24 Stunden eine
                  Eingangsbestätigung.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                >
                  Neue Anfrage stellen
                </Button>
              </div>
            ) : (
              <>
                {/* Step indicator */}
                <div className="mb-8">
                  <div className="mb-3 flex items-center justify-between">
                    {STEPS.map((label, i) => {
                      const step = i + 1;
                      const done = currentStep > step;
                      const active = currentStep === step;
                      return (
                        <div className="flex flex-1 items-center" key={step}>
                          <div className="flex flex-col items-center gap-1.5">
                            <div
                              className={cn(
                                "flex size-8 items-center justify-center rounded-full border-2 font-bold text-xs transition-all",
                                done
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : active
                                    ? "border-primary bg-background text-primary"
                                    : "border-border bg-background text-muted-foreground"
                              )}
                            >
                              {done ? <CheckIcon className="size-3.5" /> : step}
                            </div>
                            <span
                              className={cn(
                                "hidden font-medium text-xs sm:block",
                                active
                                  ? "text-primary"
                                  : done
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                              )}
                            >
                              {label}
                            </span>
                          </div>
                          {i < STEPS.length - 1 && (
                            <div
                              className={cn(
                                "mx-2 h-px flex-1 transition-colors",
                                done ? "bg-primary" : "bg-border"
                              )}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1 */}
                  {currentStep === 1 && (
                    <div className="flex animate-fadeIn flex-col gap-6">
                      <h3
                        className="font-bold text-xl"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        Welche Art von Anfrage haben Sie?
                      </h3>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="requestType">
                          Anfragetyp <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          onValueChange={(v) => updateField("requestType", v)}
                          value={formData.requestType}
                        >
                          <SelectTrigger className="h-11" id="requestType">
                            <SelectValue placeholder="Bitte wählen..." />
                          </SelectTrigger>
                          <SelectContent>
                            {REQUEST_TYPES.map((t) => (
                              <SelectItem key={t.value} value={t.value}>
                                {t.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="customerType">
                          Sie sind...{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          onValueChange={(v) => updateField("customerType", v)}
                          value={formData.customerType}
                        >
                          <SelectTrigger className="h-11" id="customerType">
                            <SelectValue placeholder="Bitte wählen..." />
                          </SelectTrigger>
                          <SelectContent>
                            {CUSTOMER_TYPES.map((t) => (
                              <SelectItem key={t.value} value={t.value}>
                                {t.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-end pt-2">
                        <Button
                          className="px-6 font-semibold"
                          onClick={nextStep}
                          type="button"
                        >
                          Weiter
                          <ChevronRightIcon data-icon="inline-end" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 2 */}
                  {currentStep === 2 && (
                    <div className="flex animate-fadeIn flex-col gap-6">
                      <h3
                        className="font-bold text-xl"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        Details zu Ihrer Anfrage
                      </h3>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="description">
                          Beschreibung{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          className="resize-none"
                          id="description"
                          onChange={(e) =>
                            updateField("description", e.target.value)
                          }
                          placeholder="Bitte beschreiben Sie Ihr Anliegen möglichst detailliert..."
                          rows={6}
                          value={formData.description}
                        />
                        <p className="text-muted-foreground text-xs">
                          Je detaillierter Ihre Beschreibung, desto besser
                          können wir Ihnen helfen.
                        </p>
                      </div>

                      <div className="flex justify-between pt-2">
                        <Button
                          className="px-6 font-semibold"
                          onClick={prevStep}
                          type="button"
                          variant="outline"
                        >
                          <ChevronLeftIcon data-icon="inline-start" />
                          Zurück
                        </Button>
                        <Button
                          className="px-6 font-semibold"
                          onClick={nextStep}
                          type="button"
                        >
                          Weiter
                          <ChevronRightIcon data-icon="inline-end" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3 */}
                  {currentStep === 3 && (
                    <div className="flex animate-fadeIn flex-col gap-5">
                      <h3
                        className="font-bold text-xl"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        Ihre Kontaktdaten
                      </h3>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="firstName">
                            Vorname <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            className="h-11"
                            id="firstName"
                            onChange={(e) =>
                              updateField("firstName", e.target.value)
                            }
                            value={formData.firstName}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="lastName">
                            Nachname <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            className="h-11"
                            id="lastName"
                            onChange={(e) =>
                              updateField("lastName", e.target.value)
                            }
                            value={formData.lastName}
                          />
                        </div>
                      </div>

                      {isCompanyType(formData.customerType) && (
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="company">Firma</Label>
                          <Input
                            className="h-11"
                            id="company"
                            onChange={(e) =>
                              updateField("company", e.target.value)
                            }
                            value={formData.company}
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="email">
                            E-Mail <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            className="h-11"
                            id="email"
                            onChange={(e) =>
                              updateField("email", e.target.value)
                            }
                            type="email"
                            value={formData.email}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="phone">
                            Telefon <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            className="h-11"
                            id="phone"
                            onChange={(e) =>
                              updateField("phone", e.target.value)
                            }
                            type="tel"
                            value={formData.phone}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="street">Straße & Hausnummer</Label>
                        <Input
                          className="h-11"
                          id="street"
                          onChange={(e) =>
                            updateField("street", e.target.value)
                          }
                          value={formData.street}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="zip">PLZ</Label>
                          <Input
                            className="h-11"
                            id="zip"
                            onChange={(e) => updateField("zip", e.target.value)}
                            value={formData.zip}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="city">Ort</Label>
                          <Input
                            className="h-11"
                            id="city"
                            onChange={(e) =>
                              updateField("city", e.target.value)
                            }
                            value={formData.city}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="preferredTime">
                          Bevorzugte Kontaktzeit
                        </Label>
                        <Select
                          onValueChange={(v) => updateField("preferredTime", v)}
                          value={formData.preferredTime}
                        >
                          <SelectTrigger className="h-11" id="preferredTime">
                            <SelectValue placeholder="Keine Präferenz" />
                          </SelectTrigger>
                          <SelectContent>
                            {PREFERRED_TIMES.map((t) => (
                              <SelectItem key={t.value} value={t.value}>
                                {t.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={formData.privacy}
                            className="mt-0.5"
                            id="privacy"
                            onCheckedChange={(v) => updateField("privacy", !!v)}
                          />
                          <Label
                            className="cursor-pointer font-normal text-sm leading-relaxed"
                            htmlFor="privacy"
                          >
                            Ich habe die{" "}
                            <a
                              className="text-primary hover:underline"
                              href="/datenschutz"
                            >
                              Datenschutzerklärung
                            </a>{" "}
                            zur Kenntnis genommen und stimme der
                            Datenspeicherung für die Kontaktaufnahme zu.{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                        </div>

                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={formData.newsletter}
                            className="mt-0.5"
                            id="newsletter"
                            onCheckedChange={(v) =>
                              updateField("newsletter", !!v)
                            }
                          />
                          <Label
                            className="cursor-pointer font-normal text-sm leading-relaxed"
                            htmlFor="newsletter"
                          >
                            Ich möchte den Newsletter mit Fachartikeln und
                            Updates erhalten (jederzeit abbestellbar).
                          </Label>
                        </div>
                      </div>

                      <div className="flex justify-between pt-2">
                        <Button
                          className="px-6 font-semibold"
                          onClick={prevStep}
                          type="button"
                          variant="outline"
                        >
                          <ChevronLeftIcon data-icon="inline-start" />
                          Zurück
                        </Button>
                        <Button
                          className="px-6 font-semibold"
                          onClick={nextStep}
                          type="button"
                        >
                          Weiter
                          <ChevronRightIcon data-icon="inline-end" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Summary */}
                  {currentStep === 4 && (
                    <div className="flex animate-fadeIn flex-col gap-6">
                      <h3
                        className="font-bold text-xl"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        Zusammenfassung Ihrer Anfrage
                      </h3>

                      <div className="flex flex-col gap-2.5 rounded-xl border border-border bg-muted/40 p-5 text-sm">
                        {[
                          {
                            label: "Anfragetyp",
                            value: getRequestTypeLabel(formData.requestType),
                          },
                          {
                            label: "Kundentyp",
                            value: getCustomerTypeLabel(formData.customerType),
                          },
                          {
                            label: "Name",
                            value: `${formData.firstName} ${formData.lastName}`,
                          },
                          formData.company
                            ? { label: "Firma", value: formData.company }
                            : null,
                          { label: "E-Mail", value: formData.email },
                          { label: "Telefon", value: formData.phone },
                          {
                            label: "Beschreibung",
                            value: formData.description,
                          },
                        ]
                          .filter(Boolean)
                          .map((row) => (
                            <div className="flex gap-3" key={row!.label}>
                              <span className="w-28 shrink-0 font-semibold text-foreground">
                                {row!.label}:
                              </span>
                              <span className="text-muted-foreground">
                                {row!.value}
                              </span>
                            </div>
                          ))}
                      </div>

                      <div className="rounded-xl border-primary border-l-4 bg-primary/5 px-5 py-4 text-sm">
                        <p className="mb-2 font-semibold text-foreground">
                          Was passiert als Nächstes?
                        </p>
                        <ul className="flex flex-col gap-1.5 text-muted-foreground">
                          <li>
                            · Eingangsbestätigung innerhalb von 24 Stunden
                          </li>
                          <li>
                            · Wir prüfen Ihre Anfrage und erstellen ein
                            unverbindliches Angebot
                          </li>
                          <li>
                            · Bei Online-Gutachten: Express-Bearbeitung
                            innerhalb 48 Stunden
                          </li>
                          <li>
                            · Persönliche Kontaktaufnahme durch Andreas Bauten
                          </li>
                        </ul>
                      </div>

                      <div className="flex justify-between pt-2">
                        <Button
                          className="px-6 font-semibold"
                          onClick={prevStep}
                          type="button"
                          variant="outline"
                        >
                          <ChevronLeftIcon data-icon="inline-start" />
                          Zurück
                        </Button>
                        <Button
                          className="h-11 border-0 bg-[var(--solar)] px-8 font-semibold text-[var(--solar-foreground)] hover:bg-[var(--solar)]/90"
                          type="submit"
                        >
                          Anfrage absenden
                          <SendIcon data-icon="inline-end" />
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </>
            )}
          </div>

          {/* Sidebar: quick contact */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-1 flex-col items-start gap-3 rounded-2xl border border-border bg-card p-5">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MailIcon className="size-5" />
              </div>
              <div>
                <h4
                  className="font-semibold text-sm"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  E-Mail
                </h4>
                <a
                  className="font-medium text-primary text-sm hover:underline"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  {siteConfig.contact.email}
                </a>
                <p className="mt-1 text-muted-foreground text-xs">
                  Antwort innerhalb 24h
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col items-start gap-3 rounded-2xl border border-border bg-card p-5">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPinIcon className="size-5" />
              </div>
              <div>
                <h4
                  className="font-semibold text-sm"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Standort
                </h4>
                <p className="font-medium text-foreground text-sm">
                  {siteConfig.contact.location}
                </p>
                <p className="mt-1 text-muted-foreground text-xs">
                  Deutschlandweit tätig
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
