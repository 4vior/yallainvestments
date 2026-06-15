import { useState, useMemo } from 'react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
} from 'recharts';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';

const formatCurrency = (val: number) => `₪${val.toLocaleString('he-IL', { maximumFractionDigits: 0 })}`;

function CompoundCalculator() {
  const [initial, setInitial] = useState(50000);
  const [monthly, setMonthly] = useState(2000);
  const [returnRate, setReturnRate] = useState(8);
  const [dividendYield, setDividendYield] = useState(3.5);
  const [taxRate, setTaxRate] = useState(25);
  const [years, setYears] = useState(20);

  const projection = useMemo(() => {
    const data = [];
    const monthlyReturn = returnRate / 100 / 12;
    const netDividend = (dividendYield / 100) * (1 - taxRate / 100);
    const effectiveMonthlyReturn = monthlyReturn + netDividend / 12;
    let balance = initial;
    let totalContributions = initial;

    for (let y = 0; y <= years; y++) {
      data.push({
        year: y,
        totalContributions: Math.round(totalContributions),
        portfolioValue: Math.round(balance),
        compoundGain: Math.round(balance - totalContributions),
      });
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + effectiveMonthlyReturn) + monthly;
        totalContributions += monthly;
      }
    }
    return data;
  }, [initial, monthly, returnRate, dividendYield, taxRate, years]);

  const finalValue = projection[projection.length - 1]?.portfolioValue ?? 0;
  const totalContributions = projection[projection.length - 1]?.totalContributions ?? 0;
  const compoundGain = finalValue - totalContributions;

  return (
    <div>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 bg-surface rounded-xl p-6 border border-border">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Calculator size={18} className="text-accent" />
            מחשבון ריבית דריבית ודיבידנדים
          </h2>
          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-sm text-slate-400">סך הכל הפקדות</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gain" />
              <span className="text-sm text-slate-400">אפקט ריבית דריבית</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={projection} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="contribGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="compoundGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#182C47" />
              <XAxis dataKey="year" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={{ stroke: '#182C47' }} />
              <YAxis tick={{ fill: '#64748B', fontSize: 12 }} axisLine={{ stroke: '#182C47' }} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0D1B2E', border: '1px solid #182C47', borderRadius: 8, color: '#E2E8F0' }}
                formatter={(value, name) => [
                  formatCurrency(Number(value)),
                  name === 'totalContributions' ? 'סך הפקדות' : 'שווי תיק',
                ]}
              />
              <Area type="monotone" dataKey="totalContributions" stroke="#3B82F6" strokeWidth={2} fill="url(#contribGrad)" name="totalContributions" />
              <Area type="monotone" dataKey="portfolioValue" stroke="#10B981" strokeWidth={2} fill="url(#compoundGrad)" name="portfolioValue" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface rounded-xl p-6 border border-border space-y-5">
          <h3 className="text-base font-semibold text-white mb-2">פרמטרים</h3>

          <div>
            <label className="flex justify-between text-sm text-slate-400 mb-1">
              <span>הון ראשוני</span>
              <span className="text-white font-medium">{formatCurrency(initial)}</span>
            </label>
            <input
              type="range"
              min={0}
              max={500000}
              step={5000}
              value={initial}
              onChange={(e) => setInitial(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="flex justify-between text-sm text-slate-400 mb-1">
              <span>הפקדה חודשית</span>
              <span className="text-white font-medium">{formatCurrency(monthly)}</span>
            </label>
            <input
              type="range"
              min={0}
              max={20000}
              step={500}
              value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="flex justify-between text-sm text-slate-400 mb-1">
              <span>תשואה שנתית</span>
              <span className="text-white font-medium">{returnRate}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={20}
              step={0.5}
              value={returnRate}
              onChange={(e) => setReturnRate(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="flex justify-between text-sm text-slate-400 mb-1">
              <span>תשואת דיבידנד</span>
              <span className="text-white font-medium">{dividendYield}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={10}
              step={0.5}
              value={dividendYield}
              onChange={(e) => setDividendYield(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="flex justify-between text-sm text-slate-400 mb-1">
              <span>מס דיבידנדים</span>
              <span className="text-white font-medium">{taxRate}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={50}
              step={5}
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="flex justify-between text-sm text-slate-400 mb-1">
              <span>תקופה (שנים)</span>
              <span className="text-white font-medium">{years}</span>
            </label>
            <input
              type="range"
              min={1}
              max={40}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-surface rounded-xl p-5 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={16} className="text-accent" />
            <span className="text-sm text-slate-400">שווי תיק סופי</span>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(finalValue)}</p>
        </div>
        <div className="bg-surface rounded-xl p-5 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={16} className="text-slate-400" />
            <span className="text-sm text-slate-400">סך הפקדות</span>
          </div>
          <p className="text-2xl font-bold text-slate-300">{formatCurrency(totalContributions)}</p>
        </div>
        <div className="bg-surface rounded-xl p-5 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-gain" />
            <span className="text-sm text-slate-400">רווח ריבית דריבית</span>
          </div>
          <p className="text-2xl font-bold text-gain">{formatCurrency(compoundGain)}</p>
          <p className="text-xs text-gain/70 mt-1">
            +{((compoundGain / totalContributions) * 100).toFixed(1)}% על הפקדות
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Calculators() {
  return <CompoundCalculator />;
}
