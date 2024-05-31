import { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { db } from "../Firebase";
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import boldPurpleBackground from "../Assets/Images/pexels-tuesday-temptation-190692-3780104.jpg";
// import simplyBlackBackground from "../Assets/Images/pexels-adrien-olichon-1257089-2931286.jpg";
import simplyBlackBackground from "../Assets/Images/pexels-danielabsi-952670.jpg";
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

    const backgroundImages = {
        "bold-purple": boldPurpleBackground,
        "simply-black":simplyBlackBackground
        // "style2": style2Background,
        // "style3": style3Background,
        // Add more background images for other styles as needed
    };

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

    const desiredOrder = ['education', 'projects', 'experience', 'certifications', 'skills', 'contacts'];

    useEffect(() => {
        if (userDetails) {
            setSections(Object.keys(userDetails.selectedSections).filter(section => userDetails.selectedSections[section]).sort((a, b) => desiredOrder.indexOf(a) - desiredOrder.indexOf(b)));
        }
    }, [userDetails]);

    return (
        loading ? <UserLoading username={username} /> :
            <>
                <header className={`${userDetails.selectedStyle}-user-header`} style={{ fontFamily: userDetails.selectedFont ? userDetails.selectedFont : "outfit" }}>
                    <Link onClick={() => { setOpenMenu(false) }} className="username-heading" to={`/` + userDetails.username}>{userDetails.username}</Link>
                    {openMenu ?
                        <img src={cross} alt="cross" className='cross' onClick={() => { setOpenMenu(!openMenu) }} />
                        :
                        <img src={menu} alt="menu" className='menu' onClick={() => { setOpenMenu(!openMenu) }} />
                    }
                    {
                        openMenu &&
                        <div className="mobile-header animate__animated animate__fadeInUp" style={{ fontFamily: userDetails.selectedFont ? userDetails.selectedFont : "outfit" }}>
                            {sections?.map((section, index) => {
                                const isActive = location.pathname.endsWith(section);
                                return (
                                    <Link onClick={() => { setOpenMenu(!openMenu) }} key={index} to={section} className={`${isActive ? 'mobile-header-active-link' : 'mobile-header-links'}`} >{section}</Link>
                                );
                            })}
                        </div>
                    }
                    <div className="desktop-header" style={{ fontFamily: userDetails.selectedFont ? userDetails.selectedFont : "outfit" }}>
                        {sections?.map((section, index) => {
                            const isActive = location.pathname.endsWith(section);
                            return (
                                <Link key={index} to={section} className={`${isActive ? 'desktop-header-active-link' : 'desktop-header-links'} `}>{section}</Link>
                            );
                        })}
                    </div>
                </header>
                <div className={`${userDetails.selectedStyle}-div`} style={{ backgroundImage: `url(${backgroundImages[userDetails.selectedStyle]})` }}></div>
                <main className={`${userDetails.selectedStyle}-main`}>
                    <Outlet context={{ userDetails, setLoading }} />
                    <footer className="footer">
                        Made with <Link target="_blank" to='/' className={`${userDetails.selectedStyle}-footer-text`}>ResuMe</Link>
                    </footer>
                </main>
            </>
    );
}
