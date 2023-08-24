const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const {
  addContact,
  getAllContacts,
  sendEmail,
} = require('../controllers/contact.controller');

const router = express.Router();

// Ajouter un nouveau contact
router.post('/', addContact);

// Récupérer tous les contacts (nécessite l'authentification)
router.get('/', authMiddleware, getAllContacts);

// Envoyer un e-mail de contact
router.post('/sendEmail', sendEmail);

module.exports = router;
