import { motion } from "framer-motion";

const filmEmojis = ["🎬", "🍿", "🎥", "🎞️", "📽️", "🎭"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-800/30 mt-12">
      {/* Gradient glow line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* Scrolling film strip */}
      <div className="overflow-hidden py-4 opacity-20">
        <motion.div
          className="flex gap-8 text-2xl whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(20)].map((_, i) => (
            <span key={i}>{filmEmojis[i % filmEmojis.length]}</span>
          ))}
          {[...Array(20)].map((_, i) => (
            <span key={`dup-${i}`}>{filmEmojis[i % filmEmojis.length]}</span>
          ))}
        </motion.div>
      </div>

      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        />
      </div>
    </footer>
  );
}
