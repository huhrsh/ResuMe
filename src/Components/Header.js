import { Link, Outlet, useNavigate } from "react-router-dom";
import profile from "../Assets/Images/abstract.png"
import Loading from "../Pages/Loading";
import { useUser } from "../Context";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import downArrow from "../Assets/Images/angle-down.png"
import downArrow1 from "../Assets/Images/angle-down (1).png"
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import Footer from "./Footer";

export default function Header() {
    const [dropdown, setDropdown] = useState(false);
    const [dropdown1, setDropdown1] = useState(false);

    const navigate = useNavigate()
    const handleSignOut = async (e) => {
        e.preventDefault();
        setDropdown(false)
        try {
            navigate('/')
            await signOut(auth);
            toast.success('Signed out successfully!');
        } catch (error) {
            toast.error('Error signing out');
            console.error('Error during sign out:', error);
        }
    };


    const { user, loading } = useUser();
    return (
        <>
            <ToastContainer autoClose={3000} position="top-center" />
            {loading && <Loading />}
            <header className="shadow sticky top-0 left-0 bg-white z-50 shadow-purple-100 font-[raleway] px-12 py-4 flex justify-between items-center antialiased
            max-sm:px-4
            ">
                <Link to='/' className="text-3xl bg-gradient-to-bl from-violet-500 to-purple-800 text-transparent bg-clip-text flex items-center gap-1 font-semibold tracking-tighter">
                    <img src={profile} alt="logo" className="h-8 logo" />
                    Portify
                </Link>
                {!loading && (
                    user ?
                        <>
                            <div className="w-1/2 flex flex-col relative items-end">
                                <button className="overflow-hidden border px-3 py-1 rounded flex-shrink-0 font-medium text-purple-700 w-fit text-lg flex items-center justify-end pr-2 gap-2 sm:hidden" onClick={() => { setDropdown(!dropdown) }}>{user.name}
                                    {
                                        dropdown ?
                                            <img src={downArrow} className="transition-all duration-200 h-3 rotate-180" alt="down" />
                                            : <img src={downArrow} className="transition-all duration-200 h-3" alt="down" />
                                    }
                                </button>
                                {dropdown && <div className="flex sm:hidden flex-col top-12 justify-between absolute items-end text-lg font-medium gap-2">
                                    {user.websiteStatus === 'active' && < Link onClick={()=>{setDropdown(false)}} target="_blank" className="flex-shrink-0 w-full text-center  border bg-white rounded text-purple-700 px-3 py-1 transition-all duration-200 hover:text-white hover:shadow hover:bg-purple-700" to={`/${user.username}`}>
                                        Go to website
                                    </Link>
                                    }
                                    {
                                        user.admin ?
                                            < Link onClick={()=>{setDropdown(false)}} className="border bg-white flex-shrink-0 w-full text-center  rounded text-purple-700 px-3 py-1 transition-all duration-200 hover:text-white hover:shadow hover:bg-purple-700" to='/admin-dashboard'>
                                                Dashboard
                                            </Link> :
                                            < Link onClick={()=>{setDropdown(false)}} className="border bg-white flex-shrink-0 w-full text-center rounded text-purple-700 px-3 py-1 transition-all duration-200 hover:text-white hover:shadow hover:bg-purple-700" to='/dashboard/general'>
                                                Dashboard
                                            </Link>
                                    }
                                    <button className="border  w-full text-center bg-white rounded text-rose-600 px-3 py-1 transition-all duration-200 hover:text-white hover:shadow hover:bg-rose-600" onClick={(e) => { handleSignOut(e) }}>
                                        Sign out
                                    </button>
                                </div >}
                            </div>
                            <div className="flex max-sm:hidden justify-between min-w-56 text-lg font-medium gap-6">
                                {user.websiteStatus === 'active' && < Link target="_blank" className="flex-shrink-0 rounded text-purple-700 px-3 py-1 transition-all duration-200 hover:text-white hover:shadow hover:bg-purple-700" to={`/${user.username}`}>
                                    Go to website
                                </Link>
                                }
                                {
                                    user.admin ?
                                        < Link className="flex-shrink-0 rounded text-purple-700 px-3 py-1 transition-all duration-200 hover:text-white hover:shadow hover:bg-purple-700" to='/admin-dashboard'>
                                            Dashboard
                                        </Link> :
                                        < Link className="flex-shrink-0 rounded text-purple-700 px-3 py-1 transition-all duration-200 hover:text-white hover:shadow hover:bg-purple-700" to='/dashboard/general'>
                                            Dashboard
                                        </Link>
                                }
                                <button className="rounded text-rose-600 px-3 py-1 transition-all duration-200 hover:text-white hover:shadow hover:bg-rose-600" onClick={(e) => { handleSignOut(e) }}>
                                    Sign out
                                </button>
                            </div >
                        </>
                        :
                        <>
                            <div className="relative">
                                <button className=" sm:hidden rounded px-3 py-2 transition-all duration-200 text-white shadow hover:shadow-lg bg-gradient-to-tr from-purple-700 to-violet-500 flex items-center font-medium gap-2" onClick={() => { setDropdown1(!dropdown1) }}>Get Started
                                    {
                                        dropdown1 ?
                                            <img src={downArrow1} className="transition-all duration-200 h-3 rotate-180" alt="down" />
                                            : <img src={downArrow1} className="transition-all duration-200 h-3" alt="down" />
                                    }
                                </button>
                                {
                                    dropdown1 &&
                                    <div className="flex absolute w-full flex-col justify-between items-stretch top-12 right-0 sm:hidden text-lg font-medium gap-2 ">
                                        <Link onClick={()=>{setDropdown1(false)}} className="border text-center rounded text-purple-700 px-3 py-1 bg-white transition-all duration-200 hover:text-white hover:shadow hover:bg-purple-700" to='/sign-up'>
                                            Sign up
                                        </Link>
                                        <Link onClick={()=>{setDropdown1(false)}} className="border text-center rounded text-purple-700 px-3 py-1 bg-white transition-all duration-200 hover:text-white hover:shadow hover:bg-purple-700" to='/sign-in'>
                                            Sign in
                                        </Link>
                                    </div>
                                }
                            </div>
                            <div className="flex justify-between max-sm:hidden min-w-56 text-lg font-medium gap-6 ">
                                <Link className="max-sm:hidden rounded text-purple-700 px-3 py-1 transition-all duration-200 hover:text-white hover:shadow hover:bg-purple-700" to='/sign-up'>
                                    Sign up
                                </Link>
                                <Link className="max-sm:hidden rounded text-purple-700 px-3 py-1 transition-all duration-200 hover:text-white hover:shadow hover:bg-purple-700" to='/sign-in'>
                                    Sign in
                                </Link>
                                <Link className="rounded px-3 py-1 transition-all duration-200 text-white shadow hover:shadow-lg bg-gradient-to-tr from-purple-700 to-violet-500" to='/sign-up'>
                                    Get Started
                                </Link>
                            </div>
                        </>

                )
                }
            </header >
            <Outlet />
            <Footer />
        </>
    )
}