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
            (error, result, fields) => {
                conn.release();

                if(error) return res.status(500).send({error: error})
                const response = {
                    quantidade: result.length,
                    produtos: result.map(prod => {
                        return {
                            id_produto: prod.id_produto,
                            nome: prod.nome,
                            preco: prod.preco,
                            request: {
                            tipo: "GET",
                            descricao: '',
                            url: "http://localhost:3000/produtos/"+prod.id_produto
                            }
                        }
                    })
                }
                res.status(200).send(response);


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
            (error, result, field) => {
                conn.release();
                if(error){
                    return  res.status(500).send({
                                error: error,
                                response: null
                            });
                }
                const response = {
                    mesnagem: "Produto inserido com sucesso",
                    ProdutoCriado:{
                        id_produto: resultado.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco
                    }
                }
                res.status(201).send(response)
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
            (error, result, fields) => {
                conn.release();

                if(error) return res.status(500).send({error: error})
                if(result.length==0){
                    return res.status(404).send({
                        mensagem: 'Product not found'
                    });
                }
                const response = {
                    produto: result.map(prod => {
                        return {
                            nome: result[0].nome,
                            preco: result[0].preco,
                            request: {
                            tipo: "GET",
                            descricao: '',
                            url: "http://localhost:3000/produtos/"
                            }
                        }
                    })
                }
                res.status(200).send(response);


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
            (error, result, fields) => {
                conn.release();
                if(error) return res.status(500).send({error: error})
                const response = {
                    mensagem: "Produto atualizado com sucesso",
                    ProdutoAtualizado: {
                        id_produto: result.id_produto,
                        nome: result.nome,
                        preco: result.preco,
                        request: {
                            tipo: "GET",
                            descricao: "Retorna os detalhes do produto",
                            url: "http://localhost:3000/produtos/"+req.body.id_produto
                        }
                    }
                }
                res.status(202).send(response);


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
            (error, result, fields) => {
                conn.release();

                if(error) return res.status(500).send({error: error})
                const response = {
                    mensagem: 'Produto removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: '',
                        url: ''
                    }
                }
                res.status(202).send(response);


            }
        )
    })
})

module.exports = router;