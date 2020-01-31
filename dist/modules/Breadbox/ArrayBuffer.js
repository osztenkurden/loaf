"use strict";
exports.__esModule = true;
exports.create = function (buffer) {
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
};
