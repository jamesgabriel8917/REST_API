const express = require('express');
const router = express.router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'successfdddd'
    });
});