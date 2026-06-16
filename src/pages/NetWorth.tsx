import { useState, useMemo } from 'react';
import {
  Wallet, TrendingUp, Home, Car, Shield, Landmark, CreditCard, FileText,
  Plus, Trash2, ArrowUp, ArrowDown, Building2, GraduationCap, PiggyBank,
  Banknote, Wrench, ChevronUp, Calculator, Edit3, ArrowUpDown, Clock,
  Sparkles, Target, BarChart3, Zap,
} from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  value: number;
  category: string;
  customCategory?: string;
  createdAt: Date;
}

interface Liability {
  id: string;
  name: string;
  value: number;
  category: string;
  customCategory?: string;
  createdAt: Date;
}

const formatCurrency = (val: number) => `₪${val.toLocaleString('he-IL', { maximumFractionDigits: 0 })}`;

const assetCategories = [
  { value: 'מזומנים', label: 'מזומנים ועו"ש', icon: Wallet, color: 'emerald' },
  { value: 'חיסכון', label: 'חיסכון בנקאי', icon: PiggyBank, color: 'blue' },
  { value: 'תיק השקעות', label: 'תיק השקעות', icon: TrendingUp, color: 'purple' },
  { value: 'פנסיה', label: 'קרן פנסיה', icon: Shield, color: 'indigo' },
  { value: 'השתלמות', label: 'קרן השתלמות', icon: Landmark, color: 'teal' },
  { value: 'נדל"ן', label: 'נדל"ן', icon: Home, color: 'orange' },
  { value: 'רכב', label: 'רכב', icon: Car, color: 'yellow' },
  { value: 'עסק', label: 'עסק', icon: Building2, color: 'pink' },
  { value: 'קריפטו', label: 'קריפטו', icon: Banknote, color: 'amber' },
  { value: 'אחר', label: 'אחר - קטגוריה חופשית', icon: Edit3, color: 'gray' },
];

const liabilityCategories = [
  { value: 'משכנתא', label: 'משכנתא', icon: Home, color: 'red' },
  { value: 'הלוואת רכב', label: 'הלוואת רכב', icon: Car, color: 'orange' },
  { value: 'אשראי', label: 'אשראי', icon: CreditCard, color: 'rose' },
  { value: 'הלוואה צרכנית', label: 'הלוואה צרכנית', icon: FileText, color: 'pink' },
  { value: 'הלוואה עסקית', label: 'הלוואה עסקית', icon: Building2, color: 'purple' },
  { value: 'אוברדראפט', label: 'אוברדראפט', icon: TrendingUp, color: 'red' },
  { value: 'אחר', label: 'אחר - קטגוריה חופשית', icon: Edit3, color: 'gray' },
];

const colorMap: Record<string, { bg: string; text: string; border: string; light: string }> = {
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', light: 'bg-emerald-50' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', light: 'bg-blue-50' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', light: 'bg-purple-50' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-200', light: 'bg-indigo-50' },
  teal: { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-200', light: 'bg-teal-50' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200', light: 'bg-orange-50' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', light: 'bg-yellow-50' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-200', light: 'bg-pink-50' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', light: 'bg-amber-50' },
  gray: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200', light: 'bg-gray-50' },
  red: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', light: 'bg-red-50' },
  rose: { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-200', light: 'bg-rose-50' },
};

function getCategoryInfo(category: string, type: 'asset' | 'liability') {
  const categories = type === 'asset' ? assetCategories : liabilityCategories;
  return categories.find(c => c.value === category);
}

// Hero Image Component - Loads instantly with the page
function HeroImage() {
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden mb-8 bg-gradient-to-r from-emerald-700 to-emerald-900">
      {/* Main image - full size with object-cover to fill the frame */}
      <img 
        src="/networth.jpeg" 
        alt="הון נטו - מעקב פיננסי" 
        className="w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          // Show fallback
          const parent = target.parentElement;
          if (parent) {
            const fallback = document.createElement('div');
            fallback.className = 'text-white text-center p-8 w-full h-full flex items-center justify-center flex-col';
            fallback.innerHTML = `
              <div class="text-6xl mb-4">📊</div>
              <h2 class="text-3xl font-bold">הון נטו</h2>
              <p class="text-white/70 mt-2">ניהול פיננסי חכם</p>
            `;
            parent.appendChild(fallback);
          }
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-emerald-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-emerald-200 border border-emerald-400/30">
              📊 מעקב פיננסי
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">
            הון נטו
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-xl drop-shadow-lg">
            כל הנכסים וההתחייבויות שלכם במקום אחד. תמונה מלאה וברורה של המצב הפיננסי שלכם.
          </p>
        </div>
      </div>
    </div>
  );
}

