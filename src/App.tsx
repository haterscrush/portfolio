import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Work } from './components/Work';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';
import { CaseStudyDetail } from './components/CaseStudyDetail';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'case-study'>('home');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null);

  const handleViewCaseStudy = (id: string) => {
    setSelectedCaseStudy(id);
    setCurrentPage('case-study');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedCaseStudy(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  if (currentPage === 'case-study' && selectedCaseStudy) {
    return <CaseStudyDetail caseStudyId={selectedCaseStudy} onBack={handleBackToHome} />;
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Work onViewCaseStudy={handleViewCaseStudy} />
      <Skills />
      <Experience />
      <Contact />
    </div>
  );
}
