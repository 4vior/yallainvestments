import { useState, useMemo, useEffect, useRef } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { TrendingUp, DollarSign, Clock, Shield, BarChart3, Plus, Minus, Home as HomeIcon, Percent, ArrowLeft, Check, Sparkles, Calculator, AlertTriangle, PiggyBank, ChevronUp, Download } from 'lucide-react';

interface HomeProps {
  scrollToSection?: string | null;
  clearScrollTarget?: () => void;
}

const formatCurrency = (val: number) =>
  `₪${val.toLocaleString('he-IL', { maximumFractionDigits: 0 })}`;

const numInput = (val: number, setter: (v: number) => void, placeholder: string, suffix?: string) => (
  <div className="relative">
    <input
      type="number"
      value={val}
      onChange={(e) => {
        const value = e.target.value;
        if (value === '') {
          setter(0);
        } else {
          const num = parseFloat(value);
          if (!isNaN(num)) {
            setter(num);
          }
        }
      }}
      placeholder={placeholder}
      step="any"
      className={`w-full bg-white border-2 border-gray-200 rounded-xl py-3 text-gray-800 text-sm font-bold focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-left hover:border-gray-300 hover:shadow-sm ${suffix ? 'pl-14 pr-4' : 'px-4'}`}
    />
    {suffix && (
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold select-none pointer-events-none">
        {suffix}
      </span>
    )}
  </div>
);

function HeroSection() {
  return (
    <section className="relative py-6 md:py-10 lg:py-14 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-50/30 to-blue-50/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left side - Text */}
          <div className="text-center lg:text-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight mb-4 leading-[1.1] animate-fadeIn">
              הכסף שלכם
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent animate-gradient">
                מתחיל לעבוד
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-3 font-medium animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              כאן תקבלו את הכלים הכי פרקטיים להשקעה פאסיבית
            </p>
            <p className="text-base text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              משקיעים חכם. נשארים רגועים. גדלים לאורך זמן.
            </p>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              <a
                href="#calculator"
                className="group inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-gray-300 transform hover:-translate-y-1 active:translate-y-0"
              >
                <Calculator size={20} className="group-hover:scale-110 transition-transform duration-300" />
                להתחיל לחשב עכשיו
              </a>
              <a
                href="#compound-explainer"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-bold text-base px-8 py-4 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
              >
                <span>למה זה עובד?</span>
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
              </a>
            </div>
            
            <p className="text-sm text-gray-400 max-w-xl mx-auto lg:mx-0 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
              הדרך הפשוטה להתחיל להשקיע – גם בלי ניסיון קודם
            </p>
          </div>
          
{/* Right side - Image */}
<div className="relative z-10">
  <img 
    src="/logo2.jpeg" 
    alt="" 
    className="w-full max-w-5xl mx-auto relative z-20 animate-float"
  />
</div>
          
        </div>
      </div>
    </section>
  );
}


