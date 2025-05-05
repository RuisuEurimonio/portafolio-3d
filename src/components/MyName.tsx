import * as THREE from "three"
import { Text } from "@react-three/drei";

const MyName = () => {

/*     const titleRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>>(null);
    const subtitleRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>>(null); */

    /* useEffect(()=>{
        if(titleRef.current && subtitleRef.current){
            gsap.to(titleRef.current.material.color, {
                ...new THREE.Color("#c2c2c2"),
                duration: 0.2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            })
            gsap.to(subtitleRef.current.material.color,{
                ...new THREE.Color("#c2c2c2"),
                duration: 0.2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            })
        }
    },[]) */

    return(
        <>
            <Text
                position={[-21, 4, 15]}
                rotation={[0,((-47 * Math.PI)/180),0]}
                fontSize={1}
                material={new THREE.MeshBasicMaterial({ color: '#353535' })}
            > Luis Linares. </Text>
            <Text
                position={[-21, 5, 15]}
                rotation={[0,((-47 * Math.PI)/180),0]}
                fontSize={.8}
                material={new THREE.MeshBasicMaterial({ color: '#353535' })}
            >
                Portafolio.
            </Text>
        </>
    )

}

export default MyName;