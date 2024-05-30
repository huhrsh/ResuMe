import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { useUser } from "../Context";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import waitingImage from "../Assets/Images/Time management-rafiki.png"
import hurryImage from "../Assets/Images/Freelancer-cuate.png"
import { useNavigate } from "react-router-dom";

export default function SubmitInfo() {
    const { user, setUser, loading, setLoading } = useUser();
    const [requestSent, setRequestSent] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if(!loading){
            if (user) {
                setRequestSent(user.websiteStatus === 'pending')
            }
        }
    }, [user, loading])

    const handleRequestApproval = async () => {
        if (!user.username) {
            toast.error("Username cannot be empty!");
            navigate('/dashboard/general')
            return;
        }
        if ( !user.about) {
            toast.error("About section cannot be empty!");
            navigate('/dashboard/general')
            return;
        }
        setLoading(true);
        try {
            await updateDoc(doc(db, "users", user.uid), { websiteStatus: "pending" });
            setRequestSent(true);
            setUser({ ...user, websiteStatus: "pending" })
            toast.success("Request sent successfully.");
        } catch (error) {
            console.error("Error updating website status:", error);
            toast.error("Failed to send request for approval.");
        }

        setLoading(false);
    };

    if (user?.websiteStatus === "inactive") {
        return (
            <div className="px-4">
                <h2 className="text-purple-700 text-3xl font-bold mb-4">Get Your Website Now!</h2>
                <div className="flex items-center">
                    <img src={hurryImage} alt="Limited Time Offer" className="w-5/12" />
                    <div className="flex flex-col justify-start p-8 gap-2 items-start">
                        <p className="text-lg font-medium text-gray-600">Your website is currently inactive. Take advantage of our limited-time offer to get your website for free.</p>
                        {requestSent && <p>Your request for approval has been sent. We'll review it soon!</p>}
                        {!requestSent && (
                            <button onClick={handleRequestApproval} className="bg-gradient-to-br from-purple-500 to-purple-700 text-white font-medium py-2 px-4 rounded focus:outline-none transition-all duration-200 hover:shadow-lg">
                                Request Approval
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    } else if (user?.websiteStatus === "pending") {
        return (
            <div className="px-4">
                <h2 className="text-purple-700 text-3xl font-bold mb-4">Get Your Website Now!</h2>
                <div className="flex items-center">
                    <img src={waitingImage} alt="waiting" className="w-5/12" />
                    <div className="flex flex-col justify-start p-8 gap-2 items-start">
                        <p className="text-lg font-medium text-gray-600">Your request for approval has been sent. We'll review it soon!</p>
                    </div>
                </div>
            </div>
        );
    } else {
        // If website status is "active", don't render anything
        return null;
    }
}
