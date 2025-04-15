const User = require("./user");
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const mysql = require ("./mysql");


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

            const resultados = await mysql.execute(
                `INSERT INTO usuario (nome, email, senha, endereco, cpf, telefone) 
                      VALUES (?, ?, ?, ?, ?, ?);`,
                      [nome, email, senhaCripto, endereco, cpf, telefone]
            );
            return resultados;

        } catch (erro) {
            console.log("Erro ao add id", erro);
            throw erro;
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

        } catch (erro) {
            console.log('erro ao deletar usuario', erro);
        }
    }

    async updateUser(id, nome, email, senha, endereco, cpf, telefone) {
        try {
            // Criptografa a senha, se ela existir
            let senhaCripto = senha;
            if (senha) {
                senhaCripto = await bcrypt.hash(senha, 10);
            }
    
            const [resultado] = await mysql.execute(
                `UPDATE usuario 
                 SET nome = ?, email = ?, senha = ?, endereco = ?, cpf = ?, telefone = ?
                 WHERE idusuario = ?`,
                [nome, email, senhaCripto, endereco, cpf, telefone, id]
            );
    
            if (resultado.affectedRows === 0) {
                throw new Error("Usuário não encontrado");
            }
    
            return {
                id,
                nome,
                email,
                endereco,
                cpf,
                telefone
            };
    
        } catch (erro) {
            console.log("Erro ao atualizar usuário:", erro);
            throw erro;
        }
    }
    
    

}

module.exports = new userService