import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import def from '../Images/default.jpg'; 
import { useAuth } from '../context/Authcontext'; // Importáljuk a globális auth-ot

export default function Navbar() {
    const navigate = useNavigate();
    
    // Kiszedjük a globális felhőből az adatokat és a kijelentkezést
    const { user, onLogout, loading } = useAuth(); 

    // Amíg a háttérben ellenőrzi a rendszer, hogy be vagyunk-e lépve, ne villanjon be rossz gomb
    if (loading) return null; 

    const isLoggedIn = !!user;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black sticky-top">
            <div className="container-fluid">
                
                {/* BRAND / LOGO */}
                <button className="navbar-brand btn btn-link text-decoration-none text-white fw-bold" onClick={() => navigate('/')}>
                    Navbar
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
                            <button className="nav-link active btn btn-link text-decoration-none" onClick={() => navigate('/')}>
                                Home
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link text-decoration-none" onClick={() => navigate('/features')}>
                                Features
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link text-decoration-none" onClick={() => navigate('/pricing')}>
                                Pricing
                            </button>
                        </li>
                    </ul>

                    {/* JOGOSULTSÁG ALAPÚ JOBB OLDAL */}
                    {isLoggedIn ? (
                        /* --- BEJELENTKEZETT ÁLLAPOT (PROFIL DROPDOWN) --- */
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <button 
                                    className="nav-link dropdown-toggle btn btn-link text-decoration-none d-flex align-items-center gap-2 text-white" 
                                    id="navbarDropdownMenuLink" 
                                    role="button" 
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                >
                                    <span className="small text-white-50">{user.userName || user.email}</span>
                                    <img src={def} className='pfp' alt="profile" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                                </button>
                                
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark bg-black border-secondary" aria-labelledby="navbarDropdownMenuLink">
                                    <li>
                                        <button className="dropdown-item btn btn-link text-start text-decoration-none text-white" onClick={() => navigate('/action')}>
                                            Action
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item btn btn-link text-start text-decoration-none text-white" onClick={() => navigate('/another-action')}>
                                            Another action
                                        </button>
                                    </li>
                                    <hr className="dropdown-divider border-secondary" />
                                    <li>
                                        {/* Meghívjuk a globális logout függvényt */}
                                        <button className="dropdown-item btn btn-link text-start text-decoration-none text-danger fw-bold" onClick={onLogout}>
                                            Kijelentkezés
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    ) : (
                        /* --- VENDÉG ÁLLAPOT (SIGN IN | LOG IN GOMBOK) --- */
                        <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
                            <button 
                                className="btn btn-outline-light btn-sm fw-bold px-3 py-2 rounded-3" 
                                onClick={() => navigate('/register')}
                            >
                                Sign In
                            </button>
                            <button 
                                className="btn btn-primary btn-sm fw-bold px-3 py-2 rounded-3" 
                                onClick={() => navigate('/login')}
                            >
                                Log In
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
}