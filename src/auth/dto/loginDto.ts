import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'user@domain.org',
    description: 'The email address of the user',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'password', description: 'The password of the user' })
  password: string;
}
