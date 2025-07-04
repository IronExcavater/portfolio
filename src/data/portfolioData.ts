export type Project = {
    id: string
    title: string
    description: string
    tags: string[]
    link: string
}

export const projects: Project[] = [
    {
        id: 'liminality',
        title: 'Liminality',
        description: 'A procedurally generated horror exploration game...',
        tags: ['Unity', 'Procedural Generation', 'Horror'],
        link: 'https://niclas-rogulski.itch.io/liminality',
    },
    {
        id: 'cat-climber',
        title: 'Cat Climber',
        description: 'A reto-styled vertical platformer...',
        tags: ['Unity', 'Game Jam', '2D Platformer'],
        link: 'https://niclas-rogulski.itch.io/cat-climber',
    }
]