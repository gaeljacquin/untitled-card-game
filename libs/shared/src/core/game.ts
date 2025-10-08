import { ABCards } from './card';
import { ABMode } from './mode';

interface IABGame {
  id: string;
  mode: ABMode;
  played: boolean;
  won: boolean;
  createdAt: Date;
}

// Pure function to create game ID
const createGameId = (mode: ABMode, createdAt: Date): string => {
  return 'game-' + mode.title + '-' + createdAt.toISOString();
};

// Pure function to create initial game state
const createInitialGameState = (mode: ABMode) => {
  const gridSize = mode.gridSize;
  const createdAt = new Date();

  return {
    id: createGameId(mode, createdAt),
    mode,
    abSeed: [] as ABCards[],
    abDeals: Array.from({ length: gridSize }, () => Array(gridSize).fill([null])) as ABCards[],
    grid: Array.from({ length: gridSize }, () => Array(gridSize).fill([null])) as ABCards[],
    abDiscards: [] as ABCards,
    played: false,
    won: false,
    createdAt,
  };
};

// Pure function to set seed (returns new state)
const setABSeedPure = (gameState: any, cards: ABCards[]) => ({
  ...gameState,
  abSeed: [...cards],
});

// Pure function to set played status
const setPlayedPure = (gameState: any) => ({
  ...gameState,
  played: true,
});

// Pure function to set won status
const setWonPure = (gameState: any) => ({
  ...gameState,
  won: true,
});

// Pure function to deal hand
const dealHandPure = (gameState: any, index: number) => {
  const abCardGroup = gameState.abSeed[index];
  const newDeals = [...gameState.abDeals];
  newDeals[index] = abCardGroup;

  return {
    state: {
      ...gameState,
      abDeals: newDeals,
    },
    cards: abCardGroup,
  };
};

// Pure function to convert seed to string grid
const toStringGridPure = (abSeed: ABCards[]): string[][] => {
  return abSeed.map((deal) => {
    return deal.map((card) => {
      return card._toString();
    });
  });
};

export class ABGame implements IABGame {
  readonly id: string;
  readonly mode: ABMode;
  public played: boolean;
  public won: boolean;
  public abSeed: ABCards[];
  public abDeals: ABCards[];
  public grid: ABCards[];
  public abDiscards: ABCards;
  readonly createdAt: Date;

  // Internal state for functional operations
  private _state: any;

  constructor(mode: ABMode) {
    // Use functional factory for initial state
    this._state = createInitialGameState(mode);

    // Set public properties from functional state
    this.id = this._state.id;
    this.mode = this._state.mode;
    this.abSeed = this._state.abSeed;
    this.abDeals = this._state.abDeals;
    this.grid = this._state.grid;
    this.abDiscards = this._state.abDiscards;
    this.played = this._state.played;
    this.won = this._state.won;
    this.createdAt = this._state.createdAt;
  }

  public setABSeed(cards: ABCards[]) {
    // Update functional state
    this._state = setABSeedPure(this._state, cards);
    // Sync public property
    this.abSeed = this._state.abSeed;
  }

  public setPlayed() {
    // Update functional state
    this._state = setPlayedPure(this._state);
    // Sync public property
    this.played = this._state.played;
  }

  public setWon() {
    // Update functional state
    this._state = setWonPure(this._state);
    // Sync public property
    this.won = this._state.won;
  }

  public dealHand(index: number) {
    // Use functional deal hand
    const result = dealHandPure(this._state, index);
    this._state = result.state;
    // Sync public property
    this.abDeals = this._state.abDeals;

    return result.cards;
  }

  public _toStringGrid(): string[][] {
    return toStringGridPure(this.abSeed);
  }

}
