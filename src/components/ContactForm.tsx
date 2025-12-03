import { useEffect, useState } from "react";
import type { FormData } from "../types";

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
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
  });

  useEffect(() => {
    if (
      formData.customerType === "unternehmen" ||
      formData.customerType === "installateur"
    ) {
      document.getElementById("companyField")?.classList.remove("hidden");
    } else {
      document.getElementById("companyField")?.classList.add("hidden");
    }
  }, [formData.customerType]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [id]: checked });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      return formData.requestType !== "" && formData.customerType !== "";
    }
    if (step === 2) {
      return formData.description.trim() !== "";
    }
    if (step === 3) {
      return (
        formData.firstName.trim() !== "" &&
        formData.lastName.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.phone.trim() !== "" &&
        formData.privacy
      );
    }
    return true;
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      alert("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      // Scroll to form
      document
        .getElementById("contactForm")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Ihre Anfrage wurde erfolgreich gesendet!");
    // Reset form
    setFormData({
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
    });
    setCurrentStep(1);
  };

  const getRequestTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      gutachten: "Technisches Gutachten",
      schadenanalyse: "Schadenanalyse",
      wirtschaftlichkeit: "Wirtschaftlichkeitsprüfung",
      anlagenabnahme: "Anlagenabnahme",
      "beratung-installateur": "Beratung für Installateure",
      versicherung: "Anfrage Versicherung",
      "online-gutachten": "Online-Gutachten (Express)",
      sonstiges: "Sonstige Anfrage",
    };
    return labels[type] || type;
  };

  const getCustomerTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      privatperson: "Privatperson",
      unternehmen: "Unternehmen",
      installateur: "Installateur/Fachbetrieb",
      versicherung: "Versicherung",
    };
    return labels[type] || type;
  };

  return (
    <section className="bg-gray-50 py-16" id="kontakt">
      <div className="container mx-auto px-5">
        <h2 className="mb-4 text-center font-bold text-4xl">
          Kontakt & Terminbuchung
        </h2>
        <p className="mb-12 text-center text-gray-600 text-lg">
          Nehmen Sie Kontakt auf oder buchen Sie direkt einen Termin für Ihre
          Beratung
        </p>

        <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-lg">
          {/* Step Indicator */}
          <div className="relative mb-12 flex justify-between">
            <div className="-z-10 absolute top-5 right-0 left-0 h-0.5 bg-gray-300" />
            {[1, 2, 3, 4].map((step) => (
              <div
                className="z-10 flex flex-1 flex-col items-center"
                key={step}
              >
                <div
                  className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full font-bold transition-all ${
                    currentStep === step
                      ? "border-2 border-[#0066CC] bg-[#0066CC] text-white"
                      : currentStep > step
                        ? "border-2 border-green-500 bg-green-500 text-white"
                        : "border-2 border-gray-300 bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > step ? "✓" : step}
                </div>
                <div
                  className={`text-center text-sm ${
                    currentStep === step
                      ? "font-semibold text-[#0066CC]"
                      : "text-gray-500"
                  }`}
                >
                  {step === 1 && "Anfragetyp"}
                  {step === 2 && "Details"}
                  {step === 3 && "Kontaktdaten"}
                  {step === 4 && "Bestätigung"}
                </div>
              </div>
            ))}
          </div>

          <form id="contactForm" onSubmit={handleSubmit}>
            {/* Step 1: Anfragetyp */}
            {currentStep === 1 && (
              <div className="animate-fadeIn">
                <h3 className="mb-6 font-bold text-2xl">
                  Welche Art von Anfrage haben Sie?
                </h3>

                <div className="mb-6">
                  <label className="mb-2 block font-semibold">
                    Anfragetyp auswählen <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20"
                    id="requestType"
                    onChange={handleInputChange}
                    required
                    value={formData.requestType}
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="gutachten">Technisches Gutachten</option>
                    <option value="schadenanalyse">Schadenanalyse</option>
                    <option value="wirtschaftlichkeit">
                      Wirtschaftlichkeitsprüfung
                    </option>
                    <option value="anlagenabnahme">Anlagenabnahme</option>
                    <option value="beratung-installateur">
                      Beratung für Installateure
                    </option>
                    <option value="versicherung">Anfrage Versicherung</option>
                    <option value="online-gutachten">
                      Online-Gutachten (Express)
                    </option>
                    <option value="sonstiges">Sonstige Anfrage</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="mb-2 block font-semibold">
                    Sie sind... <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20"
                    id="customerType"
                    onChange={handleInputChange}
                    required
                    value={formData.customerType}
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="privatperson">Privatperson</option>
                    <option value="unternehmen">Unternehmen</option>
                    <option value="installateur">
                      Installateur/Fachbetrieb
                    </option>
                    <option value="versicherung">Versicherung</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    className="rounded-lg bg-[#0066CC] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#004C99]"
                    onClick={nextStep}
                    type="button"
                  >
                    Weiter →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
              <div className="animate-fadeIn">
                <h3 className="mb-6 font-bold text-2xl">
                  Details zu Ihrer Anfrage
                </h3>

                <div className="mb-6">
                  <label className="mb-2 block font-semibold">
                    Beschreibung <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20"
                    id="description"
                    onChange={handleInputChange}
                    placeholder="Bitte beschreiben Sie Ihr Anliegen möglichst detailliert..."
                    required
                    rows={5}
                    value={formData.description}
                  />
                  <p className="mt-2 text-gray-500 text-sm">
                    Je detaillierter Ihre Beschreibung, desto besser können wir
                    Ihnen helfen.
                  </p>
                </div>

                <div className="flex justify-between">
                  <button
                    className="rounded-lg border-2 border-[#0066CC] bg-transparent px-8 py-3 font-semibold text-[#0066CC] transition-all hover:bg-[#0066CC] hover:text-white"
                    onClick={prevStep}
                    type="button"
                  >
                    ← Zurück
                  </button>
                  <button
                    className="rounded-lg bg-[#0066CC] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#004C99]"
                    onClick={nextStep}
                    type="button"
                  >
                    Weiter →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Kontaktdaten */}
            {currentStep === 3 && (
              <div className="animate-fadeIn">
                <h3 className="mb-6 font-bold text-2xl">Ihre Kontaktdaten</h3>

                <div className="mb-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-semibold">
                      Vorname <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20"
                      id="firstName"
                      onChange={handleInputChange}
                      required
                      type="text"
                      value={formData.firstName}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-semibold">
                      Nachname <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20"
                      id="lastName"
                      onChange={handleInputChange}
                      required
                      type="text"
                      value={formData.lastName}
                    />
                  </div>
                </div>

                <div className="mb-6 hidden" id="companyField">
                  <label className="mb-2 block font-semibold">Firma</label>
                  <input
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20"
                    id="company"
                    onChange={handleInputChange}
                    type="text"
                    value={formData.company}
                  />
                </div>

                <div className="mb-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-semibold">
                      E-Mail <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20"
                      id="email"
                      onChange={handleInputChange}
                      required
                      type="email"
                      value={formData.email}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-semibold">
                      Telefon <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20"
                      id="phone"
                      onChange={handleInputChange}
                      required
                      type="tel"
                      value={formData.phone}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2 block font-semibold">
                    Straße & Hausnummer
                  </label>
                  <input
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20"
                    id="street"
                    onChange={handleInputChange}
                    type="text"
                    value={formData.street}
                  />
                </div>

                <div className="mb-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-semibold">PLZ</label>
                    <input
                      className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20"
                      id="zip"
                      onChange={handleInputChange}
                      type="text"
                      value={formData.zip}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-semibold">Ort</label>
                    <input
                      className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20"
                      id="city"
                      onChange={handleInputChange}
                      type="text"
                      value={formData.city}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2 block font-semibold">
                    Bevorzugte Kontaktzeit
                  </label>
                  <select
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20"
                    id="preferredTime"
                    onChange={handleInputChange}
                    value={formData.preferredTime}
                  >
                    <option value="">Keine Präferenz</option>
                    <option value="morning">Vormittags (9-12 Uhr)</option>
                    <option value="afternoon">Nachmittags (12-15 Uhr)</option>
                    <option value="evening">Spätnachmittag (15-18 Uhr)</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="flex items-start gap-2">
                    <input
                      checked={formData.privacy}
                      className="mt-1"
                      id="privacy"
                      onChange={handleInputChange}
                      required
                      type="checkbox"
                    />
                    <span className="text-sm">
                      Ich habe die{" "}
                      <a
                        className="text-[#0066CC] hover:underline"
                        href="#datenschutz"
                      >
                        Datenschutzerklärung
                      </a>{" "}
                      zur Kenntnis genommen. Ich stimme zu, dass meine Angaben
                      zur Kontaktaufnahme und für Rückfragen dauerhaft
                      gespeichert werden.{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                </div>

                <div className="mb-6">
                  <label className="flex items-start gap-2">
                    <input
                      checked={formData.newsletter}
                      className="mt-1"
                      id="newsletter"
                      onChange={handleInputChange}
                      type="checkbox"
                    />
                    <span className="text-sm">
                      Ich möchte den Newsletter mit Fachartikeln und Updates
                      erhalten (jederzeit abbestellbar)
                    </span>
                  </label>
                </div>

                <div className="flex justify-between">
                  <button
                    className="rounded-lg border-2 border-[#0066CC] bg-transparent px-8 py-3 font-semibold text-[#0066CC] transition-all hover:bg-[#0066CC] hover:text-white"
                    onClick={prevStep}
                    type="button"
                  >
                    ← Zurück
                  </button>
                  <button
                    className="rounded-lg bg-[#0066CC] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#004C99]"
                    onClick={nextStep}
                    type="button"
                  >
                    Weiter →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Zusammenfassung */}
            {currentStep === 4 && (
              <div className="animate-fadeIn">
                <h3 className="mb-6 font-bold text-2xl">
                  Zusammenfassung Ihrer Anfrage
                </h3>

                <div className="mb-6 space-y-3 rounded-lg bg-gray-50 p-6">
                  <div>
                    <strong>Anfragetyp:</strong>{" "}
                    {getRequestTypeLabel(formData.requestType)}
                  </div>
                  <div>
                    <strong>Kundentyp:</strong>{" "}
                    {getCustomerTypeLabel(formData.customerType)}
                  </div>
                  <div>
                    <strong>Name:</strong> {formData.firstName}{" "}
                    {formData.lastName}
                  </div>
                  {formData.company && (
                    <div>
                      <strong>Firma:</strong> {formData.company}
                    </div>
                  )}
                  <div>
                    <strong>E-Mail:</strong> {formData.email}
                  </div>
                  <div>
                    <strong>Telefon:</strong> {formData.phone}
                  </div>
                  <div>
                    <strong>Beschreibung:</strong> {formData.description}
                  </div>
                </div>

                <div className="mb-6 border-[#0066CC] border-l-4 bg-blue-50 p-6">
                  <strong>Was passiert als Nächstes?</strong>
                  <ul className="mt-2 list-inside list-disc space-y-2">
                    <li>
                      Sie erhalten innerhalb von 24 Stunden eine
                      Eingangsbestätigung
                    </li>
                    <li>
                      Wir prüfen Ihre Anfrage und erstellen ein unverbindliches
                      Angebot
                    </li>
                    <li>
                      Bei Online-Gutachten: Express-Bearbeitung innerhalb 48
                      Stunden
                    </li>
                    <li>Persönliche Kontaktaufnahme durch Andreas Bauten</li>
                  </ul>
                </div>

                <div className="flex justify-between">
                  <button
                    className="rounded-lg border-2 border-[#0066CC] bg-transparent px-8 py-3 font-semibold text-[#0066CC] transition-all hover:bg-[#0066CC] hover:text-white"
                    onClick={prevStep}
                    type="button"
                  >
                    ← Zurück
                  </button>
                  <button
                    className="rounded-lg bg-[#0066CC] px-8 py-4 font-semibold text-lg text-white transition-colors hover:bg-[#004C99]"
                    type="submit"
                  >
                    Anfrage absenden ✓
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Alternative Kontaktmöglichkeiten */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 text-center shadow-md">
            <div className="mb-3 text-4xl">📞</div>
            <h4 className="mb-2 font-bold text-xl">Telefon</h4>
            <p className="font-semibold">+49-15784410467</p>
            <p className="text-gray-500 text-sm">Mo-Fr: 9:00-18:00 Uhr</p>
          </div>

          <div className="rounded-xl bg-white p-6 text-center shadow-md">
            <div className="mb-3 text-4xl">✉️</div>
            <h4 className="mb-2 font-bold text-xl">E-Mail</h4>
            <p className="font-semibold">Andreas.Bauten@gmail.com</p>
            <p className="text-gray-500 text-sm">Antwort innerhalb 24h</p>
          </div>

          <div className="rounded-xl bg-white p-6 text-center shadow-md">
            <div className="mb-3 text-4xl">📍</div>
            <h4 className="mb-2 font-bold text-xl">Standort</h4>
            <p className="font-semibold">Aachen, NRW</p>
            <p className="text-gray-500 text-sm">Deutschlandweit tätig</p>
          </div>
        </div>
      </div>
    </section>
  );
}
