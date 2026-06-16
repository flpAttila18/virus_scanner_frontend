import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import def from '../Images/default.jpg'; 
import { useAuth } from '../context/Authcontext'; 
import { Scan_Backend_URL } from '../api';
import "../cssFolder/index.css";

export default function Navbar() {
    const navigate = useNavigate();
    
    // JAVÍTÁS: Egy sorba rendeztük az AuthContext-ből jövő cuccokat, kiszedve a duplikációt
    const { user, onLogout, loading } = useAuth(); 

    if (loading) return null; 

    const isLoggedIn = !!user;

    // Segédfüggvény a dinamikus profilkép URL-hez
    const getFullImageUrl = (path) => {
        if (!path || path === "default.png") return def; 
        if (path.startsWith('http')) return path;    
        
        const baseUrl = Scan_Backend_URL.endsWith('/api') 
            ? Scan_Backend_URL.slice(0, -4) 
            : Scan_Backend_URL;
            
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        const separator = cleanPath.includes('uploads') ? '' : '/uploads';
        
        return `${baseUrl}${separator}${cleanPath}`;
    };

    return (
        <>   
            <nav className="navbar navbar-expand-lg navbar-dark bg-black sticky-top px-2">
                <div className="container-fluid">
                    
                    {/* BRAND / LOGO */}
                    <button className="navbar-brand btn btn-link text-decoration-none text-white fw-bold m-0 p-0" onClick={() => navigate('/')}>
                        <b>VIRUS <span className='text-primary'>SCANNER</span></b> 
                    </button>
                    
                    {/* HAMBURGER GOMB MOBILNÉZETHEZ */}
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNavDropdown" 
                        aria-controls="navbarNavDropdown" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    {/* MENÜPONTOK KONTÉNERE */}
                    <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button className="nav-link active btn btn-link text-decoration-none m jump " onClick={() => navigate('/qrgen')}>
                                    QR Code Generator
                                </button>
                            </li >
                           
                        </ul>

                        {/* JOGOSULTSÁG ALAPÚ JOBB OLDAL */}
                        {isLoggedIn ? (
                            /* --- BEJELENTKEZETT ÁLLAPOT --- */
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <button 
                                        className="nav-link dropdown-toggle btn btn-link text-decoration-none d-flex align-items-center gap-2 text-white" 
                                        id="navbarDropdownMenuLink" 
                                        role="button" 
                                        data-bs-toggle="dropdown" 
                                        aria-expanded="false"
                                        style={{ width: 'auto', height: 'auto' }}
                                    >
                                        <span className="small text-white-50">{user.userName || user.email}</span>
                                        
                                        {/* JAVÍTÁS: Most már a getFullImageUrl függvénnyel húzza be a jó profilképet! */}
                                        <img 
                                            src={getFullImageUrl(user.profilePicture)} 
                                            className='pfp border border-secondary' 
                                            alt="profile" 
                                            style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} 
                                        />
                                    </button>
                                    
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark bg-black border-secondary" aria-labelledby="navbarDropdownMenuLink">
                                        <li>
                                            <button className="dropdown-item btn btn-link text-start text-decoration-none text-white" onClick={() => navigate('/profile')}>
                                                profile
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item btn btn-link text-start text-decoration-none text-white" onClick={() => navigate('/history')}>
                                                Upload History
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item btn btn-link text-start text-decoration-none text-white" onClick={() => navigate('/settings')}>
                                                Settings
                                            </button>
                                        </li>
                                        <hr className="dropdown-divider border-secondary" />
                                        <li>
                                            <button className="dropdown-item btn btn-link text-start text-decoration-none text-danger fw-bold" onClick={onLogout}>
                                                Kijelentkezés
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        ) : (
                            /* --- VENDÉG ÁLLAPOT (FIXÁLT EXTENZIOKKAL) --- */
                            <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
                                <button 
                                    className="btn btn-primary btn-outline-light btn-sm fw-bold px-3 py-2 rounded-3" 
                                    onClick={() => navigate('/register')}
                                    style={{ width: 'auto', height: '38px', display: 'inline-flex', alignItems: 'center' }}
                                >
                                    Sign In
                                </button>
                                <button 
                                    className="btn btn-primary btn-sm fw-bold px-3 py-2 rounded-3" 
                                    onClick={() => navigate('/login')}
                                    style={{ width: 'auto', height: '38px', display: 'inline-flex', alignItems: 'center', color: '#ffffff' }}
                                >
                                    Log In
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </nav>
        </>
    );
}