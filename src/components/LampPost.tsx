import { useGLTF } from "@react-three/drei";
import { Object3D, SpotLight } from "three";
import { useEffect, useRef } from "react";
import { ThreeEvent } from "@react-three/fiber";

interface LampPostProps {
  customFunctionContinue : (arg : boolean) => void
  customFunctionExit : (arg : boolean) => void
}

const LampPost : React.FC<LampPostProps> = ({customFunctionContinue, customFunctionExit}) => {
  const { scene }  = useGLTF("/lamp_post.glb");
  const light = useRef<SpotLight>(null);
  const targetRef = useRef<Object3D>(new Object3D());

  useEffect(() => {
    if (light.current) {
      targetRef.current.position.set(-21, 9, 21.5); 
      scene.add(targetRef.current);

      light.current.target = targetRef.current;

      return () => {
        scene.remove(targetRef.current);
      };
    }
  }, [scene]);

  const handleClickContinue = (event : ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    customFunctionContinue(true);
}

  const handleClickExit = (event : ThreeEvent<MouseEvent>)  => {
    event.stopPropagation();
    customFunctionExit(true);
  }

  return (
    <>
      <primitive
        object={scene}
        position={[-20, -0.1, 20]}
        rotation={[0, 20, 0]}
        castShadow
        receiveShadow
        onClick={(e : ThreeEvent<MouseEvent>)=>{
                            const clicked = e.intersections[0].object
                            if(clicked.name === "Sing1") handleClickContinue(e)
                            if(clicked.name === "Sing2") handleClickExit(e)
                        }}
      />
      <spotLight
        ref={light}
        castShadow
        position={[-21, 10.3, 21.2]}
        angle={9}
        penumbra={0.5}
        intensity={25}
        distance={12}
      />
    </>
  );
};

export default LampPost;
