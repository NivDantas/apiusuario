const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

let usuarios = [];

app.get("/usuarios", (req, res) => {
  const login = req.query.login;

  if (login) {
    const usuario = usuarios.find((u) => u.login === login);
    if (!usuario) {
      res.status(404).send("Usuário não encontrado");
    } else {
      res.status(200).send(usuario);
    }
  } else {
    res.status(200).send(usuarios);
  }
});

app.post("/usuarios", (req, res) => {
  const id = req.body.id;
  const nome = req.body.nome;
  const login = req.body.login;
  const senha = req.body.senha;

  const usuarioExistente = usuarios.find((u) => u.login === login);
  if (usuarioExistente) {
    res.status(400).send("Usuário já existe");
  } else {
    const usuario = {
      id,
      nome,
      login,
      senha,
    };
    usuarios.push(usuario);
    res.status(201).send(usuario);
  }
});

app.put("/usuarios/:login", (req, res) => {
  const login = req.params.login;
  const nome = req.body.nome;
  const senha = req.body.senha;

  const usuario = usuarios.find((u) => u.login === login);
  if (!usuario) {
    res.status(404).send("Usuário não encontrado");
  } else {
    usuario.nome = nome;
    usuario.senha = senha;
    res.status(200).send(usuario);
  }
});

app.delete("/usuarios/:login", (req, res) => {
  const login = req.params.login;

  const index = usuarios.findIndex((u) => u.login === login);
  if (index === -1) {
    res.status(404).send("Usuário não encontrado");
  } else {
    usuarios.splice(index, 1);
    res.sendStatus(204);
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