function CompoundCalculator() {
  const [initial, setInitial] = useState(30000);
  const [monthly, setMonthly] = useState(1500);
  const [returnRate, setReturnRate] = useState(7);
  const [years, setYears] = useState(15);
  const [showFees, setShowFees] = useState(false);
  const [managementFee, setManagementFee] = useState(0.5);

const projection = useMemo(() => {
  const data = [];

  const monthlyReturn = returnRate / 100 / 12;
  const monthlyFee = showFees ? managementFee / 100 / 12 : 0;

  let balance = initial;
  let totalContributions = initial;

  for (let y = 0; y <= years; y++) {
    data.push({
      year: y,
      totalContributions: Math.round(totalContributions),
      portfolioValue: Math.round(balance),
    });

    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyReturn);
      balance = balance + monthly;
      balance = balance * (1 - monthlyFee);
      totalContributions += monthly;
    }
  }

  return data;
}, [initial, monthly, returnRate, years, showFees, managementFee]);

  const finalValue = projection[projection.length - 1]?.portfolioValue ?? 0;
  const totalContribs = projection[projection.length - 1]?.totalContributions ?? 0;
  const compoundGain = finalValue - totalContribs;

  return (
    <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-500">
      <div className="p-6 md:p-8 border-b-2 border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3 mb-2">
              <span className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Percent size={22} className="text-emerald-600" />
              </span>
              סימולטור ריבית דריבית
            </h3>
            <p className="text-gray-500 text-sm md:text-base">כמה שווה ההשקעה שלכם בעוד כמה שנים?</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-emerald-100 transition-colors duration-300">
            <Sparkles size={14} className="animate-pulse" />
            חינם. בלי להירשם.
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              💰 הון התחלתי
            </label>
            {numInput(initial, setInitial, '30,000', '₪')}
            <p className="text-xs text-gray-400 mt-1.5">כמה יש לכם כרגע בצד?</p>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              📅 הפקדה חודשית
            </label>
            {numInput(monthly, setMonthly, '1,500', '₪')}
            <p className="text-xs text-gray-400 mt-1.5">סכום שאתם מפרישים כל חודש</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                📈 תשואה שנתית
              </label>
              {numInput(returnRate, setReturnRate, '7', '%')}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                ⏰ תקופה
              </label>
              {numInput(years, setYears, '15', 'שנים')}
            </div>
          </div>

          <button
            onClick={() => setShowFees(!showFees)}
            className={`flex items-center justify-between text-sm font-bold px-5 py-3.5 rounded-2xl w-full border-2 transition-all duration-300 transform active:scale-95 ${
              showFees 
                ? 'bg-red-50 text-red-700 border-red-300 shadow-sm' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-800 hover:bg-gray-50 hover:shadow-sm'
            }`}
          >
            <span className="flex items-center gap-2">
              {showFees ? <Minus size={18} /> : <Plus size={18} />}
              <span>הוספת דמי ניהול</span>
            </span>
            {showFees && <AlertTriangle size={18} className="text-red-500 animate-pulse" />}
          </button>

{showFees && (
  <div className="space-y-3 bg-red-50 p-5 rounded-2xl border-2 border-red-100 animate-fadeIn">
    <div>
      <label className="block text-xs font-bold text-red-700 mb-1.5">דמי ניהול שנתיים (%)</label>
      {numInput(managementFee, setManagementFee, '0.5', '%')}
    </div>
  </div>
)}
        </div>

        <div className="lg:col-span-2 bg-gray-50 rounded-2xl p-6 flex flex-col border-2 border-gray-100">
          <div className="flex items-center gap-6 mb-6 text-sm font-bold">
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 rounded-full bg-gray-400"></div>
              <span className="text-gray-600">הכסף שהפקדתם</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 rounded-full bg-emerald-500"></div>
              <span className="text-gray-600">שווי התיק העתידי</span>
            </div>
          </div>
          <div className="flex-1 min-h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projection} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis 
                  dataKey="year" 
                  tick={{ fill: '#6B7280', fontSize: 13, fontWeight: 600 }} 
                  axisLine={false} 
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#6B7280', fontSize: 13, fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₪${(v / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '2px solid #E5E7EB', 
                    borderRadius: 12, 
                    fontSize: '14px',
                    fontWeight: 600,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    padding: '12px'
                  }}
                  formatter={(value, name) => [
                    formatCurrency(Number(value)),
                    name === 'totalContributions' ? 'הפקדות' : 'שווי תיק',
                  ]}
                  labelFormatter={(label) => `אחרי ${label} שנים`}
                />
                <Area 
                  type="monotone" 
                  dataKey="totalContributions" 
                  stroke="#9CA3AF" 
                  strokeWidth={2.5} 
                  fill="transparent"
                  dot={false}
                  activeDot={{ r: 6, fill: '#9CA3AF' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="portfolioValue" 
                  stroke="#10B981" 
                  strokeWidth={3} 
                  fill="url(#colorGradient)"
                  dot={false}
                  activeDot={{ r: 6, fill: '#10B981' }}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 border-t-2 border-gray-100 bg-gray-50/50">
        <div className="p-6 text-center md:border-l-2 border-gray-100 hover:bg-gray-100/50 transition-colors duration-300">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">שווי התיק בעוד {years} שנים</p>
          <p className="text-3xl font-black text-gray-900">{formatCurrency(finalValue)}</p>
        </div>
        <div className="p-6 text-center md:border-l-2 border-gray-100 hover:bg-gray-100/50 transition-colors duration-300">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">סך כל ההפקדות שלכם</p>
          <p className="text-2xl font-bold text-gray-700">{formatCurrency(totalContribs)}</p>
        </div>
        <div className="p-6 text-center hover:bg-gray-100/50 transition-colors duration-300">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">הרווח שהשוק עשה לכם</p>
          <p className="text-3xl font-black text-emerald-600">{formatCurrency(compoundGain)}</p>
        </div>
      </div>
    </div>
  );
}

function RealEstateCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(1500000);
  const [monthlyRent, setMonthlyRent] = useState(4500);
  const [rentMonths, setRentMonths] = useState(11);

  const metrics = useMemo(() => {
    const annualIncome = monthlyRent * rentMonths;
    const yieldPercentage = propertyPrice > 0 ? (annualIncome / propertyPrice) * 100 : 0;
    return {
      annualIncome,
      yieldPercentage: yieldPercentage.toFixed(2),
    };
  }, [propertyPrice, monthlyRent, rentMonths]);

  return (
    <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-500">
      <div className="p-6 md:p-8 border-b-2 border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3 mb-2">
            <span className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center">
              <HomeIcon size={22} className="text-blue-600" />
            </span>
            מחשבון תשואה בנדל"ן
          </h3>
          <p className="text-gray-500 text-sm md:text-base">האם הנכס שבחרתם באמת משתלם?</p>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                🏠 מחיר הנכס
              </label>
              {numInput(propertyPrice, setPropertyPrice, '1,500,000', '₪')}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                💸 שכירות חודשית
              </label>
              {numInput(monthlyRent, setMonthlyRent, '4,500', '₪')}
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              📊 חודשים פעילים בשנה
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="12"
                value={rentMonths === 0 ? '' : rentMonths}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '') {
                    setRentMonths(0);
                  } else {
                    const num = Number(value);
                    if (!isNaN(num)) {
                      setRentMonths(Math.min(12, Math.max(1, num)));
                    }
                  }
                }}
                placeholder="11"
                className="w-full bg-white border-2 border-gray-200 rounded-xl pl-20 pr-4 py-3 text-gray-800 text-sm font-bold focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all duration-300 text-right hover:border-gray-300 hover:shadow-sm"
                style={{ direction: 'rtl' }}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold select-none pointer-events-none">
                חודשים
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              💡 מומלץ להשאיר על 11 חודשים פעילים, לטובת חודש חילופי דיירים, תקופות ללא שוכרים והוצאות תחזוקה שוטפות.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 text-center border-2 border-blue-100 hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
          <p className="text-sm font-bold text-gray-600 mb-4">תשואה שנתית צפויה</p>
          <div className="text-6xl font-black text-blue-600 mb-4">
            {metrics.yieldPercentage}%
          </div>
          <div className="space-y-3 text-right bg-white rounded-xl p-4">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-gray-500">הכנסה שנתית</span>
              <span className="text-gray-900">{formatCurrency(metrics.annualIncome)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <span className="text-gray-500">ממוצע חודשי</span>
              <span className="text-gray-700">{formatCurrency(metrics.annualIncome / 12)}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            * תשואת ברוטו לפני הוצאות
          </p>
        </div>
      </div>
    </div>
  );
}

