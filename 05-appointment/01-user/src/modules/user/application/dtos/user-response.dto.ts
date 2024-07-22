import { Expose, plainToInstance } from "class-transformer";

import { User } from "../../domain/user";

export class UserResponse {
  @Expose()
  userId!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;
}

export class UserResponseWithPassword {
  @Expose()
  userId!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  password!: string;
}

export class UserResponseDto {
  static fromDomainToResponse(user: User): UserResponse {
    return plainToInstance(UserResponse, user.properties, {
      strategy: "excludeAll",
    });
  }

  static fromDomainToResponseWithPassword(
    user: User
  ): UserResponseWithPassword {
    return plainToInstance(UserResponseWithPassword, user.properties, {
      strategy: "excludeAll",
    });
  }
}
