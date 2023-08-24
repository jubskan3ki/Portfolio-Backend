const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    nomProjet: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    lien: {
        type: String,
        required: true,
    },
    groupeOuSolo: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    stack: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stack',
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
