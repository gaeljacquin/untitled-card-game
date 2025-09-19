"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABMode = exports.ABDeck = exports.ABGame = void 0;
class ABGame {
    mode;
    grid;
    abDiscards = [];
    constructor(mode) {
        this.mode = mode;
    }
    dealHand(_roundIndex) {
        return [];
    }
    setSeed(_seed) {
    }
    setABSeed(seed) {
        this.setSeed(seed);
    }
}
exports.ABGame = ABGame;
class ABDeck {
    generateSeed(_gridSize) {
        return {};
    }
}
exports.ABDeck = ABDeck;
class ABMode {
    slug;
    title;
    gridSize;
    description;
    type;
    constructor(slug, title, gridSize, description, type) {
        this.slug = slug;
        this.title = title;
        this.gridSize = gridSize;
        this.description = description;
        this.type = type;
    }
    static getMode(modeSlug) {
        const modes = this.getModes();
        return modes.find(mode => mode.slug === modeSlug) || modes[0];
    }
    static getModes() {
        return [
            new ABMode('four', 'Four by Four', 16, '4x4 grid challenge', 'four'),
            new ABMode('five', 'Five by Five', 25, '5x5 grid master mode', 'five')
        ];
    }
}
exports.ABMode = ABMode;
//# sourceMappingURL=game.js.map