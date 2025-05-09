import { useGLTF } from "@react-three/drei";
import { ThreeEvent, useThree } from "@react-three/fiber";
import * as THREE from "three"
import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CanvasTexture, Mesh, MeshBasicMaterial, SpotLight } from "three";
import { continueAnimation, exitAnimation, onContinueAnimation, onExitAnimation } from "../canvas/useTVAnimations";

interface MainSceneProps {
  isContinueClicked: boolean;
  isExitClicked: boolean;
  setIsExitClicked: (arg: boolean) => void;
  isContinueHovered: boolean;
  isExitHovered: boolean;
}

const Tvs: React.FC<MainSceneProps> = ({
  isContinueClicked,
  isExitClicked,
  setIsExitClicked,
  isContinueHovered,
  isExitHovered,
}) => {
  const navigate = useNavigate();
  const { camera } = useThree();
  const { scene } = useGLTF("/retropc.glb");
  const lightRef = useRef<SpotLight>(null);
  const light = lightRef.current;

  const lightNeutral = {
    intensity: 4,
    duration: 0.3,
    ease: "power1.inOut",
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    alert("Pantalla clicleada");
  };


  useEffect(() => {
    if(!light) return;
    continueAnimation(isContinueClicked, light, camera);
  }, [isContinueClicked]);

  useEffect(() => {
    if(!light) return;
    exitAnimation(isExitClicked, light, setIsExitClicked, navigate);
  }, [isExitClicked]);

  useEffect(() => {
    if(!light) return;
    onContinueAnimation(isContinueClicked, isContinueHovered, light, lightNeutral);
  }, [isContinueHovered]);

  useEffect(() => {
    if(!light) return;
    onExitAnimation(isExitClicked, isExitHovered, light, lightNeutral);
  }, [isExitHovered]);

  const arrayCanvas = useMemo(()=>{
    return Array.from({length: 9}, ()=>{
      const canvas = document.createElement("canvas");
      canvas.width = 225;
      canvas.height = 225;
      return canvas;
    })
  },[])

  const drawCanvas = (canvas : HTMLCanvasElement, text : string) => {
    const ctx = canvas.getContext("2d");
    if(!ctx) return;

    ctx.fillStyle = "#f2f";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "20px sans-serif";
    ctx.fillText(text, 0 , 0)
  }

  useEffect(()=>{
    scene.traverse((child)=>{
      if(child instanceof Mesh){
        
        for(let i = 0 ; i < 9 ; i++){
          const screenName = `Screen${i+1}`;
          if(child.name == screenName){
            drawCanvas(arrayCanvas[i], screenName);
            const texture = new CanvasTexture(arrayCanvas[i]);
            texture.needsUpdate = true;
            child.material = new MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
            break;
          }
        }
      }
    })
  },[scene])

  return (
    <>
      <primitive
        object={scene}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          const clicked = e.intersections[0].object;
          if (clicked.name === "Screen9") handleClick(e);
        }}
      />
      <spotLight
        ref={lightRef}
        position={[0, 10, 0]}
        angle={0.8}
        penumbra={0.5}
        intensity={4}
        castShadow
      />
    </>
  );
};

export default Tvs;
