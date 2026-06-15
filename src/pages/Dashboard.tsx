import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { portfolioHistory, assetAllocation, holdings } from '../data/mockData';

const formatCurrency = (val: number) => `₪${val.toLocaleString('he-IL')}`;

function HeroSection() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-surface rounded-xl p-5 border border-border">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign size={16} className="text-accent" />
          <span className="text-sm text-slate-400">שווי תיק</span>
        </div>
        <p className="text-3xl font-bold text-white">{formatCurrency(245820)}</p>
        <p className="text-xs text-slate-500 mt-1">עדכון אחרון: היום, 17:30</p>
      </div>
      <div className="bg-surface rounded-xl p-5 border border-border">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={16} className="text-gain" />
          <span className="text-sm text-slate-400">שינוי יומי</span>
        </div>
        <p className="text-3xl font-bold text-gain">+1.24%</p>
        <p className="text-sm text-gain/80 mt-1">+{formatCurrency(3050)}</p>
      </div>
      <div className="bg-surface rounded-xl p-5 border border-border">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 size={16} className="text-gain" />
          <span className="text-sm text-slate-400">רווח לא ממומש</span>
        </div>
        <p className="text-3xl font-bold text-gain">+14.8%</p>
        <p className="text-sm text-gain/80 mt-1">+{formatCurrency(31700)}</p>
      </div>
    </div>
  );
}

function PortfolioChart() {
  return (
    <div className="bg-surface rounded-xl p-6 border border-border mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">התפתחות התיק</h2>
        <div className="flex gap-2">
          {['1ש', '3ש', '6ש', '1שנה', 'הכל'].map((period) => (
            <button key={period} className="px-3 py-1 text-xs rounded-md bg-bg text-slate-400 hover:text-white hover:bg-white/10 transition">
              {period}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={portfolioHistory} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <defs>
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#182C47" />
          <XAxis dataKey="date" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={{ stroke: '#182C47' }} />
          <YAxis tick={{ fill: '#64748B', fontSize: 12 }} axisLine={{ stroke: '#182C47' }} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`} />
          <Tooltip
            contentStyle={{ backgroundColor: '#0D1B2E', border: '1px solid #182C47', borderRadius: 8, color: '#E2E8F0' }}
            formatter={(value) => [formatCurrency(Number(value)), 'שווי תיק']}
          />
          <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} fill="url(#portfolioGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function AllocationSection() {
  return (
    <div className="grid grid-cols-2 gap-6 mb-6">
      <div className="bg-surface rounded-xl p-6 border border-border">
        <h2 className="text-lg font-semibold text-white mb-4">הקצאת נכסים</h2>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={assetAllocation}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
            >
              {assetAllocation.map((entry, index) => (
                <Cell key={index} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#0D1B2E', border: '1px solid #182C47', borderRadius: 8, color: '#E2E8F0' }}
              formatter={(value) => [formatCurrency(Number(value))]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-surface rounded-xl p-6 border border-border">
        <h2 className="text-lg font-semibold text-white mb-4">פילוח ויעדים</h2>
        <div className="space-y-4">
          {assetAllocation.map((asset) => (
            <div key={asset.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }} />
                  <span className="text-sm text-slate-300">{asset.name}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-white font-medium">{formatCurrency(asset.value)}</span>
                  <span className="text-slate-400">{asset.percent}%</span>
                </div>
              </div>
              <div className="relative h-2 bg-bg rounded-full">
                <div className="absolute h-2 rounded-full transition-all" style={{ width: `${asset.percent}%`, backgroundColor: asset.color }} />
                <div className="absolute h-0.5 top-[6px] bg-white/30" style={{ left: 0, width: `${asset.target}%` }} />
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>יעד: {asset.target}%</span>
                <span>פער: {asset.target - asset.percent > 0 ? '+' : ''}{asset.target - asset.percent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HoldingsTable() {
  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-white">נכסים בתיק</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-right px-6 py-3 text-slate-400 font-medium">נכס/סימול</th>
              <th className="text-right px-6 py-3 text-slate-400 font-medium">מחיר נוכחי</th>
              <th className="text-right px-6 py-3 text-slate-400 font-medium">יחידות</th>
              <th className="text-right px-6 py-3 text-slate-400 font-medium">שווי שוק</th>
              <th className="text-right px-6 py-3 text-slate-400 font-medium">משקל</th>
              <th className="text-right px-6 py-3 text-slate-400 font-medium">רווח/הפסד</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => (
              <tr key={h.ticker} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-bold text-xs">
                      {h.ticker.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{h.name}</p>
                      <p className="text-xs text-slate-500">{h.ticker}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-white">{formatCurrency(h.price)}</td>
                <td className="px-6 py-4 text-slate-300">{h.shares}</td>
                <td className="px-6 py-4 text-white font-medium">{formatCurrency(h.value)}</td>
                <td className="px-6 py-4 text-slate-300">{h.weight}%</td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1 ${h.pl >= 0 ? 'text-gain' : 'text-loss'}`}>
                    {h.pl >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {h.pl >= 0 ? '+' : ''}{h.pl}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div>
      <HeroSection />
      <PortfolioChart />
      <AllocationSection />
      <HoldingsTable />
    </div>
  );
}
