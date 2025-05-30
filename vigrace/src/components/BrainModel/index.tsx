import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { useGlobalContext } from "../../providers/GlobalContext";
import { cn } from "@heroui/react";
import { links, getNodePosition, useBrainModel } from "./utils";

function getSize(degree: number, maxValue: number, maxSize: number): number {
  return (degree / maxValue / 10) * maxSize;
}

function getColor(percentage: number): string {
  const colors = [
    "#0000ff", 
    "#00ffff", 
    "#00ff00", 
    "#ffff00", 
    "#ff0000", 
  ];

  const clamp = (num: number, min: number, max: number) =>
    Math.max(min, Math.min(num, max));

  const hexToRgb = (hex: string) => {
    const clean = hex.replace("#", "");
    const bigint = parseInt(clean, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  const rgbToHex = (r: number, g: number, b: number): string =>
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");

  const numSegments = colors.length - 1;
  const t = clamp(percentage, 0, 1) * numSegments;
  const segment = Math.floor(t);
  const localT = t - segment;

  const startColor = hexToRgb(colors[segment]);
  const endColor = hexToRgb(colors[segment + 1]);

  const r = startColor.r + (endColor.r - startColor.r) * localT;
  const g = startColor.g + (endColor.g - startColor.g) * localT;
  const b = startColor.b + (endColor.b - startColor.b) * localT;

  return rgbToHex(r, g, b);
}

export default function BrainModel({subject}: {subject?: string}) {
  const model = useLoader(GLTFLoader, "/brain_project.glb");
  const brainRef = useRef<THREE.Group>(null);
  const {
    showTooltips,
    onClickShowTooltips,
    showGlassEffect,
    data,
    nodes: visibleNodes,
    currentIndex,
    showNodeValue,
    showModel,
    maxValue,
    maxSphereSize,
  } = useGlobalContext();
  const { nodes, scenes, setActiveNode, getNodeVec, activeNode } = useBrainModel(data, currentIndex, visibleNodes, subject);

  const renderedLinks = useMemo(() => {
    const thickness = 0.02;
    return links.map((link, idx) => {
      const start = getNodeVec(link.source);
      const end = getNodeVec(link.target);
      if (!start || !end) return null;

      const mid = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5);

      const dir = new THREE.Vector3().subVectors(end, start);
      const length: number = dir.length();

      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.clone().normalize()
      );

      return (
        <mesh
          key={idx}
          position={mid.toArray()}
          quaternion={quaternion.toArray()}
        >
          <cylinderGeometry args={[thickness, thickness, length, 8]} />
          <meshStandardMaterial color={0x00aaff} />
        </mesh>
      );
    });
  }, [nodes, links]);


  return data.length === 0 ? (
    <Html center>
      <div className="flex flex-col items-center justify-center w-[500px] font-sans h-full">
        <h1 className="font-extrabold text-3xl">
          No has cargado información aún
        </h1>
        <p className="font-semibold text-center">
          Empieza subiendo un archivo desde la barra de navegación.
        </p>
      </div>
    </Html>
  ) : (
    <>
    <group ref={brainRef}>

      {showModel && (
        <primitive
          object={model.scene}
          scale={2}
          onPointerMissed={() => setActiveNode(null)}
        />
      )}

      {scenes
      [currentIndex]
        ?.map((node, idx) => (
          <group key={idx} position={getNodePosition(node.electrode)}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                setActiveNode(idx);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "auto";
              }}
            >
              <sphereGeometry
                args={[getSize(node.degree, maxValue, maxSphereSize), 16, 16]}
              />
              <meshStandardMaterial color={getColor(node.degree / maxValue)} />
            </mesh>
            {((onClickShowTooltips && activeNode === idx) || showTooltips) && (
              <Html
                distanceFactor={8}
                className={cn(
                  "bg-foreground-400 px-2 py-1 text-nowrap text-sm shadow-2xl border-1 rounded-lg dark:border-white  border-black text-black dark:text-white font-extrabold",
                  showGlassEffect && "backdrop-safari bg-foreground-400/15"
                )}
                style={{
                  transform: "translate(-50%, -120%)",
                }}
              >
                <p className="text-center">{`Nodo ${node.electrode}`}</p>
                {showNodeValue && (
                  <p className="font-semibold text-sm text-center">
                    {parseFloat(node.degree.toString()).toFixed(2)}
                  </p>
                )}
              </Html>
            )}
          </group>
        ))}

      {renderedLinks}
    </group>
    </>
  );
}
