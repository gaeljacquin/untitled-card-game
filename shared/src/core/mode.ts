export type IABModeType = 'abpoker';

interface IABMode {
  readonly type: IABModeType;
  readonly title: string;
  readonly description: string;
  readonly slug: string;
  readonly gridSize: number;
  readonly includeJokers: boolean;
  readonly minHandsDiscard: number;
  readonly minHandsSpecial: number;
}

export class ABMode implements IABMode {
  public readonly type: IABModeType;
  public readonly title: string;
  public readonly description: string;
  public readonly slug: string;
  public readonly gridSize: number;
  public readonly includeJokers: boolean;
  public readonly minHandsDiscard: number;
  public readonly minHandsSpecial: number;

  constructor(
    type: IABModeType,
    title: string,
    description: string,
    slug: string,
    gridSize: number,
    includeJokers: boolean,
    minHandsDiscard: number,
    minHandsSpecial: number
  ) {
    this.type = type;
    this.title = title;
    this.description = description;
    this.slug = slug;
    this.gridSize = gridSize;
    this.includeJokers = includeJokers;
    this.minHandsDiscard = minHandsDiscard;
    this.minHandsSpecial = minHandsSpecial;
  }

  private static readonly modes = [
    new ABMode(
      'abpoker',
      'Poker 4',
      'Fill the 4 x 4 grid with the best poker hands!',
      'mode-1',
      4,
      false,
      3,
      4
    ),
    new ABMode(
      'abpoker',
      'Poker 5',
      'Fill the 5 x 5 grid with the best poker hands!',
      'mode-2',
      5,
      true,
      4,
      5
    ),
  ];

  public static getModes() {
    return ABMode.modes;
  }

  public static getMode(slug: string): ABMode | undefined {
    return ABMode.modes.find((mode) => mode.slug === slug);
  }
}
