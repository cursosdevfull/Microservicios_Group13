import { Expose, plainToInstance } from "class-transformer";

import { UserModel } from "../../infrastructure/models/user.model";

export class InsertUserResponse {
  @Expose()
  userId!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  age!: number;

  @Expose()
  gender!: string;
}

export class InsertUserResponseDto {
  static fromDomainToResponse(user: UserModel): InsertUserResponse {
    return plainToInstance(InsertUserResponse, user, {
      strategy: "excludeAll",
    });
  }
}
