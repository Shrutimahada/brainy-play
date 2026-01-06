export type CardType = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const values = ["🍎", "🍌", "🍇", "🍉", "🍒", "🥝"];

export const cards: CardType[] = values
  .flatMap((value, index) => [
    { id: index * 2, value, isFlipped: false, isMatched: false },
    { id: index * 2 + 1, value, isFlipped: false, isMatched: false },
  ])
  .sort(() => Math.random() - 0.5);
