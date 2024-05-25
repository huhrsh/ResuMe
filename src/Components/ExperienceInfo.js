import { useEffect, useState } from "react";
import { useUser } from "../Context";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { toast } from "react-toastify";
import deleteImage from "../Assets/Images/cross-circle.png"
// import deleteImage from "../Assets/Images/trash (2).png"

export default function ExperienceInfo() {
    const { user, setUser,  setLoading } = useUser();
    const [experiences, setExperiences] = useState([
        {
            role: "",
            company: "",
            start: "",
            end: "",
            current: false,
            points: [""]
        }
    ]);

    useEffect(() => {
        if (user?.experiences) {
            setExperiences(user.experiences);
        }
    }, [user]);

    
    const handleExperienceChange = (index, event) => {
        const { name, value, type, checked } = event.target;
        const updatedExperiences = [...experiences];
        updatedExperiences[index] = {
            ...updatedExperiences[index],
            [name]: type === 'checkbox' ? checked : value
        };
        setExperiences(updatedExperiences);
    };

    const handlePointChange = (expIndex, pointIndex, event) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[expIndex].points[pointIndex] = event.target.value;
        setExperiences(updatedExperiences);
    };

    const addExperience = () => {
        setExperiences([...experiences, {
            role: "",
            company: "",
            start: "",
            end: "",
            current: false,
            points: [""]
        }]);
    };

    const addPoint = (expIndex) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[expIndex].points.push("");
        setExperiences(updatedExperiences);
    };

    const removePoint = (expIndex, pointIndex) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[expIndex].points.splice(pointIndex, 1);
        setExperiences(updatedExperiences);
    };

    const removeExperience = (index) => {
        const updatedExperiences = experiences.filter((_, expIndex) => expIndex !== index);
        setExperiences(updatedExperiences);
    };

    const handleExperienceChanges = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateDoc(doc(db, 'users', user.uid), { experiences });
            setUser({...user, experiences})
            toast.success("Experience section updated.");
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    return (
        <section className="flex gap-6 flex-col font-[raleway]">
            <h2 className='text-purple-700 text-3xl font-bold'>"Do you have any prior experience?"</h2>
            {experiences.map((exp, index) => (
                <div key={index} className="border rounded-lg p-4 px-6 mb-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-purple-700 text-lg font-bold">Experience {index + 1}</h3>
                        <button className="rounded text-rose-600 text-lg font-medium px-3 py-0.5 transition-all duration-200 hover:text-white hover:shadow hover:bg-rose-600" onClick={() => removeExperience(index)}>Remove</button>
                    </div>
                    <div className="flex flex-col gap-4 mt-2">
                        <div className='border hover:shadow-lg focus-within:shadow-lg  group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                            <h2 className=' text-purple-700 text-lg font-medium'>Role:</h2>
                            <input className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600" type="text" name="role" placeholder="Role" value={exp.role} onChange={(e) => handleExperienceChange(index, e)}/>
                        </div>
                        <div className='border hover:shadow-lg focus-within:shadow-lg  group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                            <h2 className=' text-purple-700 text-lg font-medium'>Company:</h2>
                            <input className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600" type="text" name="company" placeholder="Company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)}/>
                        </div>
                        <div className="flex gap-4">
                            <div className='border hover:shadow-lg focus-within:shadow-lg  group p-3 py-0 rounded-xl transition-all duration-200 flex w-1/2 gap-3 items-center'>
                                <h2 className=' flex-shrink-0 text-purple-700 text-lg font-medium'>Start Date:</h2>
                                <input className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600" type="text" name="start" placeholder="Start Date" value={exp.start} onChange={(e) => handleExperienceChange(index, e)}/>
                            </div>
                            <div className='border hover:shadow-lg focus-within:shadow-lg  group p-3 py-0 rounded-xl transition-all duration-200 flex w-1/2 gap-3 items-center'>
                                <h2 className=' flex-shrink-0 text-purple-700 text-lg font-medium'>Start Date:</h2>
                                <input className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600" type="text" name="end" placeholder="End Date" value={exp.current ? "Present" : exp.end} onChange={(e) => handleExperienceChange(index, e)} disabled={exp.current}/>
                                <label className="flex items-center">
                                    <input className="mr-2" type="checkbox" name="current" checked={exp.current} onChange={(e) => handleExperienceChange(index, e)}/>
                                    Current
                                </label>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-purple-700 text-lg font-semibold">Points:</h4>
                            {exp.points.map((point, pointIndex) => (
                                <div className="flex justify-between items-center">
                                    <input key={pointIndex} className="border rounded-xl m-2 outline-none w-full h-full px-2 py-4 font-medium text-gray-600" type="text" placeholder={`Point ${pointIndex + 1}`} value={point} onChange={(e) => handlePointChange(index, pointIndex, e)} />
                                    <img src={deleteImage} alt="delete" className="hover:shadow-lg hover:scale-110 transition-all duration-200 bg-white aspect-square flex-shrink-0 rounded-full w-8 cursor-pointer object-contain" onClick={() => removePoint(index, pointIndex)} />
                                </div>

                            ))}
                            <button
                                className="text-lg font-medium border rounded text-purple-800 px-3 py-0.5 transition-all duration-200 hover:text-white hover:shadow hover:bg-purple-700"
                                onClick={() => addPoint(index)}>
                                Add Point
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <div className="flex justify-between">
                <button className="bg-gradient-to-bl hover:shadow-lg hover:shadow-gray-300 duration-200 from-violet-500 to-purple-700 transition-all w-fit  px-6 text-lg font-medium rounded-md py-2 text-white" onClick={addExperience}>Add Experience</button>
                <button className="bg-gradient-to-bl hover:shadow-lg hover:shadow-gray-300 duration-200 from-violet-500 to-purple-700 transition-all w-fit  px-6 text-lg font-medium rounded-md py-2 text-white" onClick={handleExperienceChanges}>Save Experiences</button>
            </div>
        </section>
    );
}
