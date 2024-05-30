import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { useUser } from "../Context";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import workingImage from "../Assets/Images/Working from anywhere-cuate.png"
import boldPurple from "../Assets/Images/bold purple.png";
// import style2Image from "../Assets/Images/style2.jpg";
// import style3Image from "../Assets/Images/style3.jpg";

const styles = [
    { name: "Bold Purple", image: boldPurple  },
    // { name: "Bold Purple2", image: boldPurple  },
    // { name: "Bold Purple3", image: boldPurple  },
    // { name: "Style 2", image: style2Image },
    // { name: "Style 3", image: style3Image },
];

const fonts = ["raleway", "outfit", "poppins", "afacad", "josefin", "lato", "inter", "nunito"];

export default function ThemeInfo() {
    const { user, setUser, setLoading } = useUser();
    const [selectedStyle, setSelectedStyle] = useState( "Bold Purple");
    const [selectedFont, setSelectedFont] = useState("raleway");

    useEffect(()=>{
        if(user && user.selectedFont){
            setSelectedFont(user.selectedFont)   
        }
        if(user && user.selectedStyle){
            setSelectedStyle(user.selectedStyle)
        }
    },[user])


    const handleStyleChange = async (style) => {
        setSelectedStyle(style);
        setLoading(true);

        try {
            await updateDoc(doc(db, "users", user.uid), { selectedStyle: style });
            setUser({ ...user, selectedStyle: style });
            toast.success("Style updated successfully.");
        } catch (error) {
            console.error("Error updating style:", error);
            toast.error("Failed to update style.");
        }

        setLoading(false);
    };

    const handleFontChange = async (font) => {
        setSelectedFont(font);
        setLoading(true);

        try {
            await updateDoc(doc(db, "users", user.uid), { selectedFont: font });
            setUser({ ...user, selectedFont: font });
            toast.success("Font updated successfully.");
        } catch (error) {
            console.error("Error updating font:", error);
            toast.error("Failed to update font.");
        }

        setLoading(false);
    };

    return (
        <div className="px-4 max-sm:p-0">
            <h2 className="text-purple-700 text-3xl font-bold mb-4 max-sm:text-2xl">Choose Your Style</h2>
            <div className="grid grid-cols-2 gap-4 mb-8 grid-flow-row max-sm:grid-cols-1">
                {styles.map(({ name, image }) => (
                    <div
                        key={name}
                        className={`${name === selectedStyle && "border-2 border-gray-600"} border cursor-pointer overflow-hidden rounded hover:shadow-lg transition-all duration-200`}
                        onClick={() => handleStyleChange(name)}
                    >
                        <img src={image} alt={name} className="h-auto w-full object-cover" />
                        <div className="text-center p-2">
                            <span className="text-gray-600 font-medium font-[raleway]">{name}</span>
                        </div>
                    </div>
                ))}
            </div>
            <h2 className="text-purple-700 text-3xl font-bold mb-4 max-sm:text-2xl">Choose Your Font</h2>
            <div className="grid grid-cols-4 gap-4 max-sm:grid-cols-2">
                {fonts.map((font) => (
                    <div
                        key={font}
                        className={`${font === selectedFont && "border-2 border-gray-600"} py-3 flex items-center justify-center cursor-pointer border rounded hover:shadow-lg transition-all duration-200`}
                        style={{ fontFamily: font }}
                        onClick={() => handleFontChange(font)}
                    >
                        <span className="text-gray-600 font-medium">{font}</span>
                    </div>
                ))}
            </div>
            <section className="shadow shadow-purple-200 border rounded-xl p-4 mr-12 mt-8 bg-purple-50 flex items-center gap-8 max-sm:flex-col max-sm:mr-0">
                <img src={workingImage} className="w-5/12 max-sm:w-full" alt="working"/>
                <h3 className="text-xl font-bold text-gray-600 max-sm:text-base">We're currently expanding our range of styles and customizations to offer you more options. Please bear with us as we make these updates.</h3>
                
            </section>
        </div>
    );
}
