const express = require('express');
const movimientos = require('./movements.router');
const usuarios = require('./users.router');

//function routers
function router(app) {
    const router = express.Router();
    app.use('/', router);
    router.use('/movimientos', movimientos);
    router.use('/usuarios', usuarios);

}

module.exports = router;