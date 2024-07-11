import { User } from "../models/User.js";
import { UserRepository } from "../repository/UserRepository.js";

export class UserController {

    repository = new UserRepository()

    async createUser(message){
        const user = new User({
            id: message.author,
            name: message.body.slice(7).trim(),
            mention: `@${message.author.split('@')[0]}`,
        });

        const json = JSON.parse(JSON.stringify(user));

        return await this.repository.createUser(json);
    }

    async getUser(message){
        const userData = await this.repository.readUser(message.author);
        if(userData.error){return userData;}
        const user = new User({...userData});
        return user;
    }

    async setCoins(message, amount){
        await this.repository.updateUser(message.author, {coins: amount});
    }
}