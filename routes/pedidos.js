const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'sucesso, pedidos'
    });
});

// INSERE UM PEDIDO
router.post('/', (req, res, next) => {
    const pedido ={
        id_pedido: req.body.id_edido,
        quantidade: req.body.quantidade
    };
    res.status(201).send({
        Mensagem: 'usando post dentro da rota de pedidos',
        PedidoCriado: pedido
    })
});

// RETORNA UM PEDIDO ESPECIFICO
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido;
        res.status(200).send({
            mensagem: 'sucesso, pedido especifico',
            id: id
        });
});


//DELETA UM PEDIDO
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando delete nos pedidos'
    })

})

module.exports = router;