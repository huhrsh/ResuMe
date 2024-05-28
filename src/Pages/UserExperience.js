import { useOutletContext } from "react-router-dom";

export default function UserExperience() {
    const { userDetails } = useOutletContext();
    const experiences = userDetails.experiences;

    return (
        <div className="py-32 pb-16 px-20 flex flex-col gap-20" style={{ fontFamily: userDetails.selectedFont ? userDetails.selectedFont : 'Outfit' }}>
            {experiences.map((experience, index) => (
                <div key={index} className="flex flex-col gap-2">
                    <h3 className="text-5xl font-bold user-loading-text">{experience.role}</h3>
                    <p className="text-lg text-purple-400">{experience.company}</p>
                    <p className="text-white">
                        {new Date(experience.start).toLocaleDateString()} - {experience.current ? "Present" : new Date(experience.end).toLocaleDateString()}
                    </p>
                    <ul className="list-disc pl-5 text-lg">
                        {experience.points.map((point, idx) => (
                            <li key={idx} className="text-gray-100">{point}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
