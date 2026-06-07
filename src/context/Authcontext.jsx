import { createContext, useContext, useEffect, useState } from "react";
import { whoami, logout } from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [errorUser, setErrorUser] = useState('');
    const [loading, setLoading] = useState(true);

    // Ez fut le az oldal betöltésekor (F5-nél)
    // Ez fut le az oldal betöltésekor (F5-nél)
    useEffect(() => {
        async function loadUser() {
            try {
                const data = await whoami();
                if (data && !data.error) {
                    setUser(data);
                } else {
                    setUser(null); // Ha hiba van (pl. 401), csendben null-ra állítjuk
                }
            } catch (err) {
                setUser(null); // Bármilyen váratlan hiba esetén is biztonságban null marad
            } finally {
                setLoading(false); // Ez GARANTÁLTAN lefut, így nem akad be a betöltő képernyő
            }
        }
        loadUser();
    }, []);
    const loginUser = (userData) => {
        setUser(userData);
    };

    async function onLogout() {
        const data = await logout();
        if (data.error) {
            setErrorUser(data.error);
            return;
        }
        setUser(null);
    }

    return (
        /* A loginUser-t is betesszük a value-ba, hogy elérjük kívülről */
        <AuthContext.Provider value={{ user, setUser, loginUser, loading, errorUser, onLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}