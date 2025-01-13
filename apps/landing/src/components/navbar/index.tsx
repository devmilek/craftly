"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "../icons";
import { NavItems } from "./nav-items";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <header className="h-16 fixed w-full z-50 inset-x-0 top-0 my-4">
      <div
        className={cn(
          "container h-full flex flex-row items-center mx-auto border border-transparent rounded-2xl transition duration-300",
          {
            "shadow-sm border bg-white border-border": isScrolled,
          }
        )}
      >
        <Link href="/" className="mr-4">
          <Logo className="h-7" />
        </Link>
        <NavItems />
        <Button className="ml-auto">
          Join waitlist <PlusIcon className="" />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
