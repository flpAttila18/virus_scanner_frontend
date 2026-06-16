import "../cssFolder/index.css"

export default function WriteOutCard({ scanResult }) {
    // Kinyerjük az állapotot golyóálló módon
    const isClean = scanResult ? (scanResult.isClean || scanResult.IsClean) : false;
    const viruses = scanResult ? (scanResult.foundViruses || scanResult.FoundViruses || []) : [];

    return (
        <>
            <div className="card bg-black text-white border border-white border-2 woc mt-3">
                <div className="card-header font-weight-bold border-bottom border-white text-white">
                    Vizsgálat Eredménye
                </div>
                
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        
                        {/* 1. ESET: Még nem küldtünk be fájlt ellenőrzésre */}
                        {!scanResult ? (
                            <p className="text-white fs-6">
                                Nincs beolvasott adat. Kérlek, válassz egy fájlt fent, majd kattints a "Start Scan" gombra!
                            </p>
                        ) : (
                            // 2. ESET: Megérkezett a válasz a backendtől
                            <div>
                                {isClean ? (
                                    // Ha a fájl tiszta
                                    <div className="alert alert-success m-0" role="alert">
                                        <h5 className="alert-heading">✓ A fájl biztonságos!</h5>
                                        <p className="mb-0 small">A rendszer nem talált ismert kártevőt vagy vírust a fájlban.</p>
                                    </div>
                                ) : (
                                    // Ha a fájl veszélyes
                                    <div className="alert alert-danger m-0" role="alert">
                                        <h5 className="alert-heading">⚠️ Veszélyes fájl!</h5>
                                        <p className="small mb-2">A víruskereső kártevőt észlelt ebben a fájlban.</p>
                                        
                                        {viruses.length > 0 && (
                                            <ul className="mb-0 small text-start">
                                                {viruses.map((virus, index) => (
                                                    <li key={index}>
                                                        {/* Profilig kezelve: kis- és nagybetűs vírusnév mező is jó lesz */}
                                                        <strong>Talált kártevő:</strong> {virus.VirusName || virus.virusName || "Ismeretlen malware"}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        <footer className="blockquote-footer mt-3 text-white-50">
                            Rendszer: <cite title="Source Title" className="text-white">Cloudmersive Virus API</cite>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </>
    )
}