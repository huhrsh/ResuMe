import { Link, useOutletContext } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function UserContacts() {
    const { userDetails } = useOutletContext();
    const contacts = userDetails.contacts;

    if(!contacts){
        return(
            <h1 style={{ fontFamily: userDetails.selectedFont ? userDetails.selectedFont : 'Outfit' }} className="nothing-to-show">Nothing to show here</h1>
        )
    }

    return (
        <div className="contact-outer-div" style={{ fontFamily: userDetails.selectedFont ? userDetails.selectedFont : 'Outfit' }}>
            <div className='contact-inner-div'>
                {contacts.map((contact, index) => (
                        <Link target="_blank" key={index} to={(contact.label==='Phone' && 'tel:'+contact.value) || (contact.label==='Email' && 'mailto:'+contact.value) || contact.value} className="group contact-div">
                            <h3 className="contact-label">{contact.label} </h3>
                            <p className="w-0 group-hover:pl-4 group-hover:w-full contact-data">{contact.value}</p>
                            <span className="dash">|</span>
                        </Link>

                ))}
            </div>
        </div>
    );
}
