import React, { useEffect, useRef, useState } from 'react';
import { Map as MapIcon, Maximize2, Layers, Navigation, AlertTriangle, MapPin } from 'lucide-react';

interface MapCardProps {
  title: string;
  type: 'route' | 'heatmap' | 'points' | 'basic';
}

declare global {
  interface Window {
    google: any;
    gm_authFailure?: () => void;
  }
}

// Center of Kigali, Rwanda
const KIGALI_CENTER = { lat: -1.9441, lng: 30.0619 };

const MockMap: React.FC<{ type: string }> = ({ type }) => {
  const [msg, setMsg] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    const messages: Record<string, string> = {
      basic: "Location Pinned: -1.94, 30.06",
      route: "Route Segment: KG 54 Ave • Traffic: Light",
      heatmap: "Zone Severity: High • Reports: 12",
      points: "Collection Point: Open"
    };
    setMsg(messages[type] || "Map Interaction");
    setTimeout(() => setMsg(null), 2000);
  };

  return (
    <div 
      onClick={handleClick}
      className="w-full h-full bg-slate-100 relative overflow-hidden flex items-center justify-center cursor-crosshair group"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)', 
             backgroundSize: '20px 20px' 
           }}>
      </div>
      
      {/* City Features Simulation */}
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 400 300" preserveAspectRatio="none">
         <path d="M0,150 Q100,100 200,150 T400,150" fill="none" stroke="#94a3b8" strokeWidth="4" />
         <path d="M200,0 Q250,150 200,300" fill="none" stroke="#94a3b8" strokeWidth="4" />
         <path d="M50,300 Q150,200 100,0" fill="none" stroke="#94a3b8" strokeWidth="4" />
      </svg>

      {/* Interaction Feedback Toast */}
      {msg && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg animate-in zoom-in fade-in duration-200">
           {msg}
        </div>
      )}

      {/* Specific Visualization */}
      <div className="relative z-10 w-full h-full pointer-events-none">
         {type === 'route' && (
           <svg className="w-full h-full">
              <path className="animate-pulse" d="M50,250 Q150,200 200,150 T350,50" fill="none" stroke="#0d9488" strokeWidth="6" strokeLinecap="round" strokeDasharray="10,5" />
              <circle cx="50" cy="250" r="6" fill="white" stroke="#0d9488" strokeWidth="3" />
              <circle cx="350" cy="50" r="6" fill="white" stroke="#0d9488" strokeWidth="3" />
              <circle cx="200" cy="150" r="8" fill="#0d9488">
                 <animateMotion dur="4s" repeatCount="indefinite" path="M50,250 Q150,200 200,150 T350,50" />
              </circle>
              <foreignObject x="10" y="260" width="100" height="40">
                  <div className="bg-white/80 px-2 py-1 rounded text-[10px] font-bold text-slate-700 shadow-sm w-fit">Start</div>
              </foreignObject>
              <foreignObject x="320" y="60" width="100" height="40">
                  <div className="bg-white/80 px-2 py-1 rounded text-[10px] font-bold text-slate-700 shadow-sm w-fit">Destination</div>
              </foreignObject>
           </svg>
         )}

         {type === 'points' && (
           <div className="w-full h-full">
             {[
               {t: '20%', l: '30%'}, {t: '50%', l: '60%'}, {t: '70%', l: '20%'}, {t: '40%', l: '80%'}
             ].map((pos, i) => (
               <div key={i} className="absolute w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-md animate-bounce" style={{ top: pos.t, left: pos.l, animationDelay: `${i * 0.5}s` }}></div>
             ))}
           </div>
         )}

         {type === 'heatmap' && (
           <div className="w-full h-full relative">
             <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-red-500 rounded-full blur-3xl opacity-40 mix-blend-multiply"></div>
             <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-yellow-500 rounded-full blur-3xl opacity-40 mix-blend-multiply"></div>
             <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-green-500 rounded-full blur-3xl opacity-40 mix-blend-multiply"></div>
           </div>
         )}

         {type === 'basic' && (
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-12 h-12 bg-brand-500/20 rounded-full animate-ping absolute inset-0"></div>
                <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center relative z-10">
                   <div className="w-8 h-8 bg-brand-600 rounded-full"></div>
                </div>
              </div>
           </div>
         )}
      </div>

      <div className="absolute bottom-2 right-2 px-2 py-1 bg-white/50 rounded text-[10px] text-slate-500 font-mono">
        Simulation Mode
      </div>
    </div>
  );
};

