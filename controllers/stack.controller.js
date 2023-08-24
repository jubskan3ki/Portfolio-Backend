const Stack = require('../models/stack.model');

// Ajouter une nouvelle compétence
exports.addStack = async (req, res) => {
    try {
        const { competence, description } = req.body;
        const image = req.file.path; // Chemin de l'image depuis multer
        const stack = new Stack({ competence, image, description });
        await stack.save();
        res.status(201).json(stack);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

// Récupérer toutes les compétences
exports.getAllStacks = async (req, res) => {
    try {
        const stacks = await Stack.find();
        res.json(stacks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer une compétence par son ID
exports.getStackById = async (req, res) => {
    try {
        const stack = await Stack.findById(req.params.id);
        if (!stack) {
            return res.status(404).json({ message: 'Compétence introuvable' });
        }
        res.json(stack);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour une compétence par son ID
exports.updateStack = async (req, res) => {
    try {
        const { competence, description } = req.body;
        let image = req.body.image; // Conservez l'image existante par défaut
    
        if (req.file) {
            image = req.file.path; // Mettez à jour l'image si une nouvelle est téléchargée
        }
    
        const stack = await Stack.findByIdAndUpdate(
            req.params.id,
            { competence, image, description },
            { new: true }
        );
    
        if (!stack) {
            return res.status(404).json({ message: 'Compétence introuvable' });
        }
    
        res.json(stack);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

// Supprimer une compétence par son ID
exports.deleteStack = async (req, res) => {
    try {
        const stack = await Stack.findByIdAndDelete(req.params.id);
        if (!stack) {
            return res.status(404).json({ message: 'Compétence introuvable' });
        }
        res.json({ message: 'Compétence supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
