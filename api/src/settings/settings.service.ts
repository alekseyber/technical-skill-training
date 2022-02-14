import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ProtectionRezultDto,
  PublicSettingsResponse,
  SettingsDto,
} from './dto/settingsDto';
import { Settings, SettingsDocument } from './schemas/settings.schema';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name)
    private settingsModel: Model<SettingsDocument>
  ) {}

  private async getSettingsDocument(): Promise<SettingsDocument> {
    const settings = await this.settingsModel.findOne(
      { current: true },
      { current: false }
    );
    if (!settings) {
      const createdSettings = new this.settingsModel({ current: true });
      return await createdSettings.save();
    }

    return settings;
  }
  async getPublicSettingsData(): Promise<PublicSettingsResponse> {
    const doc = await this.getSettingsDocument();
    return {
      serviceName: doc.serviceName,
    };
  }

  async getSettingsData(): Promise<ProtectionRezultDto> {
    const doc = await this.getSettingsDocument();
    return this.protectionRezult(doc);
  }
  protectionRezult(settingsDocument: SettingsDocument): ProtectionRezultDto {
    const docObject = settingsDocument.toObject();
    const keys = Object.keys(docObject).filter(
      (key) =>
        key !== '__v' &&
        key !== 'createdAt' &&
        key !== 'updatedAt' &&
        key !== 'current'
    ) as Array<keyof typeof docObject>;
    const newDoc: ProtectionRezultDto = {};

    keys.forEach((key) => {
      newDoc[key] = docObject[key];
    });
    return newDoc;
  }

  async updateSettingsDocument(
    updateSettingsDto: SettingsDto
  ): Promise<ProtectionRezultDto> {
    const doc = await this.settingsModel.findOneAndUpdate(
      { current: true },
      updateSettingsDto
    );
    return this.protectionRezult(doc);
  }
}
