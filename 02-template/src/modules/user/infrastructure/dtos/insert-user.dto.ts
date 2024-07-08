import { plainToClass } from "class-transformer";

import { User } from "../../domain/user";
import { UserModel } from "../models/user.model";

export class InsertUserDto {
  static fromDomainToData(user: User): UserModel {
    return plainToClass(UserModel, user.properties());
  }
}
