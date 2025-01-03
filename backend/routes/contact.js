import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

//post route handle contact form
router.post('/' ,async (req, res) => {
    const{name, email, message, subject, mobile} = req.body;
    if (!name || !email || !message || !subject || !mobile) {
        return res.status(400).json({ error: 'All fields are required' });
        
    }
    try {
        const transporter = nodemailer.createTransport({
            service: 'amanvishwa336@gmail.com', //replace with your email service
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        });
        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            html: `
                <h3>Information</h3>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Mobile:</b> ${mobile}</p>
                <h3>Message</h3>
                <p>${message}</p>
            `,
            // subject: 'New message from ${name}',
            text: message
        };
        //send email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send email' });
    }
})

export default router