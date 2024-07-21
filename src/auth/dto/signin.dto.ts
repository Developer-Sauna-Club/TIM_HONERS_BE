import { PickType } from '@nestjs/mapped-types';
import { SignUpDTO } from './signup.dto';

export class SignInDTO extends PickType(SignUpDTO, ['email', 'password']) {}
