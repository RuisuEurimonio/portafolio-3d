import { Canvas } from '@react-three/fiber'
import './App.css'
import { OrbitControls } from '@react-three/drei'
import MainScene from './MainScene'

function App() {

  return (
    <Canvas camera={{position: [-10,10,20], fov: 50}} style={{width: "100vw", height: "100vh"}}
    onCreated={({ gl }) => {
      gl.setClearColor('#0c0010 ')
    }}
    >
      <ambientLight intensity={1}/>
      <directionalLight position={[0, 1, 0]} intensity={3} />
      <OrbitControls />
      <MainScene />
    </Canvas>
  )
}

export default App