function CompoundExplainer() {
  const yearlyData = useMemo(() => {
    const simpleData = [];
    const compoundData = [];
    const principal = 10000;
    const annualRate = 0.10;
    
    for (let year = 0; year <= 10; year++) {
      const simpleValue = principal + (principal * annualRate * year);
      simpleData.push({
        year,
        value: Math.round(simpleValue),
        interest: year === 0 ? 0 : Math.round(principal * annualRate),
      });
      
      const compoundValue = principal * Math.pow(1 + annualRate, year);
      compoundData.push({
        year,
        value: Math.round(compoundValue),
        interest: year === 0 ? 0 : Math.round(compoundValue - principal * Math.pow(1 + annualRate, year - 1)),
      });
    }
    
    return { simpleData, compoundData };
  }, []);

  return (
    <section id="compound-explainer" className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center mb-10">
          <div className="lg:col-span-3 text-center lg:text-right">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-gray-200 inline-block hover:bg-gray-50 transition-colors duration-300">
              למה זה עובד
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-3">
              הקסם של ריבית דריבית
            </h2>
            <p className="text-gray-500 text-lg">
              ההבדל הקטן שעושה הבדל ענק – ריבית פשוטה מול ריבית דריבית
            </p>
          </div>
          <div className="lg:col-span-2">
            <img 
              src="/compound.jpeg" 
              alt="ריבית דריבית אפקט כדור שלג" 
              className="w-full rounded-2xl shadow-md border border-gray-200 object-cover h-48 md:h-56 hover:shadow-lg transition-shadow duration-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200 hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg font-black text-gray-400">01</span>
              <div>
                <h3 className="text-xl font-extrabold text-gray-700">ריבית פשוטה</h3>
                <p className="text-sm text-gray-500">10% כל שנה רק על הסכום המקורי</p>
              </div>
            </div>
            
            <div className="bg-red-50 rounded-2xl p-3 mb-4">
              <p className="text-xs text-red-600 font-bold text-center">
                ❌ כל שנה: ₪1,000 רווח קבוע (10% × ₪10,000)
              </p>
            </div>

            <div className="space-y-2">
              {yearlyData.simpleData.map((item, idx) => (
                <div key={idx} className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${idx === 0 ? 'bg-gray-100' : 'bg-white border border-gray-100 hover:bg-gray-50'}`}>
                  <span className="text-sm font-bold text-gray-600">
                    {item.year === 0 ? 'התחלה' : `שנה ${item.year}`}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-gray-900">{formatCurrency(item.value)}</span>
                    {item.interest > 0 && (
                      <span className="text-xs text-gray-400">(+{formatCurrency(item.interest)})</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-xl text-center">
              <p className="text-sm font-bold text-gray-600">
                אחרי 10 שנים: <span className="text-gray-900">₪20,000</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                סה"כ רווח: ₪10,000
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-emerald-300 shadow-lg shadow-emerald-50 relative overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-3xl -mr-8 -mt-8"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-lg font-black text-emerald-600">02</span>
                <div>
                  <h3 className="text-xl font-extrabold text-emerald-700">ריבית דריבית</h3>
                  <p className="text-sm text-emerald-600">10% כל שנה על מה שהצטבר</p>
                </div>
              </div>
              
              <div className="bg-emerald-50 rounded-2xl p-3 mb-4">
                <p className="text-xs text-emerald-700 font-bold text-center">
                  ✅ כל שנה: הרווח גדל – 10% על כל הסכום שבתיק
                </p>
              </div>

              <div className="space-y-2">
                {yearlyData.compoundData.map((item, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${idx === 0 ? 'bg-emerald-50' : 'bg-white border border-emerald-50 hover:bg-emerald-50/50'}`}>
                    <span className="text-sm font-bold text-gray-600">
                      {item.year === 0 ? 'התחלה' : `שנה ${item.year}`}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-emerald-700">{formatCurrency(item.value)}</span>
                      {item.interest > 0 && (
                        <span className="text-xs text-emerald-500">(+{formatCurrency(item.interest)})</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-4 bg-emerald-50 rounded-xl text-center">
                <p className="text-sm font-bold text-emerald-700">
                  אחרי 10 שנים: <span className="text-emerald-900">₪25,937</span>
                </p>
                <p className="text-xs text-emerald-600 mt-1">
                  🎯 סה"כ רווח: ₪15,937 (59% יותר!)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:shadow-lg transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3 flex flex-col md:flex-row items-start gap-6">
              <div className="text-5xl md:text-6xl shrink-0 hover:scale-110 transition-transform duration-300 cursor-default">⛄</div>
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4">אפקט כדור השלג הפיננסי</h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  כמו כדור שלג שמתגלגל במורד הר – בהתחלה הוא קטן, אבל ככל שהוא ממשיך הוא אוסף עוד ועוד שלג וגדל בקצב מסחרר.
                </p>
                <p className="text-gray-600 leading-relaxed text-base mt-3">
                  זה בדיוק מה שקורה לכסף שלכם: הרווחים מצטרפים לקרן, ואז גם עליהם מתחילים להרוויח. 
                  ככל שעובר יותר זמן – הצמיחה מואצת.
                </p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <img 
                src="/snowball1.jpeg" 
                alt="אפקט כדור השלג הפיננסי" 
                className="w-full rounded-2xl shadow-lg border border-gray-200 object-cover h-56 md:h-64 hover:shadow-xl transition-shadow duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InvestmentComparison() {
  const channels = [
    {
      name: 'פיקדון בנקאי',
      return: 2,
      icon: '🏦',
      color: 'gray',
    },
    {
      name: 'אג"ח ממשלתי',
      return: 3,
      icon: '📜',
      color: 'blue',
    },
    {
      name: 'קרן כספית',
      return: 4,
      icon: '💰',
      color: 'purple',
    },
    {
      name: 'קרן סל S&P 500',
      return: 8,
      icon: '📊',
      color: 'emerald',
    },
  ];

  const calculateReturns = (monthlyInvestment: number, years: number, annualReturn: number) => {
    const monthlyRate = annualReturn / 100 / 12;
    const months = years * 12;
    let balance = 0;
    let totalInvested = 0;
    
    for (let m = 0; m < months; m++) {
      balance = balance * (1 + monthlyRate) + monthlyInvestment;
      totalInvested += monthlyInvestment;
    }
    
    return {
      finalAmount: Math.round(balance),
      totalInvested: Math.round(totalInvested),
      profit: Math.round(balance - totalInvested),
    };
  };

  const results = channels.map(channel => ({
    ...channel,
    ...calculateReturns(1000, 20, channel.return),
  }));

return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center mb-10">
          <div className="lg:col-span-3 text-center lg:text-right">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-full border border-gray-200 inline-block hover:bg-gray-100 transition-colors duration-300">
              השוואת אפיקים
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-3">
              אותו סכום, תוצאות שונות לחלוטין
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              השוואת אפיקי השקעה שונים – השפעת ריבית דריבית לאורך 20 שנה.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              הפקדה חודשית: ₪1,000 | תקופה: 20 שנה
            </p>
          </div>
          <div className="lg:col-span-2">
            <img 
              src="/snp.jpeg" 
              alt="השוואת אפיקי השקעה" 
              className="w-full rounded-2xl shadow-lg border border-gray-200 object-cover h-48 md:h-56 hover:shadow-xl transition-shadow duration-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden mb-6 hover:shadow-lg transition-shadow duration-500">
          <div className="grid grid-cols-4 bg-gray-50 p-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
            <div className="text-right">אפיק השקעה</div>
            <div className="text-center">תשואה שנתית</div>
            <div className="text-center">סכום סופי</div>
            <div className="text-center">מתוכו רווח</div>
          </div>
          
          {results.map((channel, idx) => (
            <div 
              key={idx} 
              className={`grid grid-cols-4 p-5 items-center border-t border-gray-100 transition-all duration-300 ${
                channel.color === 'emerald' ? 'bg-emerald-50/30 border-emerald-100' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3 text-right">
                <span className="text-2xl hover:scale-125 transition-transform duration-300 inline-block">{channel.icon}</span>
                <span className={`text-sm font-extrabold ${
                  channel.color === 'emerald' ? 'text-emerald-700' : 'text-gray-900'
                }`}>
                  {channel.name}
                </span>
              </div>
              <div className="text-center">
                <span className={`inline-flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-xl transition-all duration-300 ${
                  channel.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  {channel.return}%
                </span>
              </div>
              <div className="text-center">
                <span className={`text-base font-black ${
                  channel.color === 'emerald' ? 'text-emerald-600' : 'text-gray-900'
                }`}>
                  ~{formatCurrency(channel.finalAmount)}
                </span>
              </div>
              <div className="text-center">
                <span className={`text-sm font-bold ${
                  channel.color === 'emerald' ? 'text-emerald-600' : 'text-gray-600'
                }`}>
                  ~{formatCurrency(channel.profit)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-500">
          <div className="flex items-start gap-4">
            <span className="text-3xl hover:scale-110 transition-transform duration-300 inline-block">💡</span>
            <div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">המסקנה ברורה</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                הפרש של 2-3 אחוזי תשואה שנתית יכול להתרגם להבדל של פי 2 ויותר בסכום הסופי אחרי 20-30 שנה. 
                ההבדלים בין אפיקי ההשקעה מתעצמים דרמטית לאורך זמן בזכות אפקט הריבית דריבית. 
                לכן, הבחירה איפה לשים את הכסף היא קריטית – לא רק להיום, אלא במיוחד לעתיד.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ManagementFees() {
  const scenarios = [
    { fee: 0.03, label: 'קרן פאסיבית זולה' },
    { fee: 0.7, label: 'קרן מנוהלת ממוצעת' },
    { fee: 2.0, label: 'קרן עם דמי ניהול גבוהים' },
  ];

  const calculateImpact = (monthlyInvestment: number, years: number, annualReturn: number, fee: number) => {
    const monthlyRate = (annualReturn - fee) / 100 / 12;
    const months = years * 12;
    let balance = 0;
    
    for (let m = 0; m < months; m++) {
      balance = balance * (1 + monthlyRate) + monthlyInvestment;
    }
    
    return Math.round(balance);
  };

  const results = scenarios.map(scenario => ({
    ...scenario,
    finalAmount: calculateImpact(2000, 25, 7, scenario.fee),
  }));

  const bestResult = results[0].finalAmount;
  const worstResult = results[2].finalAmount;
  const difference = bestResult - worstResult;

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center mb-10">
  <div className="lg:col-span-3 text-center lg:text-right">
    <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-50 px-4 py-2 rounded-full border border-red-100 flex items-center gap-2 justify-center w-fit mx-auto lg:mx-0 hover:bg-red-100 transition-colors duration-300">
      <AlertTriangle size={14} className="animate-pulse" />
      שימו לב לזה
    </span>
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-3">
      דמי ניהול: הגנב השקט של החיסכון
    </h2>
    <p className="text-gray-500 text-lg leading-relaxed">
      אם הריבית דריבית היא החבר הכי טוב שלכם – דמי הניהול הם האויב הכי גדול.
    </p>
    <p className="text-sm text-gray-400 mt-2">
      הפקדה חודשית: ₪2,000 | תשואה שנתית: 7% | תקופה: 25 שנה
    </p>
  </div>
  <div className="lg:col-span-2">
    <img 
      src="/interests.jpeg" 
      alt="דמי ניהול - הגנב השקט של החיסכון" 
      className="w-full rounded-2xl shadow-lg border border-gray-200 object-cover h-48 md:h-56 hover:shadow-xl transition-shadow duration-500"
    />
  </div>
</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {results.map((scenario, idx) => (
            <div key={idx} className={`bg-white rounded-2xl p-6 border-2 transition-all duration-500 hover:-translate-y-1 ${
              idx === 0 ? 'border-emerald-200 shadow-emerald-50 hover:shadow-lg' : 
              idx === 2 ? 'border-red-200 hover:shadow-lg' : 'border-gray-200 hover:shadow-md'
            } ${idx === 0 ? 'shadow-lg' : ''}`}>
              <div className="text-center mb-4">
                <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-xl mb-2 transition-all duration-300 ${
                  idx === 0 ? 'bg-emerald-100 text-emerald-700' :
                  idx === 2 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {scenario.label}
                </span>
                <div className="text-3xl font-black text-gray-900 mt-2">
                  {scenario.fee}%
                </div>
                <p className="text-xs text-gray-500 mt-1">דמי ניהול שנתיים</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">סכום סופי אחרי 25 שנה</p>
                <p className={`text-2xl font-black ${
                  idx === 0 ? 'text-emerald-600' :
                  idx === 2 ? 'text-red-600' : 'text-gray-900'
                }`}>
                  {formatCurrency(scenario.finalAmount)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-red-100 mb-6 hover:shadow-md transition-shadow duration-500">
          <div className="flex items-start gap-4">
            <span className="text-3xl shrink-0 animate-bounce">⚠️</span>
            <div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-3">
                ההבדל בין הקרן הזולה ליקרה: {formatCurrency(difference)}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                מה שנראה כמו הבדל של פחות מ-2% בדמי ניהול, 
                מתרגם ל-<strong className="text-red-600">{formatCurrency(difference)}</strong> פחות בחיסכון שלכם. 
                זה הכוח של ריבית דריבית – רק שהפעם היא עובדת <strong>נגדכם</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-white rounded-2xl p-6 border border-emerald-200 hover:shadow-md transition-shadow duration-500">
          <div className="flex items-start gap-4">
            <PiggyBank size={24} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">מה אפשר לעשות?</h3>
              <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
                <p className="hover:text-gray-900 transition-colors duration-300">✅ <strong>בדקו כמה אתם משלמים</strong> – דמי ניהול מופיעים בדוחות השנתיים, אל תתעלמו מהם.</p>
                <p className="hover:text-gray-900 transition-colors duration-300">✅ <strong>השוו בין קרנות</strong> – קרנות פאסיביות (מחקות מדד) גובות לרוב 0.03%-0.2% בלבד.</p>
                <p className="hover:text-gray-900 transition-colors duration-300">✅ <strong>תתמקחו</strong> – גם בקרנות מנוהלות אפשר לבקש הפחתה, במיוחד על סכומים גבוהים.</p>
                <p className="hover:text-gray-900 transition-colors duration-300">✅ <strong>הזמן הוא קריטי</strong> – ככל שמתחילים מוקדם יותר עם דמי ניהול נמוכים, החיסכון גדל משמעותית.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home({ scrollToSection, clearScrollTarget }: HomeProps) {
  const compoundRef = useRef<HTMLDivElement>(null);
  const realestateRef = useRef<HTMLDivElement>(null);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (scrollToSection) {
      if (scrollToSection === 'compound-calc' && compoundRef.current) {
        compoundRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (scrollToSection === 'realestate-calc' && realestateRef.current) {
        realestateRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      if (clearScrollTarget) clearScrollTarget();
    }
}, [scrollToSection, clearScrollTarget]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

   return (
    <>
      <div className="min-h-screen bg-white">
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out both;
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
          .animate-pulse {
            animation: pulse 2s ease-in-out infinite;
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
        <HeroSection />
        
        <section className="py-10 md:py-14 bg-gray-50/50">
          <div className="max-w-6xl mx-auto px-4 space-y-8">
            <div ref={compoundRef} id="calculator">
              <CompoundCalculator />
            </div>
            
            <div ref={realestateRef}>
              <RealEstateCalculator />
            </div>
          </div>
        </section>

        <CompoundExplainer />
        <InvestmentComparison />
        <ManagementFees />

        {/* Community Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-emerald-50/30">
          <div className="max-w-4xl mx-auto px-4 text-center">
            
            <div className="mb-8">
              <img 
                src="/logo.jpeg" 
                alt="יאללה השקעות" 
                className="h-44 md:h-56 w-auto mx-auto hover:scale-105 transition-transform duration-500"
              />
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
              עוד לא הצטרפת לקהילה של יאללה <span className="text-emerald-600">השקעות</span>?
            </h2>

            <div className="flex items-center justify-center gap-4 mb-10">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-bold px-6 py-4 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1 active:translate-y-0"
              >
                <svg className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>פייסבוק</span>
              </a>
            </div>

<div className="mb-10">
  <div className="max-w-xl mx-auto text-center mb-5">
    <p className="text-gray-500 text-sm leading-relaxed">
      האתר נולד מתוך אמונה שידע פיננסי בסיסי צריך להיות נגיש לכולם. 
      משקיע חכם מתחיל בצעד אחד פשוט, והאתר הזה נותן את הצעד הראשון הזה.
    </p>
    <p className="text-gray-500 text-sm leading-relaxed mt-2">
      האתר חינמי לחלוטין. אם הוא עוזר לכם להתנהל טוב יותר עם הכסף שלכם – זה הניצחון של כולנו.
    </p>
    <p className="text-gray-400 text-sm mt-2">
      אם בא לכם לתמוך בפרויקט – 
    </p>
  </div>
  
  <a 
    href="#" 
    target="_blank" 
    rel="noopener noreferrer"
    className="group inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-bold px-6 py-3.5 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
  >
    <span className="text-xl">☕</span>
    <span>תזמינו אותי לקפה</span>
  </a>
</div>

            <div className="text-center mb-8">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-gray-200 inline-block hover:bg-gray-50 transition-colors duration-300">
                מה אומרים עלינו
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {'★'.repeat(5)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  "האתר הכי שימושי שנתקלתי בו! מחשבון הריבית דריבית פשוט מעולה."
                </p>
                <p className="text-sm font-bold text-gray-900">דניאל ל.</p>
                <p className="text-xs text-gray-400">משקיע מתחיל</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {'★'.repeat(5)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  "ההשוואה בין אפיקי ההשקעה פתחה לי את העיניים. התחלתי להשקיע בזכות האתר."
                </p>
                <p className="text-sm font-bold text-gray-900">טלי ק.</p>
                <p className="text-xs text-gray-400">עצמאית</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {'★'.repeat(5)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  "הבנתי כמה דמי ניהול גונבים לי מהחיסכון. התקשרתי לסוכן והורדתי דמי ניהול בחצי!"
                </p>
                <p className="text-sm font-bold text-gray-900">אבי מ.</p>
                <p className="text-xs text-gray-400">שכיר בהייטק</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-2xl shadow-lg transition-all"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  );
}