import {projects} from '../../data/portfolioData.ts'

export default function Projects() {
    return (
        <div>
            {projects.map(project => (
                <div key={project.id}>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                </div>
            ))}
        </div>
    )
}