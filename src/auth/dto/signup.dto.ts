import { IsEmail, IsString } from 'class-validator';

export class SignUpDTO {
  @IsEmail(
    {},
    {
      message: '이메일 형식이 아닙니다.',
    },
  )
  email: string;

  @IsString({
    message: '비밀번호를 입력해주세요.',
  })
  password: string;

  @IsString({
    message: '닉네임을 입력해주세요.',
  })
  nickname: string;
}
