import {
    Card,
    CardBody,
    Switch,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    Button,
    useDisclosure,
    Checkbox,
    CheckboxGroup,
    CardHeader,
    Divider,
    Slider,
} from "@heroui/react";
import useNodeSettings from "./utils";
import { AiOutlineNodeIndex as Node } from "react-icons/ai";

interface SectionProps {
    title: string;
    description?: string;
    value: boolean;
    onChange: () => void;
}

function Section({ title, description, value, onChange }: SectionProps) {
    return (
        <Card className="w-full">
            <CardBody className="flex flex-row items-center gap-2 justify-between p-2">
                <div className="flex flex-col items-start gap-1 justify-center">
                    <h3 className="font-semibold tex-sm">{title}</h3>
                    <p className="text-tiny text-neutral-400">{description}</p>
                </div>
                <Switch
                    isSelected={value}
                    onChange={onChange}
                    aria-label="Cambiar el valor"
                />
            </CardBody>
        </Card>
    );
}

export default function NodeSettings() {
    const {
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
        handleMaxSphereSize,
    } = useNodeSettings();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div className="flex flex-col items-start gap-2 justify-between w-full">
            <h2 className="font-semibold text-neutral-400 text-start w-full text-small">
                Ajustes de los nodos.
            </h2>
            <Section
                title="Mostrar los tooltips"
                description="Muestra el nombre de todos los nodos"
                value={showTooltips}
                onChange={handleShowTooltips}
            />
            <Section
                title="Clicks habilitados"
                description="Permite que al hacer click en un nodo de muestra su nombre."
                value={onClickShowTooltips}
                onChange={handleOnClickShowTooltips}
            />
            <Section
                title="Efecto de desenfoque."
                description="Muestra un efecto traslucido en los nodos. Deshabilitarlo puede mejorar el rendimiento."
                value={showGlassEffect}
                onChange={handleShowGlassEffect}
            />
            <Section
                title="Mostrar los valores del nodo."
                description="Muestra el valor del nodo en el tooltip. "
                value={showNodeValue}
                onChange={handleShowNodeValue}
            />
            <Section
                title="Mostrar modelo 3D"
                description="Muestra el modelo del cerebro 3D. "
                value={showModel}
                onChange={handleShowModel}
            />
            <Divider className="my-2" />
            <Slider
                value={maxSphereSize}
                onChange={handleMaxSphereSize}
                label="Tamaño maximo del nodo"
                step={0.1}
                minValue={0.5}
                maxValue={2}
                showTooltip
            />
            <Button
                className="w-full"
                variant="flat"
                startContent={<Node aria-hidden className="focus:outline-none" />}
                onPress={onOpen}
            >
                Ocultar/Mostrar nodos.
            </Button>
            <Drawer isOpen={isOpen} onClose={onClose} size="xs">
                <DrawerContent>
                    {() => (
                        <>
                            <DrawerHeader>Ocultar o mostrar nodos.</DrawerHeader>
                            <DrawerBody className="overflow-y-auto">
                                <Card className="dark:border-gray-700 border-gray-200 border-1">
                                    <CardHeader>
                                        <h2 className="font-extrabold text-lg">Nodos visibles.</h2>
                                    </CardHeader>
                                    <CardBody className=" flex flex-col items-start justify-center gap-2">
                                        {allNodes.length === 0 ? (
                                            <p className="text-neutral-400 w-full text-center">
                                                No hay nodos disponibles.
                                            </p>
                                        ) : (
                                            <CheckboxGroup
                                                onChange={setNodes}
                                                value={nodes.length > 0 ? nodes : allNodes}
                                            >
                                                {allNodes.map((node) => (
                                                    <Checkbox key={node} value={node}>
                                                        {node}
                                                    </Checkbox>
                                                ))}
                                            </CheckboxGroup>
                                        )}
                                    </CardBody>
                                </Card>
                            </DrawerBody>
                            <DrawerFooter>
                                <Button className="w-full" onPress={onClose}>
                                    Guardar cambios.
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    );
}
