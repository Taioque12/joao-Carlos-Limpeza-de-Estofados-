import Navbar from "@/components/marketing/Navbar";
import Hero from "@/components/marketing/Hero";
import Features from "@/components/marketing/Features";
import SocialProof from "@/components/marketing/SocialProof";
import Pricing from "@/components/marketing/Pricing";
import FAQ from "@/components/marketing/FAQ";
import Scheduling from "@/components/marketing/Scheduling";
import Footer from "@/components/marketing/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <SocialProof />
        <Pricing />
        <FAQ />
        <Scheduling />
      </main>
      <Footer />
    </>
  );
}
