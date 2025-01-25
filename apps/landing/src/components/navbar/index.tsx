"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "../icons";
import { NavItems } from "./nav-items";
import { Button } from "../ui/button";
import { Menu, PlusIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Portal } from "@radix-ui/react-portal";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <header className="h-16 fixed w-full z-50 inset-x-0 top-0 my-4">
        <div className="container">
          <div
            className={cn(
              "h-full flex px-6 py-4 flex-row items-center bg-white/80 backdrop-blur-xl border-border mx-auto border rounded-2xl transition duration-300"
            )}
          >
            <Link href="/" className="mr-4">
              <Logo className="h-7" />
            </Link>
            <NavItems className="hidden lg:flex" />
            <Button className="ml-auto hidden lg:flex">
              Join waitlist <PlusIcon className="" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="ml-auto lg:hidden relative z-[60]"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <Menu />
            </Button>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <Portal>
          <div className="h-full w-full fixed bg-background/50 z-50 inset-0 backdrop-blur-md p-8">
            <Button
              size="icon"
              variant="default"
              className="ml-auto lg:hidden relative z-[60]"
              onClick={() => setIsMenuOpen(false)}
            >
              <XIcon />
            </Button>
          </div>
        </Portal>
      )}
    </>
  );
};

export default Navbar;
