import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const philosophyPoints = [
    'Design is problem-solving, not decoration',
    'Every pixel should have a clear purpose',
    'Simplicity creates clarity and impact',
    'Data informs decisions; empathy guides outcomes',
  ];

  return (
    <section id="about" ref={ref} className="min-h-screen flex items-center py-32 px-6 lg:px-12 border-t border-[#1E1E1E]">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="relative overflow-hidden aspect-[4/5] bg-[#1E1E1E]">
              <motion.div
                initial={{ scale: 1.2 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 1.2 }}
                className="w-full h-full"
              >
                <ImageWithFallback
                  src="/Website Picture.jpeg"
                  alt="Siddhartha"
                  className="w-full h-full object-cover grayscale"
                />
              </motion.div>
              <motion.div
                initial={{ scaleX: 1 }}
                animate={isInView ? { scaleX: 0 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute inset-0 bg-black origin-right"
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-[#B3B3B3] mb-4 tracking-widest uppercase">About Me</p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              Designing with Purpose & Precision
            </motion.h2>

            <div className="space-y-6 mb-12">
              {[
                "I’m Siddhartha, a Senior UI/UX Designer with over 6 years of experience crafting meaningful digital experiences that balance user needs with business goals.",
                "My work spans UI/UX design, visual design, and motion, allowing me to approach problems holistically—from strategy and research to high-fidelity execution. I believe great design is not just about aesthetics, but about clarity, usability, and impact.",
                "I specialize in designing clean, intuitive, and scalable interfaces for web and mobile products. With a strong foundation in user psychology and product thinking, I focus on creating experiences that are easy to use, engaging to interact with, and effective in driving results.",
                 "Whether working with startups or established businesses, my goal remains the same: to turn complex problems into simple, elegant solutions that users enjoy and businesses trust.",
              ].map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="text-[#B3B3B3] leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <h3 className="mb-6">Design Philosophy</h3>
              <div className="space-y-4">
                {philosophyPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="flex items-start gap-4 group cursor-default"
                  >
                    <div className="w-1 h-1 bg-white mt-3 group-hover:scale-150 transition-transform duration-300" />
                    <p className="text-[#B3B3B3] group-hover:text-white transition-colors duration-300">
                      {point}
                    </p>
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
