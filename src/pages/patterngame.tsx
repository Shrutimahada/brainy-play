import { useEffect, useState } from "react";
import Layout from "../components/layout";

/* 🎨 Color palette */
const COLORS = [
  "bg-indigo-500",
  "bg-pink-500",
  "bg-emerald-500",
  "bg-yellow-400",
  "bg-orange-500",
  "bg-purple-500",
];

type Cell = {
  id: number;
  active: boolean;
  color: string;
};

export default function PatternGame() {
  const [level, setLevel] = useState(1);
  const [cells, setCells] = useState<Cell[]>([]);
  const [showPattern, setShowPattern] = useState(true);
  const [selected, setSelected] = useState<number[]>([]);
  const [status, setStatus] = useState<"playing" | "lost">("playing");
  const [showSuccess, setShowSuccess] = useState(false);
  const matchSound = new Audio("/sounds/match.wav");
  const complete = new Audio("/sounds/complete.wav");


  const gridSize = 3 + Math.floor(level / 3);
  const totalCells = gridSize * gridSize;

  /* 🔁 Generate pattern */
  useEffect(() => {
    const activeCount = Math.min(level + 2, totalCells);
    const activeIds = shuffle(
      Array.from({ length: totalCells }, (_, i) => i)
    ).slice(0, activeCount);

    setCells(
      Array.from({ length: totalCells }, (_, i) => ({
        id: i,
        active: activeIds.includes(i),
        color: COLORS[i % COLORS.length],
      }))
    );

    setSelected([]);
    setShowPattern(true);
    setShowSuccess(false);
    setStatus("playing");

    const timer = setTimeout(() => setShowPattern(false), 2000);
    return () => clearTimeout(timer);
  }, [level]);

  function shuffle(arr: number[]) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  function handleClick(id: number) {
    if (showPattern || selected.includes(id) || status !== "playing") return;

    const newSelected = [...selected, id];
    setSelected(newSelected);

    const correctIds = cells.filter(c => c.active).map(c => c.id);

    /* ❌ Wrong selection */
    if (!correctIds.includes(id)) {
    complete.currentTime = 0;
    complete.play();

      setStatus("lost");
      return;
    }

    /* ✅ Correct round */
    if (newSelected.length === correctIds.length) {

    matchSound.currentTime = 0; // reset sound
    matchSound.play();          // 🔊 PLAY SOUND

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        setLevel(prev => prev + 1);
      }, 1200);
    }
  }

  return (
    <Layout>
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center w-full max-w-md">
        <h2 className="text-3xl font-bold text-indigo-600">
          🟦 Pattern Memory Game
        </h2>

        <p className="mt-2 text-gray-600">Level {level}</p>

        {/* ✅ Success message */}
        {showSuccess && (
          <p className="mt-6 text-green-600 text-xl font-semibold animate-pulse">
            ✅ Correct!
          </p>
        )}

        {/* ❌ Loss message */}
        {status === "lost" && (
          <div className="mt-6">
            <p className="text-red-600 text-xl font-semibold animate-pulse">
              ❌ Wrong Pattern
            </p>
            <p className="mt-2 text-gray-600">
              You reached level {level}
            </p>
            <button
              onClick={() => setLevel(1)}
              className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
            >
              Restart
            </button>
          </div>
        )}

        {/* 🟦 Grid */}
        {status === "playing" && !showSuccess && (
          <div
            className="grid gap-3 mt-6 justify-center"
            style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
          >
            {cells.map(cell => (
              <div
                key={cell.id}
                onClick={() => handleClick(cell.id)}
                className={`w-14 h-14 rounded-lg cursor-pointer transition-all duration-300
                  ${
                    showPattern && cell.active
                      ? cell.color
                      : selected.includes(cell.id)
                      ? cell.color
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
