import { ABCard } from './card';

export interface IGridCell {
  id: string;
  rowIndex: number;
  columnIndex: number;
  card: ABCard | null;
}
