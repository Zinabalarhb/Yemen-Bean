import Hero from "../components/Hero";
import BestSellersCarousel from "../components/BestSellersCarousel";
import PrepAssistant from "../components/PrepAssistant";
import Brew from "../components/Brew";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <Hero/>
      <BestSellersCarousel />
      <PrepAssistant />
      <Brew />
      <Testimonials />
      <Footer />
    </>
  );
}