function AddItemForm({ type, onAdd }: { type: 'asset' | 'liability'; onAdd: (item: Asset | Liability) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState(type === 'asset' ? 'מזומנים' : 'משכנתא');
  const [customCategory, setCustomCategory] = useState('');

  const categories = type === 'asset' ? assetCategories : liabilityCategories;
  const isAsset = type === 'asset';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !value) return;
    if (category === 'אחר' && !customCategory) return;
    
    onAdd({
      id: crypto.randomUUID(),
      name,
      value: Number(value),
      category: category === 'אחר' ? customCategory : category,
      customCategory: category === 'אחר' ? customCategory : undefined,
      createdAt: new Date(),
    });
    setName(''); setValue(''); setCategory(type === 'asset' ? 'מזומנים' : 'משכנתא'); setCustomCategory('');
    setOpen(false);
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 font-bold px-5 py-3 rounded-2xl border-2 transition-all duration-200 ${
          isAsset
            ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200 hover:border-emerald-300'
            : 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200 hover:border-red-300'
        } hover:shadow-md`}
      >
        {open ? <ChevronUp size={18} /> : <Plus size={18} />}
        {isAsset ? 'הוסף נכס' : 'הוסף התחייבות'}
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="mt-3 bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">שם הפריט</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder={isAsset ? 'למשל: חשבון עו"ש ראשי' : 'למשל: משכנתא דירה'} 
                className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm font-bold focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all hover:border-gray-300 text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">סכום (₪)</label>
              <input 
                type="number" 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                placeholder="0" 
                className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm font-bold focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all hover:border-gray-300 text-right"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">קטגוריה</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm font-bold focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all hover:border-gray-300 text-right"
              >
                {categories.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            
            {category === 'אחר' && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">שם הקטגוריה החדשה</label>
                <input 
                  type="text" 
                  value={customCategory} 
                  onChange={(e) => setCustomCategory(e.target.value)} 
                  placeholder="הקלד שם לקטגוריה..." 
                  className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm font-bold focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all hover:border-gray-300 text-right"
                />
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            className={`mt-5 font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg ${
              isAsset 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {isAsset ? '➕ הוסף נכס' : '➕ הוסף התחייבות'}
          </button>
        </form>
      )}
    </div>
  );
}

