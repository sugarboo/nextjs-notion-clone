"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Error = ({}) => {
  return (
    <div className="flex flex-col justify-center items-center h-full space-y-4">
      <Image
        src="/error.png"
        width="300"
        height="300"
        alt="Error"
        className="dark:hidden"
      />
      <Image
        src="/error-dark.png"
        width="300"
        height="300"
        alt="Error"
        className="hidden dark:block"
      />
      <h2 className="text-xl font-medium">
        Something went wrong!
      </h2>
      <Button asChild>
        <Link href="/documents">
          Get back
        </Link>
      </Button>
    </div>
  );
}
 
export default Error;
