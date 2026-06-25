import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { contactInfo } from "../../constants";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState("");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate send
    await new Promise((r) => setTimeout(r, 2000));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="relative py-24" ref={sectionRef}>
      {/* Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, #915EFF 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Let's Work Together
          </p>
          <h2 className="section-title text-white">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle mt-4 mx-auto text-center text-white/50">
            Have a project in mind? I'd love to hear about it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-white font-bold text-2xl mb-4">
              Let's build something <span className="gradient-text">amazing</span> together
            </h3>
            <p className="text-white/60 leading-relaxed mb-10">
              I'm currently available for freelance projects and full-time positions. If you have a
              project that you want to get started or need help with something, feel free to contact me.
            </p>

            {/* Contact cards */}
            <div className="space-y-4">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 glass-card rounded-xl p-4 group hover:border-primary/40 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xl group-hover:bg-primary/20 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest">{item.label}</p>
                    <p className="text-white text-sm font-medium">{item.value}</p>
                  </div>
                  <svg
                    className="w-4 h-4 text-white/20 group-hover:text-primary ml-auto transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-white font-bold text-xl mb-6">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                    placeholder="John Doe"
                    required
                    className="input-field"
                    style={focused === "name" ? { borderColor: "#915EFF" } : {}}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                    placeholder="john@example.com"
                    required
                    className="input-field"
                    style={focused === "email" ? { borderColor: "#915EFF" } : {}}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused("")}
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className="input-field resize-none"
                    style={focused === "message" ? { borderColor: "#915EFF" } : {}}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={sending || sent}
                  whileHover={{ scale: sending || sent ? 1 : 1.02 }}
                  whileTap={{ scale: sending || sent ? 1 : 0.98 }}
                  className="btn-primary w-full py-3.5 flex items-center justify-center gap-3 text-base"
                  style={sent ? { background: "linear-gradient(135deg, #10B981, #059669)" } : {}}
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : sent ? (
                    <>
                      <span>✓</span>
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
