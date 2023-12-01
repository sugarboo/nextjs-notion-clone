"use client";

import { useEffect, useState } from "react";
import SettingsModal from "../base/settings-modal";
import SearchCommand from "../base/search-command";
import { useUser } from "@clerk/clerk-react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  const user = useUser();

  const needSearchCommand = () => {
    const { pathname } = location;
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
      <SettingsModal />
    </>
  );
}
 
export default ModalProvider;