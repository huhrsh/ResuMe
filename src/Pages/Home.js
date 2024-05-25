import { Link } from "react-router-dom"
import thinkingFace from "../Assets/Images/Thinking face-rafiki.png"

export default function Home(){
    return(
        <main className="flex flex-col px-12 font-[raleway]">
            <section className="flex items-center ">
                <img className="w-5/12" src={thinkingFace} alt="thinking face"/>
                <div className="flex flex-col gap-6 px-6">
                    <h1 className="text-6xl bg-gradient-to-tl font-bold from-violet-600 to-purple-800 text-transparent bg-clip-text flex items-center gap-3">
                        Do you wish to have a personal website?
                    </h1>
                    <p className="text-lg font-medium text-gray-600">
                    With ResuMe, that dream becomes a reality. Just imagine - effortlessly enter your details and watch as your website comes to life, ready to be customized according to your unique style and preferences.
                    </p>
                    <Link to='/user-info/username' className="w-fit rounded bg-purple-600 font-normal text-xl px-4 py-1.5 transition-all duration-200 text-white shadow-lg hover:bg-purple-800">Get Started</Link>
                </div>
            </section>
        </main>
    )
}