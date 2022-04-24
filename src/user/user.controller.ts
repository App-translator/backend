import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/createUserDto';
import { DeleteUserDto } from './dto/deleteUserDto';
import { User } from './User';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully found.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const foundUser = await this.userService.findOneById(id);

    if (!foundUser) {
      throw new NotFoundException();
    } else {
      delete foundUser.password;
    }

    return foundUser;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Users has been retrieved',
    type: User,
    isArray: true,
  })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'User has been created',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Delete()
  @ApiResponse({
    status: 204,
    description: 'Get the deleted user record',
    type: User,
  })
  async delete(@Body() deleteUserDto: DeleteUserDto) {
    const user = await this.userService.deleteUser(deleteUserDto);

    if (!user) {
      throw new NotFoundException();
    } else {
      delete user.password;
    }

    return user;
  }
}
