import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
const Home = React.lazy(() => import('./pages/Home'));
const Features = React.lazy(() => import('./pages/Features'));
const Impact = React.lazy(() => import('./pages/Impact'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Resources = React.lazy(() => import('./pages/Resources'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const About = React.lazy(() => import('./pages/About'));
const Careers = React.lazy(() => import('./pages/Careers'));
const Blog = React.lazy(() => import('./pages/Blog'));
const FAQ = React.lazy(() => import('./pages/FAQ'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Terms = React.lazy(() => import('./pages/Terms'));
const ReportIssue = React.lazy(() => import('./pages/ReportIssue'));
const GenericPage = React.lazy(() => import('./pages/GenericPage'));

// Loading component for Suspense
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
    <p className="text-slate-500 font-medium animate-pulse text-sm tracking-wide">Initializing view...</p>
  </div>
);

// ScrollToTop component to reset scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const LayoutContent: React.FC = () => {
  const location = useLocation();
  const hideNavFooter = ['/dashboard', '/login', '/signup'].some(path => location.pathname.startsWith(path));

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-200 selection:text-brand-900 flex flex-col">
      {!hideNavFooter && <Navbar />}
      <main className="flex-grow">
        <React.Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Footer / Generic Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Fallback */}
            <Route path="*" element={<GenericPage />} />
          </Routes>
        </React.Suspense>
      </main>
      {!hideNavFooter && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
       <ScrollToTop />
       <LayoutContent />
    </Router>
  );
};

export default App;