import sqlite3 from 'sqlite3';
import path from 'path';
import * as I from "./../interface";
import User from './../User';
import fs from 'fs';
import unusedFilename from 'unused-filename';
import { directories } from '../Machine';

import Sequelize, { Model } from 'sequelize';

export class Reference extends Model {
    static Define(seq: Sequelize.Sequelize) {
        this.init({
            uuid: { type: Sequelize.UUID, primaryKey: true, allowNull: false, defaultValue: Sequelize.UUIDV4 },
            dbUUID: { type: Sequelize.UUID },
            contentUUID: { type: Sequelize.UUID }
        }, {
            timestamps:false,
            sequelize: seq
        });
    }
}

interface MessageReference {
    uuid: string,
    dbUUID: string;
    contentUUID: string;
}

export const saveMessageReferences = async (messages: (I.IMessageInputWithUUID | I.IMessage)[]) => {
    const mapping = messages.map(message => ({ contentUUID: message.content.uuid, dbUUID: message.uuid }));

    try {
        return await Reference.bulkCreate(mapping)
    } catch(e) {
        console.log(e);
        return null;
    }
}


export const getMessageReference = async (contentUUID: string) => {
    const reference = await Reference.findOne({
        where: {
            contentUUID
        },
        raw: true,
    }) as unknown as MessageReference;

    return reference;
}
