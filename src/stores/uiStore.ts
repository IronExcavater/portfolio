import {create} from 'zustand'

type Section = 'about' | 'projects' | 'experience' | 'education' | 'contact'
export const sections: Section[] = ['about', 'projects', 'experience', 'education', 'contact']

type Mode = 'classic' | 'immersive'

type UIStore = {
    section: Section
    setSection: (section: Section) => void

    mode: Mode,
    nextMode: () => void,
    setMode: (mode: Mode) => void,
}

export const useUIStore = create<UIStore>((set) => ({
    section: 'about',

    setSection: (section) => {
        set({section})
    },

    mode: 'classic',

    nextMode: () => {
        set((state) => ({
           mode: state.mode === 'classic' ? 'immersive' : 'classic',
        }))
    },

    setMode: (mode) => {
        set({mode})
    }
}))