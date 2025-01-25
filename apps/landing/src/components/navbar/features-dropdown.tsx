import React from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { features } from ".";

const FeaturesDropdown = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Features</NavigationMenuTrigger>
      <NavigationMenuContent className="rounded-2xl">
        <ul className="grid grid-cols-2 w-[700px] p-2 gap-1">
          {features.map((item) => (
            <li
              key={item.title}
              className="p-4 bg-white rounded-2xl flex items-start gap-4 hover:bg-accent/50 cursor-pointer transition"
            >
              <div className="p-2 rounded-xl border bg-muted">
                <item.icon className="size-6" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
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
