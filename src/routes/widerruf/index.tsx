import { createFileRoute } from "@tanstack/react-router";
import Footer from "../../components/footer";
import Header from "../../components/header";

export const Route = createFileRoute("/widerruf/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header />
      <main className="container mx-auto max-w-6xl px-5 py-16">
        <h1 className="mb-2 font-bold text-3xl">
          Widerrufsrecht für Verbraucher
        </h1>
        <p className="mb-10 text-gray-500 text-sm">Stand: 12.03.2026</p>

        <div className="relative lg:flex lg:items-start lg:gap-10">
          <aside className="sticky top-24 mb-10 lg:order-2 lg:mb-0 lg:w-64 lg:shrink-0">
            <nav className="rounded-lg border border-gray-200 bg-gray-50 p-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto">
              <h2 className="mb-3 font-semibold text-gray-500 text-sm uppercase tracking-wide">
                Inhaltsverzeichnis
              </h2>
              <ol className="list-decimal space-y-1 pl-4 text-sm">
                <li>
                  <a className="text-[#2563EB] hover:underline" href="#geltung">
                    Für wen gilt das Widerrufsrecht?
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#2563EB] hover:underline"
                    href="#belehrung"
                  >
                    Widerrufsbelehrung
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#2563EB] hover:underline"
                    href="#wertersatz"
                  >
                    Erläuterungen zum Wertersatz
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#2563EB] hover:underline"
                    href="#formular"
                  >
                    Muster-Widerrufsformular
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#2563EB] hover:underline"
                    href="#verhaeltnis"
                  >
                    Verhältnis zu unseren AGB
                  </a>
                </li>
                <li>
                  <a className="text-[#2563EB] hover:underline" href="#kontakt">
                    Kontakt bei Fragen
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#2563EB] hover:underline"
                    href="#grundlagen"
                  >
                    Rechtliche Grundlagen
                  </a>
                </li>
              </ol>
            </nav>
          </aside>
          <div className="min-w-0 flex-1 lg:order-1">
            <section className="mb-10 scroll-mt-24" id="geltung">
              <h2 className="mb-4 font-bold text-[#2563EB] text-xl">
                1. Für wen gilt das Widerrufsrecht?
              </h2>
              <p className="mb-4">
                Das nachfolgend dargestellte Widerrufsrecht gilt ausschließlich
                für <strong>Verbraucher</strong> im Sinne des § 13 BGB.
                Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft
                zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen
                noch ihrer selbstständigen beruflichen Tätigkeit zugerechnet
                werden können.
              </p>
              <p className="mb-4">
                <strong>Beispiele:</strong> Privatpersonen, die ein Gutachten
                für ihre private Photovoltaikanlage beauftragen, oder
                Hauseigentümer, die eine Beratung zu ihrem Batteriespeicher
                wünschen.
              </p>
              <p className="mb-4">
                <strong>Kein Widerrufsrecht</strong> haben Unternehmen,
                Gewerbetreibende und Freiberufler (§ 14 BGB), z. B.
                PV-Installationsbetriebe, Projektentwickler oder
                Energieversorger.
              </p>
              <p className="mb-4">
                Das Widerrufsrecht besteht bei Verträgen, die im{" "}
                <strong>Fernabsatz</strong> (per E-Mail, Telefon, Website,
                Messenger) oder <strong>außerhalb von Geschäftsräumen</strong>{" "}
                (z. B. beim Vor-Ort-Termin bei Ihnen zu Hause) geschlossen
                werden (§§ 312b, 312c, 312g BGB). Kein Widerrufsrecht besteht
                bei Verträgen, die in unseren Geschäftsräumen geschlossen
                werden.
              </p>
              <p className="mb-4">
                <strong>Hinweis:</strong> Das Fernabsatzrecht verwendet den
                Begriff „Dienstleistung" im Sinne des europäischen
                Verbraucherrechts. Dieser umfasst alle unsere
                Sachverständigenleistungen, einschließlich der
                Gutachtenerstellung (die nach deutschem Recht als Werkvertrag
                gemäß § 631 BGB eingeordnet wird) und der Beratungsleistungen
                (Dienstvertrag gemäß § 611 BGB).
              </p>
            </section>

            <section className="mb-10 scroll-mt-24" id="belehrung">
              <h2 className="mb-4 font-bold text-[#2563EB] text-xl">
                2. Widerrufsbelehrung
              </h2>
              <p className="mb-4 text-gray-600 text-sm">
                <strong>Hinweis:</strong> Die nachfolgende Widerrufsbelehrung
                entspricht dem gesetzlichen Muster gemäß Anlage 1 zu Art. 246a §
                1 Abs. 2 EGBGB und wird Ihnen bei Vertragsschluss zusätzlich auf
                einem dauerhaften Datenträger (E-Mail mit PDF-Anhang)
                übermittelt.
              </p>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                <h3 className="mb-4 font-bold text-lg">Widerrufsrecht</h3>
                <p className="mb-4">
                  Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von
                  Gründen diesen Vertrag zu widerrufen.
                </p>
                <p className="mb-4">
                  Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des
                  Vertragsabschlusses.
                </p>
                <p className="mb-4">
                  Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
                </p>
                <address className="mb-4 not-italic">
                  <strong>Andreas Bauten</strong>
                  <br />
                  Sachverständiger für Photovoltaikanlagen
                  <br />
                  Banker-Feld-Straße 1<br />
                  52072 Aachen, Deutschland
                  <br />
                  E-Mail:{" "}
                  <a
                    className="text-[#2563EB] hover:underline"
                    href="mailto:info@sv-bauten.de"
                  >
                    info@sv-bauten.de
                  </a>
                  <br />
                  Telefon: +49 1567 979 0851
                </address>
                <p className="mb-4">
                  mittels einer eindeutigen Erklärung (z.B. ein mit der Post
                  versandter Brief oder eine E-Mail) über Ihren Entschluss,
                  diesen Vertrag zu widerrufen, informieren. Sie können dafür
                  das beigefügte Muster-Widerrufsformular verwenden, das jedoch
                  nicht vorgeschrieben ist.
                </p>
                <p className="mb-4">
                  Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die
                  Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf
                  der Widerrufsfrist absenden.
                </p>

                <h3 className="mb-4 font-bold text-lg">Folgen des Widerrufs</h3>
                <p className="mb-4">
                  Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle
                  Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und
                  spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an
                  dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns
                  eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe
                  Zahlungsmittel, das Sie bei der ursprünglichen Transaktion
                  eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich
                  etwas anderes vereinbart; in keinem Fall werden Ihnen wegen
                  dieser Rückzahlung Entgelte berechnet.
                </p>
                <p>
                  Haben Sie verlangt, dass die Dienstleistungen während der
                  Widerrufsfrist beginnen sollen, so haben Sie uns einen
                  angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem
                  Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts
                  hinsichtlich dieses Vertrags unterrichten, bereits erbrachten
                  Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag
                  vorgesehenen Dienstleistungen entspricht.
                </p>
              </div>
            </section>

            <section className="mb-10 scroll-mt-24" id="wertersatz">
              <h2 className="mb-4 font-bold text-[#2563EB] text-xl">
                3. Erläuterungen zum Wertersatz bei vorzeitigem Leistungsbeginn
              </h2>

              <h3 className="mb-2 font-semibold">
                3.1 Wann schulden Sie Wertersatz?
              </h3>
              <p className="mb-4">
                Wenn Sie möchten, dass wir vor Ablauf der 14-tägigen
                Widerrufsfrist mit der Leistung beginnen, benötigen wir von
                Ihnen:
              </p>
              <ol className="mb-4 list-inside list-decimal space-y-2 pl-4">
                <li>
                  Ihre <strong>ausdrückliche Zustimmung</strong>, dass wir vor
                  Ablauf der Widerrufsfrist mit der Leistungserbringung
                  beginnen, und
                </li>
                <li>
                  Ihre <strong>Bestätigung</strong>, dass Sie Kenntnis davon
                  haben, dass Sie bei vollständiger Vertragserfüllung Ihr
                  Widerrufsrecht verlieren.
                </li>
              </ol>
              <p className="mb-6">
                Ohne Ihre Einwilligung beginnen wir grundsätzlich erst nach
                Ablauf der 14-tägigen Widerrufsfrist mit der
                Leistungserbringung.
              </p>

              <h3 className="mb-2 font-semibold">
                3.2 Berechnung des Wertersatzes bei Widerruf nach Teilleistung
              </h3>
              <p className="mb-4">
                Widerrufen Sie den Vertrag, nachdem wir auf Ihr ausdrückliches
                Verlangen bereits mit der Leistung begonnen haben, schulden Sie
                uns einen angemessenen Betrag für die bis zum Widerruf
                erbrachten Teilleistungen:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6">
                <li>
                  <strong>Bei Pauschalhonorar:</strong> Der Wertersatz
                  entspricht dem Anteil der bereits erbrachten Leistung am
                  Gesamtumfang, bezogen auf den vereinbarten Pauschalpreis.
                </li>
                <li>
                  <strong>Bei Zeithonorar:</strong> Der Wertersatz entspricht
                  den tatsächlich geleisteten Stunden zum vereinbarten
                  Stundensatz gemäß Auftragsbestätigung.
                </li>
              </ul>
              <p className="mb-6">
                <strong>Wichtig:</strong> Wurden Sie nicht ordnungsgemäß über
                das Widerrufsrecht belehrt oder haben Sie nicht ausdrücklich
                verlangt, dass wir vor Ablauf der Widerrufsfrist mit der
                Leistung beginnen, schulden Sie keinen Wertersatz (§ 357a Abs. 2
                Satz 2 BGB).
              </p>

              <h3 className="mb-2 font-semibold">
                3.3 Vorzeitiges Erlöschen des Widerrufsrechts
              </h3>
              <p className="mb-4">
                Ihr Widerrufsrecht erlischt vorzeitig, wenn wir die
                Dienstleistung vollständig erbracht haben und Sie zuvor
                ausdrücklich zugestimmt haben, dass wir vor Ablauf der
                Widerrufsfrist mit der Leistungserbringung beginnen, und Ihre
                Kenntnis davon bestätigt haben, dass Sie mit vollständiger
                Vertragserfüllung Ihr Widerrufsrecht verlieren (§ 356 Abs. 4
                BGB).
              </p>
            </section>

            <section className="mb-10 scroll-mt-24" id="formular">
              <h2 className="mb-4 font-bold text-[#2563EB] text-xl">
                4. Muster-Widerrufsformular
              </h2>
              <p className="mb-4 text-gray-600 text-sm">
                Gemäß Anlage 2 zu Art. 246a § 1 Abs. 2 EGBGB. Die Verwendung
                dieses Formulars ist nicht vorgeschrieben.
              </p>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                <p className="mb-4">
                  <strong>An:</strong>
                  <br />
                  Andreas Bauten, Sachverständiger für Photovoltaikanlagen
                  <br />
                  Banker-Feld-Straße 1, 52072 Aachen, Deutschland
                  <br />
                  E-Mail: info@sv-bauten.de
                </p>
                <p className="mb-4">
                  Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*)
                  abgeschlossenen Vertrag über die Erbringung der folgenden
                  Dienstleistung:
                </p>
                <p className="mb-2">___________________________________</p>
                <p className="mb-2">
                  Bestellt am (*) / erhalten am (*): _______________
                </p>
                <p className="mb-2">
                  Name des/der Verbraucher(s): _______________
                </p>
                <p className="mb-2">
                  Anschrift des/der Verbraucher(s): _______________
                </p>
                <p className="mb-2">___________________________________</p>
                <p className="mb-2">
                  Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf
                  Papier): _______________
                </p>
                <p className="mb-2">Datum: _______________</p>
                <p className="mt-4 text-gray-500 text-sm">
                  (*) Unzutreffendes streichen.
                </p>
              </div>
            </section>

            <section className="mb-10 scroll-mt-24" id="verhaeltnis">
              <h2 className="mb-4 font-bold text-[#2563EB] text-xl">
                5. Verhältnis zu unseren AGB
              </h2>
              <p className="mb-4">
                Diese Widerrufsbelehrung ergänzt unsere{" "}
                <a className="text-[#2563EB] hover:underline" href="/agb">
                  Allgemeinen Geschäftsbedingungen (AGB)
                </a>
                , insbesondere § 10 AGB (Widerrufsrecht für Verbraucher), § 2.1
                AGB (Unterscheidung Werk- und Dienstverträge) und § 6 AGB
                (Vergütung und Abrechnung). Bei Widersprüchen gehen die
                gesetzlichen Regelungen zum Widerrufsrecht vor.
              </p>
            </section>

            <section className="mb-10 scroll-mt-24" id="kontakt">
              <h2 className="mb-4 font-bold text-[#2563EB] text-xl">
                6. Kontakt bei Fragen zum Widerrufsrecht
              </h2>
              <address className="not-italic">
                <p className="mb-1">Andreas Bauten</p>
                <p className="mb-1">Sachverständiger für Photovoltaikanlagen</p>
                <p className="mb-1">
                  Banker-Feld-Straße 1, 52072 Aachen, Deutschland
                </p>
                <p className="mb-1">
                  E-Mail:{" "}
                  <a
                    className="text-[#2563EB] hover:underline"
                    href="mailto:info@sv-bauten.de"
                  >
                    info@sv-bauten.de
                  </a>
                </p>
                <p>Telefon: +49 1567 979 0851</p>
              </address>
            </section>

            <section className="mb-10 scroll-mt-24" id="grundlagen">
              <h2 className="mb-4 font-bold text-[#2563EB] text-xl">
                7. Rechtliche Grundlagen
              </h2>
              <p>
                Diese Widerrufsbelehrung basiert auf den §§ 312, 312b, 312c,
                312g, 355, 356, 357, 357a BGB sowie Art. 246a EGBGB
                einschließlich der Anlagen 1 und 2. Die Belehrung in Abschnitt 2
                entspricht dem gesetzlichen Muster gemäß Anlage 1 zu Art. 246a §
                1 Abs. 2 EGBGB. Das Muster-Widerrufsformular in Abschnitt 4
                entspricht Anlage 2 zu Art. 246a § 1 Abs. 2 EGBGB.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
