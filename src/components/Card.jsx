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
    if (!file) return

    setLoading(true)
    setStatusMessage("uploading and Scanning...")

    try {
        const response = await uploadFileToBackend(file)
        console.log("A szervertől kapott teljes objektum:", response) 

        if (response && response.error) {
            setStatusMessage(`Error: ${response.error}`);
            resetFilePicker()
            return;
        }

        // 1. Ha a várt struktúrában jön (response.scanResult)
        if (response && response.scanResult) {
            setScanResult(response.scanResult);
            if (response.message) {
                setStatusMessage(`Success: ${response.message}`);
            } else {
                setStatusMessage(response.scanResult.isClean ? "Success: A file tiszta!" : "Warning: Veszélyes file!");
            }
        } 
        // 2. Ha a backend véletlenül laposan küldte (response.isClean vagy response.CleanResult létezik közvetlenül)
        else if (response && (typeof response.isClean !== 'undefined' || typeof response.CleanResult !== 'undefined')) {
            const cleanStatus = typeof response.isClean !== 'undefined' ? response.isClean : response.CleanResult;
            
            const customResult = {
                isClean: cleanStatus,
                foundViruses: response.foundViruses || response.FoundViruses || []
            };
            
            setScanResult(customResult);
            setStatusMessage(response.message || (cleanStatus ? "Success: A file tiszta!" : "Warning: Veszélyes file!"));
        }
        // 3. Biztonsági mentés: ha van üzenet, de nem találtunk logikai státuszt, hátha a szövegből rájövünk
        else if (response && response.message) {
            setStatusMessage(`Success: ${response.message}`);
            
            // Ha a szöveg azt mondja, hogy tiszta, manuálisan összerakunk egy igazat az alsó kártyának
            const looksClean = response.message.toLowerCase().includes("tiszta") || response.message.toLowerCase().includes("biztonságos");
            setScanResult({
                isClean: looksClean,
                foundViruses: []
            });
        } else {
            setStatusMessage("Success: Fájl elküldve!"); 
        }
        resetFilePicker();

    } catch (err) {
        setStatusMessage(`Error: ${err.message}` || "something went wrong")
    } finally {
        setLoading(false)
    }
}

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