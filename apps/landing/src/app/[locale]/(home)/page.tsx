import { Metadata } from "next";
import Benefits from "./_sections/benefits";
import Hero2 from "./_sections/hero/hero2";
import Pricing from "./_sections/pricing";
import ProductHighlights from "./_sections/product-highlights";
import TopFeatures from "./_sections/top-features";
import UniqueFeatures from "./_sections/unique-features";
import WhyUs from "./_sections/why-us";

export const metadata: Metadata = {
  title:
    "Craftly - All-in-One Platform for Project, Client, and Financial Management",
  description:
    "Craftly is an all-in-one platform that simplifies client, project, and financial management. Boost productivity, streamline workflows, and grow your business effortlessly.",
};

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
      </div>
    </main>
  );
}
