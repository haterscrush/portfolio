import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, Clock, Users, TrendingUp, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface CaseStudyDetailProps {
  caseStudyId: string;
  onBack: () => void;
}

export function CaseStudyDetail({ caseStudyId, onBack }: CaseStudyDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState('overview');

  // Mock case study data
  const caseStudy = getCaseStudyData(caseStudyId);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'research', 'sketching', 'wireframing', 'design', 'comparison', 'results'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen">
      {/* Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50"
      />

      {/* Sticky Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-[#1E1E1E] z-40 mt-1"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#B3B3B3] hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Work</span>
            </button>

            <div className="hidden md:flex items-center gap-6">
              {['overview', 'research', 'sketching', 'wireframing', 'design', 'comparison', 'results'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section ? 'text-white' : 'text-[#B3B3B3] hover:text-white'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#B3B3B3] mb-4 tracking-widest uppercase">{caseStudy.category}</p>
            <h1 className="mb-8 leading-tight">{caseStudy.title}</h1>
            <p className="text-xl text-[#B3B3B3] leading-relaxed mb-12">
              {caseStudy.description}
            </p>

            {/* Meta Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div>
                <p className="text-[#B3B3B3] text-sm mb-2">Role</p>
                <p>{caseStudy.role}</p>
              </div>
              <div>
                <p className="text-[#B3B3B3] text-sm mb-2">Timeline</p>
                <p>{caseStudy.timeline}</p>
              </div>
              <div>
                <p className="text-[#B3B3B3] text-sm mb-2">Team</p>
                <p>{caseStudy.team}</p>
              </div>
              <div>
                <p className="text-[#B3B3B3] text-sm mb-2">Year</p>
                <p>{caseStudy.year}</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative aspect-video bg-[#1E1E1E] overflow-hidden"
          >
            <ImageWithFallback
              src={caseStudy.heroImage}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section id="overview" className="py-20 px-6 lg:px-12 border-t border-[#1E1E1E]">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-12">Overview & Challenge</h2>
          <div className="space-y-6 text-[#B3B3B3] leading-relaxed">
            {caseStudy.overview.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {caseStudy.metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 border border-[#1E1E1E] hover:border-white transition-colors"
              >
                <metric.icon className="mb-4" size={32} />
                <h3 className="mb-2">{metric.value}</h3>
                <p className="text-[#B3B3B3]">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research */}
      <section id="research" className="py-20 px-6 lg:px-12 border-t border-[#1E1E1E]">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-12">Research & Discovery</h2>
          
          <div className="space-y-16">
            {/* User Personas */}
            <div>
              <h3 className="mb-8">User Personas</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {caseStudy.personas.map((persona, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-6 bg-[#0A0A0A] border border-[#1E1E1E]"
                  >
                    <h4 className="mb-2">{persona.name}</h4>
                    <p className="text-[#B3B3B3] mb-4">{persona.role}</p>
                    <p className="text-[#B3B3B3] text-sm leading-relaxed">{persona.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Key Findings */}
            <div>
              <h3 className="mb-8">Key Research Findings</h3>
              <div className="space-y-4">
                {caseStudy.findings.map((finding, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 border-l-2 border-white"
                  >
                    <div className="w-2 h-2 bg-white mt-2 shrink-0" />
                    <p className="text-[#B3B3B3]">{finding}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

     

      {/* Wireframing */}
      {caseStudy.showWireframes && (
  <section id="wireframing" className="py-20 px-6 lg:px-12 border-t border-[#1E1E1E]">
    <div className="max-w-6xl mx-auto">
      <h2 className="mb-6">Low-Fidelity Wireframes</h2>
      <p className="text-[#B3B3B3] leading-relaxed mb-12 max-w-3xl">
        These grayscale wireframes define the information architecture...
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {caseStudy.wireframes.map((wireframe, index) => (
          <div key={index}>
            <ImageWithFallback src={wireframe} />
          </div>
        ))}
      </div>
    </div>
  </section>
)}


      {/* Design Process */}
      <section id="design" className="py-20 px-6 lg:px-12 border-t border-[#1E1E1E]">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-6">High-Fidelity Design</h2>
          <p className="text-[#B3B3B3] leading-relaxed mb-12 max-w-3xl">
            The final UI incorporates complete visual design with refined typography, spacing, components,
            and interactions. Every detail serves a purpose—from micro-interactions to the overall visual
            hierarchy that guides users through their journey.
          </p>

          {/* Final Designs */}
          <div className="space-y-12">
            {caseStudy.finalDesigns.map((design, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="aspect-video bg-[#1E1E1E] overflow-hidden border border-[#1E1E1E] group-hover:border-white transition-colors">
                  <ImageWithFallback
                    src={design}
                    alt={`Final design ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[#B3B3B3] text-sm mt-3">Screen {index + 1}: Final Design</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
    {caseStudy.showComparison && (
  <section id="comparison" className="py-20 px-6 lg:px-12 border-t border-[#1E1E1E]">
    <div className="max-w-6xl mx-auto">
      <h2 className="mb-6">Before & After Comparison</h2>

      <BeforeAfterSlider
        beforeImage={caseStudy.beforeAfter[0]}
        afterImage={caseStudy.beforeAfter[1]}
        beforeLabel="Before"
        afterLabel="After"
      />
    </div>
  </section>
)}


      {/* Results & Impact */}
      <section id="results" className="py-20 px-6 lg:px-12 border-t border-[#1E1E1E]">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-12">Impact & Results</h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {caseStudy.results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 border border-[#1E1E1E]"
              >
                <div className="text-5xl mb-4">{result.value}</div>
                <p className="text-[#B3B3B3]">{result.metric}</p>
              </motion.div>
            ))}
          </div>

          <div>
            <h3 className="mb-8">Key Learnings</h3>
            <div className="space-y-6">
              {caseStudy.learnings.map((learning, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-[#0A0A0A] border border-[#1E1E1E]"
                >
                  <p className="text-[#B3B3B3] leading-relaxed">{learning}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation to other case studies */}
      <section className="py-20 px-6 lg:px-12 border-t border-[#1E1E1E]">
        <div className="max-w-4xl mx-auto">
          {/* Live Website CTA */}
          {caseStudy.liveUrl && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="mb-6">View Live Website</h2>
              <p className="text-[#B3B3B3] mb-8 max-w-2xl mx-auto">
                Experience the final product in action. Visit the live website to see the design
                implementation and interact with the features.
              </p>
              <motion.a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-[#B3B3B3] transition-all duration-300"
              >
                <span>Visit Live Website</span>
                <ExternalLink size={20} />
              </motion.a>
            </motion.div>
          )}

          {/* Back to Work */}
          <div className="text-center pt-12 border-t border-[#1E1E1E]">
            <button
              onClick={onBack}
              className="px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 inline-flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              <span>View All Projects</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Mock data function
function getCaseStudyData(id: string) {
  const studies: Record<string, any> = {
    'fintech-banking-app': {
      title: 'Autorent',
      category: 'Car Rental Service',
      year: '2025',
      showWireframes: true,
      showComparison: true,
      description: 'Reimagining digital banking with a focus on financial wellness and intuitive money management.',
      role: 'UI/UX Designer',
      timeline: '4 months',
      team: '1 Designer, 3 Engineers',
      heroImage: '/Gallery/autorent/Home_thumbnail.jpg',
      overview: [
        'Redesign the Autorent car rental platform into a modern, intuitive, and customer-centric experience that enables users to book vehicles quickly and confidently.',
        'Our research revealed that users felt overwhelmed by complex navigation, unclear financial insights, and a lack of personalization.',
        'The goal was to create an experience that simplifies banking tasks while providing actionable insights for better financial decision-making.',
      ],
      metrics: [
        { icon: Clock, value: '20%', label: 'Faster task completion' },
        { icon: Users, value: '85%', label: 'User satisfaction' },
        { icon: TrendingUp, value: '2.5x', label: 'Engagement increase' },
      ],
      personas: [
        {
          name: 'Varun, 28',
          role: 'Young Professional',
          description: 'Wants to save money and track expenses easily without complex features.',
        },
        {
          name: 'Siri, 45',
          role: 'Small Business Owner',
          description: 'Needs clear overview of multiple accounts and quick transaction capabilities.',
        },
      ],
      findings: [
        'Complicated booking flows and excessive steps',
        'Poor vehicle discovery and comparison',
        'Unclear pricing, hidden charges, and low cost transparency',
        'Limited personalization based on trip type, duration, or preferences',
      ],
      sketches: [
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
      ],
      wireframes: [
        'public/Gallery/autorent/wireFrame_01.jpg',
        'public/Gallery/autorent/wireFrame_02.jpg',
      ],
      finalDesigns: [
        '/Gallery/autorent/High-Fidelity Design.jpg',
        '/Gallery/autorent/High-Fidelity Design_02.jpg',
      ],
      beforeAfter: [
        '/Gallery/autorent/Before.jpg',
        '/Gallery/autorent/High-Fidelity Design_02.jpg',
      ],
      improvements: [
        {
          title: 'Visual Hierarchy',
          description: 'Improved information hierarchy with clear typography and spacing, guiding users to key actions.',
        },
        {
          title: 'Simplified Navigation',
          description: 'Reduced navigation complexity from 7 levels to 3, making core features instantly accessible.',
        },
        {
          title: 'Enhanced Usability',
          description: 'Larger touch targets, better contrast ratios, and streamlined user flows for effortless interaction.',
        },
      ],
      liveUrl: 'https://autorent-me.com/',
      results: [
        { value: '+43%', metric: 'User Retention' },
        { value: '4.8★', metric: 'App Store Rating' },
        { value: '-65%', metric: 'Support Tickets' },
        { value: '+120%', metric: 'Daily Active Users' },
      ],
      learnings: [
        'Simplicity wins: Removing unnecessary features improved user satisfaction more than adding new ones.',
        'Early user testing saved 3 weeks of development time by identifying issues before implementation.',
        'Personalization drives engagement: Users who received tailored insights were 3x more likely to return.',
      ],
    },
    'saas-dashboard': {
      title: 'Bahwan International Groups Holdings',
      category: 'Web Application',
      year: '2025',
      showWireframes: true,
      showComparison: true,
      description: 'BIGH (Bahwan International Group Holding) is a UAE-based diversified business group operating across the GCC and international markets. The company focuses on multiple sectors including automotive, car rental and leasing, equipment and power solutions, trading, consumer goods, food, and strategic partnerships, with a strong emphasis on sustainable growth, operational excellence, and long-term value creation.',
      role: 'UI/UX Designer',
      timeline: '2 months',
      team: '1 Designers, 2 Engineers',
      heroImage: '/Gallery/BIGH/thumbnail.jpg',
      overview: [
        'The existing dashboard was cluttered with data but lacked meaningful insights, causing user frustration and low adoption.',
        'Stakeholders needed a solution that could scale across different user roles while maintaining consistency.',
        'We designed a modular dashboard system that adapts to user needs while presenting complex data in digestible formats.',
      ],
      metrics: [
        { icon: Clock, value: '55%', label: 'Time to insight' },
        { icon: Users, value: '92%', label: 'User adoption' },
        { icon: TrendingUp, value: '3.2x', label: 'loading time' },
      ],
      personas: [
        {
          name: 'Alex, 32',
          role: 'Marketing Manager',
          description: 'Needs quick campaign performance overview with drill-down capabilities.',
        },
        {
          name: 'Jordan, 38',
          role: 'Data Analyst',
          description: 'Requires detailed data exploration and custom report generation.',
        },
      ],
      findings: [
        'Users struggled to find relevant metrics among 50+ data points',
        'Dashboard load time exceeded 5 seconds, causing frustration',
        'Role-based views were essential for different user types',
        'Export and sharing capabilities were frequently requested',
      ],
      sketches: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      ],
      wireframes: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      ],
      finalDesigns: [
        '/Gallery/BIGH/High-fidelity.jpg',
        '/Gallery/BIGH/High-fidelity_02.jpg',
      ],
      beforeAfter: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      ],
      improvements: [
        {
          title: 'Data Clarity',
          description: 'Redesigned data visualization with clear hierarchies, making complex metrics instantly understandable.',
        },
        {
          title: 'Performance',
          description: 'Reduced dashboard load time from 5s to 1.2s through optimized data fetching and rendering.',
        },
        {
          title: 'Personalization',
          description: 'Introduced role-based views, allowing users to customize their dashboard based on their needs.',
        },
      ],
      liveUrl: 'https://bigh.co/',
      results: [
        { value: '+78%', metric: 'User Efficiency' },
        { value: '1.2s', metric: 'Avg Load Time' },
        { value: '+250%', metric: 'Conversions' },
        { value: '95%', metric: 'user Friendly' },
      ],
      learnings: [
        'Progressive disclosure kept the interface clean while providing depth when needed.',
        'Performance optimization was as important as visual design for user satisfaction.',
        'Collaboration with engineering early prevented technical debt and improved outcomes.',
      ],
    },
    'ecommerce-redesign': {
      title: 'Vinfast',
      category: 'Website Application',
      year: '2024',
      showWireframes: true,
      showComparison: true,
      description: 'Complete redesign of a fashion marketplace, increasing conversion rate by 43% through improved UX.',
      role: 'Lead Designer',
      timeline: '2 months',
      team: '1 Designers, 4 Engineers',
      heroImage: '/Gallery/Vinfast/Thumbnail_01.jpg',
      overview: [
        'The existing platform had a 73% cart abandonment rate and users complained about confusing navigation and slow checkout.',
        'Our mission was to streamline the shopping experience from discovery to purchase while maintaining brand identity.',
        'We implemented a mobile-first approach with progressive enhancement for desktop users.',
      ],
      metrics: [
        { icon: Clock, value: '43%', label: 'Conversion increase' },
        { icon: Users, value: '-27%', label: 'Cart abandonment' },
        { icon: TrendingUp, value: '+180%', label: 'Mobile sales' },
      ],
      personas: [
        {
          name: 'Emma, 24',
          role: 'Fashion Enthusiast',
          description: 'Browses on mobile, values quick checkout and easy returns.',
        },
        {
          name: 'David, 35',
          role: 'Occasional Shopper',
          description: 'Shops on desktop, prioritizes detailed product information.',
        },
      ],
      findings: [
        'Mobile users abandoned due to complex checkout process',
        'Product imagery quality directly impacted purchase decisions',
        'Size guides and reviews were critical for conversion',
        'Guest checkout option significantly reduced friction',
      ],
      sketches: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop',
      ],
      wireframes: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop',
      ],
      finalDesigns: [
        '/Gallery/Vinfast/High-Fidelity Design.jpg',
        '/Gallery/Vinfast/High-Fidelity Design_02.jpg',
      ],
      beforeAfter: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop',
      ],
      improvements: [
        {
          title: 'Streamlined Checkout',
          description: 'Reduced checkout steps from 7 to 3, removing friction and significantly improving conversion rates.',
        },
        {
          title: 'Mobile Optimization',
          description: 'Mobile-first design with larger touch targets and optimized image loading for faster performance.',
        },
        {
          title: 'Trust Signals',
          description: 'Added prominent reviews, size guides, and secure payment badges to build confidence at key decision points.',
        },
      ],
      liveUrl: 'https://vinfast-oman.com/en',
      results: [
        { value: '+43%', metric: 'Conversion Rate' },
        { value: '+180%', metric: 'Mobile Revenue' },
        { value: '-27%', metric: 'Cart Abandonment' },
        { value: '4.6★', metric: 'User Rating' },
      ],
      learnings: [
        'Optimizing checkout flow had the biggest impact on conversion rates.',
        'High-quality product imagery and zoom functionality were non-negotiable.',
        'A/B testing validated assumptions and prevented costly mistakes.',
      ],
    },
    'health-wellness-app': {
      title: 'Receipt Generators',
      category: 'Website application ',
      year: '2025',
      showWireframes: false,
      showComparison: false,
      description: 'A Receipt Generator is a simple, device-friendly tool designed for salespeople to quickly create, print, or share receipts directly from their mobile phone, tablet, or laptop. It enables fast entry of customer and product details, automatically calculates totals and taxes, and generates a clean, professional receipt that can be printed instantly or shared as PDF/WhatsApp/email, reducing paperwork and saving time in day-to-day sales operations.',
      role: 'UI/UX Designer',
      timeline: '4 months',
      team: '1 Designer, 3 Engineers',
      heroImage: '/public/Gallery/receipt Generator/Thumbnail.jpg',
      overview: [
        'Salespeople can generate and print receipts instantly, reducing customer wait time and improving checkout efficiency.',
        'Automatic calculations for totals, taxes, and discounts minimize human errors compared to handwritten receipts.',
        'The focus was on building sustainable habits through gentle nudges rather than aggressive notifications.',
      ],
      metrics: [
        { icon: Clock, value: '78%', label: '30-day retention' },
        { icon: Users, value: '4.7★', label: 'App rating' },
        { icon: TrendingUp, value: '+210%', label: 'Daily engagement' },
      ],
      personas: [
        {
          name: 'Lisa, 29',
          role: 'Busy Professional',
          description: 'Wants to build healthy habits but has limited time and motivation.',
        },
        {
          name: 'Tom, 42',
          role: 'Fitness Beginner',
          description: 'Intimidated by complex fitness apps, needs gentle guidance.',
        },
      ],
      findings: [
        'Users preferred simple daily goals over complex tracking',
        'Positive reinforcement worked better than guilt-based messaging',
        'Integration with existing health apps was highly valued',
        'Privacy concerns around health data were significant',
      ],
      sketches: [
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
      ],
      wireframes: [
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
      ],
      finalDesigns: [
        'public/Gallery/receipt Generator/final_01.jpg',
        'public/Gallery/receipt Generator/final_02.jpg',
      ],
      beforeAfter: [
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
      ],
      improvements: [
        {
          title: 'Simplified Experience',
          description: 'Removed overwhelming features, focusing on core habit-building with intuitive daily goals and tracking.',
        },
        {
          title: 'Personalized AI',
          description: 'Context-aware recommendations that adapt to user behavior, providing relevant guidance without being pushy.',
        },
        {
          title: 'Positive Reinforcement',
          description: 'Replaced guilt-based messaging with celebratory milestones and gentle encouragement to sustain motivation.',
        },
      ],
      liveUrl: 'https://www.moatamadcars.com/',
      results: [
        { value: '78%', metric: '30-Day Retention' },
        { value: '4.7★', metric: 'User Rating' },
        { value: '+110%', metric: 'productivity' },
        { value: '85%', metric: 'Goal Completion' },
      ],
      learnings: [
        'Speed and simplicity drive adoptionSalespeople value tools that reduce steps and cognitive load. A fast, minimal flow increased daily usage more than adding advanced features.',
        'Auto-calculation of totals, taxes, and discounts significantly minimized manual mistakes, improving confidence in the system and customer trust.',
        'Designing for mobile, tablet, and low-end printers ensured consistent performance across real-world sales environments, leading to higher acceptance by on-ground teams.',
      ],
    },

  };
  

  return studies[id] || studies['fintech-banking-app'];
}