import {useUIStore, sections} from '../../stores/uiStore.ts'

export default function Menu() {
    const {setSection, mode, nextMode} = useUIStore()

    return (
        <nav>
            <div className="flex gap-4">
                {sections.map(section => (
                    <button
                        type="button"
                        key={section}
                        onClick={() => setSection(section)}
                    >
                        {section}
                    </button>
                ))}
            </div>
            <button
                type="button"
                onClick={nextMode}
            >
                Switch to {mode === 'classic' ? '3D' : '2D'}
            </button>
        </nav>
    )
}