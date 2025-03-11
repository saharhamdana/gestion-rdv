
const mongoose = require('mongoose');

const rendezVousSchema = new mongoose.Schema({
    client: { type: String, required: true }, 
    professionnel: { type: String, required: true }, 
    date: { type: Date, required: true },
});



module.exports = mongoose.model('RendezVous', rendezVousSchema);
