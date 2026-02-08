
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center max-w-5xl mx-auto space-y-16 animate-slide-up px-4">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <img
          src="https://www.sankara.ac.in/science-and-commerce/wp-content/themes/sankara/images/main-logo/College%20Name%202023%20Option%203-01.png"
          alt="Sankara College of Science and Commerce"
          className="h-24 md:h-28 w-auto object-contain mix-blend-darken"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI-mMbOIphJc1KxJ_vIDJHu9uNwKzrPPDWVA&s"
          alt="Partner logo"
          className="h-20 md:h-24 w-auto object-contain"
        />
      </div>
      <div className="space-y-8">
        <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white uppercase text-highlight">
          National Science Day Event<span className="text-amber-500"> 2026</span>
        </h1>
        <p className="text-base md:text-xl text-slate-300 leading-relaxed max-w-4xl mx-auto font-bold text-highlight">
          Department of Computer Science with Data Analytics proudly presents National Science Day 2026 at Sankara College Of Science And Commerce.
          <br className="hidden md:block" />
          Step into a world of innovation across 7 engaging events designed to challenge your curiosity and scientific talents.
          Date: 28 february 2026
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
        <button 
          onClick={() => navigate('/events')}
          className="px-12 py-5 bg-gradient-to-r from-amber-400 to-amber-600 text-black rounded-full text-base font-black hover:brightness-110 transition-all shadow-2xl shadow-amber-500/20 transform hover:-translate-y-1 active:scale-95 w-full sm:w-auto"
        >
          Events
        </button>
        <button 
          onClick={() => navigate('/admin-auth')}
          className="px-12 py-5 glass-card text-white rounded-full text-base font-black hover:bg-white/10 transition-all w-full sm:w-auto border border-amber-500/20"
        >
          View History
        </button>
      </div>
    </div>
  );
};

export default HomePage;
