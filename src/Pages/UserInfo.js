import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../Context";

export default function UserInfo() {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, loading } = useUser();

    const getEndUrlPart = () => {
        const parts = location.pathname.split('/');
        return parts[parts.length - 1];
    };

    const [pathName, setPathName] = useState(getEndUrlPart());

    useEffect(() => {
        if (!loading && !user) {
            navigate('/');
        }
    }, [user, loading]);

    useEffect(() => {
        setPathName(getEndUrlPart())
    }, [location.pathname]);

    const navLinks = [
        { to: "basics", label: "Basics" },
        { to: "about", label: "About" },
        { to: "education", label: "Education" },
        { to: "experience", label: "Work Experience" },
        { to: "projects", label: "Projects" },
        { to: "certifications", label: "Certifications" },
        { to: "skills", label: "Skills" },
        { to: "contacts", label: "Contacts" },
        { to: "themes", label: "Themes" },
        // { to: "colors", label: "Colors" },
        // { to: "fonts", label: "Fonts" }
    ];

    return (
        <main className="w-screen p-12 flex font-[raleway] relative">
            <aside className="user-info-aside flex flex-col w-60 gap-1 fixed top-[50%] -translate-y-[43%] justify-center " >
                {navLinks.map(({ to, label }) => (
                    <Link
                        key={to}
                        to={to}
                        className={`w-60 relative overflow-hidden text-gray-600 hover:text-white transition-all duration-200 border
                        before:content-[''] before:absolute 
                        before:bg-gradient-to-tr before:from-purple-700 before:to-violet-500
                        before:h-full before:w-0 before:transition-all before:duration-300 before:hover:w-full before:-z-10 before:top-0 before:left-0
                        ${pathName === to && "ml-5 before:w-full text-white"}`}
                    >
                        {label}
                    </Link>
                ))}
            </aside>
            <section className="ml-[24%] w-[80%] h-auto scroll-auto">
                <Outlet />
            </section>
        </main>
    )
}
