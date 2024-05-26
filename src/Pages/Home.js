import { Link } from "react-router-dom"
import thinkingFace from "../Assets/Images/Thinking face-rafiki.png"
import usernameImage from "../Assets/Images/User flow-pana.png"
import formImage from "../Assets/Images/Fill out-pana.png"
import customizeImage from "../Assets/Images/Advanced customization-rafiki.png"
import celebrateImage from "../Assets/Images/Celebration-cuate.png"

export default function Home() {
    return (
        <main className="flex flex-col px-12 font-[raleway] items-center">
            <section className="flex items-center ">
                <img className="w-5/12" src={thinkingFace} alt="thinking face" />
                <div className="flex flex-col gap-6 pr-12">
                    <h1 className="text-6xl bg-gradient-to-tl font-bold from-violet-600 to-purple-800 text-transparent bg-clip-text flex items-center gap-3">
                        Do you wish to have a personal website?
                    </h1>
                    <p className="text-lg font-medium text-gray-600">
                        With ResuMe, that dream becomes a reality. Just imagine - effortlessly enter your details and watch as your website comes to life, ready to be customized according to your unique style and preferences.
                    </p>
                    {/* <Link to='/user-info/username' className="w-fit rounded bg-purple-600 font-normal text-xl px-4 py-1.5 transition-all duration-200 text-white shadow-lg hover:bg-purple-800">Get Started</Link> */}
                </div>
            </section>

            <h2 className="text-4xl relative bg-gradient-to-tl font-bold from-violet-600 to-purple-800 text-transparent bg-clip-text flex items-center gap-3 my-12
            after:content-[''] after:absolute after:h-1 after:w-full after:-bottom-2 after:left-0 after:bg-gradient-to-r after:from-white after:via-purple-700 after:to-white
            ">Here's how you can build one in just 4 easy steps</h2>
            
            <section className="flex items-center ">
                <div className="flex flex-col gap-6 pl-12">
                    <h1 className="text-6xl bg-gradient-to-tl font-bold from-violet-600 to-purple-800 text-transparent bg-clip-text flex items-center gap-3">
                        1. Get yourself a unique username
                    </h1>
                    <p className="text-lg font-medium text-gray-600">
                    Your website URL is based on your username, so choose wisely. You can update it later if the new username is available. Make sure your initial choice reflects your identity, but remember, changes are possible down the line.
                    </p>
                </div>
                <img className="w-5/12 p-6" src={usernameImage} alt="Entering details" />
            </section>
            <section className="flex items-center ">
                <img className="w-5/12 p-6" src={formImage} alt="thinking face" />
                <div className="flex flex-col gap-6 pr-12">
                    <h1 className="text-6xl bg-gradient-to-tl font-bold from-violet-600 to-purple-800 text-transparent bg-clip-text flex items-center gap-3">
                        2. Enter your details
                    </h1>
                    <p className="text-lg font-medium text-gray-600">
                    Enter your details in a step-by-step process, making it streamlined and easy. Each step is designed to be simple and straightforward, ensuring you can quickly provide all necessary information without hassle. Enjoy a seamless experience from start to finish.
                    </p>
                </div>
            </section>

            <section className="flex items-center ">
                <div className="flex flex-col gap-6 pl-12">
                    <h1 className="text-6xl bg-gradient-to-tl font-bold from-violet-600 to-purple-800 text-transparent bg-clip-text flex items-center gap-3">
                        3. Customize as per your taste
                    </h1>
                    <p className="text-lg font-medium text-gray-600">
                    Choose from a variety of fonts, sizes, colors, themes, and styles. Tailor your selections to suit your preferences and create a unique look and feel for your content, ensuring it stands out and reflects your personal style.
                    </p>
                </div>
                <img className="w-5/12 p-6" src={customizeImage} alt="customization" />
            </section>

            <section className="flex items-center ">
                <img className="w-5/12 p-6" src={celebrateImage} alt="celebration" />
                <div className="flex flex-col gap-6 pr-12">
                    <h1 className="text-6xl bg-gradient-to-tl font-bold from-violet-600 to-purple-800 text-transparent bg-clip-text flex items-center gap-3">
                        4. Cherish your website once it's approved
                    </h1>
                    <p className="text-lg font-medium text-gray-600">
                    After entering all details, submit for approval, then eagerly await confirmation. Once approved, proudly share your website.</p>
                </div>
            </section>

        </main>
    )
}