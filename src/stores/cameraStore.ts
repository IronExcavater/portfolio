import { create } from 'zustand'

export type CameraNode = {
    id: string
    position: [number, number, number]
    rotation?: [number, number, number]
    label?: string
    connectedNodeIds: string[]
    roomId: string
}

type CameraState = {
    currentNodeId: string
    nodes: Record<string, CameraNode>
    setCurrentNode: (id: string) => void
    registerNodes: (newNodes: CameraNode[]) => void
}

export const useCameraStore =
    create<CameraState>(set => ({
    currentNodeId: 'bedroom.entry',
    nodes: {},
    setCurrentNode: (id) => set({ currentNodeId: id }),
    registerNodes: (newNodes) =>
        set((state) => {
            const updated = { ...state.nodes }
            for (const node of newNodes) {
                updated[node.id] = node
            }
            return { nodes: updated }
        }),
}))