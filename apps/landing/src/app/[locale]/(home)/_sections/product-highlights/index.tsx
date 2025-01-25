import React from "react";
import SectionHeader from "../section-header";
import {
  Check,
  Coins,
  HeadCircuit,
  PuzzlePiece,
} from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";

const highlights = [
  "task_management",
  "collaboration_tools",
  "customizable_dashboards",
  "document_storage",
] as const;

const cards = [
  {
    icon: PuzzlePiece,
    key: "dynamic_project_management",
  },
  {
    icon: Coins,
    key: "integrated_financial_tools",
  },
  {
    icon: HeadCircuit,
    key: "ai_driven_insights",
  },
] as const;

const ProductHighlights = () => {
  const t = useTranslations("product_highlights");
  return (
    <section className="section">
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-muted/50 border rounded-3xl"></div>
        <div>
          <SectionHeader
            badge={t("badge")}
            title={t("title")}
            description={t("description")}
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
                <p>{t(`highlights.${highlight}`)}</p>
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
              <h3 className="font-bold">{t(`cards.${card.key}.title`)}</h3>
            </div>
            <p className="text-muted-foreground mt-4 text-sm">
              {t(`cards.${card.key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductHighlights;
