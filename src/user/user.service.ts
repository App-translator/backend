import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';
import { User } from './User';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async searchForAdminUser(): Promise<User[]> {
    return this.userRepository.find({ isAdmin: true });
  }

  async createDefaultAdminUser(createUserDto: CreateUserDto): Promise<User> {
    const adminUsers = await this.searchForAdminUser();

    if (adminUsers.length > 0) {
      throw new NotFoundException();
    }

    console.log(createUserDto);

    const user = new User();
    user.email = createUserDto.email;
    user.password = await hash(
      createUserDto.password,
      this.configService.get('bcryptSaltRounds'),
    );
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.isAdmin = true;

    const createdUser = await this.userRepository.save(user);

    delete createdUser.password;

    return createdUser;
  }
}
