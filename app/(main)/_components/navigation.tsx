"use client";

import { useRouter } from "next/navigation";
import { useParams, usePathname } from "next/navigation"

import { useMediaQuery } from "usehooks-ts";
import { ElementRef, useEffect, useRef, useState } from "react";
import { ChevronsLeft, MenuIcon, PlusCircle, Search, Settings, Trash } from "lucide-react";

import { cn } from "@/lib/utils";
import UserItem from "./user-item";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import NavItem from "./nav-item";
import DocumentList from "./document-list";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import Trashcan from "./trashcan";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import Navbar from "./navbar";

const Navigation = () => {
  const create = useMutation(api.documents.create);

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const NAVIGATION_DEFAULT_WIDTH = 240 as const;
  const NAVIGATION_MAX_WIDTH = 480 as const;
  const NAVIGATION_COLLAPSE_ANIMATION_DURATION = 300 as const;

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile, pathname]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return
    let newWidth = event.clientX;
    
    if (newWidth < NAVIGATION_DEFAULT_WIDTH) newWidth = NAVIGATION_DEFAULT_WIDTH;
    if (newWidth > NAVIGATION_MAX_WIDTH) newWidth = NAVIGATION_MAX_WIDTH;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    }
  }

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : `${NAVIGATION_DEFAULT_WIDTH}px`;
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : `calc(100% - ${NAVIGATION_DEFAULT_WIDTH}px)`
      );
      navbarRef.current.style.setProperty(
        "left",
        isMobile ? "100%" : `${NAVIGATION_DEFAULT_WIDTH}px`
      );

      setTimeout(() => setIsResetting(false), NAVIGATION_COLLAPSE_ANIMATION_DURATION);
    }
  }


  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), NAVIGATION_COLLAPSE_ANIMATION_DURATION);
    }
  }

  const handleCreate = () => {
    const promise = create({
      title: "Untitled"
    }).then((documentId) => {
      router.push(`/documents/${documentId}`)
    });
    
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create note. please try again later..."
    })
  }
  
  const search = useSearch();
  const settings = useSettings();

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full relative flex w-60 flex-col bg-secondary overflow-y-auto z-[99999]",
          isResetting && `transition-all ease-in-out duration-[${NAVIGATION_COLLAPSE_ANIMATION_DURATION}]`,
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          className={cn(
            `absolute top-[26px] right-2 h-6 w-6 text-muted-foreground rounded-sm opacity-0 hover:bg-neutral-[${NAVIGATION_COLLAPSE_ANIMATION_DURATION}] dark:hover:bg-neutral-600 group-hover/sidebar:opacity-100 transition`,
            isMobile && "opacity-100"
          )}
          onClick={collapse}
        >
          <ChevronsLeft />
        </div>
        <div className="mt-4">
          <UserItem />
          <NavItem
            label="Search"
            icon={Search}
            isSearch
            onClick={search.onOpen}
          />
          <NavItem
            label="Settings"
            icon={Settings}
            onClick={settings.onOpen}
          />
          <NavItem
            label="New page"
            icon={PlusCircle}
            onClick={handleCreate}
          />
        </div>
        <DocumentList />
        <Popover>
          <PopoverTrigger className="w-full mt-4">
            <NavItem label="Trash" icon={Trash} />
          </PopoverTrigger>
          <PopoverContent
            side={isMobile ? "bottom" : "right"}
            className="w-72 p-0"
          >
            <Trashcan />
          </PopoverContent>
        </Popover>
        <div
          className="absolute right-0 top-0 opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize h-full w-1 bg-primary/10"
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          `absolute top-0 left-60 w-[calc(100% - ${NAVIGATION_DEFAULT_WIDTH}px)] z-[99999]`,
          isResetting && `transition-all ease-in-out duration-[${NAVIGATION_COLLAPSE_ANIMATION_DURATION}]`,
          isMobile && "left-0 w-full"
        )}
      >
        {!!params.documentId ? (
          <Navbar
            isCollapsed={isCollapsed}
            onResetWidth={resetWidth}
          />
        ) : (
          <nav className="px-3 py-2 w-full bg-transparent">
            {isCollapsed && (
              <MenuIcon role="button" className="h-6 w-6 text-muted-foreground" onClick={resetWidth} />
            )}
          </nav>
        )}
      </div>
    </>
  );
}
 
export default Navigation;
