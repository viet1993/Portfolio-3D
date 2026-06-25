import { useState, useRef, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { skillCategories } from "../../constants";
import SkillsGlobe from "../canvas/SkillsGlobe";

const SkillBar = ({ name, level, icon, color, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
            {name}
          </span>
        </div>
        <span className="text-xs font-mono" style={{ color }}>
          {level}%
        </span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeOut" }}
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        />
      </div>
    </motion.div>
  );
};

const CategoryTab = ({ category, isActive, onClick }) => (
  <button
    onClick={() => onClick(category.name)}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
      isActive
        ? "text-white shadow-lg"
        : "glass text-white/50 hover:text-white/80"
    }`}
    style={isActive ? { background: `linear-gradient(135deg, ${category.color}44, ${category.color}22)`, border: `1px solid ${category.color}55`, boxShadow: `0 0 20px ${category.color}22` } : {}}
  >
    <span>{category.icon}</span>
    {category.name}
  </button>
);

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].name);
  const [activeGlobeSkill, setActiveGlobeSkill] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const currentCategory = skillCategories.find((c) => c.name === activeCategory);

  return (
    <section id="skills" className="relative py-24" ref={sectionRef}>
      {/* Background decoration */}
      <div
        className="absolute top-1/2 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl -translate-y-1/2"
        style={{ background: "radial-gradient(circle, #00D9FF, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3">
            My Expertise
          </p>
          <h2 className="section-title text-white">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle mt-4 mx-auto text-center text-white/50">
            Technologies I work with daily — hover the globe to explore!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Skill Bars */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {skillCategories.map((cat) => (
                <CategoryTab
                  key={cat.name}
                  category={cat}
                  isActive={activeCategory === cat.name}
                  onClick={setActiveCategory}
                />
              ))}
            </div>

            {/* Skill bars */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-2xl p-6 space-y-5"
              style={{ borderColor: `${currentCategory?.color}33` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${currentCategory?.color}22`, border: `1px solid ${currentCategory?.color}44` }}
                >
                  {currentCategory?.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold">{currentCategory?.name}</h3>
                  <p className="text-white/40 text-xs">
                    {currentCategory?.skills.length} technologies
                  </p>
                </div>
              </div>

              {currentCategory?.skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  color={currentCategory.color}
                  delay={i * 0.08}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D Globe */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="glass-card rounded-2xl p-4 h-[480px] relative overflow-hidden">
              <div className="absolute top-4 left-4 z-10">
                <p className="text-white/50 text-xs uppercase tracking-widest">Interactive Globe</p>
                {activeGlobeSkill && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-secondary text-sm font-bold mt-1"
                  >
                    ✦ {activeGlobeSkill}
                  </motion.p>
                )}
              </div>

              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  </div>
                }
              >
                <SkillsGlobe
                  onSkillClick={(skill) =>
                    setActiveGlobeSkill((prev) => (prev === skill ? null : skill))
                  }
                  activeSkill={activeGlobeSkill}
                />
              </Suspense>

              <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs">
                Drag to rotate · Click a skill to highlight
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
