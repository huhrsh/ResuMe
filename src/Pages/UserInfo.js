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

    const navLinks = [
        { to: "general", label: "General" },
        { to: "about", label: "About" },
        { to: "education", label: "Education" },
        { to: "experience", label: "Work Experience" },
        { to: "projects", label: "Projects" },
        { to: "certifications", label: "Certifications" },
        { to: "skills", label: "Skills" },
        { to: "contacts", label: "Contacts" },
        { to: "themes", label: "Themes" },
        // {to: "submit", label:"Submit for approval"}
    ];

    useEffect(() => {
        if (!loading) {
            if (!user) {
                navigate('/');
            }
            else {
                if (user.websiteStatus !== 'active') {
                    navLinks.push({ to: "submit", label: "Submit for approval" })
                }
            }
        }
    }, [user, loading]);

    useEffect(() => {
        setPathName(getEndUrlPart())
    }, [location.pathname]);


    return (
        <main className="w-screen p-12 max-sm:px-6 max-sm:py-8 flex font-[raleway] relative max-sm:flex-col">
            <aside className="sm:hidden user-info-aside gap-2 grid grid-cols-2 grid-flow-row mb-12" >
                {navLinks.map(({ to, label }) => (
                    <Link
                        key={to}
                        to={to}
                        className={`col-span-1 relative overflow-hidden text-gray-600 hover:text-white transition-all duration-200 border
                            before:content-[''] before:absolute 
                            before:bg-gradient-to-tr before:from-purple-700 before:to-violet-500
                            before:h-full before:w-0 before:transition-all before:duration-300 before:hover:w-full before:-z-10 before:top-0 before:left-0
                            ${pathName === to && "before:w-full text-white"}`}
                    >
                        {label}
                    </Link>
                ))}
            </aside>

            <div className="max-sm:hidden">
                <aside className="user-info-aside z-0 flex flex-col w-0 gap-1 sticky top-40 left-0  justify-center " >
                    {/* <aside className="user-info-aside z-0 flex flex-col w-60 gap-1 fixed top-[50%] -translate-y-[43%] justify-center " > */}
                    {navLinks.map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`w-60 relative overflow-hidden text-gray-600 hover:text-white transition-all duration-200 border
                            before:content-[''] before:absolute 
                            before:bg-gradient-to-tr before:from-purple-700 before:to-violet-500
                            before:h-full before:w-0 before:transition-all before:duration-300 before:hover:w-full before:-z-10 before:top-0 before:left-0
                            ${pathName === to ? "ml-5 before:w-full text-white" : ""}`}
                        >
                            {label}
                        </Link>
                    ))}
                </aside>
            </div>
            <section className="ml-[24%] w-[80%] h-auto scroll-auto max-sm:m-0 max-sm:w-full">
                <Outlet />
            </section>
        </main>

    )
}
