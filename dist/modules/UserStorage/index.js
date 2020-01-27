"use strict";
exports.__esModule = true;
var Storage = /** @class */ (function () {
    function Storage(id) {
        this.id = id;
        this.store = "";
    }
    Storage.prototype.get = function () {
        return this.store;
    };
    Storage.prototype.set = function (store) {
        this.store = store;
        return this;
    };
    return Storage;
}());
exports["default"] = Storage;
