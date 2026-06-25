import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "../../constants";
import ProjectModal from "../ui/ProjectModal";

const categories = ["All", "Full-Stack", "Frontend", "Backend", "AI/ML"];

// 3D Flip Card
const ProjectCard = ({ project, index, onClick }) => {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card-3d-container h-64"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="card-3d w-full h-full"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front Face */}
        <div
          className="card-face w-full h-full glass-card flex flex-col items-center justify-center p-6 cursor-pointer"
          style={{ borderColor: `${project.color}44` }}
        >
          {/* Gradient background accent */}
          <div
            className={`absolute inset-0 rounded-2xl opacity-10 bg-gradient-to-br ${project.gradient}`}
          />

          <div className="relative z-10 text-center">
            <div className="text-5xl mb-4">{project.emoji}</div>
            <h3 className="text-white font-bold text-lg mb-2">{project.name}</h3>
            <p className="text-white/50 text-sm">{project.shortDesc}</p>

            <div className="mt-4 flex justify-center">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest"
                style={{
                  background: `${project.color}22`,
                  color: project.color,
                  border: `1px solid ${project.color}44`,
                }}
              >
                {project.category}
              </span>
            </div>
          </div>

          {/* Hover hint */}
          <p className="absolute bottom-4 left-0 right-0 text-center text-white/20 text-xs">
            Hover to flip ↻
          </p>
        </div>

        {/* Back Face */}
        <div
          className="card-back card-face w-full h-full flex flex-col justify-between p-5 cursor-pointer"
          style={{
            background: `linear-gradient(135deg, ${project.color}22, #1d1836)`,
            border: `1px solid ${project.color}55`,
            borderRadius: "16px",
          }}
          onClick={() => onClick(project)}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold">{project.name}</h3>
              <span className="text-xl">{project.emoji}</span>
            </div>
            <p className="text-white/60 text-xs leading-relaxed mb-4 line-clamp-3">
              {project.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-md"
                  style={{ background: `${project.color}22`, color: project.color }}
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="text-xs px-2 py-0.5 rounded-md bg-white/10 text-white/40">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Click to view detail CTA */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${project.color}, ${project.color}88)`,
              boxShadow: `0 4px 15px ${project.color}44`,
            }}
          >
            View Details
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24" ref={sectionRef}>
      {/* Background */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-5 blur-3xl"
        style={{ background: "radial-gradient(circle, #915EFF, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            My Portfolio
          </p>
          <h2 className="section-title text-white">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle mt-4 mx-auto text-center text-white/50">
            Hover cards to flip · Click to explore details
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-primary text-white shadow-neon"
                  : "glass text-white/50 hover:text-white/80 hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project, i) => (
            <motion.div key={project.id} layout>
              <ProjectCard
                project={project}
                index={i}
                onClick={setSelectedProject}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All on GitHub */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-12"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline flex items-center gap-2"
          >
            <span>View All on GitHub</span>
            <span>🐙</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
