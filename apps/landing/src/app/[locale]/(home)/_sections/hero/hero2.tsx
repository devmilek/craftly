"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, Play } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { motion, Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Hero2 = () => {
  const t = useTranslations("hero");
  return (
    <section className="pt-28 min-h-screen h-full relative flex flex-col overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container flex flex-col justify-between flex-1"
      >
        {/* HEADER */}
        <header className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <motion.div
            className="flex gap-2 items-center border rounded-full p-1 text-sm pr-4"
            variants={itemVariants}
          >
            <div className="bg-lime-200 rounded-full py-1 px-2 text-sm font-semibold uppercase">
              {t("badge_title")}
            </div>
            <span>{t("badge_content")}</span>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="font-bold text-4xl md:text-5xl text-pretty mt-8"
          >
            {t("heading")}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-pretty mt-4"
          >
            {t("description")}
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="grid gap-2 w-full sm:grid-cols-2 max-w-md mt-10"
          >
            <button
              className={cn(
                "flex items-center group gap-2 w-full border hover:bg-muted transition-colors bg-background justify-center rounded-2xl p-3 font-medium"
              )}
            >
              <Play weight="light" />
              {t("watch_video")}
            </button>
            <button
              className={cn(
                "flex items-center bg-foreground group gap-2 text-background w-full hover:bg-foreground/90 transition-colors justify-center rounded-2xl p-3 font-medium"
              )}
            >
              <ArrowUpRight weight="light" />
              {t("get_started")}
            </button>
          </motion.div>
        </header>
        {/* IMAGE */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl relative overflow-hidden aspect-[16/9] sm:rounded-[30px] border-8 sm:border-[12px] border-foreground/5 mt-8"
        >
          <Image
            src="/hero.png"
            width={1400}
            height={1000}
            alt=""
            className="object-top object-cover"
          />
          <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-3 bg-lime-200 ring-8 ring-lime-200/30 drop-shadow-2xl">
            <Play />
          </button>
        </motion.div>
        {/* CIRCLES BACKGROUND */}
        <motion.div className="absolute -bottom-52 sm:-bottom-40 md:-bottom-40 w-full h-full flex justify-center left-1/2 -translate-x-1/2 -z-10">
          <svg
            className="lg:w-[80%]"
            viewBox="0 0 1600 1600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_4955_11450)">
              <circle opacity="0.1" cx="801" cy="799" r="329" fill="#A3E635" />
              <circle
                opacity="0.1"
                cx="800.5"
                cy="799.5"
                r="473.5"
                fill="#A3E635"
              />
              <circle
                opacity="0.1"
                cx="800.5"
                cy="799.5"
                r="615.5"
                fill="#A3E635"
              />
              <circle opacity="0.1" cx="800" cy="800" r="800" fill="#A3E635" />
            </g>
            <defs>
              <clipPath id="clip0_4955_11450">
                <rect width="1600" height="1600" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </motion.div>
      </motion.div>
      {/* BOTTOM GRADIENT */}
      <div className="absolute w-full left-0 bottom-0 h-60 bg-gradient-to-t from-white to-white/0" />
    </section>
  );
};

export default Hero2;
