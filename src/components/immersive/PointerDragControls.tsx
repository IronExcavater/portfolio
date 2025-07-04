import {useFrame, useThree} from '@react-three/fiber'
import {useEffect, useRef} from 'react'
import {MathUtils, Object3D, Vector3} from 'three'

type PointerDragControlProps = {
    position?: [number, number, number]
    rotation?: [number, number]
    lockPitch?: [number, number] | null
    lockYaw?: [number, number] | null
    dragStrength?: number
    tiltStrength?: number
    damping?: number
}

export default function PointerDragControls({
    position = [0, 0, 0],
    rotation = [0, 0],
    lockPitch = null,
    lockYaw = null,
    dragStrength = 0.002,
    tiltStrength = 0.1,
    damping = 0.9
}: PointerDragControlProps) {
    const camera = useThree((state) => state.camera)

    const isDragging = useRef(false);
    const lastMouse = useRef<[number, number] | null>(null)
    const clipCoords = useRef<[number, number]>([0, 0]) // Normalized [-1, 1]

    const originPos = useRef(new Vector3(...position))
    const originRot = useRef<[number, number]>(rotation)
    const deltaRot = useRef<[number, number]>([0, 0])
    
    const dragTarget = useRef(new Object3D())
    const tiltTarget = useRef(new Object3D())

    const velocity = useRef<[number, number]>([0, 0])

    camera.position.copy(originPos.current)

    useEffect(() => {
        originPos.current.set(...position)
        originRot.current = rotation
        deltaRot.current = [0, 0]
        velocity.current = [0, 0]
    }, [position, rotation]);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1
            const y = (e.clientY / window.innerHeight) * 2 - 1
            clipCoords.current = [x, y]
        }

        window.addEventListener('mousemove', onMove)
        return () => window.removeEventListener('mousemove', onMove)
    }, []);

    useEffect(() => {
        const onPointerDown = (e: MouseEvent) => {
            if (e.button === 2) {
                isDragging.current = true
                lastMouse.current = [e.clientX, e.clientY]
            }
        }

        const onPointerMove = (e: MouseEvent) => {
            if (!isDragging.current || !lastMouse.current) return;

            const [lx, ly] = lastMouse.current
            const [dx, dy] = [e.clientX - lx, e.clientY - ly];

            velocity.current = [-dy * dragStrength, -dx * dragStrength];
            lastMouse.current = [e.clientX, e.clientY];
        }

        const onPointerUp = (e: MouseEvent) => {
            if (e.button === 2) isDragging.current = false
        }

        window.addEventListener('pointerdown', onPointerDown)
        window.addEventListener('pointermove', onPointerMove)
        window.addEventListener('pointerup', onPointerUp)
        window.addEventListener('contextmenu', (e) => e.preventDefault())

        return () => {
            window.removeEventListener('pointerdown', onPointerDown)
            window.removeEventListener('pointermove', onPointerMove)
            window.removeEventListener('pointerup', onPointerUp)
        }
    }, [dragStrength]);

    useFrame(() => {
        deltaRot.current[0] += velocity.current[0]
        deltaRot.current[1] += velocity.current[1]

        if (lockPitch) deltaRot.current[0] = MathUtils.clamp(deltaRot.current[0], lockPitch[0], lockPitch[1])
        if (lockYaw) deltaRot.current[1] = MathUtils.clamp(deltaRot.current[1], lockYaw[0], lockYaw[1])

        const pitch = originRot.current[0] + deltaRot.current[0]
        const yaw = originRot.current[1] + deltaRot.current[1]

        dragTarget.current.rotation.set(0, yaw, 0)
        dragTarget.current.rotateX(pitch)

        tiltTarget.current.rotation.copy(dragTarget.current.rotation)
        tiltTarget.current.rotateY(clipCoords.current[0] * -tiltStrength)
        tiltTarget.current.rotateX(clipCoords.current[1] * -tiltStrength)

        camera.position.lerp(originPos.current, 1 - damping)
        camera.quaternion.slerp(tiltTarget.current.quaternion, 1 - damping)

        velocity.current[0] *= damping
        velocity.current[1] *= damping
    })

    return null
}