import {useUIStore, type Section} from '../../stores/uiStore.ts'

import About from './About'
import Projects from './Projects'

const sectionMap: Record<Section, JSX.Element> = {
    about: <About />,
    projects: <Projects />,
}

export default function Classic2D() {
    const {section} = useUIStore()

    return (
        <div>
            {sectionMap[section]}
        </div>
    )
}