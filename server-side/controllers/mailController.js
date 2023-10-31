import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({
    path: './config/.env'
});


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // your email address to send email from
        pass: process.env.PASSWORD // your gmail account password
    },
    tls: {
        rejectUnauthorized: false
    }
});


const sendEmailFunction = (name, email, subject, message, callback) => {
    const mailOptions = {
        from: process.env.EMAIL, // sender address
        to: "osama.mhaleam@gmail.com", // list of receivers
        subject: subject,
        html: `<p>From: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            callback(error);
        } else {
            callback(null, info.response);
            console.log(info.response);
        }
    });
};

const sendEmail = async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        if (!email || !subject || !message || !name) {
            return res.status(400).json({ message: 'Please enter all fields' });
        } else {
            sendEmailFunction(name, email, subject, message, (error, response) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: 'Email sending failed' });
                } else {
                    return res.status(200).json({ message: 'Email sent successfully' });
                }
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export default sendEmail;