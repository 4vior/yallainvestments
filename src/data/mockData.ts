export const portfolioHistory = [
  { date: 'ינואר 25', value: 195000 },
  { date: 'פברואר 25', value: 198500 },
  { date: 'מרץ 25', value: 202300 },
  { date: 'אפריל 25', value: 199800 },
  { date: 'מאי 25', value: 207500 },
  { date: 'יוני 25', value: 215200 },
  { date: 'יולי 25', value: 220800 },
  { date: 'אוגוסט 25', value: 224500 },
  { date: 'ספטמבר 25', value: 219300 },
  { date: 'אוקטובר 25', value: 228700 },
  { date: 'נובמבר 25', value: 237100 },
  { date: 'דצמבר 25', value: 245820 },
];

export const assetAllocation = [
  { name: 'מניות', value: 137520, percent: 56, target: 60, color: '#3B82F6' },
  { name: 'תעודות סל', value: 61455, percent: 25, target: 25, color: '#8B5CF6' },
  { name: 'קריפטו', value: 24582, percent: 10, target: 10, color: '#F59E0B' },
  { name: 'נדלן', value: 22263, percent: 9, target: 5, color: '#10B981' },
];

export const holdings = [
  { ticker: 'AAPL', name: 'אפל', price: 785.20, shares: 15, value: 11778, weight: 4.8, pl: 18.3 },
  { ticker: 'MSFT', name: 'מיקרוסופט', price: 1520.50, shares: 8, value: 12164, weight: 4.9, pl: 22.1 },
  { ticker: 'NVDA', name: 'אנבידיה', price: 2890.00, shares: 5, value: 14450, weight: 5.9, pl: 45.2 },
  { ticker: 'GOOGL', name: 'גוגל', price: 580.30, shares: 20, value: 11606, weight: 4.7, pl: 12.8 },
  { ticker: 'AMZN', name: 'אמזון', price: 920.00, shares: 10, value: 9200, weight: 3.7, pl: 15.6 },
  { ticker: 'TSLA', name: 'טסלה', price: 1150.00, shares: 6, value: 6900, weight: 2.8, pl: -8.4 },
  { ticker: 'METF', name: 'תלן מניות', price: 1250.00, shares: 25, value: 31250, weight: 12.7, pl: 9.3 },
  { ticker: 'SPY', name: 'S&P 500', price: 1830.00, shares: 10, value: 18300, weight: 7.4, pl: 11.2 },
  { ticker: 'VTI', name: 'ונגארד טוטאל', price: 730.00, shares: 15, value: 10950, weight: 4.5, pl: 8.7 },
  { ticker: 'BTC', name: 'ביטקוין', price: 490000, shares: 0.04, value: 19600, weight: 8.0, pl: 52.3 },
  { ticker: 'ETH', name: 'אתריום', price: 24800, shares: 0.2, value: 4960, weight: 2.0, pl: 28.1 },
  { ticker: 'NADLAN1', name: 'נדלן מניב', price: 7420, shares: 3, value: 22263, weight: 9.1, pl: 6.5 },
  { ticker: 'META', name: 'מטא', price: 1680.00, shares: 7, value: 11760, weight: 4.8, pl: 31.4 },
  { ticker: 'INTC', name: 'אינטל', price: 120.50, shares: 30, value: 3615, weight: 1.5, pl: -15.2 },
];

export const dividendMetrics = {
  expectedAnnual: 18450,
  averageYield: 3.8,
  monthlyAverage: 1538,
  growthRate: 12.4,
};

export const dividendCalendar = [
  { month: 'ינואר', amount: 1200 },
  { month: 'פברואר', amount: 850 },
  { month: 'מרץ', amount: 1650 },
  { month: 'אפריל', amount: 980 },
  { month: 'מאי', amount: 1420 },
  { month: 'יוני', amount: 1780 },
  { month: 'יולי', amount: 1100 },
  { month: 'אוגוסט', amount: 1350 },
  { month: 'ספטמבר', amount: 1900 },
  { month: 'אוקטובר', amount: 1050 },
  { month: 'נובמבר', amount: 1600 },
  { month: 'דצמבר', amount: 3570 },
];

export const snowballProjection = [
  { year: 0, withReinvest: 245820, withoutReinvest: 245820 },
  { year: 2, withReinvest: 282500, withoutReinvest: 268000 },
  { year: 5, withReinvest: 358000, withoutReinvest: 312000 },
  { year: 10, withReinvest: 542000, withoutReinvest: 408000 },
  { year: 15, withReinvest: 835000, withoutReinvest: 525000 },
  { year: 20, withReinvest: 1310000, withoutReinvest: 660000 },
  { year: 25, withReinvest: 2080000, withoutReinvest: 815000 },
  { year: 30, withReinvest: 3350000, withoutReinvest: 990000 },
];

export const netWorthAssets = [
  { name: 'חשבון עובר ושב', value: 45000, icon: 'wallet' },
  { name: 'חיסכון בנקאי', value: 82000, icon: 'piggy-bank' },
  { name: 'תיק השקעות', value: 245820, icon: 'trending-up' },
  { name: 'קרן פנסיה', value: 320000, icon: 'shield' },
  { name: 'קרן השתלמות', value: 95000, icon: 'landmark' },
  { name: 'נדלן - דירה להשקעה', value: 1250000, icon: 'home' },
  { name: 'רכב', value: 85000, icon: 'car' },
];

export const netWorthLiabilities = [
  { name: 'משכנתא', value: 780000, icon: 'home' },
  { name: 'הלוואת רכב', value: 35000, icon: 'car' },
  { name: 'אשראי צובר', value: 8500, icon: 'credit-card' },
  { name: 'הלוואה צרכנית', value: 12000, icon: 'file-text' },
];
