import Hero from "./_components/hero";
import Features from "./_components/features";
import Benefits from "./_components/benefits";
import Pricing from "./_components/pricing";
import FAQ from "./_components/faq";
import Hero2 from "./_components/hero2";

export default function Home() {
  return (
    <main className="pt-16">
      <Hero2 />
      <Features />
      <Benefits />
      <Pricing />
      <FAQ />
    </main>
  );
}
