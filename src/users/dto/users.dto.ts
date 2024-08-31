import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto {
  @IsNumber()
  @Type(() => Number)
  userId: number;
}
