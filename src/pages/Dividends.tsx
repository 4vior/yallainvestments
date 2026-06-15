import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell,
} from 'recharts';
import { Plus, Trash2, DollarSign, TrendingUp, Calendar, Percent, ChevronUp, Sparkles, ArrowUp, ArrowDown } from 'lucide-react';

interface Holding {
  id: string;
  name: string;
  ticker: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  annualDividend: number;
  sector: string;
}

const formatCurrency = (val: number) => `₪${val.toLocaleString('he-IL', { maximumFractionDigits: 0 })}`;
const formatPercent = (val: number) => `${val.toFixed(1)}%`;

const COLORS = ['#3B82F6', '#8B5CF6', '#F59E0B', '#10B981', '#EF4444', '#EC4899', '#06B6D4', '#F97316', '#84CC16', '#6366F1'];

function AddHoldingForm({ onAdd }: { onAdd: (h: Holding) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [shares, setShares] = useState('');
  const [avgPrice, setAvgPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [annualDividend, setAnnualDividend] = useState('');
  const [sector, setSector] = useState('מניות');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !ticker || !shares || !currentPrice) return;
    onAdd({
      id: crypto.randomUUID(),
      name,
      ticker: ticker.toUpperCase(),
      shares: Number(shares),
      avgPrice: Number(avgPrice) || Number(currentPrice),
      currentPrice: Number(currentPrice),
      annualDividend: Number(annualDividend) || 0,
      sector,
    });
    setName(''); setTicker(''); setShares(''); setAvgPrice(''); setCurrentPrice(''); setAnnualDividend(''); setSector('מניות');
    setOpen(false);
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold px-5 py-3 rounded-2xl border-2 border-emerald-200 hover:border-emerald-300 transition-all hover:shadow-md"
      >
        {open ? <ChevronUp size={18} /> : <Plus size={18} />}
        {open ? 'סגור טופס' : 'הוסף נכס דיבידנד'}
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="mt-4 bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-6 animate-fadeIn">
          <h3 className="text-lg font-extrabold text-gray-900 mb-5 flex items-center gap-2">
            <Sparkles size={18} className="text-emerald-500" />
            הוספת נכס חדש
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">שם הנכס</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="למשל: חברת חשמל" className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm font-bold focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all hover:border-gray-300 text-right" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">סימול</label>
              <input type="text" value={ticker} onChange={(e) => setTicker(e.target.value)} placeholder="למשל: ELTR" className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm font-bold focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all hover:border-gray-300 text-right" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">סקטור</label>
              <select value={sector} onChange={(e) => setSector(e.target.value)} className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm font-bold focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all hover:border-gray-300 text-right">
                <option value="מניות">מניות</option>
                <option value="תעודות סל">תעודות סל</option>
                <option value="נדלן">נדל"ן</option>
                <option value="טכנולוגיה">טכנולוגיה</option>
                <option value="פיננסים">פיננסים</option>
                <option value="אנרגיה">אנרגיה</option>
                <option value="בריאות">בריאות</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">מספר יחידות</label>
              <input type="number" value={shares} onChange={(e) => setShares(e.target.value)} placeholder="0" className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm font-bold focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all hover:border-gray-300 text-right" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">מחיר רכישה ממוצע (₪)</label>
              <input type="number" value={avgPrice} onChange={(e) => setAvgPrice(e.target.value)} placeholder="0" className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm font-bold focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all hover:border-gray-300 text-right" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">מחיר נוכחי (₪)</label>
              <input type="number" value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} placeholder="0" className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm font-bold focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all hover:border-gray-300 text-right" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-bold text-gray-700 mb-2">דיבידנד שנתי ליחידה (₪)</label>
              <input type="number" value={annualDividend} onChange={(e) => setAnnualDividend(e.target.value)} placeholder="0" className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm font-bold focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all hover:border-gray-300 text-right" />
            </div>
          </div>
          <button type="submit" className="mt-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition-all hover:shadow-lg">
            ➕ הוסף לתיק
          </button>
        </form>
      )}
    </div>
  );
}

