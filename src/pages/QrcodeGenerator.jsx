
import "../cssFolder/index.css"

import { useState, useRef } from "react"
import { QRCodeSVG } from "qrcode.react"
import '../cssFolder/qrCodeGenerator.css'
import Navbar from "../components/Navbar"
export default function QrGenerator() {
    const [text, setText] = useState("")
    const qrRef = useRef(null)

    const downloadQRCode = () => {
        const svgElement = qrRef.current.querySelector("svg")
        if (!svgElement) return

        const svgString = new XMLSerializer().serializeToString(svgElement)
        const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" })
        const URL = window.URL || window.webkitURL || window
        const blobURL = URL.createObjectURL(svgBlob)
        
        const image = new Image()
        image.onload = () => {
            const canvas = document.createElement("canvas")
            canvas.width = 500
            canvas.height = 500
            const context = canvas.getContext("2d")
            
            context.fillStyle = "#ffffff"
            context.fillRect(0, 0, canvas.width, canvas.height)
            context.drawImage(image, 25, 25, 450, 450)
            
            const pngStream = canvas.toDataURL("image/png")
            const downloadLink = document.createElement("a")
            downloadLink.href = pngStream
            downloadLink.download = "qr-kod.png"
            document.body.appendChild(downloadLink)
            downloadLink.click()
            document.body.removeChild(downloadLink)
        }
        image.src = blobURL
    }

    return (
        <>
        <Navbar/>        
        <div className="container d-flex flex-column align-items-center mt-5">
            <div className="qr-card text-center">
                
                <h5 className="qr-title">QR Code Generator</h5>
                <p className="qr-subtitle">Írd be az URL-t vagy szöveget a QR-kód létrehozásához</p>
                <hr className="border-light opacity-25 my-3" />
                
                <div className="mb-4">
                    <input
                        type="text"
                        className="qr-input text-center w-100"
                        placeholder="Ide jön a link..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                <div className="d-flex flex-column align-items-center justify-content-center my-2" style={{ minHeight: "240px" }}>
                    {text.trim() ? (
                        <div ref={qrRef} className="qr-code-wrapper">
                            <QRCodeSVG 
                                value={text} 
                                size={190}
                                fgColor="#000000"
                                bgColor="#ffffff"
                                level="H"
                            />
                        </div>
                    ) : (
                        <div className="qr-placeholder-box">
                            <p className="m-0 px-3 text-center">
                                A QR-kód itt fog megjelenni
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-4">
                    <button
                        className="qr-download-btn"
                        onClick={downloadQRCode}
                        disabled={!text.trim()}
                    >
                        Letöltés PNG-ként
                    </button>
                </div>

            </div>
        </div>
        </>

    )
}