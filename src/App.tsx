import { Canvas } from '@react-three/fiber'
import { XR, createXRStore } from '@react-three/xr'
import './App.css'

const store = createXRStore()

function App() {

  return (
    <div id="root">
      <button
        className="enter-ar-button"
        onClick={() => store.enterAR()}
      >
        Enter AR
      </button>
      <Canvas>
        <XR store={store}>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'orange'} />
          </mesh>
        </XR>
      </Canvas>
    </div>
  )
}

export default App
