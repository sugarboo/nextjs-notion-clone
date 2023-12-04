import { create } from "zustand";

type CoverImageStore = {
  url?: string,
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  onReplace: (url: string) => void
};


export const useCoverImage = create<CoverImageStore>((set) => ({
  url: undefined,
  isOpen: false,
  onOpen: () => set({
    url: undefined,
    isOpen: true
  }),
  onClose: () => set({
    url: undefined,
    isOpen: false
  }),
  onReplace: (url: string) => set({ url })
}));
