import Cal, { getCalApi } from "@calcom/embed-react";
import React from "react";

export default function BookingSystem() {
  React.useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <section className="py-16" id="terminbuchung">
      <div className="container mx-auto px-5">
        <h2 className="mb-4 text-center font-bold text-4xl">
          Online-Terminbuchung
        </h2>
        <p className="mb-12 text-center text-gray-600 text-lg">
          Buchen Sie direkt einen Termin für Ihre Vor-Ort-Beratung oder
          Online-Beratung
        </p>

        <Cal
          calLink="felixarjuna/30min"
          config={{
            layout: "month_view",
            useSlotsViewOnSmallScreen: "true",
            theme: "light",
          }}
          namespace="30min"
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
        />
      </div>
    </section>
  );
}
