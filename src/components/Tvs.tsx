import { useGLTF } from "@react-three/drei";
import { ThreeEvent, useThree } from "@react-three/fiber";
import * as THREE from "three"
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CanvasTexture, Mesh, MeshBasicMaterial, SpotLight } from "three";

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
  const screenRef = useRef<Mesh>(null);
  const lightRef = useRef<SpotLight>(null);
  const light = lightRef.current;

  const lightNeutral = {
    intensity: 4,
    duration: 0.3,
    ease: "power1.inOut",
  };

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(100, 100, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "15px sans-serif";
    ctx.fillText("Haz clic aqui", 30, 50);
  }

  const texture = new CanvasTexture(canvas);

  scene.traverse((child) => {
    if (child.name === "Screen1") {
      if (child instanceof Mesh) {
        child.material = new MeshBasicMaterial({ map: texture });
        screenRef.current = child;
      }
    }
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    alert("Pantalla clicleada");
  };

  const continueAnimation = () =>{
    if(!light) return;

    const target = new THREE.Vector3(0, 0, 0);

    const lookAtTarget = { x: 0, y: 2.2, z: 0 };

    gsap.killTweensOf(light, "intensity")

    if (isContinueClicked) {
      gsap.to(light, {
        intensity: 20,
        duration: 0.3,
        ease: "back.inOut",
      });
      gsap.to(camera.position,{
        x: .4,
        y: 5,
        z: 8,
        duration: 3,
        ease: "power1.inOut",
        onUpdate: () => {
            camera.lookAt(target); // Mientras se mueve, sigue mirando al objetivo actual
          }
      })
      gsap.to(target, {
        ...lookAtTarget,
        duration: 3,
        ease: "power1.inOut",
        onUpdate: () => {
          camera.lookAt(target); // Actualiza el objetivo mientras cambia
        }
      })
      
    }
  }

  const exitAnimation = () => {
    if(!light) return;

    

    if (isExitClicked) {
      gsap.to(light, {
        intensity: 0,
        duration: 3,
        ease: "power1.inOut",
      });

      const timeOut = setTimeout(() => {
        setIsExitClicked(false);
        navigate("/plane");
      }, 3000);

      return () => clearTimeout(timeOut);
    }
  } 

  const onContinueAnimation = () =>{
    if(!light || isContinueClicked) return;

    gsap.killTweensOf(light, "intensity");

    if (isContinueHovered) {
      gsap.to(light, {
        intensity: 20 + Math.random(),
        duration: 0.1 + Math.random() * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    } else {
      gsap.to(light, lightNeutral);
    }
  }

  const onExitAnimation = () => {
    if(!light || isExitClicked) return;

    gsap.killTweensOf(light, "intensity");
    
    if (isExitHovered) {
      gsap.to(light, {
        intensity: 10 + Math.random(),
        duration: 0.1 + Math.random() * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    } else {
      gsap.to(light, lightNeutral);
    }
  }

  useEffect(() => {
    continueAnimation();
  }, [isContinueClicked]);

  useEffect(() => {
    exitAnimation();
  }, [isExitClicked]);

  useEffect(() => {
    onContinueAnimation();
  }, [isContinueHovered]);

  useEffect(() => {
    onExitAnimation();
  }, [isExitHovered]);

  return (
    <>
      <primitive
        object={scene}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          const clicked = e.intersections[0].object;
          if (clicked.name === "Screen1") handleClick(e);
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
