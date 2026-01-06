import Card from "./card";
import { type CardType } from "../data/cards";

type Props = {
  cards: CardType[];
  onCardClick: (index: number) => void;
};

export default function Board({ cards, onCardClick }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => onCardClick(index)}
        />
      ))}
    </div>
  );
}
