import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { removeDocument, restoreDocument } from "../_api/documents";
import Spinner from "@/components/base/spinner";
import { Search, Trash, Undo } from "lucide-react";
import { Input } from "@/components/ui/input";
import ConfirmModal from "@/components/base/confirm-modal";

const Trashcan = () => {
  const router = useRouter();
  const params = useParams();

  const documents = useQuery(api.documents.getTrash);
  
  const [search, setSearch] = useState("");
  const filteredDocuments = documents?.filter(document => {
    return document.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  })

  const onClick = (documentId: Id<"documents">) => {
    router.push(`/documents/${documentId}`);
  }

  const restore = useMutation(api.documents.restore);
  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: Id<"documents">
  ) => {
    event.stopPropagation();
    
    restoreDocument(restore, id);
  }

  const remove = useMutation(api.documents.remove);
  const onRemove = (id: Id<"documents">) => {
    removeDocument(remove, id);

    if (params.documentId === id) {
      router.push("/documents");
    }

    if (document === undefined) {
      return (
        <div className="flex justify-center items-center h-full p-4">
          <Spinner size="lg" />
        </div>
      );
    }
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="w-4 h-4" />
        <Input
          value={search}
          placeholder="filter by page title..."
          className="h-7 px-2 bg-secondary focus-visible:ring-transparent"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block pb-2 text-center text-xs text-muted-foreground">
          No documents found.
        </p>
        {filteredDocuments?.map(document => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="flex items-center justify-between w-full rounded-sm text-sm text-primary hover:bg-primary/5"
          >
            <span className="pl-2 truncate">
              {document.title}
            </span>
            <div className="flex items-center" onClick={(e) => onRestore(e, document._id)}>
              <div className="p-2 rounded-sm hover:bg-neutral-200">
                <Undo className="w-4 h-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div className="p-2 rounded-sm hover:bg-neutral-200">
                  <Trash className="w-4 h-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))

        }
      </div>
    </div>
  );
}
 
export default Trashcan;