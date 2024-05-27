import React, { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import defaultImage from "../Assets/Images/6974855_4380.jpg";

export default function UserProjects() {
    const userDetails = useOutletContext();
    const projects = userDetails.projects;

    const [selectedProject, setSelectedProject] = useState(null);
    const projectDetailsRef = useRef(null);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setTimeout(() => {
            projectDetailsRef.current.scrollIntoView({ behavior: "smooth" });
        }, 100);  // slight delay to ensure state updates before scrolling
    };

    useEffect(() => {
        if (selectedProject) {
            projectDetailsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [selectedProject]);

    return (
        <div className="py-32 px-20" style={{ fontFamily: userDetails.selectedFont ? userDetails.selectedFont : 'Outfit' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className={`h-auto rounded-lg p-4 cursor-pointer border border-gray-400 group transition-all duration-200 ${selectedProject === project ? 'border-yellow-400' : ''}`}
                        onClick={() => handleProjectClick(project)}
                    >
                        <div className="group relative overflow-hidden">
                            <p className="know-more-text absolute top-2 right-2 user-border-text text-4xl -z-10">Know More &gt;</p>
                            <img
                                src={project.image || defaultImage}
                                alt={project.projectTitle}
                                className="w-full aspect-video object-cover rounded-lg transition-transform duration-150 ease-linear origin-top-left group-hover:rotate-12 group-hover:translate-y-0 group-hover:-translate-x-8"
                            />
                        </div>
                        <h2 className="mt-4 mb-2 text-5xl font-bold user-loading-text">{project.projectTitle}</h2>
                        <p className="text-gray-200">{project.tagline}</p>
                    </div>
                ))}
            </div>

            {selectedProject && (
                <div ref={projectDetailsRef} className="mt-12 p-6 bg-gray-800 text-white rounded-lg">
                    <h2 className="text-3xl font-bold mb-4">{selectedProject.projectTitle}</h2>
                    <p className="mb-2">{selectedProject.overview}</p>
                    <p className="mb-2"><strong>Tagline:</strong> {selectedProject.tagline}</p>
                    <div className="mb-2">
                        <strong>Technologies:</strong>
                        <ul className="list-disc list-inside">
                            {selectedProject.technologies.map((tech, index) => (
                                <li key={index}>{tech}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-2">
                        <strong>Challenges:</strong>
                        <ul className="list-disc list-inside">
                            {selectedProject.challenges.map((challenge, index) => (
                                <li key={index}>{challenge}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-2">
                        <strong>Lessons:</strong>
                        <ul className="list-disc list-inside">
                            {selectedProject.lessons.map((lesson, index) => (
                                <li key={index}>{lesson}</li>
                            ))}
                        </ul>
                    </div>
                    <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub Link</a>
                </div>
            )}
        </div>
    );
}
