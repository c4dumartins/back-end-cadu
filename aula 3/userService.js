const User = require("./user");
const path = require ('path');
const fs = require ('fs');


class userService{

    constructor(){
        this.filePath = path.join(__dirname, 'user.json');
        this.user = [];//Array para armazenar user
        this.nextId = 1;//contador para grrar id
    }

    loadUsers(){
        try { //tenta executar o bloco de codigo
            if(fs.existsSync(this.filePath)){ //verifica se o arquivo existe
                  const data = fs.readFileSync(this.filePath); //le o arquivo
                  return JSON.parse(data); //transforma o json em objeto
                }
            } catch (erro) {
                console.log('Erro ao carregar arquivo', erro);
        }
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