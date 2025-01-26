import FramerTest from "@/components/framer-test";
import Benefits from "./_sections/benefits";
import Hero2 from "./_sections/hero/hero2";
import Pricing from "./_sections/pricing";
import ProductHighlights from "./_sections/product-highlights";
import TopFeatures from "./_sections/top-features";
import UniqueFeatures from "./_sections/unique-features";
import WhyUs from "./_sections/why-us";

export default function Home() {
  return (
    <main className="">
      <Hero2 />
      <div className="container">
        <UniqueFeatures />
        <TopFeatures />
        <ProductHighlights />
        <WhyUs />
        <Benefits />
        <Pricing />
        <FramerTest />
      </div>
    </main>
  );
}
