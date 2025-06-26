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
import useStore from "../../../store";
import translations from "../../../translations";
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
    const language = useStore((state) => state.language);
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div className="flex flex-col items-start gap-2 justify-between w-full">
            <h2 className="font-semibold text-neutral-400 text-start w-full text-small">
               {translations[language].nodeSettings}
            </h2>
            <Section
                title={translations[language].tooltipTitle}
                description={translations[language].tooltipDescription}
                value={showTooltips}
                onChange={handleShowTooltips}
            />
            <Section
                title={translations[language].clickTitle}
                description={translations[language].clickDescription}
                value={onClickShowTooltips}
                onChange={handleOnClickShowTooltips}
            />
            <Section
                title={translations[language].blurTitle}
                description={translations[language].blurDescription}
                value={showGlassEffect}
                onChange={handleShowGlassEffect}
            />
            <Section
                title={translations[language].showNodeValue}
                description={translations[language].showNodeValueDescription}
                value={showNodeValue}
                onChange={handleShowNodeValue}
            />
            <Section
                title={translations[language].showModel}
                description={translations[language].showModelDescription}
                value={showModel}
                onChange={handleShowModel}
            />
            <Divider className="my-2" />
            <Slider
                value={maxSphereSize}
                onChange={handleMaxSphereSize}
                label={translations[language].maxValue}
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
                {translations[language].hideNodes}
            </Button>
            <Drawer isOpen={isOpen} onClose={onClose} size="xs">
                <DrawerContent>
                    {() => (
                        <>
                            <DrawerHeader>{translations[language].hideNodes}</DrawerHeader>
                            <DrawerBody className="overflow-y-auto">
                                <Card className="dark:border-gray-700 border-gray-200 border-1">
                                    <CardHeader>
                                        <h2 className="font-extrabold text-lg">{language === "en" ? "Visible nodes" : "Nodos visibles"}</h2>
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
                                    {translations[language].saveChanges}
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    );
}
