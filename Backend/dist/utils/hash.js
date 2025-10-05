"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.hash = void 0;
const bcrypt_1 = require("bcrypt");
const saltRounds = 10;
const hash = (text) => {
    const hashedText = (0, bcrypt_1.hashSync)(text, saltRounds);
    return hashedText;
};
exports.hash = hash;
const compare = (text, hashedText) => (0, bcrypt_1.compareSync)(text, hashedText);
exports.compare = compare;
//# sourceMappingURL=hash.js.map