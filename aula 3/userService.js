const User = require("./user");

class userService{

    constructor(){
        this.user = [];//Array para armazenar user
        this.nextId = 1;//contador para grrar id
    }
    addUser(nome, email){
        const user = new User(this.nextId++, nome, email)
        this.user.push(user)
        return user;
    }

    getUsers(){
        return this.user
    }
}