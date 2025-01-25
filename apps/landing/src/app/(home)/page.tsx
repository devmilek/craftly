import Benefits from "./_sections/benefits";
import Hero from "./_sections/hero";
import Pricing from "./_sections/pricing";
import ProductHighlights from "./_sections/product-highlights";
import TopFeatures from "./_sections/top-features";
import WhyUs from "./_sections/why-us";

export default function Home() {
  return (
    <main className="pt-16">
      <Hero />
      <div className="container">
        <TopFeatures />
        <ProductHighlights />
        <WhyUs />
        <Benefits />
        <Pricing />
      </div>
    </main>
  );
}
