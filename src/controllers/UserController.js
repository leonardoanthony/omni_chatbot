import { User } from "../models/User.js";
import { UserRepository } from "../repository/UserRepository.js";

export class UserController {

    repository = new UserRepository()

    async createUser(message){
        const user = new User({
            id: message.from,
            name: message.body.slice(7).trim(),
            mention: `@${message.author.split('@')[0]}`,
        });

        const json = JSON.parse(JSON.stringify(user));

        return await this.repository.createUser(json);
    }
}