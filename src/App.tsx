import { Canvas } from '@react-three/fiber'
import { Camera } from './components/Camera.tsx'
import { NavigationHotspots } from './components/CameraNode.tsx'
import { useEffect } from 'react'
import { useCameraStore } from './stores/cameraStore.ts'

const NODES = [
    {
        id: 'bedroom.entry',
        position: [0, 1.6, 0] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number],
        label: 'Entry Point',
        connectedNodeIds: ['bedroom.desk'],
        roomId: 'bedroom',
    },
    {
        id: 'bedroom.desk',
        position: [2, 1.6, 0] as [number, number, number],
        rotation: [0, -Math.PI / 2, 0] as [number, number, number],
        label: 'Desk',
        connectedNodeIds: ['bedroom.entry'],
        roomId: 'bedroom',
    },
]

export default function App() {
    const registerNodes = useCameraStore((s) => s.registerNodes)
    useEffect(() => {
        registerNodes(NODES)
    }, [])

    return (
        <Canvas shadows camera={{ fov: 60, near: 0.1, far: 1000 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Camera />
            <NavigationHotspots />
        </Canvas>
    )
}