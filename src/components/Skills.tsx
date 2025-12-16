import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skills = [
    {
      name: 'UI Design',
      level: 95,
      tools: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator'],
    },
    {
      name: 'UX Research',
      level: 90,
      tools: ['User Interviews', 'A/B Testing', 'Heatmaps', 'Analytics', 'Surveys'],
    },
    {
      name: 'Prototyping',
      level: 92,
      tools: ['Figma', 'Principle', 'ProtoPie', 'Framer'],
    },
    {
      name: 'Design Systems',
      level: 88,
      tools: ['Component Libraries', 'Token Management', 'Documentation'],
    },
    {
      name: 'Graphic Designer',
      level: 75,
      tools: ['Photoshop', 'illustrator', 'Aftereffects', 'Premier Pro'],
    },
    {
      name: '3D Modeling',
      level: 65,
      tools: ['Maya', 'Blender', 'Cinema 4D', ],
    },
  ];

  return (
    <section id="skills" ref={ref} className="min-h-screen py-32 px-6 lg:px-12 border-t border-[#1E1E1E]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-[#B3B3B3] mb-4 tracking-widest uppercase">Expertise</p>
          <h2>Skills & Capabilities</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Skills List */}
          <div className="space-y-12">
            {skills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                skill={skill}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Additional Info */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="mb-6">Design Approach</h3>
              <div className="space-y-4 text-[#B3B3B3]">
                <p>
                  I believe great design is a balance of aesthetics, usability, and business impact.
                  My process is rooted in empathy, iteration, and collaboration.
                </p>
                <p>
                  From discovery workshops to high-fidelity prototypes, I ensure every decision
                  is backed by research and validated with real users.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="mb-6">Core Competencies</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'User Research',
                  'Wireframing',
                  'Visual Design',
                  'Interaction Design',
                  'Usability Testing',
                  'Information Architecture',
                  'Responsive Design',
                  'Accessibility (WCAG)',
                  'Motion Graphics',
                  '3D Modeling'
                ].map((competency, index) => (
                  <motion.div
                    key={competency}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                    className="flex items-center gap-2 text-[#B3B3B3] hover:text-white transition-colors duration-300 cursor-default"
                  >
                    <div className="w-1.5 h-1.5 bg-white" />
                    <span>{competency}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface SkillBarProps {
  skill: {
    name: string;
    level: number;
    tools: string[];
  };
  index: number;
  isInView: boolean;
}

function SkillBar({ skill, index, isInView }: SkillBarProps) {
  const [showTools, setShowTools] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setShowTools(true)}
      onMouseLeave={() => setShowTools(false)}
      className="relative"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-white">{skill.name}</h4>
        <span className="text-[#B3B3B3]">{skill.level}%</span>
      </div>

      <div className="w-full h-1 bg-[#1E1E1E] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.5, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
          className="h-full bg-white"
        />
      </div>

      {/* Tools Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={showTools ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className="mt-4 flex flex-wrap gap-2"
      >
        {skill.tools.map((tool) => (
          <span
            key={tool}
            className="px-3 py-1 bg-[#1E1E1E] text-sm text-[#B3B3B3] border border-[#1E1E1E] hover:border-white transition-colors duration-300"
          >
            {tool}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
