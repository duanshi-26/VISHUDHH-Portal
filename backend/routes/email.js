const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

router.post('/send', async (req, res) => {
    const { place, id, recipientEmail, body } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'ankushinstagram57@gmail.com',
                pass: 'ufrhekotujgvgzlf',
            },
        });

        const mailOptions = {
            from: 'ankushinstagram57@gmail.com',
            to: recipientEmail,
            subject: `Report for ${place}`,
            text: `Place ID: ${id}\n\nMessage:\n${body}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to send email');
    }
});

module.exports = router;
