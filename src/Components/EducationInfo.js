import { useEffect, useState } from "react";
import upArrow from "../Assets/Images/up-arrow.png";
import { useUser } from "../Context";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { toast } from "react-toastify";

export default function EducationInfo() {
    const {user, setUser, setLoading}=useUser()
    const [currentOpen, setCurrentOpen] = useState();
    const [education, setEducation] = useState([
        {filled:false, complete:false, level: "10th", data: { institution: "", board: "", end: "", gradeType: "", grade: "" } },
        {filled:false, complete:false, level: "12th", data: { institution: "", board: "", end: "", gradeType: "", grade: "" } },
        {filled:false, complete:false, level: "Undergraduate", data: { institution: "", start: "", end: "", gradeType: "", grade: "", branch: "", degree: "" } },
        {filled:false, complete:false, level: "Postgraduate", data: { institution: "", start: "", end: "", gradeType: "", grade: "", branch: "", degree: "" } },
        {filled:false, complete:false, level: "Doctorate", data: { institution: "", start: "", end: "", gradeType: "", grade: "", branch: "", degree: "" } },
    ]);

    useEffect(()=>{
        if(user?.education){
            setEducation(user.education)
        }
    },[user])

    const allFieldsEmpty = (fields) => {
        return Object.values(fields).every(field => field === '');
    };
    const isFieldEmpty = (fields) => {
        return Object.values(fields).some(field => field === '');
    };

    const handleChange = (index, event) => {
        const newEducation = [...education];
        newEducation[index].data[event.target.name] = event.target.value;
        newEducation[index].filled = true;
        setEducation(newEducation);
    };

    async function handleEducationChanges(e){
        e.preventDefault();
        setLoading(true)
        education.forEach((e)=>{
            let allEmpty=allFieldsEmpty(e.data);
            if(allEmpty){
                e.filled=false
                e.complete=false
            }
            else{
                let someEmpty=isFieldEmpty(e.data)
                if(someEmpty){
                    e.filled=true
                    e.complete=false        
                }
                else{
                    e.complete=true
                    e.filled=true
                }
            }
        }
    )
        try{
            await updateDoc(doc(db,'users',user.uid),{
                education
            })
            setUser({...user,education})
            console.log('education: ',education);
            toast.success("Education section updated.")
        }
        catch(err){
            console.log(err)
        }
        setCurrentOpen()
        setLoading(false)
    }

    return (
        <section className="flex gap-4 flex-col font-[raleway]">
            <h2 className=' text-purple-700 text-3xl font-bold'>Let's talk about academics</h2>
            {education.map((edu, index) => (
                <div className={`${currentOpen === edu.level ? "mb-6 border-purple-400":edu.complete?"bg-purple-100":edu.filled?"bg-red-100":"" } border rounded-lg p-4 px-6 cursor-pointer hover:shadow-lg transition-all duration-200`} key={index} onClick={() => { setCurrentOpen(currentOpen === edu.level ? null : edu.level) }}>
                    <div className="flex justify-between items-center">
                        <h3 className={`text-purple-700 text-lg font-bold 
                        `}>{edu.level}</h3>
                        {/* ${currentOpen===edu.level ? "text-purple-700": edu.complete?"text-white":edu.filled?"text-white":""}  */}
                        {currentOpen === edu.level ?
                            <img className="logo h-4 transition-all duration-200" src={upArrow} alt="up" />
                            :
                            <img className="logo h-4 rotate-180 transition-all duration-200" src={upArrow} alt="up" />
                        }
                    </div>
                    {index < 2 ?
                        <div className={`${edu.level === currentOpen ? "h-auto py-2 pt-4" : "h-0 overflow-hidden"} transition-all duration-200 flex flex-col gap-4`} onClick={(e) => e.stopPropagation()}>
                            <div className='border hover:shadow-lg focus-within:shadow-lg bg-white group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                                <h2 className=' text-purple-700 text-lg flex-shrink-0 font-medium'>Name of Institute:</h2>
                                <input className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600" type="text" name="institution" placeholder="Amity International School" value={edu.data.institution || ''} onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div className='border hover:shadow-lg focus-within:shadow-lg bg-white group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                                <h2 className=' text-purple-700 text-lg flex-shrink-0 font-medium'>Education Board:</h2>
                                <input className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600" type="text" name="board" placeholder="CBSE" value={edu.data.board || ''} onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div className="flex justify-start gap-4">
                                <div className='border hover:shadow-lg focus-within:shadow-lg bg-white group p-3 py-0 rounded-xl transition-all duration-200 flex w-1/3 gap-3 items-center'>
                                    <h2 className=' text-purple-700 text-lg font-medium flex-shrink-0'>Year of completion:</h2>
                                    <input className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600" type="text" name="end" placeholder="2024" value={edu.data.end || ''} onChange={(e) => handleChange(index, e)} />
                                    {/* <input className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600" type="text" name="institution" placeholder="Institution" value={edu.data.institution || ''} onChange={(e) => handleChange(index, e)} /> */}
                                </div>

                                <select name="gradeType" value={edu.data.gradeType || ''} onChange={(e) => handleChange(index, e)} className="border p-2 rounded-xl w-1/3 text-gray-600 outline-none text-lg font-medium">
                                    <option className="text-lg" value="" disabled>Select grade type</option>
                                    <option className="text-lg" value="cgpa_4">CGPA (out of 4)</option>
                                    <option className="text-lg" value="cgpa_10">CGPA (out of 10)</option>
                                    <option className="text-lg" value="grade">Grade</option>
                                    <option className="text-lg" value="percentage">Percentage</option>
                                </select>
                                {
                                    edu.data.gradeType &&
                                    <div className='border hover:shadow-lg focus-within:shadow-lg bg-white group p-3 py-0 rounded-xl transition-all duration-200 flex w-1/3 gap-3 items-center'>
                                        <h2 className=' text-purple-700 text-lg font-medium flex-shrink-0'>Score:</h2>
                                        <input className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600" type="text" name="grade" placeholder="Grade/Percentage" value={edu.data.grade || ''} onChange={(e) => handleChange(index, e)} />
                                    </div>
                                }

                            </div>
                        </div> :
                        <div className={`${edu.level === currentOpen ? "h-auto py-2 pt-4" : "h-0 overflow-hidden"} transition-all duration-200 flex flex-col gap-4`} onClick={(e) => e.stopPropagation()}>
                            <div className='border hover:shadow-lg focus-within:shadow-lg bg-white group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                                <h2 className=' text-purple-700 text-lg flex-shrink-0 font-medium'>Name of Institute:</h2>
                                <input type="text" name="institution" className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600" placeholder="Indian Institute of Technology" value={edu.data.institution || ''} onChange={(e) => handleChange(index, e)} />
                                {/* <input className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600" type="text" name="institution" placeholder="Amity International School" value={edu.data.institution || ''} onChange={(e) => handleChange(index, e)} /> */}
                            </div>
                            <div className="flex gap-4 justify-between">
                                <div className='border hover:shadow-lg focus-within:shadow-lg bg-white group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                                    <h2 className=' text-purple-700 text-lg flex-shrink-0 font-medium'>Degree Program:</h2>
                                    <input className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600" type="text" name="degree" placeholder="B.Tech" value={edu.data.degree || ''} onChange={(e) => handleChange(index, e)} />
                                </div>
                                <div className='border hover:shadow-lg focus-within:shadow-lg bg-white group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                                    <h2 className=' text-purple-700 text-lg flex-shrink-0 font-medium'>Branch:</h2>
                                    <input className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600" type="text" name="branch" placeholder="Computer Science and Engineering" value={edu.data.branch || ''} onChange={(e) => handleChange(index, e)} />
                                </div>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <div className='border hover:shadow-lg focus-within:shadow-lg bg-white group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                                    <h2 className=' text-purple-700 text-lg flex-shrink-0 font-medium'>Start year:</h2>
                                    <input className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600" type="text" name="start" placeholder="2021" value={edu.data.start || ''} onChange={(e) => handleChange(index, e)} />
                                </div>
                                <div className='border hover:shadow-lg focus-within:shadow-lg bg-white group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                                    <h2 className=' text-purple-700 text-lg flex-shrink-0 font-medium'>Year of completion:</h2>
                                    <input className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600" type="text" name="end" placeholder="2025" value={edu.data.end || ''} onChange={(e) => handleChange(index, e)} />
                                </div>
                            </div>
                            <div className="flex gap-4 justify-start">
                                <select className="border px-2 py-4 rounded-xl text-lg font-medium w-1/3 text-gray-600 outline-none" name="gradeType" value={edu.data.gradeType || ''} onChange={(e) => handleChange(index, e)}>
                                    <option value="" disabled>Select grade type</option>
                                    <option value="cgpa_4">CGPA (out of 4)</option>
                                    <option value="cgpa_10">CGPA (out of 10)</option>
                                    <option value="grade">Grade</option>
                                    <option value="percentage">Percentage</option>
                                </select>
                                {edu.data.gradeType &&
                                    <div className='border hover:shadow-lg focus-within:shadow-lg bg-white group p-3 py-0 rounded-xl transition-all duration-200 flex w-1/3 gap-3 items-center'>
                                        <h2 className=' text-purple-700 text-lg font-medium flex-shrink-0'>Score:</h2>
                                        <input className="outline-none w-full h-full px-2 py-4 font-medium text-gray-600" type="text" name="grade" placeholder="Grade/Percentage" value={edu.data.grade || ''} onChange={(e) => handleChange(index, e)}  />
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            ))}
            <button className="bg-gradient-to-bl hover:shadow-lg hover:shadow-gray-300 duration-200 from-violet-500 to-purple-700 transition-all w-fit  px-6 text-lg font-medium rounded-md py-2 text-white"  onClick={(e)=>handleEducationChanges(e)}>Save Changes</button>
            <section className="shadow shadow-purple-200 border rounded-xl p-4 mr-12 bg-purple-50">
                <h3 className="text-2xl font-bold text-gray-600">Tips to simplify filling out your details</h3>
                <ul>
                    <li className="list-disc ml-6 font-medium text-lg text-gray-700">Only fill in the details you want to showcase.</li>
                    <li className="list-disc ml-6 font-medium text-lg text-gray-700">You can leave any section empty if you do not wish to include it.</li>
                    <li className="list-disc ml-6 font-medium text-lg text-gray-700">Fields that will be showcased are colored purple.</li>
                    <li className="list-disc ml-6 font-medium text-lg text-gray-700">Fields that are not completely filled or not saved yet are colored red.</li>
                    <li className="list-disc ml-6 font-medium text-lg text-gray-700">Fields that will not be showcased are colored white.</li>
                </ul>
            </section>
        </section>
    );
}