function MetricsCards({ holdings }: { holdings: Holding[] }) {
  const totalValue = holdings.reduce((s, h) => s + h.currentPrice * h.shares, 0);
  const annualDividend = holdings.reduce((s, h) => s + h.annualDividend * h.shares, 0);
  const avgYield = totalValue > 0 ? (annualDividend / totalValue) * 100 : 0;
  const monthlyAvg = annualDividend / 12;

  const metrics = [
    { label: 'שווי תיק', value: formatCurrency(totalValue), icon: DollarSign, color: 'blue', bg: 'bg-blue-50', textColor: 'text-blue-700' },
    { label: 'הכנסה שנתית מדיבידנדים', value: formatCurrency(annualDividend), icon: TrendingUp, color: 'emerald', bg: 'bg-emerald-50', textColor: 'text-emerald-700' },
    { label: 'תשואת דיבידנד ממוצעת', value: formatPercent(avgYield), icon: Percent, color: 'purple', bg: 'bg-purple-50', textColor: 'text-purple-700' },
    { label: 'הכנסה חודשית ממוצעת', value: formatCurrency(monthlyAvg), icon: Calendar, color: 'amber', bg: 'bg-amber-50', textColor: 'text-amber-700' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div key={m.label} className="bg-white rounded-2xl p-5 border-2 border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-10 h-10 rounded-xl ${m.bg} flex items-center justify-center`}>
                <Icon size={18} className={m.textColor} />
              </div>
              <span className="text-xs font-bold text-gray-500">{m.label}</span>
            </div>
            <p className={`text-2xl font-extrabold ${m.textColor}`}>{m.value}</p>
          </div>
        );
      })}
    </div>
  );
}

