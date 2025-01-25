import React from "react";
import SectionHeader from "../section-header";
import {
  Check,
  Coins,
  HeadCircuit,
  PuzzlePiece,
} from "@phosphor-icons/react/dist/ssr";

const highlights = [
  "Intuitive Task Management for a streamlined workflow",
  "Real-time Collaboration Tools for seamless teamwork",
  "Customizable Dashboards for quick insights",
  "Secure Document Storage for easy access anytime, anywhere",
];

const cards = [
  {
    icon: PuzzlePiece,
    title: "Dynamic Project Management",
    description:
      "Plan, track, and execute projects with full visibility and control.",
  },
  {
    icon: Coins,
    title: "Integrated Financial Tools",
    description:
      "Manage invoices, track expenses, and stay on top of cash flow with ease.",
  },
  {
    icon: HeadCircuit,
    title: "AI-Driven Insights",
    description:
      "Leverage artificial intelligence to optimize workflows and automate repetitive tasks.",
  },
];

const ProductHighlights = () => {
  return (
    <section className="section">
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-muted/50 border rounded-3xl"></div>
        <div>
          <SectionHeader
            badge="Product Highlights"
            title="The Essential Business Toolkit"
            description="Craftly delivers a feature-rich experience to help businesses and freelancers streamline their day-to-day operations with ease."
          />
          <div className="flex flex-col gap-4 mt-8">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="rounded-full py-3 pl-3 pr-4 border flex gap-4 items-center"
              >
                <div className="bg-lime-200 p-2 rounded-full w-max">
                  <Check className="size-3" weight="light" />
                </div>
                <p>{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-16">
        {cards.map((card, index) => (
          <div key={index} className="rounded-3xl border p-5">
            <div className="flex items-center gap-4">
              <div className="bg-lime-200 p-3 rounded-2xl w-max">
                <card.icon className="size-6 text-primary" weight="light" />
              </div>
              <h3 className="font-bold">{card.title}</h3>
            </div>
            <p className="text-muted-foreground mt-4 text-sm">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductHighlights;
