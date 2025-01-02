import { ABCard, ABJoker } from './card';

type AnyABCard = ABCard | ABJoker;
type ABCards = Array<AnyABCard>;

interface IABWord {
  cards: ABCards;
  valid: boolean;
}

export class ABWord implements IABWord {
  public cards: ABCards;
  public valid: boolean = false;

  constructor() {
    const startingCard = new ABCard(true);
    this.cards = [startingCard];
  }

  public getStartingCard(): ABCard {
    return this.cards[0];
  }

  public addCard(card: AnyABCard, index: number): void {
    if (this.cards.length === 1) {
      this.cards.push(card);
    } else if (index > 0) {
      // Starting card cannot be moved
      this.cards.splice(index, 0, card);
    }
  }

  public removeCard(index = 0): void {
    if (index === 0) {
      this.cards.pop();
    } else {
      this.cards.splice(index, 1);
    }
  }

  public swapCards(initial: number, target: number): void {
    const placeholder = this.cards[initial];
    this.cards[initial] = this.cards[target];
    this.cards[target] = placeholder;
  }

  public countCards(): number {
    return this.cards.length;
  }

  public countJokers(): number {
    return this.cards.filter((card) => card instanceof ABJoker).length;
  }

  public setAsValid(): void {
    this.valid = true;
  }

  public getPlainWord(): string {
    return this.cards.map((card) => card.getLetter()).join('');
  }
}
