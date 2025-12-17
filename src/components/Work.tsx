import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WorkProps {
  onViewCaseStudy: (id: string) => void;
}

export function Work({ onViewCaseStudy }: WorkProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const caseStudies = [
    {
      id: 'fintech-banking-app',
      title: 'Autorent',
      category: 'Web Application',
      year: '2025',
      description: 'The earlier version primarily emphasized informational content, regional details, and service explanations, which required users to scan multiple sections before taking action. Navigation and booking felt secondary to content consumption.',
      image: '/Gallery/autorent/Home_thumbnail.jpg',
      tags: ['UX Research', 'Mobile Design', 'Design System'],
    },
    {
      id: 'saas-dashboard',
      title: 'BIGH',
      category: 'Web Application',
      year: '2024',
      description: 'The BIGH website presents Bahwan International Group Holding, a multinational business group with diversified operations. The homepage highlights the company’s presence across sectors such as automotive sales and rentals, equipment and consumer goods, food, trading, and rental services in markets including Oman, United Arab Emirates, Saudi Arabia, and beyond. The site provides an overview of the group’s business ventures, partnerships, and contact information. It serves as a corporate portal with links to corporate information (About Us, Our Business, Media & Events, Careers) and emphasizes the group’s multi-sector footprint and international reach.',
      image: '/Gallery/BIGH/thumbnail.jpg',
      tags: ['Dashboard Design', 'Data Visualization', 'B2B SaaS'],
    },
    {
      id: 'ecommerce-redesign',
      title: 'VinFast',
      category: 'Web & Mobile',
      year: '2025',
      description: 'The VinFast Oman website is the regional portal for the Vietnamese electric vehicle brand’s presence in the Sultanate of Oman. It showcases VinFast’s lineup of electric cars, including current models and upcoming releases, and promotes the company’s vision of sustainable, technology-driven mobility.',
      image: '/Gallery/Vinfast/Thumbnail_01.jpg',
      tags: ['Vinfast Website'],
    },
    {
      id: 'health-wellness-app',
      title: 'Receipt Generator',
      category: 'Mobile App Design',
      year: '2025',
      description: 'A Receipt Generator is a simple, device-friendly tool designed for salespeople to quickly create, print, or share receipts directly from their mobile phone, tablet, or laptop. It enables fast entry of customer and product details, automatically calculates totals and taxes, and generates a clean, professional receipt that can be printed instantly or shared as PDF/WhatsApp/email, reducing paperwork and saving time in day-to-day sales operations.',
      image: '/Gallery/receipt Generator/Thumbnail.jpg',
      tags: ['Sales', 'Database', 'Industrial Business'],
    },
  ];

  return (
    <section id="work" ref={ref} className="min-h-screen py-32 px-6 lg:px-12 border-t border-[#1E1E1E]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-[#B3B3B3] mb-4 tracking-widest uppercase">Selected Work</p>
          <h2 className="max-w-3xl">
            Case Studies & Product Design
          </h2>
        </motion.div>

        <div className="space-y-32">
          {caseStudies.map((study, index) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              index={index}
              isInView={isInView}
              onViewCaseStudy={onViewCaseStudy}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CaseStudyCardProps {
  study: {
    id: string;
    title: string;
    category: string;
    year: string;
    description: string;
    image: string;
    tags: string[];
  };
  index: number;
  isInView: boolean;
  onViewCaseStudy: (id: string) => void;
}

function CaseStudyCard({ study, index, isInView, onViewCaseStudy }: CaseStudyCardProps) {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="grid lg:grid-cols-2 gap-12 items-center group cursor-pointer"
      onClick={() => onViewCaseStudy(study.id)}
    >
      {/* Image */}
      <motion.div
        className={`relative overflow-hidden aspect-[4/3] bg-[#1E1E1E] ${
          index % 2 === 0 ? '' : 'lg:order-2'
        }`}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={study.image}
            alt={study.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
        {/* View Case Study Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="bg-white text-black px-6 py-3 flex items-center gap-2">
            <span>View Case Study</span>
            <ArrowUpRight size={20} />
          </div>
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className={index % 2 === 0 ? '' : 'lg:order-1'}>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[#B3B3B3] tracking-wider uppercase text-sm">{study.category}</span>
          <span className="text-[#B3B3B3]">•</span>
          <span className="text-[#B3B3B3]">{study.year}</span>
        </div>

        <h3 className="mb-6 group-hover:text-[#B3B3B3] transition-colors duration-300">
          {study.title}
        </h3>

        <p className="text-[#B3B3B3] leading-relaxed mb-8">
          {study.description}
        </p>

        <div className="flex flex-wrap gap-3">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 border border-[#1E1E1E] text-sm text-[#B3B3B3] group-hover:border-white group-hover:text-white transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <motion.div
          className="mt-8 flex items-center gap-2 text-white group-hover:gap-4 transition-all duration-300"
        >
          <span>View Full Case Study</span>
          <ArrowUpRight size={20} />
        </motion.div>
      </div>
    </motion.div>
  );
}
