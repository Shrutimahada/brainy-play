import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/layout";

type GameCard = {
  name: string;
  color: string;
  path: string;
  emoji: string;
};

const games: GameCard[] = [
  { name: "Emoji Memory Game", color: "bg-indigo-500", path: "/emoji", emoji: "🎯" },
  { name: "Number Sequence Memory", color: "bg-green-500", path: "/number", emoji: "🔢" },
  { name: "Color Memory Game", color: "bg-pink-500", path: "/colors", emoji: "🎨" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-12 text-gray-800 text-center"
      >
        <h2 className="text-4xl font-bold mb-12 text-gray-800 text-center">
            🕹️ Choose Your Game
        </h2>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {games.map((game, i) => (
          <motion.div
            key={game.name}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.2, type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${game.color} text-white p-8 rounded-xl shadow-lg cursor-pointer flex flex-col items-center justify-center gap-4`}
            onClick={() => navigate(game.path)}
          >
            <span className="text-5xl">{game.emoji}</span>
            <span className="text-xl font-semibold text-center">{game.name}</span>
          </motion.div>
        ))}
      </div>
    </Layout>
  );
}
