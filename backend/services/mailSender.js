import transporter from '../config/transporter.config';
import config from '../config/config';

const mailSender = async options => {
  const { messageId } = await transporter.sendMail({
    from: config.SMTP_HOST,
    to: options.email,
    subject: options.subject,
    text: options.text,
  });

  return messageId;
};

export default mailSender;
