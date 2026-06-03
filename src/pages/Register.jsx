import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiShield, FiZap, FiActivity } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../cssFolder/register.css'

import { register } from '../api';


export default function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [email , setEmail ] =useState("")
    const [username , setUsername] = useState("")
    const [psw , setPsw] = useState("")
    const [psw2 , setPsw2] = useState("")
    const [mess , setMess] = useState("")


    async function  onReg() {
        setMess('')
        if(!email || !username || !psw2){
            return alert("minden mezőt tölts ki ")
        }

        if(psw !==psw2){
            return alert("a jelszavak nem egyeznek meg")
        }
        try {
            const data =await register(username , psw , email)
            if(data.error){
                return alert(data)
            }
            setMess(data.message)
            setTimeout(() =>navigate("/login"),600);
        } catch (err) {
            alert("nem sikerült kapcsolódni a backendhez")
        }
    }


    return (
        <div className="register-page-bg d-flex align-items-center justify-content-center min-vh-100 px-3">
            <div className="container" style={{ maxWidth: '1200px' }}>
                <div className="row align-items-center g-5">
                    
                    {/* BAL OLDAL - INFORMÁCIÓK ÉS LOGÓ */}
                    <div className="col-lg-6 text-white text-center text-lg-start">
                        {/* Felső kis logó rész */}
                        <div className="d-flex align-items-center justify-content-center justify-content-lg-start mb-4 gap-2">
                            <div className="logo-icon-box">
                                <FiShield size={24} className="text-info" />
                            </div>
                            <span className="fs-4 fw-bold tracking-wider">VIRUS <span className="text-primary">SCANNER</span></span>
                        </div>

                        {/* Főcímek */}
                        <h1 className="fw-bold display-5 mb-3">
                            Ellenőrizd a fájljaid. <br />
                            <span className="text-primary">Védd meg magad.</span>
                        </h1>
                        <p className="text-white-50 fs-5 mb-5" style={{ maxWidth: '450px' }}>
                            Tölts fel egy fájlt, és mi átvizsgáljuk fejlett víruskereső motorunkkal, hogy biztonságos-e.
                        </p>

                        {/* Feature lista */}
                        <div className="d-flex flex-column gap-4 align-items-center align-items-lg-start">
                            <div className="d-flex align-items-start gap-3 text-start">
                                <div className="feature-icon-box"><FiZap size={20} className="text-primary" /></div>
                                <div>
                                    <h6 className="mb-1 fw-bold">Gyors vizsgálat</h6>
                                    <p className="text-white-50 small m-0">Másodpercek alatt eredményt kapsz.</p>
                                </div>
                            </div>

                            <div className="d-flex align-items-start gap-3 text-start">
                                <div className="feature-icon-box"><FiActivity size={20} className="text-primary" /></div>
                                <div>
                                    <h6 className="mb-1 fw-bold">Fejlett védelem</h6>
                                    <p className="text-white-50 small m-0">Több víruskereső motor együttes ereje.</p>
                                </div>
                            </div>

                            <div className="d-flex align-items-start gap-3 text-start">
                                <div className="feature-icon-box"><FiLock size={20} className="text-primary" /></div>
                                <div>
                                    <h6 className="mb-1 fw-bold">Teljes biztonság</h6>
                                    <p className="text-white-50 small m-0">Fájlaidat nem tároljuk, 100% bizalmas.</p>
                                </div>
                            </div>
                        </div>

                        {/* Alsó nagy pajzs dekoráció (lehet kép vagy CSS effekt) */}
                        <div className="mt-5 d-none d-lg-block relative-shield-container">
                            <div className="big-glow-shield mx-auto">
                                <FiShield className="main-shield" />
                            </div>
                        </div>
                    </div>

                    {/* JOBB OLDAL - REGISZTRÁCIÓS KÁRTYA */}
                    <div className="col-lg-6">
                        <div className="card bg-black border border-secondary border-opacity-25 rounded-4 p-4 p-md-5 text-white custom-shadow">
                            <h2 className="text-center fw-bold mb-1">Regisztráció</h2>
                            <p className="text-center text-white-50 small mb-4">Hozz létre egy fiókot az induláshoz!</p>

                            <form onSubmit={(e) => { e.preventDefault(); onReg(); }}>
                               
                                {/* E-mail cím */}
                                <div className="mb-3">
                                    <label className="form-label text-white-50 small mb-1">E-mail cím</label>
                                    <div className="input-group custom-input-group">
                                        <span className="input-group-text"><FiMail /></span>
                                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Írd be az E-mail címed" required />
                                    </div>
                                </div>

                                {/* Felhasználónév */}
                                <div className="mb-3">
                                    <label className="form-label text-white-50 small mb-1">Felhasználónév</label>
                                    <div className="input-group custom-input-group">
                                        <span className="input-group-text"><FiUser /></span>
                                        <input type="text" value={username}  onChange={(e)=>setUsername(e.target.value)} className="form-control" placeholder="Válassz felhasználónevet" required />
                                    </div>
                                </div>

                                {/* Jelszó */}
                                <div className="mb-3">
                                    <label className="form-label text-white-50 small mb-1">Jelszó</label>
                                    <div className="input-group custom-input-group">
                                        <span className="input-group-text"><FiLock /></span>
                                        <input  type={showPassword ? "text" : "password"} value={psw} onChange={(e)=>setPsw(e.target.value)} className="form-control" placeholder="Adj meg egy jelszót" required />
                                        <button type="button" className="input-group-text btn-eye" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                        </button>
                                    </div>
                                </div>

                                {/* Jelszó megerősítése */}
                                <div className="mb-4">
                                    <label className="form-label text-white-50 small mb-1">Jelszó megerősítése</label>
                                    <div className="input-group custom-input-group">
                                        <span className="input-group-text"><FiLock /></span>
                                        <input type={showConfirmPassword ? "text" : "password"} value={psw2} onChange={(e)=>setPsw2(e.target.value)} className="form-control" placeholder="Ismételd meg a jelszót" required />
                                        <button type="button" className="input-group-text btn-eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                        </button>
                                    </div>
                                </div>

                                

                                {/* Regisztráció Gomb */}
                                <button type="submit" className="btn btn-primary w-100 fw-bold py-2.5 rounded-3 mb-4">
                                    Regisztráció
                                </button>

                                {/* Elválasztó vonal */}
                                <div className="d-flex align-items-center mb-4 text-white-50 small">
                                    <hr className="flex-grow-1 border-secondary border-opacity-50 m-0" />
                                    <span className="px-3">vagy</span>
                                    <hr className="flex-grow-1 border-secondary border-opacity-50 m-0" />
                                </div>

                                {/* Google Regisztráció */}
                                <button type="button" className="btn btn-outline-light w-100 py-2.5 rounded-3 mb-4 d-flex align-items-center justify-content-center gap-2 google-btn">
                                    <svg width="18" height="18" viewBox="0 0 24 24">
                                        <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.6 2.8C6.01 7.22 8.76 5.04 12 5.04z"/>
                                        <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.22-2.35H12v4.5h6.46c-.28 1.47-1.11 2.72-2.36 3.56l3.65 2.84c2.14-1.97 3.38-4.88 3.38-8.55z"/>
                                        <path fill="#FBBC05" d="M5.1 14.7c-.24-.72-.38-1.49-.38-2.3s.14-1.58.38-2.3L1.5 7.3C.54 9.22 0 11.35 0 13.6c0 2.25.54 4.38 1.5 6.3l3.6-2.92z"/>
                                        <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.65-2.84c-1.01.68-2.31 1.09-3.31 1.09-3.24 0-5.99-2.18-6.97-5.26l-3.6 2.8C3.4 20.35 7.35 23 12 23z"/>
                                    </svg>
                                    Regisztráció Google-lel
                                </button>
                            </form>

                            {/* Bejelentkezés link */}
                            <p className="text-center small m-0 text-white-50">
                                Már van fiókod? <span className="text-primary cursor-pointer fw-bold" onClick={() => navigate('/login')}>Jelentkezz be</span>
                            </p>
                        </div>
                    </div>

                </div>

                {/* FOOTER */}
                <div className="text-start text-white-50 small mt-5 pt-4 border-top border-secondary border-opacity-10">
                    &copy; {new Date().getFullYear()} Virus Scanner. Minden jog fenntartva.
                </div>
            </div>
        </div>
    );
}