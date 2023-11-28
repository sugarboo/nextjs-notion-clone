"use client";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick: () => void;
  icon: LucideIcon;
};

const NavItem = ({
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpand,
  label,
  onClick,
  icon: Icon
}: ItemProps) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight

  return (
    <div
      role="button"
      className={cn(
        "group flex items-center w-full min-h-[27px] py-1 pr-3 text-sm font-medium hover:bg-primary/5 text-muted-foreground",
        active && "text-primary bg-primary/5"
      )}
      onClick={onClick}
    >
      {!!id && (
        <div
          role="button"
          className="h-full mr-1 rounded-sm bg-neutral-300 dark:bg-neutral-600"
          onClick={() => {}}
        >
          <ChevronIcon className="w-4 h-4 shrink-0 text-muted-foreground" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">
          {documentIcon}
        </div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">
        {label}
      </span>
      {isSearch && (
        <kbd className="inline-flex items-center gap-1 h-5 ml-auto px-1.5 rounded border font-mono text-[10px] font-medium text-muted-foreground bg-muted pointer-events-none select-none">
          <span>
            <span>Ctrl</span>
            <span> + </span>
            <span>K</span>
          </span>
        </kbd>
      )}
    </div>
  );
}
 
export default NavItem;