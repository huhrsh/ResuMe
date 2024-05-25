import { createRef, useEffect, useState } from "react"
import { useUser } from "../Context";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";

export default function AboutInfo() {
    const { user, setUser, setLoading } = useUser()
    const [aboutText, setAboutText] = useState("")
    const aboutInputRef = createRef()
    const nameInputRef = createRef()
    const professionInputRef = createRef()
    const [profession, setProfession] = useState("")
    const [name, setName] = useState('')

    useEffect(() => {
        if (user) {
            // console.log(user)    
            setName(user.name ? user.name : "")
            setAboutText(user.about ? user.about : "")
            setProfession(user.profession ? user.profession : "")
        }
    }, [user])

    async function handleAboutChange(e) {
        e.preventDefault();
        if (aboutText === user.about && profession === user.profession) {
            toast.warn("No changes detected.")
            return;
        }
        if (!aboutText || !profession) {
            toast.warn("Please fill all the details.")
            return;
        }
        nameInputRef.current.blur()
        aboutInputRef.current.blur()
        professionInputRef.current.blur()
        setLoading(true);
        try {
            await updateDoc(doc(db, 'users', user.uid), {
                profession,
                about: aboutText
            })
            setUser({...user,profession,about:aboutText})
            console.log("User updated");
            toast.success("About section updated.")
        } catch (err) {
            console.log("error in updating section")

        }
        setLoading(false);

    }

    return (
        <section className="font-[raleway] flex flex-col gap-6">
            <form className="flex flex-col pr-12 gap-4 items-start">
                <div className="w-full flex flex-col gap-3 mb-4">
                    <h2 className=' text-purple-700 text-3xl font-bold'>What should we call you?</h2>
                    <div className='border hover:shadow-lg focus-within:shadow-lg  group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                        <h2 className=' text-purple-700 text-lg font-medium'>Name:</h2>
                        <input ref={nameInputRef} className='outline-none w-full h-full px-2 py-4 font-medium text-gray-600' type='text' placeholder='Web Developer' onChange={((e) => setName(e.target.value))} value={name} />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-3 mb-4">
                    <h2 className=' text-purple-700 text-3xl font-bold'>What is your profession?</h2>
                    <div className='border hover:shadow-lg focus-within:shadow-lg  group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                        <h2 className=' text-purple-700 text-lg font-medium'>Profession:</h2>
                        <input ref={professionInputRef} className='outline-none w-full h-full px-2 py-4 font-medium text-gray-600' type='text' placeholder='Web Developer' onChange={((e) => setProfession(e.target.value))} value={profession} />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-3">
                    <h2 className=' text-purple-700 text-3xl font-bold'>Write something about yourself</h2>
                    <div className='border hover:shadow-lg focus-within:shadow-lg  group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                        <textarea ref={aboutInputRef} onChange={(e) => { setAboutText(e.target.value) }} value={aboutText} className="outline-none w-full h-full p-2 font-medium text-lg text-gray-600 max-h-52 min-h-40" placeholder="Passionate third-year Computer Science and Engineering student excelling in web development, adept at breaking down complex challenges into creative and high-quality solutions, driven by a commitment to continuous learning and a strong problem-solving mindset."></textarea>
                    </div>
                </div>
                <button className="flex-shrink-0 bg-gradient-to-bl hover:shadow-lg hover:shadow-gray-300 duration-200 from-violet-500 to-purple-700 transition-all w-fit  px-3 py-2 text-lg font-medium rounded text-white " onClick={(e) => { handleAboutChange(e) }}>Save Changes</button>
            </form>
            <section className="shadow shadow-purple-200 border rounded-xl p-4 mr-12 bg-purple-50">
                <h3 className="text-2xl font-bold text-gray-600">Tips to enhance your "About Me" section</h3>
                <ul>
                    <li className="list-disc ml-6 font-medium text-lg text-gray-700" >Highlight your unique skills and achievements.</li>
                    <li className="list-disc ml-6 font-medium text-lg text-gray-700" >Maintain a positive and professional tone throughout.</li>
                    <li className="list-disc ml-6 font-medium text-lg text-gray-700" >Keep it concise and relevant to your audience.</li>
                </ul>
            </section>
        </section>
    )
}