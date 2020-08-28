import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    // todo: add bcrypt comparison
    const user = await this.userRepository.findByEmail(email);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserWithGoogle(email): Promise<any> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      const { password, ...result } = user;
      return result;
    } else {
      // todo: create user
    }
    return null;
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
