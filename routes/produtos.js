const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'sucesso, produtos'
    });
});

// INSERE UM PRODUTO
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        conn.query(
            'INSERT INTO Produtos (nome,preco) VALUES (?, ?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release();
                if(error){
                    return  res.status(500).send({
                                error: error,
                                response: null
                            });
                }

                res.status(201).send({
                    Mensagem: 'Produto inserido com sucesso',
                    id_produto: resultado.insertiId
                })
            }

        )
    } )


});


// RETORNA UM PRODUTO ESPECIFICO
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto;
    if  (id === 'especial') {
        res.status(200).send({
            mensagem: 'sucesso, id especial',
            id: id
        });

    } else {
        res.status(200).send({
            mensagem: 'sucesso, produto especifico',
            id: id
        });

    }
});

// USANDO PATCH PARA PEDIDO
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando patch'
    })
});

//DELETANDO UM PEDIDO
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando delete'
    })
})

module.exports = router;