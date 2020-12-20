import sqlite3 from 'sqlite3';
import path from 'path';
import { app } from 'electron'

const db = new (sqlite3.verbose()).Database(path.join(app.getPath("userData"), 'messages.db'));