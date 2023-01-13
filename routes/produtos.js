const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'sucesso, produtos'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).send({
        Mensagem: 'usando post dentro da rota de produtos'
    })
});