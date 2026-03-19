import { createFileRoute } from "@tanstack/react-router";
import Footer from "../../components/footer";
import Header from "../../components/header";

export const Route = createFileRoute("/agb/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header />
      <main className="container mx-auto max-w-6xl px-5 py-16">
        <h1 className="mb-2 font-bold text-3xl">
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>
        <p className="mb-2 text-gray-600">
          für Sachverständigenleistungen im Bereich Photovoltaikanlagen
        </p>
        <p className="mb-2 text-gray-600">
          Andreas Bauten – Sachverständiger für Photovoltaikanlagen
        </p>
        <p className="mb-10 text-gray-500 text-sm">Stand: 12.03.2025</p>

        <div className="relative lg:flex lg:items-start lg:gap-10">
          <aside className="top-24 mb-10 lg:sticky lg:order-2 lg:mb-0 lg:w-64 lg:shrink-0">
            <nav className="rounded-lg border border-gray-200 bg-gray-50 p-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto">
              <h2 className="mb-3 font-semibold text-gray-500 text-sm uppercase tracking-wide">
                Inhaltsverzeichnis
              </h2>
              <ol className="list-decimal space-y-1 pl-4 text-sm">
                <li>
                  <a className="text-[#2563EB] hover:underline" href="#par1">
                    § 1 Geltungsbereich und Vertragspartner
                  </a>
                </li>
                <li>
                  <a className="text-[#2563EB] hover:underline" href="#par2">
                    § 2 Vertragsgegenstand und Art der Leistung
                  </a>
                </li>
                <li>
                  <a className="text-[#2563EB] hover:underline" href="#par3">
                    § 3 Vertragsschluss
                  </a>
                </li>
                <li>
                  <a className="text-[#2563EB] hover:underline" href="#par4">
                    § 4 Mitwirkungspflichten des Auftraggebers
                  </a>
                </li>
                <li>
                  <a className="text-[#2563EB] hover:underline" href="#par5">
                    § 5 Termine und Fristen
                  </a>
                </li>
                <li>
                  <a className="text-[#2563EB] hover:underline" href="#par6">
                    § 6 Vergütung und Zahlungsbedingungen
                  </a>
                </li>
                <li>
                  <a className="text-[#2563EB] hover:underline" href="#par7">
                    § 7 Gutachten, Berichte und Urheberrecht
                  </a>
                </li>
                <li>
                  <a className="text-[#2563EB] hover:underline" href="#par8">
                    § 8 Gewährleistung und Haftung
                  </a>
                </li>
                <li>
                  <a className="text-[#2563EB] hover:underline" href="#par9">
                    § 9 Vertraulichkeit und Datenschutz
                  </a>
                </li>
                <li>
                  <a className="text-[#2563EB] hover:underline" href="#par10">
                    § 10 Widerrufsrecht für Verbraucher
                  </a>
                </li>
                <li>
                  <a className="text-[#2563EB] hover:underline" href="#par11">
                    § 11 Eigentumsvorbehalt und Zurückbehaltungsrecht
                  </a>
                </li>
                <li>
                  <a className="text-[#2563EB] hover:underline" href="#par12">
                    § 12 Vertragslaufzeit und Kündigung
                  </a>
                </li>
                <li>
                  <a className="text-[#2563EB] hover:underline" href="#par13">
                    § 13 Schlussbestimmungen
                  </a>
                </li>
              </ol>
            </nav>
          </aside>
          <div className="min-w-0 flex-1 lg:order-1">
            {/* §1 */}
            <section className="mb-10 scroll-mt-24" id="par1">
              <h2 className="mb-4 font-bold text-[#2563EB] text-xl">
                § 1 Geltungsbereich und Vertragspartner
              </h2>

              <h3 className="mb-2 font-semibold">1.1 Anwendungsbereich</h3>
              <p className="mb-4">
                Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB")
                gelten für alle Verträge zwischen Andreas Bauten, zertifizierter
                Sachverständiger für Photovoltaikanlagen nach ISO/IEC 17024
                (nachfolgend „Sachverständiger" oder „wir"), und seinen
                Auftraggebern (nachfolgend „Auftraggeber" oder „Sie") über die
                Erbringung von Sachverständigenleistungen.
              </p>

              <h3 className="mb-2 font-semibold">1.2 Vertragspartner</h3>
              <address className="mb-4 not-italic">
                <strong>Andreas Bauten</strong>
                <br />
                Sachverständiger für Photovoltaikanlagen
                <br />
                Zertifiziert nach ISO/IEC 17024 durch European Certification CYF
                (EUcert)
                <br />
                Banker-Feld-Straße 1, 52072 Aachen, Deutschland
                <br />
                E-Mail: info@sv-bauten.de
                <br />
                Telefon: +49-1567-979-0851
              </address>

              <h3 className="mb-2 font-semibold">1.3 Leistungsumfang</h3>
              <p className="mb-2">
                Unsere Dienstleistungen umfassen insbesondere:
              </p>
              <ul className="mb-4 list-disc space-y-1 pl-6">
                <li>
                  Erstellung von technischen Gutachten und
                  Sachverständigenberichten
                </li>
                <li>
                  Beratungsleistungen zu Photovoltaikanlagen und
                  Batteriespeichersystemen
                </li>
                <li>Anlagenabnahmen und technische Prüfungen</li>
                <li>Technischer Support und Fehleranalyse</li>
              </ul>

              <h3 className="mb-2 font-semibold">1.4 Geltung dieser AGB</h3>
              <p className="mb-4">
                Diese AGB gelten ausschließlich. Abweichende, entgegenstehende
                oder ergänzende AGB des Auftraggebers werden nur dann
                Vertragsbestandteil, wenn wir ihrer Geltung ausdrücklich in
                Textform (§ 126b BGB) zugestimmt haben.
              </p>

              <h3 className="mb-2 font-semibold">
                1.5 Verbraucher und Unternehmer
              </h3>
              <p className="mb-4">
                Diese AGB gelten sowohl für Verträge mit Verbrauchern (§ 13 BGB)
                als auch mit Unternehmern (§ 14 BGB). Soweit einzelne Regelungen
                nur für eine der beiden Gruppen gelten, wird dies explizit
                gekennzeichnet.
              </p>
            </section>

            {/* §2 */}
            <section className="mb-10 scroll-mt-24" id="par2">
              <h2 className="mb-4 font-bold text-[#2563EB] text-xl">
                § 2 Vertragsgegenstand und Art der Leistung
              </h2>

              <h3 className="mb-2 font-semibold">
                2.1 Leistungsarten und Vergütung
              </h3>
              <p className="mb-3">
                Je nach Auftrag erbringen wir folgende Leistungsarten:
              </p>

              <h4 className="mb-1 font-medium">
                (a) Gutachten und Abnahmen (Werkvertrag nach §§ 631–651 BGB)
              </h4>
              <p className="mb-3">
                Geschuldet ist die Erstellung des Werkes (Gutachten,
                Prüfbericht, Stellungnahme) nach den anerkannten Regeln der
                Technik und unter Beachtung der ISO/IEC 17024-Standards. Die
                Vergütung erfolgt als Pauschalhonorar oder Zeithonorar. Es
                gelten die werkvertraglichen Gewährleistungsrechte (§ 9.1).
              </p>

              <h4 className="mb-1 font-medium">
                (b) Beratung und technischer Support (Dienstvertrag nach §§
                611–630 BGB)
              </h4>
              <p className="mb-4">
                Geschuldet ist die qualifizierte Beratung bzw. Unterstützung,
                nicht jedoch ein bestimmter wirtschaftlicher oder technischer
                Erfolg. Die Vergütung erfolgt in der Regel nach Zeithonorar.
                Eine Erfolgshaftung besteht nicht.
              </p>

              <h3 className="mb-2 font-semibold">2.2 Unabhängigkeit</h3>
              <p className="mb-4">
                Der Sachverständige erbringt seine Leistungen unparteiisch,
                unabhängig und weisungsfrei entsprechend seiner Zertifizierung
                nach ISO/IEC 17024. Er ist berechtigt, Aufträge abzulehnen, die
                seine Unabhängigkeit gefährden könnten.
              </p>

              <h3 className="mb-2 font-semibold">2.3 Leistungsumfang</h3>
              <p className="mb-4">
                Der konkrete Leistungsumfang ergibt sich aus der
                Auftragsbestätigung, dem Angebot oder der individuellen
                Vereinbarung. Mündliche Nebenabreden bedürfen zu ihrer
                Wirksamkeit der schriftlichen Bestätigung.
              </p>
            </section>

            {/* §3 */}
            <section className="mb-10 scroll-mt-24" id="par3">
              <h2 className="mb-4 font-bold text-[#2563EB] text-xl">
                § 3 Vertragsschluss
              </h2>

              <h3 className="mb-2 font-semibold">3.1 Angebot und Annahme</h3>
              <p className="mb-2">
                Unsere Angebote sind freibleibend und unverbindlich, sofern sie
                nicht ausdrücklich als verbindlich gekennzeichnet sind. Ein
                Vertrag kommt zustande durch:
              </p>
              <ul className="mb-4 list-disc space-y-1 pl-6">
                <li>
                  Unsere schriftliche Auftragsbestätigung nach Anfrage des
                  Auftraggebers
                </li>
                <li>Unterzeichnung eines separaten Sachverständigenvertrags</li>
              </ul>

              <h3 className="mb-2 font-semibold">3.2 Online-Buchungen</h3>
              <p className="mb-2">
                Über auf unserer Website eingebundene Online-Buchungssysteme
                (z.B. Cal.eu) können ausschließlich Terminanfragen gestellt
                werden; ein Vertragsschluss über eine Sachverständigenleistung
                ist über diese Systeme nicht möglich.
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6">
                <li>
                  <strong>(a) Kostenlose Erstgespräche:</strong> Kostenfrei und
                  unverbindlich. Kein Vertragsschluss.
                </li>
                <li>
                  <strong>
                    (b) Terminbuchungen im Rahmen bestehender Aufträge:
                  </strong>{" "}
                  Dienen ausschließlich der terminlichen Koordination.
                </li>
                <li>
                  <strong>(c) Automatische Systemnachrichten:</strong> Keine
                  Auftragsbestätigung im Sinne des § 3.1.
                </li>
              </ul>

              <h3 className="mb-2 font-semibold">3.3 Vertragsänderungen</h3>
              <p className="mb-4">
                Nachträgliche Änderungen oder Erweiterungen des Auftrags
                bedürfen der Textform (§ 126b BGB; z.B. E-Mail). Bei
                wesentlichen Auftragsänderungen, die einen Mehraufwand von
                voraussichtlich mehr als 20 % der ursprünglichen Kostenschätzung
                verursachen, erstellen wir vorab eine neue Kostenschätzung. Ohne
                Zustimmung des Auftraggebers erfolgen keine kostenpflichtigen
                Zusatzleistungen.
              </p>

              <h3 className="mb-2 font-semibold">3.4 Vollmacht</h3>
              <p className="mb-4">
                Bei Aufträgen durch Unternehmen versichert der Auftraggeber, zur
                Auftragserteilung berechtigt zu sein. Bei fehlender
                Vertretungsmacht haftet die handelnde Person persönlich gemäß §
                179 BGB.
              </p>
            </section>

            {/* §4 */}
            <section className="mb-10 scroll-mt-24" id="par4">
              <h2 className="mb-4 font-bold text-[#2563EB] text-xl">
                § 4 Mitwirkungspflichten des Auftraggebers
              </h2>

              <h3 className="mb-2 font-semibold">
                4.1 Allgemeine Mitwirkungspflichten
              </h3>
              <p className="mb-2">Der Auftraggeber ist verpflichtet:</p>
              <ul className="mb-4 list-disc space-y-1 pl-6">
                <li>
                  Alle erforderlichen Informationen, Unterlagen und Daten
                  vollständig, richtig und rechtzeitig zur Verfügung zu stellen.
                </li>
                <li>
                  Zugang zu den zu begutachtenden Anlagen zu gewähren und für
                  sichere Arbeitsbedingungen zu sorgen.
                </li>
                <li>
                  Erforderliche Genehmigungen von Dritten (z.B. Eigentümern,
                  Netzbetreibern) einzuholen.
                </li>
                <li>
                  Bei Vor-Ort-Terminen anwesend zu sein oder einen sachkundigen
                  Vertreter zu benennen.
                </li>
              </ul>

              <h3 className="mb-2 font-semibold">4.2 Spezielle Unterlagen</h3>
              <p className="mb-2">Insbesondere sind bereitzustellen:</p>
              <ul className="mb-4 list-disc space-y-1 pl-6">
                <li>
                  Anlagendokumentation (Pläne, Schaltbilder, Datenblätter)
                </li>
                <li>Frühere Gutachten, Prüfberichte oder Mängelanzeigen</li>
                <li>
                  Informationen zu Anlagenhistorie und bekannten Problemen
                </li>
                <li>Kontaktdaten relevanter Ansprechpartner</li>
              </ul>

              <h3 className="mb-2 font-semibold">
                4.3 Folgen fehlender Mitwirkung
              </h3>
              <p className="mb-2">
                Kommt der Auftraggeber seinen Mitwirkungspflichten nicht nach:
              </p>
              <ul className="mb-4 list-disc space-y-1 pl-6">
                <li>Verlängern sich vereinbarte Fristen angemessen.</li>
                <li>
                  Können wir Mehraufwendungen nach dem Zeithonorar gem. § 6.2
                  Abs. b gesondert berechnen.
                </li>
                <li>
                  Sind wir berechtigt, die Leistung zu verweigern oder den
                  Vertrag außerordentlich zu kündigen (§ 13.2).
                </li>
              </ul>

              <h3 className="mb-2 font-semibold">
                4.4 Gewährleistung der Berechtigung
              </h3>
              <p className="mb-4">
                Der Auftraggeber versichert, dass er befugt ist, uns Zugang zu
                Anlagen und Daten zu gewähren und keine Rechte Dritter
                entgegenstehen.
              </p>
            </section>

            {/* §5 */}
            <section className="mb-10 scroll-mt-24" id="par5">
              <h2 className="mb-4 font-bold text-[#2563EB] text-xl">
                § 5 Termine und Fristen
              </h2>

              <h3 className="mb-2 font-semibold">5.1 Verbindlichkeit</h3>
              <p className="mb-4">
                Termine und Fristen sind nur dann verbindlich, wenn sie von uns
                ausdrücklich schriftlich als „verbindlich" bestätigt wurden.
                Ansonsten gelten sie als unverbindliche Schätzungen.
              </p>

              <h3 className="mb-2 font-semibold">5.2 Terminverschiebungen</h3>
              <p className="mb-3">
                Terminverschiebungen durch den Auftraggeber sind bis spätestens
                48 Stunden vor dem vereinbarten Termin kostenfrei möglich. Bei
                kurzfristigeren Absagen (weniger als 48 Stunden vor Termin) oder
                Nichterscheinen können wir eine Ausfallpauschale berechnen:
              </p>
              <div className="mb-4 overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-200 px-4 py-2 text-left">
                        Vergütungsform
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-left">
                        Ausfallpauschale
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">
                        Pauschalhonorar
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        50 % des vereinbarten Pauschalpreises
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">
                        Zeithonorar
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        50 % der geplanten Arbeitszeit (mind. 2 Stunden) zum
                        Stundensatz gem. § 6.2 Abs. b
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mb-4">
                Dem Auftraggeber bleibt der Nachweis vorbehalten, dass ein
                Schaden überhaupt nicht entstanden oder wesentlich niedriger als
                die Ausfallpauschale ist. Zusätzlich werden bereits angefallene
                oder nicht mehr stornierbare Reisekosten nach § 6.4 in Rechnung
                gestellt.
              </p>

              <h3 className="mb-2 font-semibold">5.3 Höhere Gewalt</h3>
              <p className="mb-4">
                Verzögerungen durch höhere Gewalt, extreme Witterung, Krankheit,
                behördliche Anordnungen oder andere außerhalb unseres
                Einflussbereichs liegende Umstände verlängern vereinbarte
                Fristen angemessen. Dauert der Zustand länger als sechs Wochen
                an, sind beide Parteien berechtigt, den Vertrag in Textform zu
                kündigen.
              </p>

              <h3 className="mb-2 font-semibold">5.4 Leistungsverzug</h3>
              <p className="mb-4">
                Geraten wir mit der Leistungserbringung in Verzug, kann der
                Auftraggeber uns eine angemessene Nachfrist von mindestens 14
                Tagen setzen. Erst nach erfolglosem Ablauf dieser Frist können
                weitere Rechte geltend gemacht werden.
              </p>
            </section>

            {/* §6 */}
            <section className="mb-10 scroll-mt-24" id="par6">
              <h2 className="mb-4 font-bold text-[#2563EB] text-xl">
                § 6 Vergütung und Zahlungsbedingungen
              </h2>

              <h3 className="mb-2 font-semibold">
                6.1 Honorar und Preisgrundlage
              </h3>
              <p className="mb-4">
                Die Vergütung richtet sich nach der individuellen
                Auftragsvereinbarung. Alle Preise verstehen sich in Euro zzgl.
                der gesetzlichen Umsatzsteuer (derzeit 19 %), sofern diese
                anfällt. Die konkrete Vergütungshöhe wird vor Vertragsschluss
                transparent mitgeteilt.
              </p>

              <h3 className="mb-2 font-semibold">6.2 Vergütungsformen</h3>
              <h4 className="mb-1 font-medium">
                (a) Pauschalhonorar (Festpreis)
              </h4>
              <p className="mb-3">
                Für klar definierte Standard-Leistungen bieten wir
                Pauschalpreise an, die den gesamten Leistungsumfang abdecken
                (Arbeitszeiten, Dokumentation, Standardausstattung). Reisekosten
                werden, soweit nicht ausdrücklich inkludiert, gesondert nach §
                6.4 abgerechnet.
              </p>
              <h4 className="mb-1 font-medium">
                (b) Zeithonorar (Stundensatz)
              </h4>
              <p className="mb-1">
                Stundensatz (Inland, Deutschland):{" "}
                <strong>165,00 EUR/Std. (netto)</strong>
              </p>
              <p className="mb-3">
                Abrechnungstakt: 6-Minuten-Intervalle (0,1 Stunden). Angefangene
                Intervalle werden aufgerundet.
              </p>
              <h4 className="mb-1 font-medium">(c) Kombinierte Vergütung</h4>
              <p className="mb-4">
                Bei bestimmten Aufträgen kann eine Kombination aus Grundhonorar
                und Zeithonorar vereinbart werden.
              </p>

              <h3 className="mb-2 font-semibold">
                6.3 Erhöhte Sätze für Auslandseinsätze
              </h3>
              <div className="mb-4 overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-200 px-4 py-2 text-left">
                        Einsatzort
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-left">
                        Stundensatz (netto)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">
                        EU-Ausland
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        220,00 EUR/Std.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">
                        Nicht-EU-Ausland
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        260,00 EUR/Std.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="mb-2 font-semibold">6.4 Reisekosten</h3>
              <p className="mb-2">
                Soweit Reisekosten nicht im Pauschalhonorar inkludiert sind,
                werden sie gesondert abgerechnet:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6">
                <li>
                  <strong>PKW:</strong> Kilometerpauschale 0,75 EUR/km (Hin- und
                  Rückfahrt)
                </li>
                <li>
                  <strong>Bahn:</strong> 2. Klasse nach tatsächlichen Kosten; 1.
                  Klasse zulässig ab 300 km einfacher Entfernung oder mehr als 3
                  Stunden Fahrtzeit
                </li>
                <li>
                  <strong>Flug:</strong> Economy-Klasse ab 500 km einfacher
                  Entfernung
                </li>
                <li>
                  <strong>Reisezeit:</strong> 95,00 EUR/Std. (netto),
                  6-Minuten-Takt
                </li>
                <li>
                  <strong>Übernachtung:</strong> Pauschale 140,00 EUR/Nacht
                  inkl. Frühstück
                </li>
                <li>
                  <strong>Verpflegungsmehraufwand:</strong> 14,00 EUR/Tag (ab 8h
                  Abwesenheit), 28,00 EUR/Tag (24h)
                </li>
              </ul>

              <h3 className="mb-2 font-semibold">
                6.5 Weitere Auslagen und Nebenkosten
              </h3>
              <p className="mb-4">
                Über das Honorar und die Reisekosten hinaus werden nur
                außergewöhnliche Auslagen gesondert berechnet (spezielle
                Messgeräte, externe Fremdleistungen, Normen über 100 EUR,
                projektspezifische Software) – ausschließlich nach vorheriger
                Abstimmung und Freigabe in Textform.
              </p>

              <h3 className="mb-2 font-semibold">
                6.6 Im Honorar enthaltene Leistungen
              </h3>
              <p className="mb-2">
                Folgende Kosten sind bereits im Stundensatz bzw. Pauschalhonorar
                enthalten und nicht zusätzlich abrechenbar:
              </p>
              <ul className="mb-4 list-disc space-y-1 pl-6">
                <li>Standard-Software-Lizenzen</li>
                <li>
                  Standard-Betriebskosten (Telefon, Internet, Strom, Heizung,
                  Miete)
                </li>
                <li>
                  Eigene Standard-Messgeräte (Multimeter, IR-Thermometer,
                  Isolationsmessgerät bis 1 kV, Stromzange, Datenlogger)
                </li>
                <li>
                  Standarddokumentation (bis 50 Seiten S/W, 1 Exemplar + 1 PDF,
                  bis 10 Fotos)
                </li>
                <li>Versicherungen (Berufshaftpflicht, Rechtsschutz, Kfz)</li>
                <li>Fortbildungskosten und Zertifizierungsgebühren</li>
                <li>
                  Normenzugang (Beuth-Flatrate, VDE-Vorschriftenwerk Basis)
                </li>
              </ul>

              <h3 className="mb-2 font-semibold">
                6.7 Kostenschätzung und Kostenüberschreitung
              </h3>
              <p className="mb-4">
                Bei Zeithonorar-Aufträgen geben wir auf Wunsch eine
                unverbindliche Kostenschätzung ab. Zeichnet sich ab, dass die
                geschätzte Arbeitszeit um mehr als 20 % überschritten wird,
                informieren wir den Auftraggeber unverzüglich und holen eine
                Freigabe für die Fortführung ein.
              </p>

              <h3 className="mb-2 font-semibold">6.8 Abschlagszahlungen</h3>
              <p className="mb-4">
                Bei Aufträgen über 2.500 EUR (netto) oder mit einer
                Vertragsdauer von mehr als einem Monat sind wir berechtigt,
                Abschlagszahlungen nach Leistungsfortschritt zu verlangen.
              </p>

              <h3 className="mb-2 font-semibold">6.9 Zahlungsbedingungen</h3>
              <p className="mb-2">
                Rechnungen sind innerhalb von 14 Tagen nach Rechnungsdatum
                fällig. Für Verbraucher beträgt die Zahlungsfrist 30 Tage ab
                Rechnungszugang.
              </p>
              <p className="mb-2">
                Zahlung ausschließlich per Banküberweisung.
              </p>
              <p className="mb-4">
                Bei Zahlungsverzug: Verzugszinsen von 9 Prozentpunkten über dem
                Basiszinssatz (Unternehmer) bzw. 5 Prozentpunkten (Verbraucher)
                über dem Basiszinssatz der EZB.
              </p>

              <h3 className="mb-2 font-semibold">
                6.10 Zurückbehaltung und Aufrechnung
              </h3>
              <p className="mb-4">
                Ein Zurückbehaltungsrecht des Auftraggebers besteht nur bei
                unbestrittenen oder rechtskräftig festgestellten Gegenansprüchen
                aus demselben Vertragsverhältnis. Aufrechnung nur mit
                unbestrittenen oder rechtskräftig festgestellten Forderungen.
              </p>

              <h3 className="mb-2 font-semibold">
                6.11 Preisanpassungsklausel (für Dauerverträge)
              </h3>
              <p className="mb-4">
                Bei Verträgen mit einer Laufzeit von mehr als 12 Monaten
                behalten wir uns vor, die Vergütung jährlich an den
                Verbraucherpreisindex des Statistischen Bundesamtes anzupassen
                (max. 10 % p.a.). Anpassungen werden mindestens 6 Wochen vor
                Inkrafttreten mitgeteilt. Bei einer Erhöhung von mehr als 5 %
                besteht ein Sonderkündigungsrecht.
              </p>
            </section>

            {/* §7 */}
            <section className="mb-10 scroll-mt-24" id="par7">
              <h2 className="mb-4 font-bold text-[#2563EB] text-xl">
                § 7 Gutachten, Berichte und Urheberrecht
              </h2>

              <h3 className="mb-2 font-semibold">7.1 Gutachteninhalt</h3>
              <p className="mb-4">
                Gutachten und Berichte werden nach bestem Wissen und Gewissen
                unter Beachtung der anerkannten Regeln der Technik und der
                ISO/IEC 17024-Standards erstellt. Sie basieren auf den zum
                Zeitpunkt der Erstellung verfügbaren Informationen.
              </p>

              <h3 className="mb-2 font-semibold">7.2 Gutachtenbasis</h3>
              <p className="mb-2">Das Gutachten basiert auf:</p>
              <ul className="mb-4 list-disc space-y-1 pl-6">
                <li>
                  Den vom Auftraggeber bereitgestellten Informationen und
                  Unterlagen
                </li>
                <li>
                  Stichprobenartigen und zerstörungsfreien Prüfungen (sofern
                  nicht anders vereinbart)
                </li>
                <li>
                  Den bei der Vor-Ort-Besichtigung getroffenen Feststellungen
                </li>
                <li>
                  Den zum Zeitpunkt der Erstellung verfügbaren technischen
                  Normen
                </li>
              </ul>

              <h3 className="mb-2 font-semibold">7.3 Urheberrecht</h3>
              <p className="mb-4">
                Alle Gutachten, Berichte, Präsentationen und sonstigen
                Arbeitsergebnisse sind urheberrechtlich geschützt. Das
                Urheberrecht verbleibt beim Sachverständigen.
              </p>

              <h3 className="mb-2 font-semibold">7.4 Nutzungsrechte</h3>
              <p className="mb-4">
                Der Auftraggeber erhält mit vollständiger Zahlung der Vergütung
                das einfache, nicht übertragbare Recht zur Nutzung der
                Arbeitsergebnisse für den vertraglich vorausgesetzten Zweck.
              </p>

              <h3 className="mb-2 font-semibold">
                7.5 Verwendungsbeschränkungen
              </h3>
              <p className="mb-4">
                Eine Veröffentlichung, Vervielfältigung oder Weitergabe an
                Dritte (ausgenommen Behörden, Gerichte, Versicherungen oder
                Kreditinstitute, sofern dies dem vertraglich vorausgesetzten
                Zweck entspricht) sowie eine inhaltliche Bearbeitung oder
                Änderung bedarf unserer vorherigen Zustimmung in Textform.
              </p>

              <h3 className="mb-2 font-semibold">
                7.6 Gültigkeit und Aktualität
              </h3>
              <p className="mb-4">
                Gutachten gelten zum Zeitpunkt ihrer Erstellung. Wir übernehmen
                keine Haftung für die Aktualität nach Übergabe.
              </p>
            </section>

            {/* §8 */}
            <section className="mb-10 scroll-mt-24" id="par8">
              <h2 className="mb-4 font-bold text-[#2563EB] text-xl">
                § 8 Gewährleistung und Haftung
              </h2>

              <h3 className="mb-2 font-semibold">
                8.1 Gewährleistung bei Werkverträgen
              </h3>
              <p className="mb-2">
                Bei Gutachten und Prüfberichten gewährleisten wir, dass unsere
                Leistungen zum Zeitpunkt der Abnahme den anerkannten Regeln der
                Technik entsprechen. Verjährung:
              </p>
              <ul className="mb-4 list-disc space-y-1 pl-6">
                <li>
                  <strong>Bei Unternehmern:</strong> 12 Monate ab Abnahme (gilt
                  nicht bei Vorsatz oder grober Fahrlässigkeit).
                </li>
                <li>
                  <strong>Bei Verbrauchern:</strong> Gesetzliche
                  Gewährleistungsrechte (2 Jahre ab Abnahme).
                </li>
              </ul>

              <h3 className="mb-2 font-semibold">8.2 Haftung</h3>
              <p className="mb-2">
                <strong>Unbeschränkte Haftung:</strong> Wir haften unbeschränkt
                für Schäden aus der Verletzung des Lebens, des Körpers oder der
                Gesundheit sowie für Schäden, die auf Vorsatz oder grober
                Fahrlässigkeit beruhen.
              </p>
              <p className="mb-2">
                <strong>Beschränkte Haftung:</strong> Bei leicht fahrlässiger
                Verletzung wesentlicher Vertragspflichten (Kardinalpflichten)
                ist unsere Haftung auf den vertragstypischen, vorhersehbaren
                Schaden begrenzt.
              </p>
              <p className="mb-4">
                <strong>Haftungsausschluss:</strong> Im Übrigen ist die Haftung
                für leichte Fahrlässigkeit ausgeschlossen.
              </p>

              <h3 className="mb-2 font-semibold">8.3 Haftungshöchstbetrag</h3>
              <p className="mb-4">
                Die Haftung für Vermögensschäden bei leicht fahrlässiger
                Verletzung wesentlicher Vertragspflichten ist begrenzt auf das
                Dreifache des Auftragswerts, mindestens jedoch 10.000 EUR,
                maximal 50.000 EUR je Schadensfall.
              </p>

              <h3 className="mb-2 font-semibold">
                8.4 Berufshaftpflichtversicherung
              </h3>
              <p className="mb-4">
                Wir unterhalten eine Berufshaftpflichtversicherung mit
                angemessenen Deckungssummen. Details können auf Anfrage
                mitgeteilt werden.
              </p>

              <h3 className="mb-2 font-semibold">
                8.5 Haftungsausschluss für Fremddaten
              </h3>
              <p className="mb-4">
                Wir haften nicht für Mängel, die auf fehlerhaften oder
                unvollständigen Informationen des Auftraggebers oder Dritter
                beruhen, sofern wir diese nicht grob fahrlässig ungeprüft
                übernommen haben.
              </p>
            </section>

            {/* §9 */}
            <section className="mb-10 scroll-mt-24" id="par9">
              <h2 className="mb-4 font-bold text-[#2563EB] text-xl">
                § 9 Vertraulichkeit und Datenschutz
              </h2>

              <h3 className="mb-2 font-semibold">
                9.1 Verschwiegenheitspflicht
              </h3>
              <p className="mb-4">
                Wir verpflichten uns zur Einhaltung der beruflichen
                Verschwiegenheit gemäß ISO/IEC 17024. Alle erlangten
                Informationen werden vertraulich behandelt und nicht an Dritte
                weitergegeben, sofern keine gesetzliche Offenbarungspflicht
                besteht oder der Auftraggeber in Textform eingewilligt hat.
              </p>

              <h3 className="mb-2 font-semibold">9.2 Datenschutz</h3>
              <p className="mb-4">
                Die Verarbeitung personenbezogener Daten erfolgt ausschließlich
                nach Maßgabe der DSGVO und des BDSG. Die vollständigen
                Informationen finden Sie in unserer{" "}
                <a
                  className="text-[#2563EB] hover:underline"
                  href="/datenschutz"
                >
                  Datenschutzerklärung
                </a>
                .
              </p>

              <h3 className="mb-2 font-semibold">
                9.3 Datenweitergabe bei Einschaltung Dritter
              </h3>
              <p className="mb-4">
                Soweit zur vertragsgemäßen Leistungserbringung die Einschaltung
                externer Dritter erforderlich ist, kann eine Weitergabe
                auftragsbezogener Daten an diese Dritten erfolgen (beschränkt
                auf das Erforderliche).
              </p>

              <h3 className="mb-2 font-semibold">
                9.4 Mitwirkungspflichten im Datenschutz
              </h3>
              <p className="mb-4">
                Bei Vor-Ort-Terminen, bei denen personenbezogene Daten Dritter
                betroffen sein können, obliegt es dem Auftraggeber, die
                betroffenen Personen vorab zu informieren.
              </p>

              <h3 className="mb-2 font-semibold">
                9.5 Vertraulichkeitspflicht des Auftraggebers
              </h3>
              <p className="mb-4">
                Der Auftraggeber verpflichtet sich, unsere Arbeitsmethoden,
                interne Prozesse, Kalkulationsgrundlagen und
                Geschäftsgeheimnisse im Sinne des GeschGehG vertraulich zu
                behandeln. Diese Pflicht besteht auch nach Beendigung des
                Vertragsverhältnisses fort.
              </p>
            </section>

            {/* §10 */}
            <section className="mb-10 scroll-mt-24" id="par10">
              <h2 className="mb-4 font-bold text-[#2563EB] text-xl">
                § 10 Widerrufsrecht für Verbraucher
              </h2>

              <h3 className="mb-2 font-semibold">10.1 Widerrufsrecht</h3>
              <p className="mb-4">
                Verbrauchern steht bei Fernabsatzverträgen (z.B. per E-Mail,
                Telefon oder über die Website) ein gesetzliches Widerrufsrecht
                gemäß §§ 312g, 355 BGB zu.
              </p>

              <h3 className="mb-2 font-semibold">
                10.2 Separate Widerrufsbelehrung
              </h3>
              <p className="mb-4">
                Die detaillierte Widerrufsbelehrung und das
                Muster-Widerrufsformular finden Sie unter{" "}
                <a className="text-[#2563EB] hover:underline" href="/widerruf">
                  sv-bauten.de/widerruf
                </a>{" "}
                oder werden Ihnen bei Vertragsschluss übermittelt.
              </p>

              <h3 className="mb-2 font-semibold">10.3 Vorzeitiges Erlöschen</h3>
              <p className="mb-4">
                Das Widerrufsrecht erlischt bei vollständiger Vertragserfüllung,
                wenn Sie als Verbraucher ausdrücklich zugestimmt haben, dass wir
                vor Ablauf der Widerrufsfrist mit der Leistungserbringung
                beginnen, und Sie Ihre Kenntnis davon bestätigt haben (§ 356
                Abs. 4 BGB).
              </p>
            </section>

            {/* §11 */}
            <section className="mb-10 scroll-mt-24" id="par11">
              <h2 className="mb-4 font-bold text-[#2563EB] text-xl">
                § 11 Eigentumsvorbehalt und Zurückbehaltungsrecht
              </h2>

              <h3 className="mb-2 font-semibold">11.1 Eigentumsvorbehalt</h3>
              <p className="mb-4">
                Alle von uns erstellten Gutachten, Berichte und Unterlagen in
                körperlicher Form bleiben bis zur vollständigen Bezahlung aller
                Forderungen aus dem jeweiligen Vertragsverhältnis unser
                Eigentum.
              </p>

              <h3 className="mb-2 font-semibold">11.2 Zurückbehaltungsrecht</h3>
              <p className="mb-4">
                Bis zur vollständigen Bezahlung aller fälligen Forderungen sind
                wir berechtigt, die Herausgabe von Gutachten, Berichten und
                Unterlagen zu verweigern (§ 273 BGB). Dies gilt insbesondere bei
                Zahlungsverzug von mehr als 30 Tagen.
              </p>
            </section>

            {/* §12 */}
            <section className="mb-10 scroll-mt-24" id="par12">
              <h2 className="mb-4 font-bold text-[#2563EB] text-xl">
                § 12 Vertragslaufzeit und Kündigung
              </h2>

              <h3 className="mb-2 font-semibold">12.1 Vertragslaufzeit</h3>
              <p className="mb-4">
                Der Vertrag beginnt mit Vertragsschluss und endet mit
                vollständiger Erfüllung der vereinbarten Leistungen, sofern
                nicht eine abweichende Laufzeit individuell vereinbart wurde.
              </p>

              <h3 className="mb-2 font-semibold">
                12.2 Außerordentliche Kündigung
              </h3>
              <p className="mb-2">
                Beide Parteien können den Vertrag aus wichtigem Grund
                außerordentlich kündigen, insbesondere bei:
              </p>
              <ul className="mb-4 list-disc space-y-1 pl-6">
                <li>
                  Wesentlicher Verletzung vertraglicher Pflichten trotz
                  Abmahnung
                </li>
                <li>Zahlungsverzug von mehr als 30 Tagen trotz Mahnung</li>
                <li>
                  Eröffnung eines Insolvenzverfahrens über das Vermögen der
                  anderen Partei
                </li>
              </ul>

              <h3 className="mb-2 font-semibold">12.3 Folgen der Kündigung</h3>
              <ul className="mb-4 list-disc space-y-2 pl-6">
                <li>
                  <strong>
                    (a) Kündigung durch den Auftraggeber ohne wichtigen Grund:
                  </strong>{" "}
                  Abrechnung der bereits erbrachten Leistungen zzgl.
                  Aufwandsentschädigung von max. 25 % des ursprünglich
                  vereinbarten Honorars.
                </li>
                <li>
                  <strong>(b) Kündigung durch uns ohne wichtigen Grund:</strong>{" "}
                  Rückerstattung bereits gezahlter Vorschüsse für nicht
                  erbrachte Leistungen.
                </li>
                <li>
                  <strong>(c) Kündigung bei wichtigem Grund:</strong> Abrechnung
                  nur der bis zur Kündigung erbrachten Leistungen.
                </li>
              </ul>
            </section>

            {/* §13 */}
            <section className="mb-10 scroll-mt-24" id="par13">
              <h2 className="mb-4 font-bold text-[#2563EB] text-xl">
                § 13 Schlussbestimmungen
              </h2>

              <h3 className="mb-2 font-semibold">13.1 Textformerfordernis</h3>
              <p className="mb-4">
                Änderungen und Ergänzungen dieser AGB sowie des Vertrages
                bedürfen der Textform (§ 126b BGB; E-Mail genügt).
              </p>

              <h3 className="mb-2 font-semibold">13.2 Salvatorische Klausel</h3>
              <p className="mb-4">
                Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise
                unwirksam oder undurchführbar sein, bleibt die Wirksamkeit der
                übrigen Bestimmungen unberührt. Anstelle der unwirksamen
                Bestimmung gelten die gesetzlichen Vorschriften (§ 306 Abs. 2
                BGB).
              </p>

              <h3 className="mb-2 font-semibold">13.3 Anwendbares Recht</h3>
              <p className="mb-4">
                Es gilt ausschließlich das Recht der Bundesrepublik Deutschland
                unter Ausschluss des UN-Kaufrechts (CISG). Für Verbraucher
                bleiben zwingende Verbraucherschutzvorschriften des
                Wohnsitzstaates unberührt (Art. 6 Abs. 2 Rom I-VO).
              </p>

              <h3 className="mb-2 font-semibold">13.4 Gerichtsstand</h3>
              <p className="mb-4">
                Bei Unternehmern: Ausschließlicher Gerichtsstand ist Aachen. Für
                Verbraucher gelten die gesetzlichen Gerichtsstände.
              </p>

              <h3 className="mb-2 font-semibold">13.5 Streitbeilegung</h3>
              <p className="mb-4">
                Wir sind weder verpflichtet noch bereit, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG).
              </p>

              <div className="mt-8 border-gray-200 border-t pt-6">
                <p className="font-semibold">Andreas Bauten</p>
                <p>Sachverständiger für Photovoltaikanlagen</p>
                <p>Banker-Feld-Straße 1, 52072 Aachen</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
