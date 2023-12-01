"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import Title from "./title";
import { MenuIcon } from "lucide-react";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const Navbar = ({
  isCollapsed,
  onResetWidth
}: NavbarProps) => {
  const params = useParams();

  const document = useQuery(api.documents.getById, {
    id: params.documentId as Id<"documents">
  });

  if (document === undefined) {
    return (
      <nav className="flex items-center w-full px-3 py-2 bg-background dark:bg-[#1F1F1F]">
        <Title.Skeleton />
      </nav>
    )
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className="flex items-center gap-x-4 w-full px-3 py-2 bg-background dark:bg-[#1F1F1F]">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="w-6 h-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
        </div>
      </nav>
    </>
  );
}
 
export default Navbar;
