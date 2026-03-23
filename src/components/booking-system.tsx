import Cal, { getCalApi } from "@calcom/embed-react";
import React from "react";

export default function BookingSystem() {
  React.useEffect(() => {
    (async () => {
      const cal = await getCalApi({
        namespace: "sv-bauten",
      });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <section
      className="scroll-mt-16 py-16 md:scroll-mt-[4.5rem]"
      id="terminbuchung"
    >
      <div className="container mx-auto px-5">
        <h2 className="mb-4 text-center font-bold text-4xl">
          Online-Terminbuchung
        </h2>
        <p className="mb-12 text-center text-gray-600 text-lg">
          Buchen Sie direkt einen Termin für Ihre Vor-Ort-Beratung oder
          Online-Beratung
        </p>

        <Cal
          calLink="sv-bauten/kostenlose-ersteinschatzung"
          calOrigin="https://cal.eu"
          config={{ layout: "month_view", theme: "light" }}
          namespace="sv-bauten"
          style={{ width: "100%", height: "750px", overflow: "scroll" }}
        />
      </div>
    </section>
  );
}
