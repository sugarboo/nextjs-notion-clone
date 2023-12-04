"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useUser } from "@clerk/clerk-react";

import SettingsModal from "../base/settings-modal";
import SearchCommand from "../base/search-command";
import CoverImageModal from "../base/cover-image-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  const user = useUser();

  const pathname = usePathname();
  const needSearchCommand = () => {
    return pathname.toLocaleLowerCase().includes('documents');
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {user?.isSignedIn && needSearchCommand() &&
        <SearchCommand />
      }
      {
        user?.isSignedIn && (
          <>
            <CoverImageModal />
            <SettingsModal />
          </>
      )}
    </>
  );
}
 
export default ModalProvider;