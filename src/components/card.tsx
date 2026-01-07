import { type CardType } from "../data/cards";

type Props = {
  card: CardType;
  onClick: () => void;
};

export default function Card({ card, onClick }: Props) {
  return (
    <button
      type="button" // ensures correct semantics
      onPointerDown={(e) => {
        e.preventDefault(); // prevents double-tap or ghost click
        onClick();          // call your original click handler
      }}
      className="
        w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
        bg-indigo-500 
        text-3xl rounded 
        flex items-center justify-center 
        cursor-pointer 
        select-none 
        active:scale-95
        pointer-events-auto
        touch-manipulation
      "
    >
      {card.isFlipped || card.isMatched ? card.value : "❓"}
    </button>
  );
}
