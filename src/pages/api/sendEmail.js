import { validate } from 'email-validator';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { recipient, subject, body, useEmail, usePassword } = req.body;

  if (!recipient || !subject || !body) {
    res.status(400).json({ message: 'Invalid request' });
    return;
  }

  try {
    console.log(recipient, subject, body, useEmail, usePassword);
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Change to your email provider
      auth: {
        user: useEmail, // Replace with your email address
        pass: usePassword, // Replace with your email password
      },
    });

    const mailOptions = {
      from: useEmail, // Replace with your email address
      to: recipient,
      subject: subject,
      text: body,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${recipient}!`);


    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
