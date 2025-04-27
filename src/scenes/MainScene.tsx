import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { CanvasTexture, Mesh, MeshBasicMaterial, SpotLight } from "three";

interface MainSceneProps {
    hovered : boolean
}

const MainScene : React.FC<MainSceneProps> = ({hovered}) => {

    const {scene} = useGLTF("/retropc.glb")
    const screenRef = useRef<Mesh>(null);
    const lightRef = useRef<SpotLight>(null);

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512
    const ctx = canvas.getContext("2d");
    if(ctx){
        ctx.fillStyle = "black"
        ctx.fillRect( 100 , 100 , canvas.width, canvas.height)
        ctx.fillStyle = "white"
        ctx.font = "15px sans-serif"
        ctx.fillText("Haz clic aqui", 30, 50)
    }

    const texture = new CanvasTexture(canvas);

    scene.traverse((child)=>{
        if(child.name === "Screen1"){
            if(child instanceof Mesh){
                child.material = new MeshBasicMaterial({map: texture})
                screenRef.current = child;
            }
        }
    })

    const handleClick = (event : ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        alert("Pantalla clicleada")
    }

    useEffect(()=>{
        const light = lightRef.current;

        if(hovered){
            gsap.to(light, {
                intensity: 0.2 + Math.random(), 
                duration: 0.1 + Math.random() * 0.3,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            })
        }
    },[hovered])

    return(
        <>
            <primitive
                object={scene}
                onClick={(e : ThreeEvent<MouseEvent>)=>{
                    const clicked = e.intersections[0].object
                    if(clicked.name === "Screen1") handleClick(e)
                }}
            />
            <spotLight
                ref={lightRef}
                position={[0, 10, 0]}
                angle={0.8}
                penumbra={0.5}
                intensity={20}
                castShadow
            />
        </>
    )

}

export default MainScene;