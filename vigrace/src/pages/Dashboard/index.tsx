import Sidebar from "../../components/NavBar";
import BrainModel from "../../components/BrainModel";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Card, CardBody} from "@heroui/react";
import { GlobalContext } from "../../providers/GlobalContext";
import { useState, Suspense } from "react";
import LoadingElement from "../../components/LoadingPage";
export default function Dashboard(){
    const [ambientLight, setAmbientLight] = useState<number>(1);    
    const [downLight, setDownLight] = useState<number>(2);
    const [upLight, setUpLight] = useState<number>(2);
    const [showTooltips, setShowTooltips] = useState<boolean>(false);
    const [onClickShowTooltips, setOnClickShowTooltips] = useState<boolean>(true);
    const [showGlassEffect, setShowGlassEffect] = useState<boolean>(true);
    
    return (
        <div className="flex flex-row min-h-screen bg-background text-foreground overflow-hidden">
            <GlobalContext.Provider value={{
                ambientLight,
                downLight,
                upLight,
                setAmbientLight,
                setDownLight,
                setUpLight,
                showTooltips,
                setShowTooltips, 
                onClickShowTooltips,
                setOnClickShowTooltips,
                showGlassEffect,
                setShowGlassEffect,
            }}>
            <Sidebar >
            <main className="flex flex-col items-center justify-center w-full flex-1 h-[95vh]">
                <div className="w-full h-full flex items-center justify-center">
                <Canvas className="w-auto h-auto">
                    <ambientLight intensity={ambientLight} />
                    <directionalLight position={[10, 10, 10]} intensity={upLight} />
                    <Suspense fallback={<LoadingElement />}>
                    <BrainModel />
                    </Suspense>
                    <directionalLight position={[0, -10, 0]} intensity={downLight} />
                    <OrbitControls />
                </Canvas>
                </div>
            </main>
            <Card className="absolute z-50 bottom-2 right-2 w-[200px]  " isPressable>
                <CardBody>
                    <div className="flex flex-row items-center justify-start gap-2">
                        <div className="bg-teal-700 w-3 h-3 rounded-full" />
                        <h2 className="font-extrabold text-sm">Lobulo Frontal.</h2>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-2">
                        <div className="bg-yellow-400 w-3 h-3 rounded-full" />
                        <h2 className="font-extrabold text-sm">Lobulo Parietal.</h2>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-2">
                        <div className="bg-green-400 w-3 h-3 rounded-full" />
                        <h2 className="font-extrabold text-sm">Lobulo Temporal</h2>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-2">
                        <div className="bg-red-600 w-3 h-3 rounded-full" />
                        <h2 className="font-extrabold text-sm">Occipital</h2>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-2">
                        <div className="bg-red-900 w-3 h-3 rounded-full" />
                        <h2 className="font-extrabold text-sm">Cerebelo</h2>
                    </div>

                </CardBody>
            </Card>
            </Sidebar>
            </GlobalContext.Provider>
        </div>
    );
}
