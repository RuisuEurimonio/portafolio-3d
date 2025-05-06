import { useGLTF } from "@react-three/drei";
import { Object3D, SpotLight } from "three";
import { useEffect, useRef } from "react";
import { ThreeEvent } from "@react-three/fiber";

interface LampPostProps {
  customFunctionContinue : (arg : boolean) => void
  customFunctionExit : (arg : boolean) => void
  customFunctionInContinue : (arg : boolean) => void 
  customFunctionInExit : (arg : boolean) => void
}

const LampPost : React.FC<LampPostProps> = ({customFunctionContinue, customFunctionExit, customFunctionInContinue, customFunctionInExit}) => {
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

  const handleHoverInContinue = (event : ThreeEvent<PointerEvent>, status : boolean) => {
    event.stopPropagation();
    customFunctionInContinue(status)
  }

  const handleHoverInExit = (event : ThreeEvent<PointerEvent>, status : boolean) => {
    event.stopPropagation();
    customFunctionInExit(status);
  }

  const changeCursor = (status : boolean) => {
    if(status){
      document.body.style.cursor = "pointer"
    } else {
      document.body.style.cursor = "default"
    }
  }

  return (
    <>
      <primitive
        object={scene}
        position={[-20, -0.1, 20]}
        rotation={[0, 20, 0]}
        castShadow
        receiveShadow
      />
      <mesh 
        name="Sing1"
        position={[-18.2, 6.25, 20.4]}
        rotation={[0,-.33,0]}
        onClick={(e: ThreeEvent<MouseEvent>)=>{
          handleClickContinue(e);
        }}
        onPointerOver={(e : ThreeEvent<PointerEvent>)=>{
          changeCursor(true);
          handleHoverInContinue(e, true);
        }}
        onPointerOut={(e: ThreeEvent<PointerEvent>)=>{
          changeCursor(false);
          handleHoverInContinue(e, false);
        }}  
      > 
        <boxGeometry  args={[.1,.32,1.2]}/>
        <meshStandardMaterial color={"#f2f"}  opacity={0} transparent={true}/>
      </mesh>
      <mesh 
        name="Sing2"
        position={[-18.2, 5.6, 20.55]}
        rotation={[0,10.09,0]}
        onClick={(e: ThreeEvent<MouseEvent>)=>{
          handleClickExit(e);
        }}
        onPointerOver={(e : ThreeEvent<PointerEvent>)=>{
          changeCursor(true);
          handleHoverInExit(e, true);
        }}
        onPointerOut={(e: ThreeEvent<PointerEvent>)=>{
          changeCursor(false);
          handleHoverInExit(e, false);
        }}  
      > 
        <boxGeometry  args={[.1,.32,1.2]}/>
        <meshStandardMaterial color={"#f2f"}  opacity={0} transparent={true}/>
      </mesh>
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
