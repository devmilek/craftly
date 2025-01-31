import Image from "next/image";
import React from "react";
import image from "../../../public/hero2.png";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen grid grid-cols-2 gap-8 p-4">
      <section className="relative flex items-center flex-col justify-center size-full">
        <div className="max-w-md w-full">{children}</div>
      </section>
      <section className="bg-sidebar border rounded-3xl overflow-hidden relative">
        <div className="overflow-hidden rounded-2xl aspect-[4/3] top-1/2 -translate-y-1/2 relative left-10 p-2 bg-background">
          <Image
            src={image}
            width={1200}
            height={800}
            alt=""
            placeholder="blur"
            className="size-full object-cover object-top shadow-lg border rounded-xl"
          />
        </div>
      </section>
    </div>
  );
};

export default AuthLayout;
