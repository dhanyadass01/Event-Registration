
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EVENTS } from '../constants';

const EventDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = EVENTS.find(e => e.id === id);

  if (!event) return (
    <div className="text-center py-20">
      <h2 className="text-xl font-bold text-white">Event not found</h2>
      <button onClick={() => navigate('/events')} className="mt-4 text-amber-500 font-bold underline">Back to Events</button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6">
      <div className="flex flex-col items-center md:items-start gap-8 animate-slide-up">
        <div className="flex-grow text-center md:text-left space-y-6 w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-2">
              <div className="text-amber-500 font-black text-xs tracking-widest uppercase">Sector Specification</div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter text-highlight uppercase">{event.name}</h2>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-3 pb-2">
              <span className="px-5 py-2 glass-card text-white rounded-full text-xs font-black tracking-widest uppercase border border-amber-500/30">
                {event.prefix} CLASSIFIED
              </span>
              <span className="px-5 py-2 bg-amber-500/20 text-amber-300 rounded-full text-xs font-black tracking-widest uppercase border border-amber-500/40">
                {event.teamSize} OPERATIVES
              </span>
            </div>
          </div>
          <p className="text-base md:text-xl text-slate-200 max-w-3xl leading-relaxed font-bold text-highlight">{event.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div 
          className="glass-card p-10 rounded-[2.5rem] border border-amber-900/30 space-y-8 shadow-xl animate-slide-up slide-delay-1"
        >
          <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3 uppercase">
            <div className="w-2 h-8 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.6)]"></div>
            Rules & Protocols
          </h3>
          <ul className="space-y-5">
            {event.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-4 text-white group">
                <span className="mt-2 w-2.5 h-2.5 bg-amber-600 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-sm font-bold leading-relaxed">{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {(event.rounds || event.criteria) && (
          <div 
            className="glass-card p-10 rounded-[2.5rem] border border-amber-900/30 space-y-8 shadow-xl animate-slide-up slide-delay-2"
          >
            <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3 uppercase">
              <div className="w-2 h-8 bg-amber-700 rounded-full shadow-[0_0_15px_rgba(180,83,9,0.4)]"></div>
              Mission Architecture
            </h3>
            
            {event.rounds && (
              <div className="space-y-8">
                {event.rounds.map((round, idx) => (
                  <div key={idx} className="space-y-2 border-l-3 border-amber-500/30 pl-6">
                    <h4 className="font-black text-amber-400 uppercase text-xs tracking-widest">{round.name}</h4>
                    <p className="text-sm text-slate-200 font-bold leading-relaxed">{round.details}</p>
                  </div>
                ))}
              </div>
            )}

            {event.criteria && (
              <div className="space-y-4 pt-4">
                <p className="text-xs font-black uppercase tracking-widest text-amber-700">Evaluation Matrix</p>
                <div className="flex flex-wrap gap-2">
                  {event.criteria.map((c, idx) => (
                    <span key={idx} className="px-4 py-2 bg-amber-500/10 text-amber-300 rounded-xl text-xs font-black uppercase tracking-wider border border-amber-500/20">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Coordinators and WhatsApp Section */}
      <div className="glass-card p-8 rounded-[2.5rem] border border-amber-900/30 space-y-6 shadow-xl animate-slide-up slide-delay-3">
        <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3 uppercase">
          <div className="w-2 h-8 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.6)]"></div>
          Coordinators
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {event.staffCoordinator && (
            <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-widest text-amber-500">Staff Coordinator</p>
              <p className="text-base text-white font-bold">{event.staffCoordinator}</p>
            </div>
          )}
          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-widest text-amber-500">Student Coordinator</p>
            <p className="text-base text-white font-bold">{event.studentCoordinator}</p>
            <p className="text-sm text-slate-300 font-bold">Contact: {event.studentContact}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-amber-500/20">
          <a 
            href={event.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-green-500/30 active:scale-95"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Join WhatsApp Group for Updates
          </a>
        </div>
      </div>

      <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up slide-delay-4">
        <button 
          onClick={() => navigate('/events')}
          className="order-2 sm:order-1 px-10 py-5 text-white font-black uppercase text-xs tracking-[0.2em] hover:text-amber-400 transition-colors"
        >
          ← Return to Directory
        </button>
        <button 
          onClick={() => navigate(`/register/${event.id}`)}
          className="order-1 sm:order-2 px-16 py-5 bg-gradient-to-r from-amber-400 to-amber-600 text-black rounded-full text-base font-black hover:brightness-110 transition-all shadow-2xl shadow-amber-500/30 active:scale-95 w-full sm:w-auto"
        >
          Initialize Mission
        </button>
      </div>
    </div>
  );
};

export default EventDetailsPage;
