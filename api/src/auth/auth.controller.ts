import { Controller, Body, Post, BadRequestException } from '@nestjs/common';
import { CreateUserAdminDto, CreateUserDto } from 'src/users/dto/createUserDto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { UserRole } from 'src/users/schemas/user.schema';
import { AuthDto } from './dto/authDto';
import { Public } from './public.decorator';
import { ResetPasswordDto } from './dto/resetPasswordDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtToken } from './dto/payloadTokenDto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Public()
  @ApiOperation({ summary: 'Авторизация' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь авторизирован',
    type: JwtToken,
  })
  @ApiResponse({
    status: 401,
    description: 'Логин или пароль не найден',
  })
  @Post('login')
  async login(@Body() authDto: AuthDto) {
    const user = await this.authService.validateUser(authDto);
    return this.authService.getJwtToken(user);
  }

  @Public()
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь зарегистрирован',
    type: JwtToken,
  })
  @Post('registration')
  async registration(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.authService.getJwtToken(user);
  }

  @Public()
  @ApiOperation({ summary: 'Регистрация администратора на старте' })
  @ApiResponse({
    status: 201,
    description: 'Администратор зарегистрирован',
    type: JwtToken,
  })
  @ApiResponse({
    status: 400,
    description: 'Администратор не зарегистрирован, т.к. уже есть в БД',
  })
  @Post('start-registration')
  async startRegistration(@Body() createUserDto: CreateUserDto) {
    const isStart = await this.usersService.createStartValidate();

    if (!isStart) throw new BadRequestException();
    const createUserAdminDto: CreateUserAdminDto = {
      ...createUserDto,
      userRole: UserRole.ADMIN,
    };

    const user = await this.usersService.create(createUserAdminDto);

    return this.authService.getJwtToken(user);
  }

  @Public()
  @ApiOperation({ summary: 'Сброс пароля' })
  @ApiResponse({
    status: 201,
    description: 'Всегда успех',
  })
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    this.authService.resetPassword(resetPasswordDto);
    return true;
  }
}
