import { useGLTF } from "@react-three/drei";
import { Object3D, SpotLight, SpotLightHelper } from "three";
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

const LampPost = () => {
  const gltf = useGLTF("/lamp_post.glb");
  const light = useRef<SpotLight>(null);
  const targetRef = useRef<Object3D>(new Object3D());
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    if (light.current) {
      targetRef.current.position.set(-21, 9, 21.5); 
      scene.add(targetRef.current);

      light.current.target = targetRef.current;

      const helper = new SpotLightHelper(light.current);
      scene.add(helper);

      return () => {
        scene.remove(helper);
        scene.remove(targetRef.current);
      };
    }
  }, [scene]);

  return (
    <>
      <primitive
        object={gltf.scene}
        position={[-20, -0.1, 20]}
        rotation={[0, 20, 0]}
        castShadow
        receiveShadow
      />
      <spotLight
        ref={light}
        castShadow
        position={[-21, 10.5, 21.2]}
        angle={9}
        penumbra={0.5}
        intensity={15}
        distance={10}
      />
    </>
  );
};

export default LampPost;
