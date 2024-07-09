import { UserRepository } from "../repository/UserRepository.js";

export class User {
    constructor(message){
        this.id = message.from;
        this.name = message.body.slice(7).trim();
        this.mention = `@${message.author.split('@')[0]}`;
        

        this._repository = new UserRepository();
    }

    async create(){
        this.coins = 0;
        this.isAdmin = false;
        await this._repository.create(this);
    }

    async findById(){
        return await this._repository.findById(this.id);
    }
}


