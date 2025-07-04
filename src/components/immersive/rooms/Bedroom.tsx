import {useEffect} from 'react'
import {useCameraStore, type CameraTarget} from '../../../stores/cameraStore.ts'

const targets: CameraTarget[] = [
    {
        id: 'root',
        position: [0, 1, 0],
        rotation: [0, 0],
    },
    {
        id: 'computer',
        position: [0, 1, -2],
        rotation: [0, 0],
    }
]

export default function Bedroom() {
    const {addTarget, clearTargets, moveTo} = useCameraStore()

    useEffect(() => {
        clearTargets()
        targets.forEach(target => addTarget(target.id, target))
        moveTo('root')
    }, [addTarget, clearTargets, moveTo])

    return (
        <mesh position={[0, 1, -3]} onClick={() => useCameraStore.getState().moveTo('poster')}>
            <boxGeometry />
            <meshStandardMaterial color="skyblue" />
        </mesh>
    )
}