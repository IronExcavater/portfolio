import {useEffect} from 'react'
import {useCameraStore, type CameraTarget} from '../../../stores/cameraStore.ts'
import Css3dIframe from '../Css3dIframe.tsx'

const targets: CameraTarget[] = [
    {
        id: 'root',
        position: [0, 1, 2],
        rotation: [0, 0],
    },
    {
        id: 'arcade',
        position: [1, 1.2, 0],
        rotation: [0, Math.PI / 2],
    }
]

export default function Arcade() {
    const {addTarget, clearTargets, moveTo} = useCameraStore()

    useEffect(() => {
        clearTargets()
        targets.forEach(target => addTarget(target.id, target))
        moveTo('root')
    }, [addTarget, clearTargets, moveTo])

    return (
        <>
            <Css3dIframe url="https://itch.io/embed-upload/14168129" position={[0, 1, 0]} />
            <mesh position={[0, 1, 0]} onClick={() => useCameraStore.getState().moveTo('arcade')}>
                <boxGeometry />
                <meshStandardMaterial color="yellow" />
            </mesh>
        </>
    )
}