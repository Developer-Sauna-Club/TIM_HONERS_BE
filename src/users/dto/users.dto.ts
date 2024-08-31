import { IsNumber } from 'class-validator';

export class UserDto {
  @IsNumber()
  userId: number;
}
