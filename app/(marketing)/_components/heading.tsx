"use client"
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Heading = () => {
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
      <Button>
        <span>Enter</span>
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}
 
export default Heading;
