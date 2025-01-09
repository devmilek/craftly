import { Badge } from "@/components/ui/badge";
import React from "react";
import WaitlistForm from "./waitlist-form";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="container mx-auto flex flex-col items-center min-h-[calc(100vh-4rem)] py-14 text-center">
      <div className="max-w-3xl mb-6">
        <div className="flex items-center gap-2 justify-center mb-6">
          <Badge>NEW</Badge>
          <span className="font-medium text-sm">Join Craftly Waitlist</span>
        </div>
        <h1 className="text-5xl font-bold mb-6">
          All-in-One Platform for Freelancers and Small Teams
        </h1>
        <p className="text-muted-foreground">
          Simplify your workflow, manage projects effortlessly, and keep track
          of clients and finances—all in one intuitive platform.
        </p>
      </div>
      <WaitlistForm />
      <Image
        src="/hero.png"
        width={1200}
        height={800}
        alt=""
        className="mt-20 rounded-2xl border ring-[20px] ring-border/20"
      />
    </section>
  );
};

export default Hero;
