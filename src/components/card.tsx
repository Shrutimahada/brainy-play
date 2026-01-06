import { type CardType } from "../data/cards";

type Props = {
  card: CardType;
  onClick: () => void;
};

export default function Card({ card, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-20 h-20 bg-indigo-500 text-3xl rounded flex items-center justify-center"
    >
      {card.isFlipped || card.isMatched ? card.value : "❓"}
    </button>
  );
}
