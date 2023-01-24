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
            `INSER INTO Produto (quantidade, id_produto) values (?, ?)`,
            [req.body.quantidade, req.body.id_produto]
        )

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