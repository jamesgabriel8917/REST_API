const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({error: error});
        }
        conn.query(
            'SELECT * FROM Pedidos;',
            (error, result, fields) => {
                conn.release();

                if(error) return res.status(500).send({error: error});

                const response ={
                    quantidade_pedidos: result.length,
                    pedidos: result.map(ped => {
                        return {
                            id_pedido: ped.id_pedido,
                            quantidade: ped.quantidade,
                            id_produto: ped.id_produto

                        }
                    })
                }

                res.status(200).send(response);
            }
        )
    })
});

// INSERE UM PEDIDO
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error){
            return res.status(500).send({ error: error });
        }

        conn.query(
            `INSERT INTO Pedidos (quantidade, id_produto) values (?, ?)`,
            [req.body.quantidade, req.body.id_produto],
            (error, result, field) => {
                conn.release();
                if(error){
                    return res.status(500).send({ error: error });
                }
                const response = {
                    mensagem: "Pedido inserido com sucesso",
                    ProdutoCriado:{
                        id_pedido: result.id_pedido,
                        nome: req.body.quantidade,
                        preco: req.body.id_produto
                    }
                }
                res.status(201).send(response)
            }
        )


    })
});

// RETORNA UM PEDIDO ESPECIFICO
router.get('/:id_pedido', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({error: error}) 
        }
        conn.query(
            'SELECT * FROM Pedidos WHERE id_pedido = ?;',
            [req.params.id_pedido],
            (error, result, fields) => {
                conn.release();

                if(error) return res.status(500).send({error: error})
                if(result.length==0){
                    return res.status(404).send({
                        mensagem: 'Pedido not found'
                    });
                }
                const response = {
                    produto: result.map(prod => {
                        return {
                            nome: result[0].quantidade,
                            preco: result[0].id_produto,
        
                        }
                    })
                }
                res.status(200).send(response);


            }
        )
    })
});


//DELETA UM PEDIDO
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({error: error}) 
        }
        conn.query(
            `DELETE FROM Pedidos WHERE id_pedido = ?`,
            [req.body.id_pedido],
            (error, result, fields) => {
                conn.release();

                if(error) return res.status(500).send({error: error})
                const response = {
                    mensagem: 'Pedido removido com sucesso',
                    result: result

                }
                res.status(202).send(response);


            }
        )
    })

})

module.exports = router;