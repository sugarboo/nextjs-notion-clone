"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useEdgeStore } from "@/lib/edgestore";
import { useCoverImage } from "@/hooks/use-cover-image";

import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { SingleImageDropzone } from "./single-image-dropzone";

const CoverImageModal = () => {
  const params = useParams();

  const coverImageHook = useCoverImage();
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = useMutation(api.documents.update);
  const onChange = async(file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url
      });

      onClose();
    }
  }

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImageHook.onClose();
  }

  return (
    <Dialog open={coverImageHook.isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">
            Cover Image
          </h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          value={file}
          disabled={isSubmitting}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
}
 
export default CoverImageModal;
