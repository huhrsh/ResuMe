import { useEffect, useState } from "react";
import { db, storage } from "../Firebase"; // Make sure to import Firebase Storage
import { useUser } from "../Context";
import { toast } from "react-toastify";
import { updateDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function CertificationInfo() {
    const { user, setLoading } = useUser();
    const [certifications, setCertifications] = useState([
        {
            title: "",
            organizer: "",
            issueDate: "",
            validity: "",
            link:"",
            image: null,
            imageUrl: ""
        }
    ]);

    useEffect(() => {
        if (user?.certifications) {
            setCertifications(user.certifications.map(cert => ({
                ...cert,
                image: null // Set image to null initially to handle new uploads
            })));
        }
    }, [user]);

    const handleCertificationChange = (index, field, value) => {
        const newCertifications = [...certifications];
        newCertifications[index][field] = value;
        setCertifications(newCertifications);
    };

    const handleImageChange = (index, e) => {
        const newCertifications = [...certifications];
        if (e.target.files[0]) {
            newCertifications[index].image = e.target.files[0];
        }
        setCertifications(newCertifications);
    };

    const addCertification = () => {
        setCertifications([
            ...certifications,
            {
                title: "",
                organizer: "",
                issueDate: "",
                validity: "Lifetime",
                link: "",
                image: null,
                imageUrl: ""
            }
        ]);
    };

    const handleLifetimeChange = (index, isChecked) => {
        const newCertifications = [...certifications];
        if (isChecked) {
            newCertifications[index].validity = "Lifetime";
        } else {
            newCertifications[index].validity = "";
        }
        setCertifications(newCertifications);
    };

    const removeCertification = (index) => {
        const newCertifications = certifications.filter((_, i) => i !== index);
        setCertifications(newCertifications);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const updatedCertifications = [...certifications]; // Clone the certifications array to avoid direct mutation

        for (let index = 0; index < certifications.length; index++) {
            let certification = certifications[index];

            if (certification.image) {
                const storageRef = ref(storage, `certifications/${user.uid}/${certification.image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, certification.image);

                await new Promise((resolve, reject) => {
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
                            updatedCertifications[index].imageUrl = downloadURL; // Store the image URL instead of the File object
                            resolve(downloadURL);
                        }
                    );
                });
            }
        }

        const certificationsForFirestore = updatedCertifications.map(cert => ({
            title: cert.title,
            organizer: cert.organizer,
            issueDate: cert.issueDate,
            link: cert.link,
            validity: cert.validity,
            imageUrl: cert.imageUrl || cert.image // Keep existing image URL if no new file is uploaded
        }));

        try {
            await updateDoc(doc(db, 'users', user.uid), {
                certifications: certificationsForFirestore
            });
            toast.success("Certification section updated.");
        } catch (err) {
            console.log("Error in updating certifications: ", err);
            toast.error("Failed to update certifications.");
        }

        setLoading(false);
    };

    return (
        <section className="font-[raleway] flex flex-col gap-4">
            <h2 className="text-purple-700 text-3xl font-bold">Let's boast about all those Certificates</h2>
            <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                {certifications.map((certification, index) => (
                    <div key={index} className="flex flex-col gap-4 border p-4 rounded shadow">
                        <div className="flex justify-between items-center">
                            <h3 className="text-purple-700 text-lg font-bold">Certificate {index + 1}</h3>
                            {certifications.length > 1 && (
                                <button type="button" onClick={() => removeCertification(index)} className="rounded text-rose-600 text-lg font-medium px-3 py-0.5 transition-all duration-200 hover:text-white hover:shadow hover:bg-rose-600">
                                    Remove
                                </button>
                            )}
                        </div>
                        <div className='border hover:shadow-lg focus-within:shadow-lg group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                            <h2 className=' text-purple-700 text-lg font-medium'>Title:</h2>
                            <input type="text" value={certification.title} placeholder="Certificate Title" onChange={(e) => handleCertificationChange(index, "title", e.target.value)} className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600" required />
                        </div>
                        <div className='border hover:shadow-lg focus-within:shadow-lg group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                            <h2 className=' text-purple-700 text-lg font-medium'>Organizer:</h2>
                            <input type="text" value={certification.organizer} placeholder="Certification Organizer" onChange={(e) => handleCertificationChange(index, "organizer", e.target.value)} className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600" required />
                        </div>
                        <div className='border hover:shadow-lg focus-within:shadow-lg group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                            <h2 className=' text-purple-700 text-lg font-medium'>Link:</h2>
                            <input type="text" value={certification.link} placeholder="Certificate link" onChange={(e) => handleCertificationChange(index, "link", e.target.value)} className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600" required />
                        </div>
                        <div className="flex gap-6">
                            <div className='border hover:shadow-lg focus-within:shadow-lg group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                                <h2 className=' text-purple-700 text-lg font-medium flex-shrink-0'>Date of Issue:</h2>
                                <input type="date" value={certification.issueDate} onChange={(e) => handleCertificationChange(index, "issueDate", e.target.value)} className="outline-none w-full h-full px-2 py-3 font-medium text-gray-600" />
                            </div>
                            <div className='border hover:shadow-lg focus-within:shadow-lg group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                                <h2 className=' text-purple-700 text-lg font-medium flex-shrink-0'>Valid till:</h2>
                                {certification.validity !== "Lifetime" && (
                                    <input
                                        type="date"
                                        value={certification.validity}
                                        onChange={(e) => handleCertificationChange(index, "validity", e.target.value)}
                                        className="outline-none w-full h-full px-2 py-3.5 font-medium text-gray-600"
                                    />
                                )}
                            </div>
                            <div className="flex flex-shrink-0 items-center">
                                <input
                                    type="checkbox"
                                    checked={certification.validity === "Lifetime"}
                                    onChange={(e) => handleLifetimeChange(index, e.target.checked)}
                                    className="mr-2"
                                />
                                <span className="text-lg font-medium text-gray-600">Lifetime</span>
                            </div>
                        </div>
                        <div className='border hover:shadow-lg focus-within:shadow-lg group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                            <h2 className=' text-purple-700 text-lg font-medium'>Image:</h2>
                            <input type="file" accept="image/*" onChange={(e) => handleImageChange(index, e)} className="outline-none w-full h-full px-2 py-2 font-medium text-gray-600" />
                        </div>
                    </div>
                ))}
                <div className="flex justify-between">
                    <button type="button" onClick={addCertification} className="bg-gradient-to-bl from-violet-500 to-purple-700 text-white font-medium py-2 px-4 rounded hover:shadow-lg transition-all">
                        Add Certification
                    </button>
                    <button type="submit" className="bg-gradient-to-bl from-violet-500 to-purple-700 text-white font-medium py-2 px-4 rounded hover:shadow-lg transition-all">
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
