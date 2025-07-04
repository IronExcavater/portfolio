import {useEffect} from 'react'
import {useCameraStore, type CameraTarget} from '../../../stores/cameraStore.ts'

const targets: CameraTarget[] = [
    {
        id: 'root',
        position: [0, 1, 2],
        rotation: [0, 0],
    },
    {
        id: 'poster',
        position: [1, 1.2, 0],
        rotation: [0, Math.PI / 2],
    }
]

export default function Office() {
    const {addTarget, clearTargets, moveTo} = useCameraStore()

    useEffect(() => {
        clearTargets()
        targets.forEach(target => addTarget(target.id, target))
        moveTo('root')
    }, [addTarget, clearTargets, moveTo])

    return (
        <mesh position={[0, 1, 0]} onClick={() => useCameraStore.getState().moveTo('arcade')}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
        </mesh>
    )
}