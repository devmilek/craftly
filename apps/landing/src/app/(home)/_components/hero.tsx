"use client";

import { Badge } from "@/components/ui/badge";
import React from "react";
import WaitlistForm from "./waitlist-form";
import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { motion, useTransform, useScroll } from "framer-motion";

const Hero = () => {
  const { scrollY } = useScroll();
  const rotateX = useTransform(scrollY, [0, 1000], [0, 20]);
  const rotateY = useTransform(scrollY, [0, 1000], [0, 20]);
  return (
    <section className="flex flex-col items-center min-h-[calc(100vh-4rem)] py-14 text-center">
      <div className="max-w-3xl mb-6">
        <div className="flex items-center gap-2 justify-center mb-6">
          <Badge>NEW</Badge>
          <span className="font-medium text-sm">Join Craftly Waitlist</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-6 z-10 leading-relaxed">
          All-in-One Platform for Freelancers and Small Teams
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Simplify your workflow, manage projects effortlessly, and keep track
          of clients and finances—all in one intuitive platform.
        </p>
      </div>
      <WaitlistForm />
      <motion.div style={{ rotateX, rotateY }}>
        <Image
          src="/hero.png"
          width={1200}
          height={800}
          alt=""
          className="rounded-2xl border ring-[20px] ring-border/20 mt-20 z-10 shadow-xl"
        />
      </motion.div>
      <BackgroundBeams />
    </section>
  );
};

export default Hero;
