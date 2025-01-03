import { ABCard, ABJoker } from './card';

export type AnyABCard = ABCard | ABJoker;
export type ABCards = AnyABCard[];

export class ABWord {
  private cards: ABCards;
  private valid: boolean = false;

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

  public getCards(): ABCards {
    return this.cards;
  }

  public countCards(): number {
    return this.cards.length;
  }

  public countJokers(): number {
    return this.cards.filter((card) => card instanceof ABJoker).length;
  }

  public setValid(): void {
    this.valid = true;
  }

  public getValid(): boolean {
    return this.valid;
  }

  public getWord(): string {
    return this.cards.map((card) => card.getLetter()).join('');
  }
}
