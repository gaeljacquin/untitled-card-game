import type { ABCard, ABCards, IABModeType, SlugId } from './types';
export declare class ABGame {
    mode: IABModeType;
    grid: any;
    abDiscards: ABCard[];
    constructor(mode: IABModeType);
    dealHand(_roundIndex: number): ABCards;
    setSeed(_seed: any): void;
    setABSeed(seed: any): void;
}
export declare class ABDeck {
    generateSeed(_gridSize: number): any;
}
export declare class ABMode implements IABModeType {
    slug: SlugId;
    title: string;
    gridSize: number;
    description?: string;
    type?: string;
    constructor(slug: SlugId, title: string, gridSize: number, description?: string, type?: string);
    static getMode(modeSlug: string): ABMode;
    static getModes(): ABMode[];
}
