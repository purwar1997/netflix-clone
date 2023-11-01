import transporter from '../config/transporter.config.js';
import config from '../config/config.js';

const mailSender = async options => {
  const info = await transporter.sendMail({
    from: config.SMTP_HOST,
    to: options.email,
    subject: options.subject,
    text: options.text,
  });

  return info;
};

export default mailSender;
