const User = require("./user");
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const mysql = require ("./mysql");
const { get } = require("http");


class userService {

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

    async getUser(id) {
        try {
            const resultado = await mysql.execute(
                `SELECT idusuario FROM usuario WHERE idusuario = ?`,
                [id]
            );
            console.log("resultado", resultado);
            return resultado;
        } catch (erro) {
            console.log("Erro ao buscar usuario", erro);
        }
    }

    async deleteUser(id){
        try{
            const user = await this.getUser(id);
            if(user.length == 0) {
                console.log("Usuário não existe!");
                return;
            }
            const resultado = await mysql.execute(
                `DELETE FROM usuario WHERE idusuario = ?`,
                [id]
            );
            return resultado;
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