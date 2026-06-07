import { useState } from "react"
import { uploadFileToBackend } from "../api"

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
        console.log("A szervertől kapott teljes objektum:", response);

        // Ha az api.js-ből a szép magyar hibaüzenet érkezik vissza
        if (response && response.error) {
            setStatusMessage(`Hiba: ${response.error}`);
            setLoading(false); // Újra aktiváljuk a gombot
            return; // Megállítjuk a futást, nem töröljük a fájlt
        }

        // 1. Ha a várt struktúrában jön a sikeres válasz (response.scanResult)
        if (response && response.scanResult) {
            setScanResult(response.scanResult);
            if (response.Message) {
                setStatusMessage(`Siker: ${response.Message}`);
            } else {
                setStatusMessage(response.scanResult.IsClean ? "Siker: A fájl teljesen tiszta!" : "Figyelem: Veszélyes fájl észlelve!");
            }
        } 
        // 2. Ha a backend laposan küldte
        else if (response && (typeof response.IsClean !== 'undefined' || typeof response.CleanResult !== 'undefined')) {
            const cleanStatus = typeof response.IsClean !== 'undefined' ? response.IsClean : response.CleanResult;
            
            const customResult = {
                IsClean: cleanStatus,
                FoundViruses: response.FoundViruses || []
            };
            
            setScanResult(customResult);
            setStatusMessage(response.Message || (cleanStatus ? "Siker: A fájl tiszta!" : "Figyelem: Veszélyes fájl!"));
        }
        // 3. Biztonsági mentés a szövegből
        else if (response && response.Message) {
            setStatusMessage(`Siker: ${response.Message}`);
            const looksClean = response.Message.toLowerCase().includes("tiszta") || response.Message.toLowerCase().includes("biztonságos");
            setScanResult({
                IsClean: looksClean,
                FoundViruses: []
            });
        } else {
            setStatusMessage("Siker: Fájl sikeresen elküldve!"); 
        }
        
        // Csak teljesen sikeres vizsgálat után töröljük a kijelölést
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