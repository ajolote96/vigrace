import { Slider, type SliderValue, Tooltip } from "@heroui/react";
import { useGlobalContext } from "../../../providers/GlobalContext";
import { useState, useEffect } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";

export default function FrameSettings() {
    const {
        ambientLight,
        setAmbientLight,
        upLight,
        setUpLight,
        downLight,
        setDownLight,
        setCurrentIndex,
        currentIndex,
        speed, 
        setSpeed, 
    } = useGlobalContext();
    const [currentFrame, setCurrentFrame] = useState<number>(0);
    function handleAmbientLight(value: SliderValue): void {
        setAmbientLight(value as number);
    }
    function handleUpLight(value: SliderValue): void {
        setUpLight(value as number);
    }
    function handleDownLight(value: SliderValue): void {
        setDownLight(value as number);
    }

    function handleChangeCurrentIndex(value: SliderValue): void {
        setCurrentIndex(value as number);
        setCurrentFrame(value as number);
    }

    function handleChangeCurrentFrame(event: ChangeEvent<HTMLInputElement>): void {
        const newValue: number = parseInt(event.target.value);
        if (!isNaN(newValue)) {
            setCurrentFrame(newValue);
            return;
        }
        setCurrentFrame(0);
    }

    useEffect(() => {
        setCurrentFrame(currentIndex);
    }, [currentIndex])

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
        if (event.key === "Enter") {
            const newValue: number = parseInt(event.currentTarget.value);
            if (!isNaN(newValue)) {
                setCurrentIndex(newValue);
            }
        }
    }

    function handleChangeSpeed(value: SliderValue): void {
        setSpeed(value as number);
    }


    return (
        <>
            <h2 className="font-semibold w-full text-start text-small text-neutral-400">
                Ajustes de cuadros.
            </h2>
            <Slider
                label="Velocidad"
                showTooltip
                minValue={0.2}
                maxValue={2}
                step={0.1}
                value={speed}
                onChange={handleChangeSpeed}
                renderValue={({ children, ...props }) => (
                    <output {...props}>
                        <span className="text-tiny font-semibold">
                            {speed}x
                        </span>
                    </output>
                )}
                showSteps
            />

            <Slider
                label="Cuadro actual"
                minValue={0}
                maxValue={12}
                value={currentIndex}
                onChange={handleChangeCurrentIndex}
                renderValue={({ children, ...props }) => (
                    <output {...props}>
                        <Tooltip
                            className="text-tiny text-default-500 rounded-md"
                            content="Presiona enter para cambiar el cuadro"
                            placement="left"
                        >
                            <input
                                value={currentFrame}
                                onChange={handleChangeCurrentFrame}
                                onKeyDown={handleKeyDown}
                                aria-label="Cuadro actual"
                                className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                                type="text"
                            />
                        </Tooltip>
                    </output>
                )}
            />
            <Slider
                label="Intesidad de la luz ambiental"
                minValue={0.3}
                maxValue={1.5}
                step={0.1}
                color="secondary"
                onChange={handleAmbientLight}
                value={ambientLight}
                showTooltip
            />
            <Slider
                label="Intensidad de la luz superior"
                minValue={0.5}
                maxValue={2.5}
                step={0.1}
                value={upLight}
                onChange={handleUpLight}
                showTooltip
            />
            <Slider
                label="Intensidad de la luz inferior"
                minValue={0.5}
                maxValue={2.5}
                step={0.1}
                value={downLight}
                onChange={handleDownLight}
                showTooltip
            />
        </>
    );
}
