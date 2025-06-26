import {useFrame, useThree} from '@react-three/fiber'
import {useCameraStore} from '../stores/cameraStore.ts'
import {useRef} from 'react'
import {Euler, Vector3} from 'three'

export function Camera() {
    const camera = useThree((state) => state.camera)
    const { currentNodeId, nodes } = useCameraStore()
    const targetRef = useRef({
        position: new Vector3(),
        rotation: new Euler(),
    })

    useFrame(() => {
        const node = nodes[currentNodeId]
        if (!node) return

        // Lerp to new position
        targetRef.current.position.set(...node.position)
        camera.position.lerp(targetRef.current.position, 0.1)

        if (node.rotation) {
            targetRef.current.rotation.set(...node.rotation)
            camera.rotation.x += (targetRef.current.rotation.x - camera.rotation.x) * 0.1
            camera.rotation.y += (targetRef.current.rotation.y - camera.rotation.y) * 0.1
            camera.rotation.z += (targetRef.current.rotation.z - camera.rotation.z) * 0.1
        }
    })

    return null
}