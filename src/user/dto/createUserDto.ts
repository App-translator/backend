import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'john.doe@domain.com',
    description: 'The email address of the user',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'password', description: 'The password of the user' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  lastName: string;
}
