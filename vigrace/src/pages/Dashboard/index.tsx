import Sidebar from "../../components/NavBar";
import BrainModel from "../../components/BrainModel";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Card, CardBody } from "@heroui/react";
import { GlobalContext } from "../../providers/GlobalContext";
import { useState, Suspense } from "react";
import LoadingElement from "../../components/LoadingPage";
import type { Data } from "../../types/types";
import type { Selection } from "@heroui/react";
import useStore from "../../store";
import translations from "../../translations";
export default function Dashboard() {
  const [ambientLight, setAmbientLight] = useState<number>(1);
  const [downLight, setDownLight] = useState<number>(2);
  const [upLight, setUpLight] = useState<number>(2);
  const [showTooltips, setShowTooltips] = useState<boolean>(false);
  const [onClickShowTooltips, setOnClickShowTooltips] = useState<boolean>(true);
  const [showGlassEffect, setShowGlassEffect] = useState<boolean>(true);
  const [data, setData] = useState<Data[]>([] as Data[]);
  const [nodes, setNodes] = useState<string[]>([] as string[]);
  const [subject, setSubject] = useState<Selection>(new Set([]));
  const [frequency, setFrequency] = useState<string>("");
  const [stage, setStage] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showNodeValue, setShowNodeValue] = useState<boolean>(true);
  const [showModel, setShowModel] = useState<boolean>(true);
  const [maxValue, setMaxValue] = useState<number>(0);
  const [maxSphereSize, setMaxSphereSize] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const language = useStore((state) => state.language);
  return (
    <div className="flex flex-row min-h-screen bg-background text-foreground overflow-hidden">
      <GlobalContext.Provider
        value={{
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
          data,
          setData,
          nodes,
          setNodes,
          subject,
          setSubject,
          currentIndex,
          setCurrentIndex,
          frequency,
          setFrequency,
          stage,
          setStage,
          showNodeValue,
          setShowNodeValue,
          setShowModel,
          showModel,
          maxValue,
          setMaxValue,
          maxSphereSize,
          setMaxSphereSize,
          isPlaying,
          setIsPlaying,
          speed,
          setSpeed,
        }}
      >
        <Sidebar>
          <main className="flex flex-col items-center justify-center w-full flex-1 h-[95vh]">
            <div className="w-full h-full flex items-center justify-center">
              {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center w-[500px] font-sans h-full">
                  <h1 className="font-extrabold text-3xl text-nowrap">
                    {translations[language].noDataTitle}
                  </h1>
                  <p className="font-semibold text-center text-nowrap">
                    {translations[language].noDataDescription}
                  </p>
                </div>
              ) : (
                Array.from(subject).map((sub, index: number) => (
                  <div key={index} className="w-full h-full relative flex items-center justify-center overflow-x-hidden">
                  <p className="font-extrabold text-2xl absolute top-2">
                    <span className="font-semibold text-neutral-400">{translations[language].subject}: </span>
                    {sub}
                    </p>
                  <Canvas
                    className={
                      index === 1
                        ? "border-l-1 dark:border-gray-700 border-gray-200 w-full"
                        : ""
                    }
                    key={index}
                  >
                    <ambientLight intensity={ambientLight} />
                    <directionalLight
                      position={[10, 10, 10]}
                      intensity={upLight}
                    />
                    <Suspense fallback={<LoadingElement />}>
                      <BrainModel subject={sub as string} key={index} />
                    </Suspense>
                    <directionalLight
                      position={[0, -10, 0]}
                      intensity={downLight}
                    />
                    <OrbitControls />
                  </Canvas>
                  <div className="w-full bottom-3 items-center flex justify-center absolute  flex-col">

                    <p className="font-semibold text-lg">
                      <span className="text-neutral-400">{translations[language].stage}: </span>
                      {stage}
                      </p>
                    <p className="font-semibold text-lg">
                      <span className="text-neutral-400">{translations[language].frequency}: </span> 
                      {frequency}</p>
                    
                  </div>
                  </div>
                ))
              )}
            </div>
          </main>
          <Card
            className="absolute z-50 bottom-2 right-2 w-[200px]  "
            isPressable
          >
            <CardBody>
              <div className="flex flex-row items-center justify-start gap-2">
                <div className="bg-teal-700 w-3 h-3 rounded-full" />
                <h2 className="font-extrabold text-sm">{translations[language].frontalLobe}</h2>
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <div className="bg-yellow-400 w-3 h-3 rounded-full" />
                <h2 className="font-extrabold text-sm">{translations[language].parietalLobe}</h2>
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <div className="bg-green-400 w-3 h-3 rounded-full" />
                <h2 className="font-extrabold text-sm">{translations[language].temporalLobe}</h2>
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <div className="bg-red-600 w-3 h-3 rounded-full" />
                <h2 className="font-extrabold text-sm">{translations[language].occipitalLobe}</h2>
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <div className="bg-red-900 w-3 h-3 rounded-full" />
                <h2 className="font-extrabold text-sm">{translations[language].cerebellum}</h2>
              </div>
            </CardBody>
          </Card>
        </Sidebar>
      </GlobalContext.Provider>
    </div>
  );
}
