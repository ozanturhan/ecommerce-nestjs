import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { GoogleAuthGuard } from '../../guards/google-auth.guard';
import { ApiBasicAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiBasicAuth()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  @ApiExcludeEndpoint()
  async google(@Req() req) {
    return this.authService.login(req.user);
  }
}
