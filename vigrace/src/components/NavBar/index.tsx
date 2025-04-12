import {
    Navbar,
    NavbarContent,
    NavbarItem,
    NavbarBrand,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    DropdownSection,
    Button,
    Slider,
    Popover,
    PopoverContent,
    PopoverTrigger,
    ButtonGroup,
    Tooltip,
} from "@heroui/react";
import { FaCode as Code } from "react-icons/fa6";
import { IoMdSettings as Settings } from "react-icons/io";
import {
    MdOutlinePowerSettingsNew as Out,
    MdSkipNext as Next,
    MdSkipPrevious as Previous,
} from "react-icons/md";
import {
    FaImages as Image,
    FaPlay as Play,
    FaStop as Stop,
} from "react-icons/fa";

export default function NavBar() {
    return (
        <Navbar isBlurred isBordered>
            <NavbarBrand>
                <h2 className="font-extrabold text-2xl">VIGRACE</h2>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavbarItem className="flex items-center gap-2 w-full">
                    <ButtonGroup>
                        <Tooltip content="Retroceder" showArrow>
                            <Button isIconOnly aria-label="Retroceder">
                                <Previous aria-hidden className="text-2xl" />
                            </Button>
                        </Tooltip>
                        <Tooltip content="Detener/Reanudar" showArrow>
                        <Button isIconOnly aria-label="Stop/Continue">
                            <Play aria-hidden />
                        </Button>
                        </Tooltip>
                        <Tooltip content="Avanzar" showArrow>
                        <Button isIconOnly aria-label="Stop/Continue">
                            <Next aria-hidden className="text-2xl" />
                        </Button>
                        </Tooltip>
                    </ButtonGroup>
                    <Popover showArrow>
                        <PopoverTrigger>
                            <Button
                                isIconOnly
                                aria-label="Configuracion de reproducción"
                                variant="flat"
                                color="primary"
                            >
                                <Settings />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col items-center justify-center gap-2 min-w-[300px]">
                            <Slider label="Reproducción" showTooltip />
                            <Slider
                                step={1}
                                minValue={1}
                                maxValue={10}
                                label="Cuadro"
                                showSteps
                            />
                        </PopoverContent>
                    </Popover>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Dropdown showArrow backdrop="blur" classNames={{
                        backdrop: "backdrop-safari"
                    }}>
                        <DropdownTrigger>
                            <Button variant="shadow" color="primary">
                                Acciones
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownSection title="Acciones" showDivider>
                                <DropdownItem key="load" startContent={<Code aria-hidden />}>
                                    Cargar archivo JSON.
                                </DropdownItem>
                                <DropdownItem key="image" startContent={<Image aria-hidden />}>
                                    Capturar imagen.
                                </DropdownItem>
                                <DropdownItem
                                    key="settings"
                                    startContent={<Settings aria-hidden />}
                                >
                                    Configuraciones
                                </DropdownItem>
                            </DropdownSection>
                            <DropdownSection title="Más">
                                <DropdownItem
                                    key="logout"
                                    color="danger"
                                    variant="flat"
                                    startContent={<Out aria-hidden />}
                                >
                                    Cerrar sesión
                                </DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
