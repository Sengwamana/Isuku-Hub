import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import StatCard from '../components/dashboard/StatCard';
import ChartCard from '../components/dashboard/ChartCard';
import MapCard from '../components/dashboard/MapCard';
import TableCard from '../components/dashboard/TableCard';
import { UserRole } from '../components/dashboard/Sidebar';
import { 
  CheckCircle, Truck, Trash2, Leaf, AlertTriangle, Users, DollarSign, MapPin, 
  Clock, TrendingUp, Search, Filter, Download, CreditCard, Send, MoreVertical, 
  Calendar, Package, FileText, User, Bell, Shield, Lock, Loader2, Sparkles,
  Info, BarChart3, Gavel, FileCheck, ThumbsUp, Wallet, ShoppingCart, ArrowRight,
  Camera, Upload, X, Navigation, Crosshair, Map as MapIcon, XCircle
} from 'lucide-react';

// --- SHARED COMPONENTS & HELPERS ---

const KIGALI_CENTER = { lat: -1.9441, lng: 30.0619 };

declare global {
  interface Window {
    google: any;
    gm_authFailure?: () => void;
  }
}

// Toast System
interface ToastMessage {
  id: number;
  type: 'success' | 'error' | 'info';
  text: string;
}

const ToastContainer = ({ toasts, removeToast }: { toasts: ToastMessage[], removeToast: (id: number) => void }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(t => (
        <div key={t.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-in slide-in-from-right-full duration-300 ${
          t.type === 'success' ? 'bg-white border-green-100 text-green-800' :
          t.type === 'error' ? 'bg-white border-red-100 text-red-800' : 'bg-white border-brand-100 text-slate-800'
        }`}>
          {t.type === 'success' && <CheckCircle size={18} className="text-green-500" />}
          {t.type === 'error' && <XCircle size={18} className="text-red-500" />}
          {t.type === 'info' && <Info size={18} className="text-brand-500" />}
          <span className="text-sm font-medium">{t.text}</span>
          <button onClick={() => removeToast(t.id)} className="ml-2 text-slate-400 hover:text-slate-600"><X size={14} /></button>
        </div>
      ))}
    </div>
  )
}

const AiResultBox = ({ loading, result, title }: { loading: boolean, result: string, title: string }) => {
  if (!loading && !result) return null;
  return (
    <div className="mt-4 p-4 bg-brand-50 border border-brand-100 rounded-xl animate-in fade-in slide-in-from-top-2 shadow-sm" aria-live="polite">
      <div className="flex items-center gap-2 mb-2 text-brand-700 font-bold text-sm uppercase tracking-wider">
        {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
        {loading ? "Analyzing..." : title}
      </div>
      {loading ? (
        <div className="space-y-2">
           <div className="h-4 bg-brand-200/50 rounded w-3/4 animate-pulse"></div>
           <div className="h-4 bg-brand-200/30 rounded w-1/2 animate-pulse"></div>
        </div>
      ) : (
        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{result}</p>
      )}
    </div>
  );
};

// Reusable Chat Component
interface AiChatWidgetProps {
    title: string;
    subtitle: string;
    systemInstruction: string;
    initialMessage: string;
    userRole: string;
    headerColor?: string;
}

const AiChatWidget: React.FC<AiChatWidgetProps> = ({ title, subtitle, systemInstruction, initialMessage, userRole, headerColor = 'bg-brand-600' }) => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'Bot', text: initialMessage, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!inputText.trim()) return;
        const userMsg = { id: Date.now(), sender: 'Me', text: inputText, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `System: ${systemInstruction}. User says: "${userMsg.text}".`,
            });

            const replyText = response.text || "I understand. One moment please.";

            setTimeout(() => {
                setMessages(prev => [...prev, { 
                id: Date.now() + 1, 
                sender: 'Bot', 
                text: replyText, 
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
                }]);
                setIsTyping(false);
            }, 1000);

        } catch (e) {
            console.error("Gemini API Error:", e);
            setIsTyping(false);
            setMessages(prev => [...prev, { 
                id: Date.now() + 1, 
                sender: 'Bot', 
                text: "My connection is weak right now. Please try again later.", 
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
            }]);
        }
    };

    return (
        <div className="h-[600px] flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className={`p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center`}>
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${headerColor} shadow-sm`}>
                        {title.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">{title}</h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1">{subtitle}</p>
                    </div>
                </div>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-50/50" role="log" aria-live="polite">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex gap-3 ${msg.sender === 'Me' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-sm ${msg.sender === 'Bot' ? 'bg-slate-200 text-slate-700' : 'bg-brand-100 text-brand-700'}`}>
                        {msg.sender === 'Me' ? userRole.charAt(0).toUpperCase() : 'AI'}
                    </div>
                    <div className={`p-3 rounded-2xl shadow-sm max-w-[80%] ${msg.sender === 'Bot' ? 'bg-white border border-slate-100 rounded-tl-none' : 'bg-brand-600 text-white rounded-tr-none'}`}>
                        <p className={`text-sm ${msg.sender === 'Bot' ? 'text-slate-700' : 'text-white'}`}>{msg.text}</p>
                        <p className={`text-[10px] mt-1 text-right ${msg.sender === 'Bot' ? 'text-slate-400' : 'text-brand-200'}`}>{msg.time}</p>
                    </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-700 shrink-0">AI</div>
                        <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm"><Loader2 size={16} className="animate-spin text-slate-400" /></div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>
            <div className="p-4 border-t border-slate-100 bg-white">
                <div className="flex gap-2">
                    <input 
                    type="text" 
                    placeholder="Type a message..." 
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50 transition-all"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    aria-label="Type message"
                    />
                    <button onClick={handleSend} className={`p-2 text-white rounded-lg hover:opacity-90 active:scale-95 transition-all ${headerColor}`} aria-label="Send message"><Send size={20} /></button>
                </div>
            </div>
        </div>
    );
};

const SettingsView = ({ showToast }: { showToast: (t: string, type?: 'success' | 'error') => void }) => {
  const [saving, setSaving] = useState(false);
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
        setSaving(false);
        showToast("Profile settings saved successfully", 'success');
    }, 1000);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
        <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-500">Manage your profile and preferences.</p>
        </div>
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <User size={20} className="text-brand-600" /> Profile Information
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
            <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
            <input type="text" defaultValue="John Doe" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none transition-all" />
            </div>
            <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input type="email" defaultValue="john@example.com" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none transition-all" />
            </div>
        </div>
        <div className="mt-6 flex justify-end">
            <button 
                onClick={handleSave} 
                disabled={saving}
                className="px-6 py-2 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 active:scale-95 transition-all shadow-lg shadow-brand-200 flex items-center gap-2"
            >
                {saving ? <Loader2 size={16} className="animate-spin" /> : null}
                {saving ? 'Saving...' : 'Save Changes'}
            </button>
        </div>
        </div>
    </div>
  )
};

