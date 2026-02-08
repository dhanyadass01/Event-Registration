
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const eventName = (location.state as any)?.eventName || 'Event';

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-12 animate-slide-up">
      <div className="relative">
        <div className="absolute inset-0 bg-amber-500 blur-3xl opacity-20"></div>
        <div className="relative w-32 h-32 bg-amber-600/20 text-amber-500 rounded-[2.5rem] flex items-center justify-center text-5xl border border-amber-500/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
          ✦
        </div>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Registration Secured</h2>
        <p className="text-base text-slate-300 max-w-md mx-auto font-bold text-highlight">
          You have successfully registered to the <span className="text-amber-400">{eventName}</span>.
          Event coordinators will reach you soon
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
        <button 
          onClick={() => navigate('/')}
          className="px-10 py-4 glass-card text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all w-full sm:w-auto border border-amber-500/20"
        >
          Return to Deck
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
