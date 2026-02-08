
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EVENTS } from '../constants';

const EventsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 py-6">
      <button 
        onClick={() => navigate('/')}
        className="mb-4 text-amber-400 font-black uppercase text-xs tracking-widest hover:text-amber-300 transition-colors flex items-center gap-2"
      >
        ← Back to Home
      </button>

      <div className="text-center space-y-4 animate-slide-up">
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">The <span className="text-gradient">Challenges</span></h2>
        <p className="text-slate-300 font-bold text-base max-w-xl mx-auto text-highlight">Select a event to showcase your talent.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EVENTS.map((event, index) => (
          <div 
            key={event.id}
            onClick={() => navigate(`/event/${event.id}`)}
            className={`group cursor-pointer glass-card rounded-xl p-6 border border-amber-900/20 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all transform hover:-translate-y-2 relative overflow-hidden flex flex-col items-start space-y-4 animate-slide-up slide-delay-${index + 1}`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-3xl -mr-8 -mt-8 group-hover:bg-amber-500/10 transition-all" />
            
            <div className="z-10 w-full">
              <h3 className="text-xl font-black text-white mb-2 tracking-tighter group-hover:text-amber-400 transition-colors text-highlight">{event.name}</h3>
              <p className="text-slate-400 text-xs font-bold leading-relaxed line-clamp-3 transition-colors">
                {event.description}
              </p>
            </div>

            <div className="z-10 pt-4 flex items-center justify-between w-full border-t border-amber-900/30">
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-amber-500">
                {event.teamSize} PERSON SQUAD
              </span>
              <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all text-amber-500 shadow-inner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;