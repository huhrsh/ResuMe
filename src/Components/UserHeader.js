import { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
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

    return (
        <>
            <header>
                asdadad
            </header>
            <Outlet />
        </>
    );
}
