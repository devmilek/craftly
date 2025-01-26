import React from "react";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { features, productItems } from ".";
import Link from "next/link";

const MobileMenu = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="h-full w-full flex flex-col overflow-auto fixed bg-background/90 z-50 inset-0 backdrop-blur-md p-8">
      <Button
        size="icon"
        variant="default"
        className="ml-auto lg:hidden relative z-[60] mb-6"
        onClick={() => onClose()}
      >
        <XIcon />
      </Button>
      <Accordion type="multiple">
        <AccordionItem value="product">
          <AccordionTrigger className="text-base">Product</AccordionTrigger>
          <AccordionContent className="grid gap-4">
            {productItems.map((item, index) => (
              <Link href={item.href} key={index} className="hover:underline">
                <p>{item.title}</p>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="features">
          <AccordionTrigger className="text-base">Features</AccordionTrigger>
          <AccordionContent className="grid gap-4">
            {features.map((item) => (
              <li
                key={item.title}
                className="group rounded-2xl flex items-start gap-4 cursor-pointer transition"
              >
                <div className="p-2 rounded-xl border bg-muted">
                  <item.icon className="size-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm group-hover:underline">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MobileMenu;
