import {
  Badge,
  Circle,
  Hexagon,
  RectangleHorizontal,
  RectangleVertical,
  Shield,
  Square,
} from 'lucide-react';

const TIMER_MIN = 3;
const TIMER_MAX = 5;

const NUM_CARDS_IN_HAND_DEFAULT = 5;
const NUM_CARDS_IN_HAND_MIN = 4;
const NUM_CARDS_IN_HAND_MAX = 7;

const MIN_WORD_LENGTH = 5;

const cardBacks = ['/red.png', '/yellow.png', '/blue.png'];

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
  { id: 'shield', label: 'Shield', component: Shield, className: '' },
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
};

export default allConstants;
