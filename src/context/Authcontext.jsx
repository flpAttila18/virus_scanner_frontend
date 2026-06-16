import { createContext, useContext, useEffect, useState } from "react";
import { whoami, logout } from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [errorUser, setErrorUser] = useState('');
    const [loading, setLoading] = useState(true);

    // Külön kiszervezzük a betöltő függvényt, hogy bárhonnan meg tudjuk hívni
    async function loadUser() {
        setLoading(true); // Újra bekapcsoljuk a betöltést a biztonság kedvéért
        try {
            const data = await whoami();
            if (data && !data.error) {
                setUser(data);
            } else {
                setUser(null);
            }
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    // Ez fut le az oldal betöltésekor (F5-nél)
    useEffect(() => {
        loadUser();
    }, []);

    // JAVÍTÁS: A loginUser mostantól egy aszinkron függvény, 
    // ami kényszeríti a rendszert a friss adatok lekérésére!
    const loginUser = async () => {
        await loadUser(); // Megvárjuk, amíg a whoami() közvetlenül a backendtől lekéri a friss adatokat
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
        <AuthContext.Provider value={{ user, setUser, loginUser, loading, errorUser, onLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}