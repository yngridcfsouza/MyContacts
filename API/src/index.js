const express = require('express');

require('express-async-errors');

const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');
const router = require('./routes');

const app = express();

app.use(cors); /* middleware de permissão da origem */
app.use(express.json()); /* executa o body parse */

app.use(router); /* executa as rotas */
app.use(errorHandler); /* executa o middleware de catch de erros */

app.listen(3001, () => console.log('Server started at http://localhost:3001'));
