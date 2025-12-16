import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Mail, Linkedin, Github, Download, Send, CheckCircle2 } from 'lucide-react';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:Siddhartha.vfx@gmail.com',
      label: 'Siddhartha.vfx@gmail.com',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/siddhartha',
      label: 'linkedin.com/in/siddhartha tadala',
    },
    {
      name: 'Phone Number',
      icon: Github,
      href: 'https://github.com/siddhartha',
      label: '9052621279',
    },
  ];

  return (
    <section id="contact" ref={ref} className="min-h-screen py-32 px-6 lg:px-12 border-t border-[#1E1E1E]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p className="text-[#B3B3B3] mb-4 tracking-widest uppercase">Get In Touch</p>
          <h2 className="mb-6">Let's Work Together</h2>
          <p className="text-[#B3B3B3] text-xl max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities.
            Whether you have a question or just want to say hi, feel free to reach out.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-[#B3B3B3] mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-transparent border border-[#1E1E1E] px-4 py-3 text-white focus:border-white transition-colors duration-300 outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[#B3B3B3] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-transparent border border-[#1E1E1E] px-4 py-3 text-white focus:border-white transition-colors duration-300 outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[#B3B3B3] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full bg-transparent border border-[#1E1E1E] px-4 py-3 text-white focus:border-white transition-colors duration-300 outline-none resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: isSubmitted ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitted ? 1 : 0.98 }}
                className={`w-full px-8 py-4 flex items-center justify-center gap-2 transition-all duration-300 ${
                  isSubmitted
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-black hover:bg-[#B3B3B3]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                    />
                    <span>Sending...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle2 size={20} />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-12"
          >
            {/* Social Links */}
            <div>
              <h3 className="mb-6">Connect With Me</h3>
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4 text-[#B3B3B3] hover:text-white transition-colors duration-300 group"
                  >
                    <div className="w-12 h-12 border border-[#1E1E1E] flex items-center justify-center group-hover:border-white transition-colors duration-300">
                      <link.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-[#B3B3B3]">{link.name}</p>
                      <p className="group-hover:text-white transition-colors duration-300">
                        {link.label}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Download Resume */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="mb-6">Resume</h3>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Resume download would start here');
                }}
                className="inline-flex items-center gap-3 px-6 py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 group"
              >
                <Download size={20} className="group-hover:animate-bounce" />
                <span>Download Resume</span>
              </a>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="p-6 border border-[#1E1E1E]"
            >
              <div className="flex items-start gap-2 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5 animate-pulse" style={{position:'relative',top:'5px'}} />
                <div>
                  <h4 className="mb-2">Currently Available</h4>
                  <p className="text-[#B3B3B3]">
                    Open to full-time opportunities.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-32 pt-12 border-t border-[#1E1E1E] text-center"
        >
          <p className="text-[#B3B3B3]">
            © {new Date().getFullYear()} Siddhartha. Designed & Built with passion.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
