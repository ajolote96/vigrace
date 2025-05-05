import { Card, CardBody, Switch, Divider } from "@heroui/react";
import { useGlobalContext } from "../../../providers/GlobalContext";

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
        showTooltips,
        setShowTooltips,
        onClickShowTooltips,
        setOnClickShowTooltips,
    } = useGlobalContext();
    function handleShowTooltips(): void {
        setShowTooltips((prev: boolean) => !prev);
    }

    function handleOnClickShowTooltips(): void {
        setOnClickShowTooltips((prev: boolean) => !prev);
    }
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
        </div>
    );
}
