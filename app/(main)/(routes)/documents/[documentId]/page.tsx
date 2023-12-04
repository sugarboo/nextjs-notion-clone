"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

import Toolbar from "@/app/(main)/_components/toolbar";
import CoverImage from "@/components/base/cover-image";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  }
}

const DocumentIdPage = ({
  params
} : DocumentIdPageProps) => {
  const document = useQuery(api.documents.getById, {
    id: params.documentId
  });

  const Editor = useMemo(() => {
    return dynamic(() => {
      return import("@/components/base/editor")
    }, {
      ssr: false
    })
  }, [])

  const update = useMutation(api.documents.update);
  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content
    })
  }

  if (document === undefined) {
    return (
      <>
        <CoverImage.Skeleton />
        <div className="space-y-4 pt-4 pl-8">
          <Skeleton className="w-[50%] h-14" />
          <Skeleton className="w-[80%] h-4" />
          <Skeleton className="w-[40%] h-4" />
          <Skeleton className="w-[60%] h-4" />
        </div>
      </>
    );
  }

  if (document === null) {
    return (
      <div>Not found</div>
    );
  }

  return (
    <div className="pb-40">
      <CoverImage url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor
          initialContent={document.content}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
 
export default DocumentIdPage;
