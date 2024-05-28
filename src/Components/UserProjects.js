import React, { useState, useEffect, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import defaultImage from "../Assets/Images/6974855_4380.jpg";
import link from "../Assets/Images/link.png"

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
                        <h2 className="mt-8 mb-2 text-5xl font-bold user-loading-text">{project.projectTitle}</h2>
                        <p className="text-gray-200">{project.tagline}</p>
                    </div>
                ))}
            </div>

            {selectedProject && (
                <div ref={projectDetailsRef} className="mt-12 p-6 text-white rounded-lg flex flex-col gap-2">
                    {/* <Link ref='noopener noreferrer' to={selectedProject.githubLink} className="">{selectedProject.projectTitle}</Link> */}
                    <h2 className="text-5xl user-loading-text font-bold ">{selectedProject.projectTitle}</h2>
                    <p className="text-lg"> {selectedProject.tagline}</p>
                    <div className="flex flex-col mt-8 gap-2">
                        <h3 className="user-border-text text-4xl font-bold">Overview</h3>
                        <p className="text-lg text-gray-100">{selectedProject.overview}</p>
                    </div>
                    <div className="flex flex-col mt-8">
                        <h3 className="user-border-text text-4xl font-bold">Technologies/ Libraries used:</h3>
                        <ul className="list-disc list-inside pl-4 text-lg">
                            {selectedProject.technologies.map((tech, index) => (
                                <li className="py-1.5 text-gray-100" key={index}>{tech}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col mt-8">
                        <h3 className="user-border-text text-4xl font-bold">Challenges faced:</h3>
                        <ul className="list-disc list-inside pl-4 text-lg">
                            {selectedProject.challenges.map((challenge, index) => (
                                <li className="py-1.5 text-gray-100" key={index}>{challenge}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="">
                        <h3 className="user-border-text text-4xl font-bold">Lessons learnt:</h3>
                        <ul className="list-disc list-inside pl-4 text-lg">
                            {selectedProject.lessons.map((lesson, index) => (
                                <li className="py-1.5 text-gray-100" key={index}>{lesson}</li>
                            ))}
                        </ul>
                    </div>
                    <a href={`https://`+selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="user-border-text text-4xl font-bold flex gap-2 items-center ">Github <img className="h-5" src={link} alt="link"/></a>
                </div>
            )}
        </div>
    );
}
