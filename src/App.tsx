import { Canvas } from '@react-three/fiber'
import { XR, createXRStore } from '@react-three/xr'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import './App.css'

const store = createXRStore()

function App() {

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const textureRef = useRef<THREE.VideoTexture | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)

  useEffect(() => {
    const video = document.createElement('video')
    video.autoplay = true
    video.muted = true
    video.playsInline = true

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream
        video.play()
        videoRef.current = video
        textureRef.current = new THREE.VideoTexture(video)
        meshRef.current!.material.map = textureRef.current
        meshRef.current!.material.needsUpdate = true
      })
      .catch(err => console.error('Error accessing camera: ', err))

    return () => {
      if (videoRef.current) {
        const tracks = (videoRef.current.srcObject as MediaStream)?.getTracks()
        tracks?.forEach((track: MediaStreamTrack) => track.stop())
      }
    }
  }, [])

  return (
    <div id="root">
      <button
        className="enter-ar-button"
        onClick={() => store.enterAR()}
      >
        Enter AR
      </button>
      <Canvas>
        <XR
          store={store}
          {...{
            requiredFeatures: ['camera-access'],
          } as any}
        >
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          <mesh ref={meshRef} position={[0, 0, -5]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial map={textureRef.current} />
          </mesh>
        </XR>
      </Canvas>
    </div>
  )
}

export default App
