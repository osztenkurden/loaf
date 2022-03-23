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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.saveMessages = exports.saveFileToDrive = exports.parseContent = exports.getMessage = exports.sequelize = void 0;
const path_1 = __importDefault(require("path"));
const User_1 = __importDefault(require("./../User"));
const fs_1 = __importDefault(require("fs"));
const unused_filename_1 = __importDefault(require("unused-filename"));
const Machine_1 = require("../Machine");
const sequelize_1 = __importStar(require("sequelize"));
const references_1 = require("./references");
class Message extends sequelize_1.Model {
    static Define(seq) {
        this.init({
            uuid: { type: sequelize_1.default.UUID, primaryKey: true, allowNull: false, defaultValue: sequelize_1.default.UUIDV4 },
            id: { type: sequelize_1.default.BIGINT },
            senderId: { type: sequelize_1.default.BIGINT },
            content: { type: sequelize_1.default.TEXT, },
            chatId: { type: sequelize_1.default.BIGINT },
            my: { type: sequelize_1.default.BOOLEAN },
            date: { type: sequelize_1.default.DATE },
            userId: { type: sequelize_1.default.TEXT },
        }, {
            timestamps: false,
            sequelize: seq
        });
    }
}
exports.sequelize = new sequelize_1.default.Sequelize({
    dialect: 'sqlite',
    storage: path_1.default.join(Machine_1.directories.messages, 'messages.db'),
    logging: false
});
Message.Define(exports.sequelize);
references_1.Reference.Define(exports.sequelize);
exports.sequelize.sync({ force: false });
const convertRawMessage = (chats = []) => (raw) => {
    const inbox = User_1.default.getInbox();
    if (!inbox)
        return null;
    return {
        uuid: raw.uuid,
        id: raw.id,
        senderId: raw.senderId,
        content: JSON.parse(raw.content),
        chatId: raw.chatId,
        my: !!raw.my,
        date: raw.date,
        sender: inbox.getSenderData(raw.chatId, raw.senderId, chats)
    };
};
const convertToRaw = (userId, message) => {
    return {
        id: message.id,
        senderId: message.senderId,
        content: JSON.stringify(message.content),
        chatId: message.chatId,
        my: Number(message.my),
        date: new Date(message.date),
        userId
    };
};
const getMessage = (uuid) => __awaiter(void 0, void 0, void 0, function* () {
    const rawMessage = yield Message.findOne({
        where: {
            uuid
        },
        raw: true,
        order: [['date', 'ASC']]
    });
    if (!rawMessage)
        return null;
    const message = convertRawMessage()(rawMessage);
    return message || null;
});
exports.getMessage = getMessage;
const isReply = (content) => content.type === "reply";
const parseContent = (content) => __awaiter(void 0, void 0, void 0, function* () {
    if (!isReply(content)) {
        return content;
    }
    const reference = yield references_1.getMessageReference(content.reference);
    if (!reference)
        return Object.assign(Object.assign({}, content), { reference: null });
    const replyTo = yield exports.getMessage(reference.dbUUID);
    return Object.assign(Object.assign({}, content), { reference: (replyTo === null || replyTo === void 0 ? void 0 : replyTo.content) || null });
});
exports.parseContent = parseContent;
const saveFileMessage = (fileMessage) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = yield unused_filename_1.default(path_1.default.join(Machine_1.directories.files, fileMessage.content.name));
    let data = fileMessage.content.data;
    if (data.includes(",")) {
        data = data.split(",")[1];
    }
    fs_1.default.writeFileSync(filePath, data, 'base64');
    return filePath;
});
const saveFileToDrive = (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.content.type === "text" || message.content.type === 'reply')
        return message;
    if (message.content.type === "file") {
        message.content.content.data = yield saveFileMessage(message.content);
        return message;
    }
    yield Promise.all(message.content.content.map((messageContent) => __awaiter(void 0, void 0, void 0, function* () {
        if (messageContent.type === "file") {
            messageContent.content.data = yield saveFileMessage(messageContent);
        }
        return messageContent;
    })));
    return message;
});
exports.saveFileToDrive = saveFileToDrive;
const saveMessages = (userId, messages) => __awaiter(void 0, void 0, void 0, function* () {
    const rawMessages = messages.map(msg => convertToRaw(userId, msg));
    try {
        return yield Message.bulkCreate(rawMessages);
    }
    catch (e) {
        console.log(e);
        return null;
    }
});
exports.saveMessages = saveMessages;
const MESSAGES_PER_PAGE = 15;
const getMessages = (userId, chatId, pageFromEnd = 0, chats = [], useLiteralPage = false) => __awaiter(void 0, void 0, void 0, function* () {
    const messageCount = yield Message.count({
        where: {
            userId,
            chatId
        }
    });
    // Page count starts from 0
    const maxPage = Math.ceil(messageCount / MESSAGES_PER_PAGE) - 1;
    const page = !useLiteralPage ? (maxPage - pageFromEnd) : pageFromEnd;
    const messages = yield Message.findAll({
        where: {
            userId,
            chatId
        },
        limit: MESSAGES_PER_PAGE + 1,
        offset: page * MESSAGES_PER_PAGE,
        raw: true,
        order: [['date', 'ASC']]
    });
    const filteredMessages = messages.slice(0, MESSAGES_PER_PAGE).map(convertRawMessage(chats)).filter((message) => !!message);
    const messagesWithReferences = [];
    for (const message of filteredMessages) {
        messagesWithReferences.push(Object.assign(Object.assign({}, message), { content: yield exports.parseContent(message.content) }));
    }
    // const hasMore = messages.length > MESSAGES_PER_PAGE;
    return { messages: filteredMessages, page, maxPage };
});
exports.getMessages = getMessages;
