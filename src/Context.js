import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";

const { useContext, createContext, useState, useEffect } = require("react");

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docSnap = await getDoc(doc(db, "users", user.uid))
                if (docSnap.exists()) {
                    setUser({ uid: user.uid, ...docSnap.data() });
                    setLoading(false)
                }
                else {
                    const adminDocSnap = await getDoc(doc(db, "admin", user.uid))
                    if (adminDocSnap.exists()) {
                        setUser({ uid: user.uid, ...adminDocSnap.data() });
                        setLoading(false)
                    }
                }
            } else {
                setUser(null);
                setLoading(false)
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ loading, setLoading, user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);