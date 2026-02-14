import Hero from "../components/Hero";
import CitySection from "../components/CitySection";
import TestimonialSection from "../components/TestimonialSection";
import ThankYouSection from "../components/ThankYouSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="bgMonstro">
        <CitySection />
        <TestimonialSection />
      </div>
      <ThankYouSection />
      <Footer />
    </main>
  );
}
