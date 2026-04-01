import { motion } from "framer-motion";

export default function SkeletonCard({ index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="glass rounded-xl overflow-hidden"
    >
      <div className="shimmer h-80 w-full" />
      <div className="p-3 space-y-2">
        <div className="shimmer h-4 w-3/4 rounded" />
        <div className="shimmer h-3 w-1/3 rounded" />
      </div>
    </motion.div>
  );
}
