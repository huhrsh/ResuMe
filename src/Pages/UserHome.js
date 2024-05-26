import React, { useEffect, useRef } from 'react';
import ReactFluidAnimation from '@usertive/react-fluid-animation';
import { useOutletContext, useParams } from 'react-router-dom';

export default function UserHome() {
    const userDetails = useOutletContext()
    console.log(userDetails)
    const animationRef = useRef(null);

    useEffect(() => {
        let interval = setTimeout(() => {
            if (animationRef.current) {
                animationRef.current.addRandomSplats(30);
            }
        }, 10)
        // return ()=>clearInterval(interval)
    }, []);

    return (
        <>
            <div className="w-screen h-screen -z-0">
                <ReactFluidAnimation
                    style={{ bg: "white", position: "absolute", top: 0, left: 0, zIndex: "-0" }}
                    config={{
                        textureDownsample: 1,
                        densityDissipation: 0.99,
                        velocityDissipation: 0.99,
                        pressureDissipation: 0.8,
                        pressureIterations: 25,
                        curl: 0,
                        splatRadius: 0.01,
                        splatForce: 6000,
                        colorsPool: [ // Add more colors here
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
            </div>
                <h1 className='text-white z-10 absolute top-[35%] left-[50%] -translate-x-[50%] -translate-y-[50%]' style={{fontFamily:userDetails.selectedFont?userDetails.selectedFont:"outfit", fontSize:userDetails.selectedSize?userDetails.selectedSize*4:24*4}} >{userDetails.name}</h1>
        </>
    );
}
