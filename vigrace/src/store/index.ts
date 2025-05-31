import { create } from "zustand";

type Store = {
    
    language: "en" | "es";
    setLanguage: (lang: "en" | "es") => void;
}

const useStore = create<Store>((set) => ({
    language: "es",
    setLanguage: (lang) => set({ language: lang }),
}))

export default useStore;