import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dividends from './pages/Dividends';
import NetWorth from './pages/NetWorth';
import PensionCalculator from './pages/PensionCalculator';
// 1. ייבוא הדף החדש של פורטפוליו הנדל"ן
import RealEstatePortfolio from './pages/RealEstatePortfolio';

const pages: Record<string, React.ComponentType<any>> = {
  home: Home,
  dividends: Dividends,
  networth: NetWorth,
  pension: PensionCalculator,
  // 2. הוספת הדף החדש למפת הדפים של האתר
  realestate: RealEstatePortfolio,
};

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [calculatorSection, setCalculatorSection] = useState<string | null>(null);

  const handleNavigate = (page: string, section: string | null = null) => {
    setActivePage(page);
    setCalculatorSection(section);
  };

  const PageComponent = pages[activePage] ?? Home;

  return (
    <div dir="rtl" className="min-h-screen bg-white text-gray-900 font-sans flex flex-col selection:bg-emerald-100 selection:text-emerald-700">
      <Navbar activePage={activePage} onNavigate={handleNavigate} />
      <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 animate-fade-in bg-white">
        <PageComponent scrollToSection={calculatorSection} clearScrollTarget={() => setCalculatorSection(null)} />
      </main>
      <Footer />
    </div>
  );
}