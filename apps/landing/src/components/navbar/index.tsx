"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "../icons";
import { NavItems } from "./nav-items";
import { Button } from "../ui/button";
import { Menu, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AddressBook,
  Checks,
  Folders,
  HardDrives,
  Invoice,
  Note,
  Receipt,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import MobileMenu from "./mobile-menu";

import { motion, AnimatePresence, Variants } from "motion/react";
import { Portal } from "@radix-ui/react-portal";
import { useTranslations } from "next-intl";

export const features = [
  {
    icon: Users,
    key: "crm",
    href: "/",
  },
  {
    icon: Folders,
    key: "projects",
    href: "/",
  },
  {
    icon: Checks,
    key: "tasks",
    href: "/",
  },
  {
    icon: Invoice,
    key: "invoices",
    href: "/",
  },
  {
    icon: Receipt,
    key: "expenses",
    href: "/",
  },
  {
    icon: AddressBook,
    key: "contacts",
    href: "/",
  },
  {
    icon: HardDrives,
    key: "storage",
    href: "/",
  },
  {
    icon: Note,
    key: "notes",
    href: "/",
  },
] as const;

export const productItems = [
  {
    key: "why_craftly",
    href: "/",
  },
  {
    key: "how_it_works",
    href: "/",
  },
  {
    key: "benefits",
    href: "/",
  },
] as const;

const menuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const Navbar = () => {
  const t = useTranslations("navbar");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <header className="h-16 fixed w-full z-50 inset-x-0 top-0 mt-2 md:mt-4">
        <div className="container">
          <div
            className={cn(
              "h-full flex py-4 px-0 flex-row items-center mx-auto border border-transparent rounded-3xl transition-all duration-500",
              {
                "bg-white/80 backdrop-blur-xl border-border px-6": isScrolled,
              }
            )}
          >
            <Link href="/" className="mr-4">
              <Logo className="h-7" />
            </Link>
            <NavItems className="hidden lg:flex" />
            <Button className="ml-auto hidden lg:flex rounded-xl">
              {t("join_waitlist")} <PlusIcon className="" />
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
      <Portal>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
            >
              <MobileMenu onClose={() => setIsMenuOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};

export default Navbar;
