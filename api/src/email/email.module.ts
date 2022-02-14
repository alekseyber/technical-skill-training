import { Module } from '@nestjs/common';
import { SettingsModule } from 'src/settings/settings.module';
import { EmailService } from './email.service';

@Module({
  imports: [SettingsModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
