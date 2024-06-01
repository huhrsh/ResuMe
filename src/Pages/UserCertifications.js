import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import defaultImage from "../Assets/Images/Certification-cuate.png";

export default function UserCertifications() {
    const { userDetails } = useOutletContext();
    const certifications = userDetails.certifications;

    if(!certifications){
        return(
            <h1 style={{ fontFamily: userDetails.selectedFont ? userDetails.selectedFont : 'Outfit' }} className="nothing-to-show">Nothing to show here</h1>
        )
    }

    return (
        <div className="certification-outer-div" style={{ fontFamily: userDetails.selectedFont ? userDetails.selectedFont : 'Outfit' }}>
            <div className="certification-inner-div">
                {certifications.map((cert, index) => (
                    <Link to={cert.link} target="_blank" key={index} className="certificate-div group" >
                        <div className="certificate-container-div">
                            <img src={cert.imageUrl || defaultImage} alt={cert.title} className="image" />
                            <div className="certificate-data-div group-hover:py-8 h-0 group-hover:h-full">
                                <h2 className="certificate-heading">{cert.title}</h2>
                                <p className="certificate-organizer">by {cert.organizer}</p>
                                <p className="certificate-point-desktop">Issued on: {new Date(cert.issueDate).toLocaleDateString()}</p>
                                <p className="certificate-point-desktop">{cert.validity === 'Lifetime' ? 'Validity: Lifetime' : "Valid till: " + new Date(cert.validity).toLocaleDateString()}</p>
                                <p className="certificate-point-mobile">{new Date(cert.issueDate).toLocaleDateString()} - {cert.validity === 'Lifetime' ? 'Lifetime' : "" + new Date(cert.validity).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
