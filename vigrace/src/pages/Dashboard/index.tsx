import Sidebar from "../../components/NavBar";
import BrainModel from "../../components/BrainModel";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

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
            </Sidebar>
        </div>
    );
}
