import { useOutletContext } from "react-router-dom";
import React from "react";

export default function UserSkills() {
    const { userDetails } = useOutletContext();
    const skills = userDetails.skills;

    return (
        <div className="py-32 pb-16 px-20" style={{ fontFamily: userDetails.selectedFont ? userDetails.selectedFont : 'Outfit' }}>
            <div className="masonry">
                {skills.map((skill, index) => (
                    <div key={index} className="masonry-item p-4 flex flex-col bg-[#00000030] rounded-lg">
                        <h3 className="text-5xl font-bold user-loading-text">{skill.heading}</h3>
                        <ul className="list-disc pl-5 mt-4">
                            {skill.points.map((point, idx) => (
                                <li key={idx} className="text-lg text-white py-1.5">{point}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
