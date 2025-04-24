import Sidebar from "../../components/NavBar";
import BrainModel from "../../components/BrainModel";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Dashboard(){
    return (
        <div className="flex flex-row min-h-screen bg-background text-foreground">
            <Sidebar >
            <main className="flex flex-col items-center justify-center w-full flex-1">
                <div className="w-full h-[600px] relative">
                    <Canvas className="w-full h-full">
                        <ambientLight intensity={0.5}/>
                        <directionalLight position={[10, 10, 5]} intensity={1}/>
                        <BrainModel />
                        <OrbitControls />
                    </Canvas>
                </div>
            </main>
            </Sidebar>
        </div>
    );
}
