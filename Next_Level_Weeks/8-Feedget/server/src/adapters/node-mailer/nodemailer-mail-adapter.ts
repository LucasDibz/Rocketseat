import { MailAdapter, SendMailData } from '../mail-adapter';
import nodemailer from 'nodemailer';

export class NodeMailerMailAdapter implements MailAdapter {
  private transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  async sendMail({ subject, body }: SendMailData) {
    await this.transport.sendMail({
      from: 'Equipe Feedget <test@feedget.com>',
      to: 'Lucas Dib <batata@gmail.com>',
      subject,
      html: body,
    });
  }
}
