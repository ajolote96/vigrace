import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { useGlobalContext } from "../../providers/GlobalContext";
import { cn } from "@heroui/react";

type Node = {
  position: [number, number, number];
  name: string;
};

type Link = {
  source: string;
  target: string;
};


function getNodePosition(name: string){
  switch(name){
    case "Cz": 
      return [0, 2.35, 0];
    case "C2":
      return [0.6, 2.15, 0];
    case "C4": 
      return [-0.6, 2.15, 0];
    case "P3": 
      return [0.5, 2.1, -0.6];
    case "P4":
      return [-0.5, 2.1, -0.6];
    case "Pz":
      return [0, 2.15, -0.7];
    case "F3":
      return [0.5, 2.1, 0.6];
    case "F4":
      return [-0.5, 2.1, 0.6];
    case "Fz":
      return [0, 2.25, 0.6];
    case "O1":
      return [0.35, 1.8, -1];
    case "O2":
      return [-0.35, 1.8, -1];
    case "Fp1":
      return [0.4, 1.9, 1];
    case "Fp2": 
      return [-0.4, 1.9, 1];
    case "T3":
      return [1.05, 1.6, 0];
    case "T4":
      return [-1.05, 1.6, 0];
    case "T6":
      return [-1, 1.6, -0.6];
    case "T5":
      return [1, 1.6, -0.6];
    case "F8":
      return [-0.9, 1.55, 0.6];
    case "F7":
      return [0.9, 1.55, 0.6];
    default:
      return [0, 0, 0];
  }
}

export default function BrainModel() {
  const model = useLoader(GLTFLoader, "/brain_project.glb");
  const brainRef = useRef<THREE.Group>(null);
  const { showTooltips, onClickShowTooltips, showGlassEffect, data, nodes: visibleNodes } = useGlobalContext();
  useThree(); 

  const [nodes] = useState<Node[]>([
    { position: [0, 2.35, 0], name: "Nodo Cz" },
    { position: [0.6, 2.15, 0], name: "Nodo C2" },
    { position: [-0.6, 2.15, 0], name: "Nodo C4" },
    { position: [0.5, 2.1, -0.6], name: "Nodo P3" },
    { position: [-0.5, 2.1, -0.6], name: "Nodo P4" },
    { position: [0, 2.15, -0.7], name: "Nodo Pz" },
    { position: [0.5, 2.1, 0.6], name: "Nodo F3" },
    { position: [-0.5, 2.1, 0.6], name: "Nodo F4" },
    { position: [-0, 2.25, 0.6], name: "Nodo Fz" },
    { position: [0.35, 1.8, -1], name: "Nodo O1"},   
    { position: [-0.35, 1.8, -1], name: "Nodo O2"} , 
    { position: [0.4, 1.9, 1], name: "Nodo Fp1" },
    { position: [-0.4, 1.9, 1], name: "Nodo Fp2" },
    { position: [1.05, 1.6, 0], name: "Nodo T3"},
    { position: [-1.05, 1.6, 0], name: "Nodo T4"}, 
    { position: [-1, 1.6, -0.6], name: "Nodo T6"}, 
    { position: [1, 1.6, -0.6], name: "Nodo T5"}, 
    { position: [-0.9, 1.55, 0.6], name: "Nodo F8" },
    { position: [0.9, 1.55, 0.6], name: "Nodo F7" },
  ]);

  const links: Link[] = [
    { source: "Nodo Cz", target: "Nodo C2" },
    { source: "Nodo Cz", target: "Nodo C4" },
    { source: "Nodo C2", target: "Nodo P3" },
    { source: "Nodo Pz", target: "Nodo P4" },
    { source: "Nodo Pz", target: "Nodo P3" },
    { source: "Nodo Pz", target: "Nodo Cz" },
    { source: "Nodo P4", target: "Nodo C4" },
    { source: "Nodo F3", target: "Nodo C2" },
    { source: "Nodo Fz", target: "Nodo Cz" },
    { source: "Nodo F4", target: "Nodo C4" },
    { source: "Nodo F4", target: "Nodo Fz" },
    { source: "Nodo Fz", target: "Nodo F3" },
    { source: "Nodo O1", target: "Nodo P3" },
    { source: "Nodo O2", target: "Nodo P4" },
    { source: "Nodo Fp1", target: "Nodo F3" },
    { source: "Nodo Fp2", target: "Nodo F4" },
    { source: "Nodo T4", target: "Nodo C4"}, 
    { source: "Nodo T3", target: "Nodo C2"},
    { source: "Nodo T5", target: "Nodo P3"}, 
    { source: "Nodo T3", target: "Nodo T5"},
    { source: "Nodo T4", target: "Nodo T6"}, 
    { source: "Nodo T6", target: "Nodo P4"},
    { source: "Nodo F7", target: "Nodo F3" },
    { source: "Nodo F8", target: "Nodo F4" }, 
    { source: "Nodo F8", target: "Nodo T4" }, 
    { source: "Nodo F7", target: "Nodo T3" }
  ];

  const [activeNode, setActiveNode] = useState<number | null>(null);

  

  
  const getNodeVec = (name: string) => {
    const node = nodes.find(n => n.name === name);
    return node ? new THREE.Vector3(...node.position) : null;
  };

  const currentNodes = useMemo(() => {
    if (visibleNodes.length === 0) return nodes; 
    return data.filter(node => visibleNodes.includes(node.electrode));
  }, [data, visibleNodes]);

  
  const renderedLinks = useMemo(() => {
    const thickness = 0.02; 
    return links.map((link, idx) => {
      const start = getNodeVec(link.source);
      const end = getNodeVec(link.target);
      if (!start || !end) return null;

      
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      
      const dir = new THREE.Vector3().subVectors(end, start);
      const length = dir.length();
      
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.clone().normalize()
      );

      return (
        <mesh key={idx} position={mid.toArray()} quaternion={quaternion.toArray()}>
          <cylinderGeometry args={[thickness, thickness, length, 8]} />
          <meshStandardMaterial color={0x00aaff} />
        </mesh>
      );
    });
  }, [nodes, links]);

  return (
    <group ref={brainRef}>
      <primitive
        object={model.scene}
        scale={2}
        onPointerMissed={() => setActiveNode(null)}
      />

      {/* Render nodes */}
      {nodes.map((node, idx) => (
        <group key={idx} position={node.position}>
          <mesh
            onClick={e => {
              e.stopPropagation();
              setActiveNode(idx);
            }}
            onPointerOver={e => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={e => {
              e.stopPropagation();
              document.body.style.cursor = "auto";
            }}
          >
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="lightgray" />
          </mesh>
          {((onClickShowTooltips && activeNode === idx) || showTooltips) && (
            <Html
              distanceFactor={8}
              className={cn(
              "bg-foreground-400 px-2 py-1 text-nowrap text-sm shadow-2xl border-1 rounded-xl dark:border-white  border-black text-black dark:text-white font-extrabold", 
              showGlassEffect && "backdrop-safari bg-foreground-400/15"
              )}   
              style={{
                transform: "translate(-50%, -120%)",
              }}
            >
              {node.name}
            </Html>
          )}
        </group>
      ))}

      {renderedLinks}
    </group>
  );
}
