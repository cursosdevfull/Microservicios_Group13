import { Type } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  Min,
  MinLength,
} from "class-validator";

import { EGender } from "../../domain/user";

export class InsertUserValidator {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name!: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
  password!: string;

  @IsNotEmpty()
  @Min(18)
  @Max(130)
  @Type(() => Number)
  age!: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(EGender)
  gender!: string;
}
