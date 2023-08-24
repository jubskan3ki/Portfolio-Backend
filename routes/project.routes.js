const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware'); // Importez le middleware de téléchargement
const {
  addProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require('../controllers/project.controller');

const router = express.Router();

// Ajouter un nouveau projet
router.post('/add', authMiddleware ,upload.single('image'), addProject);

// Récupérer tous les projets
router.get('/', authMiddleware ,getAllProjects);

// Récupérer un projet par son ID
router.get('/:id', authMiddleware ,getProjectById);

// Mettre à jour un projet par son ID
router.put('/:id', authMiddleware ,upload.single('image'), updateProject);

// Supprimer un projet par son ID
router.delete('/:id', authMiddleware , deleteProject);

module.exports = router;
