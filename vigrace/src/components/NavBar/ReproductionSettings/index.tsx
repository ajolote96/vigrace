import { ButtonGroup, Button, Tooltip } from "@heroui/react";
import {
    IoPlaySkipBack as Back,
    IoPlaySkipForward as Next,
} from "react-icons/io5";
import { FaPause as Pause } from "react-icons/fa6";

export default function ReproductionSettings() {
    return (
        <ButtonGroup className="mx-auto my-2">
            <Tooltip content="Pasar al cuadro anterior">
                <Button isIconOnly>
                    <Back aria-hidden />
                </Button>
            </Tooltip>
            <Tooltip content="Pausar">
                <Button isIconOnly>
                    <Pause aria-hidden />
                </Button>
            </Tooltip>
            <Tooltip content="Pasar al cuadro siguiente">
                <Button isIconOnly>
                    <Next aria-hidden />
                </Button>
            </Tooltip>
        </ButtonGroup>
    );
}
