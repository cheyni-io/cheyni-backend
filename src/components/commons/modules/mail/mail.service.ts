import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  private imagePath = join(__dirname, '/templates/img');

  private async sendMessage(
    receiver: string,
    subject: string,
    template: string,
    context: Record<string, string>,
    attachments?: any[],
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: receiver,
        subject,
        template,
        context: { ...context, year: new Date().getFullYear().toString() },
        attachments,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async resetPassword(email: string, userPassword: string): Promise<void> {
    return await this.sendMessage(
      email,
      'Reset Password',
      './reset-password',
      {
        password: userPassword,
      },
      [
        {
          filename: 'logo.png',
          path: `${this.imagePath}/logo.png`,
          cid: 'logo@image.com',
        },
      ],
    );
  }
}
