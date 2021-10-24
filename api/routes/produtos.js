const express = require('express');
const router = express.Router();

const produtosController = require('../controllers/produtos');

router.get('/', (req, res) => {
    res.send('Hello world');
});
router.get('/produtos', produtosController.listarProdutos);
router.get('/produtos/:id', produtosController.listarProdutoPorId);
router.post('/produtos', produtosController.criarProduto);
router.put('/produtos/:id', produtosController.atualizarProduto);
router.delete('/produtos/:id', produtosController.deletarProduto);

module.exports = router;


