import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginValidator {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}