function NetWorthCard({ assets, liabilities }: { assets: Asset[]; liabilities: Liability[] }) {
  const totalAssets = assets.reduce((s, a) => s + a.value, 0);
  const totalLiabilities = liabilities.reduce((s, l) => s + l.value, 0);
  const netWorth = totalAssets - totalLiabilities;

  // Financial health score (simplified)
  const healthScore = useMemo(() => {
    if (totalAssets === 0 && totalLiabilities === 0) return 0;
    if (totalAssets === 0) return 0;
    const ratio = totalAssets / (totalLiabilities + 1);
    if (ratio > 3) return 95;
    if (ratio > 2) return 80;
    if (ratio > 1.5) return 65;
    if (ratio > 1) return 50;
    return 30;
  }, [totalAssets, totalLiabilities]);

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl p-6 md:p-8 border-2 border-gray-200 shadow-lg mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -ml-20 -mb-20"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between flex-wrap gap-6 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <p className="text-sm font-bold text-gray-500 flex items-center gap-2">
                <Calculator size={16} className="text-gray-400" />
                הון נטו
              </p>
              <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">Net Worth</span>
              {healthScore > 0 && (
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                  healthScore >= 80 ? 'bg-emerald-100 text-emerald-700' :
                  healthScore >= 50 ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  <Target size={12} className="inline ml-1" />
                  {healthScore}% בריאות פיננסית
                </span>
              )}
            </div>
            <p className={`text-5xl md:text-6xl font-black ${netWorth >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
              {formatCurrency(netWorth)}
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-white rounded-2xl p-4 border-2 border-emerald-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <ArrowUp size={16} className="text-emerald-600" />
                </div>
                <span className="text-xs font-bold text-emerald-600">נכסים</span>
              </div>
              <p className="text-xl font-extrabold text-emerald-700">{formatCurrency(totalAssets)}</p>
            </div>
            
            <div className="bg-white rounded-2xl p-4 border-2 border-red-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center">
                  <ArrowDown size={16} className="text-red-600" />
                </div>
                <span className="text-xs font-bold text-red-600">התחייבויות</span>
              </div>
              <p className="text-xl font-extrabold text-red-700">{formatCurrency(totalLiabilities)}</p>
            </div>
          </div>
        </div>
        
        {(totalAssets + totalLiabilities) > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="h-6 rounded-full overflow-hidden bg-gray-100 flex shadow-inner">
              <div 
                className="bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-r-full transition-all duration-700 ease-out" 
                style={{ width: `${Math.max((totalAssets / (totalAssets + totalLiabilities)) * 100, 1)}%` }} 
              />
              <div 
                className="bg-gradient-to-r from-red-300 to-red-400 rounded-l-full transition-all duration-700 ease-out" 
                style={{ width: `${Math.max((totalLiabilities / (totalAssets + totalLiabilities)) * 100, 1)}%` }} 
              />
            </div>
            <div className="flex justify-between mt-3 text-sm font-bold">
              <span className="text-emerald-600">נכסים {((totalAssets / (totalAssets + totalLiabilities)) * 100).toFixed(1)}%</span>
              <span className="text-red-500">התחייבויות {((totalLiabilities / (totalAssets + totalLiabilities)) * 100).toFixed(1)}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ItemsList({ items, onRemove, type }: { items: Asset[] | Liability[]; onRemove: (id: string) => void; type: 'asset' | 'liability' }) {
  const [sortBy, setSortBy] = useState<'default' | 'highToLow' | 'lowToHigh'>('default');
  
  const total = items.reduce((s, a) => s + a.value, 0);
  const isAsset = type === 'asset';

  const sortedItems = useMemo(() => {
    const sorted = [...items];
    if (sortBy === 'highToLow') {
      sorted.sort((a, b) => b.value - a.value);
    } else if (sortBy === 'lowToHigh') {
      sorted.sort((a, b) => a.value - b.value);
    }
    return sorted;
  }, [items, sortBy]);

  const categoryTotals = useMemo(() => {
    return sortedItems.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.value;
      return acc;
    }, {} as Record<string, number>);
  }, [sortedItems]);

  const lastUpdated = items.length > 0 
    ? new Date(Math.max(...items.map(i => i.createdAt.getTime())))
    : null;

  // Count items without values for quick insight
  const hasItems = items.length > 0;

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-5 border-b-2 border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
            {isAsset ? (
              <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                <ArrowUp size={18} className="text-emerald-600" />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
                <ArrowDown size={18} className="text-red-600" />
              </div>
            )}
            {isAsset ? 'נכסים' : 'התחייבויות'}
            {hasItems && (
              <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">
                {items.length} פריטים
              </span>
            )}
          </h2>
          
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setSortBy('default')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    sortBy === 'default' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Clock size={12} className="inline ml-1" />
                  רגיל
                </button>
                <button
                  onClick={() => setSortBy('highToLow')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    sortBy === 'highToLow' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <ArrowUpDown size={12} className="inline ml-1" />
                  גבוה לנמוך
                </button>
                <button
                  onClick={() => setSortBy('lowToHigh')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    sortBy === 'lowToHigh' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <ArrowUpDown size={12} className="inline ml-1" />
                  נמוך לגבוה
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`text-lg font-extrabold ${isAsset ? 'text-emerald-600' : 'text-red-600'}`}>
            {formatCurrency(total)}
          </span>
          {lastUpdated && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock size={12} />
              עודכן לאחרונה: {lastUpdated.toLocaleDateString('he-IL')}
            </span>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="p-12 text-center">
          <div className="text-4xl mb-4">{isAsset ? '💰' : '📋'}</div>
          <p className="text-gray-400 font-medium">
            אין {isAsset ? 'נכסים' : 'התחייבויות'} עדיין
          </p>
          <p className="text-gray-300 text-sm mt-1">
            לחצו על הכפתור למעלה כדי להוסיף
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {Object.entries(categoryTotals).map(([category, catTotal]) => {
            const categoryInfo = getCategoryInfo(category, type);
            const colors = categoryInfo?.color ? colorMap[categoryInfo.color] : colorMap.gray;
            const Icon = categoryInfo?.icon ?? Banknote;
            
            return (
              <div key={category}>
                <div className={`px-5 py-3 ${colors.light} border-b border-gray-100`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl ${colors.bg} flex items-center justify-center`}>
                        <Icon size={16} className={colors.text} />
                      </div>
                      <div>
                        <span className="text-sm font-extrabold text-gray-800">{category}</span>
                        {categoryInfo?.value === 'אחר' && (
                          <span className="text-xs text-gray-400 mr-2">(מותאם אישית)</span>
                        )}
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${isAsset ? 'text-emerald-600' : 'text-red-600'}`}>
                      {formatCurrency(catTotal)}
                    </span>
                  </div>
                </div>
                
                {sortedItems
                  .filter(item => item.category === category)
                  .map((item) => {
                    const Icon = categoryInfo?.icon ?? Banknote;
                    const colors = categoryInfo?.color ? colorMap[categoryInfo.color] : colorMap.gray;
                    const weight = total > 0 ? (item.value / total) * 100 : 0;
                    
                    return (
                      <div 
                        key={item.id} 
                        className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-all duration-200 group relative"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl ${colors.light} flex items-center justify-center transition-transform group-hover:scale-110`}>
                            <Icon size={18} className={colors.text} />
                          </div>
                          <div>
                            <p className="text-gray-900 text-sm font-bold">{item.name}</p>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1 rounded-full bg-gray-100 overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${isAsset ? 'bg-emerald-400' : 'bg-red-400'}`}
                                  style={{ width: `${Math.min(weight, 100)}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-400">{weight.toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="font-extrabold text-gray-900">{formatCurrency(item.value)}</p>
                          <button 
                            onClick={() => onRemove(item.id)} 
                            className="p-2 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function NetWorth() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [liabilities, setLiabilities] = useState<Liability[]>([]);

  const addAsset = (item: Asset) => setAssets(prev => [...prev, item]);
  const addLiability = (item: Liability) => setLiabilities(prev => [...prev, item]);
  const removeAsset = (id: string) => setAssets(prev => prev.filter(a => a.id !== id));
  const removeLiability = (id: string) => setLiabilities(prev => prev.filter(l => l.id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        
        {/* Hero Image */}
        <HeroImage />

        <NetWorthCard assets={assets} liabilities={liabilities} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <AddItemForm type="asset" onAdd={addAsset as (item: Asset | Liability) => void} />
            <ItemsList items={assets} onRemove={removeAsset} type="asset" />
          </div>
          <div>
            <AddItemForm type="liability" onAdd={addLiability as (item: Asset | Liability) => void} />
            <ItemsList items={liabilities} onRemove={removeLiability} type="liability" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}