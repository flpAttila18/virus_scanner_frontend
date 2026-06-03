import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import def from '../Images/default.jpg'; 

export default function Navbar() {
    const navigate = useNavigate();

    return (
        /* bg-black biztosítja a full fekete hátteret, a navbar-dark pedig a fehér szövegeket */
        <nav className="navbar navbar-expand-lg navbar-dark bg-black sticky-top">
            <div className="container-fluid">
                
                {/* BRAND / LOGO - text-white-50 vagy text-white a tiszta fehérhez */}
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
                        
                        {/* 1. MENÜPONT */}
                        <li className="nav-item">
                            <button className="nav-link active btn btn-link text-decoration-none" onClick={() => navigate('/')}>
                                Home
                            </button>
                        </li>
                        
                        {/* 2. MENÜPONT */}
                        <li className="nav-item">
                            <button className="nav-link btn btn-link text-decoration-none" onClick={() => navigate('/features')}>
                                Features
                            </button>
                        </li>
                        
                        {/* 3. MENÜPONT */}
                        <li className="nav-item">
                            <button className="nav-link btn btn-link text-decoration-none" onClick={() => navigate('/pricing')}>
                                Pricing
                            </button>
                        </li>
                    </ul>

                    {/* PROFIL DROPDOWN */}
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <button 
                                className="nav-link dropdown-toggle btn btn-link text-decoration-none" 
                                id="navbarDropdownMenuLink" 
                                role="button" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                            >
                                <img src={def} className='pfp' alt="profile" />
                            </button>
                            
                            {/* A lenyíló menü is megkapta a bg-black és navbar-dark kompatibilis formázást */}
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
                                <li>
                                    <button className="dropdown-item btn btn-link text-start text-decoration-none text-white" onClick={() => navigate('/something-else')}>
                                        Something else here
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );
}