"use client";

import { ElementRef, useRef, useState } from "react";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";

import IconPicker from "./icon-picker";
import { Button } from "@/components/ui/button";
import { Smile, X } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

interface ToolbarProps {
  initialData: Doc<"documents">;
  isPreview?: boolean;
}

const Toolbar = ({
  initialData,
  isPreview = false
}: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const update = useMutation(api.documents.update);
  
  const enableInput = () => {
    if (isPreview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  }

  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled"
    });
  }

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  }

  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon
    })
  }

  const removeIcon = useMutation(api.documents.removeIcon);
  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id
    })
  }

  return (
    <div className="relative group pl-[54px]">
      {!!initialData.icon && !isPreview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            onClick={onRemoveIcon}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && isPreview && (
        <p className="pt-6 text-6xl">
          {initialData.icon}
        </p>
      )}
      <div className="flex items-center gap-x-1 py-4 opacity-0 group-hover:opacity-100">
        {!initialData.icon && !isPreview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              variant="outline"
              size="sm"
              className="text-muted-foreground text-xs"
            >
              <Smile className="w-4 h-4 mr-2" />
              <span>Add icon</span>
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !isPreview && (
          <Button
            variant="outline"
            size="sm"
            className="text-muted-foreground text-xs"
            onClick={() => {}}
          >
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !isPreview ? (
        <TextareaAutosize
          ref={inputRef}
          value={value}
          className="text-5xl font-bold text-[#3F3F3F] dark:text-[#CFCFCF] bg-transparent break-words outline-none resize-none"
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          onChange={(e) => onInput(e.target.value)}
        />
      ) : (
        <div
        className="pb-[11.5px] text-5xl font-bold text-[#3F3F3F] dark:text-[#CFCFCF] break-words outline-none"
        onClick={enableInput}
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
}

export default Toolbar;
