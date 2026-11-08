import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsEmail, IsString, MinLength } from 'class-validator';

class RegisterDto { @IsEmail() email!: string; @IsString() @MinLength(12) password!: string; }
class LoginDto { @IsEmail() email!: string; @IsString() @MinLength(12) password!: string; }
@Controller('auth')
export class AuthController {
  @Post('register') register(@Body() _body: RegisterDto) {
    return { status: 'not_configured', message: 'Connect the selected identity provider and persist the user before enabling registration.' };
  }
  @Post('login') login(@Body() _body: LoginDto) {
    return { status: 'not_configured', message: 'Authentication provider integration is required. No password is stored by this scaffold.' };
  }
  @Get('status') status() { return { authentication: 'integration_required', mfa: 'required_before_production' }; }
}
