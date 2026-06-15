import { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, ShieldAlert, ChevronDown, Percent, Home as HomeIcon } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string, section: string | null) => void;
}

export default function Navbar({ activePage, onNavigate }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home', null)} 
            className="flex items-center cursor-pointer group"
          >
            <img 
              src="/logo.jpeg" 
              alt="יאללה השקעות" 
              className="h-30 md:h-32 w-auto rounded-lg object-contain transition-transform group-hover:scale-105"
            />
          </button>

          {/* Navigation Items */}
          <div className="flex items-center gap-1.5">
            
            {/* מצב חשבון */}
            <button
              onClick={() => onNavigate('home', null)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all duration-150 cursor-pointer ${
                activePage === 'home' && !isDropdownOpen
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <TrendingUp size={14} />
              <span className="hidden sm:inline">מצב חשבון</span>
            </button>

            {/* השקעות דיבידנד */}
            <button
              onClick={() => onNavigate('dividends', null)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all duration-150 cursor-pointer ${
                activePage === 'dividends'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <DollarSign size={14} />
              <span className="hidden sm:inline">דיבידנדים</span>
            </button>

            {/* הון נטו */}
            <button
              onClick={() => onNavigate('networth', null)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all duration-150 cursor-pointer ${
                activePage === 'networth'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Calculator size={14} />
              <span className="hidden sm:inline">הון נטו</span>
            </button>

            {/* ניהול נדל"ן */}
            <button
              onClick={() => onNavigate('realestate', null)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all duration-150 cursor-pointer ${
                activePage === 'realestate'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <HomeIcon size={14} />
              <span className="hidden sm:inline">הנדל"ן שלי</span>
            </button>

            {/* תפריט נפתח: מחשבונים */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all duration-150 cursor-pointer text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                <ChevronDown size={12} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                <span className="hidden sm:inline">מחשבונים</span>
                <Calculator size={14} />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-0 w-52 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 animate-fade-in text-right">
                  <button
                    onClick={() => {
                      onNavigate('home', 'compound-calc');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 text-right transition-colors"
                  >
                    <Percent size={14} className="text-gray-400" />
                    <span>מחשבון ריבית דריבית</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('home', 'realestate-calc');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 text-right transition-colors"
                  >
                    <HomeIcon size={14} className="text-gray-400" />
                    <span>מחשבון תשואת נדל"ן</span>
                  </button>
                </div>
              )}
            </div>

            {/* מחשבון פנסיה */}
            <button
              onClick={() => onNavigate('pension', null)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all duration-150 cursor-pointer ${
                activePage === 'pension'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <ShieldAlert size={14} />
              <span className="hidden sm:inline">פנסיה</span>
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 text-xs font-bold">
              י
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}