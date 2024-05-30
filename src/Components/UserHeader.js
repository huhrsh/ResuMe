import { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { db } from "../Firebase";
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import bgImage from "../Assets/Images/pexels-tuesday-temptation-190692-3780104.jpg";
import UserLoading from "../Pages/UserLoading";
import menu from "../Assets/Images/menu-burger.png"
import cross from "../Assets/Images/cross-small.png"

export default function UserHeader() {
    const { username } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState();
    const [sections, setSections] = useState();
    const [openMenu, setOpenMenu] = useState(false)

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

    // console.log(userDetails);

    const desiredOrder = ['education', 'projects', 'experience', 'certifications', 'skills', 'contacts'];

    useEffect(() => {
        if (userDetails) {
            setSections(Object.keys(userDetails.selectedSections).filter(section => userDetails.selectedSections[section]).sort((a, b) => desiredOrder.indexOf(a) - desiredOrder.indexOf(b)));
        }
    }, [userDetails]);

    return (
        loading ? <UserLoading username={username} /> :
            <>
                <header className={`flex justify-between items-center fixed z-50 px-12 py-4 max-sm:px-6 w-screen text-white`} style={{ fontFamily: userDetails.selectedFont ? userDetails.selectedFont : "outfit", fontSize:24 }}>
                    <Link onClick={()=>{setOpenMenu(false)}} className="cursor-pointer z-10" to={`/` + userDetails.username}>{userDetails.username}</Link>
                    {openMenu ?
                        <img src={cross} alt="cross" className={`h-8 z-10 sm:hidden`} onClick={() => { setOpenMenu(!openMenu) }} />
                        :
                        <img src={menu} alt="menu" className={`h-6 z-10 sm:hidden`} onClick={() => { setOpenMenu(!openMenu) }} />
                    }
                    {
                        openMenu &&
                        <div className="sm:hidden flex flex-col absolute z-0 top-0 right-0 bg-[#000000aa] backdrop-blur-sm py-12 pt-20 px-6 w-full h-screen animate__animated animate__fadeInUp justify-start gap-10 user-loading-text text-amber-400 font-[outfit]" style={{ fontFamily: userDetails.selectedFont ? userDetails.selectedFont : "outfit", fontSize: userDetails.selectedSize ? userDetails.selectedSize / 1.4 : 24 / 1.4 }}>
                            {sections?.map((section, index) => {
                                const isActive = location.pathname.endsWith(section);
                                return (
                                    <Link
                                        onClick={()=>{setOpenMenu(!openMenu)}}
                                        key={index}
                                        to={section}
                                        className={`
                                        text-4xl
                                        hover:text-white
                                    capitalize relative transition-all duration-300
                                    before:transition-all before:duration-200 
                                    ${isActive ? 'text-white' : ''}
    `}
                                    >
                                        {section}
                                    </Link>
                                );
                            })}
                        </div>
                    }
                    <div className="  max-sm:hidden flex gap-12 justify-end" style={{ fontFamily: userDetails.selectedFont ? userDetails.selectedFont : "outfit", fontSize: userDetails.selectedSize ? userDetails.selectedSize / 1.4 : 24 / 1.4 }}>
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
                <div className="bg-cover h-[110vh] w-screen fixed top-0 left-0" style={{ backgroundImage: `url(${bgImage})` }}></div>
                <main className="w-screen min-h-screen h-auto backdrop-blur-3xl relative">
                    <Outlet context={{ userDetails, setLoading }} />
                    <footer className="flex py-2 text-md font-medium justify-center items-center gap-2 font-[raleway] text-white absolute left-1/2 -translate-x-[50%] bottom-0">
                        Made with <Link target="_blank" to='/' className="text-amber-400">ResuMe</Link>
                    </footer>
                </main>
            </>
    );
}
