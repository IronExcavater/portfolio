import { useCameraStore } from '../stores/cameraStore.ts'
import { useCursor, Text } from '@react-three/drei'
import { useState } from 'react'

export function NavigationHotspots() {
    const { currentNodeId, nodes, setCurrentNode } = useCameraStore()
    const currentNode = nodes[currentNodeId]
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    useCursor(!!hoveredId)

    if (!currentNode) return null

    return (
        <>
            {currentNode.connectedNodeIds.map((targetId) => {
                const target = nodes[targetId]
                if (!target) return null

                return (
                    <mesh
                        key={target.id}
                        position={target.position}
                        onPointerOver={() => setHoveredId(target.id)}
                        onPointerOut={() => setHoveredId(null)}
                        onClick={() => setCurrentNode(target.id)}
                    >
                        <sphereGeometry args={[0.15, 16, 16]} />
                        <meshStandardMaterial color={hoveredId === target.id ? 'orange' : 'skyblue'} emissiveIntensity={1} emissive={hoveredId === target.id ? 'yellow' : 'black'} />
                        <Text
                            position={[0, 0.3, 0]}
                            fontSize={0.2}
                            color="white"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {target.label || 'Go'}
                        </Text>
                    </mesh>
                )
            })}
        </>
    )
}
