const express = require('express');
const app = express();
const morgan = require('morgan');

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));//apenas dados simples
app.use(bodyParser.json()); //json de entrada no body


app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

//qunado nao encontra entra aqui e gera erro
app.use((req, res, next) => {
    const erro = new Error('Não encontrado')
    erro.status(404);
    next(erro);
});

app.use((error, req, res, next) => {
    req.status(error.status || 500);
    return res.send({
        erro:{
            mensagem: error.message
        }
    })
});



module.exports = app;

