"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const create = (buffer) => {
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
};
exports.create = create;
