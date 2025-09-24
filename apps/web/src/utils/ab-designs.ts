import { Badge, Circle, Hexagon, RectangleVertical as Rectangle, Square } from 'lucide-react';
import { TiStarFullOutline as Star } from 'react-icons/ti';

export const abDesigns = [
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
].sort((a, b) => {
  if (a.id === 'default') return -1;

  if (b.id === 'default') return 1;

  return a.label.localeCompare(b.label);
});