const MapCard: React.FC<MapCardProps> = ({ title, type }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState(false);
  const infoWindowRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Load Google Maps Script
  useEffect(() => {
    window.gm_authFailure = () => {
      console.warn("MapCard: Google Maps authentication failed. Switching to Mock Map.");
      setError(true);
      setScriptLoaded(false);
    };

    if (window.google?.maps) {
      setScriptLoaded(true);
      return;
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      setError(true);
      return;
    }

    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => { if (!error) setScriptLoaded(true); });
      existingScript.addEventListener('error', () => setError(true));
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=visualization,places`;
    script.async = true;
    script.defer = true;
    script.onload = () => { if (!error) setScriptLoaded(true); };
    script.onerror = () => { setError(true); };
    document.head.appendChild(script);
  }, []);

  // Initialize Map
  useEffect(() => {
    if (error || !scriptLoaded || !mapRef.current || !window.google?.maps) return;

    try {
        const map = new window.google.maps.Map(mapRef.current, {
        center: KIGALI_CENTER,
        zoom: type === 'route' ? 14 : 12,
        styles: [
            { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }
        ],
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        clickableIcons: false,
        });

        setMapInstance(map);
        infoWindowRef.current = new window.google.maps.InfoWindow();

        // Render features based on type
        if (type === 'route') renderRoute(map);
        if (type === 'points') renderPoints(map);
        if (type === 'heatmap') renderHeatmap(map);
        if (type === 'basic') renderBasic(map);
    } catch (e) {
        console.warn("MapCard: Error initializing map. Switching to Mock Map.", e);
        setError(true);
    }
  }, [scriptLoaded, type, error]);

  const showInfo = (map: any, position: any, content: string) => {
      infoWindowRef.current.setContent(`<div style="padding:4px; font-weight:bold; color:#0f766e">${content}</div>`);
      infoWindowRef.current.setPosition(position);
      infoWindowRef.current.open(map);
  };

  const renderBasic = (map: any) => {
    // Household View: Click to Pin
    new window.google.maps.Marker({
      position: KIGALI_CENTER,
      map: map,
      title: "My Home",
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#0d9488",
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "#ffffff",
      }
    });

    const truckMarker = new window.google.maps.Marker({
      position: { lat: -1.935, lng: 30.065 },
      map: map,
      label: "🚛",
      title: "Collection Truck"
    });

    truckMarker.addListener("click", () => {
        showInfo(map, truckMarker.getPosition(), "Arriving in 15 mins");
    });

    // Map Click Listener for "Pinning"
    map.addListener("click", (e: any) => {
        // Clear previous temporary markers if any
        markersRef.current.forEach(m => m.setMap(null));
        
        const marker = new window.google.maps.Marker({
            position: e.latLng,
            map: map,
            animation: window.google.maps.Animation.DROP,
            icon: {
                path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                scale: 5,
                fillColor: "#ef4444",
                fillOpacity: 1,
                strokeWeight: 1,
                strokeColor: "white"
            }
        });
        markersRef.current.push(marker);
        showInfo(map, e.latLng, "Location Pinned for Report");
    });
  };

  const renderRoute = (map: any) => {
    const path = [
      { lat: -1.9441, lng: 30.0619 },
      { lat: -1.9480, lng: 30.0650 },
      { lat: -1.9520, lng: 30.0600 },
      { lat: -1.9550, lng: 30.0700 },
      { lat: -1.9600, lng: 30.0680 },
    ];

    const routeLine = new window.google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: "#0d9488",
      strokeOpacity: 0.8,
      strokeWeight: 5,
      map: map,
      clickable: true,
    });

    // Interactive Route
    routeLine.addListener("mouseover", () => {
        routeLine.setOptions({ strokeColor: "#115e59", strokeWeight: 7 });
    });
    routeLine.addListener("mouseout", () => {
        routeLine.setOptions({ strokeColor: "#0d9488", strokeWeight: 5 });
    });
    routeLine.addListener("click", (e: any) => {
        showInfo(map, e.latLng, "Sector 4 Route<br/>Est. Time: 45m<br/>Stops: 12");
    });

    new window.google.maps.Marker({ position: path[0], map, label: "A", title: "Start Point" });
    new window.google.maps.Marker({ position: path[path.length - 1], map, label: "B", title: "End Point" });
    
    // Live Truck Position
    const truck = new window.google.maps.Marker({
      position: path[2],
      map,
      icon: {
         path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
         scale: 6,
         fillColor: "#f59e0b",
         fillOpacity: 1,
         strokeWeight: 2,
         strokeColor: "white"
      },
      title: "Current Location"
    });

    truck.addListener("click", () => {
        showInfo(map, truck.getPosition(), "Driver: Jean P.<br/>Status: On Schedule");
    });
  };

  const renderPoints = (map: any) => {
    const points = [
      { pos: { lat: -1.935, lng: 30.060 }, title: "Plastics Center", type: "Recycling" },
      { pos: { lat: -1.945, lng: 30.080 }, title: "Glass Depot", type: "Recycling" },
      { pos: { lat: -1.960, lng: 30.050 }, title: "E-Waste Hub", type: "Hazardous" },
    ];

    points.forEach(p => {
      const marker = new window.google.maps.Marker({
        position: p.pos,
        map,
        title: p.title,
        icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: p.type === "Hazardous" ? "#ef4444" : "#f97316",
            fillOpacity: 0.9,
            strokeWeight: 1,
            strokeColor: "white"
        }
      });
      
      marker.addListener("click", () => {
          showInfo(map, marker.getPosition(), `<b>${p.title}</b><br/>Type: ${p.type}<br/>Status: Open`);
      });
    });
  };

  const renderHeatmap = (map: any) => {
     // Interactive Heatmap Zones (Simulated with circles)
     const hotspots = [
       { lat: -1.940, lng: 30.065, color: '#ef4444', desc: "Illegal Dumping: Critical" },
       { lat: -1.950, lng: 30.055, color: '#f59e0b', desc: "Missed Pickups: Moderate" },
       { lat: -1.9441, lng: 30.0619, color: '#22c55e', desc: "Compliance: High" }
     ];
     
     hotspots.forEach(h => {
        const circle = new window.google.maps.Circle({
          strokeColor: h.color,
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: h.color,
          fillOpacity: 0.35,
          map,
          center: {lat: h.lat, lng: h.lng},
          radius: 800,
          clickable: true
        });

        circle.addListener("click", (e: any) => {
            showInfo(map, e.latLng, h.desc);
        });
        
        circle.addListener("mouseover", () => {
            circle.setOptions({ fillOpacity: 0.6 });
        });
        circle.addListener("mouseout", () => {
            circle.setOptions({ fillOpacity: 0.35 });
        });
     });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-1 overflow-hidden h-full flex flex-col relative group">
      {/* Header Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-slate-100 pointer-events-none">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <MapIcon size={16} className="text-brand-600" />
          {title}
        </h3>
      </div>

      {/* Controls Overlay */}
      {!error && (
        <div className="absolute top-4 right-4 z-10 flex gap-2">
           <button 
              onClick={() => mapInstance?.setZoom((mapInstance?.getZoom() || 14) + 1)}
              className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm border border-slate-100 text-slate-600 hover:text-brand-600 transition-colors"
           >
              <Layers size={18} />
           </button>
           <button 
              onClick={() => mapInstance?.setCenter(KIGALI_CENTER)}
              className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm border border-slate-100 text-slate-600 hover:text-brand-600 transition-colors"
           >
              <Navigation size={18} />
           </button>
        </div>
      )}

      {/* Map Container */}
      <div className="w-full h-full bg-slate-100 rounded-xl relative overflow-hidden">
        {error ? (
          <MockMap type={type} />
        ) : (
          <div ref={mapRef} className="w-full h-full min-h-[300px]" />
        )}
      </div>
    </div>
  );
};

export default MapCard;