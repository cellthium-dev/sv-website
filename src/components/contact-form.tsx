import emailjs from "@emailjs/browser";
import { Link } from "@tanstack/react-router";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SendIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "./ui/checkbox";

// ─── Constants ───────────────────────────────────────────────────────────────

const STEPS = ["Anliegen", "Anlage", "Details", "Kontakt", "Bestätigung"];

const REQUEST_TYPES = [
  {
    value: "fehlerdiagnose",
    label: "Fehlerdiagnose / Verdacht auf Problem",
    desc: "Ertragsverlust, Fehlermeldungen, sichtbare Schäden",
  },
  {
    value: "ertragsminderung",
    label: "Ertragsminderung / Leistungsabweichung",
    desc: "Performance-Ratio, Monitoring, Degradation",
  },
  {
    value: "anlagenabnahme",
    label: "Anlagenabnahme / Inbetriebnahmeprüfung",
    desc: "VDE 0100-712, DIN EN 62446-1, Neuanlage oder Erweiterung",
  },
  {
    value: "versicherungsschaden",
    label: "Versicherungsschaden / Schadensfall",
    desc: "Sturm, Hagel, Brand, Überspannung, Installationsfehler",
  },
  {
    value: "batteriespeicher",
    label: "Batteriespeicher / Hochvoltsystem",
    desc: "BMS, Zellchemie, Sicherheit, IEC 62933, UN 38.3",
  },
  {
    value: "zweitmeinung",
    label: "Zweitmeinung / Streitfall",
    desc: "Gutachten prüfen, Gewährleistung, Schlichtung, Gericht",
  },
  {
    value: "beratung",
    label: "Beratung / Projektbegleitung / Sonstiges",
    desc: "Due Diligence, Repowering, Schulung, Qualitätssicherung",
  },
];

const CUSTOMER_TYPES = [
  { value: "privatperson", label: "Privatperson" },
  { value: "unternehmen", label: "Unternehmen" },
  { value: "vermieter", label: "Vermieter / Verpächter" },
  { value: "versicherung", label: "Versicherung" },
  { value: "installateur", label: "Installateur / Errichterbetrieb" },
  { value: "rechtsanwalt", label: "Rechtsanwalt / Kanzlei" },
  { value: "sonstige", label: "Sonstige" },
];

const PREFERRED_TIMES = [
  { value: "flexibel", label: "Flexibel" },
  { value: "morning", label: "Vormittag (09–12 Uhr)" },
  { value: "afternoon", label: "Nachmittag (12–17 Uhr)" },
  { value: "evening", label: "Abend (nach 17 Uhr)" },
];

const CONTACT_METHODS = [
  { value: "telefon", label: "Telefon" },
  { value: "email", label: "E-Mail" },
  { value: "whatsapp", label: "WhatsApp / Signal" },
  { value: "egal", label: "Keine Präferenz" },
];

// Dynamic description placeholder per concern
const DESCRIPTION_PLACEHOLDERS: Record<string, string> = {
  fehlerdiagnose:
    "Beschreiben Sie kurz das beobachtete Problem, z.\u00A0B. sichtbare Schäden, Fehlermeldungen, Ertragsverlauf\u2026",
  ertragsminderung:
    "Wie äußert sich die Ertragsminderung? Seit wann besteht die Abweichung? Liegen Monitoring-Daten vor?",
  anlagenabnahme:
    "Um welches Projekt handelt es sich? Wann ist die Inbetriebnahme geplant?",
  versicherungsschaden:
    "Was ist passiert? Beschreiben Sie den Schadenhergang und sichtbare Schäden.",
  batteriespeicher:
    "Welches Speichersystem ist betroffen? Welche Symptome oder Fragen haben Sie?",
  zweitmeinung:
    "Welche Punkte im bestehenden Gutachten sehen Sie kritisch? Was ist der Streitgegenstand?",
  beratung: "Beschreiben Sie Ihr Beratungsanliegen oder Projekt.",
};

