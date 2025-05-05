import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import LampPost from "../components/LampPost";
import { OrbitControls, Sparkles } from "@react-three/drei";
import MyName from "../components/MyName";
import { useState } from "react";
import Tvs from "../components/Tvs";

const MainScene = () => {
  const [isContinueClicked, setIsContinueClicked] = useState<boolean>(false);
  const [isExitClicked, setIsExitClicked] = useState<boolean>(false);
  const [isContinueHovered, setIsContinueHovered] = useState<boolean>(false);
  const [isExitHovered, setIsExitHovered] = useState<boolean>(false);

  return (
    <Canvas
      camera={{ position: [-24, 8, 22.5], fov: 50 }}
      style={{ width: "100vw", height: "100vh" }}
      onCreated={({ gl }) => {
        gl.setClearColor("#000000");
      }}
      shadows
    >
      <EffectComposer>
        <Noise opacity={0.05} />
      </EffectComposer>
      <ambientLight intensity={0.05} />
      <Tvs
        isContinueClicked={isContinueClicked}
        isExitClicked={isExitClicked}
        setIsExitClicked={setIsExitClicked}
        isContinueHovered={isContinueHovered}
        isExitHovered={isExitHovered}
      />
      <LampPost
        customFunctionContinue={setIsContinueClicked}
        customFunctionExit={setIsExitClicked}
        customFunctionInContinue={setIsContinueHovered}
        customFunctionInExit={setIsExitHovered}
      />
      <Sparkles count={100} scale={[10, 10, 10]} speed={0.5} />
      <MyName />
      <OrbitControls />
    </Canvas>
  );
};

export default MainScene;
