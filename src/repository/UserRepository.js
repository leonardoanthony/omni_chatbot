import {readFile, writeFile} from 'fs/promises'
import path from 'path';
import { fileURLToPath } from 'url';

export class UserRepository {

    constructor(){
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this._tableName = path.join(__dirname, '../database/Users.json');
    }

    async create(user){
        const data = JSON.parse(await readFile(this._tableName));
        console.log(data);
        data.push(user);
        await writeFile(this._tableName, JSON.stringify(data));

    }
}