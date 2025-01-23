import Image from "next/image";
import React from "react";

const Hero2 = () => {
  return (
    <div className="overflow-hidden w-full relative">
      <section className="container relative pt-20">
        <header className="max-w-3xl mx-auto text-center space-y-5">
          <h1 className="font-bold text-5xl">
            All-in-One Platform for Organize Your Work
          </h1>
          <p className="text-muted-foreground">
            Simplify your workflow, manage projects effortlessly, and keep track
            of clients and finances—all in one intuitive platform.
          </p>
        </header>
        <div className="bg-foreground rounded-3xl mt-10 border-foreground border-[16px] relative z-10">
          <Image
            src="/hero.png"
            width={1400}
            height={1000}
            alt=""
            className="rounded-xl overflow-hidden"
          />
        </div>
      </section>
      <div className="absolute bottom-0 w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-[1200px] w-[1200px] rounded-full bg-blue-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-5"
              style={{
                scale: 1 - i * 0.15,
                transformOrigin: "center center",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero2;
