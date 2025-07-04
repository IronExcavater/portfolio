import {type JSX} from 'react'
import {Canvas} from '@react-three/fiber'
import {useUIStore, type Section} from '../../stores/uiStore.ts'
import Camera from './Camera.tsx'
import Bedroom from './rooms/Bedroom.tsx'
import Arcade from './rooms/Arcade.tsx'
import Office from './rooms/Office.tsx'
import Css3d from './Css3d.tsx'
import Css3dIframe from './Css3dIframe.tsx'

const sectionMap: Record<Section, JSX.Element> = {
    about: <Bedroom />,
    projects: <Arcade />,
    experience: <Office />,
}

export default function Immersive3d() {
    const {section} = useUIStore()

    return (
        <Canvas shadows camera={{ fov: 60, near: 0.1, far: 1000 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Camera />
            <Css3d />

            {sectionMap[section]}
        </Canvas>
    )
}