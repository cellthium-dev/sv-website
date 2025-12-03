import { useState } from "react";

export default function BookingSystem() {
  const [appointmentType, setAppointmentType] = useState("online");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ];

  const confirmBooking = () => {
    if (!(selectedDate && selectedTime)) {
      alert("Bitte wählen Sie ein Datum und eine Uhrzeit aus.");
      return;
    }
    alert(
      `Termin erfolgreich gebucht!\nDatum: ${selectedDate}\nUhrzeit: ${selectedTime}\nArt: ${appointmentType}`
    );
  };

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
          <div className="rounded-xl bg-white p-8 shadow-lg">
            <h3 className="mb-6 font-bold text-2xl">Termin wählen</h3>

            <div className="mb-6">
              <label className="mb-2 block font-semibold">Terminart</label>
              <select
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20"
                onChange={(e) => setAppointmentType(e.target.value)}
                value={appointmentType}
              >
                <option value="online">Online-Beratung (30 Min.)</option>
                <option value="vor-ort">Vor-Ort-Beratung (60 Min.)</option>
                <option value="begutachtung">
                  Vor-Ort-Begutachtung (120 Min.)
                </option>
              </select>
            </div>

            <div className="mb-6">
              <label className="mb-2 block font-semibold">
                Datum auswählen
              </label>
              <input
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20"
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                type="date"
                value={selectedDate}
              />
            </div>

            <div>
              <label className="mb-3 block font-semibold">
                Verfügbare Zeiten
              </label>
              <div className="grid max-h-64 grid-cols-3 gap-2 overflow-y-auto">
                {timeSlots.map((slot) => (
                  <button
                    className={`rounded-lg border-2 px-4 py-3 text-center transition-all ${
                      selectedTime === slot
                        ? "border-[#0066CC] bg-[#0066CC] text-white"
                        : "border-gray-300 bg-white hover:border-[#0066CC]"
                    }`}
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 p-8">
            <h3 className="mb-6 font-bold text-2xl">Termindetails</h3>

            {selectedDate && selectedTime ? (
              <div className="mb-6 space-y-4">
                <div className="rounded-lg bg-white p-4">
                  <div className="mb-1 font-semibold text-gray-600">Datum</div>
                  <div className="text-lg">{selectedDate}</div>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <div className="mb-1 font-semibold text-gray-600">
                    Uhrzeit
                  </div>
                  <div className="text-lg">{selectedTime} Uhr</div>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <div className="mb-1 font-semibold text-gray-600">
                    Terminart
                  </div>
                  <div className="text-lg">
                    {appointmentType === "online" &&
                      "Online-Beratung (30 Min.)"}
                    {appointmentType === "vor-ort" &&
                      "Vor-Ort-Beratung (60 Min.)"}
                    {appointmentType === "begutachtung" &&
                      "Vor-Ort-Begutachtung (120 Min.)"}
                  </div>
                </div>
              </div>
            ) : (
              <p className="mb-6 text-gray-600">
                Bitte wählen Sie zunächst einen Termin aus dem Kalender.
              </p>
            )}

            <button
              className="mb-6 w-full rounded-lg bg-[#0066CC] px-6 py-4 font-semibold text-white transition-colors hover:bg-[#004C99] disabled:cursor-not-allowed disabled:bg-gray-300"
              disabled={!(selectedDate && selectedTime)}
              onClick={confirmBooking}
            >
              Termin verbindlich buchen
            </button>

            <div className="space-y-2 text-gray-600 text-sm">
              <p>✓ Kostenlose Stornierung bis 24h vorher</p>
              <p>✓ Terminbestätigung per E-Mail & SMS</p>
              <p>✓ Erinnerung 24h vor dem Termin</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
