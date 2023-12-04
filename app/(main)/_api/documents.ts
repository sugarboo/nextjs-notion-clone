import { Doc, Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

const createDocument = (create: Function, document?: Partial<Doc<"documents">>) => {
  const promise: Promise<Id<"documents">> = create({
    ...document,
    title: "Untitled"
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

  return promise;
}

const restoreDocument = (restore: Function, id: Id<"documents">) => {
  const promise = restore({ id });

  toast.promise(promise, {
    loading: "Restoring note...",
    success: "Note restored!",
    error:" Failed to restore note."
  });
}

const removeDocument = (remove: Function, id: Id<"documents">) => {
  const promise = remove({ id });

  toast.promise(promise, {
    loading: "Deleting note...",
    success: "Note deleted!",
    error:" Failed to delete note."
  });

  return promise;
}

export {
  createDocument,
  archiveDocument,
  restoreDocument,
  removeDocument
}
