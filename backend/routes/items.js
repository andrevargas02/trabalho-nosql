const express = require('express');
const router = express.Router();
const itemsCtrl = require('../controllers/itemsController');

router.get('/', itemsCtrl.getAll);
router.get('/:id', itemsCtrl.getById);
router.post('/', itemsCtrl.create);
router.put('/:id', itemsCtrl.update);
router.delete('/:id', itemsCtrl.remove);

module.exports = router;