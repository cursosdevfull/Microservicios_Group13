import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateTokenValidator {
  @IsNotEmpty()
  @IsString()
  accessToken!: string;
}
