import { createFileRoute } from "@tanstack/react-router";
import Footer from "../../components/footer";
import Header from "../../components/header";

export const Route = createFileRoute("/impressum/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header />
      <main className="container mx-auto max-w-4xl px-5 py-16">
        <h1 className="mb-8 font-bold text-3xl">Impressum</h1>

        <section className="mb-8">
          <h2 className="mb-4 font-bold text-xl">Angaben gemäß § 5 DDG</h2>
          <p className="mb-1">Andreas Bauten</p>
          <p className="mb-1">Sachverständiger für Photovoltaikanlagen</p>
          <p className="mb-1">Banker-Feld-Str. 1</p>
          <p className="mb-1">52072 Aachen</p>
          <p className="mb-4">Deutschland</p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-bold text-xl">Kontakt</h2>
          <p className="mb-1">
            E-Mail:{" "}
            <a
              className="text-[#2563EB] hover:underline"
              href="mailto:info@sv-bauten.de"
            >
              info@sv-bauten.de
            </a>
          </p>
          <p className="mb-1">Telefon: +49-1567-979-0851</p>
          <p className="mb-1">Internet: www.sv-bauten.de</p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-bold text-xl">Personenzertifizierung</h2>
          <p className="mb-1">
            Zertifizierter Sachverständiger für Photovoltaikanlagen nach ISO/IEC
            17024
          </p>
          <p className="mb-1">
            Zertifizierungsstelle: European Certification CYF (EUcert)
          </p>
          <p className="mb-1">Zertifikatsnummer: 1-25-1092</p>
          <p className="mb-1">
            Öffentlich prüfbarer Nachweis im EUcert-Absolventenregister:{" "}
            <a
              className="text-[#2563EB] hover:underline"
              href="https://www.european-certification.com/absolventen/?search_dc5df=1-25-1092"
              rel="noopener noreferrer"
              target="_blank"
            >
              EUcert-Absolventenregister
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-bold text-xl">
            Berufshaftpflichtversicherung
          </h2>
          <p className="text-gray-500">[wird nachgereicht]</p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-bold text-xl">
            Verbraucherstreitbeilegung (§ 36 VSBG)
          </h2>
          <p>
            Wir sind nicht verpflichtet und nicht bereit, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-bold text-xl">
            Hinweis zur EU-Online-Streitbeilegung (OS)
          </h2>
          <p>
            Die frühere Online-Streitbeilegungsplattform der Europäischen Union
            (OS-Plattform) wurde zum 20. Juli 2025 endgültig eingestellt. Seit
            diesem Datum besteht keine Pflicht und keine rechtliche Grundlage
            mehr, einen Hinweis auf die OS-Plattform vorzuhalten. Ein solcher
            Hinweis ist daher bewusst nicht enthalten.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-bold text-xl">
            Inhaltlich Verantwortlicher (§ 18 Abs. 2 MStV)
          </h2>
          <p className="mb-1">Andreas Bauten</p>
          <p className="mb-1">Banker-Feld-Straße 1</p>
          <p>52072 Aachen</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
