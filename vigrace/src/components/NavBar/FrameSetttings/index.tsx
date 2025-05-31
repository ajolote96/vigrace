import { Slider, type SliderValue } from "@heroui/react";
import { useGlobalContext } from "../../../providers/GlobalContext";
import useStore from "../../../store";
import translations from "../../../translations";
export default function FrameSettings() {
    const {
        ambientLight,
        setAmbientLight,
        upLight,
        setUpLight,
        downLight,
        setDownLight,
    } = useGlobalContext();
    const language = useStore((state) => state.language);
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
                {translations[language].frameSettings}
            </h2>

            <Slider
                label={translations[language].lightIntensity}
                minValue={0.3}
                maxValue={1.5}
                step={0.1}
                color="secondary"
                onChange={handleAmbientLight}
                value={ambientLight}
                showTooltip
            />
            <Slider
                label={translations[language].lightUpIntensity}
                minValue={0.5}
                maxValue={2.5}
                step={0.1}
                value={upLight}
                onChange={handleUpLight}
                showTooltip
            />
            <Slider
                label={translations[language].lightDownIntensity}
                minValue={0.5}
                maxValue={2.5}
                step={0.1}
                value={downLight}
                onChange={handleDownLight}
                showTooltip
            />
        </>
    );
}
