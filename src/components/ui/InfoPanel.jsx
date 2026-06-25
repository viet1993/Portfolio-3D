import { motion, AnimatePresence } from "framer-motion";

// --- Content Renderers ---

const SkillsContent = ({ content }) => (
  <div className="space-y-3">
    <p className="text-white/60 text-sm mb-4">{content.description}</p>
    {content.items.map((skill) => (
      <div key={skill.name}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-white/80 flex items-center gap-2">
            {skill.icon} {skill.name}
          </span>
          <span className="text-xs font-mono text-primary">{skill.level}%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #915EFF, #00D9FF)" }}
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ duration: 1, delay: 0.1 }}
          />
        </div>
      </div>
    ))}
  </div>
);

const AboutContent = ({ content }) => (
  <div>
    <p className="text-white/60 text-sm leading-relaxed mb-5">{content.bio}</p>
    <div className="grid grid-cols-2 gap-2 mb-5">
      {content.details.map((d) => (
        <div key={d.label} className="glass rounded-xl p-3 flex items-center gap-2">
          <span>{d.icon}</span>
          <span className="text-xs text-white/70">{d.label}</span>
        </div>
      ))}
    </div>
    <div>
      <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Currently Reading</p>
      <ul className="space-y-1">
        {content.currentlyReading.map((book) => (
          <li key={book} className="text-xs text-white/60 flex items-center gap-2">
            <span className="text-primary">▸</span> {book}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const HobbiesContent = ({ content }) => (
  <div>
    <p className="text-white/60 text-sm mb-4">{content.description}</p>
    <div className="space-y-3">
      {content.hobbies.map((h) => (
        <div key={h.name} className="glass rounded-xl p-3 flex items-center gap-3">
          <span className="text-2xl">{h.icon}</span>
          <div>
            <p className="text-white text-sm font-semibold">{h.name}</p>
            <p className="text-white/50 text-xs">{h.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ProjectsContent = ({ content }) => (
  <div>
    <p className="text-white/60 text-sm mb-4">{content.description}</p>
    <div className="space-y-3">
      {content.projects.map((p) => (
        <div
          key={p.name}
          className="rounded-xl p-4"
          style={{
            background: `linear-gradient(135deg, ${p.color}15, transparent)`,
            border: `1px solid ${p.color}33`,
          }}
        >
          <div className="flex items-start justify-between mb-2">
            <p className="text-white font-semibold text-sm">{p.name}</p>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${p.color}22`, color: p.color }}>
              {p.status}
            </span>
          </div>
          <p className="text-white/50 text-xs mb-3">{p.desc}</p>
          <div className="flex flex-wrap gap-1">
            {p.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-white/10 text-white/50">{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MusicContent = ({ content }) => (
  <div>
    <p className="text-white/60 text-sm mb-4">{content.description}</p>
    <div className="space-y-3">
      {content.playlists.map((p) => (
        <div key={p.name} className="glass rounded-xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-xl flex-shrink-0">
            {p.icon}
          </div>
          <div>
            <p className="text-white text-sm font-semibold">{p.name}</p>
            <p className="text-white/50 text-xs">{p.mood}</p>
          </div>
          <div className="ml-auto flex gap-0.5">
            {[3, 5, 4, 6, 3].map((h, i) => (
              <motion.div
                key={i}
                className="w-1 bg-primary rounded-full"
                animate={{ height: [`${h * 3}px`, `${h * 6}px`, `${h * 3}px`] }}
                transition={{ duration: 0.8 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TimelineContent = ({ content }) => (
  <div>
    <p className="text-white/60 text-sm mb-5">{content.description}</p>
    <div className="relative pl-8">
      <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent" />
      <div className="space-y-4">
        {content.timeline.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="relative"
          >
            <div className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-primary border-2 border-[#050816] shadow-neon" />
            <span className="text-xs font-mono text-primary">{item.year}</span>
            <p className="text-white/70 text-sm">{item.icon} {item.event}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const SetupContent = ({ content }) => (
  <div>
    <p className="text-white/60 text-sm mb-4">{content.description}</p>
    <div className="grid grid-cols-1 gap-2">
      {content.gear.map((g) => (
        <div key={g.name} className="glass rounded-xl p-3 flex items-center gap-3">
          <span className="text-xl">{g.icon}</span>
          <div>
            <p className="text-white text-sm font-semibold">{g.name}</p>
            <p className="text-white/40 text-xs">{g.type}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ContactContent = ({ content }) => (
  <div>
    <p className="text-white/60 text-sm mb-5">{content.description}</p>
    <div className="space-y-3">
      {content.links.map((l) => (
        <motion.a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 4 }}
          className="flex items-center gap-3 glass rounded-xl p-3 group hover:border-primary/40 transition-all"
        >
          <span className="text-xl">{l.icon}</span>
          <div>
            <p className="text-white/40 text-xs">{l.label}</p>
            <p className="text-white text-sm">{l.value}</p>
          </div>
          <span className="ml-auto text-white/20 group-hover:text-primary transition-colors">→</span>
        </motion.a>
      ))}
    </div>
  </div>
);

// Content type router
const ContentRenderer = ({ obj }) => {
  const { content } = obj;
  switch (content.type) {
    case "skills": return <SkillsContent content={content} />;
    case "about": return <AboutContent content={content} />;
    case "hobbies": return <HobbiesContent content={content} />;
    case "projects": return <ProjectsContent content={content} />;
    case "music": return <MusicContent content={content} />;
    case "timeline": return <TimelineContent content={content} />;
    case "setup": return <SetupContent content={content} />;
    case "contact": return <ContactContent content={content} />;
    default: return null;
  }
};

// --- Main Info Panel ---
const InfoPanel = ({ selectedObject, onClose }) => {
  return (
    <AnimatePresence>
      {selectedObject && (
        <motion.div
          key={selectedObject.id}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="fixed top-0 right-0 h-full w-full max-w-sm flex flex-col"
          style={{
            background: "rgba(10, 8, 28, 0.95)",
            backdropFilter: "blur(20px)",
            borderLeft: `1px solid ${selectedObject.color}33`,
            zIndex: 20000000,
          }}
        >
          {/* Header */}
          <div
            className="p-6 flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${selectedObject.color}22, transparent)`,
              borderBottom: `1px solid ${selectedObject.color}22`,
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${selectedObject.color}22`, border: `1px solid ${selectedObject.color}44` }}
                >
                  {selectedObject.emoji}
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg leading-tight">{selectedObject.title}</h2>
                  <p className="text-sm" style={{ color: selectedObject.color }}>
                    {selectedObject.label}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full glass flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all flex-shrink-0 mt-1"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <ContentRenderer obj={selectedObject} />
          </div>

          {/* Footer hint */}
          <div className="p-4 border-t border-white/5 flex-shrink-0">
            <p className="text-white/20 text-xs text-center">
              Click another object to explore more ✦
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoPanel;
