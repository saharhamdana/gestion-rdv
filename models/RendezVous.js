const mongoose = require('mongoose');

const rendezVousSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    professionnel: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['En attente', 'Confirmé', 'Annulé'], default: 'En attente' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RendezVous', rendezVousSchema);
