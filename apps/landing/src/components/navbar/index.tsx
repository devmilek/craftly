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

export const features = [
  {
    icon: Users,
    title: "CRM",
    description: "Keep your client relationships organized and accessible.",
    href: "/",
  },
  {
    icon: Folders,
    title: "Projects",
    description: "Plan and execute projects efficiently with full visibility.",
    href: "/",
  },
  {
    icon: Checks,
    title: "Tasks",
    description: "Organize, prioritize, and stay on top of your daily tasks.",
    href: "/",
  },
  {
    icon: Invoice,
    title: "Invoices",
    description: "Create and track invoices with ease and professionalism.",
    href: "/",
  },
  {
    icon: Receipt,
    title: "Expenses",
    description: "Easily manage and track your organization’s spending.",
    href: "/",
  },
  {
    icon: AddressBook,
    title: "Contacts",
    description: "Store and manage all your business contacts in one place.",
    href: "/",
  },
  {
    icon: HardDrives,
    title: "Storage",
    description:
      "Securely store and access your important files anytime, anywhere.",
    href: "/",
  },
  {
    icon: Note,
    title: "Notes",
    description: "Quickly jot down and organize your ideas for easy reference.",
    href: "/",
  },
];

export const productItems = [
  {
    title: "Why Craftly?",
    description:
      "See why Craftly outperforms competitors with real success stories.",
    href: "/",
  },
  {
    title: "How It Works",
    description:
      "Explore Craftly’s key features in an interactive walkthrough.",
    href: "/",
  },
  {
    title: "Benefits",
    description:
      "Boost productivity, streamline workflows, and grow your business effortlessly.",
    href: "/",
  },
];

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

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
