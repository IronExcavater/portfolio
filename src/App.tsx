import './styles/app.css'
import {useUIStore} from './stores/uiStore'
import Menu from './components/shared/Menu.tsx'
import Classic2D from './components/classic/Classic2D'
import Immersive3D from './components/immersive/Immersive3D'

export default function App() {
    const {mode} = useUIStore()

    return (
        <>
            <Menu />
            {mode === 'classic' && <Classic2D />}
            {mode === 'immersive' && <Immersive3D />}
        </>
    )
}