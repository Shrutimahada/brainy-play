import { useEffect, useState } from "react";
import Layout from "../components/layout";

/* 🔢 Generate random sequence */
function generateSequence(length: number) {
  return Array.from({ length }, () => Math.floor(Math.random() * 9) + 1);
}

export default function NumberSequenceGame() {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [showSequence, setShowSequence] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  /* 🔊 Sounds */
  const correctSound = new Audio("/sounds/match.wav");
  const gameOverSound = new Audio("/sounds/complete.wav");

  useEffect(() => {
    startRound();
  }, []);

  /* 🔊 Play sound on level up */
  useEffect(() => {
    if (level > 1) {
      correctSound.currentTime = 0;
      correctSound.play();
    }
  }, [level]);

  /* 🔊 Play sound on game over */
  useEffect(() => {
    if (gameOver) {
      gameOverSound.currentTime = 0;
      gameOverSound.play();
    }
  }, [gameOver]);

  const startRound = () => {
    const newSeq = generateSequence(level + 2);
    setSequence(newSeq);
    setUserInput([]);
    setShowSequence(true);
    setGameOver(false);

    setTimeout(() => {
      setShowSequence(false);
    }, 2000);
  };

  const handleChange = (value: string, index: number) => {
    const newInput = [...userInput];
    newInput[index] = value;
    setUserInput(newInput);
  };

  const checkAnswer = () => {
    const isCorrect = sequence.every(
      (num, i) => num.toString() === userInput[i]
    );

    if (isCorrect) {
      setLevel(prev => prev + 1);
      startRound();
    } else {
      setGameOver(true);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center gap-6 select-none">
        <h2 className="text-3xl md:text-4xl font-bold">
          🔢 Number Sequence Memory
        </h2>

        <p className="text-gray-600">Level: {level}</p>

        {/* 👀 Show sequence */}
        {showSequence && (
          <div className="flex gap-4 text-4xl font-bold">
            {sequence.map((num, i) => (
              <span key={i}>{num}</span>
            ))}
          </div>
        )}

        {/* ✍️ User input */}
        {!showSequence && !gameOver && (
          <div className="flex gap-3">
            {sequence.map((_, i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="
                  w-12 h-12 text-center text-xl 
                  border rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                  touch-manipulation
                "
                onChange={e => handleChange(e.target.value, i)}
              />
            ))}
          </div>
        )}

        {/* ✅ Submit */}
        {!showSequence && !gameOver && (
          <button
            onPointerDown={(e) => {
              e.preventDefault();
              checkAnswer();
            }}
            className="
              px-6 py-2 
              bg-indigo-600 text-white 
              rounded-lg font-semibold
              hover:bg-indigo-700
              active:scale-95
              touch-manipulation
            "
          >
            Submit
          </button>
        )}

        {/* ❌ Game Over */}
        {gameOver && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-red-600 text-xl font-semibold animate-pulse">
              ❌ Game Over
            </p>
            <button
              onPointerDown={() => {
                setLevel(1);
                startRound();
              }}
              className="
                px-6 py-2 
                bg-green-600 text-white 
                rounded-lg font-semibold
                hover:bg-green-700
                touch-manipulation
              "
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
