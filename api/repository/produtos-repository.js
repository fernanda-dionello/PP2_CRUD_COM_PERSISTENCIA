const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const conexao = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

exports.getProdutos = (callback) => {
    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query('SELECT * FROM produto ORDER BY id', (err, res) => {
        callback(err,res);
        cliente.end();
    });
};

exports.getProdutoPorId = (id, callback) => {
    const values = [id];
    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query('SELECT * FROM produto WHERE id=$1', values, (err, res) => {
        callback(err,res);
        cliente.end();
    });
};

exports.postProduto = (produto, callback) => {
    const values = [produto.nome, produto.valor];
    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query('INSERT INTO produto(nome, valor) VALUES ($1, $2) RETURNING *', values, (err, res) => {
        callback(err,res);
        cliente.end();
    });
}

exports.putProdutoAtualizado = (id, produto, callback) => {
    const values = [produto.nome, produto.valor, id];
    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query('UPDATE produto SET nome=$1, valor=$2 WHERE id=$3 RETURNING *', values, (err, res) => {
        callback(err,res);
        cliente.end();
    });
};

exports.deleteProduto = (id, callback) => {
    const values = [id];
    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query('DELETE FROM produto WHERE id=$1 RETURNING *', values, (err, res) => {
        callback(err, res);
        cliente.end();
    });
};