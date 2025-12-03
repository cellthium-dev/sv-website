import About from "./components/About";
import BookingSystem from "./components/BookingSystem";
import ContactForm from "./components/ContactForm";
import CookieBanner from "./components/CookieBanner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import KnowledgeBase from "./components/KnowledgeBase";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <KnowledgeBase />
        <ContactForm />
        <BookingSystem />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}

export default App;
