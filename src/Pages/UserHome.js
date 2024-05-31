import React, { useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';


export default function UserHome() {
    const {userDetails} = useOutletContext();
    const animationRef = useRef(null);

    useEffect(() => {
        if (animationRef.current) {
            animationRef.current.addRandomSplats(30);
        }
    }, []);

    return (
        <div className="home" style={{
            fontFamily: userDetails.selectedFont ? userDetails.selectedFont : "outfit",
        }}>
            <div className='div'>
                <h1 className='name'>
                    {userDetails.name}
                </h1>
                <h2 className='profession'>{userDetails.profession}</h2>
                <p className='about'>{userDetails.about}</p>
            </div>
        </div>
    );
}
