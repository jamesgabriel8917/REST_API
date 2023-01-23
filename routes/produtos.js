const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({error: error}) 
        }
        conn.query(
            'SELECT * FROM Produtos;',
            (error, resultado, fields) => {
                conn.release();

                if(error) return res.status(500).send({error: error})
                res.status(200).send({
                    response: resultado
                });


            }
        )
    })

});

// INSERE UM PRODUTO
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) {
            return res.status(500).send({ error: error });
        }
        conn.query(
            'INSERT INTO Produtos (nome, preco) VALUES (?, ?)',
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
    })


});


// RETORNA UM PRODUTO ESPECIFICO
router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({error: error}) 
        }
        conn.query(
            'SELECT * FROM Produtos WHERE id_produto = ?;',
            [req.params.id_produto],
            (error, resultado, fields) => {
                conn.release();

                if(error) return res.status(500).send({error: error})
                res.status(200).send({
                    response: resultado
                });


            }
        )
    })
});

// USANDO PATCH PARA PEDIDO
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({error: error}) 
        }
        conn.query(
            `UPDATE Produtos 
             SET nome         = ?,
                 preco         = ?
            WHERE id_produto = ?;`,
            [
                req.body.nome, 
                req.body.preco, 
                req.body.id_produto
            ],
            (error, resultado, fields) => {
                conn.release();

                if(error) return res.status(500).send({error: error})
                res.status(202).send({
                    mensagem: "Produto alterado com sucesso"
                });


            }
        )
    })
});

//DELETANDO UM PEDIDO
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({error: error}) 
        }
        conn.query(
            `DELETE FROM Produtos WHERE id_produto = ?;`,
            [req.body.id_produto],
            (error, resultado, fields) => {
                conn.release();

                if(error) return res.status(500).send({error: error})
                res.status(202).send({
                    mensagem: "Produto excluido"
                });


            }
        )
    })
})

module.exports = router;