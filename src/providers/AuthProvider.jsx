import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checkUser, setCheckUser] = useState(true)
    const logOut = (email) => {
        if (email) {
            setUser(null);
            axios.post("http://localhost:5000/logOutUser", { email }).then(data => {
                if (data.data.modifiedCount > 0) {
                    setUser(null)
                    localStorage.removeItem("userId")
                }
            })
        }
    }
    const authInfo = {
        user,
        loading,
        setCheckUser,
        checkUser,
        logOut
    }
    useEffect(() => {
        if (localStorage.getItem("userId")) {
            axios.get(`http://localhost:5000/userAvailable/${localStorage.getItem("userId")}`).then(data => {
                if (data.data.loggedIn) {
                    setUser(data.data)
                    setLoading(false)
                }
            })
        } else {
            setLoading(false)
        }
    }, [checkUser])
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;