// File upload rules (matching reference app.js)
const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_FILES = 5;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_FORM: FormData = {
  requestType: "",
  customerType: "",
  zip: "",
  kwp: "",
  baujahr: "",
  aktenzeichen: "",
  schadenstag: "",
  installationsart: "",
  speichertyp: "",
  gegenstand: "",
  themenfeld: "",
  description: "",
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  contactMethod: "",
  preferredTime: "",
  privacy: false,
  newsletter: false,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getRequestTypeLabel = (v: string) =>
  REQUEST_TYPES.find((t) => t.value === v)?.label ?? v;

const getCustomerTypeLabel = (v: string) =>
  CUSTOMER_TYPES.find((t) => t.value === v)?.label ?? v;

const isCompanyType = (v: string) =>
  ["unternehmen", "installateur", "rechtsanwalt", "vermieter"].includes(v);

// Concerns that show the "Installateur kontaktiert?" checkbox in Details
const INSTALLER_CHECKBOX_CONCERNS = [
  "fehlerdiagnose",
  "ertragsminderung",
  "zweitmeinung",
];

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicatorItem({
  label,
  step,
  index,
  currentStep,
  totalSteps,
}: {
  label: string;
  step: number;
  index: number;
  currentStep: number;
  totalSteps: number;
}) {
  const done = currentStep > step;
  const active = currentStep === step;
  const circleClass = done
    ? "border-primary bg-primary text-primary-foreground"
    : active
      ? "border-primary bg-background text-primary"
      : "border-border bg-background text-muted-foreground";
  const labelClass = active
    ? "text-primary"
    : done
      ? "text-foreground"
      : "text-muted-foreground";

  return (
    <div className="flex flex-1 items-center">
      <div className="flex flex-col items-center gap-1.5">
        <div
          className={cn(
            "flex size-8 items-center justify-center rounded-full border-2 font-bold text-xs transition-all",
            circleClass
          )}
        >
          {done ? <CheckIcon className="size-3.5" /> : <span>{step}</span>}
        </div>
        <span className={cn("hidden font-medium text-xs sm:block", labelClass)}>
          {label}
        </span>
      </div>
      {index < totalSteps - 1 && (
        <div
          className={cn(
            "mx-2 h-px flex-1 transition-colors",
            done ? "bg-primary" : "bg-border"
          )}
        />
      )}
    </div>
  );
}

// ─── kWp slider ──────────────────────────────────────────────────────────────

function KwpSlider({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const num = Number.parseFloat(value) || 0;

  const handleNumber = (raw: string) => {
    const clamped = Math.min(1000, Math.max(0, Number.parseFloat(raw) || 0));
    onChange(raw === "" ? "" : String(clamped));
  };

  const handleRange = (raw: string) => {
    onChange(raw);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Input
          className="h-8 w-1/2"
          max="1000"
          min="0"
          onChange={(e) => handleNumber(e.target.value)}
          placeholder="z. B. 10"
          step="0.5"
          type="number"
          value={value}
        />
        <span className="font-semibold text-primary text-sm tabular-nums">
          {num > 0 ? `${num} kWp` : "–"}
        </span>
      </div>
      <input
        className="h-2 w-full cursor-pointer accent-primary"
        max="100"
        min="0"
        onChange={(e) => handleRange(e.target.value)}
        step="0.5"
        type="range"
        value={num}
      />
      <div className="flex justify-between text-muted-foreground text-xs">
        <span>0 kWp</span>
        <span>50 kWp</span>
        <span>100 kWp</span>
      </div>
    </div>
  );
}

// ─── Nav buttons ─────────────────────────────────────────────────────────────

function NavButtons({
  onPrev,
  onNext,
  nextDisabled = false,
  isLast = false,
  isSubmitting = false,
}: {
  onPrev?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
  isLast?: boolean;
  isSubmitting?: boolean;
}) {
  return (
    <div
      className={cn("flex pt-2", onPrev ? "justify-between" : "justify-end")}
    >
      {onPrev && (
        <Button
          className="px-6 font-semibold"
          disabled={isSubmitting}
          onClick={onPrev}
          type="button"
          variant="outline"
        >
          <ChevronLeftIcon data-icon="inline-start" />
          Zurück
        </Button>
      )}
      {isLast ? (
        <Button
          className="gap-2 bg-solar px-6 font-bold text-solar-foreground hover:bg-solar/90"
          disabled={nextDisabled || isSubmitting}
          type="submit"
        >
          <SendIcon className="size-4" />
          {isSubmitting ? "Wird gesendet…" : "Anfrage absenden"}
        </Button>
      ) : (
        <Button
          className="px-6 font-semibold"
          disabled={nextDisabled}
          onClick={onNext}
          type="button"
        >
          Weiter
          <ChevronRightIcon data-icon="inline-end" />
        </Button>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [emailTouched, setEmailTouched] = useState(false);
  const [installerContacted, setInstallerContacted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = (key: keyof FormData, value: string | boolean) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const isEmailValid = EMAIL_REGEX.test(formData.email.trim());

  // PLZ: numeric-only, max 5 digits
  const handleZip = (raw: string) =>
    update("zip", raw.replace(/[^0-9]/g, "").slice(0, 5));

  // File upload handler with type/size/count/duplicate guards
  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    setUploadedFiles((prev) => {
      const next = [...prev];
      for (const file of Array.from(list)) {
        if (next.length >= MAX_FILES) break;
        if (!ALLOWED_FILE_TYPES.includes(file.type)) continue;
        if (file.size > MAX_FILE_SIZE) continue;
        if (next.some((f) => f.name === file.name)) continue;
        next.push(file);
      }
      return next;
    });
  };

  const removeFile = (i: number) =>
    setUploadedFiles((prev) => prev.filter((_, idx) => idx !== i));

  // Per-step validation
  const isStepValid = (step: number): boolean => {
    if (step === 1) return formData.requestType !== "";
    if (step === 2)
      return formData.customerType !== "" && formData.zip.length === 5;
    if (step === 3) return formData.description.trim().length >= 20;
    if (step === 4)
      return (
        formData.firstName.trim() !== "" &&
        formData.lastName.trim() !== "" &&
        isEmailValid &&
        formData.phone.trim() !== "" &&
        formData.privacy
      );
    return true;
  };

  const goNext = () => {
    if (isStepValid(currentStep) && currentStep < STEPS.length) {
      setCurrentStep((s) => s + 1);
    }
  };

  const goPrev = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid(4)) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const contactMethodLabel =
      CONTACT_METHODS.find((m) => m.value === formData.contactMethod)?.label ??
      "Keine Angabe";
    const preferredTimeLabel =
      PREFERRED_TIMES.find((t) => t.value === formData.preferredTime)?.label ??
      "Keine Angabe";
    const requestTypeLabel = getRequestTypeLabel(formData.requestType);
    const customerTypeLabel = getCustomerTypeLabel(formData.customerType);

    const templateParams = {
      to_email: "info@sv-bauten.de",
      // Step 1
      request_type: requestTypeLabel,
      // Step 2
      customer_type: customerTypeLabel,
      zip: formData.zip,
      kwp: formData.kwp || "–",
      baujahr: formData.baujahr || "–",
      // Context fields (only non-empty values appear)
      aktenzeichen: formData.aktenzeichen || "–",
      schadenstag: formData.schadenstag || "–",
      installationsart: formData.installationsart || "–",
      speichertyp: formData.speichertyp || "–",
      gegenstand: formData.gegenstand || "–",
      themenfeld: formData.themenfeld || "–",
      // Step 3
      description: formData.description,
      installer_contacted: installerContacted ? "Ja" : "Nein",
      attachments:
        uploadedFiles.length > 0
          ? uploadedFiles.map((f) => f.name).join(", ")
          : "Keine",
      // Step 4
      first_name: formData.firstName,
      last_name: formData.lastName,
      company: formData.company || "–",
      email: formData.email,
      phone: formData.phone,
      contact_method: contactMethodLabel,
      preferred_time: preferredTimeLabel,
      newsletter: formData.newsletter ? "Ja" : "Nein",
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setSubmitted(true);
      setUploadedFiles([]);
      setInstallerContacted(false);
      setEmailTouched(false);
      setFormData(EMPTY_FORM);
      setCurrentStep(1);
    } catch {
      setSubmitError(
        "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="w-full scroll-mt-60 bg-muted/30 md:scroll-mt-0 md:py-10"
      id="kontakt"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          {/* ── Form card ── */}
          <div className="min-w-0 rounded-2xl border border-border bg-card p-6 md:p-8">
            {submitted ? (
              /* Success */
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
                <div className="mb-8 flex items-center justify-between">
                  {STEPS.map((label, i) => (
                    <StepIndicatorItem
                      currentStep={currentStep}
                      index={i}
                      key={label}
                      label={label}
                      step={i + 1}
                      totalSteps={STEPS.length}
                    />
                  ))}
                </div>

                <form onSubmit={handleSubmit}>
                  {/* ── Step 1: Anliegen ── */}
                  {currentStep === 1 && (
                    <div className="flex animate-fadeIn flex-col gap-6">
                      <div>
                        <h3
                          className="font-bold text-xl"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          Was können wir für Sie tun?
                        </h3>
                        <p className="mt-1 text-muted-foreground text-sm">
                          Wählen Sie die Art Ihrer Anfrage.{" "}
                          <span className="text-destructive">*</span>
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {REQUEST_TYPES.map((t) => (
                          <button
                            className={cn(
                              "flex flex-col items-start gap-0.5 rounded-xl border px-4 py-3.5 text-left transition-all",
                              formData.requestType === t.value
                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                : "border-border bg-background hover:border-primary/40 hover:bg-muted/50"
                            )}
                            key={t.value}
                            onClick={() => update("requestType", t.value)}
                            type="button"
                          >
                            <span className="font-semibold text-foreground text-sm leading-snug">
                              {t.label}
                            </span>
                            <span className="text-muted-foreground text-xs leading-snug">
                              {t.desc}
                            </span>
                          </button>
                        ))}
                      </div>

                      <NavButtons
                        nextDisabled={!isStepValid(1)}
                        onNext={goNext}
                      />
                    </div>
                  )}

                  {/* ── Step 2: Anlage ── */}
                  {currentStep === 2 && (
                    <div className="flex animate-fadeIn flex-col gap-6">
                      <div>
                        <h3
                          className="font-bold text-xl"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          Angaben zur Anlage
                        </h3>
                        <p className="mt-1 text-muted-foreground text-sm">
                          Helfen Sie uns, Ihre Situation besser einzuordnen.
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        {/* Ich bin … */}
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="customerType">
                            Ich bin …{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Select
                            onValueChange={(v) => update("customerType", v)}
                            value={formData.customerType}
                          >
                            <SelectTrigger className="h-8" id="customerType">
                              <SelectValue placeholder="Bitte wählen…" />
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

                        {/* PLZ */}
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="zip">
                            PLZ des Standorts{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            className={cn(
                              "h-8",
                              formData.zip && formData.zip.length !== 5
                                ? "border-destructive focus-visible:ring-destructive"
                                : ""
                            )}
                            id="zip"
                            inputMode="numeric"
                            maxLength={5}
                            onChange={(e) => handleZip(e.target.value)}
                            placeholder="z. B. 52072"
                            value={formData.zip}
                          />
                          {formData.zip && formData.zip.length !== 5 && (
                            <p className="text-destructive text-xs">
                              Bitte eine gültige 5-stellige PLZ eingeben.
                            </p>
                          )}
                        </div>

                        {/* kWp slider – spans both columns */}
                        <div className="flex flex-col gap-2 sm:col-span-2">
                          <Label>
                            Anlagenleistung (kWp){" "}
                            <span className="font-normal text-muted-foreground text-xs">
                              (optional)
                            </span>
                          </Label>
                          <KwpSlider
                            onChange={(v) => update("kwp", v)}
                            value={formData.kwp}
                          />
                        </div>

                        {/* Baujahr */}
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="baujahr">
                            Baujahr der Anlage{" "}
                            <span className="font-normal text-muted-foreground text-xs">
                              (optional)
                            </span>
                          </Label>
                          <Input
                            className="h-8"
                            id="baujahr"
                            max={new Date().getFullYear()}
                            min="1990"
                            onChange={(e) => update("baujahr", e.target.value)}
                            placeholder="z. B. 2018"
                            type="number"
                            value={formData.baujahr}
                          />
                        </div>

                        {/* Context: single-field types sit in col 2 alongside Baujahr */}
                        {formData.requestType === "anlagenabnahme" && (
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="installationsart">
                              Art der Installation
                            </Label>
                            <Select
                              onValueChange={(v) =>
                                update("installationsart", v)
                              }
                              value={formData.installationsart}
                            >
                              <SelectTrigger
                                className="h-8"
                                id="installationsart"
                              >
                                <SelectValue placeholder="Bitte wählen…" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="neuanlage">
                                  Neuanlage
                                </SelectItem>
                                <SelectItem value="erweiterung">
                                  Erweiterung
                                </SelectItem>
                                <SelectItem value="repowering">
                                  Repowering
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {formData.requestType === "batteriespeicher" && (
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="speichertyp">Speichertyp</Label>
                            <Select
                              onValueChange={(v) => update("speichertyp", v)}
                              value={formData.speichertyp}
                            >
                              <SelectTrigger className="h-8" id="speichertyp">
                                <SelectValue placeholder="Bitte wählen…" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="lithium-ionen">
                                  Lithium-Ionen
                                </SelectItem>
                                <SelectItem value="blei-saeure">
                                  Blei-Säure
                                </SelectItem>
                                <SelectItem value="sonstiges">
                                  Sonstiges / Unbekannt
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {formData.requestType === "zweitmeinung" && (
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="gegenstand">Streitgegenstand</Label>
                            <Select
                              onValueChange={(v) => update("gegenstand", v)}
                              value={formData.gegenstand}
                            >
                              <SelectTrigger className="h-8" id="gegenstand">
                                <SelectValue placeholder="Bitte wählen…" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="gewaehrleistung">
                                  Gewährleistungsanspruch
                                </SelectItem>
                                <SelectItem value="versicherungsschaden">
                                  Versicherungsschaden
                                </SelectItem>
                                <SelectItem value="mangelhafte-installation">
                                  Mangelhafte Installation
                                </SelectItem>
                                <SelectItem value="sonstiges">
                                  Sonstiges
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {formData.requestType === "beratung" && (
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="themenfeld">Themenfeld</Label>
                            <Select
                              onValueChange={(v) => update("themenfeld", v)}
                              value={formData.themenfeld}
                            >
                              <SelectTrigger className="h-8" id="themenfeld">
                                <SelectValue placeholder="Bitte wählen…" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="due-diligence">
                                  Due Diligence
                                </SelectItem>
                                <SelectItem value="projektbegleitung">
                                  Projektbegleitung
                                </SelectItem>
                                <SelectItem value="repowering">
                                  Repowering
                                </SelectItem>
                                <SelectItem value="sonstiges">
                                  Sonstiges
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {/* Context: versicherungsschaden has 2 fields – each gets its own cell */}
                        {formData.requestType === "versicherungsschaden" && (
                          <>
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="schadenstag">
                                Schadenstag (Datum)
                              </Label>
                              <Input
                                className="h-8"
                                id="schadenstag"
                                onChange={(e) =>
                                  update("schadenstag", e.target.value)
                                }
                                type="date"
                                value={formData.schadenstag}
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="aktenzeichen">
                                Aktenzeichen / Schadennummer{" "}
                                <span className="font-normal text-muted-foreground text-xs">
                                  (optional)
                                </span>
                              </Label>
                              <Input
                                className="h-8"
                                id="aktenzeichen"
                                onChange={(e) =>
                                  update("aktenzeichen", e.target.value)
                                }
                                placeholder="z. B. VRS-2024-00123"
                                value={formData.aktenzeichen}
                              />
                            </div>
                          </>
                        )}
                      </div>

                      <NavButtons
                        nextDisabled={!isStepValid(2)}
                        onNext={goNext}
                        onPrev={goPrev}
                      />
                    </div>
                  )}

                  {/* ── Step 3: Details ── */}
                  {currentStep === 3 && (
                    <div className="flex animate-fadeIn flex-col gap-6">
                      <div>
                        <h3
                          className="font-bold text-xl"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          Beschreiben Sie Ihr Anliegen
                        </h3>
                        <p className="mt-1 text-muted-foreground text-sm">
                          Je detaillierter, desto besser können wir Ihnen
                          helfen.
                        </p>
                      </div>

                      {/* Description with char counter */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-baseline justify-between">
                          <Label htmlFor="description">
                            Beschreibung{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <span
                            className={cn(
                              "text-xs tabular-nums",
                              formData.description.length >= 20
                                ? "text-emerald-600"
                                : "text-muted-foreground"
                            )}
                          >
                            {formData.description.length} / 20
                          </span>
                        </div>
                        <Textarea
                          className="field-sizing-fixed min-h-[160px] resize-y text-sm"
                          id="description"
                          onChange={(e) =>
                            update("description", e.target.value)
                          }
                          placeholder={
                            DESCRIPTION_PLACEHOLDERS[formData.requestType] ??
                            "Bitte beschreiben Sie Ihr Anliegen möglichst detailliert…"
                          }
                          rows={6}
                          value={formData.description}
                        />
                        <p className="text-muted-foreground text-xs">
                          Mindestens 20 Zeichen erforderlich.
                        </p>
                      </div>

                      {/* File upload */}
                      <div className="flex flex-col gap-2">
                        <Label>
                          Anhänge{" "}
                          <span className="font-normal text-muted-foreground text-xs">
                            (optional – PDF, JPG, PNG · max. 10 MB · max. 5
                            Dateien)
                          </span>
                        </Label>
                        <button
                          className="flex flex-col items-center gap-2 rounded-xl border border-border border-dashed bg-muted/30 px-4 py-6 text-center transition-colors hover:border-primary/40 hover:bg-primary/5"
                          onClick={() => fileInputRef.current?.click()}
                          type="button"
                        >
                          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <svg
                              className="size-5"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <title>Hochladen</title>
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1="12" x2="12" y1="3" y2="15" />
                            </svg>
                          </span>
                          <span className="text-muted-foreground text-sm">
                            Klicken zum Hochladen oder Dateien hierher ziehen
                          </span>
                        </button>
                        <input
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          multiple
                          onChange={(e) => handleFiles(e.target.files)}
                          ref={fileInputRef}
                          type="file"
                        />
                        {uploadedFiles.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {uploadedFiles.map((f, i) => (
                              <div
                                className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-xs"
                                key={f.name}
                              >
                                <span className="max-w-[160px] truncate text-foreground">
                                  {f.name}
                                </span>
                                <span className="text-muted-foreground">
                                  ({(f.size / 1024).toFixed(0)} KB)
                                </span>
                                <button
                                  aria-label={`${f.name} entfernen`}
                                  className="ml-1 text-muted-foreground hover:text-destructive"
                                  onClick={() => removeFile(i)}
                                  type="button"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Installer checkbox for relevant concerns */}
                      {INSTALLER_CHECKBOX_CONCERNS.includes(
                        formData.requestType
                      ) && (
                        <div className="flex items-start gap-3 rounded-xl">
                          <Checkbox
                            checked={installerContacted}
                            className="mt-0.5"
                            id="installer"
                            onCheckedChange={(v) => setInstallerContacted(!!v)}
                          />
                          <Label
                            className="cursor-pointer font-normal text-sm leading-relaxed"
                            htmlFor="installer"
                          >
                            Ich habe den Installateur bereits kontaktiert und
                            keine zufriedenstellende Antwort erhalten.
                          </Label>
                        </div>
                      )}

                      <NavButtons
                        nextDisabled={!isStepValid(3)}
                        onNext={goNext}
                        onPrev={goPrev}
                      />
                    </div>
                  )}

                  {/* ── Step 4: Kontakt ── */}
                  {currentStep === 4 && (
                    <div className="flex animate-fadeIn flex-col gap-5">
                      <div>
                        <h3
                          className="font-bold text-xl"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          Ihre Kontaktdaten
                        </h3>
                        <p className="mt-1 text-muted-foreground text-sm">
                          Pflichtfelder sind mit{" "}
                          <span className="text-destructive">*</span> markiert.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="firstName">
                            Vorname <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            onChange={(e) =>
                              update("firstName", e.target.value)
                            }
                            value={formData.firstName}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="lastName">
                            Nachname <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            onChange={(e) => update("lastName", e.target.value)}
                            value={formData.lastName}
                          />
                        </div>
                      </div>

                      {isCompanyType(formData.customerType) && (
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="company">Firma</Label>
                          <Input
                            id="company"
                            onChange={(e) => update("company", e.target.value)}
                            value={formData.company}
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Email with real-time validation */}
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="email">
                            E-Mail <span className="text-destructive">*</span>
                          </Label>
                          <div className="relative">
                            <Input
                              className={cn(
                                "h-8 pr-9",
                                emailTouched && formData.email
                                  ? isEmailValid
                                    ? "border-emerald-500 focus-visible:ring-emerald-500"
                                    : "border-destructive focus-visible:ring-destructive"
                                  : ""
                              )}
                              id="email"
                              onBlur={() => setEmailTouched(true)}
                              onChange={(e) => update("email", e.target.value)}
                              type="email"
                              value={formData.email}
                            />
                            {emailTouched && formData.email && (
                              <span className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3">
                                {isEmailValid ? (
                                  <CheckIcon className="size-4 text-emerald-500" />
                                ) : (
                                  <svg
                                    className="size-4 text-destructive"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                    viewBox="0 0 24 24"
                                  >
                                    <title>Ungültig</title>
                                    <line x1="18" x2="6" y1="6" y2="18" />
                                    <line x1="6" x2="18" y1="6" y2="18" />
                                  </svg>
                                )}
                              </span>
                            )}
                          </div>
                          {emailTouched && formData.email && !isEmailValid && (
                            <p className="text-destructive text-xs">
                              Bitte eine gültige E-Mail-Adresse eingeben.
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          <Label htmlFor="phone">
                            Telefon <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="phone"
                            onChange={(e) => update("phone", e.target.value)}
                            type="tel"
                            value={formData.phone}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="contactMethod">
                            Bevorzugter Kontaktweg
                          </Label>
                          <Select
                            onValueChange={(v) => update("contactMethod", v)}
                            value={formData.contactMethod}
                          >
                            <SelectTrigger id="contactMethod">
                              <SelectValue placeholder="Keine Präferenz" />
                            </SelectTrigger>
                            <SelectContent>
                              {CONTACT_METHODS.map((t) => (
                                <SelectItem key={t.value} value={t.value}>
                                  {t.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="preferredTime">
                            Bevorzugter Zeitraum
                          </Label>
                          <Select
                            onValueChange={(v) => update("preferredTime", v)}
                            value={formData.preferredTime}
                          >
                            <SelectTrigger id="preferredTime">
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
                      </div>

                      <Separator />

                      <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={formData.privacy}
                            className="mt-0.5"
                            id="privacy"
                            onCheckedChange={(v) => update("privacy", !!v)}
                          />
                          <Label
                            className="inline cursor-pointer font-normal text-sm leading-relaxed"
                            htmlFor="privacy"
                          >
                            Ich habe die{" "}
                            <Link
                              className="text-primary hover:underline"
                              to="/datenschutz"
                            >
                              Datenschutzerklärung
                            </Link>{" "}
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
                            onCheckedChange={(v) => update("newsletter", !!v)}
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

                      <NavButtons
                        nextDisabled={!isStepValid(4)}
                        onNext={goNext}
                        onPrev={goPrev}
                      />
                    </div>
                  )}

                  {/* ── Step 5: Bestätigung ── */}
                  {currentStep === 5 && (
                    <div className="flex animate-fadeIn flex-col gap-6">
                      <div>
                        <h3
                          className="font-bold text-xl"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          Zusammenfassung Ihrer Anfrage
                        </h3>
                        <p className="mt-1 text-muted-foreground text-sm">
                          Bitte prüfen Sie Ihre Angaben, dann absenden.
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 hyphens-auto rounded-xl border border-border bg-muted/40 p-5 text-sm md:gap-2.5">
                        {(
                          [
                            {
                              label: "Anfragetyp",
                              value: getRequestTypeLabel(formData.requestType),
                            },
                            {
                              label: "Kundentyp",
                              value: getCustomerTypeLabel(
                                formData.customerType
                              ),
                            },
                            formData.zip
                              ? { label: "PLZ", value: formData.zip }
                              : null,
                            formData.kwp
                              ? {
                                  label: "Anlagenleistung",
                                  value: `${formData.kwp} kWp`,
                                }
                              : null,
                            formData.baujahr
                              ? {
                                  label: "Baujahr",
                                  value: formData.baujahr,
                                }
                              : null,
                            {
                              label: "Name",
                              value: `${formData.firstName} ${formData.lastName}`,
                            },
                            formData.company
                              ? { label: "Firma", value: formData.company }
                              : null,
                            { label: "E-Mail", value: formData.email },
                            { label: "Telefon", value: formData.phone },
                            formData.contactMethod
                              ? {
                                  label: "Kontaktweg",
                                  value:
                                    CONTACT_METHODS.find(
                                      (m) => m.value === formData.contactMethod
                                    )?.label ?? formData.contactMethod,
                                }
                              : null,
                            formData.preferredTime
                              ? {
                                  label: "Zeitraum",
                                  value:
                                    PREFERRED_TIMES.find(
                                      (t) => t.value === formData.preferredTime
                                    )?.label ?? formData.preferredTime,
                                }
                              : null,
                            uploadedFiles.length > 0
                              ? {
                                  label: "Anhänge",
                                  value: `${uploadedFiles.length} Datei(en)`,
                                }
                              : null,
                            {
                              label: "Beschreibung",
                              value: formData.description,
                            },
                          ] as Array<{
                            label: string;
                            value: string;
                          } | null>
                        )
                          .filter(Boolean)
                          .map((row) => (
                            <div
                              className="flex gap-1 md:gap-3"
                              key={row!.label}
                            >
                              <span className="w-32 shrink-0 font-semibold text-foreground">
                                {row!.label}:
                              </span>
                              <span className="min-w-0 break-words text-muted-foreground">
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

                      {submitError && (
                        <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-destructive text-sm">
                          {submitError}
                        </p>
                      )}

                      <NavButtons
                        isLast
                        isSubmitting={isSubmitting}
                        onPrev={goPrev}
                      />
                    </div>
                  )}
                </form>
              </>
            )}
          </div>

          {/* ── Sidebar: quick contact ── */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-1 flex-col items-start gap-3 rounded-2xl border border-border bg-card p-5">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <PhoneIcon className="size-5" />
              </div>
              <div>
                <h4
                  className="font-semibold text-sm"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Telefon
                </h4>
                <a
                  className="font-medium text-primary text-sm hover:underline"
                  href={`tel:${siteConfig.contact.phone}`}
                >
                  {siteConfig.contact.phone}
                </a>
                <p className="mt-1 text-muted-foreground text-xs">
                  {siteConfig.contact.hours}
                </p>
              </div>
            </div>

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
                  {siteConfig.contact.address}
                </p>
                <p className="mt-1 text-muted-foreground text-xs">
                  Bundesweit tätig · ISO/IEC 17024 zertifiziert
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
