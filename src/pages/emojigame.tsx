import { useEffect, useState } from "react";
import { cards as initialCards, type CardType } from "../data/cards";
import Board from "../components/board";
import Layout from "../components/layout";

export default function Game() {
  const [cards, setCards] = useState<CardType[]>(initialCards);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const matchSound = new Audio("/sounds/match.wav");
  const complete = new Audio("/sounds/complete.wav");
  const [matches, setMatches] = useState(0);

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
    if (
      flippedIndexes.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) {
      return;
    }

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

        matchSound.currentTime = 0;
        matchSound.play();

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
    const allMatched = cards.every(card => card.isMatched);

    if (allMatched && !gameCompleted) {
      complete.currentTime = 0;
      complete.play();
      setGameCompleted(true);
    }
  }, [cards, gameCompleted]);

  return (
    <Layout>
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          🎯 Emoji Memory Game
        </h2>

        <p className="text-gray-600">
          Matches: {matches} / {initialCards.length / 2}
        </p>

        <Board cards={cards} onCardClick={handleCardClick} />

        {gameCompleted && (
          <>
            <p className="text-green-600 text-xl font-semibold animate-pulse">
              🎉 Congratulations! You won!
            </p>

            <button
              onClick={restartGame}
              className="px-6 py-2 bg-green-600 text-white rounded-lg
                         hover:bg-green-700 transition font-semibold"
            >
              🔄 Play Again
            </button>
          </>
        )}
      </div>
    </Layout>
  );
}
