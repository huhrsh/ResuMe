import { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet, Link } from "react-router-dom";
import { db } from "../Firebase";
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

export default function UserHeader() {
    const { username } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails]=useState()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const q = query(collection(db, 'users'), where('username', '==', username));
                const snapshot = await getDocs(q);
                
                if (snapshot.empty) {
                    toast.error("No user available.");
                    navigate('/no-user');
                } else {
                    const userData = snapshot.docs[0].data();
                    setUserDetails(userData)
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                toast.error("An error occurred while fetching user data.");
                navigate('/no-user');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [username, navigate]);

    console.log(userDetails)

    if (loading) {
        return <div>Loading...</div>; 
    }

    const desiredOrder = ['education', 'projects', 'experience', 'certifications', 'skills', 'contacts'];
    let sections=Object.keys(userDetails.selectedSections).filter(section => userDetails.selectedSections[section]).sort((a, b) => desiredOrder.indexOf(a) - desiredOrder.indexOf(b));


    return (
        <>
            <header className={`flex justify-between items-center fixed z-50 px-12 py-4 w-screen text-white`} style={{fontFamily:userDetails.selectedFont?userDetails.selectedFont:"outfit", fontSize:userDetails.selectedSize?userDetails.selectedSize:24}}>
                <Link className="cursor-pointer" to={`/`+userDetails.username}>{userDetails.username}</Link> 
                <div className="flex gap-8" style={{fontFamily:userDetails.selectedFont?userDetails.selectedFont:"outfit", fontSize:userDetails.selectedSize?userDetails.selectedSize/1.4:24/1.4}}>
                    {sections?.map((section,index)=>(
                        <Link to={section} className="">{section}</Link>
                    ))}
                </div>
            </header>
            <Outlet context={userDetails} />
        </>
    );
}
