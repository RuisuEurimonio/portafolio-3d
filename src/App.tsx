import { Canvas } from '@react-three/fiber'
import './App.css'
import { OrbitControls } from '@react-three/drei'
import Laptop from './laptop'

function App() {

  return (
    <Canvas camera={{position: [0,1,3], fov: 50}} style={{width: "100vw", height: "100vh"}}>
      <ambientLight intensity={5}/>
      <directionalLight position={[2,2,5]} intensity={1} />
      <OrbitControls enableDamping />
      <Laptop />
    </Canvas>
  )
}

export default App
