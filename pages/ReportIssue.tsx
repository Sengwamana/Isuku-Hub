import React, { useState, useEffect, useRef } from 'react';
import { Camera, MapPin, Upload, X, Loader2, Navigation, Crosshair, Check, Map as MapIcon, Trash2 } from 'lucide-react';
import CTA from '../components/CTA';
import { Link } from 'react-router-dom';

// Center of Kigali for relative calculation in mock mode
const KIGALI_CENTER = { lat: -1.9441, lng: 30.0619 };

const ReportIssue: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [coords, setCoords] = useState<{lat: string, lng: string}>({ lat: '', lng: '' });
  const [locError, setLocError] = useState('');
  const [reportId, setReportId] = useState('');
  
  // Map Picker State
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [mapPickerMode, setMapPickerMode] = useState<'google' | 'mock'>('google');
  const mapRef = useRef<HTMLDivElement>(null);

  // File Upload State
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showMapPicker) {
        if (!window.google?.maps) {
            setMapPickerMode('mock');
        } else {
             window.gm_authFailure = () => setMapPickerMode('mock');
        }
    }
  }, [showMapPicker]);

  useEffect(() => {
    if (showMapPicker && mapPickerMode === 'google' && mapRef.current && window.google?.maps) {
        try {
            const map = new window.google.maps.Map(mapRef.current, {
                center: coords.lat ? { lat: parseFloat(coords.lat), lng: parseFloat(coords.lng) } : KIGALI_CENTER,
                zoom: 15,
                disableDefaultUI: true,
                clickableIcons: false,
            });

            map.addListener("click", (e: any) => {
                const lat = e.latLng.lat().toFixed(6);
                const lng = e.latLng.lng().toFixed(6);
                setCoords({ lat, lng });
                new window.google.maps.Marker({
                    position: e.latLng,
                    map: map
                });
                setTimeout(() => setShowMapPicker(false), 500);
            });
        } catch (e) {
            setMapPickerMode('mock');
        }
    }
  }, [showMapPicker, mapPickerMode]);


  const handleGetLocation = () => {
    if (!navigator.geolocation) {
        setLocError("Geolocation is not supported by your browser");
        return;
    }
    
    setLoadingLoc(true);
    setLocError('');
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            setCoords({
                lat: position.coords.latitude.toFixed(6),
                lng: position.coords.longitude.toFixed(6)
            });
            setLoadingLoc(false);
        },
        (error) => {
            console.error(error);
            setLocError("Unable to retrieve precise location. Try selecting on map.");
            setLoadingLoc(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleMockMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const scale = 0.05;
      const relativeX = (x / rect.width) - 0.5;
      const relativeY = (y / rect.height) - 0.5;
      const newLat = (KIGALI_CENTER.lat + (relativeY * scale)).toFixed(6);
      const newLng = (KIGALI_CENTER.lng + (relativeX * scale)).toFixed(6);

      setCoords({ lat: newLat, lng: newLng });
      setShowMapPicker(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `RPT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setReportId(newId);
    setSubmitted(true);
    window.scrollTo(0,0);
  };

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          setFile(e.dataTransfer.files[0]);
      }
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setFile(e.target.files[0]);
      }
  };
  const removeFile = (e: React.MouseEvent) => {
      e.stopPropagation();
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (submitted) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-slate-50 px-4">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl text-center shadow-lg border border-slate-100 animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Report Submitted!</h2>
          <p className="text-slate-600 mb-8">
            Thank you for helping keep Kigali clean. Your report ID is <span className="font-bold text-slate-900">#{reportId}</span>. Our team has been notified and will investigate the location.
          </p>
          <div className="flex flex-col gap-3">
             <button onClick={() => { setSubmitted(false); setCoords({lat:'', lng:''}); setFile(null); }} className="w-full py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200">
               Submit Another Report
             </button>
             <Link to="/dashboard" className="w-full py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 block transition-colors">
               Return to Dashboard
             </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <div className="bg-slate-900 py-16 px-4 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Report an Issue</h1>
        <p className="text-slate-400">Flag illegal dumping or missed pickups instantly.</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-10 pb-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Location Section */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
                <MapPin size={16} className="text-brand-600" />
                Incident Location
              </label>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <input 
                    required 
                    type="text" 
                    placeholder="Latitude" 
                    value={coords.lat} 
                    readOnly
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 font-mono focus:outline-none" 
                />
                <input 
                    required 
                    type="text" 
                    placeholder="Longitude" 
                    value={coords.lng}
                    readOnly 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 font-mono focus:outline-none" 
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                    type="button" 
                    onClick={handleGetLocation}
                    disabled={loadingLoc}
                    className="flex-1 py-3 bg-blue-50 text-blue-600 font-bold text-sm rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 active:scale-95"
                >
                    {loadingLoc ? <Loader2 size={16} className="animate-spin" /> : <Navigation size={16} />}
                    {loadingLoc ? "Refining GPS..." : "Use Precise GPS"}
                </button>
                <button 
                    type="button"
                    onClick={() => setShowMapPicker(true)}
                    className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 active:scale-95"
                >
                    <MapIcon size={16} />
                    Select on Map
                </button>
              </div>
              {locError && <p className="text-xs text-red-500 mt-2 font-medium flex items-center gap-1"><X size={12}/> {locError}</p>}
            </div>

            {/* Issue Details */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">Issue Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Illegal Dumping', 'Missed Pickup', 'Damaged Bin', 'Hazardous Waste', 'Other'].map((type) => (
                  <label key={type} className="cursor-pointer">
                    <input type="radio" name="issue" className="peer sr-only" required />
                    <div className="px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 text-center peer-checked:bg-brand-600 peer-checked:text-white peer-checked:border-brand-600 transition-all hover:bg-slate-50 active:scale-95">
                      {type}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
                <Camera size={16} className="text-brand-600" />
                Evidence Photo
              </label>
              <div 
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer group relative overflow-hidden
                    ${isDragging ? 'border-brand-500 bg-brand-50' : 'border-slate-300 hover:border-brand-300 hover:bg-slate-50'}
                    ${file ? 'border-brand-500 bg-brand-50' : ''}
                  `}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
              >
                {file ? (
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-3">
                            <Check size={24} />
                        </div>
                        <p className="text-sm font-bold text-slate-900 truncate max-w-xs mx-auto">{file.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        <button 
                            type="button" 
                            onClick={removeFile}
                            className="mt-4 px-3 py-1 bg-white text-red-500 text-xs font-bold rounded-lg border border-red-100 hover:bg-red-50 flex items-center gap-1 mx-auto"
                        >
                            <Trash2 size={12} /> Remove
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-3 group-hover:bg-brand-100 group-hover:text-brand-600 transition-colors">
                            <Upload size={20} />
                        </div>
                        <p className="text-sm font-medium text-slate-900">Click or drag image here</p>
                        <p className="text-xs text-slate-400 mt-1">JPG, PNG up to 10MB</p>
                    </>
                )}
                <input 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileSelect}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">Additional Details</label>
              <textarea 
                rows={4} 
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-brand-500 focus:ring-4 focus:ring-brand-50 outline-none transition-all"
                placeholder="Describe the waste amount, accessibility, etc..."
              ></textarea>
            </div>

            <button type="submit" className="w-full py-4 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all transform hover:-translate-y-1 active:translate-y-0">
              Submit Report
            </button>
          </form>
        </div>
      </div>

      {/* Map Picker Modal */}
      {showMapPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] relative animate-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white z-10">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <Crosshair size={18} className="text-brand-600" />
                        Pinpoint Location
                    </h3>
                    <button onClick={() => setShowMapPicker(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="flex-1 relative bg-slate-100 cursor-crosshair">
                    {mapPickerMode === 'google' ? (
                        <div ref={mapRef} className="w-full h-full" />
                    ) : (
                        <div 
                            className="w-full h-full relative overflow-hidden group"
                            onClick={handleMockMapClick}
                        >
                            <div className="absolute inset-0" 
                                style={{ 
                                    backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', 
                                    backgroundSize: '40px 40px',
                                    backgroundColor: '#f1f5f9'
                                }}>
                            </div>
                            
                            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" preserveAspectRatio="none">
                                <path d="M0,100 Q200,300 400,100 T800,200" fill="none" stroke="#64748b" strokeWidth="8" />
                                <path d="M100,0 Q150,200 100,500" fill="none" stroke="#64748b" strokeWidth="6" />
                                <circle cx="50%" cy="50%" r="50" fill="#94a3b8" />
                            </svg>

                            <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-lg text-xs font-mono text-slate-600 shadow-sm pointer-events-none">
                                Mode: Satellite Simulation <br/>
                                Click anywhere to set coords
                            </div>

                            <div className="hidden group-hover:flex absolute inset-0 items-center justify-center pointer-events-none">
                                <div className="w-8 h-8 rounded-full border-2 border-brand-600 flex items-center justify-center bg-brand-600/20">
                                    <div className="w-1 h-1 bg-brand-600 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
                    {mapPickerMode === 'google' ? "Tap on the map to place a pin." : "Click on the grid to simulate a GPS fix."}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ReportIssue;