import { useGlobalContext } from "../../../providers/GlobalContext";
import { Select, SelectItem} from "@heroui/react";
import {useState, useEffect, type ChangeEvent} from "react";

export default function ExperimentSettings(){
    const { data, setSubject, setFrequency, setStage } = useGlobalContext();
    const subjects: string[] = [...new Set(data.map((item) => item.subject as string))];
    const gammaTypes: string[] = [...new Set(data.map((item) => item.frequency as string))];
    const stages: string[] = [...new Set(data.map((item) => item.stages as string))];
    const [selectedKeys, setSelectedKeys] = useState<{first: string, second: string, thrid: string}>({
        first: "", 
        second: "",
        thrid: "",
    }); 

    useEffect(() => {
        if (subjects.length > 0) {
            setSelectedKeys((prev) => ({ ...prev, first: subjects[0] }));
        }
        if (gammaTypes.length > 0) {
            setSelectedKeys((prev) => ({ ...prev, second: gammaTypes[0] }));
        }
        if (stages.length > 0) {
            setSelectedKeys((prev) => ({ ...prev, thrid: stages[0] }));
        }
    }, [data]); 

    function handleSubjectChange(event: ChangeEvent<HTMLSelectElement>): void {
        const selectedSubject = event.target.value;
        setSubject(selectedSubject);
        setSelectedKeys((prev) => ({ ...prev, first: selectedSubject }));
    }

    function handleGammaTypeChange(event: ChangeEvent<HTMLSelectElement>): void {
        const selectedGammaType = event.target.value;
        setFrequency(selectedGammaType);
        setSelectedKeys((prev) => ({ ...prev, second: selectedGammaType }));
    }

    function handleStageChange(event: ChangeEvent<HTMLSelectElement>): void {
        const selectedStage = event.target.value;
        setStage(selectedStage);
        setSelectedKeys((prev) => ({ ...prev, thrid: selectedStage }));
    }

    return ( 
        <div className="flex flex-col items-start gap-2 justify-center w-full">
        <h3 className="font-semibold text-neutral-400 text-small">
            Ajustes del experimento.
        </h3>
        <Select placeholder="Escoge un sujeto." selectedKeys={[selectedKeys.first]} onChange={handleSubjectChange} >
            {subjects.map((subject) => (
                <SelectItem key={subject} textValue={subject}>
                    {subject}
                </SelectItem>
            ))}
        </Select>
        <Select placeholder="Tipo de gamma." selectedKeys={[selectedKeys.second]} onChange={handleGammaTypeChange}>
            {gammaTypes.map((gammaType) => (
                <SelectItem key={gammaType} textValue={gammaType}>
                    {gammaType}
                </SelectItem>
            ))}
        </Select>
        <Select placeholder="Etapa del experimento." selectedKeys={[selectedKeys.thrid]} onChange={handleStageChange}>
            {stages.map((stage) => (
                <SelectItem key={stage} textValue={stage}>
                    {stage}
                </SelectItem>
            ))}
        </Select>
    </div>
    )
}