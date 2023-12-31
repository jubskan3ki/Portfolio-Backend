require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const authRoutes = require('./routes/auth.routes');
const stackRoutes = require('./routes/stack.routes');
const projectRoutes = require('./routes/project.routes');
const contactRoutes = require('./routes/contact.routes');

const app = express();

connectDB();

app.use(express.json());

app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stacks', stackRoutes); // Ajouter cette ligne
app.use('/api/projects', projectRoutes); // Ajouter cette ligne
app.use('/api/contacts', contactRoutes); // Ajouter cette ligne

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
