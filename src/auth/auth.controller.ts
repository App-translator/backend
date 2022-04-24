import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/createUserDto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginAuthResponseDto } from './dto/loginAuthResponseDto';
import { LoginDto } from './dto/loginDto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto): Promise<LoginAuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('createDefaultAdminUser')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'The default admin user has been successfully created.',
  })
  async createDefaultAdminUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createDefaultAdminUser(createUserDto);
  }
}
