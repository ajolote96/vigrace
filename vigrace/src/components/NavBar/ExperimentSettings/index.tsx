import { useGlobalContext } from "../../../providers/GlobalContext";
import { Select, SelectItem} from "@heroui/react";

export default function ExperimentSettings(){
    const { data } = useGlobalContext();
    const subjects: string[] = [...new Set(data.map((item) => item.subject as string))];

    return ( 
        <div className="flex flex-col items-start gap-2 justfiy-center w-full">
        <h3 className="font-semibold text-neutral-400 text-small">
            Ajustes del experimento.
        </h3>
        <Select placeholder="Escoge un sujeto." >
            {subjects.map((subject) => (
                <SelectItem key={subject} textValue={subject}>
                    {subject}
                </SelectItem>
            ))}
        </Select>
        <Select placeholder="Tipo de gamma.">
            <SelectItem>Sujeto 0</SelectItem>
            <SelectItem>Sujeto 1</SelectItem>
            <SelectItem>Sujeto 2</SelectItem>
        </Select>
    </div>
    )
}