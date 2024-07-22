import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class GetUserByEmailValidator {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;
}
