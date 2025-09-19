import type { SuitType, SuitId, RankType, RankId } from './types';
export declare class Suit {
    id: SuitId;
    name: string;
    symbol: string;
    color: string;
    constructor(id: SuitId, name: string, symbol: string, color: string);
    static getAllValues(): SuitType[];
    static getById(id: SuitId): SuitType | undefined;
}
export declare class Rank {
    id: RankId;
    name: string;
    value: number;
    symbol: string;
    constructor(id: RankId, name: string, value: number, symbol: string);
    static getAllValues(): RankType[];
    static getById(id: RankId): RankType | undefined;
}
export declare class ABCardPreview {
    private rank?;
    private suit?;
    letter?: string;
    constructor();
    setRank(rank?: RankType): void;
    setSuit(suit?: SuitType): void;
    getRank(): RankType | undefined;
    getSuit(): SuitType | undefined;
    setLetter(letter: string): void;
    getLetter(): string | undefined;
}
