import {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    addToast,
    Kbd,
} from "@heroui/react";
import { useGlobalContext } from "../../../providers/GlobalContext";
import { parse } from "papaparse";
import { FaCode } from "react-icons/fa";
import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { Data } from "../../../types/types";

export default function LoadFile() {
    const { setData } = useGlobalContext();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false); 

    function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
        const file = event.target.files?.[0];
    }

    return (
        <Popover backdrop="opaque" showArrow isOpen={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger>
                <Button
                    size="sm"
                    startContent={<FaCode aria-hidden className="focus:outline-none" />}
                >
                    Cargar archivo.
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 flex flex-col gap-1 items-start">
                <h2 className="font-semibold text-start w-full text-lg">
                    Importante. Leer con atencion
                </h2>
                <p>
                    Para poder cargar un archivo, es necesario que sea un archivo{" "}
                    <Kbd>CSV</Kbd>. Y además, debe tener las siguientes cabeceras:
                </p>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1 border-l-1 px-2">
                        <h3 className="text-small font-semibold">ELECTRODE</h3>
                        <p className="text-neutral-400 text-tiny">
                            Todos los nodos que se usuaron en el experimento.
                        </p>
                    </div>
                    <div className="flex flex-col gap-1 border-l-1 px-2">
                        <h3 className="text-small font-semibold">DEGREE</h3>
                        <p className="text-neutral-400 text-tiny">
                            Grado de correlación.
                        </p>
                    </div>
                    <div className="flex flex-col gap-1 border-l-1 px-2">
                        <h3 className="text-small font-semibold">SUBJECT</h3>
                        <p className="text-neutral-400 text-tiny">
                            Sujetos diferentes que se usaron en el experimento.
                        </p>
                    </div>
                    <div className="flex flex-col gap-1 border-l-1 px-2">
                        <h3 className="text-small font-semibold">FREQUENCY</h3>
                        <p className="text-neutral-400 text-tiny">
                            Tipos de frecencias que se usaron en el experimento.
                        </p>
                    </div>
                </div>
                <Button className="w-full" variant="flat" size="sm" color="primary" onPress={() => inputRef.current?.click()}>
                    Cargar archivo
                </Button>
                <input
                type="file"
                accept=".csv"
                hidden
                ref={inputRef}
                onChange={handleFileChange}
            />
            </PopoverContent>

        </Popover>
    );
}
