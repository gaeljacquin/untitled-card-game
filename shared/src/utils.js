"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = generateId;
exports.shuffleArray = shuffleArray;
exports.isValidModeSlug = isValidModeSlug;
function generateId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
function isValidModeSlug(slug) {
    return typeof slug === 'string' && slug.length > 0 && /^[a-z-]+$/.test(slug);
}
//# sourceMappingURL=utils.js.map