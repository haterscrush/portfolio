import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';

export function Experience() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const experiences = [
    {
      company: 'BSTL Global Solutions',
      role: 'UI/UX Designer',
      period: '2024 - Present',
      location: 'Hyderabad ,Telangana',
      description: 'UI/UX Designer focused on creating intuitive, high-impact digital experiences Strong balance of user empathy, business goals, and data-driven decision-making',
      achievements: [
        'Redesigned core product, increasing user retention by 34%',
        'Built design system adopted across 2 product teams',
        'Led user research program reaching 300+ participants',
      ],
    },
    {
      company: 'Ybrant Media',
      role: 'UI/UX Designer',
      period: '2023 - 2024',
      location: 'Hyderabd, Telangana',
      description: 'Designed mobile and web applications for clients across fintech, health, and e-commerce sectors.',
      achievements: [
        'Delivered 5+ projects from concept to launch',
        'Improved client satisfaction scores to 4.8/5',
        'Successfully redesigned complex user flows, improving usability and task completion',
      ],
    },
    {
      company: 'Aadhan pvt Media',
      role: 'Graphic Designer',
      period: '2021 - 2023',
      location: 'Hyderabd, Telangana',
      description: 'As a Graphic Designer and Motion Graphic Designer at Aadhan Media Pvt. Ltd., creating impactful visual and motion-based content for digital and marketing campaigns. Collaborated with cross-functional teams to deliver consistent, high-quality designs that strengthened brand presence and audience engagement.',
      achievements: [
        'Contributed to News Application ',
        'Delivered 20+ Graphic Templates per Day',
        'Worked on many motion graphic videos',
      ],
    },
    {
      company: 'Annapurna Studios',
      role: 'Motion Graphic Intern',
      period: '2019 - 2020',
      location: 'Hyderabad, telangana',
      description: 'Started journey as a Graphic Designer and motion Graphic designer',
      achievements: [
        'Worked on 5+ movies',
        'Created visual assets and illustrations',
        'Participated in design critiques',
      ],
    },
  ];

  return (
    <section
      id="experience"
      ref={containerRef}
      className="min-h-screen py-32 px-6 lg:px-12 border-t border-[#1E1E1E] relative"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-[#B3B3B3] mb-4 tracking-widest uppercase">Journey</p>
          <h2>Professional Experience</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-[1px] bg-[#1E1E1E]">
            <motion.div
              style={{ scaleY: useTransform(scrollYProgress, [0, 1], [0, 1]) }}
              className="w-full h-full bg-white origin-top"
            />
          </div>

          {/* Experience Items */}
          <div className="space-y-24">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={index}
                experience={exp}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  experience: {
    company: string;
    role: string;
    period: string;
    location: string;
    description: string;
    achievements: string[];
  };
  index: number;
  isInView: boolean;
}

function ExperienceCard({ experience, index, isInView }: ExperienceCardProps) {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: '-100px' });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`relative grid lg:grid-cols-2 gap-8 items-start ${
        isLeft ? '' : 'lg:grid-flow-dense'
      }`}
    >
      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={cardInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        className="absolute left-0 lg:left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-4 border-black rounded-full z-10"
      />

      {/* Content */}
      <div className={`pl-12 lg:pl-0 ${isLeft ? 'lg:pr-16' : 'lg:pl-16 lg:col-start-2'}`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
          animate={cardInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          className="bg-[#0A0A0A] border border-[#1E1E1E] p-8 hover:border-white transition-all duration-300 group"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="mb-2 group-hover:text-[#B3B3B3] transition-colors">
                {experience.role}
              </h3>
              <p className="text-[#B3B3B3]">{experience.company}</p>
            </div>
            <div className="text-right">
              <p className="text-[#B3B3B3] text-sm">{experience.period}</p>
              <p className="text-[#B3B3B3] text-sm">{experience.location}</p>
            </div>
          </div>

          <p className="text-[#B3B3B3] mb-6 leading-relaxed">
            {experience.description}
          </p>

          <div className="space-y-3">
            {experience.achievements.map((achievement, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-white mt-2 shrink-0" />
                <p className="text-[#B3B3B3] text-sm">{achievement}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Empty space for alternating layout */}
      <div className={`hidden lg:block ${isLeft ? 'lg:col-start-2' : 'lg:col-start-1'}`} />
    </motion.div>
  );
}
