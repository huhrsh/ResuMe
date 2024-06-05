import { Link } from "react-router-dom"
import thinkingFace from "../Assets/Images/Thinking face-rafiki.png"
import usernameImage from "../Assets/Images/User flow-pana.png"
import formImage from "../Assets/Images/Fill out-pana.png"
import customizeImage from "../Assets/Images/Advanced customization-rafiki.png"
import celebrateImage from "../Assets/Images/Celebration-cuate.png"
import dashboardImage from "../Assets/Images/Control Panel-bro.png"
import changeImage from "../Assets/Images/Version control-cuate.png"
import coffeeDrinkingImage from "../Assets/Images/Coffee break-cuate.png"
import { useState } from "react"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/effect-cards';
// import { EffectCards, EffectCreative } from 'swiper/modules';
import leftArrow from "../Assets/Images/left-arrow.png"
import rightArrow from "../Assets/Images/right-arrow.png"
import Rating from '@mui/material/Rating';
import graphImage from "../Assets/Images/graph (15).png"

export default function Home() {
    const [reviews, setReviews] = useState([
        { rating: 5, text: "Fantastic website! It made creating and customizing my portfolio site easy and enjoyable. Highly recommend!" },
        { rating: 5, text: "meow meow nyah" },
        { rating: 5, text: "User friendly and easy to navigate. Would definitely recommend to others for a simple website building experience!" },
        { rating: 5, text: "Excellent tool for creating a custom portfolio website. User-friendly interface and great customization options!" },
    ])

    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    };


    return (
        <main className="flex flex-col px-12 max-sm:px-4 font-[raleway] items-center">
            <section className="flex items-center max-sm:flex-col">
                <img className="w-5/12 max-sm:w-full" src={thinkingFace} alt="thinking face" />
                <div className="flex flex-col gap-6 pr-12 max-sm:pr-0">
                    <h1 className="text-6xl max-sm:text-3xl bg-gradient-to-tl font-bold from-violet-600 to-purple-800 text-transparent bg-clip-text flex items-center gap-3 pb-2">
                        Do you wish to have a personal website?
                    </h1>
                    <p className="text-lg font-medium text-gray-600">
                        With Portify, that dream becomes a reality. Just imagine - effortlessly enter your details and watch as your website comes to life, ready to be customized according to your unique style and preferences.
                    </p>
                    {/* <Link to='/user-info/username' className="w-fit rounded bg-purple-600 font-normal text-xl px-4 py-1.5 transition-all duration-200 text-white shadow-lg hover:bg-purple-800">Get Started</Link> */}
                </div>
            </section>

            <h2 className="text-4xl relative bg-gradient-to-tl font-bold from-violet-600 to-purple-800 text-transparent bg-clip-text flex items-center gap-3 pb-2 my-12
            after:content-[''] after:absolute after:h-1 after:w-full after:-bottom-2 after:left-0 after:bg-gradient-to-r after:from-white after:via-purple-700 after:to-white
            before:content-[''] before:absolute before:h-1 before:w-full before:-top-2 before:left-0 before:bg-gradient-to-r before:from-white before:via-purple-700 before:to-white
            max-sm:text-2xl max-sm:text-center before:sm:hidden
            ">Here's how you can build one in just 4 easy steps</h2>

            <section className="flex items-center max-sm:flex-col-reverse ">
                <div className="flex flex-col gap-6 pl-12 max-sm:pl-0">
                    <h1 className="text-6xl max-sm:text-3xl bg-gradient-to-tl font-bold from-violet-600 to-purple-800 text-transparent bg-clip-text flex items-center gap-3 pb-2">
                        1. Get yourself a unique username
                    </h1>
                    <p className="text-lg font-medium text-gray-600">
                        Your website URL is based on your username, so choose wisely. You can update it later if the new username is available. Make sure your initial choice reflects your identity, but remember, changes are possible down the line.
                    </p>
                </div>
                <img className="w-5/12 p-6 max-sm:w-full" src={usernameImage} alt="Entering details" />
            </section>

            <section className="flex items-center max-sm:flex-col">
                <img className="w-5/12 p-6 max-sm:w-full" src={formImage} alt="thinking face" />
                <div className="flex flex-col gap-6 pr-12 max-sm:pr-0">
                    <h1 className="text-6xl max-sm:text-3xl bg-gradient-to-tl font-bold from-violet-600 to-purple-800 text-transparent bg-clip-text flex items-center gap-3 pb-2">
                        2. Enter your details
                    </h1>
                    <p className="text-lg font-medium text-gray-600">
                        Enter your details in a step-by-step process, making it streamlined and easy. Each step is designed to be simple and straightforward, ensuring you can quickly provide all necessary information without hassle. Enjoy a seamless experience from start to finish.
                    </p>
                </div>
            </section>

            <section className="flex items-center max-sm:flex-col-reverse">
                <div className="flex flex-col gap-6 pl-12 max-sm:pl-0">
                    <h1 className="text-6xl max-sm:text-3xl bg-gradient-to-tl font-bold from-violet-600 to-purple-800 text-transparent bg-clip-text flex items-center gap-3 pb-2">
                        3. Customize as per your taste
                    </h1>
                    <p className="text-lg font-medium text-gray-600">
                        Choose from a variety of fonts, sizes, colors, themes, and styles. Tailor your selections to suit your preferences and create a unique look and feel for your content, ensuring it stands out and reflects your personal style.
                    </p>
                </div>
                <img className="w-5/12 p-6 max-sm:w-full" src={customizeImage} alt="customization" />
            </section>

            <section className="flex items-center max-sm:flex-col">
                <img className="w-5/12 p-6 max-sm:w-full" src={celebrateImage} alt="celebration" />
                <div className="flex flex-col gap-6 pr-12 max-sm:pr-0">
                    <h1 className="text-6xl max-sm:text-3xl bg-gradient-to-tl font-bold from-violet-600 to-purple-800 text-transparent bg-clip-text flex items-center gap-3 pb-2">
                        4. Cherish your website once it's approved
                    </h1>
                    <p className="text-lg font-medium text-gray-600">
                        After entering all details, submit for approval, then eagerly await confirmation. Once approved, proudly share your website.</p>
                </div>
            </section>

            <h2 className="text-4xl relative bg-gradient-to-tl font-bold from-violet-600 to-purple-800 text-transparent bg-clip-text flex items-center gap-3 pb-2 my-12
            after:content-[''] after:absolute after:h-1 after:w-full after:-bottom-2 after:left-0 after:bg-gradient-to-r after:from-white after:via-purple-700 after:to-white
            before:content-[''] before:absolute before:h-1 before:w-full before:-top-2 before:left-0 before:bg-gradient-to-r before:from-white before:via-purple-700 before:to-white
            max-sm:text-2xl max-sm:text-center before:sm:hidden
            ">Here's how you can modify your website once built</h2>

            <section className="flex items-center max-sm:flex-col">
                <img className="w-5/12 p-6 max-sm:w-full" src={dashboardImage} alt="dashboard" />
                <div className="flex flex-col gap-6 pr-12 max-sm:pr-0">
                    <h1 className="text-6xl max-sm:text-3xl bg-gradient-to-tl font-bold from-violet-600 to-purple-800 text-transparent bg-clip-text flex items-center gap-3 pb-2">
                        1. Go to dashboard
                    </h1>
                    <p className="text-lg font-medium text-gray-600">
                        Navigate to the dashboard section in the navbar to access comprehensive details about your website.
                    </p>
                </div>
            </section>

            <section className="flex items-center max-sm:flex-col-reverse">
                <div className="flex flex-col gap-6 pl-12 max-sm:pl-0">
                    <h1 className="text-6xl max-sm:text-3xl bg-gradient-to-tl font-bold from-violet-600 to-purple-800 text-transparent bg-clip-text flex items-center gap-3 pb-2">
                        2. Make the changes, saving it along the way
                    </h1>
                    <p className="text-lg font-medium text-gray-600">
                        Inside the dashboard, access and modify your details in each section seperately. Save changes as you go. Conveniently manage all aspects of your profile, updating information effortlessly.
                    </p>
                </div>
                <img className="w-5/12 p-6 max-sm:w-full" src={changeImage} alt="changes" />
            </section>
            <h2 className="text-4xl relative bg-gradient-to-tl font-bold from-violet-600 to-purple-800 text-transparent bg-clip-text flex items-center gap-3 pb-2 my-12
            after:content-[''] after:absolute after:h-1 after:w-full after:-bottom-2 after:left-0 after:bg-gradient-to-r after:from-white after:via-purple-700 after:to-white
            before:content-[''] before:absolute before:h-1 before:w-full before:-top-2 before:left-0 before:bg-gradient-to-r before:from-white before:via-purple-700 before:to-white
            max-sm:text-2xl max-sm:text-center before:sm:hidden
            ">Here's what people say about us</h2>

            {/* <section className="flex px-12 max-sm:px-0 items-center max-sm:flex-col mb-20">
                <img className="w-6/12 p-6 max-sm:w-full max-sm:p-0" src={coffeeDrinkingImage} alt="dashboard" />
                <Swiper
                    grabCursor={true}
                    effect={'creative'}
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: [0, 0, -400],
                        },
                        next: {
                            translate: ['100%', 0, 0],
                        },
                    }}
                    modules={[EffectCreative]}
                    className="mySwiper"
                >
                    {reviews.map((review, index) => (
                        <SwiperSlide
                            key={index}
                            className="flex p-4 px-6 flex-col gap-4 border rounded-3xl bg-gray-100"
                        >
                            <Rating defaultValue={review.rating} size="large" readOnly className="brightness-110" />
                            <p className="text-purple-700 font-[raleway] text-xl font-medium antialiased max-sm:text-lg">
                                {review.text}
                            </p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section> */}

            <section className="flex px-12 gap-12 max-sm:px-0 items-center max-sm:flex-col mb-20 justify-between">
                <img className="w-6/12 p-6 max-sm:w-full max-sm:p-0" src={coffeeDrinkingImage} alt="dashboard" />
                <div className="relative w-5/12 min-h-72 max-sm:w-5/6 max-sm:min-h-96 p-6 flex flex-col items-center justify-center">
                    <TransitionGroup>
                        <CSSTransition
                            key={currentSlide}
                            timeout={500}
                            classNames="fade"
                        >
                            <div className="flex flex-col w-full h-full gap-4 absolute left-0 top-0 border border-purple-500 rounded-3xl bg-cover bg-center p-6" >
                                <Rating defaultValue={reviews[currentSlide].rating} size="large" readOnly className="brightness-110" />
                                <p className="text-purple-700 font-[raleway] text-xl font-semibold antialiased transition duration-200 h-full">
                                    {reviews[currentSlide].text}
                                </p>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                    <button onClick={handlePrev} className="absolute top-1/2 -left-4 transform -translate-y-1/2 text-purple-500 rounded-full bg-white border border-purple-700 p-2 pl-1.5 pr-2.5 max-sm:scale-110" ><img className="h-4 logo" src={leftArrow} alt="left arrow" /></button>
                    <button onClick={handleNext} className="absolute top-1/2 -right-4 transform -translate-y-1/2 text-purple-500 rounded-full bg-white border border-purple-700 p-2 pr-1.5 pl-2.5 max-sm:scale-110" ><img className="h-4 logo" src={rightArrow} alt="right arrow" /></button>
                    <div className="flex justify-center mt-4 absolute -bottom-4">
                        {reviews.map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 w-2 mx-1 rounded-full ${index === currentSlide ? 'bg-purple-700' : 'bg-gray-200'
                                    }`}
                            ></div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    )
}