class User{
    constructor(id, nome, email){
        this.id = id;//id do usuário
        this.nome = nome;//nome do usuário
        this.email = email;//email do usuário
        this.senha = senha;  // senha do usuário
        this.endereco = endereco;  // endereço do usuário
        this.cpf = cpf;      // cpf do usuário
        this.telefone = telefone;  // telefone do usuário
    }
}

module.exports = User; //exportar o modulo
