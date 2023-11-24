"use client"

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "@/components/themes/mode-toggle";

const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div className={cn(
      "fixed top-0 flex items-center w-full p-4 z-50 bg-background dark:bg-[#1F1F1F] ",
      scrolled && "border-b shadow-sm"
    )}>
      <div className="hidden md:block">
        <Logo />
      </div>
      <div className="flex justify-end items-center gap-x-2 w-full md:ml-auto p-4">
        <ModeToggle />
      </div>
    </div>
  );
}
 
export default Navbar;
