import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Card from '../components/Card'
import WriteOutCard from '../components/WriteOutCard'
import { useState } from 'react'
import Navbar from '../components/Navbar'

export default function Index() {
    const [scanResult , setScanResult] = useState(null)

    return (
        /* A főoldal megkapja az egyedi hátteret és kitölti a teljes képernyőt */
        <div className="main-page-bg min-vh-100 d-flex flex-column">
            
            <Navbar/>

            {/* Középre zárt, függőlegesen elrendezett tartalom */}
            <div className="flex-grow-1 d-flex align-items-center justify-content-center py-5 px-3">
                <div className="d-flex flex-column align-items-center gap-4 w-100">
                    
                    {/* Fájlfeltöltő kártya */}
                    <Card setScanResult={setScanResult} />
                    
                    {/* Eredményjelző kártya */}
                    <WriteOutCard scanResult={scanResult} />

                </div>
            </div>
        </div>
    )
}