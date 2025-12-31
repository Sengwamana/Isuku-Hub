import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Features from './pages/Features';
import Impact from './pages/Impact';
import Dashboard from './pages/Dashboard';
import Resources from './pages/Resources';
import Login from './pages/Login';
import Signup from './pages/Signup';

// New Pages
import About from './pages/About';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ReportIssue from './pages/ReportIssue';
import GenericPage from './pages/GenericPage';

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