import { UserRepository } from "../repository/UserRepository.js";

export class User {
    constructor({id, name, mention, coins }){
        this.id = message.from;
        this.name = message.body.slice(7).trim();
        this.mention = `@${message.author.split('@')[0]}`;
        this.coins = 0;
        this.profile = 'classic';
    }
}


