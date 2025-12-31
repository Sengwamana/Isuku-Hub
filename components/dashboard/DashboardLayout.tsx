import React, { useState, useRef, useEffect } from 'react';
import Sidebar, { UserRole } from './Sidebar';
import { Bell, Search, User, CheckCircle, AlertTriangle, Info, LogOut, Settings, CreditCard, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardLayoutProps {
  role: UserRole;
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSwitchRole: (role: UserRole) => void;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success';
  read: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role, children, activeTab, setActiveTab, onSwitchRole }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: 'Pickup Schedule Updated', message: 'Your general waste pickup is now tomorrow at 9 AM.', time: '10m ago', type: 'info', read: false },
    { id: 2, title: 'Payment Successful', message: 'Thank you for your payment of RWF 5,000.', time: '1h ago', type: 'success', read: false },
    { id: 3, title: 'Missed Collection', message: 'Truck 4 reported inability to access your street.', time: 'Yesterday', type: 'warning', read: true },
    { id: 4, title: 'New Recycling Guide', message: 'Check out the updated sorting rules for plastics.', time: '2 days ago', type: 'info', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: number) => {
     setNotifications(notifications.filter(n => n.id !== id));
  }

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      <Sidebar role={role} activeTab={activeTab} setActiveTab={setActiveTab} onSwitchRole={onSwitchRole} />
      
      <div className="flex-1 flex flex-col min-w-0 max-w-[100vw]">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20 shadow-sm md:shadow-none transition-all">
          <div className="flex items-center gap-4 flex-1">
             <div className="relative hidden md:block max-w-md w-full group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={18} />
               <input 
                 type="text" 
                 placeholder={`Search ${role} resources...`} 
                 className="pl-10 pr-4 py-2 bg-slate-50 border border-transparent rounded-xl text-sm font-medium text-slate-600 focus:outline-none focus:bg-white focus:border-brand-200 focus:ring-4 focus:ring-brand-50 w-full transition-all"
               />
             </div>
             {/* Mobile Title */}
             <div className="md:hidden font-bold text-slate-900 text-lg">
                Dashboard
             </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
                <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`p-2.5 rounded-full relative transition-all active:scale-95 ${showNotifications ? 'bg-brand-50 text-brand-600 ring-2 ring-brand-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                    aria-label="Notifications"
                >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"></span>
                    )}
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                    <div className="absolute right-0 top-full mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="font-bold text-slate-900">Notifications</h3>
                                <p className="text-xs text-slate-500">{unreadCount} unread alerts</p>
                            </div>
                            {unreadCount > 0 && (
                                <button onClick={markAllRead} className="text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline">
                                    Mark all read
                                </button>
                            )}
                        </div>
                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                            {notifications.length === 0 ? (
                                <div className="p-10 text-center text-slate-500 text-sm flex flex-col items-center gap-2">
                                    <Bell size={24} className="text-slate-300" />
                                    No new notifications
                                </div>
                            ) : (
                                notifications.map(notification => (
                                    <div key={notification.id} className={`p-4 border-b border-slate-50 last:border-none hover:bg-slate-50 transition-colors flex gap-3 group relative ${!notification.read ? 'bg-blue-50/30' : ''}`}>
                                        <div className={`mt-1 shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm 
                                            ${notification.type === 'warning' ? 'bg-red-100 text-red-600' : 
                                              notification.type === 'success' ? 'bg-green-100 text-green-600' : 
                                              'bg-blue-100 text-blue-600'}`}>
                                            {notification.type === 'warning' ? <AlertTriangle size={14} /> : 
                                             notification.type === 'success' ? <CheckCircle size={14} /> : 
                                             <Info size={14} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className={`text-sm font-bold truncate pr-2 ${!notification.read ? 'text-slate-900' : 'text-slate-600'}`}>
                                                    {notification.title}
                                                </h4>
                                                <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">{notification.time}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 leading-relaxed mb-2 line-clamp-2">{notification.message}</p>
                                            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {!notification.read && (
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); setNotifications(notifications.map(n => n.id === notification.id ? { ...n, read: true } : n)); }}
                                                        className="text-[10px] font-bold text-brand-600 hover:underline"
                                                    >
                                                        Mark read
                                                    </button>
                                                )}
                                                 <button 
                                                        onClick={(e) => { e.stopPropagation(); removeNotification(notification.id); }}
                                                        className="text-[10px] text-slate-400 hover:text-red-500 transition-colors"
                                                    >
                                                        Dismiss
                                                    </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="p-2 border-t border-slate-50 bg-slate-50 text-center">
                            <button className="text-xs font-bold text-slate-500 hover:text-slate-700 w-full py-2">View All History</button>
                        </div>
                    </div>
                )}
            </div>
            
            {/* User Profile Dropdown */}
            <div className="relative" ref={profileRef}>
                <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all active:scale-95 ${showProfileMenu ? 'bg-brand-50 border-brand-200 ring-2 ring-brand-100' : 'bg-white border-slate-200 hover:border-brand-200'}`}
                >
                   <User size={20} className={showProfileMenu ? 'text-brand-600' : 'text-slate-600'} />
                </button>

                {showProfileMenu && (
                    <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                            <p className="text-sm font-bold text-slate-900">Demo User</p>
                            <p className="text-xs text-slate-500 capitalize">{role} Account</p>
                        </div>
                        <div className="p-2">
                            <button onClick={() => { setActiveTab('settings'); setShowProfileMenu(false); }} className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg flex items-center gap-2 transition-colors">
                                <Settings size={16} /> Settings
                            </button>
                            <button onClick={() => { setActiveTab('payments'); setShowProfileMenu(false); }} className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg flex items-center gap-2 transition-colors">
                                <CreditCard size={16} /> Billing
                            </button>
                             <button onClick={() => { setActiveTab('support'); setShowProfileMenu(false); }} className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg flex items-center gap-2 transition-colors">
                                <HelpCircle size={16} /> Help Center
                            </button>
                        </div>
                        <div className="p-2 border-t border-slate-50">
                            <Link to="/" className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors font-medium">
                                <LogOut size={16} /> Sign Out
                            </Link>
                        </div>
                    </div>
                )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto overflow-x-hidden">
           {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;