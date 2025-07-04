import {useCameraStore} from '../../stores/cameraStore.ts'
import PointerDragControls from './PointerDragControls.tsx'

export default function Camera() {
    const targetId = useCameraStore((state) => state.currentTarget)
    const target = useCameraStore((state) => state.targets[targetId])
    if (!target) return null

    return (
        <PointerDragControls
            position={target.position}
            rotation={target.rotation}
            lockPitch={target.lockPitch ?? [-Math.PI / 2, Math.PI / 2]}
            lockYaw={target.lockYaw}
        />
    )
}