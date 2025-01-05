import { Badge, Circle, Hexagon, RectangleVertical as Rectangle, Square } from 'lucide-react';
import { TiStarFullOutline as Star } from 'react-icons/ti';

const MIN_WORD_LENGTH = 5;

const cardBacks = ['/red.webp', '/yellow.webp', '/blue.webp'];

const cardFronts = [
  { id: 'default', label: 'Default', component: null, className: '' },
  { id: 'circle', label: 'Circle', component: Circle, className: '' },
  { id: 'square', label: 'Square', component: Square, className: '' },
  { id: 'badge', label: 'Badge', component: Badge, className: '' },
  { id: 'hexagon', label: 'Hexagon', component: Hexagon, className: 'rotate-90' },
  {
    id: 'rectangle',
    label: 'Rectangle',
    component: Rectangle,
    className: '',
  },
  {
    id: 'suitIcon',
    label: 'Suit',
    component: null,
    className: '',
  },
  {
    id: 'star',
    label: 'Star',
    component: Star,
    className: '',
  },
];
cardFronts.sort((a, b) => {
  if (a.id === 'default') return -1;

  if (b.id === 'default') return 1;

  return a.label.localeCompare(b.label);
});

const topRightToaster =
  'top-0 right-0 flex fixed md:backdrop-opacity-10 md:bg-black/40 md:text-white md:max-w-[400px] md:top-4 md:right-4';

const menuItems = [
  {
    label: 'New Game',
    slug: 'game',
    gradient: 'bg-gradient-to-r from-cyan-600 to-emerald-900',
  },
  {
    label: 'Settings',
    slug: 'settings',
    gradient: 'bg-gradient-to-r from-purple-800 to-pink-700',
  },
  {
    label: 'Credits',
    slug: 'credits',
    gradient: 'bg-gradient-to-r from-fuchsia-800 to-sky-700',
  },
  {
    label: 'AB Tools',
    slug: 'ab-tools',
    gradient: 'bg-gradient-to-r from-lime-700 via-rose-700 to-violet-500',
  },
];

const allConstants = {
  MIN_WORD_LENGTH,
  cardBacks,
  cardFronts,
  topRightToaster,
  menuItems,
};

export default allConstants;
