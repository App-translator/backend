import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the user.',
  })
  id: number;

  @Column({ unique: true })
  @ApiProperty({
    example: 'john.doe@domain.com',
    description: 'The email address of the user.',
  })
  email: string;

  @Column()
  password?: string;

  @Column()
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user.',
  })
  firstName: string;

  @Column()
  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user.',
  })
  lastName: string;

  @Column({ default: false })
  @ApiProperty({
    example: true,
    description: 'Whether the user is an admin.',
  })
  isAdmin: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    example: '2020-01-01T00:00:00.000Z',
    description: 'The date and time the user was created.',
  })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  @ApiProperty({
    example: '2020-01-01T00:00:00.000Z',
    description: 'The date and time the user was last updated.',
  })
  updatedAt: Date;
}
