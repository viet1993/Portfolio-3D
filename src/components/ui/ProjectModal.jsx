import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ProjectModal = ({ project, onClose }) => {
  const [imgError, setImgError] = useState(false);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="glass-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          style={{ border: `1px solid ${project.color}44` }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className={`h-48 rounded-t-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
          >
            {/* Decorative circles */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
              style={{ background: project.color }} />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full opacity-10"
              style={{ background: "#00D9FF" }} />

            <div className="text-center z-10">
              <div className="text-7xl mb-2">{project.emoji}</div>
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest"
                style={{ background: `${project.color}33`, color: project.color, border: `1px solid ${project.color}55` }}
              >
                {project.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Title */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{project.name}</h2>
                <p className="text-white/50 text-sm">{project.shortDesc}</p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200 ml-4 flex-shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Description */}
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">
                Key Features
              </h3>
              <ul className="grid grid-cols-2 gap-2">
                {project.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                    <span style={{ color: project.color }}>✦</span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tech-badge">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary flex-1 text-center text-sm py-3"
                style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}88)` }}
              >
                🚀 View Live Demo
              </motion.a>
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-outline flex-1 text-center text-sm py-3"
                style={{ borderColor: project.color, color: project.color }}
              >
                🐙 Source Code
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
