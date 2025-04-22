import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useRef } from "react";
import { CanvasTexture, Mesh, MeshBasicMaterial } from "three";

function Laptop() {

    const {scene} = useGLTF("/pc2.glb")
    const screenRef = useRef<Mesh>(null);

    const canvas = document.createElement('canvas');
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext("2d");
    if(ctx){
        ctx.fillStyle = "black"
        ctx.fillRect(0,0,512,512)
        ctx.fillStyle = "white"
        ctx.font = "30px sans-serif"
        ctx.fillText("Haz clic aqui", 70, 100)
    }

    const texture = new CanvasTexture(canvas);

    scene.traverse((child)=>{
        if(child.name === "Screen"){
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

    return(
        <primitive
            object={scene}
            onClick={(e : ThreeEvent<MouseEvent>)=>{
                const clicked = e.intersections[0].object
                if(clicked.name === "Screen") handleClick(e)
             }}
        />
    )

}

export default Laptop;