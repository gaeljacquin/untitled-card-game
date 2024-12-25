import { ranks } from '../constants/card';

export type Rank = (typeof ranks)[keyof typeof ranks];
