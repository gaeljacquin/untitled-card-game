import { ABCards } from './card';

export class PokerHand {
  constructor(
    public readonly name: string,
    public readonly points: number,
    public readonly ordinal: number,
    public readonly cards: ABCards
  ) {}
}
