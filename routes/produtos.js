const express = require('express');
const router = express.Router();

//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'sucesso, produtos'
    });
});

// INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    res.status(201).send({
        Mensagem: 'usando post dentro da rota de produtos'
    })
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

router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando patch'
    })
});

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando delete'
    })

})


module.exports = router;



