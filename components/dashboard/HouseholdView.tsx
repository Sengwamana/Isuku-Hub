import React from 'react';
import StatCard from './StatCard';
import ChartCard from './ChartCard';
import MapCard from './MapCard';
import { CheckCircle, Truck, Leaf, DollarSign } from 'lucide-react';
import { HouseholdOverview, HouseholdSchedule, HouseholdPayments, HouseholdWasteGuide, HouseholdSupport, HouseholdReport } from '../../pages/Dashboard';

export const HouseholdView = ({ activeTab, setActiveTab, isLoading, showToast }: { activeTab: string, setActiveTab: (t: string) => void, isLoading: boolean, showToast: (t: string) => void }) => {
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
