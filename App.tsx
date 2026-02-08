
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import RegisterFormPage from './pages/RegisterFormPage';
import SuccessPage from './pages/SuccessPage';
import HistoryPage from './pages/HistoryPage';
import AdminAuthPage from './pages/AdminAuthPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen text-slate-200 flex flex-col">
        <main className="flex-grow container mx-auto px-6 py-12 max-w-6xl">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/event/:id" element={<EventDetailsPage />} />
            <Route path="/register/:id" element={<RegisterFormPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/admin-auth" element={<AdminAuthPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="py-10 text-center text-slate-500 text-sm border-t border-white/10">
          <div className="mb-2 font-semibold tracking-widest uppercase text-xs text-indigo-400">Innovation & Excellence</div>
          &copy; 2026 National Science Day. Built for the future of science.
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
