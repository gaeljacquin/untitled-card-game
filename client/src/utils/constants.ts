import { ranks, suits } from '@annabelle/shared/src/constants/card';

const TIMER_MIN = 3;
const TIMER_MAX = 5;
const NUM_CARDS_IN_HAND_DEFAULT = 5;
const NUM_CARDS_IN_HAND_MIN = 4;
const NUM_CARDS_IN_HAND_MAX = 7;

const cardBacks = ['/red.png', '/yellow.png', '/blue.png'];

const cardFronts = [
  { id: 'default', label: 'Default', className: '' },
  { id: 'rectangle', label: 'Rectangle', className: '' },
  { id: 'circle', label: 'Circle', className: '' },
  { id: 'suit', label: 'Suit', className: '' },
];

const defaultSettings = {
  cardBack: 0,
  cardFront: 0,
  music: 50,
  soundfx: 50,
  timer: TIMER_MIN,
  playerCards: NUM_CARDS_IN_HAND_DEFAULT,
  previewCard: {
    suit: suits.hearts.id,
    rank: ranks.ace.id,
    letter: 'B',
  },
  labelNotValue: true, // only applicable to face cards
};

const allConstants = {
  defaultSettings,
  cardBacks,
  cardFronts,
  TIMER_MIN,
  TIMER_MAX,
  NUM_CARDS_IN_HAND_MIN,
  NUM_CARDS_IN_HAND_MAX,
};

export default allConstants;
