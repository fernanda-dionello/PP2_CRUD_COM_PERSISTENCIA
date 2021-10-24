const produtosRepository = require('../repository/produtos-repository');

//GET ALL - produtos
exports.listarProdutos = (req, resp) => {
    produtosRepository.getProdutos((err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: 'Nenhum produto encontrado!'});
        } else {
            resp.json(res.rows);
        };
    });
};

//GET - produto com ID
exports.listarProdutoPorId = (req, resp) => {
    const id = req.params.id;

    produtosRepository.getProdutoPorId(id, (err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: 'Nenhum produto encontrado!'});
        } else {
            resp.json(res.rows);
        };
    });
};

//POST - criar um novo produto
exports.criarProduto = (req, resp) => {
    let produto = req.body;

    produtosRepository.postProduto(produto, (err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else {
            resp.status(201).json({msg: 'Produto criado!', produto: res.rows});
        };
    });
};

//PUT - update produtos com ID
exports.atualizarProduto = (req, resp) => {
    const id = req.params.id;
    const produtoAtualizado = req.body;

    produtosRepository.putProdutoAtualizado(id, produtoAtualizado, (err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: `Produto de id ${id} não encontrado.`});
        } else {
            resp.json({msg: `Produto de id ${id} atualizado!`, produto: res.rows});
        };
    });
};

//DELETE - deletar um item com ID
exports.deletarProduto = (req, resp) => {
    const id = req.params.id;
    produtosRepository.deleteProduto(id, (err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: `Produto de id ${id} não encontrado.`});
        } else {
            resp.json({msg: 'Produto removido!', produto: res.rows});
        };
    });
};