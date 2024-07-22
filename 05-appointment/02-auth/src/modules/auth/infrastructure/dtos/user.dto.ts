import { plainToInstance } from "class-transformer";

import { User, UserProperties } from "../../domain/auth";
import { UserFactory } from "../../domain/user.factory";
import { UserEntity } from "../entities/user.entity";

export class UserDto {
  static fromDomainToData(model: User | User[]): UserEntity | UserEntity[] {
    if (Array.isArray(model)) {
      return model.map((item) => this.fromDomainToData(item)) as UserEntity[];
    }

    return plainToInstance(UserEntity, model.properties);
  }

  static fromDataToDomain(entity: UserEntity | UserEntity[]): User | User[] {
    if (Array.isArray(entity)) {
      return entity.map((item) => this.fromDataToDomain(item)) as User[];
    }

    const props: UserProperties = {
      userId: entity.userId,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      roles: ["user"], //entity.roles,
      refreshToken: entity.refreshToken,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };

    return UserFactory.create(props);
  }
}
