import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<any> {
    return await this.authService.register(authCredentialsDto);
  }

  @Post('/login')
  async login(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const user = await this.authService.validateUser(authCredentialsDto);
    return this.authService.login(user);
  }
}
