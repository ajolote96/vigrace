import type { Dispatch, SetStateAction } from "react";
import type { Variants } from "framer-motion";

export interface Data{
    electrode: string; 
    degree: number; 
    [key: string]: string | number; 
}

export interface GlobalContextProps {
    ambientLight: number; 
    downLight: number; 
    upLight: number; 
    showTooltips: boolean; 
    onClickShowTooltips: boolean; 
    showGlassEffect: boolean;
    data: {
        electrode: string;
        degree: number; 
        [key: string]: string | number; 
    }[]; 
    nodes: string[]; 
    setShowGlassEffect: Dispatch<SetStateAction<boolean>>;
    setAmbientLight: Dispatch<SetStateAction<number>>;
    setDownLight: Dispatch<SetStateAction<number>>;
    setUpLight: Dispatch<SetStateAction<number>>;
    setShowTooltips: Dispatch<SetStateAction<boolean>>;
    setOnClickShowTooltips: Dispatch<SetStateAction<boolean>>;
    setData: Dispatch<SetStateAction<{
        electrode: string;
        degree: number; 
        [key: string]: string | number; 
    }[]>>
    setNodes: Dispatch<SetStateAction<string[]>>;
}