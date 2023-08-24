const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware'); // Importez le middleware de téléchargement
const {
  addStack,
  getAllStacks,
  getStackById,
  updateStack,
  deleteStack
} = require('../controllers/stack.controller');

const router = express.Router();


// Ajouter une nouvelle compétence
router.post('/add', authMiddleware ,upload.single('image'), addStack);

// Récupérer toutes les compétences
router.get('/', authMiddleware ,getAllStacks);

// Récupérer une compétence par son ID
router.get('/:id', authMiddleware ,getStackById);

// Mettre à jour une compétence par son ID
router.put('/:id', authMiddleware ,upload.single('image'), updateStack);

// Supprimer une compétence par son ID
router.delete('/:id', authMiddleware ,deleteStack);

module.exports = router;
