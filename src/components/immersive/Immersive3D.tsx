import Camera from './Camera.tsx'
import {Canvas} from '@react-three/fiber'
import {useUIStore} from '../../stores/uiStore'

import Bedroom from './rooms/Bedroom'
import Arcade from './rooms/Arcade'
import Office from './rooms/Office'

const sectionMap: Record<Section, JSX.Element> = {
    about: <Bedroom />,
    projects: <Arcade />,
    experience: <Office />,
}

export default function Immersive3D() {
    const {section} = useUIStore()

    return (
        <Canvas shadows camera={{ fov: 60, near: 0.1, far: 1000 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Camera />

            {sectionMap[section]}
        </Canvas>
    )
}