"use client";

import { useParams } from "next/navigation";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Button } from "../ui/button";
import { ImageIcon, X } from "lucide-react";

interface CoverImageProps {
  url?: string,
  isPreview?: boolean
}

const CoverImage = ({
  url,
  isPreview = false
}: CoverImageProps) => {
  const params = useParams();

  const coverImageHook = useCoverImage();

  const onChangeCover = () => {
    coverImageHook.onOpen();
  }

  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const onRemove = () => {
    removeCoverImage({
      id: params.documentId as Id<"documents">
    });
  }

  return (
    <div className={cn(
      "relative w-full h-[35vh] group",
      !url && "h-[12vh]",
      url && "bg-muted"
    )}>
      {!!url && (
        <Image
          src={url}
          fill
          alt="Cover"
          className="object-cover"
        />
      )}
      {url && !isPreview && (
        <div className="absolute right-5 bottom-5 flex items-center gap-x-2 group-hover:opacity-100">
          <Button
            variant="outline"
            size="sm"
            className="text-xs text-muted-foreground"
            onClick={onChangeCover}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            <span>Change cover</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs text-muted-foreground"
            onClick={onRemove}
          >
            <X className="w-4 h-4 mr-2" />
            <span>Remove</span>
          </Button>
        </div>
      )}
    </div>
  );
}
 
export default CoverImage;
