const { Router } = require('express');

const CategoryController = require('../src/app/controllers/CategoryController');
const ContactController = require('./app/controllers/ContactController');

const router = Router();

// Rotas de contacts
router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);

// Rotas de categories
router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);
router.get('/categories/:id', CategoryController.show);
router.delete('/categories/:id', CategoryController.delete);
router.put('/categories/:id', CategoryController.update);

module.exports = router;
