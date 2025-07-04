import {create} from 'zustand'

export type CameraTarget = {
    id: string,
    position: [number, number, number],
    rotation: [number, number],
    lockPitch?: [number, number] | null,
    lockYaw?: [number, number] | null,
}

type CameraStore = {
    currentTarget: string
    previousTargets: string[]
    targets: Record<string, CameraTarget>

    addTarget: (id: string, target: CameraTarget) => void
    tryGetTarget: (id: string) => CameraTarget | null
    clearTargets: () => void

    moveTo: (id: string) => void
    moveBack: () => void
}

export const useCameraStore = create<CameraStore>((set, get) => ({
    currentTarget: 'main',
    previousTargets: [],
    targets: {},

    addTarget: (id, target) => {
        set((state) => ({
            targets: {
                ...state.targets,
                [id]: target
            }
        }))
    },

    tryGetTarget: (id) => {
        const newTarget = get().targets[id]
        if (!newTarget) console.warn(`No camera target found with id ${id}`)
        return newTarget
    },

    clearTargets: () => {
        set({ targets: {} })
    },

    moveTo: (id) => {
        const { currentTarget, previousTargets } = get()
        if (id === currentTarget) return

        const existingIndex = previousTargets.indexOf(id)
        const newPrevious = existingIndex !== -1
            ? previousTargets.slice(0, existingIndex + 1)
            : [...previousTargets, currentTarget]

        set({
            currentTarget: id,
            previousTargets: newPrevious
        })
    },

    moveBack: () => {
        const {previousTargets} = get()
        const newId = previousTargets.pop()
        if (!newId) return

        const newPrevious = previousTargets.slice(0, -1)
        set({
            currentTarget: newId,
            previousTargets: newPrevious
        })
    }
}))