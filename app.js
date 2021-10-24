const express = require('express');
const routes = require('./api/routes/produtos');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', routes);

app.listen(port, () => {
    console.log(`Iniciando servidor na porta ${port}`);
});