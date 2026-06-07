import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

export default function ProtectedRoute({ children }) {
    // Kicsomagoljuk a te AuthContext-edből a user és loading állapotokat
    const { user, loading } = useAuth();

    // Amíg az oldal betöltésekor (vagy F5-nél) fut a whoami() kérés, 
    // egy sötét hátterű betöltő képernyőt mutatunk, hogy ne ugorjon el azonnal az oldal
    if (loading) {
        return (
            <div style={{ 
                background: '#03070f', 
                minHeight: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#ffffff',
                fontFamily: 'sans-serif'
            }}>
                <p>Ellenőrzés...</p>
            </div>
        );
    }

    // Ha a whoami() lefutott, és a user null maradt (nincs bejelentkezve),
    // átirányítjuk a login oldalra
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Ha van user, akkor minden rendben, megmutatjuk a védett oldalt (History)
    return children;
}