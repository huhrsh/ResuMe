import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import defaultImage from "../Assets/Images/Certification-cuate.png";

export default function UserCertifications() {
    const { userDetails } = useOutletContext();
    const certifications = userDetails.certifications;

    return (
        <div className="py-32 pb-20 px-20 max-sm:px-6 max-sm:py-28" style={{ fontFamily: userDetails.selectedFont ? userDetails.selectedFont : 'Outfit' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-sm:gap-8">
                {certifications.map((cert, index) => (
                    <Link to={cert.link}
                        target="_blank"
                        key={index}
                        className="h-auto w-full rounded-lg group transition-all duration-200 relative "
                    >
                        <div className="relative overflow-hidden transition-all duration-250">
                            <img
                                src={cert.imageUrl || defaultImage}
                                alt={cert.title}
                                className="w-full  object-cover rounded-lg"
                            />
                            <div className="rounded-lg absolute top-0 left-0 flex flex-col gap-2 transition-all duration-200 ease-in-out h-0 overflow-hidden w-full group-hover:h-full hover:py-8 px-8 bg-[#000000dd] max-sm:h-full max-sm:static max-sm:bg-inherit max-sm:py-4 max-sm:px-2 max-sm:gap-0">
                                <h2 className="text-5xl max-sm:text-3xl font-bold user-loading-text">{cert.title}</h2>
                                <p className="text-purple-400 text-xl font-noraml">by {cert.organizer}</p>
                                <p className="text-lg text-gray-200 max-sm:hidden">Issued on: {new Date(cert.issueDate).toLocaleDateString()}</p>
                                <p className="text-lg text-gray-200 max-sm:hidden">{cert.validity === 'Lifetime' ? 'Validity: Lifetime' : "Valid till: " + new Date(cert.validity).toLocaleDateString()}</p>
                                <p className="text-lg text-gray-200 -sm:hidden">{new Date(cert.issueDate).toLocaleDateString()} - {cert.validity === 'Lifetime' ? 'Lifetime' : "" + new Date(cert.validity).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
