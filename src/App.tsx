import './styles/app.css'
import {useUIStore} from './stores/uiStore.ts'
import Menu from './components/shared/Menu.tsx'
import Classic2d from './components/classic/Classic2d.tsx'
import Immersive3d from './components/immersive/Immersive3d.tsx'

export default function App() {
    const {mode} = useUIStore()

    return (
        <>
            <Menu />
            {mode === 'classic' && <Classic2d />}
            {mode === 'immersive' && <Immersive3d />}
        </>
    )
}