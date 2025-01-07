export type IABModeType = 'abpoker' | 'abword';

interface IABMode {
  readonly type: IABModeType;
  readonly title: string;
  readonly description: string;
  readonly slug: string;
  readonly gridSize: number;
}

export class ABMode implements IABMode {
  public readonly type: IABModeType;
  public readonly title: string;
  public readonly description: string;
  public readonly slug: string;
  public readonly gridSize: number;
  public readonly gridClass: string;

  constructor(
    type: IABModeType,
    title: string,
    description: string,
    slug: string,
    gridSize: number
  ) {
    this.type = type;
    this.title = title;
    this.description = description;
    this.slug = slug;
    this.gridSize = gridSize;
    this.gridClass = `grid-cols-[auto,repeat(${gridSize},1fr)]`;
  }

  private static readonly modes = [
    new ABMode('abpoker', 'Poker 4', 'Make the best poker hands in a 4 x 4 grid!', 'mode-1', 4),
    new ABMode('abpoker', 'Poker 5', 'Make the best poker hands in a 5 x 5 grid!', 'mode-2', 5),
    new ABMode('abword', 'Word 5', 'Make the highest scoring words in a 5 x 5 grid!', 'mode-3', 5),
  ];

  public static getModes() {
    return ABMode.modes;
  }

  public static getMode(slug: string): ABMode | undefined {
    return ABMode.modes.find((mode) => mode.slug === slug);
  }
}
