import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, FileText, Loader2 } from 'lucide-react';
import '../cssFolder/ScanHistory.css';
import Navbar from '../components/Navbar';
import { history as fetchHistory } from '../api';
import "../cssFolder/index.css"


export default function History() {
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchHistory();
                
                if (result && result.error) {
                    setError(result.error);
                } else {
                    setHistoryData(result);
                }
            } catch (err) {
                setError("Hiba történt az adatok lekérése közben.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <div className="history-page-wrapper flex-center">
                <Loader2 className="spinner" size={40} />
                <p style={{ color: '#94a3b8' }}>Előzmények betöltése...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="history-page-wrapper flex-center">
                <p style={{ color: '#ef4448', fontWeight: 'bold' }}>{error}</p>
            </div>
        );
    }

    return (
        <>        
        <Navbar/>
        <div className="history-page-wrapper">    
            <div className="history-container">
                <h2 className="history-title">Vizsgálati Előzmények</h2>
                
                {historyData.length === 0 || historyData.message ? (
                    <div className="empty-history-box">
                        <p>{historyData.message || "Nincsenek feltöltött fájljaid."}</p>
                    </div>
                ) : (
                    <div className="history-grid">
                        {historyData.map((item) => {
                            const isClean = item.virusType === 'Clean';

                            return (
                                <div 
                                    key={item.id} 
                                    className={`history-card ${isClean ? 'card-clean' : 'card-infected'}`}
                                >
                                    <div className="card-icon-zone">
                                        {isClean ? (
                                            <ShieldCheck className="status-icon icon-clean" size={32} />
                                        ) : (
                                            <ShieldAlert className="status-icon icon-infected" size={32} />
                                        )}
                                    </div>
                                    
                                    <div className="card-details">
                                        <div className="file-info">
                                            <FileText size={16} className="file-icon" />
                                            <span className="file-name" title={item.fileName}>
                                                {item.fileName}
                                            </span>
                                        </div>
                                        
                                        <div className="status-text-zone">
                                            <p className="status-label">Státusz:</p>
                                            <p className={`status-value ${isClean ? 'text-clean' : 'text-infected'}`}>
                                                {isClean ? 'Tiszta' : `Veszélyes (${item.virusName})`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
        </>

    );
}