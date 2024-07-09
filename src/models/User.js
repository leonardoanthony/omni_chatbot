import { UserRepository } from "../repository/UserRepository.js";

export class User {
    id;
    name;
    mention; //`@${message.author.split('@')[0]}`
    coins;
    isAdmin;

    constructor(id, name, mention){
        this.id = id;
        this.name = name;
        this.mention = mention;
        this.coins = 0;
        this.isAdmin = false;
    }

    create(){
        console.log(this);
    }
}


const user = new User('aaa', 'Leo', 'leooo');
user.create();

new UserRepository().create(user);

