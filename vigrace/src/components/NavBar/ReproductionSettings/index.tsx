import { ButtonGroup, Button, Tooltip } from "@heroui/react";
import {
    IoPlaySkipBack as Back,
    IoPlaySkipForward as Next,
} from "react-icons/io5";
import { FaStop as Stop, FaPlay as Play } from "react-icons/fa";
import { useEffect } from "react";
import { useGlobalContext } from "../../../providers/GlobalContext";
export default function ReproductionSettings() {
    const { isPlaying, setIsPlaying, setCurrentIndex, speed, data } = useGlobalContext();

    function handleGoBack(): void {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }

    function handleGoNext(): void {
        setCurrentIndex((prev) => prev + 1);
    }
    function handlePlay(): void {
        setIsPlaying((prev) => !prev);
    }

    useEffect(() => {
        if (isPlaying){
            const interval = setInterval(() => {
                setCurrentIndex((prev) => prev + 1);
            }, 1000 / speed);
            return () => clearInterval(interval);
        }
    }, [isPlaying, speed]);

    return (
        <ButtonGroup className="mx-auto my-2" isDisabled={data.length === 0}>
            <Tooltip content="Pasar al cuadro anterior">
                <Button
                    isIconOnly
                    onPress={handleGoBack}
                    aria-label="Pasar al cuadro anterior"
                >
                    <Back aria-hidden />
                </Button>
            </Tooltip>
            <Tooltip content={isPlaying ? "Pausar" : "Reproducir"}>
                <Button isIconOnly onPress={handlePlay} aria-label="Pausar">
                    {isPlaying ? <Stop aria-hidden /> : <Play aria-hidden />}
                </Button>
            </Tooltip>
            <Tooltip content="Pasar al cuadro siguiente">
                <Button
                    isIconOnly
                    onPress={handleGoNext}
                    aria-label="Pasar al cuadro siguiente"
                >
                    <Next aria-hidden />
                </Button>
            </Tooltip>
        </ButtonGroup>
    );
}
