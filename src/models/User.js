
export class User {
    constructor({id, name, mention, coins = 0, profile = 'classic' }){
        this.id = id;
        this.name = name;
        this.mention = mention;
        this.coins = coins;
        this.profile = profile;
    }
}


