import { useState } from 'react';
import { 
  Calculator, DollarSign, TrendingUp, ShieldAlert, ChevronDown, Percent, 
  Home, Building2, Wallet, Sparkles, BarChart3, Home as HomeIcon,
  LayoutDashboard, PiggyBank, Landmark, BookOpen
} from 'lucide-react';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string, section: string | null) => void;
}

export default function Navbar({ activePage, onNavigate }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home', null)} 
            className="flex items-center cursor-pointer group"
          >
            <img 
              src="/logo.jpeg" 
              alt="יאללה השקעות" 
              className="h-32 md:h-36 w-auto rounded-lg object-contain transition-transform group-hover:scale-105"
            />
          </button>

          {/* Navigation Items */}
          <div className="flex items-center gap-2">
            
            {/* דף הבית */}
            <button
              onClick={() => onNavigate('home', null)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[15px] font-bold transition-all duration-200 cursor-pointer ${
                activePage === 'home' && !isDropdownOpen
                  ? 'bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-700 border-2 border-emerald-200 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
              }`}
            >
              <LayoutDashboard size={18} className={activePage === 'home' ? 'text-emerald-600' : 'text-gray-400'} />
              <span>דף הבית</span>
            </button>

            {/* ללמוד השקעות */}
            <button
              onClick={() => onNavigate('learn', null)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[15px] font-bold transition-all duration-200 cursor-pointer ${
                activePage === 'learn'
                  ? 'bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-700 border-2 border-emerald-200 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
              }`}
            >
              <BookOpen size={18} className={activePage === 'learn' ? 'text-emerald-600' : 'text-gray-400'} />
              <span>ללמוד השקעות</span>
            </button>

            {/* השקעות דיבידנד */}
            <button
              onClick={() => onNavigate('dividends', null)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[15px] font-bold transition-all duration-200 cursor-pointer ${
                activePage === 'dividends'
                  ? 'bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-700 border-2 border-emerald-200 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
              }`}
            >
              <Sparkles size={18} className={activePage === 'dividends' ? 'text-emerald-600' : 'text-gray-400'} />
              <span>דיבידנדים</span>
            </button>

            {/* הון נטו */}
            <button
              onClick={() => onNavigate('networth', null)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[15px] font-bold transition-all duration-200 cursor-pointer ${
                activePage === 'networth'
                  ? 'bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-700 border-2 border-emerald-200 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
              }`}
            >
              <Wallet size={18} className={activePage === 'networth' ? 'text-emerald-600' : 'text-gray-400'} />
              <span>הון נטו</span>
            </button>

            {/* ניהול נדל"ן */}
            <button
              onClick={() => onNavigate('realestate', null)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[15px] font-bold transition-all duration-200 cursor-pointer ${
                activePage === 'realestate'
                  ? 'bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-700 border-2 border-emerald-200 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
              }`}
            >
              <Building2 size={18} className={activePage === 'realestate' ? 'text-emerald-600' : 'text-gray-400'} />
              <span>הנדל"ן שלי</span>
            </button>

            {/* תפריט נפתח: מחשבונים */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[15px] font-bold transition-all duration-200 cursor-pointer ${
                  isDropdownOpen
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
                }`}
              >
                <Calculator size={18} className="text-gray-400" />
                <span>מחשבונים</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-1 w-64 bg-white border-2 border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-fadeIn text-right overflow-hidden">
                  <button
                    onClick={() => {
                      onNavigate('home', 'compound-calc');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-5 py-3 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                        <Percent size={16} className="text-emerald-600" />
                      </div>
                      <span className="font-bold">מחשבון ריבית דריבית</span>
                    </div>
                    <span className="text-xs text-gray-400">חשבון</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('home', 'realestate-calc');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-5 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <HomeIcon size={16} className="text-blue-600" />
                      </div>
                      <span className="font-bold">מחשבון תשואת נדל"ן</span>
                    </div>
                    <span className="text-xs text-gray-400">נדל"ן</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('pension', null);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-5 py-3 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                        <Landmark size={16} className="text-purple-600" />
                      </div>
                      <span className="font-bold">מחשבון פנסיה</span>
                    </div>
                    <span className="text-xs text-gray-400">פנסיה</span>
                  </button>
                </div>
              )}
            </div>

            {/* מחשבון פנסיה - כפתור עצמאי (אופציונלי, אפשר להסיר כי יש כבר בתפריט) */}
            <button
              onClick={() => onNavigate('pension', null)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[15px] font-bold transition-all duration-200 cursor-pointer ${
                activePage === 'pension'
                  ? 'bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-700 border-2 border-emerald-200 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
              }`}
            >
              <Landmark size={18} className={activePage === 'pension' ? 'text-emerald-600' : 'text-gray-400'} />
              <span>פנסיה</span>
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
              י
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.15s ease-out;
        }
      `}</style>
    </nav>
  );
}