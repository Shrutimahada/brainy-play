import { useEffect, useState, useRef } from "react";
import { cards as initialCards, type CardType } from "../data/cards";
import Board from "../components/board";
import Layout from "../components/layout";

export default function EmojiGame() {
  const [cards, setCards] = useState<CardType[]>(initialCards);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [matches, setMatches] = useState(0);

  const matchSound = useRef<HTMLAudioElement | null>(null);
  const completeSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    matchSound.current = new Audio("/sounds/match.wav");
    completeSound.current = new Audio("/sounds/complete.wav");
  }, []);

  const restartGame = () => {
    const resetCards = initialCards.map(card => ({
      ...card,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(resetCards);
    setFlippedIndexes([]);
    setMatches(0);
    setGameCompleted(false);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndexes.length >= 2 || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedIndexes([...flippedIndexes, index]);
  };

  useEffect(() => {
    if (flippedIndexes.length === 2) {
      const [first, second] = flippedIndexes;

      if (cards[first].value === cards[second].value) {
        const newCards = [...cards];
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;

        matchSound.current?.play();

        setCards(newCards);
        setMatches(prev => prev + 1);
        setFlippedIndexes([]);
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[first].isFlipped = false;
          newCards[second].isFlipped = false;
          setCards(newCards);
          setFlippedIndexes([]);
        }, 1000);
      }
    }
  }, [flippedIndexes, cards]);

  useEffect(() => {
    if (cards.every(card => card.isMatched) && !gameCompleted) {
      completeSound.current?.play();
      setGameCompleted(true);
    }
  }, [cards, gameCompleted]);

  return (
    <Layout>
      <div className="flex flex-col items-center gap-6 px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
          🎯 Emoji Memory Game
        </h2>

        <p className="text-gray-600 text-lg sm:text-xl">
          Matches: {matches} / {initialCards.length / 2}
        </p>

        <Board cards={cards} onCardClick={handleCardClick} />

        {gameCompleted && (
          <div className="flex flex-col items-center gap-4 mt-4">
            <p className="text-green-600 text-xl sm:text-2xl font-semibold animate-pulse text-center">
              🎉 Congratulations! You won!
            </p>

            <button
              onPointerDown={restartGame}
              className="px-8 py-3 sm:px-10 sm:py-4 bg-green-600 text-white rounded-lg
                         hover:bg-green-700 transition font-semibold touch-manipulation"
            >
              🔄 Play Again
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
