"use client"

import { useConvexAuth } from "convex/react";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "@/components/themes/mode-toggle";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Spinner from "@/components/base/spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link"


const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <div className={cn(
      "fixed top-0 flex items-center w-full p-4 z-[99999] bg-background dark:bg-[#1F1F1F] ",
      scrolled && "border-b shadow-sm"
    )}>
      <div className="hidden md:block">
        <Logo />
      </div>
      <div className="flex justify-between md:justify-end items-center gap-x-2 w-full md:ml-auto p-4">
        {isLoading && (
          <Spinner />
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">
                Get Notion Clone free
              </Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">
                Enter Notion Clone
              </Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}
 
export default Navbar;