function DividendCalendar({ holdings }: { holdings: Holding[] }) {
  const months = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
  const annualDividend = holdings.reduce((s, h) => s + h.annualDividend * h.shares, 0);
  const monthlyAvg = annualDividend / 12;

  const calendarData = months.map((month, i) => ({
    month,
    amount: i === 2 || i === 5 || i === 8 || i === 11
      ? Math.round(monthlyAvg * 1.4)
      : i === 0 || i === 6
        ? Math.round(monthlyAvg * 0.6)
        : Math.round(monthlyAvg),
  }));

  const maxAmount = Math.max(...calendarData.map(d => d.amount), 1);

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm mb-6">
      <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
          <Calendar size={18} className="text-amber-600" />
        </div>
        לוח דיבידנדים שנתי משוער
      </h2>
      {holdings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">הוסיפו נכסים כדי לראות את לוח הדיבידנדים</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-12 gap-3 mb-6">
            {calendarData.map((d) => (
              <div key={d.month} className="flex flex-col items-center">
                <div className="w-full bg-gray-100 rounded-xl overflow-hidden h-28 flex flex-col justify-end relative">
                  <div
                    className="bg-gradient-to-t from-amber-400 to-amber-300 rounded-t-lg transition-all hover:from-amber-500 hover:to-amber-400"
                    style={{ height: `${maxAmount > 0 ? (d.amount / maxAmount) * 100 : 0}%` }}
                  />
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-700 whitespace-nowrap">
                    {formatCurrency(d.amount)}
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-500 mt-2">{d.month}</span>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={calendarData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 600 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 600 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} tickFormatter={(v) => `₪${v}`} />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '2px solid #E5E7EB', borderRadius: 12, fontSize: '13px', fontWeight: 600, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} formatter={(value) => [formatCurrency(Number(value)), 'דיבידנדים']} />
              <Bar dataKey="amount" fill="#F59E0B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}

function SectorAllocation({ holdings }: { holdings: Holding[] }) {
  const sectorData = useMemo(() => {
    const map = new Map<string, number>();
    holdings.forEach((h) => {
      const val = h.currentPrice * h.shares;
      map.set(h.sector, (map.get(h.sector) || 0) + val);
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value: Math.round(value) }));
  }, [holdings]);

  const totalValue = sectorData.reduce((s, d) => s + d.value, 0);

  if (holdings.length === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm">
        <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center">
            <TrendingUp size={18} className="text-purple-600" />
          </div>
          פיזור סקטוריאלי
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={sectorData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" nameKey="name">
              {sectorData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="none" />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: 'white', border: '2px solid #E5E7EB', borderRadius: 12, fontSize: '13px', fontWeight: 600 }} formatter={(value) => [formatCurrency(Number(value))]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm">
        <h2 className="text-lg font-extrabold text-gray-900 mb-4">פירוט סקטורים</h2>
        <div className="space-y-4">
          {sectorData.map((s, i) => (
            <div key={s.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="text-sm font-bold text-gray-700">{s.name}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-bold text-gray-900">{formatCurrency(s.value)}</span>
                  <span className="text-gray-500">{totalValue > 0 ? ((s.value / totalValue) * 100).toFixed(1) : 0}%</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${totalValue > 0 ? (s.value / totalValue) * 100 : 0}%`, backgroundColor: COLORS[i % COLORS.length] }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SnowballChart({ holdings }: { holdings: Holding[] }) {
  const totalValue = holdings.reduce((s, h) => s + h.currentPrice * h.shares, 0);
  const annualDiv = holdings.reduce((s, h) => s + h.annualDividend * h.shares, 0);
  const avgYield = totalValue > 0 ? (annualDiv / totalValue) * 100 : 3;

  const projection = useMemo(() => {
    if (totalValue === 0) return [];
    const data = [];
    const netDivYield = (avgYield / 100) * 0.75;
    const annualReturn = 0.08;
    const effectiveReturn = annualReturn + netDivYield;

    let withReinvest = totalValue;
    let withoutReinvest = totalValue;
    for (let y = 0; y <= 30; y += 2) {
      data.push({ year: y, withReinvest: Math.round(withReinvest), withoutReinvest: Math.round(withoutReinvest) });
      for (let i = 0; i < 2; i++) {
        withReinvest *= (1 + effectiveReturn);
        withoutReinvest *= (1 + annualReturn);
      }
    }
    return data;
  }, [totalValue, avgYield]);

  if (holdings.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
            <TrendingUp size={18} className="text-emerald-600" />
          </div>
          אפקט כדור השלג - פרויקציה ל-30 שנה
        </h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded-full bg-emerald-500"></div>
            <span className="text-sm font-bold text-gray-600">עם השקעה חוזרת</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded-full bg-gray-400"></div>
            <span className="text-sm font-bold text-gray-600">ללא השקעה חוזרת</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={projection} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="snowGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis dataKey="year" tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
          <YAxis tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} tickFormatter={(v) => `₪${(v / 1000).toFixed(0)}K`} />
          <Tooltip contentStyle={{ backgroundColor: 'white', border: '2px solid #E5E7EB', borderRadius: 12, fontSize: '13px', fontWeight: 600, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} formatter={(value, name) => [formatCurrency(Number(value)), name === 'withReinvest' ? 'עם השקעה חוזרת' : 'ללא השקעה חוזרת']} />
          <Area type="monotone" dataKey="withReinvest" stroke="#10B981" strokeWidth={3} fill="url(#snowGreen)" dot={false} activeDot={{ r: 6, fill: '#10B981' }} />
          <Area type="monotone" dataKey="withoutReinvest" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" fill="none" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function HoldingsTable({ holdings, onRemove }: { holdings: Holding[]; onRemove: (id: string) => void }) {
  const totalValue = holdings.reduce((s, h) => s + h.currentPrice * h.shares, 0);

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5 border-b-2 border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <h2 className="text-lg font-extrabold text-gray-900">נכסים בתיק</h2>
      </div>
      {holdings.length === 0 ? (
        <div className="p-12 text-center">
          <div className="text-5xl mb-4">📊</div>
          <p className="text-gray-400 font-bold">עדיין אין נכסים בתיק</p>
          <p className="text-sm text-gray-300 mt-1">הוסיפו נכסים באמצעות הכפתור למעלה</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-100 bg-gray-50">
                <th className="text-right px-5 py-3 text-xs font-bold text-gray-500 uppercase">נכס/סימול</th>
                <th className="text-right px-5 py-3 text-xs font-bold text-gray-500 uppercase">סקטור</th>
                <th className="text-right px-5 py-3 text-xs font-bold text-gray-500 uppercase">מחיר</th>
                <th className="text-right px-5 py-3 text-xs font-bold text-gray-500 uppercase">יחידות</th>
                <th className="text-right px-5 py-3 text-xs font-bold text-gray-500 uppercase">שווי שוק</th>
                <th className="text-right px-5 py-3 text-xs font-bold text-gray-500 uppercase">משקל</th>
                <th className="text-right px-5 py-3 text-xs font-bold text-gray-500 uppercase">דיבידנד שנתי</th>
                <th className="text-right px-5 py-3 text-xs font-bold text-gray-500 uppercase">תשואה</th>
                <th className="text-right px-5 py-3 text-xs font-bold text-gray-500 uppercase">רווח/הפסד</th>
                <th className="px-3 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((h) => {
                const marketVal = h.currentPrice * h.shares;
                const weight = totalValue > 0 ? (marketVal / totalValue) * 100 : 0;
                const divYield = h.currentPrice > 0 ? (h.annualDividend / h.currentPrice) * 100 : 0;
                const pl = h.avgPrice > 0 ? ((h.currentPrice - h.avgPrice) / h.avgPrice) * 100 : 0;
                const plPositive = pl >= 0;

                return (
                  <tr key={h.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition group">
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-gray-900 font-bold">{h.name}</p>
                        <p className="text-xs text-gray-400 font-mono">{h.ticker}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-bold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg">{h.sector}</span>
                    </td>
                    <td className="px-5 py-4 text-gray-900 font-bold">{formatCurrency(h.currentPrice)}</td>
                    <td className="px-5 py-4 text-gray-700 font-bold">{h.shares}</td>
                    <td className="px-5 py-4 text-gray-900 font-extrabold">{formatCurrency(marketVal)}</td>
                    <td className="px-5 py-4 text-gray-600 font-bold">{weight.toFixed(1)}%</td>
                    <td className="px-5 py-4 text-emerald-600 font-extrabold">{formatCurrency(h.annualDividend * h.shares)}</td>
                    <td className="px-5 py-4 text-emerald-600 font-bold">{divYield.toFixed(1)}%</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 font-bold ${plPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                        {plPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                        {plPositive ? '+' : ''}{pl.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <button onClick={() => onRemove(h.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function Dividends() {
  const [holdings, setHoldings] = useState<Holding[]>([]);

  const addHolding = (h: Holding) => setHoldings((prev) => [...prev, h]);
  const removeHolding = (id: string) => setHoldings((prev) => prev.filter((h) => h.id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-bold px-4 py-2 rounded-2xl mb-4">
            <DollarSign size={16} />
            תיק דיבידנדים
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">השקעות דיבידנד</h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            עקבו אחרי ההכנסה הפאסיבית שלכם, נתחו את התשואה וצפו באפקט כדור השלג לאורך זמן
          </p>
        </div>

        <MetricsCards holdings={holdings} />
        <AddHoldingForm onAdd={addHolding} />
        <SectorAllocation holdings={holdings} />
        <DividendCalendar holdings={holdings} />
        <SnowballChart holdings={holdings} />
        <HoldingsTable holdings={holdings} onRemove={removeHolding} />
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