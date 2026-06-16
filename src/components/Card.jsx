import { useState } from "react"
import { uploadFileToBackend } from "../api"
import "../cssFolder/index.css"

export default function Card({ setScanResult }) {


    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState("Choosen file space")
    const [isActive, setIsactive] = useState(false)
    const [loading, setLoading] = useState(false)
    const [statusMessage, setStatusMessage] = useState("")
    const [inputValue , setInputValue] = useState("")



    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            const selectedFile = e.target.files[0]
            const maxSize = 10 * 1024 * 1024


            if (selectedFile.size > maxSize) {
                setFileName("Hiba: Túl nagy fájl (Max 10mB)!"); // Azonnal átírjuk a fájl nevét a felületen
                setStatusMessage("Error: a file mérete meghaladja az 10mb-ot!");
               resetFilePicker()
            } else {
                setFileName(selectedFile.name);
                setFile(selectedFile);
                setIsactive(true);
                setStatusMessage("");
                setScanResult(null)
            }



        }


    }


    const resetFilePicker =()=>{
        setFile(null)
        setFileName("choosen file space ")
        setIsactive(false)
        setInputValue("")
    }


const handleScan = async () => {
    if (!file) return;

    setLoading(true);
    setStatusMessage("Fájl feltöltése és vizsgálata folyamatban...");

    try {
        const response = await uploadFileToBackend(file);

        // 1. Ha hitelesítési vagy hálózati hiba jött vissza az api.js-ből
        if (response && response.error) {
            setStatusMessage(`Hiba: ${response.error}`);
            setLoading(false);
            return;
        }

        // 2. Kinyerjük a tisztasági állapotot a backend válaszból
        let isCleanResult = false;
        let foundVirusesList = [];

        if (response && response.scanResult) {
            isCleanResult = response.scanResult.IsClean || response.scanResult.isClean || false;
            foundVirusesList = response.scanResult.FoundViruses || response.scanResult.foundViruses || [];
        } else if (response) {
            isCleanResult = response.IsClean || response.isClean || response.CleanResult || false;
            foundVirusesList = response.FoundViruses || response.foundViruses || [];
        }

        // 3. Golyóálló objektumot építünk az alsó kártyának (kis- és nagybetűvel is megadjuk!)
        const finalResult = {
            isClean: isCleanResult,
            IsClean: isCleanResult,
            foundViruses: foundVirusesList,
            FoundViruses: foundVirusesList
        };
        setScanResult(finalResult);

        // 4. A felső sáv üzenetét pontosan szinkronizáljuk az eredménnyel
        if (isCleanResult) {
            setStatusMessage("Siker: A fájl biztonságos, kártevő nem található!");
        } else {
            setStatusMessage("Figyelem: Veszélyes fájl észlelve!");
        }

        // Sikeres lefutás után visszaállítjuk a fájlválasztót
        resetFilePicker();

    } catch (err) {
        setStatusMessage("Hiba: Váratlan hiba történt a kommunikáció során.");
    } finally {
        setLoading(false);
    }
};
    return (
        <>
            <div className="card text-center text-white bg-black border border-white border-1 size">


                <div className="card-body text-white">
                    <h5 className="card-title ct">Choose a file here</h5>
                    <p className="card-text">The maximum file size is 10mb</p>
                    <hr />
                    <input type="file" id="fileInp" className="btn btn-primary visually-hidden" value={inputValue} onChange={handleFileChange} />
                    <p className="text-white border-3 border-light ps ">{fileName} </p>
                    <label htmlFor="fileInp" className={isActive ? "nonvisable" : " btn btn-primary lb text-center"}>
                        Choose file
                    </label>

                    {/* Scan indító gomb (megjelenik, ha van fájl) */}
                    <button
                        className={isActive ? "btn btn-primary lb text-center" : "nonvisable"}
                        onClick={handleScan}
                        disabled={loading} // Megakadályozza a dupla kattintást küldés közben
                    >
                        {loading ? "Scanning..." : "Start Scan"}
                    </button>

                    {/* 📄 Ide kiírjuk, hogy mi történik éppen */}
                    {statusMessage && (
                        <div className="mt-3 alert alert-info text-center" role="alert">
                            {statusMessage}
                        </div>
                    )}
                </div>
                <div className="card-footer text-muted">
                </div>
            </div>
        </>
    )
}