// --- HOUSEHOLD VIEW COMPONENTS ---

const HouseholdReport = ({ goToOverview, showToast }: { goToOverview: () => void, showToast: (t: string, type?: 'success'|'error') => void }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [coords, setCoords] = useState<{lat: string, lng: string}>({ lat: '', lng: '' });
  const [locError, setLocError] = useState('');
  const [reportId, setReportId] = useState('');
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [mapPickerMode, setMapPickerMode] = useState<'google' | 'mock'>('google');
  const mapRef = useRef<HTMLDivElement>(null);

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
                new window.google.maps.Marker({ position: e.latLng, map: map });
                setTimeout(() => setShowMapPicker(false), 500);
            });
        } catch (e) {
            setMapPickerMode('mock');
        }
    }
  }, [showMapPicker, mapPickerMode]);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
        setLocError("Geolocation is not supported");
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
            showToast("GPS location acquired", 'success');
        },
        (error) => {
            setLocError("Unable to retrieve location.");
            setLoadingLoc(false);
            showToast("Failed to get GPS location", 'error');
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
      showToast("Location pinned from map", 'success');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `RPT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setReportId(newId);
    setSubmitted(true);
    showToast("Report submitted successfully!", 'success');
  };

  if (submitted) {
    return (
       <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl border border-slate-100 text-center animate-in zoom-in">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Report Submitted!</h2>
          <p className="text-slate-600 mb-8 max-w-md">
            Thank you. Your unique report ID is <span className="font-bold text-slate-900">#{reportId}</span>. We will investigate the issue shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
             <button onClick={() => { setSubmitted(false); setCoords({lat:'', lng:''}); }} className="flex-1 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200">
               Submit Another
             </button>
             <button onClick={goToOverview} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">
               Back to Overview
             </button>
          </div>
       </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-slate-900">Report an Issue</h1>
        <p className="text-slate-500">Flag illegal dumping or missed pickups.</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
                <MapPin size={16} className="text-brand-600" /> Incident Location
              </label>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <input required type="text" placeholder="Latitude" value={coords.lat} readOnly className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 font-mono focus:outline-none" />
                <input required type="text" placeholder="Longitude" value={coords.lng} readOnly className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 font-mono focus:outline-none" />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button type="button" onClick={handleGetLocation} disabled={loadingLoc} className="flex-1 py-3 bg-blue-50 text-blue-600 font-bold text-sm rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 active:scale-95">
                    {loadingLoc ? <Loader2 size={16} className="animate-spin" /> : <Navigation size={16} />}
                    {loadingLoc ? "Refining..." : "Use GPS"}
                </button>
                <button type="button" onClick={() => setShowMapPicker(true)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 active:scale-95">
                    <MapIcon size={16} /> Select on Map
                </button>
              </div>
              {locError && <p className="text-xs text-red-500 mt-2 font-medium flex items-center gap-1"><X size={12}/> {locError}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">Issue Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Illegal Dumping', 'Missed Pickup', 'Damaged Bin', 'Hazardous Waste', 'Other'].map((type) => (
                  <label key={type} className="cursor-pointer">
                    <input type="radio" name="issue" className="peer sr-only" required />
                    <div className="px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-600 text-center peer-checked:bg-brand-600 peer-checked:text-white peer-checked:border-brand-600 transition-all hover:bg-slate-50 active:scale-95">
                      {type}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3"><Camera size={16} className="text-brand-600" /> Evidence Photo</label>
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer group hover:border-brand-300">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-2 group-hover:bg-brand-100 group-hover:text-brand-600 transition-colors"><Upload size={18} /></div>
                <p className="text-sm font-medium text-slate-900">Upload Image</p>
                <input type="file" className="hidden" accept="image/*" />
              </div>
            </div>

            <button type="submit" className="w-full py-4 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all active:translate-y-0 transform hover:-translate-y-1">Submit Report</button>
        </form>
      </div>

      {showMapPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] relative animate-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white z-10">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2"><Crosshair size={18} className="text-brand-600" /> Pinpoint Location</h3>
                    <button onClick={() => setShowMapPicker(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500"><X size={20} /></button>
                </div>
                <div className="flex-1 relative bg-slate-100 cursor-crosshair">
                    {mapPickerMode === 'google' ? <div ref={mapRef} className="w-full h-full" /> : (
                        <div className="w-full h-full relative overflow-hidden group" onClick={handleMockMapClick}>
                            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px', backgroundColor: '#f1f5f9' }}></div>
                            <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-lg text-xs font-mono text-slate-600 shadow-sm pointer-events-none">Mode: Mock GPS</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  )
}

const HouseholdOverview = ({ isLoading, onNavigate }: { isLoading: boolean, onNavigate: (t: string) => void }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
    <div className="mb-2">
      <h1 className="text-2xl font-bold text-slate-900">My Household Overview</h1>
      <p className="text-slate-500">Welcome back! Here is your waste summary.</p>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
       <StatCard isLoading={isLoading} title="Compliance Score" value="98/100" icon={<CheckCircle size={24} />} trend={{ value: '+2%', direction: 'up' }} />
       <StatCard isLoading={isLoading} title="Next Pickup" value="Tomorrow, 9AM" icon={<Truck size={24} />} colorClass="text-blue-600" bgClass="bg-blue-50" />
       <StatCard isLoading={isLoading} title="Recycling Points" value="1,240 pts" icon={<Leaf size={24} />} colorClass="text-green-600" bgClass="bg-green-50" trend={{ value: 'Gold Tier', direction: 'neutral' }} />
       <StatCard isLoading={isLoading} title="Monthly Bill" value="RWF 5,000" icon={<DollarSign size={24} />} colorClass="text-orange-600" bgClass="bg-orange-50" trend={{ value: 'Due Soon', direction: 'neutral' }} />
    </div>
    <div className="grid lg:grid-cols-3 gap-6">
       <div className="lg:col-span-2 space-y-6">
         <div className="h-80">
            <ChartCard isLoading={isLoading} title="My Waste Composition" subtitle="Breakdown by weight (kg) this month" data={[{ label: 'Organic', value: 45 }, { label: 'Plastic', value: 20 }, { label: 'Paper', value: 15 }, { label: 'Glass', value: 10 }, { label: 'Metal', value: 5 }]} />
         </div>

         {/* Pickup Schedule Section */}
         <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">Pickup Schedule</h3>
                    <p className="text-sm text-slate-500">Upcoming collections for your sector</p>
                </div>
                <button 
                  onClick={() => onNavigate('schedule')}
                  className="bg-brand-50 hover:bg-brand-100 text-brand-700 px-4 py-2 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 active:scale-95"
                >
                    <Truck size={16} /> Request Extra Pickup
                </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center gap-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm text-center min-w-[70px]">
                        <span className="block text-xs font-bold text-slate-400 uppercase">Tomorrow</span>
                        <span className="block text-xl font-extrabold text-slate-900">Oct 25</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900">General Waste</h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><Clock size={12}/> 09:00 AM - 11:00 AM</p>
                    </div>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center gap-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm text-center min-w-[70px]">
                        <span className="block text-xs font-bold text-slate-400 uppercase">Thu</span>
                        <span className="block text-xl font-extrabold text-slate-900">Oct 28</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900">Recyclables</h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><Clock size={12}/> 10:00 AM - 12:00 PM</p>
                    </div>
                </div>
            </div>
         </div>
       </div>

       <div className="h-full min-h-[500px]">
         <MapCard title="Truck ETA Tracker" type="basic" />
       </div>
    </div>
  </div>
);

const HouseholdSchedule = ({ showToast }: { showToast: (t: string) => void }) => {
  const [requesting, setRequesting] = useState(false);

  const handleRequest = () => {
    setRequesting(true);
    // Simulate API call
    setTimeout(() => {
        setRequesting(false);
        showToast("Extra pickup requested for tomorrow!");
    }, 1500);
  };

  return (
    <div className="space-y-6 relative animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-end mb-2">
        <div><h1 className="text-2xl font-bold text-slate-900">Pickup Schedule</h1><p className="text-slate-500">Upcoming collection dates.</p></div>
        <button 
            onClick={handleRequest}
            disabled={requesting}
            className="bg-brand-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-brand-700 disabled:opacity-70 flex items-center gap-2 transition-all active:scale-95 shadow-md shadow-brand-200"
        >
            {requesting ? <Loader2 size={16} className="animate-spin" /> : <Truck size={16} />}
            {requesting ? "Requesting..." : "Request Extra Pickup"}
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        {[{ day: 'Tomorrow', date: 'Oct 25', type: 'General Waste', status: 'Scheduled', time: '09:00 AM - 11:00 AM' }, { day: 'Thursday', date: 'Oct 28', type: 'Recyclables', status: 'Scheduled', time: '10:00 AM - 12:00 PM' }].map((item, idx) => (
           <div key={idx} className="p-6 border-b border-slate-50 last:border-none flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50 gap-4 transition-colors">
              <div className="flex items-center gap-6">
                 <div className="bg-slate-100 rounded-xl p-4 text-center min-w-[80px]"><p className="text-xs font-bold text-slate-500 uppercase">{item.day}</p><p className="text-xl font-bold text-slate-900">{item.date}</p></div>
                 <div><h3 className="text-lg font-bold text-slate-900">{item.type}</h3><p className="text-slate-500 flex items-center gap-1 text-sm mt-1"><Clock size={14} /> {item.time}</p></div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-100 text-brand-700">{item.status}</span>
           </div>
        ))}
     </div>
  </div>
  );
};

const HouseholdPayments = ({ showToast }: { showToast: (t: string) => void }) => {
    const [balance, setBalance] = useState(5000);
    const [paying, setPaying] = useState(false);
    const [method, setMethod] = useState<'momo'|'card'>('momo');
    const [history, setHistory] = useState([
        {id: '#123', amount: 5000, date: 'Oct 1, 2023', status: 'Paid'},
        {id: '#122', amount: 5000, date: 'Sep 1, 2023', status: 'Paid'},
    ]);

    const handlePay = () => {
        setPaying(true);
        setTimeout(() => {
            setHistory([{id: `#${Date.now().toString().slice(-4)}`, amount: balance, date: 'Today', status: 'Paid'}, ...history]);
            setBalance(0);
            setPaying(false);
            showToast("Payment successful!");
        }, 2000);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h1 className="text-2xl font-bold text-slate-900">Payments & Billing</h1>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Current Balance</h3>
                    <p className="text-slate-500 text-sm mb-6">Due by Oct 30, 2023</p>
                    <div className="text-4xl font-extrabold text-slate-900 mb-8">
                        {balance === 0 ? <span className="text-green-600 flex items-center gap-2"><CheckCircle /> Paid</span> : `RWF ${balance.toLocaleString()}`}
                    </div>
                    {balance > 0 && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={() => setMethod('momo')} className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95 ${method === 'momo' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200'}`}>
                                    <span className="font-bold text-sm">Mobile Money</span>
                                </button>
                                <button onClick={() => setMethod('card')} className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95 ${method === 'card' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200'}`}>
                                    <CreditCard size={20} />
                                    <span className="font-bold text-sm">Card</span>
                                </button>
                            </div>
                            <button onClick={handlePay} disabled={paying} className="w-full py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 flex items-center justify-center gap-2 disabled:opacity-70 transition-all active:scale-95 shadow-lg shadow-brand-200">
                                {paying ? <Loader2 size={18} className="animate-spin" /> : <DollarSign size={18} />}
                                {paying ? "Processing..." : `Pay RWF ${balance.toLocaleString()}`}
                            </button>
                        </div>
                    )}
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-slate-100 font-bold">Payment History</div>
                    <div className="max-h-[300px] overflow-y-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-white text-slate-500">
                                <tr>
                                    <th className="p-4">ID</th>
                                    <th className="p-4">Amount</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((item, i) => (
                                    <tr key={i} className="border-t border-slate-50 hover:bg-slate-50 transition-colors">
                                        <td className="p-4 font-mono">{item.id}</td>
                                        <td className="p-4 font-bold">RWF {item.amount.toLocaleString()}</td>
                                        <td className="p-4 text-slate-600">{item.date}</td>
                                        <td className="p-4 text-green-600 font-bold text-xs uppercase">{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HouseholdWasteGuide = () => {
  const [search, setSearch] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [loading, setLoading] = useState(false);

  const performSearch = async (term: string) => {
    if (!term.trim()) return;
    setLoading(true);
    setAiResult('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a waste management expert for Kigali, Rwanda. 
        User asks: "How do I dispose of ${term}?"
        Provide a concise instruction (max 2 sentences) on which bin it goes to (Green for Organic, Blue for Recycling, Black for General) and any special handling (e.g. wash it).`,
      });
      setAiResult(response.text || "Could not retrieve info.");
    } catch (e) {
      console.error("Gemini API Error:", e);
      setAiResult("AI Service unavailable. Please check your API key.");
    }
    setLoading(false);
  };

  const handleManualSearch = () => {
      performSearch(search);
  };

  const handleChipClick = (term: string) => {
      setSearch(term);
      performSearch(term);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
       <div className="mb-2">
          <h1 className="text-2xl font-bold text-slate-900">Waste Sorting Guide</h1>
          <p className="text-slate-500">Not sure where to throw it? Ask our AI or search the database.</p>
       </div>
       <div className="relative max-w-xl flex gap-2">
          <div className="relative flex-1">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
             <input 
               type="text" 
               placeholder="e.g., 'Broken glass', 'Pizza box'..." 
               className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-brand-50 focus:border-brand-500 outline-none shadow-sm transition-all"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleManualSearch()}
               aria-label="Search waste item"
             />
          </div>
          <button 
             onClick={handleManualSearch}
             disabled={loading}
             className="px-6 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700 disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-brand-200 transition-all active:scale-95"
          >
             {loading ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
             Ask AI
          </button>
       </div>
       
       <AiResultBox loading={loading} result={aiResult} title="Isuku AI Advice" />

       <div className="grid md:grid-cols-3 gap-6 pt-4">
          {[{name: 'Plastic Bottle', bin: 'Blue Bin'}, {name: 'Banana Peel', bin: 'Green Bin'}, {name: 'Batteries', bin: 'Hazardous'}].map((item, idx) => (
             <button 
                key={idx} 
                onClick={() => handleChipClick(item.name)}
                className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between hover:border-brand-300 transition-colors shadow-sm cursor-pointer hover:shadow-md text-left w-full focus:outline-none focus:ring-2 focus:ring-brand-500"
             >
                <span className="font-bold text-slate-900">{item.name}</span>
                <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-lg">{item.bin}</span>
             </button>
          ))}
       </div>
    </div>
  );
};

const HouseholdSupport = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
    <div className="mb-2">
      <h1 className="text-2xl font-bold text-slate-900">Help & Support</h1>
      <p className="text-slate-500">Chat with our AI assistant or contact support.</p>
    </div>
    <div className="grid lg:grid-cols-3 gap-6">
       <div className="lg:col-span-2">
          <AiChatWidget 
            title="Isuku Support" 
            subtitle="Instant AI Assistant" 
            initialMessage="Hello! How can I help you with your waste collection today?"
            systemInstruction="You are a helpful customer support agent for IsukuHub, a waste management company in Kigali. Help users with missed pickups, billing, and sorting questions. Keep answers short and polite."
            userRole="Household"
          />
       </div>
       <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-4">Contact Details</h3>
             <p className="text-sm text-slate-600 mb-2">Need to speak to a human?</p>
             <p className="text-brand-600 font-bold text-lg">+250 788 123 456</p>
             <p className="text-slate-500 text-xs mt-1">Mon-Fri, 8am - 5pm</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-4">Quick Links</h3>
             <Link to="/report" className="block text-sm text-brand-600 font-semibold mb-2 hover:underline">Report Illegal Dumping</Link>
             <Link to="/faq" className="block text-sm text-brand-600 font-semibold hover:underline">Read FAQs</Link>
          </div>
       </div>
    </div>
  </div>
);

const HouseholdView = ({ activeTab, setActiveTab, isLoading, showToast }: { activeTab: string, setActiveTab: (t: string) => void, isLoading: boolean, showToast: (t: string) => void }) => {
  const navigate = useNavigate();
  
  switch (activeTab) {
    case 'overview': return <HouseholdOverview isLoading={isLoading} onNavigate={setActiveTab} />;
    case 'schedule': return <HouseholdSchedule showToast={showToast} />;
    case 'payments': return <HouseholdPayments showToast={showToast} />;
    case 'guide': return <HouseholdWasteGuide />;
    case 'support': return <HouseholdSupport />;
    case 'report': return <HouseholdReport goToOverview={() => setActiveTab('overview')} showToast={showToast} />;
    case 'settings': return <SettingsView showToast={showToast} />;
    default: return <HouseholdOverview isLoading={isLoading} onNavigate={setActiveTab} />;
  }
};

// --- COLLECTOR VIEW COMPONENTS ---

const CollectorTasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, addr: 'KG 201 St, #45', done: false },
    { id: 2, addr: 'KG 201 St, #47', done: false },
    { id: 3, addr: 'KG 203 St, #12', done: true },
  ]);
  const toggleTask = (id: number) => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
       <div className="mb-2"><h1 className="text-2xl font-bold text-slate-900">Daily Pickup List</h1><p className="text-slate-500">Sector 4 Route - Today</p></div>
       <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          {tasks.map((task) => (
             <div 
                key={task.id} 
                onClick={() => toggleTask(task.id)} 
                className={`p-4 border-b border-slate-50 flex items-center justify-between cursor-pointer transition-colors ${task.done ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
                tabIndex={0}
                onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTask(task.id); } }}
                role="checkbox"
                aria-checked={task.done}
             >
                <div className="flex items-center gap-4">
                   <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${task.done ? 'bg-brand-600 border-brand-600' : 'border-slate-300'}`}>{task.done && <CheckCircle size={16} className="text-white" />}</div>
                   <span className={`font-medium ${task.done ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{task.addr}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${task.done ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{task.done ? 'Collected' : 'Pending'}</span>
             </div>
          ))}
       </div>
    </div>
  );
};

const CollectorFleet = ({ isLoading }: { isLoading: boolean }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
    <h1 className="text-2xl font-bold text-slate-900">Fleet Management</h1>
    <TableCard isLoading={isLoading} title="Vehicle Status" columns={['ID', 'Type', 'Driver', 'Status', 'Load', 'Fuel']}>
      {[
        { id: 'TRK-01', type: 'Compactor', driver: 'Jean P.', status: 'Active', load: '85%', fuel: '40%' },
        { id: 'TRK-02', type: 'Compactor', driver: 'Eric M.', status: 'Maintenance', load: '0%', fuel: 'N/A' },
        { id: 'TRK-03', type: 'Light Truck', driver: 'Sarah K.', status: 'Active', load: '30%', fuel: '75%' },
      ].map((v, i) => (
        <tr key={i} className="hover:bg-slate-50 border-t border-slate-50 transition-colors">
          <td className="p-4 font-mono text-xs">{v.id}</td>
          <td className="p-4 text-sm">{v.type}</td>
          <td className="p-4 text-sm">{v.driver}</td>
          <td className="p-4"><span className={`text-xs font-bold px-2 py-1 rounded-full ${v.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{v.status}</span></td>
          <td className="p-4 text-sm font-bold">{v.load}</td>
          <td className="p-4 text-sm">{v.fuel}</td>
        </tr>
      ))}
    </TableCard>
  </div>
);

const CollectorHistory = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <h1 className="text-2xl font-bold text-slate-900">Collection History</h1>
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                    <tr><th className="p-4">Date</th><th className="p-4">Route</th><th className="p-4">Weight</th><th className="p-4">Status</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {[{date: 'Oct 24', route: 'Sector 4', weight: '2.1 T', status: 'Completed'}, {date: 'Oct 23', route: 'Sector 4', weight: '1.9 T', status: 'Completed'}].map((r,i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors"><td className="p-4">{r.date}</td><td className="p-4">{r.route}</td><td className="p-4 font-bold">{r.weight}</td><td className="p-4 text-green-600 font-bold text-xs uppercase">{r.status}</td></tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const CollectorEarnings = ({ showToast }: { showToast: (t: string) => void }) => {
    const [balance, setBalance] = useState(154000);
    const [cashingOut, setCashingOut] = useState(false);
    const handleCashOut = () => {
        setCashingOut(true);
        setTimeout(() => { 
            setBalance(0); 
            setCashingOut(false);
            showToast('Earnings transferred to your account');
        }, 2000);
    }
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h1 className="text-2xl font-bold text-slate-900">Earnings</h1>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <p className="text-slate-500 mb-2">Available Balance</p>
                <div className="text-5xl font-extrabold text-slate-900 mb-8">RWF {balance.toLocaleString()}</div>
                <button onClick={handleCashOut} disabled={cashingOut || balance === 0} className="px-8 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 disabled:opacity-50 flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-brand-200">
                    {cashingOut ? <Loader2 className="animate-spin" /> : <DollarSign />} {cashingOut ? 'Processing...' : 'Cash Out Now'}
                </button>
            </div>
             <div className="h-64"><ChartCard title="Weekly Earnings" data={[{label:'Mon', value: 45000}, {label:'Tue', value: 32000}, {label:'Wed', value: 55000}, {label:'Thu', value: 22000}]} /></div>
        </div>
    )
};

const CollectorView = ({ activeTab, isLoading, showToast }: { activeTab: string, isLoading: boolean, showToast: (t: string) => void }) => {
  switch (activeTab) {
    case 'overview': return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <div className="mb-2"><h1 className="text-2xl font-bold text-slate-900">Route Dashboard</h1></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard isLoading={isLoading} title="Stops" value="34 / 120" icon={<MapPin size={24} />} />
          <StatCard isLoading={isLoading} title="Weight" value="2.4 T" icon={<Truck size={24} />} colorClass="text-blue-600" bgClass="bg-blue-50" />
          <StatCard isLoading={isLoading} title="Efficiency" value="94%" icon={<TrendingUp size={24} />} colorClass="text-green-600" bgClass="bg-green-50" />
          <StatCard isLoading={isLoading} title="Alerts" value="3" icon={<AlertTriangle size={24} />} colorClass="text-red-600" bgClass="bg-red-50" />
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 h-96"><MapCard title="Live Route" type="route" /></div>
           <div className="h-96"><ChartCard isLoading={isLoading} title="Weekly Volume" data={[{ label: 'Mon', value: 3 }, { label: 'Tue', value: 2 }, { label: 'Wed', value: 4 }]} /></div>
        </div>
      </div>
    );
    case 'tasks': return <CollectorTasks />;
    case 'fleet': return <CollectorFleet isLoading={isLoading} />;
    case 'map': return <div className="h-[80vh]"><MapCard title="Full Map View" type="route" /></div>;
    case 'chat': return <AiChatWidget title="Dispatch Team" subtitle="HQ Line" systemInstruction="You are the dispatch HQ for a waste truck fleet. Give brief, professional routing instructions to a driver." initialMessage="Team 4, please skip KG 102 due to construction." userRole="Driver" headerColor="bg-blue-600" />;
    case 'history': return <CollectorHistory />;
    case 'earnings': return <CollectorEarnings showToast={showToast} />;
    case 'settings': return <SettingsView showToast={showToast} />;
    default: return <div className="p-10 text-center">Select a menu item</div>;
  }
};

// --- RECYCLER VIEW COMPONENTS ---

const RecyclerInventory = () => {
  const [updating, setUpdating] = useState(false);
  const handleUpdate = () => {
    setUpdating(true);
    setTimeout(() => setUpdating(false), 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
        <button 
            onClick={handleUpdate}
            className="px-4 py-2 bg-brand-600 text-white font-bold rounded-lg text-sm flex items-center gap-2 hover:bg-brand-700 transition-all active:scale-95 shadow-md shadow-brand-200"
        >
            {updating ? <Loader2 size={16} className="animate-spin" /> : <Package size={16} />}
            {updating ? "Syncing..." : "Update Stock"}
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[{name:'PET Bottles', qty:'4.5 T', cap:'80%'}, {name:'Cardboard', qty:'1.2 T', cap:'40%'}, {name:'HDPE', qty:'0.8 T', cap:'25%'}].map((item,i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
             <div className="flex justify-between mb-4"><span className="font-bold text-lg">{item.name}</span><Package className="text-brand-500" /></div>
             <div className="text-3xl font-bold mb-2">{item.qty}</div>
             <div className="w-full bg-slate-100 rounded-full h-2 mb-1"><div className="bg-brand-500 h-2 rounded-full" style={{width: item.cap}}></div></div>
             <span className="text-xs text-slate-500">{item.cap} Capacity Filled</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const RecyclerMarketplace = ({ showToast }: { showToast: (t: string) => void }) => {
    const [balance, setBalance] = useState(2400000);
    const [items, setItems] = useState([
        { id: 1, name: 'Sorted PET Plastic', price: 250, unit: 'kg', avail: 500 },
        { id: 2, name: 'Aluminum Cans', price: 800, unit: 'kg', avail: 120 },
        { id: 3, name: 'Mixed Paper', price: 100, unit: 'kg', avail: 1000 },
    ]);
    const [buyingId, setBuyingId] = useState<number | null>(null);

    const handleBuy = (id: number, cost: number, unit: string) => {
        if (balance >= cost) {
            setBuyingId(id);
            setTimeout(() => {
                setBalance(b => b - cost);
                setItems(items.map(i => i.id === id ? {...i, avail: i.avail - 10} : i)); 
                setBuyingId(null);
                showToast(`Successfully purchased 10 ${unit}`);
            }, 800);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Materials Marketplace</h1>
                    <p className="text-slate-500">Buy and sell recyclable stock live.</p>
                </div>
                <div className="bg-green-50 px-4 py-2 rounded-xl border border-green-100 flex items-center gap-2 text-green-700 font-bold">
                    <Wallet size={20} />
                    RWF {balance.toLocaleString()}
                </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
                {items.map(item => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-brand-200 transition-all shadow-sm hover:shadow-md">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg text-slate-900">{item.name}</h3>
                                <p className="text-sm text-slate-500">{item.avail} {item.unit} available</p>
                            </div>
                            <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold uppercase">Sell Offer</span>
                        </div>
                        <div className="flex items-end justify-between mt-6">
                            <div>
                                <p className="text-xs text-slate-400">Price per {item.unit}</p>
                                <p className="text-2xl font-bold text-brand-700">{item.price}</p>
                            </div>
                            <button 
                                onClick={() => handleBuy(item.id, item.price * 10, item.unit)}
                                disabled={buyingId === item.id}
                                className="px-4 py-2 bg-brand-600 text-white rounded-lg font-bold text-sm hover:bg-brand-700 active:scale-95 transition-all shadow-md shadow-brand-200 disabled:opacity-70 flex items-center gap-2"
                            >
                                {buyingId === item.id && <Loader2 size={14} className="animate-spin" />}
                                Buy 10 {item.unit}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const RecyclerRequests = ({ showToast }: { showToast: (t: string) => void }) => {
    const [reqs, setReqs] = useState([
        { id: 1, type: 'Bulk Plastic', loc: 'Kicukiro Market', qty: '200 kg', status: 'Pending' },
        { id: 2, type: 'Scrap Metal', loc: 'Remera Garage', qty: '500 kg', status: 'Pending' },
    ]);

    const handleAction = (id: number, action: 'Accept' | 'Reject') => {
        setReqs(reqs.map(r => r.id === id ? { ...r, status: action === 'Accept' ? 'Scheduled' : 'Rejected' } : r));
        showToast(`Request ${action === 'Accept' ? 'Accepted' : 'Rejected'}`);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h1 className="text-2xl font-bold text-slate-900">Pickup Requests</h1>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                {reqs.length === 0 ? <div className="p-8 text-center text-slate-500">No active requests</div> : 
                 reqs.map(r => (
                    <div key={r.id} className="p-6 border-b border-slate-50 last:border-none flex flex-col md:flex-row justify-between items-center gap-4 transition-colors hover:bg-slate-50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                <Package size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">{r.type}</h3>
                                <p className="text-sm text-slate-500 flex items-center gap-2"><MapPin size={14} /> {r.loc} • {r.qty}</p>
                            </div>
                        </div>
                        {r.status === 'Pending' ? (
                            <div className="flex gap-2">
                                <button onClick={() => handleAction(r.id, 'Reject')} className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 text-sm transition-colors">Ignore</button>
                                <button onClick={() => handleAction(r.id, 'Accept')} className="px-4 py-2 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 text-sm transition-colors shadow-sm">Accept Pickup</button>
                            </div>
                        ) : (
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${r.status === 'Scheduled' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
                                {r.status}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const RecyclerLogistics = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <h1 className="text-2xl font-bold text-slate-900">Logistics & Transport</h1>
        <div className="grid gap-4">
             {[{id: 'TR-88', dest: 'Plastic Plant A', load: 'PET Bottles', status: 'In Transit'}, {id: 'TR-92', dest: 'Metal Foundry', load: 'Scrap', status: 'Loading'}].map((t, i) => (
                 <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                     <div className="flex items-center gap-4">
                         <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Truck size={24}/></div>
                         <div><h3 className="font-bold">{t.dest}</h3><p className="text-sm text-slate-500">{t.load} • {t.id}</p></div>
                     </div>
                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${t.status === 'In Transit' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}>{t.status}</span>
                 </div>
             ))}
        </div>
    </div>
);

const RecyclerImpact = ({ isLoading }: { isLoading: boolean }) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <h1 className="text-2xl font-bold text-slate-900">Environmental Impact</h1>
        <div className="grid sm:grid-cols-2 gap-6">
            <StatCard isLoading={isLoading} title="CO2 Offset" value="12.5 Tons" icon={<Leaf size={24} />} colorClass="text-green-600" bgClass="bg-green-50" />
            <StatCard isLoading={isLoading} title="Trees Saved" value="142" icon={<Leaf size={24} />} colorClass="text-brand-600" bgClass="bg-brand-50" />
        </div>
        <div className="h-80"><ChartCard isLoading={isLoading} title="Monthly Diverted Waste (Tons)" data={[{label:'Aug', value: 120}, {label:'Sep', value: 145}, {label:'Oct', value: 160}]} /></div>
    </div>
);

const RecyclerView = ({ activeTab, isLoading, showToast }: { activeTab: string, isLoading: boolean, showToast: (t: string) => void }) => {
  switch(activeTab) {
    case 'overview': return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
         <div className="mb-2"><h1 className="text-2xl font-bold text-slate-900">Sourcing Hub</h1></div>
         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard isLoading={isLoading} title="Sourced" value="850 kg" icon={<Leaf size={24} />} />
            <StatCard isLoading={isLoading} title="Nearby" value="1.2 T" icon={<MapPin size={24} />} colorClass="text-orange-600" bgClass="bg-orange-50" />
            <StatCard isLoading={isLoading} title="Requests" value="12" icon={<Users size={24} />} colorClass="text-blue-600" bgClass="bg-blue-50" />
            <StatCard isLoading={isLoading} title="Offset" value="3.2 T" icon={<CheckCircle size={24} />} colorClass="text-green-600" bgClass="bg-green-50" />
         </div>
         <div className="h-96"><MapCard title="Material Source Map" type="points" /></div>
      </div>
    );
    case 'market': return <RecyclerMarketplace showToast={showToast} />;
    case 'inventory': return <RecyclerInventory />;
    case 'requests': return <RecyclerRequests showToast={showToast} />;
    case 'logistics': return <RecyclerLogistics />;
    case 'impact': return <RecyclerImpact isLoading={isLoading} />;
    case 'settings': return <SettingsView showToast={showToast} />;
    default: return <div className="text-center py-20"><p className="text-slate-500">Module loaded: {activeTab}</p></div>;
  }
};

// --- OFFICIAL VIEW COMPONENTS ---

const OfficialCompliance = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleAnalyze = async (id: string) => {
    setAnalyzing(true);
    setAnalysis(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a city compliance officer. Analyze Report #${id}: "Illegal dumping of electronics and chemical fluids near wetland boundary." 
        Assess severity (Low/Medium/High), environmental risk, and recommended immediate action. Keep it under 50 words.`,
      });
      setAnalysis(response.text || "Analysis failed.");
    } catch (e) {
      console.error("Gemini API Error:", e);
      setAnalysis("AI Analysis Service Unavailable. Please check API Key.");
    }
    setAnalyzing(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
       <h1 className="text-2xl font-bold text-slate-900">Compliance & Enforcement</h1>
       <div className="grid gap-6">
         {[1, 2].map((id) => (
           <div key={id} className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
              <div className="w-24 h-24 bg-slate-100 rounded-xl shrink-0 flex items-center justify-center text-slate-400"><FileText size={32} /></div>
              <div className="flex-1">
                 <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">Illegal Dumping Case #{id}092</h3>
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold uppercase">Open</span>
                 </div>
                 <p className="text-slate-600 text-sm mb-4">Reported dumping of mixed waste near residential zone...</p>
                 <div className="flex gap-3">
                    <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-bold text-slate-700 transition-colors">View Evidence</button>
                    <button 
                      onClick={() => handleAnalyze(id.toString())}
                      disabled={analyzing}
                      className="px-4 py-2 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                      <Sparkles size={14} /> {analyzing && id.toString() ? 'Analyzing...' : 'Analyze with AI'}
                    </button>
                 </div>
                 {analysis && id === 1 && (
                    <AiResultBox loading={false} result={analysis} title="AI Assessment" />
                 )}
              </div>
           </div>
         ))}
       </div>
    </div>
  );
};

const OfficialReports = ({ showToast }: { showToast: (t: string) => void }) => {
    const [reports, setReports] = useState([
        { id: 101, loc: 'Gisozi', type: 'Dumping', status: 'Open', date: '2h ago' },
        { id: 102, loc: 'Nyamirambo', type: 'Hazardous', status: 'Investigating', date: '5h ago' },
        { id: 103, loc: 'Kacyiru', type: 'Missed Pickup', status: 'Resolved', date: '1d ago' },
    ]);

    const changeStatus = (id: number) => {
        setReports(reports.map(r => {
            if (r.id === id) {
                const next = r.status === 'Open' ? 'Investigating' : r.status === 'Investigating' ? 'Resolved' : 'Resolved';
                showToast(`Report #${id} status updated to ${next}`);
                return { ...r, status: next };
            }
            return r;
        }));
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h1 className="text-2xl font-bold text-slate-900">Citizen Reports</h1>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-semibold">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Location</th>
                            <th className="p-4">Type</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map(r => (
                            <tr key={r.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
                                <td className="p-4 font-mono">#{r.id}</td>
                                <td className="p-4">{r.loc}</td>
                                <td className="p-4">{r.type}</td>
                                <td className="p-4 text-slate-500">{r.date}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                                        r.status === 'Open' ? 'bg-red-100 text-red-700' :
                                        r.status === 'Investigating' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                    }`}>{r.status}</span>
                                </td>
                                <td className="p-4">
                                    {r.status !== 'Resolved' && (
                                        <button onClick={() => changeStatus(r.id)} className="text-brand-600 font-bold text-xs hover:underline">
                                            {r.status === 'Open' ? 'Start Investigate' : 'Resolve'}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const OfficialRegistry = () => {
    const [search, setSearch] = useState('');
    const users = [
        { id: 1, name: 'John Doe', sector: 'Remera', plan: 'Standard' },
        { id: 2, name: 'Jane Smith', sector: 'Kacyiru', plan: 'Business' },
        { id: 3, name: 'Robert K.', sector: 'Kimironko', plan: 'Standard' },
    ];

    const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.sector.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">User Registry</h1>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search users..." 
                        className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-brand-500 focus:ring-4 focus:ring-brand-50 outline-none transition-all"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
                {filtered.map(u => (
                    <div key={u.id} className="p-4 border-b border-slate-50 last:border-none flex justify-between items-center hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold">{u.name.charAt(0)}</div>
                            <div>
                                <h3 className="font-bold text-slate-900">{u.name}</h3>
                                <p className="text-xs text-slate-500">{u.sector}</p>
                            </div>
                        </div>
                        <span className="bg-slate-50 px-3 py-1 rounded-full text-xs font-bold text-slate-600">{u.plan}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const OfficialPolicy = () => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const summarizePolicy = async () => {
    setLoading(true);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Summarize the "Kigali Sanitation Master Plan 2025" focusing on household responsibilities and fines for non-compliance. Keep it concise bullet points.`,
        });
        setSummary(response.text || "No summary.");
    } catch (e) { 
      console.error("Gemini API Error:", e);
      setSummary("AI Service Unavailable."); 
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <h1 className="text-2xl font-bold text-slate-900">Policy Documents</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
           <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Gavel size={24} /></div>
              <div><h3 className="font-bold">Sanitation Master Plan</h3><p className="text-xs text-slate-500">Updated: Jan 2024</p></div>
           </div>
           <button onClick={summarizePolicy} className="w-full py-2 border border-brand-200 text-brand-700 font-bold rounded-lg hover:bg-brand-50 flex items-center justify-center gap-2 transition-colors active:scale-95">
              <Sparkles size={16} /> {loading ? 'Summarizing...' : 'Summarize Key Points'}
           </button>
           <AiResultBox loading={loading} result={summary} title="Policy Summary" />
        </div>
      </div>
    </div>
  );
};

const OfficialAnalytics = ({ isLoading }: { isLoading: boolean }) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <h1 className="text-2xl font-bold text-slate-900">City Analytics</h1>
        <div className="grid lg:grid-cols-2 gap-6">
            <div className="h-80"><ChartCard isLoading={isLoading} title="Total Waste Collection (Tons)" data={[{label:'Jan',value:1200}, {label:'Feb',value:1350}, {label:'Mar',value:1250}, {label:'Apr',value:1400}]} /></div>
            <div className="h-80"><ChartCard isLoading={isLoading} title="Report Resolution Time (Hrs)" data={[{label:'Jan',value:48}, {label:'Feb',value:36}, {label:'Mar',value:24}, {label:'Apr',value:18}]} /></div>
        </div>
    </div>
);

const OfficialView = ({ activeTab, isLoading, showToast }: { activeTab: string, isLoading: boolean, showToast: (t: string) => void }) => {
   switch(activeTab) {
     case 'overview': return (
       <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
         <div className="mb-2"><h1 className="text-2xl font-bold text-slate-900">City Operations</h1></div>
         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
           <StatCard isLoading={isLoading} title="Compliance" value="87.4%" icon={<CheckCircle size={24} />} />
           <StatCard isLoading={isLoading} title="Reports" value="42" icon={<AlertTriangle size={24} />} colorClass="text-red-600" bgClass="bg-red-50" />
           <StatCard isLoading={isLoading} title="Diverted" value="12,450 T" icon={<Leaf size={24} />} colorClass="text-green-600" bgClass="bg-green-50" />
           <StatCard isLoading={isLoading} title="Fleets" value="18" icon={<Truck size={24} />} colorClass="text-blue-600" bgClass="bg-blue-50" />
         </div>
         <div className="h-96"><MapCard title="City Heatmap" type="heatmap" /></div>
       </div>
     );
     case 'users': return <OfficialRegistry />;
     case 'gis': return <div className="h-[80vh]"><MapCard title="Zoning & GIS Data" type="heatmap" /></div>;
     case 'compliance': return <OfficialCompliance />;
     case 'policy': return <OfficialPolicy />;
     case 'reports': return <OfficialReports showToast={showToast} />;
     case 'analytics': return <OfficialAnalytics isLoading={isLoading} />;
     case 'settings': return <SettingsView showToast={showToast} />;
     default: return <div className="text-center py-20"><p className="text-slate-500">Module loaded: {activeTab}</p></div>;
   }
};

// --- MAIN DASHBOARD CONTROLLER ---

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userRole, setUserRole] = useState<UserRole>('household');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  // Simulate data loading state for skeleton UI
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // 1.2s fake loading time
    return () => clearTimeout(timer);
  }, [userRole, activeTab]);

  const handleRoleSwitch = (role: UserRole) => {
    setUserRole(role);
    setActiveTab('overview');
    showToast(`Switched to ${role.charAt(0).toUpperCase() + role.slice(1)} view`, 'info');
  };

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <DashboardLayout 
      role={userRole} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      onSwitchRole={handleRoleSwitch}
    >
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      {userRole === 'household' && <HouseholdView activeTab={activeTab} setActiveTab={setActiveTab} isLoading={isLoading} showToast={showToast} />}
      {userRole === 'collector' && <CollectorView activeTab={activeTab} isLoading={isLoading} showToast={showToast} />}
      {userRole === 'recycler' && <RecyclerView activeTab={activeTab} isLoading={isLoading} showToast={showToast} />}
      {userRole === 'official' && <OfficialView activeTab={activeTab} isLoading={isLoading} showToast={showToast} />}
    </DashboardLayout>
  );
};

export default Dashboard;