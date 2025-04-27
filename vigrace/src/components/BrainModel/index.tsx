import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export default function BrainModel(){
    const model = useLoader(GLTFLoader, "/brain_project.glb");
    
    return ( 
        <primitive object={model.scene} scale={2} />
    )
}