import { Canvas } from '@react-three/fiber'
import './styles/app.css'
import Camera from './components/Camera'
import {useEffect} from 'react'
import {useCameraStore} from './stores/cameraStore'

export default function App() {
    useEffect(() => {
        const addTarget = useCameraStore.getState().addTarget
        addTarget('main', {
            position: [0, 1, 2],
            rotation: [0, 0],
            lockYaw: [-Math.PI / 2, Math.PI / 2],
        })
        addTarget('arcade', {
            position: [0, 2, 1],
            rotation: [0, Math.PI / 2],
            lockPitch: [-Math.PI / 2, Math.PI / 2],
        })

    }, []);

    return (
        <Canvas shadows camera={{ fov: 60, near: 0.1, far: 1000 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />

            <Camera />

            <mesh position={[0, 1, 0]} onClick={() => useCameraStore.getState().moveTo('arcade')}>
                <boxGeometry />
                <meshStandardMaterial color="skyblue" />
            </mesh>
        </Canvas>
    )
}