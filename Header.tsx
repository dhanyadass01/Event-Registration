
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHistory = location.pathname === '/history';
  const isSuccess = location.pathname === '/success';

  // Show register button on history and success pages (on the right)
  const showRegisterOnRight = isHistory || isSuccess;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/80 border-b border-amber-900/30">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-6xl">
        <div 
          className="flex items-center cursor-pointer group" 
          onClick={() => navigate('/')}
        >
          <img
            src="https://www.sankara.ac.in/science-and-commerce/wp-content/themes/sankara/images/main-logo/College%20Name%202023%20Option%203-01.png"
            alt="Sankara College of Science and Commerce"
            className="h-12 w-auto object-contain mix-blend-darken"
          />
        </div>

        <div className="flex items-center gap-6">
          {showRegisterOnRight && (
            <button 
              onClick={() => navigate('/events')}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-600 text-black rounded-full text-xs font-black tracking-widest hover:brightness-110 transition-all shadow-lg shadow-amber-500/10 active:scale-95"
            >
              REGISTER
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
