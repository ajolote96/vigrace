import { useGlobalContext } from "../../../providers/GlobalContext";
import type { SliderValue } from "@heroui/react";
export default function useNodeSettings(){
    const {
        showTooltips,
        setShowTooltips,
        onClickShowTooltips,
        setOnClickShowTooltips,
        showGlassEffect,
        setShowGlassEffect,
        data,
        nodes,
        setNodes,
        setShowNodeValue,
        showNodeValue,
        setShowModel,
        showModel,
        setMaxSphereSize,
        maxSphereSize,  
    } = useGlobalContext();
    function handleShowTooltips(): void {
        setShowTooltips((prev: boolean) => !prev);
    }

    const allNodes = [...new Set(data.map((item) => item.electrode as string))];
    function handleOnClickShowTooltips(): void {
        setOnClickShowTooltips((prev: boolean) => !prev);
    }

    function handleShowGlassEffect(): void {
        setShowGlassEffect((prev: boolean) => !prev);
    }

    function handleShowNodeValue(): void {
        setShowNodeValue((prev: boolean) => !prev);
    }
    function handleShowModel(): void {
        setShowModel((prev: boolean) => !prev);
    }

    function handleMaxSphereSize(value: SliderValue): void {
        setMaxSphereSize(value as number);
    }; 

    return {
        allNodes,
        showTooltips,
        handleShowTooltips,
        onClickShowTooltips,
        handleOnClickShowTooltips,
        showGlassEffect,
        handleShowGlassEffect,
        showNodeValue,
        handleShowNodeValue,
        showModel,
        handleShowModel,
        nodes,
        setNodes,
        maxSphereSize, 
        handleMaxSphereSize
    }
}