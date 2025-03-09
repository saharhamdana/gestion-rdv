const nodemailer = require("nodemailer");
require("dotenv").config(); // Charger les variables d'environnement

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL, // Ton adresse e-mail
        pass: process.env.EMAIL_PASSWORD, // Ton mot de passe ou mot de passe d’application
    },
});

const sendReminderEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            text,
        });
        console.log("E-mail envoyé avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
    }
};

module.exports = { sendReminderEmail };
