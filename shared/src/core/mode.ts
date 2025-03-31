export type IABModeType = 'abpoker';

export type SlugId = 'four' | 'five';

interface IABMode {
  readonly type: IABModeType;
  readonly title: string;
  readonly description: string;
  readonly slug: SlugId;
  readonly gridSize: number;
  readonly minHandsDiscard: number;
  readonly minHandsSpecial: number;
}

export class ABMode implements IABMode {
  public readonly type: IABModeType;
  public readonly title: string;
  public readonly description: string;
  public readonly slug: SlugId;
  public readonly gridSize: number;
  public readonly minHandsDiscard: number;
  public readonly minHandsSpecial: number;

  constructor(
    type: IABModeType,
    title: string,
    description: string,
    slug: SlugId,
    gridSize: number,
    minHandsDiscard: number,
    minHandsSpecial: number
  ) {
    this.type = type;
    this.title = title;
    this.description = description;
    this.slug = slug;
    this.gridSize = gridSize;
    this.minHandsDiscard = minHandsDiscard;
    this.minHandsSpecial = minHandsSpecial;
  }

  private static readonly modes = [
    new ABMode(
      'abpoker',
      '4x4 Grid',
      'Fill the 4 x 4 grid with the best poker hands!',
      'four',
      4,
      3,
      4
    ),
    new ABMode(
      'abpoker',
      '5x5 Grid',
      'Fill the 5 x 5 grid with the best poker hands!',
      'five',
      5,
      4,
      5
    ),
  ];

  public static getModes() {
    return ABMode.modes;
  }

  public static getMode(slug: SlugId): ABMode | undefined {
    return ABMode.modes.find((mode) => mode.slug === slug);
  }
}
