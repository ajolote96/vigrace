import { createContext, useContext } from "react";
import type { GlobalContextProps } from "../types/types";


export const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);  

export function useGlobalContext(){
    const context = useContext(GlobalContext);
    if(!context){
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
}