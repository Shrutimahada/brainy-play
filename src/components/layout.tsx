import { type ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">

      {/* 🌈 Animated Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 animate-gradient" />

      {/* Floating blur shapes */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-30"
        animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"
        animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-indigo-600 text-white p-4 shadow-md overflow-hidden h-40 md:h-24"
      >
        {/* Floating circles */}
        <motion.div
          className="absolute w-12 h-12 bg-pink-400 rounded-full opacity-50 top-10 left-5"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-16 h-16 bg-yellow-400 rounded-full opacity-40 top-20 right-10"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Title */}
        <div className="relative max-w-6xl mx-auto flex items-center justify-center h-full">
          <h1 className="text-5xl font-bold text-center">
            🧠 Memory Games
          </h1>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        {children}
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white/70 backdrop-blur-md text-gray-700 p-4 mt-auto shadow-inner"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="text-sm">
            🧠 Memory Games Hub
          </span>

          <span className="text-sm">
            Feedback:&nbsp;
            <a
              href="mailto:yourname@email.com"
              className="text-indigo-600 hover:underline font-medium"
            >
              shrutimahada249@gmail.com
            </a>
          </span>
        </div>
      </motion.footer>
    </div>
  );
}
