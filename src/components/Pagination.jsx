import { motion } from "framer-motion";

export default function Pagination({ currentPage, totalResults, onPageChange }) {
  const totalPages = Math.ceil(totalResults / 10);
  if (totalPages <= 1) return null;

  // Build page numbers to show (max 5 around current)
  const pages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center gap-2 mt-10"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 rounded-lg glass text-sm text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500/50 transition-colors"
      >
        ← Prev
      </motion.button>

      {start > 1 && (
        <>
          <PageButton page={1} current={currentPage} onClick={onPageChange} />
          {start > 2 && <span className="text-slate-600 px-1">...</span>}
        </>
      )}

      {pages.map((p) => (
        <PageButton key={p} page={p} current={currentPage} onClick={onPageChange} />
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-slate-600 px-1">...</span>}
          <PageButton page={totalPages} current={currentPage} onClick={onPageChange} />
        </>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 rounded-lg glass text-sm text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500/50 transition-colors"
      >
        Next →
      </motion.button>
    </motion.div>
  );
}

function PageButton({ page, current, onClick }) {
  const isActive = page === current;
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => onClick(page)}
      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
        isActive
          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white glow-blue"
          : "glass text-slate-400 hover:text-white hover:border-blue-500/50"
      }`}
    >
      {page}
    </motion.button>
  );
}
