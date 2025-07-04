import {type JSX} from 'react'
import {useUIStore, type Section} from '../../stores/uiStore.ts'
import About from './sections/About.tsx'
import Projects from './sections/Projects.tsx'

const sectionMap: Record<Section, JSX.Element> = {
    about: <About />,
    projects: <Projects />,
}

export default function Classic2d() {
    const {section} = useUIStore()

    return (
        <div>
            {sectionMap[section]}
        </div>
    )
}