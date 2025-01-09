import SectionHeading from "@/components/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const faqs = [
  {
    question: "What is Craftly?",
    answer:
      "Craftly is an all-in-one platform designed to help freelancers and small teams manage projects, clients, and finances.",
  },
  {
    question: "Is there a free version of Craftly?",
    answer:
      "Yes! Craftly offers a free plan with essential features for freelancers just starting out.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Absolutely. You can cancel or switch plans at any time, hassle-free.",
  },
  {
    question: "Is Craftly secure?",
    answer:
      "Yes, we prioritize your data security with advanced encryption and regular updates.",
  },
];

const FAQ = () => {
  return (
    <section className="my-14 grid md:grid-cols-2 gap-10">
      <SectionHeading
        badge="FAQ"
        description="Find answers to common questions about Craftly and how it can help your business."
        title="Got Questions? We’ve Got Answers"
        className="text-start"
      />
      <div className="p-8 rounded-2xl border">
        <Accordion type="multiple">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={index.toString()}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
