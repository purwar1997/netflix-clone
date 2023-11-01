import nodemailer from nodemailer;
import config from "./config";

const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: true,
    auth: {
        user: config.SMTP_USERNAME,
        pass: config.SMTP_PASSWORD
    }
})

export default transporter;