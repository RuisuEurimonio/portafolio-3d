import { Canvas } from "@react-three/fiber";
import "./App.css";
import { OrbitControls } from "@react-three/drei";
import MainScene from "./MainScene";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import LampPost from "./lamp";

function App() {
  return (
    <Canvas
      camera={{ position: [-10, 10, 20], fov: 50 }}
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
      <spotLight
        position={[0, 10, 0]}
        angle={0.8}
        penumbra={0.5}
        intensity={20}
        castShadow
      />
      
    
      <OrbitControls />
      <MainScene />
      <LampPost />
    </Canvas>
  );
}

export default App;
