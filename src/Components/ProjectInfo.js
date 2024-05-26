import { useEffect, useState } from "react";
import { db, storage } from "../Firebase"; // Ensure Firebase Storage is imported
import { useUser } from "../Context";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import deleteImage from "../Assets/Images/cross-circle.png"

export default function ProjectInfo() {
    const { user, setUser, setLoading } = useUser();
    const [projects, setProjects] = useState([
        {
            projectTitle: "",
            tagline: "",
            githubLink: "",
            overview: "",
            image: null,
            technologies: [""],
            challenges: [""],
            lessons: [""]
        }
    ]);

    useEffect(() => {
        if (user && user.projects) {
            setProjects(user.projects);
        }
    }, [user]);

    const handleProjectChange = (index, field, value) => {
        const newProjects = [...projects];
        newProjects[index][field] = value;
        setProjects(newProjects);
    };

    const handleImageChange = (index, e) => {
        const newProjects = [...projects];
        if (e.target.files[0]) {
            newProjects[index].image = e.target.files[0];
        }
        setProjects(newProjects);
    };

    const handlePointChange = (projectIndex, field, pointIndex, value) => {
        const newProjects = [...projects];
        newProjects[projectIndex][field][pointIndex] = value;
        setProjects(newProjects);
    };

    const addProject = () => {
        setProjects([
            ...projects,
            {
                projectTitle: "",
                tagline: "",
                githubLink: "",
                overview: "",
                image: null,
                technologies: [""],
                challenges: [""],
                lessons: [""]
            }
        ]);
    };

    const removeProject = (index) => {
        const newProjects = projects.filter((_, i) => i !== index);
        setProjects(newProjects);
    };

    const addPoint = (projectIndex, field) => {
        const newProjects = [...projects];
        newProjects[projectIndex][field].push("");
        setProjects(newProjects);
    };

    const removePoint = (projectIndex, field, pointIndex) => {
        const newProjects = [...projects];
        newProjects[projectIndex][field] = newProjects[projectIndex][field].filter((_, i) => i !== pointIndex);
        setProjects(newProjects);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const updatedProjects = [...projects];

            for (let i = 0; i < projects.length; i++) {
                let imageUrl = "";
                const project = projects[i];

                if (project.image instanceof File) {
                    const storageRef = ref(storage, `projects/${user.uid}/${project.image.name}`);
                    const uploadTask = uploadBytesResumable(storageRef, project.image);

                    imageUrl = await new Promise((resolve, reject) => {
                        uploadTask.on(
                            "state_changed",
                            (snapshot) => {
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log(`Upload is ${progress}% done`);
                            },
                            (error) => {
                                console.error("Image upload failed:", error);
                                setLoading(false);
                                toast.error("Image upload failed.");
                                reject(error);
                            },
                            async () => {
                                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                                resolve(downloadURL);
                            }
                        );
                    });
                }

                updatedProjects[i].image = imageUrl || project.image;
            }

            await updateDoc(doc(db, 'users', user.uid), { projects: updatedProjects });
            setUser({ ...user, projects: updatedProjects });
            toast.success("Project section updated.");
        } catch (error) {
            console.error("Error saving project details:", error);
            toast.error("Failed to save project details.");
        }

        setLoading(false);
    };

    return (
        <section className="font-[raleway] flex flex-col gap-4">
            <h2 className="text-purple-700 text-3xl font-bold">Lets flaunt your projects</h2>
            <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                {projects.map((project, projectIndex) => (
                    <div key={projectIndex} className="flex flex-col gap-4 border p-4 rounded shadow">
                        <div className="flex justify-between items-center">
                            <h3 className="text-purple-700 text-lg font-bold">Project {projectIndex + 1}</h3>
                            <button
                                type="button"
                                onClick={() => removeProject(projectIndex)}
                                className="rounded text-rose-600 text-lg font-medium px-3 py-0.5 transition-all duration-200 hover:text-white hover:shadow hover:bg-rose-600"
                            >
                                Remove
                            </button>
                        </div>
                        <div className='border hover:shadow-lg focus-within:shadow-lg group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                            <h2 className=' text-purple-700 text-lg font-medium'>Title:</h2>
                            <input
                                type="text"
                                value={project.projectTitle}
                                placeholder="Bliss India"
                                onChange={(e) => handleProjectChange(projectIndex, "projectTitle", e.target.value)}
                                className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600"
                                required
                            />
                        </div>
                        <div className='border hover:shadow-lg focus-within:shadow-lg group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                            <h2 className=' text-purple-700 text-lg font-medium'>Tagline:</h2>
                            <input
                                type="text"
                                placeholder="An e-commerce website"
                                value={project.tagline}
                                onChange={(e) => handleProjectChange(projectIndex, "tagline", e.target.value)}
                                className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600"
                                required
                            />
                        </div>
                        <div className='border hover:shadow-lg focus-within:shadow-lg group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                            <h2 className=' text-purple-700 text-lg flex-shrink-0 font-medium'>Github Link:</h2>
                            <input
                                type="text"
                                value={project.githubLink}
                                placeholder="www.github.com/huhrsh/bliss-india"
                                onChange={(e) => handleProjectChange(projectIndex, "githubLink", e.target.value)}
                                className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600"
                                required
                            />
                        </div>
                        <div className=' group p-3 py-0 rounded-xl transition-all duration-200 flex flex-col w-full gap-1 items-start'>
                            <h2 className=' text-purple-700  text-lg font-medium'>Overview:</h2>
                            <textarea
                                placeholder="The Bliss India website was created with the primary objective of fostering company growth by drawing in consumers from across the country. It seamlessly combines a clean user interface with a smooth and intuitive user experience. The website encompasses all essential features for customers, including item search, product sorting, cart and wishlist functionality, as well as the provision of a receipt copy. "
                                value={project.overview}
                                onChange={(e) => handleProjectChange(projectIndex, "overview", e.target.value)}
                                className="outline-none w-full h-auto p-3 px-4 font-medium text-gray-600 hover:shadow-lg focus-within:shadow-lg border transition-all duration-200 rounded-xl min-h-32"
                                required
                            />
                        </div>
                        <div className='border hover:shadow-lg focus-within:shadow-lg group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                            <h2 className=' text-purple-700 text-lg flex-shrink-0 font-medium'>Display Image (optional):</h2>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(projectIndex, e)}
                                className="outline-none w-full h-full px-2 py-2 font-medium text-gray-600"
                            />
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <label className="text-purple-700 text-lg font-medium">Technologies/Libraries Used:</label>
                            {project.technologies?.map((tech, techIndex) => (
                                <div key={techIndex} className="group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center">
                                    <input
                                        type="text"
                                        value={tech}
                                        placeholder={`point ${techIndex + 1}`}
                                        onChange={(e) => handlePointChange(projectIndex, "technologies", techIndex, e.target.value)}
                                        className="border hover:shadow-lg focus-within:shadow-lg rounded-xl outline-none w-full h-full px-2 py-4 font-medium text-gray-600 flex-grow"
                                        required
                                    />
                                    <img src={deleteImage} alt="delete" className="bg-white aspect-square flex-shrink-0 rounded-full w-8 cursor-pointer object-contain hover:shadow-lg hover:scale-110 transition-all duration-200" onClick={() => removePoint(projectIndex, "technologies", techIndex)} />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addPoint(projectIndex, "technologies")}
                                className="text-lg font-medium ml-3 border rounded text-purple-800 px-3 py-1.5 transition-all duration-200 hover:text-white hover:shadow hover:bg-purple-700 w-fit"
                            >
                                Add technology
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <label className="text-purple-700 text-lg font-medium">Challenges Faced:</label>
                            {project.challenges?.map((challenge, challengeIndex) => (
                                <div key={challengeIndex} className="group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center">
                                    <input
                                        type="text"
                                        value={challenge}
                                        placeholder={`point ${challengeIndex + 1}`}
                                        onChange={(e) => handlePointChange(projectIndex, "challenges", challengeIndex, e.target.value)}
                                        className="border hover:shadow-lg focus-within:shadow-lg rounded-xl outline-none w-full h-full px-2 py-4 font-medium text-gray-600 flex-grow"
                                        required
                                    />
                                    <img src={deleteImage} alt="delete" className="bg-white aspect-square flex-shrink-0 rounded-full w-8 cursor-pointer object-contain hover:shadow-lg hover:scale-110 transition-all duration-200" onClick={() => removePoint(projectIndex, "challenges", challengeIndex)} />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addPoint(projectIndex, "challenges")}
                                className="text-lg font-medium ml-3 border rounded text-purple-800 px-3 py-1.5 transition-all duration-200 hover:text-white hover:shadow hover:bg-purple-700 w-fit"
                            >
                                Add challenge
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <label className="text-lg font-medium text-purple-700">What Did You Learn:</label>
                            {project.lessons?.map((lesson, lessonIndex) => (
                                <div key={lessonIndex} className="group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center">
                                    <input
                                        type="text"
                                        placeholder={`point ${lessonIndex + 1}`}
                                        value={lesson}
                                        onChange={(e) => handlePointChange(projectIndex, "lessons", lessonIndex, e.target.value)}
                                        className="border hover:shadow-lg focus-within:shadow-lg rounded-xl outline-none w-full h-full px-2 py-4 font-medium text-gray-600 flex-grow"
                                        required
                                    />
                                    <img src={deleteImage} alt="delete" className="bg-white aspect-square flex-shrink-0 rounded-full w-8 cursor-pointer object-contain hover:shadow-lg hover:scale-110 transition-all duration-200" onClick={() => removePoint(projectIndex, "lessons", lessonIndex)} />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addPoint(projectIndex, "lessons")}
                                className="text-lg font-medium ml-3 border rounded text-purple-800 px-3 py-1.5 transition-all duration-200 hover:text-white hover:shadow hover:bg-purple-700 w-fit"
                            >
                                Add Lesson
                            </button>
                        </div>
                    </div>
                ))}
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={addProject}
                        className="bg-gradient-to-bl from-violet-500 to-purple-700 text-white font-medium py-2 px-4 rounded hover:shadow-lg transition-all"
                    >
                        Add Project
                    </button>
                    <button
                        type="submit"
                        className="bg-gradient-to-bl from-violet-500 to-purple-700 text-white font-medium py-2 px-4 rounded hover:shadow-lg transition-all"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
            <section className="shadow shadow-purple-200 border rounded-xl p-4 mr-12 bg-purple-50">
                <h3 className="text-2xl font-bold text-gray-600">Tips that might help you</h3>
                <ul>
                    <li className="list-disc ml-6 font-medium text-lg text-gray-700">Rest assured, if you've already uploaded an image and it displays as "No file chosen,"
                        <li>
                            it means only the files you select will appear, not the existing photos.</li>
                    </li>
                </ul>
            </section>
        </section>
    );
}
