const express = require('express');
const userService = require ('./userService');

const app = express(); //nome qualquer para express
app.use(express.json()); //vou habilitar json no express

//rota para criar usuario
 
// Rota para criar um novo usuário
app.post("/user", (req, res) => {
    const { nome, email, senha, endereco, cpf, telefone } = req.body;  // Agora extraímos os novos campos

    // Verifica se todos os campos obrigatórios estão presentes
    if (!nome || !email || !senha || !endereco || !cpf || !telefone) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios (nome, email, senha, endereco, cpf, telefone)" });
    }

    const user = userService.addUser(nome, email, senha, endereco, cpf, telefone);  // Adiciona o usuário com os novos dados
    res.status(200).json({ user });  // Retorna o usuário criado
});

app.get("/user", (req, res) => {
    res.json(userService.getUsers())
})

const port = 3000;
app.listen(port,() => {
    console.log("Servidor rodando na porta", port)
})
