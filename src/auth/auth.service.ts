import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginAuthResponseDto } from './dto/loginAuthResponseDto';
import { LoginDto } from './dto/loginDto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && (await compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<LoginAuthResponseDto> {
    const user = await this.userService.findOne(loginDto.email);

    const payload = { email: user.email, sub: user.id };

    delete user.password;

    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
