import { MousePointer2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const Hero = () => {
  const t = useTranslations("hero");

  return (
    <div className="overflow-hidden w-full relative min-h-screen">
      <section className="container relative pt-10 sm:pt-20">
        <header className="max-w-3xl mx-auto text-center space-y-5">
          <h1 className="font-bold text-5xl">{t("heading")}</h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </header>
        <div className="bg-foreground rounded-3xl max-w-4xl mx-auto mt-10 border-foreground border-8 sm:border-[16px] relative z-10">
          <Image
            src="/hero.png"
            width={1400}
            height={1000}
            alt=""
            className="rounded-xl overflow-hidden"
          />
        </div>
      </section>
      {/* Background */}
      <div className="absolute bottom-0 w-full h-full flex justify-center -z-10">
        <svg
          className="w-[80%]"
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
      </div>
      {/* bottom effect */}
      <div
        className="absolute w-full h-10 bg-background left-0 bottom-0 z-10"
        style={{
          // shadow
          boxShadow: "0px -10px 20px rgba(0, 0, 0, 0.1)",
        }}
      />
      <div className="absolute bottom-[40%] left-1/2 transform -translate-x-1/2 drop-shadow-2xl z-10">
        <MousePointer2 className="fill-foreground" />
        <div className="bg-foreground text-background px-2 py-1 rounded-md leading-none ml-6">
          John
        </div>
      </div>
      {/* Interactive cards */}
      <Image
        unoptimized
        height={200}
        width={400}
        src="/hero-card2.png"
        alt=""
        className="w-72 absolute bottom-[41%] z-10 drop-shadow-2xl left-40 hidden lg:block"
      />
      <Image
        unoptimized
        height={200}
        width={400}
        src="/hero-card.png"
        alt=""
        className="w-72 absolute bottom-1/4 z-10 drop-shadow-2xl right-40 hidden lg:block"
      />
    </div>
  );
};

export default Hero;
