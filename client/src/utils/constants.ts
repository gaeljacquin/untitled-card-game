import { ranks, suits } from '@annabelle/shared/src/constants/card';
import {
  Badge,
  Circle,
  Hexagon,
  RectangleHorizontal,
  RectangleVertical,
  Shield,
  Square,
  Squircle,
  Star,
} from 'lucide-react';

const TIMER_MIN = 3;
const TIMER_MAX = 5;
const NUM_CARDS_IN_HAND_DEFAULT = 5;
const NUM_CARDS_IN_HAND_MIN = 4;
const NUM_CARDS_IN_HAND_MAX = 7;

const cardBacks = ['/red.png', '/yellow.png', '/blue.png'];

const cardFronts = [
  { id: 'default', label: 'Default', component: null, className: '' },
  { id: 'circle', label: 'Circle', component: Circle, className: '' },
  { id: 'square', label: 'Square', component: Square, className: '' },
  { id: 'badge', label: 'Badge', component: Badge, className: '' },
  { id: 'hexagon', label: 'Hexagon', component: Hexagon, className: '' },
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
  { id: 'squircle', label: 'Squircle', component: Squircle, className: '' },
  { id: 'star', label: 'Star', component: Star, className: '' },
];
cardFronts.sort((a, b) => {
  if (a.id === 'default') return -1;
  if (b.id === 'default') return 1;
  return a.label.localeCompare(b.label);
});

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
  labelNotValue: true,
};

const topRightToaster =
  'top-0 right-0 flex fixed md:backdrop-opacity-5 md:backdrop-invert md:bg-white/10 md:text-white md:max-w-[400px] md:top-4 md:right-4';

const allConstants = {
  defaultSettings,
  cardBacks,
  cardFronts,
  TIMER_MIN,
  TIMER_MAX,
  NUM_CARDS_IN_HAND_MIN,
  NUM_CARDS_IN_HAND_MAX,
  topRightToaster,
};

export default allConstants;
