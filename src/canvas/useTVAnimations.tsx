
import { Camera } from "@react-three/fiber";
import gsap from "gsap";
import { NavigateFunction } from "react-router-dom";
import * as THREE from "three"

type lightNeutralProps = {
    intensity : number, duration: number, ease : string
}

  export const continueAnimation = (isContinueClicked : boolean, light : THREE.SpotLight, camera : Camera) =>{
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
            camera.lookAt(target); 
          }
      })
      gsap.to(target, {
        ...lookAtTarget,
        duration: 3,
        ease: "power1.inOut",
        onUpdate: () => {
          camera.lookAt(target);
        }
      })
      
    }
  }

  export const exitAnimation = (isExitClicked : boolean, light : THREE.SpotLight, setIsExitClicked : (arg0 : boolean) => void, navigate : NavigateFunction ) => {
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

  export const onContinueAnimation = (isContinueClicked : boolean , isContinueHovered : boolean , light : THREE.SpotLight, lightNeutral : lightNeutralProps) =>{
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

  export const onExitAnimation = (isExitClicked : boolean, isExitHovered : boolean, light : THREE.SpotLight, lightNeutral : lightNeutralProps) => {
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