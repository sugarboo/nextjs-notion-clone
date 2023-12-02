"use client";

import { useRouter } from "next/navigation";

import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { removeDocument, restoreDocument } from "../_api/documents";

import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/base/confirm-modal";

interface BannerProps {
  documentId: Id<"documents">;
};

const Banner = ({
  documentId
} :BannerProps) => {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const onRemove = () => {
    removeDocument(remove, documentId);
    router.push("/documents");
  }

  const restore = useMutation(api.documents.restore);
  const onRestore = () => {
    restoreDocument(restore, documentId);
  }

  return (
    <div className="flex justify-center items-center gap-x-2 w-full p-2 text-sm text-white bg-rose-500 text-center">
      <p>
        This page is in the Trash.
      </p>
      <Button
        size="sm"
        variant="outline"
        className="h-auto p-1 px-2 border-white text-white hover:text-white font-normal bg-transparent hover:bg-primary/5"
        onClick={onRestore}
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="h-auto p-1 px-2 border-white text-white hover:text-white font-normal bg-transparent hover:bg-primary/5"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
}

export default Banner;
