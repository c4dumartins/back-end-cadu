const User = require("./user");
const path = require('path');
const fs = require('fs');


class userService {

    constructor() {
        this.filePath = path.join(__dirname, 'user.json');
        this.users = this.loadUsers(); //Array para armazenar user
        this.nextId = this.getNextId(); //contador para grrar id
    }

    loadUsers() {
        try { //tenta executar o bloco de codigo
            if (fs.existsSync(this.filePath)) { //verifica se o arquivo existe
                const data = fs.readFileSync(this.filePath); //le o arquivo
                return JSON.parse(data); //transforma o json em objeto
            }
        } catch (erro) { //caso ocorra um erro
            console.log('Erro ao carregar arquivo', erro);
        }
        return []; //retorna um array vazio
    }

    //definir o próximo id a ser utilizado
    getNextId() { //função para buscar o próximo id 
        try {
            if (this.users.length === 0) return 1;
            return Math.max(...this.users.map(user => user.id)) + 1;
        } catch (erro) {
            console.log("Erro ao buscar proximo id", erro);
        }
    }

    saveUsers() { //função para salvar os usuários
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.users));
        } catch (erro) {
            console.log("Erro ao buscar proximo id", erro);
        }
    }


    addUser(nome, email) {
        try {
            const user = new User(this.nextId++, nome, email);
            this.users.push(user);
            this.saveUsers();
            return user;
        } catch (erro) {
            console.log("Erro ao buscar proximo id", erro);
        }
    }

    getUsers() {
        try {
            return this.users;
        } catch (erro) {
            console.log("Erro ao buscar proximo id", erro);
        }
    }
}

module.exports = new userService