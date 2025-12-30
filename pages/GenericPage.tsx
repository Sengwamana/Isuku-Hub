import React from 'react';
import { useLocation } from 'react-router-dom';

const GenericPage: React.FC = () => {
  const location = useLocation();
  const title = location.pathname.substring(1).replace('-', ' ').replace('/', '');

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-[60vh]">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-slate-900 capitalize mb-6">{title}</h1>
        <p className="text-lg text-slate-600 mb-8">
          This page is under construction. IsukuHub is constantly evolving to serve you better.
        </p>
        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 inline-block">
            <p className="text-sm text-slate-500">Content for {location.pathname} will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default GenericPage;