import "../cssFolder/index.css"

export default function WriteOutCard({ scanResult }) {
    return (
        <>
            {/* MÓDOSÍTVA: Megkapta a full fekete hátteret (bg-black), a fehér szöveget (text-white) és a dögös fehér keretet (border border-white border-2) */}
            <div className="card bg-black text-white border border-white border-2 woc mt-3">
                
                {/* MÓDOSÍTVA: Kapott egy alsó fehér elválasztó vonalat és fehér szöveget */}
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
                                {scanResult.isClean ? (
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
                                        
                                        {scanResult.foundViruses && scanResult.foundViruses.length > 0 && (
                                            <ul className="mb-0 small text-start">
                                                {scanResult.foundViruses.map((virus, index) => (
                                                    <li key={index}>
                                                        <strong>Talált vírus:</strong> {virus.virusName}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* MÓDOSÍTVA: text-white-50 osztályt kapott, hogy a lábrész picit halványabb, elegánsabb fehér legyen */}
                        <footer className="blockquote-footer mt-3 text-white-50">
                            Rendszer: <cite title="Source Title" className="text-white">Cloudmersive Virus API</cite>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </>
    )
}