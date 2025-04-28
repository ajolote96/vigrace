import { createContext, useContext } from "react";
import type { SetStateAction, Dispatch } from "react";

interface GlobalContextProps {
    ambientLight: number; 
    downLight: number; 
    upLight: number; 
    setAmbientLight: Dispatch<SetStateAction<number>>;
    setDownLight: Dispatch<SetStateAction<number>>;
    setUpLight: Dispatch<SetStateAction<number>>;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);  

export function useGlobalContext(){
    const context = useContext(GlobalContext);
    if(!context){
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
}