import { Badge, Circle, Hexagon, RectangleVertical as Rectangle, Square } from 'lucide-react';
import { TiStarFullOutline as Star } from 'react-icons/ti';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { SettingsStore } from 'types/settings';

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

export const initialSettings = {
  abDesignIndex: 0,
  previewCard: {
    suit: 'hearts',
    rank: 'ace',
    letter: 'B',
  },
  rankLabel: true,
  rankSwitchLetter: false,
  invertColors: false,
};

const settingsStore = create(
  persist(
    devtools<SettingsStore>((set, get) => ({
      ...initialSettings,
      _hasHydrated: false,
      setHasHydrated: (_hasHydrated) => {
        set({ _hasHydrated });
      },
      updateSettings: (settings) => {
        set({ ...settings, _hasHydrated: true });
      },
      resetSettings: () => {
        set({ ...initialSettings, _hasHydrated: true });
      },
      getSettings: () => get(),
    })),
    {
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
      name: 'settings',
      partialize: (state) => {
        const { _hasHydrated, ...rest } = state;
        void _hasHydrated;

        return { ...rest };
      },
    }
  )
);

export default settingsStore;
