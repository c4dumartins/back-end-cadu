const express = require('express');
const userService = require ('./userService');

const app = express(); //nome qualquer para express
app.use(express.json()); //vou habilitar json no express

//rota para criar usuario
 
// Rota para criar um novo usuário
app.post("/user", async (req, res) => {
        try{
            const { nome, email, senha, endereco, cpf, telefone } = req.body;// Verifica se todos os campos obrigatórios estão presentes
            if (!nome || !email || !senha || !endereco || !cpf || !telefone) {
                return res.status(400).json
                    ({ error: "Todos os campos são obrigatórios (nome, email, senha, endereco, cpf, telefone)" });
            }
            const user = await userService.addUser(nome, email, senha, endereco, cpf, telefone);  // Adiciona o usuário com os novos dados
            res.status(200).json({ mensagem: "Usuario Cadastrado com Sucesso!" });  // Retorna o usuário criado
        } catch (erro) {
            console.log(erro);
            res.status(400).json({ error: erro.message });
        }
});

app.get("/user", (req, res) => {
    res.json(userService.getUsers())
})

// rota para excluir um usuário pelo ID
app.delete("/users/:id", async (req, res) => { 
    const id = parseInt(req.params.id); 
    //converte o ID para número 
    try {
        const resultado = await userService.deleteUser(id);
        // tenta excluir o usuário 
        if (!resultado) {
            return res.status(406).json({ "Mensagem": "Usuário não existe" });
        }
        // retorna a mensagem de sucesso 
    } catch (erro) {
        res.status(404).json({ error: erro.message });
        //retorna a mensagem de erro
    }
});

// Rota para atualizar um usuário pelo ID
app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id); // Converte o ID para número
    const { nome, email, senha, endereco, cpf, telefone } = req.body;

    try {
        const user = userService.updateUser(id, nome, email, senha, endereco, cpf, telefone);
        res.status(200).json("Usuário atualizado com sucesso"); // Retorna o usuário atualizado
    } catch (erro) {
        res.status(404).json({ error: erro.message }); // Retorna a mensagem de erro
    }
});




const port = 3000;
app.listen(port,() => {
    console.log("Servidor rodando na porta", port)
})
