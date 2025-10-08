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

// Functional factory for creating mode objects
const createABMode = (
  type: IABModeType,
  title: string,
  description: string,
  slug: SlugId,
  gridSize: number,
  minHandsDiscard: number,
  minHandsSpecial: number
): IABMode => ({
  type,
  title,
  description,
  slug,
  gridSize,
  minHandsDiscard,
  minHandsSpecial,
});

// Static modes data
const MODES: IABMode[] = [
  createABMode(
    'abpoker',
    '4x4 Grid',
    'Fill the 4 x 4 grid with the best poker hands!',
    'four',
    4,
    3,
    4
  ),
  createABMode(
    'abpoker',
    '5x5 Grid',
    'Fill the 5 x 5 grid with the best poker hands!',
    'five',
    5,
    4,
    5
  ),
];

// ABMode class that maintains the same API
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
    // Use the functional factory internally
    const mode = createABMode(type, title, description, slug, gridSize, minHandsDiscard, minHandsSpecial);

    this.type = mode.type;
    this.title = mode.title;
    this.description = mode.description;
    this.slug = mode.slug;
    this.gridSize = mode.gridSize;
    this.minHandsDiscard = mode.minHandsDiscard;
    this.minHandsSpecial = mode.minHandsSpecial;
  }

  // Static methods that maintain the same API
  public static getModes(): ABMode[] {
    return MODES.map(mode => new ABMode(
      mode.type,
      mode.title,
      mode.description,
      mode.slug,
      mode.gridSize,
      mode.minHandsDiscard,
      mode.minHandsSpecial
    ));
  }

  public static getMode(slug: SlugId): ABMode | undefined {
    const mode = MODES.find((mode) => mode.slug === slug);
    return mode ? new ABMode(
      mode.type,
      mode.title,
      mode.description,
      mode.slug,
      mode.gridSize,
      mode.minHandsDiscard,
      mode.minHandsSpecial
    ) : undefined;
  }
}

