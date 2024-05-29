import React from 'react';
import bgImage from "../Assets/Images/pexels-tuesday-temptation-190692-3780104.jpg";
import 'animate.css'; // Ensure the animate.css library is imported

export default function UserLoading({ username }) {
    // Split the username into two halves
    const midpoint = Math.ceil(username.length / 2);
    const firstHalf = username.substring(0, midpoint);
    const secondHalf = username.substring(midpoint);

    return (
        <>
            <div className="absolute inset-0 bg-cover backdrop-blur-lg max-sm:w-screen max-sm:h-screen max-sm:overflow-hidden" style={{ backgroundImage: `url(${bgImage})` }}></div>
            <div className="backdrop-blur-3xl w-screen h-screen "></div>
            <div className='h-screen w-screen flex items-center justify-center absolute top-0'>
                <div className='w-1/2 flex items-center justify-end'>
                    <h1 className='animate__animated animate__fadeInLeft  z-50 text-9xl font-semibold user-loading-text'>
                        {firstHalf}
                    </h1>
                </div>
                <div className='w-1/2 flex items-center justify-start'>
                    <h1 className='animate__animated animate__fadeInRight z-50 text-9xl font-semibold user-loading-text'>
                        {secondHalf}
                    </h1>
                </div>
            </div>
        </>
    );
}
