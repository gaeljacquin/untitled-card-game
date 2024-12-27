import { ranks, suits } from '@annabelle/shared/src/constants/card';

const TIMER_MIN = 3;
const NUM_TIMER_OPTIONS = 3;
const NUM_CARDS_IN_HAND_DEFAULT = 5;
const NUM_CARDS_IN_HAND_OPTIONS = 4;

const timerOptions = Array(NUM_TIMER_OPTIONS)
  .fill(0)
  .map((_, i) => i + TIMER_MIN);

const playerCardsOptions = Array(NUM_CARDS_IN_HAND_OPTIONS)
  .fill(0)
  .map((_, i) => i + NUM_CARDS_IN_HAND_DEFAULT - 1);

const cardBacks = ['/red.png', '/yellow.png', '/blue.png'];

const cardFronts = [
  { id: 'default', label: 'Default', className: '' },
  { id: 'rectangle', label: 'Rectangle', className: '' },
  { id: 'circle', label: 'Circle', className: '' },
  { id: 'suit', label: 'Suit', className: '' },
];

// NOTE TO SELF: cardBack, cardFront, timer, playerCards are indexes into their respective arrays
const defaultSettings = {
  cardBack: 0, // SEE NOTE
  cardFront: 0, // SEE NOTE
  music: 50,
  soundfx: 50,
  timer: 0, // SEE NOTE
  playerCards: 1, // SEE NOTE
  previewCard: {
    suit: suits.hearts.id,
    rank: ranks.aceRank.id,
    letter: 'B',
  },
};

const allConstants = { defaultSettings, cardBacks, cardFronts, timerOptions, playerCardsOptions };

export default allConstants;
