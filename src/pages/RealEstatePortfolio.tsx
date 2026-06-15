import { useState, useMemo } from 'react';
import { DollarSign, Percent, Plus, Trash2, CheckCircle2, AlertCircle, TrendingUp, Key, Building2, MapPin } from 'lucide-react';

interface Property {
  id: string;
  address: string;
  city: string;
  value: number;
  monthlyRent: number;
  mortgagePayment: number;
  status: 'מושכר' | 'פנוי' | 'בשיפוץ';
  expenses: { id: string; description: string; amount: number }[];
}

const formatCurrency = (val: number) =>
  `₪${val.toLocaleString('he-IL', { maximumFractionDigits: 0 })}`;

export default function RealEstatePortfolio() {
  const [properties, setProperties] = useState<Property[]>([]);

  const [newAddress, setNewAddress] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newRent, setNewRent] = useState('');
  const [newMortgage, setNewMortgage] = useState('');

  const portfolioMetrics = useMemo(() => {
    let totalValue = 0;
    let totalRent = 0;
    let totalMortgage = 0;
    let totalExpenses = 0;

    properties.forEach((p) => {
      totalValue += p.value;
      totalRent += p.monthlyRent;
      totalMortgage += p.mortgagePayment;
      p.expenses.forEach((e) => {
        totalExpenses += e.amount;
      });
    });

    const netMonthlyCashFlow = totalRent - totalMortgage - (totalExpenses / 12);
    const averageYield = totalValue > 0 ? ((totalRent * 12) / totalValue) * 100 : 0;

    return {
      totalValue,
      totalRent,
      totalMortgage,
      netMonthlyCashFlow,
      averageYield: averageYield.toFixed(2),
      propertyCount: properties.length,
    };
  }, [properties]);

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress || !newCity) return;

    const newProp: Property = {
      id: Date.now().toString(),
      address: newAddress,
      city: newCity,
      value: Number(newValue) || 0,
      monthlyRent: Number(newRent) || 0,
      mortgagePayment: Number(newMortgage) || 0,
      status: 'מושכר',
      expenses: [],
    };

    setProperties([...properties, newProp]);
    setNewAddress('');
    setNewCity('');
    setNewValue('');
    setNewRent('');
    setNewMortgage('');
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(properties.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        
{/* Header */}
<div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center mb-10">
  <div className="lg:col-span-3">
    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-bold px-4 py-2 rounded-2xl mb-4">
      <Building2 size={16} />
      פורטפוליו נדל"ן
    </div>
    <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-3">
      תיק נכסי הנדל"ן שלי
    </h1>
    <p className="text-gray-500 text-lg">
      ניהול, מעקב הוצאות וניתוח תזרים מזומנים שוטף של הנכסים שבבעלותך
    </p>
  </div>
  <div className="lg:col-span-2">
    <img 
      src="/house.jpeg" 
      alt="תיק נכסי נדל״ן" 
      className="w-full rounded-2xl shadow-lg border border-gray-200 object-cover h-48 md:h-56"
    />
  </div>
</div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border-2 border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Key size={18} className="text-blue-600" />
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase">נכסים בבעלות</p>
            </div>
            <p className="text-3xl font-black text-gray-900">{portfolioMetrics.propertyCount}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border-2 border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <DollarSign size={18} className="text-purple-600" />
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase">שווי תיק כולל</p>
            </div>
            <p className="text-3xl font-black text-gray-900">
              {properties.length > 0 ? formatCurrency(portfolioMetrics.totalValue) : '---'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border-2 border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <TrendingUp size={18} className="text-emerald-600" />
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase">תזרים חודשי נטו</p>
            </div>
            <p className={`text-3xl font-black ${properties.length > 0 ? (portfolioMetrics.netMonthlyCashFlow >= 0 ? 'text-emerald-600' : 'text-red-600') : 'text-gray-300'}`}>
              {properties.length > 0 ? formatCurrency(portfolioMetrics.netMonthlyCashFlow) : '---'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border-2 border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <Percent size={18} className="text-amber-600" />
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase">תשואה ממוצעת</p>
            </div>
            <p className={`text-3xl font-black ${properties.length > 0 ? 'text-emerald-600' : 'text-gray-300'}`}>
              {properties.length > 0 ? `${portfolioMetrics.averageYield}%` : '---'}
            </p>
          </div>
        </div>

        {/* Properties Table */}
        {properties.length > 0 && (
          <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="p-5 md:p-6 border-b-2 border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Key size={18} className="text-blue-600" />
                </div>
                ספר הנכסים
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="border-b-2 border-gray-100 bg-gray-50">
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">כתובת</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">שווי נכס</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">שכירות</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">משכנתא</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">סטטוס</th>
                    <th className="p-4 text-center text-xs font-bold text-gray-500 uppercase">פעולות</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {properties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="p-4">
                        <div className="font-extrabold text-gray-900">{property.address}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                          <MapPin size={12} />
                          {property.city}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-gray-900">{formatCurrency(property.value)}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-emerald-600">{formatCurrency(property.monthlyRent)}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-gray-700">{formatCurrency(property.mortgagePayment)}</span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl ${
                          property.status === 'מושכר' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : property.status === 'פנוי'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          <CheckCircle2 size={12} />
                          {property.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDeleteProperty(property.id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                          title="מחק נכס"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bottom Grid: Add Property + Expenses */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Add Property Form */}
          <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6 h-fit">
            <h3 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Plus size={16} className="text-emerald-600" />
              </div>
              הוספת נכס חדש
            </h3>
            <form onSubmit={handleAddProperty} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">כתובת</label>
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="רחוב ומספר דירה"
                  className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm font-bold focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all hover:border-gray-300 text-right"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">עיר</label>
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  placeholder="שם העיר"
                  className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm font-bold focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all hover:border-gray-300 text-right"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">שווי נכס (₪)</label>
                <input
                  type="number"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="1,500,000"
                  className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm font-bold focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all hover:border-gray-300 text-right"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">שכירות (₪)</label>
                  <input
                    type="number"
                    value={newRent}
                    onChange={(e) => setNewRent(e.target.value)}
                    placeholder="4,500"
                    className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm font-bold focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all hover:border-gray-300 text-right"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">משכנתא (₪)</label>
                  <input
                    type="number"
                    value={newMortgage}
                    onChange={(e) => setNewMortgage(e.target.value)}
                    placeholder="2,100"
                    className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm font-bold focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all hover:border-gray-300 text-right"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-xl transition-all hover:shadow-lg"
              >
                ➕ הוסף נכס למערכת
              </button>
            </form>
          </div>

          {/* Expenses Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
                <AlertCircle size={16} className="text-amber-600" />
              </div>
              הוצאות תחזוקה וניהול
            </h3>
            
            {properties.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🔧</div>
                <p className="text-gray-400 font-bold">אין עדיין נכסים במערכת</p>
                <p className="text-sm text-gray-300 mt-1">
                  הוסיפו נכסים כדי להתחיל לעקוב אחר הוצאות
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  מעקב אחר הוצאות תחזוקה, תיקונים ובלת"מים. הוצאות אלו משפיעות ישירות על תזרים המזומנים הנקי מהנכסים.
                </p>
                <div className="space-y-4">
                  {properties.map((p) => (
                    <div key={p.id} className="bg-gray-50 rounded-2xl border-2 border-gray-100 p-5">
                      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-gray-200">
                        <span className="font-extrabold text-gray-900 flex items-center gap-2">
                          <MapPin size={14} className="text-gray-400" />
                          {p.address}, {p.city}
                        </span>
                        <span className="text-sm font-bold text-gray-500">
                          סה"כ הוצאות: <span className="text-red-600 font-extrabold">{formatCurrency(p.expenses.reduce((acc, curr) => acc + curr.amount, 0))}</span>
                        </span>
                      </div>
                      
                      {p.expenses.length === 0 ? (
                        <p className="text-sm text-gray-400 italic text-center py-4">אין הוצאות רשומות לנכס זה</p>
                      ) : (
                        <div className="space-y-2">
                          {p.expenses.map((e) => (
                            <div key={e.id} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-gray-100">
                              <span className="text-sm font-bold text-gray-700">{e.description}</span>
                              <span className="text-sm font-extrabold text-red-600">-{formatCurrency(e.amount)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}