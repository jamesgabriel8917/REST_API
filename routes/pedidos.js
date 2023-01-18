const express = require('express');
const router = express.Router();

//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'sucesso, pedidos'
    });
});

// INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    res.status(201).send({
        Mensagem: 'usando post dentro da rota de pedidos'
    })
});

// RETORNA UM PRODUTO ESPECIFICO
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido;
        res.status(200).send({
            mensagem: 'sucesso, pedido especifico',
            id: id
        });

});


router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando delete nos pedidod'
    })

})


module.exports = router;



