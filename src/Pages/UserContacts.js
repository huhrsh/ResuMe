import { Link, useOutletContext } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function UserContacts() {
    const { userDetails } = useOutletContext();
    const contacts = userDetails.contacts;

    if(!contacts){
        return(
            <h1 className="user-loading-text text-5xl max-sm:text-3xl py-32 max-sm:py-28 px-20 max-sm:px-6">Nothing to show here</h1>
        )
    }

    return (
        <div className="py-32 px-32 max-sm:py-28 max-sm:px-6" style={{ fontFamily: userDetails.selectedFont ? userDetails.selectedFont : 'Outfit' }}>
            <div className={`flex flex-col gap-10 items-start`}>
                {contacts.map((contact, index) => (
                        <Link target="_blank" key={index} to={(contact.label==='Phone' && 'tel:'+contact.value) || (contact.label==='Email' && 'mailto:'+contact.value) || contact.value} className="flex gap-2 items-center group transition-all duration-200 ease-in-out max-sm:flex-col max-sm:items-start">
                            <h3 className="text-5xl max-sm:text-3xl font-bold user-loading-text">{contact.label} </h3>
                            <p className="group-hover:pl-4 text-lg text-white pt-2 w-0 overflow-hidden group-hover:w-full transition-all duration-500 ease-in-out max-sm:w-full">{contact.value}</p>
                            <span className="text-5xl font-bold user-loading-text max-sm:hidden">|</span>
                        </Link>

                ))}
            </div>
        </div>
    );
}
