const express = require('express');
const RendezVous = require('../models/RendezVous');
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { client, professionnel, date } = req.body;
        const rendezVous = new RendezVous({ client, professionnel, date });
        await rendezVous.save();
        res.status(201).json({ message: "Rendez-vous créé avec succès !" });
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const { date, status } = req.body;
        const updatedRendezVous = await RendezVous.findByIdAndUpdate(
            req.params.id,
            { date, status },
            { new: true }
        );
        res.json(updatedRendezVous);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour" });
    }
});

router.delete('/cancel/:id', async (req, res) => {
    try {
        await RendezVous.findByIdAndDelete(req.params.id);
        res.json({ message: "Rendez-vous annulé !" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'annulation" });
    }
});

router.get('/all/:userId', async (req, res) => {
    try {
        const rendezVous = await RendezVous.find({
            $or: [{ client: req.params.userId }, { professionnel: req.params.userId }]
        }).populate('client professionnel');
        res.json(rendezVous);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des rendez-vous" });
    }
});

module.exports = router;
