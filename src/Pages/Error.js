import { Link, useNavigate } from "react-router-dom"
import errorImage from "../Assets/Images/404 error with people holding the numbers-amico.png"

export default function Error() {
    const navigate = useNavigate();

    function handleButtonClick() {
        navigate(-1);
    }

    return (
        <main className="flex h-screen items-center px-24 justify-between gap-12 font-[raleway]">
            <img className="w-1/2" src={errorImage} alt="error 404" />
            <div className="flex flex-col items-start gap-6">
                <h1 className="text-6xl bg-gradient-to-tl font-bold from-violet-600 to-purple-800 text-transparent bg-clip-text flex items-center gap-3">
                    Sorry, this page does not exist.
                </h1>
                <button className="rounded border border-purple-800 font-normal text-xl text-purple-800 px-4 py-1 transition-all duration-200 hover:text-white hover:shadow hover:bg-purple-700" onClick={handleButtonClick}>Go back</button>
            </div>
        </main>
    )
}