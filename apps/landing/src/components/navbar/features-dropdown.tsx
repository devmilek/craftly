import React from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { features } from ".";
import { useTranslations } from "next-intl";

const FeaturesDropdown = () => {
  const t = useTranslations("navbar.items.features");
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{t("title")}</NavigationMenuTrigger>
      <NavigationMenuContent className="rounded-2xl">
        <ul className="grid grid-cols-2 w-[700px] p-2 gap-1">
          {features.map((item) => (
            <li
              key={item.key}
              className="p-4 bg-white rounded-2xl flex items-start gap-4 hover:bg-accent/50 cursor-pointer transition"
            >
              <div className="p-2 rounded-xl border bg-muted">
                <item.icon className="size-6" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">
                  {t(`sub_items.${item.key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(`sub_items.${item.key}.description`)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default FeaturesDropdown;
