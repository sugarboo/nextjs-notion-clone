"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { createDocument } from "../../_api/documents";

const DocumentsPage = () => {
  const { user }  = useUser();

  const create = useMutation(api.documents.create);
  const onCreate = () => {
    createDocument(create)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <Image
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Notion Clone
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        <span>Create a note</span>
      </Button>
    </div>
  );
}
 
export default DocumentsPage;
