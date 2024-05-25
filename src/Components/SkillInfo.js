import { useEffect, useState } from "react";
import { db } from "../Firebase"; // Ensure Firebase Firestore is imported
import { useUser } from "../Context";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import deleteImage from "../Assets/Images/cross-circle.png"

export default function SkillInfo() {
    const { user, setUser, setLoading } = useUser();
    const [skills, setSkills] = useState([
        { heading: "", points: [""] }
    ]);

    useEffect(() => {
        if (user && user.skills) {
            setSkills(user.skills);
        }
    }, [user]);

    const handleSkillChange = (index, field, value) => {
        const newSkills = [...skills];
        newSkills[index][field] = value;
        setSkills(newSkills);
    };

    const handlePointChange = (skillIndex, pointIndex, value) => {
        const newSkills = [...skills];
        newSkills[skillIndex].points[pointIndex] = value;
        setSkills(newSkills);
    };

    const addSkill = () => {
        setSkills([
            ...skills,
            { heading: "", points: [""] }
        ]);
    };

    const removeSkill = (index) => {
        const newSkills = skills.filter((_, i) => i !== index);
        setSkills(newSkills);
    };

    const addPoint = (skillIndex) => {
        const newSkills = [...skills];
        newSkills[skillIndex].points.push("");
        setSkills(newSkills);
    };

    const removePoint = (skillIndex, pointIndex) => {
        const newSkills = [...skills];
        newSkills[skillIndex].points = newSkills[skillIndex].points.filter((_, i) => i !== pointIndex);
        setSkills(newSkills);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await updateDoc(doc(db, 'users', user.uid), { skills });
            setUser({ ...user, skills });
            toast.success("Skills section updated.");
        } catch (error) {
            console.error("Error saving skills details:", error);
            toast.error("Failed to save skills details.");
        }

        setLoading(false);
    };

    return (
        <section className="font-[raleway] flex flex-col gap-4">
            <h2 className="text-purple-700 text-3xl font-bold">Showcase Your Skills</h2>
            <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                {skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex flex-col gap-4 border p-4 rounded shadow">
                        <div className="flex justify-between items-center">
                            <h3 className="text-purple-700 text-lg font-bold">Skill Section {skillIndex + 1}</h3>
                            <button
                                type="button"
                                onClick={() => removeSkill(skillIndex)}
                                className="rounded text-rose-600 text-lg font-medium px-3 py-0.5 transition-all duration-200 hover:text-white hover:shadow hover:bg-rose-600"
                            >
                                Remove
                            </button>
                        </div>
                        <div className='border hover:shadow-lg focus-within:shadow-lg group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                            <h2 className=' text-purple-700 text-lg font-medium flex-shrink-0'>Skill heading:</h2>
                            <input
                                type="text"
                                value={skill.heading}
                                placeholder="e.g., Programming Languages"
                                onChange={(e) => handleSkillChange(skillIndex, "heading", e.target.value)}
                                className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <label className="text-purple-700 text-lg font-medium">Skills:</label>
                            {skill.points?.map((point, pointIndex) => (
                                <div key={pointIndex} className="group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center">
                                    <input
                                        type="text"
                                        value={point}
                                        placeholder={`Skill ${pointIndex + 1}`}
                                        onChange={(e) => handlePointChange(skillIndex, pointIndex, e.target.value)}
                                        className="border hover:shadow-lg focus-within:shadow-lg rounded-xl outline-none w-full h-full px-2 py-4 font-medium text-gray-600 flex-grow"
                                        required
                                    />
                                    <img src={deleteImage} alt="delete" className="bg-white aspect-square flex-shrink-0 rounded-full w-8 cursor-pointer object-contain hover:shadow-lg hover:scale-110 transition-all duration-200" onClick={() => removePoint(skillIndex, pointIndex)} />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addPoint(skillIndex)}
                                className="text-lg font-medium ml-3 border rounded text-purple-800 px-3 py-1.5 transition-all duration-200 hover:text-white hover:shadow hover:bg-purple-700 w-fit"
                            >
                                Add Skill
                            </button>
                        </div>
                    </div>
                ))}
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={addSkill}
                        className="bg-gradient-to-bl from-violet-500 to-purple-700 text-white font-medium py-2 px-4 rounded hover:shadow-lg transition-all"
                    >
                        Add Skill Section
                    </button>
                    <button
                        type="submit"
                        className="bg-gradient-to-bl from-violet-500 to-purple-700 text-white font-medium py-2 px-4 rounded hover:shadow-lg transition-all"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </section>
    );
}
