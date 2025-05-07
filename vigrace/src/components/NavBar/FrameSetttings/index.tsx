import { Slider, type SliderValue, Tooltip } from "@heroui/react";
import { useGlobalContext } from "../../../providers/GlobalContext";
import type { ChangeEvent, KeyboardEvent } from "react";

export default function FrameSettings(){
    const { ambientLight, setAmbientLight, upLight, setUpLight, downLight, setDownLight } = useGlobalContext();
    function handleAmbientLight(value: SliderValue): void {
        setAmbientLight(value as number);
    }
    function handleUpLight(value: SliderValue): void {
        setUpLight(value as number);
    }
    function handleDownLight(value: SliderValue): void {
        setDownLight(value as number);
    }
    return ( 
        <>
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
                        onChange={handleAmbientLight}
                        value={ambientLight}
                        showTooltip
                        renderValue={({children, ...props}) => (
                            <output {...props}>
                              <Tooltip
                                className="text-tiny text-default-500 rounded-md"
                                content="Presiona enter para cambiar el cuadro"
                                placement="left"
                              >
                                <input
                                  aria-label="Cuadro actual"
                                  className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                                  type="text"
                                />
                              </Tooltip>
                            </output>
                          )}
                    />
                    <Slider
                        label="Intensidad de la luz superior"
                        minValue={0.5}
                        maxValue={2.5}
                        step={0.1}
                        value={upLight}
                        onChange={handleUpLight}
                        showTooltip
                    />
                    <Slider
                        label="Intensidad de la luz inferior"
                        minValue={0.5}
                        maxValue={2.5}
                        step={0.1}
                        value={downLight}
                        onChange={handleDownLight}
                        showTooltip
                    />
        </>
    )
}