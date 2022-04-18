import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/User';

export class LoginAuthResponseDto {
  @ApiProperty({ description: 'JWT token for authentification' })
  token: string;

  @ApiProperty({ description: 'User infos' })
  user: User;
}
