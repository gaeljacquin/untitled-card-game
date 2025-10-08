import { ABCard } from './card';

export interface IABGridCell {
  id: string;
  rowIndex: number;
  columnIndex: number;
  card: ABCard | null;
}

