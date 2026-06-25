import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { aboutData, experiences } from "../../constants";

const StatCard = ({ value, label, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="glass-card rounded-2xl p-6 text-center group hover:border-primary/40 transition-all duration-300"
      whileHover={{ scale: 1.05, y: -4 }}
    >
      <p className="text-3xl font-bold gradient-text mb-1">{value}</p>
      <p className="text-white/50 text-sm">{label}</p>
    </motion.div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 overflow-hidden" ref={sectionRef}>
      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-5 blur-3xl"
        style={{ background: "radial-gradient(circle, #915EFF, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Get to know me
          </p>
          <h2 className="section-title text-white">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio + Details */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Avatar placeholder with initials */}
            <div className="flex items-center gap-5 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-900 flex items-center justify-center text-3xl font-bold text-white shadow-neon flex-shrink-0">
                VT
              </div>
              <div>
                <h3 className="text-white font-bold text-xl mb-5">Việt Trần</h3>
                <p className="text-primary text-sm">Product Engineering</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-xs">Available for hire</span>
                </div>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed mb-8 text-base">
              {aboutData.bio}
            </p>

            {/* Detail grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {aboutData.details.map((item) => (
                <div key={item.label} className="glass rounded-xl p-4">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-white font-medium text-sm">{item.value}</p>
                </div>
              ))}
            </div>

            <motion.a
              href="/resume.pdf"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Resume
            </motion.a>
          </motion.div>

          {/* Right: Stats + Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {aboutData.stats.map((stat, i) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} delay={0.5 + i * 0.1} />
              ))}
            </div>

            {/* Experience Timeline */}
            <h3 className="text-white font-bold text-lg mb-6">Experience</h3>
            <div className="relative">
              <div className="timeline-line absolute left-4 top-2 bottom-2 w-0.5" />

              <div className="space-y-6 pl-12">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.15 }}
                    className="relative glass-card rounded-xl p-4"
                    style={{ borderColor: `${exp.color}33` }}
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute -left-[2.85rem] top-5 w-3 h-3 rounded-full border-2 border-black"
                      style={{ background: exp.color, boxShadow: `0 0 8px ${exp.color}` }}
                    />

                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-white font-semibold text-sm">{exp.title}</p>
                        <p className="text-sm" style={{ color: exp.color }}>{exp.company}</p>
                      </div>
                      <span className="text-white/40 text-xs glass px-2 py-1 rounded-full whitespace-nowrap ml-2">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed">{exp.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
