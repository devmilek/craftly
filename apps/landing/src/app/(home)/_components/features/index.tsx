import SectionHeading from "@/components/section-heading";
import React from "react";
import FeaturesFeed from "./features-feed";
import IconFeautresFeed from "./icon-features-feed";

const Features = () => {
  return (
    <section className="py-14">
      <SectionHeading
        badge="Features"
        title="Powerful Features for Seamless Workflow"
        description="Discover tools designed to help you stay organized, collaborate effectively, and deliver results faster."
      />
      <FeaturesFeed />
      <IconFeautresFeed />
    </section>
  );
};

export default Features;
