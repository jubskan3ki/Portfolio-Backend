const Project = require('../models/project.model');

// Ajouter un nouveau projet
exports.addProject = async (req, res) => {
    try {
        const { nomProjet, time, lien, groupeOuSolo, description, stack, image } = req.body;
        const project = new Project({ nomProjet, time, lien, groupeOuSolo, description, stack, image });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

// Récupérer tous les projets
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un projet par son ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Projet introuvable' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un projet par son ID
exports.updateProject = async (req, res) => {
    try {
        const { nomProjet, time, lien, groupeOuSolo, description, stack } = req.body;
        const projectFields = { nomProjet, time, lien, groupeOuSolo, description, stack };
        
        if (req.file) {
            projectFields.image = req.file.path; // Chemin de l'image téléchargée
        }
    
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            projectFields,
            { new: true }
        );
    
        if (!project) {
            return res.status(404).json({ message: 'Projet introuvable' });
        }
    
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

// Supprimer un projet par son ID
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Projet introuvable' });
        }
        res.json({ message: 'Projet supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
