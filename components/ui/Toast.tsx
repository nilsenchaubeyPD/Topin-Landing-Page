'use client';

import { AnimatePresence, motion } from 'framer-motion';

export function Toast({ message, show }: { message: string; show: boolean }) {
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className="rounded-pill bg-navy px-5 py-3 text-[14px] font-bold text-white shadow-float"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
