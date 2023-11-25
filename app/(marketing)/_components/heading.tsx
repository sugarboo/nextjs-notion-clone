"use client"

import Link from "next/link";
import Spinner from "@/components/base/spinner";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        <span>Your Ideas, Documents & Plans. Unified. Welcome to </span>
        <span className="underline">Notion Clone</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        <span>Notion Clone is the connected workspace where</span>
        <br />
        <span>better, faster work happens.</span>
      </h3>
      {isLoading && (
          <div className="flex justify-center items-center">
            <Spinner size="lg" />
          </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button>
          <Link href="/documents">
            Enter
          </Link>
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            <span>Get Notion Clone Free</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
}
 
export default Heading;
