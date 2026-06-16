import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/Authcontext';
import { whoami, updateUserName, UploadProfilePicture , Scan_Backend_URL} from '../api'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import def from '../Images/default.jpg';
import "../cssFolder/index.css";
import Navbar from '../components/Navbar';

export default function Profile() {
    const { user, setUser, loading } = useAuth();
    
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(user?.userName || user?.email?.split('@')[0] || '');
    const [profileImg, setProfileImg] = useState(def);
    const [localLoading, setLocalLoading] = useState(false); 
    
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    
    const fileInputRef = useRef(null);

    // Segédfüggvény a teljes backend kép URL előállításához (pl. http://localhost:5000/uploads/...)
  const getFullImageUrl = (path) => {
    // Ha nincs megadva kép, vagy pont a "default.png" jön vissza a tokennel, a helyi importált def-et adjuk vissza
    if (!path || path === "default.png") return def; 
    if (path.startsWith('http')) return path;   
    
    const baseUrl = Scan_Backend_URL.endsWith('/api') 
        ? Scan_Backend_URL.slice(0, -4) 
        : Scan_Backend_URL;
        
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    
    // Ha a mentett név pl. "pfp_1_xyz.png", akkor az uploads mappából töltjük be
    // De ha te a default.png-t is feltöltötted a backend wwwroot/uploads alá, akkor ez a sor sem kell, simán mehet a baseUrl+cleanPath!
    const separator = cleanPath.includes('uploads') ? '' : '/uploads';
    
    return `${baseUrl}${separator}${cleanPath}`;
};

    // Szinkronizáció a Context-ből érkező adatokkal
   useEffect(() => {
    // Ha már nem tölt az oldal, de nincs belépett felhasználó, azonnal vigyen a loginra
    if (!loading && !user) {
        window.location.href = '/login'; // Írd át a saját login útvonaladra, ha nem /login
        return;
    }

    if (user) {
        setUsername(user.userName || user.email?.split('@')[0] || 'Felhasználó');
        
        // 1. JAVÍTÁS: Kezdő betöltéskor a teljes URL-t adjuk meg
        if (user.profilePicture) {
            setProfileImg(getFullImageUrl(user.profilePicture));
        } else {
            setProfileImg(def);
        }
    }
}, [user, loading]);

    // MANUÁLIS FRISSÍTÉS A WHOAMI FÜGGVÉNNYEL
    const handleFetchLatestData = async () => {
        setLocalLoading(true);
        setErrorMsg('');
        setSuccessMsg('');
        try {
            const data = await whoami();
            if (data && !data.error) {
                setUser(data); 
                setUsername(data.userName || data.email?.split('@')[0] || 'Felhasználó');
                setSuccessMsg("Profil sikeresen szinkronizálva a szerverrel!");
            }
        } catch (err) {
            console.error("Nem sikerült lefrissíteni az adatokat:", err);
            setErrorMsg("Nem sikerült lefrissíteni az adatokat a szerverről.");
        } finally {
            setLocalLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container-fluid bg-black min-vh-100 text-white d-flex align-items-center justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container-fluid bg-black min-vh-100 text-white d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <h3 className="text-danger">Hozzáférés megtagadva</h3>
                    <p className="text-white-50">Kérlek, a profilod megtekintéséhez előbb jelentkezz be.</p>
                </div>
            </div>
        );
    }

    // PROFILKÉP FELTÖLTÉSE
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setErrorMsg('');
        setSuccessMsg('');
        setLocalLoading(true);
           
        try {
            const response = await UploadProfilePicture(file);
            
            if (response && response.error) {
                setErrorMsg(response.error);
            } else {
                setSuccessMsg(response.message || "Profilkép sikeresen frissítve!");
                
                // 2. JAVÍTÁS: Feltöltés után azonnal kiszámoljuk a teljes külső elérési utat
                const fullUrl = getFullImageUrl(response.profilePicture);
                setProfileImg(fullUrl);

                // A globális állapottal is szinkronizáljuk a kapott relatív utat
                setUser({ ...user, profilePicture: response.profilePicture });
            }
        } catch (ex) {
            console.error("Hiba a kép feltöltése során:", ex);
            setErrorMsg("Hálózati hiba történt a kép feltöltésekor.");
        } finally {
            setLocalLoading(false);
        }
    };

    const handleSave = async () => {
        setErrorMsg('');
        setSuccessMsg('');
        setLocalLoading(true);

        if (!username || username.trim().length < 3 || username.trim().length > 20) {
            setErrorMsg("A névnek 3 és 20 karakter között kell lennie!");
            setLocalLoading(false);
            return;
        }

        try {
            const response = await updateUserName({ Username: username.trim() });

            if (response && response.error) {
                setErrorMsg(response.error);
            } else {
                setSuccessMsg(response.message || "Felhasználónév sikeresen módosítva!");
                setUser({ ...user, userName: username.trim() });
                setIsEditing(false);
            }
        } catch (err) {
            console.error("Hiba történt a mentés során:", err);
            if (err.response && err.response.data && err.response.data.error) {
                setErrorMsg(err.response.data.error);
            } else {
                setErrorMsg("Hálózati hiba történt a mentés során.");
            }
        } finally {
            setLocalLoading(false);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="container-fluid bg-black min-vh-100 text-white d-flex align-items-center justify-content-center py-5">
            <div className="card bg-dark border-secondary p-4 rounded-4 shadow-lg woc" style={{ maxWidth: '450px', width: '100%' }}>
                
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold text-white m-0 ct">My <span className="text-primary">Profile</span></h2>
                        <p className="text-white-50 small m-0 settings-desc">Manage your account details</p>
                    </div>
                    <button 
                        className="btn btn-outline-secondary btn-sm p-2 rounded-circle" 
                        onClick={handleFetchLatestData}
                        disabled={localLoading}
                        title="Adatok frissítése"
                        style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifycontent: 'center' }}
                    >
                        {localLoading ? (
                            <span className="spinner-border spinner-border-sm text-primary" role="status"></span>
                        ) : (
                            "🔄"
                        )}
                    </button>
                </div>

                {errorMsg && <div className="alert alert-danger py-2 small mb-3">{errorMsg}</div>}
                {successMsg && <div className="alert alert-success py-2 small mb-3">{successMsg}</div>}

                <div className="d-flex flex-column align-items-center mb-4">
                    <div className="position-relative" onClick={() => !localLoading && fileInputRef.current.click()} style={{ cursor: localLoading ? 'not-allowed' : 'pointer' }}>
                        <img 
                            src={profileImg} 
                            className="pfp border border-secondary shadow" 
                            alt="Profile" 
                            style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', opacity: localLoading ? 0.6 : 1 }}
                        />
                        <div className="position-absolute bottom-0 end-0 bg-primary p-2 rounded-circle d-flex align-items-center justify-content-center shadow" style={{ width: '32px', height: '32px' }}>
                            <span className="text-white small" style={{ fontSize: '12px' }}>📸</span>
                        </div>
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="d-none" disabled={localLoading} />
                    <small className="text-muted mt-2">Kattints a képre a módosításhoz</small>
                </div>

                <hr className="border-secondary mb-4" />

                <div className="mb-4">
                    <label className="form-label text-white-50 small fw-bold">USERNAME</label>
                    {isEditing ? (
                        <div className="input-group">
                            <input 
                                type="text" 
                                className="form-control bg-black text-white border-secondary" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={localLoading}
                                autoFocus
                            />
                            <button 
                                className="btn btn-primary fw-bold" 
                                onClick={handleSave} 
                                disabled={localLoading}
                                style={{ width: 'auto', height: 'auto' }}
                            >
                                {localLoading ? (
                                    <span className="spinner-border spinner-border-sm" role="status"></span>
                                ) : (
                                    "Save"
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center justify-content-between bg-black p-3 rounded-3 border border-secondary settings-row">
                            <span className="fw-bold fs-5 text-white">{username}</span>
                            <button 
                                className="btn btn-outline-primary btn-sm px-3 fw-bold rounded-2"
                                onClick={() => {
                                    setErrorMsg('');
                                    setSuccessMsg('');
                                    setIsEditing(true);
                                }}
                                disabled={localLoading}
                                style={{ height: 'auto', width: 'auto' }}
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="form-label text-white-50 small fw-bold">EMAIL ADDRESS</label>
                    <div className="bg-black p-3 rounded-3 border border-secondary text-white-50 settings-row">
                        {user.email}
                    </div>
                </div>

            </div>
        </div>
        </>
    );
}