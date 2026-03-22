export default function BookingSystem() {
  return (
    <section className="scroll-mt-24 py-16" id="terminbuchung">
      <div className="container mx-auto px-5">
        <h2 className="mb-4 text-center font-bold text-4xl">
          Online-Terminbuchung
        </h2>
        <p className="mb-12 text-center text-gray-600 text-lg">
          Buchen Sie direkt einen Termin für Ihre Vor-Ort-Beratung oder
          Online-Beratung
        </p>

        <div>
          <div
            className="calendly-inline-widget col-span-2 h-[750px] min-w-[320px]"
            data-url="https://www.cal.eu/sv-bauten/kostenlose-ersteinschatzung?overlayCalendar=true"
            style={{ colorScheme: "light" }}
          />
          <script
            async
            src="https://assets.calendly.com/assets/external/widget.js"
            type="text/javascript"
          />
        </div>
      </div>
    </section>
  );
}
