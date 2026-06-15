import { useState, useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Shield, Info, TrendingUp, BookOpen, Users, PiggyBank, Target, AlertCircle } from 'lucide-react';

const formatCurrency = (val: number) =>
  `₪${val.toLocaleString('he-IL', { maximumFractionDigits: 0 })}`;

function NumberInput({
  label, value, onChange, placeholder, suffix, hint,
}: {
  label: string; value: number; onChange: (v: number) => void; placeholder: string; suffix?: string; hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value === 0 ? '' : value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          placeholder={placeholder}
          className={`w-full bg-white border-2 border-gray-200 rounded-xl py-3 text-gray-800 text-sm font-bold focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-left hover:border-gray-300 ${suffix ? 'pl-14 pr-4' : 'px-4'}`}
        />
        {suffix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold select-none pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-xs text-gray-400 mt-1.5">{hint}</p>}
    </div>
  );
}

function calcFinalBalance(
  balance: number,
  monthlyDeposit: number,
  years: number,
  annualReturn: number,
  feeFromDeposit: number,
  feeFromAccumulation: number,
): number[] {
  const monthlyRate = (annualReturn / 100 - feeFromAccumulation / 100) / 12;
  const netMonthlyDeposit = monthlyDeposit * (1 - feeFromDeposit / 100);
  const data = [balance];
  let b = balance;
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      b = b * (1 + monthlyRate) + netMonthlyDeposit;
    }
    data.push(Math.round(b));
  }
  return data;
}

