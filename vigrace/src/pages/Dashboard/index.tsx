import Sidebar from "../../components/NavBar";
import BrainModel from "../../components/BrainModel";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Card, CardBody} from "@heroui/react";
export default function Dashboard(){
    return (
        <div className="flex flex-row min-h-screen bg-background text-foreground overflow-hidden">
            <Sidebar >
            <main className="flex flex-col items-center justify-center w-full flex-1 h-[95vh]">
                <div className="w-full h-full flex items-center justify-center">
                <Canvas className="w-auto h-auto">
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <BrainModel />
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
        </div>
    );
}
