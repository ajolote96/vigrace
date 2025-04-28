import { useProgress, Html } from "@react-three/drei";
import { Progress } from "@heroui/react";

export default function LoadingElement() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="dark:text-white text-xl min-w-[500px] text-white flex flex-col items-center justify-center gap-2">
        <h1 className="font-extrabold">Descargando modelo...</h1>
        <Progress
          label="Porcentaje de descarga"
          showValueLabel
          value={progress}
        />
      </div>
    </Html>
  );
}
