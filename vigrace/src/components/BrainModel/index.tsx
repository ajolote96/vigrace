import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";

type Node = {
  position: [number, number, number];
  name: string;
};

type Link = {
  source: string;
  target: string;
};

export default function BrainModel() {
  const model = useLoader(GLTFLoader, "/brain_project.glb");
  const brainRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const [nodes, setNodes] = useState<Node[]>([
    { position: [0, 2.35, 0], name: "Nodo Cz" },
    { position: [0.6, 2.15, 0], name: "Nodo C2" },
    { position: [-0.6, 2.15, 0], name: "Nodo C4" },
    { position: [0.6, 2, -0.6], name: "Nodo P3" },
    { position: [-0.6, 2, -0.6], name: "Nodo P4" },
    { position: [0, 2.15, -0.7], name: "Nodo Pz" },
    { position: [0.6, 2, 0.7], name: "Nodo F3" },
    { position: [-0.6, 2, 0.7], name: "Nodo F4" },
    { position: [-0, 2.2, 0.7], name: "Nodo Fz" },



    
  ]);

  const [links] = useState<Link[]>([
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
  ]);

  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Add new dynamic node on brain click

  // Get node vector by name
  const getNodeVec = (name: string) => {
    const node = nodes.find(n => n.name === name);
    return node ? new THREE.Vector3(...node.position) : null;
  };

  // Render links as cylinders for consistent thickness
  const renderedLinks = useMemo(() => {
    const thickness = 0.02; // adjust radius
    return links.map((link, idx) => {
      const start = getNodeVec(link.source);
      const end = getNodeVec(link.target);
      if (!start || !end) return null;

      // midpoint
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      // direction vector
      const dir = new THREE.Vector3().subVectors(end, start);
      const length = dir.length();
      // align cylinder Y-axis to direction
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
          {activeNode === idx && (
            <Html
              distanceFactor={8}
              className="bg-foreground-400/15 backdrop-safari text-black dark:text-white font-extrabold"
              style={{
                padding: "5px 10px",
                borderRadius: "8px",
                whiteSpace: "nowrap",
                fontSize: "12px",
                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                transform: "translate(-50%, -120%)",
              }}
            >
              {node.name}
            </Html>
          )}
        </group>
      ))}

      {/* Render cylinder links */}
      {renderedLinks}
    </group>
  );
}
