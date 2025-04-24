import {
    Slider,
    Button,
    ButtonGroup,
    Tooltip,
    Switch,
    SelectItem,
    Select,
} from "@heroui/react";
import { FaPowerOff, FaPause as Pause } from "react-icons/fa6";
import { FaCode, FaImage as Image } from "react-icons/fa";
import { useTheme } from "@heroui/use-theme";
import { IoPlaySkipBack as Back, IoPlaySkipForward as Next} from "react-icons/io5";
import type { ReactNode } from "react";


export default function Sidebar({children}: {children: ReactNode}) {
    const { theme, setTheme } = useTheme();

    return (
        <div className="w-full flex flex-col max-h-screen">
            <nav className="flex flex-row items-center px-3 justify-between w-full h-[5vh] bg-foreground-400/10">
                <div className="flex flex-row gap-2">
                    <h1 className="font-extrabold text-xl">Vigrace &bull; Playground</h1>
                </div>
                <div className="flex flex-row items-center justify-between w-auto gap-2">
                    <Switch
                        isSelected={theme === "dark"}
                        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        Modo oscuro
                    </Switch>
                    <Button
                        size="sm"
                        startContent={<Image aria-hidden className="focus:outline-none" />}
                    >
                        Cargar imagen.
                    </Button>
                    <Button
                        size="sm"
                        startContent={<FaCode aria-hidden className="focus:outline-none" />}
                    >
                        Cargar archivo.
                    </Button>
                    <Button
                        variant="flat"
                        size="sm"
                        color="danger"
                        startContent={
                            <FaPowerOff aria-hidden className="focus:outline-none" />
                        }
                    >
                        Cerrar sesión.
                    </Button>
                </div>
            </nav>
            <div className="w-full flex-row items-start justify-start" >
            <aside className="flex flex-col items-center min-h-[95vh] gap-4 justify-start px-3 w-1/6 bg-foreground-400/10  ">
                <Select placeholder="Escoge un sujeto.">
                    <SelectItem>Sujeto 0</SelectItem>
                    <SelectItem>Sujeto 1</SelectItem>
                    <SelectItem>Sujeto 2</SelectItem>
                </Select>
                <ButtonGroup className="mx-auto my-4">
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
                <Slider
                    label="Velocidad"
                    showTooltip
                    minValue={0}
                    maxValue={1}
                    step={0.1}
                    showSteps
                />

                <Slider label="Cuadro actual" />
            </aside>
            {children}
            </div>
        </div>
    );
}
