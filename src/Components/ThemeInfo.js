import { useState } from "react";
import { db } from "../Firebase";
import { useUser } from "../Context";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";

const colors = [
    "red", "rose", "pink", "fuchsia", "purple", "violet",
    "indigo", "blue", "sky", "cyan", "teal", "emerald",
    "green", "lime", "yellow", "amber", "orange"
];

let tailwindColors = {
    "amber": "bg-gradient-to-r from-amber-400 to-amber-600",
    "blue": "bg-gradient-to-r from-blue-400 to-blue-600",
    "cyan": "bg-gradient-to-r from-cyan-400 to-cyan-600",
    "emerald": "bg-gradient-to-r from-emerald-400 to-emerald-600",
    "fuchsia": "bg-gradient-to-r from-fuchsia-400 to-fuchsia-600",
    "green": "bg-gradient-to-r from-green-400 to-green-600",
    "indigo": "bg-gradient-to-r from-indigo-400 to-indigo-600",
    "lime": "bg-gradient-to-r from-lime-400 to-lime-600",
    "orange": "bg-gradient-to-r from-orange-400 to-orange-600",
    "pink": "bg-gradient-to-r from-pink-400 to-pink-600",
    "purple": "bg-gradient-to-r from-purple-400 to-purple-600",
    "red": "bg-gradient-to-r from-red-400 to-red-600",
    "rose": "bg-gradient-to-r from-rose-400 to-rose-600",
    "sky": "bg-gradient-to-r from-sky-400 to-sky-600",
    "teal": "bg-gradient-to-r from-teal-400 to-teal-600",
    "violet": "bg-gradient-to-r from-violet-400 to-violet-600",
    "yellow": "bg-gradient-to-r from-yellow-400 to-yellow-600",
};




const fonts = ["raleway", "outfit", "poppins", "afacad"];

export default function ThemeInfo() {
    const { user, setUser, setLoading } = useUser();
    const [selectedColor, setSelectedColor] = useState(user ? user.selectedColor : "purple");
    const [selectedFont, setSelectedFont] = useState(user ? user.selectedFont : "raleway");

    const handleColorChange = async (color) => {
        // const color = `${color}`;
        setSelectedColor(color);
        setLoading(true);

        try {
            await updateDoc(doc(db, "users", user.uid), { selectedColor: color });
            setUser({ ...user, selectedColor: color });
            toast.success("Color updated successfully.");
        } catch (error) {
            console.error("Error updating color:", error);
            toast.error("Failed to update color.");
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
        <div className="px-4">
            <h2 className="text-purple-700 text-3xl font-bold mb-4">Choose Your Theme Color</h2>
            <div className="grid grid-cols-4 gap-4 mb-8 grid-flow-row">
                {colors.map((color) => (
                    <div
                        key={color}
                        className={`${tailwindColors[color]} ${color===selectedColor && "border-2 border-gray-600"} h-16 flex items-center justify-center cursor-pointer rounded hover:shadow-lg transition-all duration-200`}
                        onClick={() => handleColorChange(color)}
                    >
                        <span className="text-white font-medium text-lg">{color}</span>
                    </div>
                ))}
            </div>
            <h2 className="text-purple-700 text-3xl font-bold mb-4">Choose Your Font</h2>
            <div className="grid grid-cols-4 gap-4">
                {fonts.map((font) => (
                    <div
                        key={font}
                        className={`${font===selectedFont && "border-2 border-gray-600"} h-16 flex items-center justify-center cursor-pointer border rounded hover:shadow-lg transition-all duration-200`}
                        style={{ fontFamily: font }}
                        onClick={() => handleFontChange(font)}
                    >
                        <span className="text-gray-600 font-medium">{font}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
