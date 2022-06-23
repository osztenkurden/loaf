"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReferencesOfMessages = exports.getMessageReference = exports.saveMessageReferences = exports.Reference = void 0;
const sequelize_1 = __importStar(require("sequelize"));
class Reference extends sequelize_1.Model {
    static Define(seq) {
        this.init({
            uuid: { type: sequelize_1.default.UUID, primaryKey: true, allowNull: false, defaultValue: sequelize_1.default.UUIDV4 },
            dbUUID: { type: sequelize_1.default.UUID },
            contentUUID: { type: sequelize_1.default.UUID }
        }, {
            timestamps: false,
            sequelize: seq
        });
    }
}
exports.Reference = Reference;
const saveMessageReferences = (messages) => __awaiter(void 0, void 0, void 0, function* () {
    const mapping = messages.map(message => ({ contentUUID: message.content.uuid, dbUUID: message.uuid }));
    try {
        return yield Reference.bulkCreate(mapping);
    }
    catch (e) {
        console.log(e);
        return null;
    }
});
exports.saveMessageReferences = saveMessageReferences;
const getMessageReference = (contentUUID) => __awaiter(void 0, void 0, void 0, function* () {
    const reference = yield Reference.findOne({
        where: {
            contentUUID
        },
        raw: true,
    });
    return reference;
});
exports.getMessageReference = getMessageReference;
const getReferencesOfMessages = (dbUUID) => __awaiter(void 0, void 0, void 0, function* () {
    const references = yield Reference.findAll({
        where: {
            dbUUID
        },
        raw: true,
    });
    return references;
});
exports.getReferencesOfMessages = getReferencesOfMessages;
