"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABCardPreview = exports.Rank = exports.Suit = void 0;
class Suit {
    id;
    name;
    symbol;
    color;
    constructor(id, name, symbol, color) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
        this.color = color;
    }
    static getAllValues() {
        return [
            { id: 'hearts', name: 'Hearts', symbol: '♥', color: 'red', isRed: true, label: 'Hearts' },
            { id: 'diamonds', name: 'Diamonds', symbol: '♦', color: 'red', isRed: true, label: 'Diamonds' },
            { id: 'clubs', name: 'Clubs', symbol: '♣', color: 'black', isRed: false, label: 'Clubs' },
            { id: 'spades', name: 'Spades', symbol: '♠', color: 'black', isRed: false, label: 'Spades' }
        ];
    }
    static getById(id) {
        return this.getAllValues().find(suit => suit.id === id);
    }
}
exports.Suit = Suit;
class Rank {
    id;
    name;
    value;
    symbol;
    constructor(id, name, value, symbol) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.symbol = symbol;
    }
    static getAllValues() {
        return [
            { id: 'ace', name: 'Ace', value: 1, symbol: 'A', label: 'Ace' },
            { id: 'two', name: 'Two', value: 2, symbol: '2', label: 'Two' },
            { id: 'three', name: 'Three', value: 3, symbol: '3', label: 'Three' },
            { id: 'four', name: 'Four', value: 4, symbol: '4', label: 'Four' },
            { id: 'five', name: 'Five', value: 5, symbol: '5', label: 'Five' },
            { id: 'six', name: 'Six', value: 6, symbol: '6', label: 'Six' },
            { id: 'seven', name: 'Seven', value: 7, symbol: '7', label: 'Seven' },
            { id: 'eight', name: 'Eight', value: 8, symbol: '8', label: 'Eight' },
            { id: 'nine', name: 'Nine', value: 9, symbol: '9', label: 'Nine' },
            { id: 'ten', name: 'Ten', value: 10, symbol: '10', label: 'Ten' },
            { id: 'jack', name: 'Jack', value: 11, symbol: 'J', label: 'Jack' },
            { id: 'queen', name: 'Queen', value: 12, symbol: 'Q', label: 'Queen' },
            { id: 'king', name: 'King', value: 13, symbol: 'K', label: 'King' }
        ];
    }
    static getById(id) {
        return this.getAllValues().find(rank => rank.id === id);
    }
}
exports.Rank = Rank;
class ABCardPreview {
    rank;
    suit;
    letter;
    constructor() {
    }
    setRank(rank) {
        this.rank = rank;
    }
    setSuit(suit) {
        this.suit = suit;
    }
    getRank() {
        return this.rank;
    }
    getSuit() {
        return this.suit;
    }
    setLetter(letter) {
        this.letter = letter;
    }
    getLetter() {
        return this.letter;
    }
}
exports.ABCardPreview = ABCardPreview;
//# sourceMappingURL=cards.js.map