export default function PensionCalculator() {
  const [annualReturn, setAnnualReturn] = useState(6);
  const [currentBalance, setCurrentBalance] = useState(50000);
  const [monthlyDeposit, setMonthlyDeposit] = useState(2500);
  const [period, setPeriod] = useState(30);
  const [fee1Deposit, setFee1Deposit] = useState(1.5);
  const [fee1Accum, setFee1Accum] = useState(0.5);
  const [fee2Deposit, setFee2Deposit] = useState(0.5);
  const [fee2Accum, setFee2Accum] = useState(0.1);

  const { series1, series2, chartData } = useMemo(() => {
    const s1 = calcFinalBalance(currentBalance, monthlyDeposit, period, annualReturn, fee1Deposit, fee1Accum);
    const s2 = calcFinalBalance(currentBalance, monthlyDeposit, period, annualReturn, fee2Deposit, fee2Accum);
    const data = s1.map((v, i) => ({ year: i, offer1: v, offer2: s2[i] }));
    return { series1: s1, series2: s2, chartData: data };
  }, [currentBalance, monthlyDeposit, period, annualReturn, fee1Deposit, fee1Accum, fee2Deposit, fee2Accum]);

  const final1 = series1[series1.length - 1] ?? 0;
  const final2 = series2[series2.length - 1] ?? 0;
  const diff = final2 - final1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3">
            השוואת מסלולי פנסיה
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            הכניסו את הפרמטרים של שתי הצעות וקבלו השוואה מדויקת
          </p>
        </div>

        {/* Info Alert */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-blue-50 rounded-2xl p-5 border-2 border-blue-100 flex items-start gap-3">
            <Info size={20} className="text-blue-600 mt-0.5 shrink-0" />
            <div className="text-sm text-blue-800">
              <p><strong>דמי ניהול מהפקדה:</strong> נגבים מכל הפקדה חודשית לפני שהיא נכנסת לחיסכון (מקסימום 6%).</p>
              <p className="mt-1"><strong>דמי ניהול מהצבירה:</strong> נגבים כל שנה מסך הצבירה הכולל (מקסימום 1.05%).</p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* General Data */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm">
            <h2 className="text-lg font-extrabold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center">
                <TrendingUp size={16} className="text-gray-600" />
              </span>
              נתוני בסיס
            </h2>
            <div className="space-y-4">
              <NumberInput 
                label="צבירה נוכחית" 
                value={currentBalance} 
                onChange={setCurrentBalance} 
                placeholder="50,000" 
                suffix="₪" 
              />
              <NumberInput 
                label="הפקדה חודשית" 
                value={monthlyDeposit} 
                onChange={setMonthlyDeposit} 
                placeholder="2,500" 
                suffix="₪" 
                hint="כולל הפרשות מעסיק"
              />
              <NumberInput 
                label="תשואה שנתית" 
                value={annualReturn} 
                onChange={setAnnualReturn} 
                placeholder="6" 
                suffix="%" 
              />
              <NumberInput 
                label="תקופה" 
                value={period} 
                onChange={setPeriod} 
                placeholder="30" 
                suffix="שנים" 
              />
            </div>
          </div>

          {/* Offer 1 */}
          <div className="bg-white rounded-2xl p-6 border-2 border-blue-100 shadow-sm">
            <h2 className="text-lg font-extrabold text-gray-900 mb-1">הצעה א'</h2>
            <p className="text-xs text-gray-500 mb-5">לדוגמה: הקרן הנוכחית שלכם</p>
            
            <div className="space-y-4">
              <NumberInput 
                label="דמי ניהול מהפקדה" 
                value={fee1Deposit} 
                onChange={setFee1Deposit} 
                placeholder="1.5" 
                suffix="%" 
              />
              <NumberInput 
                label="דמי ניהול מהצבירה" 
                value={fee1Accum} 
                onChange={setFee1Accum} 
                placeholder="0.5" 
                suffix="%" 
              />
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl text-center">
              <p className="text-xs font-bold text-gray-500 mb-1">צבירה אחרי {period} שנים</p>
              <p className="text-2xl font-black text-gray-900">{formatCurrency(final1)}</p>
            </div>
          </div>

          {/* Offer 2 */}
          <div className="bg-white rounded-2xl p-6 border-2 border-blue-100 shadow-sm">
            <h2 className="text-lg font-extrabold text-gray-900 mb-1">הצעה ב'</h2>
            <p className="text-xs text-gray-500 mb-5">לדוגמה: קרן מתחרה שאתם בודקים</p>
            
            <div className="space-y-4">
              <NumberInput 
                label="דמי ניהול מהפקדה" 
                value={fee2Deposit} 
                onChange={setFee2Deposit} 
                placeholder="0.5" 
                suffix="%" 
              />
              <NumberInput 
                label="דמי ניהול מהצבירה" 
                value={fee2Accum} 
                onChange={setFee2Accum} 
                placeholder="0.1" 
                suffix="%" 
              />
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl text-center">
              <p className="text-xs font-bold text-gray-500 mb-1">צבירה אחרי {period} שנים</p>
              <p className="text-2xl font-black text-gray-900">{formatCurrency(final2)}</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-600" />
              השוואה לאורך זמן
            </h2>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 rounded-full bg-blue-500"></div>
                <span className="text-sm font-bold text-gray-600">הצעה א'</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 rounded-full bg-emerald-500"></div>
                <span className="text-sm font-bold text-gray-600">הצעה ב'</span>
              </div>
            </div>
          </div>
          
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="offer1Grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="offer2Grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis 
                  dataKey="year" 
                  tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }} 
                  axisLine={{ stroke: '#E5E7EB' }} 
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }} 
                  axisLine={{ stroke: '#E5E7EB' }} 
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
                    name === 'offer1' ? 'הצעה א\'' : 'הצעה ב\'',
                  ]}
                  labelFormatter={(label) => `אחרי ${label} שנים`}
                />
                <Area type="monotone" dataKey="offer1" stroke="#3B82F6" strokeWidth={2.5} fill="url(#offer1Grad)" dot={false} activeDot={{ r: 6, fill: '#3B82F6' }} />
                <Area type="monotone" dataKey="offer2" stroke="#10B981" strokeWidth={3} fill="url(#offer2Grad)" dot={false} activeDot={{ r: 6, fill: '#10B981' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Difference Summary */}
        <div className={`rounded-2xl p-8 text-center border-2 ${diff > 0 ? 'bg-emerald-50 border-emerald-200' : diff < 0 ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
          <p className="text-lg font-bold text-gray-700 mb-3">
            הפרש בין ההצעות אחרי {period} שנים:
          </p>
          {diff > 0 ? (
            <>
              <p className="text-4xl font-black text-emerald-600 mb-2">{formatCurrency(diff)}</p>
              <p className="text-emerald-700 font-medium">הצעה ב' עדיפה ב-{formatCurrency(diff)}</p>
            </>
          ) : diff < 0 ? (
            <>
              <p className="text-4xl font-black text-red-600 mb-2">{formatCurrency(Math.abs(diff))}</p>
              <p className="text-red-700 font-medium">הצעה א' עדיפה ב-{formatCurrency(Math.abs(diff))}</p>
            </>
          ) : (
            <p className="text-2xl font-bold text-gray-600">שתי ההצעות זהות</p>
          )}
        </div>

        {/* Pension Guide Section */}
        <div className="mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center mb-10">
            <div className="lg:col-span-3">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                איך עובדת קרן פנסיה?
              </h2>
              <p className="text-gray-500 text-lg">
                מדריך פשוט ומעשי
              </p>
            </div>
            <div className="lg:col-span-2">
<img 
  src="/pension.jpeg" 
  alt="איך עובדת קרן פנסיה" 
  className="w-full rounded-2xl shadow-lg border border-gray-200 object-contain h-56 md:h-72"
/>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* What is Pension */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <Shield size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    קרן פנסיה היא חיסכון לטווח ארוך שנועד להבטיח לכם הכנסה חודשית לאחר הפרישה מהעבודה. 
                    מעבר לחיסכון, הקרן כוללת גם רכיבי ביטוח חשובים כמו נכות ושארים.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-2">
                    המדינה מעודדת חיסכון לפנסיה באמצעות הטבות מס, ולכן הכסף שמושקע בפנסיה נהנה מתנאים מועדפים לעומת חיסכון רגיל. 
                    מצד שני, משיכה מוקדמת של הכספים לפני גיל פרישה לרוב כרוכה במס גבוה.
                  </p>
                </div>
              </div>
            </div>

            {/* How it's built */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-100 shadow-sm">
              <h3 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                <PiggyBank size={20} className="text-blue-600" />
                איך הפנסיה בנויה?
              </h3>
              <p className="text-gray-600 mb-4">קרן הפנסיה מבוססת על שלושה מקורות עיקריים:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                  <span className="text-blue-600 font-bold">1.</span>
                  <p className="text-gray-700 text-sm"><strong>הפקדות של העובד</strong> – אחוז קבוע מהשכר החודשי</p>
                </div>
                <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                  <span className="text-blue-600 font-bold">2.</span>
                  <p className="text-gray-700 text-sm"><strong>הפקדות של המעסיק</strong> – חלק גדול מההפרשה לפנסיה מגיע מהמעסיק</p>
                </div>
                <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                  <span className="text-blue-600 font-bold">3.</span>
                  <p className="text-gray-700 text-sm"><strong>תשואות השקעה</strong> – הכסף מושקע בשוק ההון וצובר רווחים (או הפסדים)</p>
                </div>
              </div>
              <p className="text-gray-600 mt-4 text-sm">
                כל הכספים מנוהלים על ידי גוף פנסיוני (קרן פנסיה), שמשקיע אותם במסלולים שונים בהתאם לרמת הסיכון שנבחרה.
              </p>
            </div>

            {/* Mutual Guarantee */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-100 shadow-sm">
              <h3 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                <Users size={20} className="text-blue-600" />
                עקרון הערבות ההדדית
              </h3>
              <p className="text-gray-600 leading-relaxed">
                אחד העקרונות המרכזיים בקרן פנסיה הוא <strong>ערבות הדדית</strong>: העמיתים בקרן למעשה "מבטחים" אחד את השני. 
                כל ההפקדות של כלל החוסכים משמשות גם לתשלום קצבאות לחוסכים שכבר יצאו לפנסיה או לאלו שנזקקו לקצבאות נכות או שארים.
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                כלומר – אין "קופה אישית סגורה", אלא מנגנון משותף שבו כולם משפיעים על כולם.
              </p>
            </div>

            {/* What you get */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-100 shadow-sm">
              <h3 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                <Target size={20} className="text-blue-600" />
                מה מקבלים מקרן פנסיה?
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-1">1. קצבת זקנה</h4>
                  <p className="text-sm text-gray-600">תשלום חודשי קבוע שמתחיל בגיל פרישה ונמשך לכל החיים.</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-1">2. ביטוח נכות (אובדן כושר עבודה)</h4>
                  <p className="text-sm text-gray-600">אם אדם לא יכול לעבוד עקב מצב רפואי – הוא עשוי לקבל קצבה חודשית של עד כ־75% מהשכר המבוטח.</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-1">3. ביטוח שארים</h4>
                  <p className="text-sm text-gray-600">במקרה פטירה: בן/בת זוג עשויים לקבל כ־60% מהשכר המבוטח לכל החיים. ילדים זכאים לקצבה עד גיל 21.</p>
                </div>
              </div>
            </div>

            {/* Management Fees Highlight */}
            <div className="bg-gradient-to-r from-red-50 to-white rounded-2xl p-6 md:p-8 border-2 border-red-100">
              <h3 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle size={20} className="text-red-500" />
                דמי ניהול – אחד הגורמים הכי חשובים
              </h3>
              <p className="text-gray-600 leading-relaxed">
                קרנות פנסיה גובות שני סוגי דמי ניהול: <strong>מהפקדה</strong> (אחוז מכל הפקדה חודשית) ו<strong>מצבירה</strong> (אחוז מהחיסכון הכולל). 
                גם אחוזים קטנים יכולים להצטבר לעשרות אלפי שקלים לאורך השנים. ככל שהחיסכון גדל, דמי הניהול מהצבירה הופכים למשמעותיים יותר.
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                יש "קרנות ברירת מחדל" עם דמי ניהול נמוכים יחסית, אבל ניתן להתמקח ולשפר תנאים. 
                <strong> זו אחת ההחלטות הכי משתלמות שתעשו.</strong>
              </p>
            </div>

            {/* Bottom Line */}
            <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-6 md:p-8 border-2 border-blue-100">
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">שורה תחתונה</h3>
              <p className="text-gray-700 leading-relaxed">
                פנסיה היא שילוב של <strong>חיסכון + ביטוח + השקעות לטווח ארוך</strong>. 
                היא נראית מורכבת, אבל בפועל היא בנויה ממספר עקרונות פשוטים – והבנה שלהם יכולה לעשות הבדל גדול בעתיד הכלכלי שלכם.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
              <p className="text-xs text-gray-400 leading-relaxed">
                <strong>לתשומת לבך:</strong> המידע לעיל נועד לצורכי ידע כללי בלבד ואינו מהווה ייעוץ פנסיוני, ביטוחי, מיסויי או אחר מכל סוג שהוא. 
                המידע אינו כולל את כל ההוראות, התנאים והסייגים הקבועים בדין, ואינו מהווה תחליף לייעוץ אישי המותאם לנתוניו, צרכיו ומטרותיו של כל אדם.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}