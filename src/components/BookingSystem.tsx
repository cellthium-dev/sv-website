export default function BookingSystem() {
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

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <div
            className="calendly-inline-widget col-span-2 h-[700px] min-w-[320px]"
            data-url="https://calendly.com/felixarjuna17/30min"
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
