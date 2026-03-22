import { createFileRoute } from "@tanstack/react-router";
import Footer from "../../components/footer";
import Header from "../../components/header";

export const Route = createFileRoute("/datenschutz/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header />
      <main className="container mx-auto max-w-6xl px-5 py-16">
        <h1 className="mb-2 font-bold text-3xl">Datenschutzerklärung</h1>
        <p className="mb-10 text-gray-500 text-sm">Stand: 13.03.2026</p>

        <div className="relative lg:flex lg:items-start lg:gap-10">
          <aside className="top-24 mb-10 lg:sticky lg:order-2 lg:mb-0 lg:w-64 lg:shrink-0">
            <nav className="rounded-lg border border-gray-200 bg-gray-50 p-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto">
              <h2 className="mb-3 font-semibold text-gray-500 text-sm uppercase tracking-wide">
                Inhaltsverzeichnis
              </h2>
              <ol className="list-decimal space-y-1 pl-4 text-sm">
                <li>
                  <a
                    className="text-primary hover:underline"
                    href="#verantwortlicher"
                  >
                    Verantwortlicher und Kontakt
                  </a>
                </li>
                <li>
                  <a
                    className="text-primary hover:underline"
                    href="#geltungsbereich"
                  >
                    Geltungsbereich und Überblick
                  </a>
                </li>
                <li>
                  <a
                    className="text-primary hover:underline"
                    href="#rechtsgrundlagen"
                  >
                    Rechtsgrundlagen der Datenverarbeitung
                  </a>
                </li>
                <li>
                  <a className="text-primary hover:underline" href="#website">
                    Datenverarbeitung beim Besuch dieser Website
                  </a>
                </li>
                <li>
                  <a className="text-primary hover:underline" href="#cookies">
                    Cookies und vergleichbare Technologien
                  </a>
                </li>
                <li>
                  <a className="text-primary hover:underline" href="#kontakt">
                    Kontaktaufnahme und Kommunikation
                  </a>
                </li>
                <li>
                  <a
                    className="text-primary hover:underline"
                    href="#sachverstaendigen"
                  >
                    Sachverständigentätigkeit
                  </a>
                </li>
                <li>
                  <a className="text-primary hover:underline" href="#caleu">
                    Online-Terminbuchung (Cal.eu)
                  </a>
                </li>
                <li>
                  <a
                    className="text-primary hover:underline"
                    href="#drittdienste"
                  >
                    Eingebettete Inhalte und Drittdienste
                  </a>
                </li>
                <li>
                  <a
                    className="text-primary hover:underline"
                    href="#videokonferenzen"
                  >
                    Videokonferenzen und Online-Beratung
                  </a>
                </li>
                <li>
                  <a className="text-primary hover:underline" href="#zahlung">
                    Zahlungsabwicklung
                  </a>
                </li>
                <li>
                  <a
                    className="text-primary hover:underline"
                    href="#empfaenger"
                  >
                    Empfänger und Auftragsverarbeiter
                  </a>
                </li>
                <li>
                  <a
                    className="text-primary hover:underline"
                    href="#drittlaender"
                  >
                    Datenübermittlung in Drittländer
                  </a>
                </li>
                <li>
                  <a
                    className="text-primary hover:underline"
                    href="#speicherdauer"
                  >
                    Speicherdauer im Überblick
                  </a>
                </li>
                <li>
                  <a
                    className="text-primary hover:underline"
                    href="#betroffenenrechte"
                  >
                    Ihre Rechte als betroffene Person
                  </a>
                </li>
                <li>
                  <a className="text-primary hover:underline" href="#pflicht">
                    Pflicht zur Bereitstellung personenbezogener Daten
                  </a>
                </li>
                <li>
                  <a
                    className="text-primary hover:underline"
                    href="#profiling"
                  >
                    Automatisierte Entscheidungsfindung
                  </a>
                </li>
                <li>
                  <a
                    className="text-primary hover:underline"
                    href="#datensicherheit"
                  >
                    Datensicherheit
                  </a>
                </li>
                <li>
                  <a
                    className="text-primary hover:underline"
                    href="#aktualitaet"
                  >
                    Aktualität und Änderungen
                  </a>
                </li>
              </ol>
            </nav>
          </aside>
          <div className="min-w-0 flex-1 lg:order-1">
            {/* 1 */}
            <section className="mb-10 scroll-mt-24" id="verantwortlicher">
              <h2 className="mb-4 font-bold text-primary text-xl">
                1. Verantwortlicher und Kontakt
              </h2>
              <p className="mb-3">
                Verantwortlich für die Datenverarbeitung auf dieser Website im
                Sinne der DSGVO ist:
              </p>
              <address className="mb-4 not-italic">
                <strong>Andreas Bauten</strong>
                <br />
                Sachverständiger für Photovoltaikanlagen, zertifiziert nach
                ISO/IEC 17024
                <br />
                Banker-Feld-Straße 1, 52072 Aachen, Deutschland
                <br />
                E-Mail:{" "}
                <a
                  className="text-primary hover:underline"
                  href="mailto:info@sv-bauten.de"
                >
                  info@sv-bauten.de
                </a>
                <br />
                Telefon: +49 1567 979 0851
              </address>
              <p>
                Die Bestellung eines Datenschutzbeauftragten ist für dieses
                Unternehmen gesetzlich nicht erforderlich. Für alle Fragen zum
                Datenschutz wenden Sie sich bitte direkt an den oben genannten
                Verantwortlichen.
              </p>
            </section>

            {/* 2 */}
            <section className="mb-10 scroll-mt-24" id="geltungsbereich">
              <h2 className="mb-4 font-bold text-primary text-xl">
                2. Geltungsbereich und Überblick
              </h2>
              <p className="mb-4">
                Diese Datenschutzerklärung informiert Sie darüber, welche
                personenbezogenen Daten wir erheben, zu welchen Zwecken und auf
                welcher Rechtsgrundlage wir sie verarbeiten, an wen wir sie
                gegebenenfalls weitergeben und welche Rechte Ihnen zustehen. Sie
                gilt für den Besuch dieser Website (sv-bauten.de) sowie für alle
                Datenverarbeitungen im Zusammenhang mit unserer
                Geschäftstätigkeit als Sachverständiger für Photovoltaikanlagen.
              </p>
            </section>

            {/* 3 */}
            <section className="mb-10 scroll-mt-24" id="rechtsgrundlagen">
              <h2 className="mb-4 font-bold text-primary text-xl">
                3. Rechtsgrundlagen der Datenverarbeitung
              </h2>
              <ul className="space-y-3">
                <li>
                  <strong>Art. 6 Abs. 1 lit. a DSGVO – Einwilligung:</strong>{" "}
                  Soweit Sie uns eine ausdrückliche Einwilligung erteilt haben
                  (z.B. für nicht-essentielle Cookies). Widerrufbar jederzeit
                  für die Zukunft.
                </li>
                <li>
                  <strong>
                    Art. 6 Abs. 1 lit. b DSGVO – Vertragserfüllung:
                  </strong>{" "}
                  Soweit die Verarbeitung zur Durchführung eines Vertrags oder
                  zur Bearbeitung vorvertraglicher Anfragen erforderlich ist.
                </li>
                <li>
                  <strong>
                    Art. 6 Abs. 1 lit. c DSGVO – Rechtliche Verpflichtung:
                  </strong>{" "}
                  Bei gesetzlichen Aufbewahrungspflichten (§ 147 AO, § 257 HGB).
                </li>
                <li>
                  <strong>
                    Art. 6 Abs. 1 lit. f DSGVO – Berechtigtes Interesse:
                  </strong>{" "}
                  Z.B. für IT-Sicherheit, ordnungsgemäße
                  Sachverständigentätigkeit und Geltendmachung rechtlicher
                  Ansprüche.
                </li>
              </ul>
            </section>

            {/* 4 */}
            <section className="mb-10 scroll-mt-24" id="website">
              <h2 className="mb-4 font-bold text-primary text-xl">
                4. Datenverarbeitung beim Besuch dieser Website
              </h2>

              <h3 className="mb-2 font-semibold">4.1 Hosting</h3>
              <p className="mb-4">
                Diese Website wird gehostet bei Hostinger International Ltd., 61
                Lordou Vironos Street, 6023 Larnaca, Zypern (EU). Hostinger
                verarbeitet in unserem Auftrag personenbezogene Daten der
                Website-Besucher auf Servern innerhalb der Europäischen Union.
                Ein Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO wurde
                abgeschlossen. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
              </p>

              <h3 className="mb-2 font-semibold">4.2 Server-Log-Dateien</h3>
              <p className="mb-2">
                Beim Aufruf unserer Website erhebt der Hosting-Anbieter
                automatisch folgende technische Daten:
              </p>
              <ul className="mb-3 list-disc space-y-1 pl-6">
                <li>IP-Adresse des zugreifenden Geräts</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Aufgerufene Seite bzw. Datei (URL)</li>
                <li>
                  HTTP-Statuscode, Browsertyp und -version, Betriebssystem
                </li>
                <li>Referrer-URL, übertragene Datenmenge</li>
              </ul>
              <p className="mb-4">
                Speicherdauer: Löschung nach spätestens 7 Tagen.
                Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
              </p>

              <h3 className="mb-2 font-semibold">
                4.3 SSL-/TLS-Verschlüsselung
              </h3>
              <p className="mb-4">
                Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw.
                TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
                am „https://" und dem Schloss-Symbol in der Browserleiste.
              </p>
            </section>

            {/* 5 */}
            <section className="mb-10 scroll-mt-24" id="cookies">
              <h2 className="mb-4 font-bold text-primary text-xl">
                5. Cookies und vergleichbare Technologien
              </h2>

              <h3 className="mb-2 font-semibold">5.1 Was sind Cookies?</h3>
              <p className="mb-4">
                Cookies sind kleine Textdateien, die beim Besuch einer Website
                auf Ihrem Endgerät gespeichert werden.
              </p>

              <h3 className="mb-2 font-semibold">
                5.2 Technisch notwendige Cookies
              </h3>
              <p className="mb-4">
                Wir setzen technisch notwendige Cookies ein (Session-Management,
                Cookie-Consent, Grundfunktionen der Website). Diese werden ohne
                Ihre Einwilligung gesetzt, da sie für die Bereitstellung des
                Dienstes zwingend erforderlich sind. Rechtsgrundlage: § 25 Abs.
                2 Nr. 2 TTDSG i. V. m. Art. 6 Abs. 1 lit. f DSGVO.
              </p>

              <h3 className="mb-2 font-semibold">
                5.3 Einwilligungspflichtige Cookies
              </h3>
              <p className="mb-4">
                Für nicht-essentielle Cookies holen wir Ihre ausdrückliche
                Einwilligung über unser Cookie-Consent-Banner ein.
                Rechtsgrundlage: § 25 Abs. 1 TTDSG i. V. m. Art. 6 Abs. 1 lit. a
                DSGVO.
              </p>

              <h3 className="mb-2 font-semibold">
                5.4 Cookie-Verwaltung und Widerruf
              </h3>
              <p className="mb-4">
                Sie können Ihre Cookie-Einstellungen jederzeit über unser
                Cookie-Consent-Banner ändern oder Cookies über Ihren Browser
                verwalten.
              </p>
            </section>

            {/* 6 */}
            <section className="mb-10 scroll-mt-24" id="kontakt">
              <h2 className="mb-4 font-bold text-primary text-xl">
                6. Kontaktaufnahme und Kommunikation
              </h2>

              <h3 className="mb-2 font-semibold">6.1 Kontaktformular</h3>
              <p className="mb-4">
                Bei Nutzung unseres Kontaktformulars erheben wir Name,
                E-Mail-Adresse, ggf. Telefonnummer sowie den Inhalt Ihrer
                Nachricht.
              </p>

              <h3 className="mb-2 font-semibold">6.2 E-Mail-Kontakt</h3>
              <p className="mb-4">
                Bei E-Mail-Kontakt verarbeiten wir Ihre E-Mail-Adresse, den
                Nachrichteninhalt sowie technische Metadaten. Die Übertragung
                erfolgt verschlüsselt (TLS). Für sensible Inhalte bieten wir
                PGP/GPG-Verschlüsselung an.
              </p>

              <h3 className="mb-2 font-semibold">6.3 Telefonischer Kontakt</h3>
              <p className="mb-4">
                Bei telefonischer Kontaktaufnahme verarbeiten wir ggf. Ihre
                Telefonnummer und den Inhalt des Gesprächs in Form von
                Gesprächsnotizen.
              </p>

              <h3 className="mb-2 font-semibold">
                6.4 Zwecke und Rechtsgrundlagen
              </h3>
              <p className="mb-4">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO bei geschäftlichen
                Anfragen; Art. 6 Abs. 1 lit. f DSGVO bei allgemeinen Anfragen.
              </p>

              <h3 className="mb-2 font-semibold">6.5 Speicherdauer</h3>
              <p className="mb-4">
                Allgemeine Anfragen ohne Vertragsschluss: Löschung spätestens 6
                Monate nach Abschluss der Bearbeitung. Bei Vertragsschluss
                gelten die Aufbewahrungsfristen für Vertragsdaten (Abschnitt
                7.6).
              </p>
            </section>

            {/* 7 */}
            <section className="mb-10 scroll-mt-24" id="sachverstaendigen">
              <h2 className="mb-4 font-bold text-primary text-xl">
                7. Datenverarbeitung im Rahmen der Sachverständigentätigkeit
              </h2>

              <h3 className="mb-2 font-semibold">7.1 Umfang und Zwecke</h3>
              <p className="mb-4">
                Im Rahmen unserer zertifizierten Sachverständigentätigkeit nach
                ISO/IEC 17024 verarbeiten wir personenbezogene Daten für die
                Erstellung von Gutachten, Beratungsleistungen, Anlagenabnahmen,
                Fehleranalysen, Rechnungsstellung und Qualitätssicherung.
              </p>

              <h3 className="mb-2 font-semibold">
                7.2 Verarbeitete Datenkategorien
              </h3>
              <ul className="mb-4 space-y-2">
                <li>
                  <strong>Stamm- und Kontaktdaten:</strong> Name, Firma,
                  Anschrift, E-Mail, Telefonnummer
                </li>
                <li>
                  <strong>Vertrags- und Abrechnungsdaten:</strong>{" "}
                  Auftragsdetails, Rechnungsdaten, Zahlungsinformationen
                </li>
                <li>
                  <strong>Technische Anlagendaten:</strong> PV-Spezifikationen,
                  Messwerte, Prüfprotokolle
                </li>
                <li>
                  <strong>Standort- und Gebäudedaten:</strong> Adresse,
                  Grundrisse, Lagepläne
                </li>
                <li>
                  <strong>Foto- und Videodokumentation:</strong> Aufnahmen von
                  Anlagen; Personen werden unkenntlich gemacht
                  (Datenminimierung)
                </li>
                <li>
                  <strong>Kommunikationsinhalte:</strong> E-Mail-Korrespondenz,
                  Telefonnotizen, Besprechungsprotokolle
                </li>
              </ul>

              <h3 className="mb-2 font-semibold">7.3 Rechtsgrundlagen</h3>
              <p className="mb-4">
                Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung), Art. 6 Abs. 1
                lit. c DSGVO (gesetzliche Aufbewahrungspflichten), Art. 6 Abs. 1
                lit. f DSGVO (berechtigtes Interesse an ordnungsgemäßer
                Sachverständigentätigkeit).
              </p>

              <h3 className="mb-2 font-semibold">
                7.4 Daten Dritter bei Vor-Ort-Terminen
              </h3>
              <p className="mb-4">
                Der Auftraggeber ist verpflichtet, betroffene Dritte (z.B.
                Mieter, Nachbarn) vorab über den Sachverständigentermin zu
                informieren. Personen auf Aufnahmen werden nach dem Grundsatz
                der Datenminimierung unkenntlich gemacht.
              </p>

              <h3 className="mb-2 font-semibold">7.5 Empfänger von Daten</h3>
              <p className="mb-2">
                Soweit erforderlich, können Daten weitergegeben werden an:
              </p>
              <ul className="mb-4 list-disc space-y-1 pl-6">
                <li>Auftraggeber und Projektbeteiligte</li>
                <li>
                  Behörden, Gerichte (bei gesetzlicher Offenbarungspflicht)
                </li>
                <li>Rechtsanwälte, Versicherungen (bei Haftungsfällen)</li>
                <li>Steuerberater, Buchführungsdienstleister</li>
                <li>Externe Fachkollegen, Labore, Prüfstellen</li>
                <li>IT-Dienstleister (mit Auftragsverarbeitungsvertrag)</li>
              </ul>

              <h3 className="mb-2 font-semibold">7.6 Speicherdauer</h3>
              <ul className="mb-4 list-disc space-y-1 pl-6">
                <li>
                  Handels- und steuerrechtliche Aufbewahrungsfristen: 6–10 Jahre
                  (§ 257 HGB, § 147 AO)
                </li>
                <li>
                  Zivilrechtliche Verjährungsfristen: 3–10 Jahre für
                  Haftungsansprüche
                </li>
                <li>
                  Gutachtenakten: bis zu 10 Jahre ab Gutachtenerstellung
                  (ISO/IEC 17024)
                </li>
              </ul>
            </section>

            {/* 8 */}
            <section className="mb-10 scroll-mt-24" id="caleu">
              <h2 className="mb-4 font-bold text-primary text-xl">
                8. Online-Terminbuchung (Cal.eu)
              </h2>
              <p className="mb-4">
                Zur Terminvereinbarung nutzen wir Cal.eu (EU-gehostete Variante
                von Cal.com, betrieben von Cal.com, Inc., USA). Sämtliche
                Terminbuchungsdaten werden ausschließlich auf Servern innerhalb
                der Europäischen Union verarbeitet – keine Übermittlung in
                Drittländer. Ein Auftragsverarbeitungsvertrag gemäß Art. 28
                DSGVO wurde abgeschlossen.
              </p>
              <p className="mb-4">
                Verarbeitete Daten: Name, E-Mail-Adresse, Terminzeitpunkt, ggf.
                Telefonnummer, technische Daten (IP-Adresse, Browsertyp).
              </p>
              <p className="mb-4">
                Rechtsgrundlagen: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
                Maßnahmen), Art. 6 Abs. 1 lit. f DSGVO (Terminkoordination).
              </p>
              <p>
                Weitere Informationen:{" "}
                <a
                  className="text-primary hover:underline"
                  href="https://cal.com/privacy"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  cal.com/privacy
                </a>
              </p>
            </section>

            {/* 9 */}
            <section className="mb-10 scroll-mt-24" id="drittdienste">
              <h2 className="mb-4 font-bold text-primary text-xl">
                9. Eingebettete Inhalte und Drittdienste
              </h2>

              <h3 className="mb-2 font-semibold">9.1 Google Maps</h3>
              <p className="mb-4">
                Zur Darstellung unseres Standorts nutzen wir Google Maps (Google
                Ireland Limited, Irland). Beim Laden der Karte werden
                IP-Adresse, Browser- und Geräteinformationen an Google
                übertragen. Google ist unter dem EU-US Data Privacy Framework
                zertifiziert. Rechtsgrundlage: Art. 6 Abs. 1 lit. a oder lit. f
                DSGVO.
              </p>

              <h3 className="mb-2 font-semibold">9.2 YouTube-Videos</h3>
              <p className="mb-4">
                Wir binden Videos über den erweiterten Datenschutzmodus ein
                (youtube-nocookie.com). Daten werden erst bei aktivem Abspielen
                übertragen. Rechtsgrundlage: Art. 6 Abs. 1 lit. a oder lit. f
                DSGVO.
              </p>
            </section>

            {/* 10 */}
            <section className="mb-10 scroll-mt-24" id="videokonferenzen">
              <h2 className="mb-4 font-bold text-primary text-xl">
                10. Videokonferenzen und Online-Beratung
              </h2>
              <p className="mb-4">
                Für Online-Beratungen nutzen wir je nach Bedarf Zoom, Microsoft
                Teams oder Google Meet. Aufzeichnungen erfolgen ausschließlich
                mit ausdrücklicher Einwilligung aller Teilnehmer und werden nach
                30 Tagen gelöscht. Mit allen Anbietern wurden
                Auftragsverarbeitungsverträge gemäß Art. 28 DSGVO abgeschlossen.
                Drittlandtransfer auf Grundlage des EU-US Data Privacy Framework
                oder EU-Standardvertragsklauseln.
              </p>
            </section>

            {/* 11 */}
            <section className="mb-10 scroll-mt-24" id="zahlung">
              <h2 className="mb-4 font-bold text-primary text-xl">
                11. Zahlungsabwicklung
              </h2>
              <p className="mb-4">
                Für kostenpflichtige Leistungen verarbeiten wir Rechnungsdaten
                (Name, Anschrift, Leistungsbeschreibung, Betrag). Zahlung per
                Banküberweisung. Speicherdauer: 10 Jahre gemäß § 147 Abs. 1 Nr.
                1 AO, § 257 Abs. 1 Nr. 1 HGB.
              </p>
            </section>

            {/* 12 */}
            <section className="mb-10 scroll-mt-24" id="empfaenger">
              <h2 className="mb-4 font-bold text-primary text-xl">
                12. Empfänger und Auftragsverarbeiter im Überblick
              </h2>
              <ul className="space-y-3">
                <li>
                  <strong>Hosting:</strong> Hostinger International Ltd.
                  (Zypern, EU) – Datenverarbeitung innerhalb der EU.
                </li>
                <li>
                  <strong>Online-Terminbuchung:</strong> Cal.com, Inc. (USA)
                  über Cal.eu – ausschließlich EU-Server, keine
                  Drittlandübermittlung.
                </li>
                <li>
                  <strong>Eingebettete Dienste:</strong> Google Ireland Limited
                  (Irland) – ggf. auch USA; EU-US Data Privacy Framework.
                </li>
                <li>
                  <strong>Videokonferenz:</strong> Zoom, Microsoft, Google –
                  EU-US Data Privacy Framework oder EU-Standardvertragsklauseln.
                </li>
              </ul>
            </section>

            {/* 13 */}
            <section className="mb-10 scroll-mt-24" id="drittlaender">
              <h2 className="mb-4 font-bold text-primary text-xl">
                13. Datenübermittlung in Drittländer
              </h2>
              <p className="mb-4">
                Für Google-Dienste besteht ein Angemessenheitsbeschluss im
                Rahmen des EU-US Data Privacy Framework (Art. 45 DSGVO). Für
                sonstige Anbieter außerhalb des EWR stützen wir die Übermittlung
                auf EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).
                Für Cal.eu findet keine Drittlandübermittlung statt.
              </p>
            </section>

            {/* 14 */}
            <section className="mb-10 scroll-mt-24" id="speicherdauer">
              <h2 className="mb-4 font-bold text-primary text-xl">
                14. Speicherdauer im Überblick
              </h2>
              <ul className="space-y-2">
                <li>
                  <strong>Server-Log-Dateien:</strong> Max. 7 Tage
                </li>
                <li>
                  <strong>Allgemeine Kontaktanfragen:</strong> Max. 6 Monate
                  nach Bearbeitung
                </li>
                <li>
                  <strong>Terminbuchungsdaten (Cal.eu):</strong> Max. 6 Monate
                  nach Termin (ohne Vertragsschluss)
                </li>
                <li>
                  <strong>Vertragsdaten und Rechnungen:</strong> 10 Jahre (§ 147
                  AO, § 257 HGB)
                </li>
                <li>
                  <strong>Gutachtenakten:</strong> Bis zu 10 Jahre ab Erstellung
                </li>
                <li>
                  <strong>Videokonferenz-Aufzeichnungen:</strong> 30 Tage
                </li>
              </ul>
            </section>

            {/* 15 */}
            <section className="mb-10 scroll-mt-24" id="betroffenenrechte">
              <h2 className="mb-4 font-bold text-primary text-xl">
                15. Ihre Rechte als betroffene Person
              </h2>
              <ul className="space-y-3">
                <li>
                  <strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Auskunft über
                  verarbeitete Daten, Zwecke, Empfänger und Speicherdauer.
                </li>
                <li>
                  <strong>Recht auf Berichtigung (Art. 16 DSGVO):</strong>{" "}
                  Berichtigung unrichtiger oder Ergänzung unvollständiger Daten.
                </li>
                <li>
                  <strong>Recht auf Löschung (Art. 17 DSGVO):</strong> Löschung,
                  soweit keine gesetzlichen Aufbewahrungspflichten
                  entgegenstehen.
                </li>
                <li>
                  <strong>
                    Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO).
                  </strong>
                </li>
                <li>
                  <strong>
                    Recht auf Datenübertragbarkeit (Art. 20 DSGVO).
                  </strong>
                </li>
                <li>
                  <strong>
                    Widerrufsrecht für erteilte Einwilligungen (Art. 7 Abs. 3
                    DSGVO).
                  </strong>
                </li>
                <li>
                  <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie haben
                  das Recht, aus Gründen Ihrer besonderen Situation jederzeit
                  gegen die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f
                  DSGVO Widerspruch einzulegen. Widerspruch an:{" "}
                  <a
                    className="text-primary hover:underline"
                    href="mailto:info@sv-bauten.de"
                  >
                    info@sv-bauten.de
                  </a>
                </li>
              </ul>
              <p className="mt-4">
                <strong>
                  Beschwerderecht bei einer Aufsichtsbehörde (Art. 77 DSGVO):
                </strong>
                <br />
                Landesbeauftragte für Datenschutz und Informationsfreiheit
                Nordrhein-Westfalen, Kavalleriestraße 2–4, 40213 Düsseldorf,
                Telefon: 0211 / 38424-0, E-Mail: poststelle@ldi.nrw.de,{" "}
                <a
                  className="text-primary hover:underline"
                  href="https://www.ldi.nrw.de"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  www.ldi.nrw.de
                </a>
              </p>
              <p className="mt-3 text-gray-600 text-sm">
                Bearbeitungsfrist: In der Regel innerhalb von 30 Tagen, bei
                komplexen Fällen bis zu 90 Tage.
              </p>
            </section>

            {/* 16 */}
            <section className="mb-10 scroll-mt-24" id="pflicht">
              <h2 className="mb-4 font-bold text-primary text-xl">
                16. Pflicht zur Bereitstellung personenbezogener Daten
              </h2>
              <p className="mb-4">
                Im Rahmen der Vertragsanbahnung und -durchführung müssen Sie die
                für die Begründung, Durchführung und Beendigung des
                Vertragsverhältnisses erforderlichen personenbezogenen Daten
                bereitstellen (Name, Kontaktdaten, Anschrift, Objekt- und
                Anlagendaten). Ohne diese Daten können wir den Vertrag nicht
                abschließen oder die vereinbarte Leistung nicht erbringen.
              </p>
            </section>

            {/* 17 */}
            <section className="mb-10 scroll-mt-24" id="profiling">
              <h2 className="mb-4 font-bold text-primary text-xl">
                17. Automatisierte Entscheidungsfindung und Profiling
              </h2>
              <p className="mb-4">
                Eine automatisierte Entscheidungsfindung einschließlich
                Profiling im Sinne von Art. 22 DSGVO findet bei uns nicht statt.
                Alle Entscheidungen werden von dem Sachverständigen persönlich
                getroffen.
              </p>
            </section>

            {/* 18 */}
            <section className="mb-10 scroll-mt-24" id="datensicherheit">
              <h2 className="mb-4 font-bold text-primary text-xl">
                18. Datensicherheit
              </h2>
              <p className="mb-2">Technische Maßnahmen:</p>
              <ul className="mb-4 list-disc space-y-1 pl-6">
                <li>SSL/TLS-Verschlüsselung der gesamten Website</li>
                <li>
                  Regelmäßige Sicherheitsupdates, Firewall- und
                  Intrusion-Detection-Systeme
                </li>
                <li>
                  Sichere Passwortrichtlinien und Zwei-Faktor-Authentifizierung
                </li>
                <li>Regelmäßige verschlüsselte Backups</li>
              </ul>
              <p className="mb-2">Organisatorische Maßnahmen:</p>
              <ul className="mb-4 list-disc space-y-1 pl-6">
                <li>Zugriffsbeschränkungen nach dem Need-to-Know-Prinzip</li>
                <li>Vertraulichkeitsverpflichtungen</li>
                <li>
                  Sichere physische Aufbewahrung von Dokumenten und
                  Gutachtenakten
                </li>
                <li>
                  Abschluss von Auftragsverarbeitungsverträgen mit allen
                  Dienstleistern
                </li>
              </ul>
            </section>

            {/* 19 */}
            <section className="mb-10 scroll-mt-24" id="aktualitaet">
              <h2 className="mb-4 font-bold text-primary text-xl">
                19. Aktualität und Änderungen dieser Datenschutzerklärung
              </h2>
              <p>
                Diese Datenschutzerklärung hat den Stand vom{" "}
                <strong>13.03.2026</strong>. Wir passen sie an, wenn sich unsere
                Datenverarbeitungsprozesse oder die Rechtslage ändern. Die
                aktuelle Fassung ist jederzeit unter sv-bauten.de/datenschutz
                abrufbar. Bei wesentlichen Änderungen informieren wir Sie
                gesondert.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
