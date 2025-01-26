import React from "react";
import Logo from "../icons";
import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <footer className="pb-8">
      <div className="container text-white">
        <div className="p-10 rounded-3xl bg-foreground">
          <div>
            <Logo className="text-background h-6" />
            <p className="text-background/70 mt-4">
              Empowering Your Projects, Enhancing Your Success, Every Step of
              the Way.
            </p>
          </div>
          <Separator className="bg-background/20 my-8" />
          <div className="flex flex-col gap-4 justify-between sm:flex-row text-sm">
            <p>© 2025 Craftly. All rights reserved.</p>
            <p>Developed by: @devmilek</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
