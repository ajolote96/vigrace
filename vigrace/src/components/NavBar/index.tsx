import {
    Button,
    Tooltip,
    Switch,
    SelectItem,
    Select,
    Divider,
} from "@heroui/react";
import { FaPowerOff } from "react-icons/fa6";
import { FaImage as Image } from "react-icons/fa";
import { useTheme } from "@heroui/use-theme";
import ReproductionSettings from "./ReproductionSettings";
import { TbLayoutSidebarLeftCollapseFilled as Layout } from "react-icons/tb";
import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import useNavbarVariants from "./variants";
import NodeSettings from "./NodeSettings";
import FrameSettings from "./FrameSetttings";
import LoadFile from "./LoadFile";

export default function Sidebar({ children }: { children: ReactNode }) {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [sidebarVariants, mainCotenntVarianst] = useNavbarVariants();
    function handleToggle(): void {
        setIsOpen((prev: boolean) => !prev);
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
                    <LoadFile />
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
                    className="flex border-r-1 overflow-y-hidden  dark:border-gray-800 border-gray-200 flex-col items-center min-h-[94vh] gap-4 justify-start px-3 xl:max-w-1/6 max-w-1/5 bg-foreground-400/10  "
                >
                    <div className="flex flex-col items-start gap-2 justfiy-center w-full">
                        <h3 className="font-semibold text-neutral-400 text-small">
                            Ajustes del experimento.
                        </h3>
                        <Select placeholder="Escoge un sujeto.">
                            <SelectItem>Sujeto 0</SelectItem>
                            <SelectItem>Sujeto 1</SelectItem>
                            <SelectItem>Sujeto 2</SelectItem>
                        </Select>
                        <Select placeholder="Tipo de gamma.">
                            <SelectItem>Sujeto 0</SelectItem>
                            <SelectItem>Sujeto 1</SelectItem>
                            <SelectItem>Sujeto 2</SelectItem>
                        </Select>
                    </div>
                    <Divider />
                    <ReproductionSettings />
                    <Divider />
                    <FrameSettings />
                    <Divider />
                    <NodeSettings />
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
