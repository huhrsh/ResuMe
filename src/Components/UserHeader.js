import { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { db } from "../Firebase";
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import bgImage from "../Assets/Images/pexels-tuesday-temptation-190692-3780104.jpg";
import UserLoading from "../Pages/UserLoading";

export default function UserHeader() {
    const { username } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState();
    const [sections, setSections] = useState();

    useEffect(() => {
        setLoading(true);
        const fetchUser = async () => {
            try {
                const q = query(collection(db, 'users'), where('username', '==', username));
                const snapshot = await getDocs(q);

                if (snapshot.empty) {
                    toast.error("No user available.");
                    navigate('/no-user');
                } else {
                    const userData = snapshot.docs[0].data();
                    setUserDetails(userData);
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

    console.log(userDetails);

    const desiredOrder = ['education', 'projects', 'experience', 'certifications', 'skills', 'contacts'];

    useEffect(() => {
        if (userDetails) {
            setSections(Object.keys(userDetails.selectedSections).filter(section => userDetails.selectedSections[section]).sort((a, b) => desiredOrder.indexOf(a) - desiredOrder.indexOf(b)));
        }
    }, [userDetails]);

    return (
        loading ? <UserLoading username={username} /> :
            <>
                <header className={`flex justify-between items-center fixed z-50 px-12 py-4 w-screen text-white`} style={{ fontFamily: userDetails.selectedFont ? userDetails.selectedFont : "outfit", fontSize: userDetails.selectedSize ? userDetails.selectedSize : 24 }}>
                    <Link className="cursor-pointer" to={`/` + userDetails.username}>{userDetails.username}</Link>
                    <div className="flex gap-12 justify-end" style={{ fontFamily: userDetails.selectedFont ? userDetails.selectedFont : "outfit", fontSize: userDetails.selectedSize ? userDetails.selectedSize / 1.4 : 24 / 1.4 }}>
                        {sections?.map((section, index) => {
                            const isActive = location.pathname.endsWith(section);
                            return (
                                <Link
                                    key={index}
                                    to={section}
                                    className={`
                                    capitalize relative transition-all duration-300
                                    before:transition-all before:duration-200 
                                    before:content-[''] before:absolute before:h-0.5 before:w-0 
                                    before:bg-white before:-bottom-1
                                    hover:before:left-0 hover:before:w-full
                                    ${isActive ? 'before:w-full before:left-0' : ''}
    `}
                                >
                                    {section}
                                </Link>

                            );
                        })}
                    </div>
                </header>
                <div className="bg-cover h-screen w-screen fixed" style={{ backgroundImage: `url(${bgImage})` }}></div>
                <main className="w-screen min-h-screen h-auto backdrop-blur-3xl">
                    <Outlet context={userDetails} />
                </main>
            </>
    );
}
