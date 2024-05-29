import React from 'react';
import Feedback from './Feedback';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-gray-100 z-[10] text-gray-700 px-8  py-4 font-[raleway] ">
            <div className="container mx-auto flex flex-col max-sm:gap-4">
                <div>
                    <Feedback />
                </div>
                <div className="text-md font-medium text-center">
                    Made with 💛 by <Link target='_blank' to="https://www.linkedin.com/in/harsh-jain-10467a22b/" className='text-amber-500'>Harsh Jain</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
