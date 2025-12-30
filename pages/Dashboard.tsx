import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
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
  Info, BarChart3, Gavel, FileCheck
} from 'lucide-react';

// --- SHARED COMPONENTS & HELPERS ---

const AiResultBox = ({ loading, result, title }: { loading: boolean, result: string, title: string }) => {
  if (!loading && !result) return null;
  return (
    <div className="mt-4 p-4 bg-brand-50 border border-brand-100 rounded-xl animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center gap-2 mb-2 text-brand-700 font-bold text-sm uppercase tracking-wider">
        {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
        {loading ? "Analyzing..." : title}
      </div>
      {loading ? (
        <div className="h-4 bg-brand-200/50 rounded w-3/4 animate-pulse"></div>
      ) : (
        <p className="text-sm text-slate-700 leading-relaxed">{result}</p>
      )}
    </div>
  );
};

const SettingsView = () => (
  <div className="max-w-4xl mx-auto space-y-8">
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
           <input type="text" defaultValue="John Doe" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
        </div>
        <div>
           <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
           <input type="email" defaultValue="john@example.com" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
        </div>
      </div>
      <div className="mt-6 flex justify-end"><button className="px-6 py-2 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-colors">Save Changes</button></div>
    </div>
  </div>
);

// --- HOUSEHOLD VIEW COMPONENTS ---

const HouseholdOverview = () => (
  <div className="space-y-6">
    <div className="mb-2">
      <h1 className="text-2xl font-bold text-slate-900">My Household Overview</h1>
      <p className="text-slate-500">Welcome back! Here is your waste summary.</p>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
       <StatCard title="Compliance Score" value="98/100" icon={<CheckCircle size={24} />} trend={{ value: '+2%', direction: 'up' }} />
       <StatCard title="Next Pickup" value="Tomorrow, 9AM" icon={<Truck size={24} />} colorClass="text-blue-600" bgClass="bg-blue-50" />
       <StatCard title="Recycling Points" value="1,240 pts" icon={<Leaf size={24} />} colorClass="text-green-600" bgClass="bg-green-50" trend={{ value: 'Gold Tier', direction: 'neutral' }} />
       <StatCard title="Monthly Bill" value="RWF 5,000" icon={<DollarSign size={24} />} colorClass="text-orange-600" bgClass="bg-orange-50" trend={{ value: 'Paid', direction: 'neutral' }} />
    </div>
    <div className="grid lg:grid-cols-3 gap-6">
       <div className="lg:col-span-2 h-96">
         <ChartCard title="My Waste Composition" subtitle="Breakdown by weight (kg) this month" data={[{ label: 'Organic', value: 45 }, { label: 'Plastic', value: 20 }, { label: 'Paper', value: 15 }, { label: 'Glass', value: 10 }, { label: 'Metal', value: 5 }]} />
       </div>
       <div className="h-96">
         <MapCard title="Truck ETA Tracker" type="basic" />
       </div>
    </div>
  </div>
);

const HouseholdSchedule = () => (
  <div className="space-y-6">
     <div className="flex justify-between items-end mb-2">
        <div><h1 className="text-2xl font-bold text-slate-900">Pickup Schedule</h1><p className="text-slate-500">Upcoming collection dates.</p></div>
        <button className="bg-brand-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-brand-700">Request Extra Pickup</button>
     </div>
     <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {[{ day: 'Tomorrow', date: 'Oct 25', type: 'General Waste', status: 'Scheduled', time: '09:00 AM - 11:00 AM' }, { day: 'Thursday', date: 'Oct 28', type: 'Recyclables', status: 'Scheduled', time: '10:00 AM - 12:00 PM' }].map((item, idx) => (
           <div key={idx} className="p-6 border-b border-slate-50 last:border-none flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50 gap-4">
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

const HouseholdWasteGuide = () => {
  const [search, setSearch] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAiSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    setAiResult('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a waste management expert for Kigali, Rwanda. 
        User asks: "How do I dispose of ${search}?"
        Provide a concise instruction (max 2 sentences) on which bin it goes to (Green for Organic, Blue for Recycling, Black for General) and any special handling (e.g. wash it).`,
      });
      setAiResult(response.text || "Could not retrieve info.");
    } catch (e) {
      setAiResult("AI Service unavailable. Please check the standard guide.");
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
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
               className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none shadow-sm"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
             />
          </div>
          <button 
             onClick={handleAiSearch}
             disabled={loading}
             className="px-6 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700 disabled:opacity-50 flex items-center gap-2"
          >
             {loading ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
             Ask AI
          </button>
       </div>
       
       <AiResultBox loading={loading} result={aiResult} title="Isuku AI Advice" />

       <div className="grid md:grid-cols-3 gap-6 pt-4">
          {[{name: 'Plastic Bottle', bin: 'Blue Bin'}, {name: 'Banana Peel', bin: 'Green Bin'}, {name: 'Batteries', bin: 'Hazardous'}].map((item, idx) => (
             <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-900">{item.name}</span>
                <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-lg">{item.bin}</span>
             </div>
          ))}
       </div>
    </div>
  );
};

const HouseholdSupport = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-slate-900">Help & Support</h1>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100">
        <h3 className="font-bold mb-4">Contact Support</h3>
        <p className="text-slate-500 text-sm mb-4">Need help with a missed pickup or billing issue?</p>
        <button className="w-full py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200">Start Chat</button>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-100">
        <h3 className="font-bold mb-4">FAQs</h3>
        <ul className="space-y-2 text-sm text-brand-600 font-medium">
          <li className="hover:underline cursor-pointer">How to report illegal dumping?</li>
          <li className="hover:underline cursor-pointer">What goes in the green bin?</li>
        </ul>
      </div>
    </div>
  </div>
);

const HouseholdView = ({ activeTab }: { activeTab: string }) => {
  switch (activeTab) {
    case 'overview': return <HouseholdOverview />;
    case 'schedule': return <HouseholdSchedule />;
    case 'payments': return <div className="space-y-6"><h1 className="text-2xl font-bold text-slate-900">Payments</h1><TableCard title="History" columns={['ID', 'Amount', 'Date', 'Status']} children={<tr><td className="p-4">#123</td><td className="p-4">RWF 5000</td><td className="p-4">Oct 1</td><td className="p-4 text-green-600">Paid</td></tr>} /></div>;
    case 'guide': return <HouseholdWasteGuide />;
    case 'support': return <HouseholdSupport />;
    case 'report': return <div className="text-center py-20 bg-white rounded-2xl border border-slate-100"><MapPin size={48} className="mx-auto text-brand-300 mb-4" /><h2 className="text-xl font-bold text-slate-900">Redirecting...</h2></div>;
    case 'settings': return <SettingsView />;
    default: return <HouseholdOverview />;
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
    <div className="space-y-6">
       <div className="mb-2"><h1 className="text-2xl font-bold text-slate-900">Daily Pickup List</h1><p className="text-slate-500">Sector 4 Route - Today</p></div>
       <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          {tasks.map((task) => (
             <div key={task.id} onClick={() => toggleTask(task.id)} className={`p-4 border-b border-slate-50 flex items-center justify-between cursor-pointer ${task.done ? 'bg-slate-50' : 'hover:bg-slate-50'}`}>
                <div className="flex items-center gap-4">
                   <div className={`w-6 h-6 rounded border flex items-center justify-center ${task.done ? 'bg-brand-600 border-brand-600' : 'border-slate-300'}`}>{task.done && <CheckCircle size={16} className="text-white" />}</div>
                   <span className={`font-medium ${task.done ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{task.addr}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${task.done ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{task.done ? 'Collected' : 'Pending'}</span>
             </div>
          ))}
       </div>
    </div>
  );
};

const CollectorFleet = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-slate-900">Fleet Management</h1>
    <TableCard title="Vehicle Status" columns={['ID', 'Type', 'Driver', 'Status', 'Load', 'Fuel']}>
      {[
        { id: 'TRK-01', type: 'Compactor', driver: 'Jean P.', status: 'Active', load: '85%', fuel: '40%' },
        { id: 'TRK-02', type: 'Compactor', driver: 'Eric M.', status: 'Maintenance', load: '0%', fuel: 'N/A' },
        { id: 'TRK-03', type: 'Light Truck', driver: 'Sarah K.', status: 'Active', load: '30%', fuel: '75%' },
      ].map((v, i) => (
        <tr key={i} className="hover:bg-slate-50 border-t border-slate-50">
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

const CollectorView = ({ activeTab }: { activeTab: string }) => {
  switch (activeTab) {
    case 'overview': return (
      <div className="space-y-6">
        <div className="mb-2"><h1 className="text-2xl font-bold text-slate-900">Route Dashboard</h1></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Stops" value="34 / 120" icon={<MapPin size={24} />} />
          <StatCard title="Weight" value="2.4 T" icon={<Truck size={24} />} colorClass="text-blue-600" bgClass="bg-blue-50" />
          <StatCard title="Efficiency" value="94%" icon={<TrendingUp size={24} />} colorClass="text-green-600" bgClass="bg-green-50" />
          <StatCard title="Alerts" value="3" icon={<AlertTriangle size={24} />} colorClass="text-red-600" bgClass="bg-red-50" />
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 h-96"><MapCard title="Live Route" type="route" /></div>
           <div className="h-96"><ChartCard title="Weekly Volume" data={[{ label: 'Mon', value: 3 }, { label: 'Tue', value: 2 }, { label: 'Wed', value: 4 }]} /></div>
        </div>
      </div>
    );
    case 'tasks': return <CollectorTasks />;
    case 'fleet': return <CollectorFleet />;
    case 'map': return <div className="h-[80vh]"><MapCard title="Full Map View" type="route" /></div>;
    case 'chat': return <div className="h-96 bg-white rounded-2xl border border-slate-100 p-6 flex items-center justify-center text-slate-500">Chat Module Placeholder</div>;
    case 'history': return <div className="space-y-4"><h1 className="text-2xl font-bold">History</h1><p>Past routes and collection logs.</p></div>;
    case 'earnings': return <div className="space-y-4"><h1 className="text-2xl font-bold">Earnings</h1><p>Financial performance dashboard.</p></div>;
    case 'settings': return <SettingsView />;
    default: return <div className="p-10 text-center">Select a menu item</div>;
  }
};

// --- RECYCLER VIEW COMPONENTS ---

const RecyclerInventory = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center mb-2">
      <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
      <button className="px-4 py-2 bg-brand-600 text-white font-bold rounded-lg text-sm">Update Stock</button>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      {[{name:'PET Bottles', qty:'4.5 T', cap:'80%'}, {name:'Cardboard', qty:'1.2 T', cap:'40%'}, {name:'HDPE', qty:'0.8 T', cap:'25%'}].map((item,i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100">
           <div className="flex justify-between mb-4"><span className="font-bold text-lg">{item.name}</span><Package className="text-brand-500" /></div>
           <div className="text-3xl font-bold mb-2">{item.qty}</div>
           <div className="w-full bg-slate-100 rounded-full h-2 mb-1"><div className="bg-brand-500 h-2 rounded-full" style={{width: item.cap}}></div></div>
           <span className="text-xs text-slate-500">{item.cap} Capacity Filled</span>
        </div>
      ))}
    </div>
  </div>
);

const RecyclerView = ({ activeTab }: { activeTab: string }) => {
  switch(activeTab) {
    case 'overview': return (
      <div className="space-y-6">
         <div className="mb-2"><h1 className="text-2xl font-bold text-slate-900">Sourcing Hub</h1></div>
         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Sourced" value="850 kg" icon={<Leaf size={24} />} />
            <StatCard title="Nearby" value="1.2 T" icon={<MapPin size={24} />} colorClass="text-orange-600" bgClass="bg-orange-50" />
            <StatCard title="Requests" value="12" icon={<Users size={24} />} colorClass="text-blue-600" bgClass="bg-blue-50" />
            <StatCard title="Offset" value="3.2 T" icon={<CheckCircle size={24} />} colorClass="text-green-600" bgClass="bg-green-50" />
         </div>
         <div className="h-96"><MapCard title="Material Source Map" type="points" /></div>
      </div>
    );
    case 'market': return <div className="p-6 bg-white rounded-2xl border border-slate-100"><h2 className="text-xl font-bold mb-4">Marketplace</h2><p className="text-slate-500">Live listings of buy/sell offers.</p></div>;
    case 'inventory': return <RecyclerInventory />;
    case 'requests': return <div className="p-6 bg-white rounded-2xl border border-slate-100"><h2 className="text-xl font-bold mb-4">Pickup Requests</h2><p className="text-slate-500">Incoming requests from households/businesses.</p></div>;
    case 'logistics': return <div className="p-6 bg-white rounded-2xl border border-slate-100"><h2 className="text-xl font-bold mb-4">Logistics</h2><p className="text-slate-500">Transport coordination view.</p></div>;
    case 'impact': return <div className="p-6 bg-white rounded-2xl border border-slate-100"><h2 className="text-xl font-bold mb-4">Impact Reports</h2><p className="text-slate-500">Environmental metrics.</p></div>;
    case 'settings': return <SettingsView />;
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
      setAnalysis("AI Analysis Service Unavailable.");
    }
    setAnalyzing(false);
  };

  return (
    <div className="space-y-6">
       <h1 className="text-2xl font-bold text-slate-900">Compliance & Enforcement</h1>
       <div className="grid gap-6">
         {[1, 2].map((id) => (
           <div key={id} className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row gap-6">
              <div className="w-24 h-24 bg-slate-100 rounded-xl shrink-0 flex items-center justify-center text-slate-400"><FileText size={32} /></div>
              <div className="flex-1">
                 <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">Illegal Dumping Case #{id}092</h3>
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold uppercase">Open</span>
                 </div>
                 <p className="text-slate-600 text-sm mb-4">Reported dumping of mixed waste near residential zone...</p>
                 <div className="flex gap-3">
                    <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-bold text-slate-700">View Evidence</button>
                    <button 
                      onClick={() => handleAnalyze(id.toString())}
                      disabled={analyzing}
                      className="px-4 py-2 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-lg text-sm font-bold flex items-center gap-2"
                    >
                      <Sparkles size={14} /> {analyzing ? 'Analyzing...' : 'Analyze with AI'}
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
    } catch (e) { setSummary("AI Service Unavailable."); }
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Policy Documents</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100">
           <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Gavel size={24} /></div>
              <div><h3 className="font-bold">Sanitation Master Plan</h3><p className="text-xs text-slate-500">Updated: Jan 2024</p></div>
           </div>
           <button onClick={summarizePolicy} className="w-full py-2 border border-brand-200 text-brand-700 font-bold rounded-lg hover:bg-brand-50 flex items-center justify-center gap-2">
              <Sparkles size={16} /> Summarize Key Points
           </button>
           <AiResultBox loading={loading} result={summary} title="Policy Summary" />
        </div>
      </div>
    </div>
  );
};

const OfficialView = ({ activeTab }: { activeTab: string }) => {
   switch(activeTab) {
     case 'overview': return (
       <div className="space-y-6">
         <div className="mb-2"><h1 className="text-2xl font-bold text-slate-900">City Operations</h1></div>
         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
           <StatCard title="Compliance" value="87.4%" icon={<CheckCircle size={24} />} />
           <StatCard title="Reports" value="42" icon={<AlertTriangle size={24} />} colorClass="text-red-600" bgClass="bg-red-50" />
           <StatCard title="Diverted" value="12,450 T" icon={<Leaf size={24} />} colorClass="text-green-600" bgClass="bg-green-50" />
           <StatCard title="Fleets" value="18" icon={<Truck size={24} />} colorClass="text-blue-600" bgClass="bg-blue-50" />
         </div>
         <div className="h-96"><MapCard title="City Heatmap" type="heatmap" /></div>
       </div>
     );
     case 'users': return <div className="bg-white p-6 rounded-2xl border border-slate-100"><h2 className="text-xl font-bold mb-4">User Registry</h2><p>Database of 12,500+ registered households.</p></div>;
     case 'gis': return <div className="h-[80vh]"><MapCard title="Zoning & GIS Data" type="heatmap" /></div>;
     case 'compliance': return <OfficialCompliance />;
     case 'policy': return <OfficialPolicy />;
     case 'reports': return <div className="p-6 bg-white rounded-2xl"><h2 className="text-xl font-bold mb-4">Submitted Reports</h2><p>List of citizen reports.</p></div>;
     case 'analytics': return <div className="h-96"><ChartCard title="Waste Trends" data={[{label:'Jan',value:50}, {label:'Feb',value:65}, {label:'Mar',value:45}]} /></div>;
     case 'settings': return <SettingsView />;
     default: return <div className="text-center py-20"><p className="text-slate-500">Module loaded: {activeTab}</p></div>;
   }
};

// --- MAIN DASHBOARD CONTROLLER ---

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userRole, setUserRole] = useState<UserRole>('household');

  const handleRoleSwitch = (role: UserRole) => {
    setUserRole(role);
    setActiveTab('overview');
  };

  return (
    <DashboardLayout 
      role={userRole} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      onSwitchRole={handleRoleSwitch}
    >
      {userRole === 'household' && <HouseholdView activeTab={activeTab} />}
      {userRole === 'collector' && <CollectorView activeTab={activeTab} />}
      {userRole === 'recycler' && <RecyclerView activeTab={activeTab} />}
      {userRole === 'official' && <OfficialView activeTab={activeTab} />}
    </DashboardLayout>
  );
};

export default Dashboard;