import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dividends from './pages/Dividends';
import NetWorth from './pages/NetWorth';
import RealEstate from './pages/RealEstatePortfolio';
import Pension from './pages/PensionCalculator';
import Learn from './pages/Learn';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [scrollToSection, setScrollToSection] = useState<string | null>(null);

  const handleNavigate = (page: string, section: string | null) => {
    setCurrentPage(page);
    setScrollToSection(section);
  };

  const clearScrollTarget = () => {
    setScrollToSection(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home scrollToSection={scrollToSection} clearScrollTarget={clearScrollTarget} />;
      case 'dividends':
        return <Dividends />;
      case 'networth':
        return <NetWorth />;
      case 'realestate':
        return <RealEstate />;
      case 'pension':
        return <Pension />;
      case 'learn':
        return <Learn />;
      default:
        return <Home scrollToSection={scrollToSection} clearScrollTarget={clearScrollTarget} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activePage={currentPage} onNavigate={handleNavigate} />
      {renderPage()}
    </div>
  );
}

export default App;