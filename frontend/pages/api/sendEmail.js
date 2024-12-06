import nodemailer from 'nodemailer';

export default async function handler(req, res) {

    console.log("Entering1");
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { senderEmail, receiverEmail, message, emailContent, emailContentForUs } = req.body;

  if (!senderEmail || !receiverEmail || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: 'vigneshjc63@gmail.com', // Your email
        pass: 'wvwc jppq uhcf chut', // Your email password or app password
      },
    });
    

    // Email to yourself
    const mailOptions1 = {
      from: senderEmail,
      to: senderEmail, // Your email
      subject: 'New Enrollment Request',
      text: `${emailContentForUs} Details:\n\n${message}`,
    };

    // Email to another person
    const mailOptions2 = {
      from: senderEmail,
      to: receiverEmail, // Another person's email
      subject: 'New Enrollment Request',
      text: `${emailContent} Details:\n\n${message}`,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(mailOptions1),
      transporter.sendMail(mailOptions2),
    ]);

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send emails' });
  }
}
