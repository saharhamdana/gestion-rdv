const express = require('express');
const RendezVous = require('../models/RendezVous');
const router = express.Router();
const { sendReminderEmail } = require("../utils/emailService"); // Assure-toi du bon chemin


/**
 * @swagger
 * /rendezvous/create:
 *   post:
 *     summary: Créer un rendez-vous
 *     description: Permet de créer un nouveau rendez-vous
 *     tags: [Rendez-vous]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client:
 *                 type: string
 *                 example: "65f4b2e3cfe3a5a5b0d4d8a1"
 *               professionnel:
 *                 type: string
 *                 example: "65f4b2e3cfe3a5a5b0d4d8a2"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-03-07T10:00:00Z"
 *     responses:
 *       201:
 *         description: Rendez-vous créé avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post("/create", async (req, res) => {
    try {
        const { client, professionnel, date, emailClient } = req.body;

        const rendezVous = new RendezVous({ client, professionnel, date });
        await rendezVous.save();

        await sendReminderEmail(
            emailClient,
            "Confirmation de votre rendez-vous",
            `Bonjour ${client}, votre rendez-vous avec ${professionnel} est confirmé pour le ${date}.`
        );

        res.status(201).json({ message: "Rendez-vous créé et e-mail envoyé !" });
    } catch (error) {
        console.error("Erreur serveur :", error); 
        res.status(500).json({ error: "Erreur serveur", details: error.message });
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

router.get('/all', async (req, res) => {
    try {
        const rendezVous = await RendezVous.find();
        res.json(rendezVous);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

module.exports = router;
