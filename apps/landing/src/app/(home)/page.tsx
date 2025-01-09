import Hero from "./_components/hero";
import Features from "./_components/features";
import Benefits from "./_components/benefits";
import Pricing from "./_components/pricing";
import FAQ from "./_components/faq";

export default function Home() {
  return (
    <main className="pt-16 container mx-auto">
      <Hero />
      <Features />
      <Benefits />
      <Pricing />
      <FAQ />
    </main>
  );
}
