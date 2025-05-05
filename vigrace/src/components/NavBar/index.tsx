import {
    Slider,
    Button,
    ButtonGroup,
    Tooltip,
    Switch,
    SelectItem,
    Select,
    Divider,
    Card, 
    CardBody
} from "@heroui/react";
import { FaPowerOff, FaPause as Pause } from "react-icons/fa6";
import { FaCode, FaImage as Image } from "react-icons/fa";
import { useTheme } from "@heroui/use-theme";
import {
    IoPlaySkipBack as Back,
    IoPlaySkipForward as Next,
} from "react-icons/io5";
import { TbLayoutSidebarLeftCollapseFilled as Layout } from "react-icons/tb";
import type { ReactNode } from "react";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useGlobalContext } from "../../providers/GlobalContext";
import type { SliderValue } from "@heroui/react";

export default function Sidebar({ children }: { children: ReactNode }) {
    const { theme, setTheme } = useTheme();
    const {
        ambientLight,
        downLight,
        upLight,
        setAmbientLight,
        setDownLight,
        setUpLight,
        showTooltips,
        setShowTooltips,
        onClickShowTooltips,
        setOnClickShowTooltips,
    } = useGlobalContext();
    const [isOpen, setIsOpen] = useState<boolean>(true);

    function handleToggle(): void {
        setIsOpen((prev: boolean) => !prev);
    }

    const sidebarVariants: Variants = {
        open: {
            width: "16.6666667%",
            display: "flex",
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
        closed: {
            display: "none",
            width: 0,
        },
    };

    const mainCotenntVarianst: Variants = {
        open: {
            width: "83.3333333%",
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
        closed: {
            width: "100%",
        },
    };

    function handleShowTooltips(): void {
        setShowTooltips((prev: boolean) => !prev);
    }

    function handleOnClickShowTooltips(): void {
        setOnClickShowTooltips((prev: boolean) => !prev);
    }

    return (
        <div className="w-full flex flex-col max-h-screen">
            <nav className="flex flex-row items-center px-3 py-2 justify-between w-full h-[5vh] bg-foreground-400/10">
                <div className="flex flex-row gap-2 items-center">
                    <Tooltip content="Colapsar barra lateral">
                        <Button isIconOnly variant="flat" onPress={handleToggle}>
                            <Layout aria-hidden className="focus:outline-none text-2xl" />
                        </Button>
                    </Tooltip>
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
            <div className="flex flex-row w-full h-[94vh] bg-background text-foreground">
                <motion.aside
                    animate={isOpen ? "open" : "closed"}
                    variants={sidebarVariants}
                    data-open={isOpen}
                    className="flex border-r-1 overflow-hidden  dark:border-gray-800 border-gray-200 flex-col items-center min-h-[94vh] gap-4 justify-start px-3 xl:max-w-1/6 max-w-1/5 bg-foreground-400/10  "
                >
                    <Select placeholder="Escoge un sujeto.">
                        <SelectItem>Sujeto 0</SelectItem>
                        <SelectItem>Sujeto 1</SelectItem>
                        <SelectItem>Sujeto 2</SelectItem>
                    </Select>
                    <ButtonGroup className="mx-auto my-4 ">
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
                    <Divider />
                    <h2 className="font-semibold w-full text-start text-small text-neutral-400">
                        Ajustes de cuadros.
                    </h2>
                    <Slider
                        label="Velocidad"
                        showTooltip
                        minValue={0}
                        maxValue={1}
                        step={0.1}
                        showSteps
                    />

                    <Slider label="Cuadro actual" />
                    <Slider
                        label="Intesidad de la luz ambiental"
                        minValue={0.3}
                        maxValue={1.5}
                        step={0.1}
                        color="secondary"
                        onChange={(value: SliderValue) => setAmbientLight(value as number)}
                        value={ambientLight}
                        showTooltip
                    />
                    <Slider
                        label="Intensidad de la luz superior"
                        minValue={0.5}
                        maxValue={2.5}
                        step={0.1}
                        value={upLight}
                        onChange={(value: SliderValue) => setUpLight(value as number)}
                        showTooltip
                    />
                    <Slider
                        label="Intensidad de la luz inferior"
                        minValue={0.5}
                        maxValue={2.5}
                        step={0.1}
                        value={downLight}
                        onChange={(value: SliderValue) => setDownLight(value as number)}
                        showTooltip
                    />
                    <Divider />
                    <div className="flex flex-col items-start gap-2 justify-between w-full">
                        <h2 className="font-semibold text-neutral-400 text-start w-full text-small">
                            Ajustes de los nodos.
                        </h2>
                        <Switch isSelected={showTooltips} onChange={handleShowTooltips}>
                            Mostrar nombre de los nodos.
                        </Switch>
                        <Switch
                            isSelected={onClickShowTooltips}
                            onChange={handleOnClickShowTooltips}
                        >
                            Información del nodo al hacer click.
                        </Switch>
                    </div>
                </motion.aside>
                <motion.div
                    variants={mainCotenntVarianst}
                    animate={isOpen ? "open" : "closed"}
                    className="flex flex-col w-full h-full bg-background text-foreground"
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
}
