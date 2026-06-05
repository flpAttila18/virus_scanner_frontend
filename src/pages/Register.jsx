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
                return alert(data.error)
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