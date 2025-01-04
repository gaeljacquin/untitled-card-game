import {
  Badge,
  Circle,
  Hexagon,
  RectangleHorizontal,
  RectangleVertical,
  Square,
} from 'lucide-react';
import { BsFillSuitDiamondFill as Diamonds } from 'react-icons/bs';
import { GiClubs as Clubs, GiSpades as Spades } from 'react-icons/gi';
import { ImHeart as Hearts } from 'react-icons/im';

const TIMER_MIN = 3;
const TIMER_MAX = 5;

const NUM_CARDS_IN_HAND_DEFAULT = 5;
const NUM_CARDS_IN_HAND_MIN = 4;
const NUM_CARDS_IN_HAND_MAX = 7;

const MIN_WORD_LENGTH = 5;

const cardBacks = ['/red.webp', '/yellow.webp', '/blue.webp'];

const suitIconMap = {
  spades: Spades,
  hearts: Hearts,
  diamonds: Diamonds,
  clubs: Clubs,
};

const cardFronts = [
  { id: 'default', label: 'Default', component: null, className: '' },
  { id: 'circle', label: 'Circle', component: Circle, className: '' },
  { id: 'square', label: 'Square', component: Square, className: '' },
  { id: 'badge', label: 'Badge', component: Badge, className: '' },
  { id: 'hexagon', label: 'Hexagon', component: Hexagon, className: 'rotate-90' },
  {
    id: 'rectangleVertical',
    label: 'Rectangle - Vertical',
    component: RectangleVertical,
    className: '',
  },
  {
    id: 'rectangleHorizontal',
    label: 'Rectangle - Horizontal',
    component: RectangleHorizontal,
    className: '',
  },
  {
    id: 'suitIcon',
    label: 'Suit',
    component: null,
    className: '',
  },
];
cardFronts.sort((a, b) => {
  if (a.id === 'default') return -1;

  if (b.id === 'default') return 1;

  return a.label.localeCompare(b.label);
});

const defaultSettings = {
  cardBack: 0,
  cardFront: 0,
  previewCard: {
    suit: 'hearts',
    rank: 'ace',
    letter: 'B',
  },
  labelNotValue: true,
  timer: TIMER_MIN,
  playerCards: NUM_CARDS_IN_HAND_DEFAULT,
  showAudioPlayer: false,
};

const topRightToaster =
  'top-0 right-0 flex fixed md:backdrop-opacity-10 md:bg-black/40 md:text-white md:max-w-[400px] md:top-4 md:right-4';

const allConstants = {
  TIMER_MIN,
  TIMER_MAX,
  NUM_CARDS_IN_HAND_MIN,
  NUM_CARDS_IN_HAND_MAX,
  MIN_WORD_LENGTH,
  cardBacks,
  cardFronts,
  defaultSettings,
  topRightToaster,
  suitIconMap,
};

export default allConstants;
