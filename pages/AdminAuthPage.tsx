import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const ADMIN_EMAIL = 'nationalscienceday2026@gmail.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate a slight delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (email.trim() === ADMIN_EMAIL) {
      // Store authentication in localStorage
      localStorage.setItem('adminAuthenticated', 'true');
      navigate('/history');
    } else {
      setError('Invalid email. Access denied.');
      setEmail('');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center space-y-12 animate-slide-up">
      <div className="space-y-6 w-full max-w-md">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase text-highlight">
            Admin <span className="text-amber-500">Access</span>
          </h1>
          <p className="text-base text-slate-300 font-bold">
            Enter your email to access mission records
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card p-8 rounded-[2.5rem] border border-amber-500/30 space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-amber-400 text-left">
                Authorization Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="Enter Admin Email"
                className="w-full px-6 py-3 bg-black/50 border border-amber-500/40 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-transparent transition-all font-bold"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs font-bold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !email.trim()}
              className="w-full px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-black rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {isLoading ? 'Verifying...' : 'Unlock Access'}
            </button>
          </div>
        </form>

        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 text-amber-400 font-black uppercase text-xs tracking-widest hover:text-amber-300 transition-colors"
        >
          ← Return Home
        </button>
      </div>
    </div>
  );
};

export default AdminAuthPage;
