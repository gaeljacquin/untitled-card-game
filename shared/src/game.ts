// Shared game logic

import type { ABCard, ABCards, IABModeType, SlugId } from './types';

// Placeholder for game classes that were previously in @gaeljacquin/ucg-shared
// TODO: Migrate actual game logic from the external package

export class ABGame {
  public mode: IABModeType;
  public grid: any;
  public abDiscards: ABCard[] = [];

  constructor(mode: IABModeType) {
    this.mode = mode;
  }

  dealHand(_roundIndex: number): ABCards {
    // TODO: Implement actual card dealing logic
    // For now, return empty array
    return [];
  }

  setSeed(_seed: any): void {
    // TODO: Implement seed setting
  }

  setABSeed(seed: any): void {
    // TODO: Implement AB seed setting
    this.setSeed(seed);
  }
}

export class ABDeck {
  generateSeed(_gridSize: number): any {
    // TODO: Implement actual seed generation
    return {};
  }
}

export class ABMode implements IABModeType {
  public description?: string;
  public type?: string;

  constructor(
    public slug: SlugId,
    public title: string,
    public gridSize: number,
    description?: string,
    type?: string
  ) {
    this.description = description;
    this.type = type;
  }

  static getMode(modeSlug: string): ABMode {
    // TODO: Implement mode resolution with actual data
    const modes = this.getModes();
    return modes.find(mode => mode.slug === modeSlug) || modes[0];
  }

  static getModes(): ABMode[] {
    return [
      new ABMode('four', 'Four by Four', 16, '4x4 grid challenge', 'four'),
      new ABMode('five', 'Five by Five', 25, '5x5 grid master mode', 'five')
    ];
  }
}
