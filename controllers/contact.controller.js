const Contact = require('../models/contact.model');
const nodemailer = require('nodemailer');

// Ajouter un nouveau contact
exports.addContact = async (req, res) => {
  try {
    const { type, email, phone, subject, firstName, lastName } = req.body;

    const newContact = new Contact({
      type,
      email,
      phone,
      subject,
      firstName,
      lastName,
    });

    await newContact.save();

    res.status(201).json({ message: 'Contact ajouté avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer tous les contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un contact
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact non trouvé' });
    }
    res.json({ message: 'Contact supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Envoyer un e-mail de contact
exports.sendEmail = async (req, res) => {
  try {
    const { type, email, phone, subject, firstName, lastName } = req.body;

    // Configuration du transporteur de messagerie
    const transporter = nodemailer.createTransport({
      // Configurations du service de messagerie
      service: 'Gmail',
      auth: {
        user: 'aitaddajuba93@gmail.com', // Remplacez par votre propre e-mail
        pass: process.env.EMAIL_PASSWORD, // Remplacez par votre propre mot de passe
      },
    });

    // Construction du message
    const message = `
      Prénom : ${firstName}
      Nom : ${lastName}
      E-mail : ${email}
      Téléphone : ${phone}
      Sujet : ${subject}
    `;

    // Options de l'e-mail
    const mailOptions = {
      from: email,
      to: 'aitaddajuba93@gmail.com', // Votre adresse e-mail ici
      subject: type,
      text: message,
    };

    // Envoyer l'e-mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail' });
      } else {
        console.log('E-mail envoyé :', info.response);
        res.json({ message: 'E-mail envoyé avec succès' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
