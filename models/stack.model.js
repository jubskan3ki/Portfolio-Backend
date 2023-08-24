const mongoose = require('mongoose');

const stackSchema = new mongoose.Schema({
    competence: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    projets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }],
});

const Stack = mongoose.model('Stack', stackSchema);

module.exports = Stack;
