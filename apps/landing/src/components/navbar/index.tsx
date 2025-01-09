import Link from "next/link";
import React from "react";
import Logo from "../icons";
import { NavItems } from "./nav-items";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-16 fixed w-full bg-white border-b z-50 inset-x-0 top-0">
      <div className="container h-full flex flex-row items-center mx-auto">
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
