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
    subject: string; 
    nodes: string[]; 
    currentIndex: number; 
    frequency: string; 
    stage: string; 
    showNodeValue: boolean; 
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
    setSubject: Dispatch<SetStateAction<string>>;
    setCurrentIndex: Dispatch<SetStateAction<number>>;
    setFrequency: Dispatch<SetStateAction<string>>;
    setStage: Dispatch<SetStateAction<string>>;
    setShowNodeValue: Dispatch<SetStateAction<boolean>>;
}