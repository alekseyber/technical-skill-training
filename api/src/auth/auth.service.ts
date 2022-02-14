import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants';
import { JwtToken, PayloadTokenDto } from './dto/payloadTokenDto';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/authDto';
import { ResetPasswordDto } from './dto/resetPasswordDto';
import { getNewPassword, passwordSetHash } from 'src/utils/passwordSetHash';
import { EmailService } from 'src/email/email.service';
import { UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private emailService: EmailService,
    private jwtService: JwtService
  ) {}

  async validateUser(authDto: AuthDto): Promise<UserDocument> {
    const user = await this.usersService.findOneLogin(authDto.username);

    if (!user) throw new UnauthorizedException('Логин или пароль не найден');

    const isPasswordCorrect: boolean = bcrypt.compareSync(
      authDto.password,
      user.password
    );

    if (!isPasswordCorrect)
      throw new UnauthorizedException('Логин или пароль не найден');

    return user;
  }

  async validateActiveUser(_id: string): Promise<boolean> {
    return await this.usersService.isActiveUserById(_id);
  }

  async getJwtToken(user: UserDocument): Promise<JwtToken> {
    const payload: PayloadTokenDto = {
      username: user.username,
      userRole: user.userRole,
      sub: String(user._id),
      tokenType: jwtConstants.tokenType,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<boolean> {
    const user = await this.usersService.getUserByEmail(resetPasswordDto);
    if (!user) return false;

    const password = getNewPassword();

    user.password = passwordSetHash(password);

    const rezult = await this.emailService.sendAdminEmailResetPassword({
      password,
      toEmail: user.email,
      username: user.username,
    });
    if (rezult) {
      await user.save();
    }
    return rezult;
  }
}
