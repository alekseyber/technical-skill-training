import { ConflictException, Injectable } from '@nestjs/common';
import * as Email from 'email-templates';
import { join } from 'path';
import { SettingsService } from 'src/settings/settings.service';
import { EmailTemplates } from './types/emailTemplates';
import { LecolsData, LecolsDataResetPassword } from './types/lecolsData';

@Injectable()
export class EmailService {
  constructor(private settingsService: SettingsService) {}

  private validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  private async sendMail(
    lecolsData: LecolsData,
    template: EmailTemplates = EmailTemplates.PASSWORD_RESET
  ): Promise<boolean> {
    if (!this.validateEmail(lecolsData.toEmail))
      throw new ConflictException('Адрес получателя - не валидный e-mail');

    const {
      smtpHost,
      smtpSecure,
      smtpLogin,
      smtpPassword,
      serviceName,
      fromEmail,
    } = await this.settingsService.getSettingsData();

    if (!smtpHost || !smtpLogin || !smtpPassword)
      throw new ConflictException(
        'В настройках сервиса отсутствуют настройки E-Mail траспорта'
      );

    lecolsData.serviceName = serviceName;

    const email = new Email({
      message: {
        from: `${lecolsData.serviceName} <${fromEmail}>`,
      },
      send: true,
      preview: false,
      transport: {
        pool: true,
        host: smtpHost,
        port: smtpSecure ? 465 : 587,
        secure: smtpSecure,
        auth: {
          user: smtpLogin,
          pass: smtpPassword,
        },
      },
    });
    const templatesPath = join(
      __dirname,
      '..',
      '..',
      'src',
      'email',
      'templates',
      template
    );

    return email
      .send({
        template: templatesPath,
        message: { to: lecolsData.toEmail },
        locals: lecolsData,
      })
      .then(() => true)
      .catch((error) => {
        console.log(error);
        throw new ConflictException(error.message);
      });
  }

  async sendAdminEmailResetPassword(
    lecolsData: LecolsDataResetPassword
  ): Promise<boolean> {
    return this.sendMail(lecolsData, EmailTemplates.PASSWORD_RESET);
  }
}
