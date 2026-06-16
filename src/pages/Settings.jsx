import { useState, useEffect } from "react"
import '../cssFolder/settings.css'
import "../cssFolder/index.css"
import Navbar from "../components/Navbar"

export default function Settings() {
    // Értékek beolvasása a localStorage-ból
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") !== "light")
    const [animations, setAnimations] = useState(() => localStorage.getItem("animations") !== "disabled")
    const [compact, setCompact] = useState(() => localStorage.getItem("compactView") === "enabled")
    const [lang, setLang] = useState(() => localStorage.getItem("language") || "hu")

    // Sötét/Világos mód kezelése (Csak ha NEM auth oldalon vagyunk épp)
    useEffect(() => {
        const isAuthPage = window.location.pathname.includes("login") || window.location.pathname.includes("register");
        if (isAuthPage) return;

        if (darkMode) {
            localStorage.setItem("theme", "dark")
            document.body.classList.remove("light-mode")
        } else {
            localStorage.setItem("theme", "light")
            document.body.classList.add("light-mode")
        }
    }, [darkMode])

    // Animációk kezelése
    useEffect(() => {
        if (animations) {
            localStorage.setItem("animations", "enabled")
            document.body.classList.remove("animations-disabled")
        } else {
            localStorage.setItem("animations", "disabled")
            document.body.classList.add("animations-disabled")
        }
    }, [animations])

    // Kompakt mód kezelése
    useEffect(() => {
        if (compact) {
            localStorage.setItem("compactView", "enabled")
            document.body.classList.add("compact-mode")
        } else {
            localStorage.setItem("compactView", "disabled")
            document.body.classList.remove("compact-mode")
        }
    }, [compact])

    // Nyelv kezelése
    useEffect(() => {
        localStorage.setItem("language", lang)
    }, [lang])

    // Szövegek a két nyelvhez
    const t = {
        hu: {
            title: "Beállítások",
            darkTitle: "Világos / Sötét mód",
            darkDesc: "Váltás a sötét és az inverz világos téma között.",
            animTitle: "Animációk",
            animDesc: "Gombok és kártyák mozgási effektjeinek kikapcsolása.",
            compTitle: "Kompakt mód",
            compDesc: "Kisebb belső margók a jobb helykihasználásért.",
            langDesc: "Az oldal alapértelmezett nyelve."
        },
        en: {
            title: "Settings",
            darkTitle: "Dark / Light Mode",
            darkDesc: "Switch between dark and inverse light theme.",
            animTitle: "Animations",
            animDesc: "Disable hover and transition effects on components.",
            compTitle: "Compact View",
            compDesc: "Smaller paddings for better space utilization.",
            langDesc: "The default language of the application."
        }
    }

    const currentText = t[lang]

    return (
        <>
            <Navbar/>
            <div className="container d-flex flex-column align-items-center mt-5">
                <div className="settings-card">
                    <h5 className="settings-title text-center mb-1">{currentText.title}</h5>
                    <hr className="border-light opacity-25 mb-4" />

                    {/* 1. SÖTÉT / VILÁGOS MÓD */}
                    <div className="settings-row">
                        <div>
                            <p className="settings-label">{currentText.darkTitle}</p>
                            <p className="settings-desc">{currentText.darkDesc}</p>
                        </div>
                        <label className="custom-switch">
                            <input 
                                type="checkbox" 
                                checked={darkMode} 
                                onChange={() => setDarkMode(!darkMode)} 
                            />
                            <span className="slider"></span>
                        </label>
                    </div>

                    {/* 2. ANIMÁCIÓK */}
                    <div className="settings-row">
                        <div>
                            <p className="settings-label">{currentText.animTitle}</p>
                            <p className="settings-desc">{currentText.animDesc}</p>
                        </div>
                        <label className="custom-switch">
                            <input 
                                type="checkbox" 
                                checked={animations} 
                                onChange={() => setAnimations(!animations)} 
                            />
                            <span className="slider"></span>
                        </label>
                    </div>

                    {/* 3. KOMPAKT MÓD */}
                    <div className="settings-row">
                        <div>
                            <p className="settings-label">{currentText.compTitle}</p>
                            <p className="settings-desc">{currentText.compDesc}</p>
                        </div>
                        <label className="custom-switch">
                            <input 
                                type="checkbox" 
                                checked={compact} 
                                onChange={() => setCompact(!compact)} 
                            />
                            <span className="slider"></span>
                        </label>
                    </div>

             

                </div>
            </div>
        </>
    )
}