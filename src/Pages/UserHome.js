import React, { useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';


export default function UserHome() {
    const userDetails = useOutletContext();
    const animationRef = useRef(null);

    useEffect(() => {
        if (animationRef.current) {
            animationRef.current.addRandomSplats(30);
        }
    }, []);

    return (
        <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden" style={{
            fontFamily: userDetails.selectedFont ? userDetails.selectedFont : "outfit",
        }}>
            <div className=' z-10 text-white max-w-screen-lg cursor-default flex flex-col gap-2'>
                <h1 className='text-[7rem] user-loading-text leading-none'>
                    {userDetails.name}
                </h1>
                <h2 className='text-2xl font-light '>{userDetails.profession}</h2>
                <p className='text-lg text-gray-300'>{userDetails.about}</p>
            </div>
            {/* <div className="absolute inset-0 z-0">
                <ReactFluidAnimation
                    style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                    config={{
                        textureDownsample: 1,
                        densityDissipation: 0.99,
                        velocityDissipation: 0.99,
                        pressureDissipation: 0.8,
                        pressureIterations: 25,
                        curl: 0,
                        splatRadius: 0.01,
                        splatForce: 6000,
                        colorsPool: [
                            { r: 255, g: 0, b: 0 },    // Red
                            { r: 255, g: 165, b: 0 },  // Orange
                            { r: 255, g: 255, b: 0 },  // Yellow
                            { r: 0, g: 255, b: 0 },    // Green
                            { r: 0, g: 0, b: 255 },    // Blue
                            { r: 128, g: 0, b: 128 },  // Purple
                            { r: 255, g: 0, b: 255 },  // Magenta
                            { r: 0, g: 255, b: 255 },  // Cyan
                        ],
                    }}
                    animationRef={ref => animationRef.current = ref}
                />
            </div> */}
        </div>
    );
}
