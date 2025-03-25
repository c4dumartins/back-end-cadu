const User = require("./user");
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');


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
            console.log("Erro ao salvar", erro);
        }
    }


    async addUser(nome, email, senha, endereco, cpf, telefone) {
        try {
            const senhaCripto = await bcrypt.hash(senha, 10);
            const user = new User(this.nextId++, nome, email, senhaCripto, endereco, cpf, telefone);
            console.log(user)
            this.users.push(user);
            this.saveUsers();
            return user;
        } catch (erro) {
            console.log("Erro ao add id", erro);
        }
    }

    getUsers() {
        try {
            return this.users;
        } catch (erro) {
            console.log("Erro ao buscar usuario", erro);
        }
    }

    deleteUser(id){
        try{
            this.users = this.users.filter(user => user.id !== id);
            this.saveUsers();

        }catch{
            console.log('erro ao deletar usuario', erro);
        }
    }

    updateUser(id, newData) { 
        try {
            const userIndex = this.users.findIndex(user => user.id === id);
            
            if (userIndex === -1) throw new Error("Usuário não encontrado");
    
            this.users[userIndex] = { ...this.users[userIndex], ...newData };
            this.saveUsers();
    
            return this.users[userIndex];
        } catch (erro) {
            console.log("Erro ao atualizar usuário:", erro);
            throw erro;
        }
    }
    

}

module.exports = new userService