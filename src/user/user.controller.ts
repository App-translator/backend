import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

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
