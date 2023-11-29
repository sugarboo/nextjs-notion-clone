import { Doc, Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

const createDocument = (create: Function, document?: Pick<Doc<"documents">, "parentDocument">) => {
  const promise = create({
    ...document,
    title: `Untitled - ${Math.floor(Math.random() * 9000) + 1000}`
  })
  
  toast.promise(promise, {
    loading: "Creating a new note...",
    success: "New note created!",
    error: "Failed to create note. please try again later..."
  })

  return promise;
}

const archiveDocument = (archive: Function, id: Id<"documents">) => {
  
  const promise = archive({ id });

  toast.promise(promise, {
    loading: "Moving to trash...",
    success: "Note moved to trash!",
    error: "Failed to archive note..."
  });
}

export {
  createDocument,
  archiveDocument
}
