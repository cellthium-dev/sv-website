import { createFileRoute } from "@tanstack/react-router";
import BookingSystem from "../components/booking-system";
import ContactForm from "../components/contact-form";
import CookieBanner from "../components/cookie-banner";
import Footer from "../components/footer";
import Header from "../components/header";
import Hero from "../components/hero";
import Services from "../components/services";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <ContactForm />
        <BookingSystem />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: App,
});
