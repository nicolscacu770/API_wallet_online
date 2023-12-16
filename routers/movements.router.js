const { findAll, findById, save, update, deletear } = require('../services/movements.services');
const express = require('express');

const router = express.Router();

router.use(express.json());
router.get('/', findAll);
router.get('/:id', findById);
router.post('/:idUser', save);
router.patch('/:id', update);
router.delete('/:id', deletear);

module.exports = router;