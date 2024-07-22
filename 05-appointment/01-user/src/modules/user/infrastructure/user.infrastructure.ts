import { err, ok, Result } from "neverthrow";

import { DatabaseBootstrap } from "../../../bootstrap/database.bootstrap";
import { ERROR_MESSAGES } from "../../../core/errors/error-base";
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/user";
import { UserDto } from "./dtos/user.dto";
import { UserEntity } from "./entities/user.entity";
import {
  UserDatabaseException,
  UserNotFoundException,
} from "./exceptions/user.exception";

export type UserSaveResult = Result<User, UserDatabaseException>;
export type UserGetByEmailResult = Result<
  User,
  UserDatabaseException | UserNotFoundException
>;

export class UserInfrastructure implements UserRepository {
  async save(user: User): Promise<UserSaveResult> {
    try {
      const repository =
        DatabaseBootstrap.dataSource.getRepository("UserEntity");
      const userEntity = UserDto.fromDomainToData(user) as UserEntity[];

      const userInserted = await repository.save(userEntity);

      return ok(UserDto.fromDataToDomain(userInserted) as User);
    } catch (error: any) {
      return err(
        new UserDatabaseException(
          "Error to save user",
          ERROR_MESSAGES.USER_INSERT,
          error.stack
        )
      );
    }
  }

  async getUserByEmail(email: string): Promise<UserGetByEmailResult> {
    try {
      const repository =
        DatabaseBootstrap.dataSource.getRepository("UserEntity");
      const user = await repository.findOne({ where: { email } });

      if (!user)
        return err(
          new UserNotFoundException(
            "User not found",
            ERROR_MESSAGES.USER_NOT_FOUND,
            "User not found"
          )
        );

      return ok(
        UserDto.fromDataToDomain(Object.assign(new UserEntity(), user)) as User
      );
    } catch (error: any) {
      return err(
        new UserDatabaseException(
          "Error to get user by email",
          ERROR_MESSAGES.USER_GET_BY_EMAIL,
          error.stack
        )
      );
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const repository =
        DatabaseBootstrap.dataSource.getRepository("UserEntity");
      const user = await repository.findOne({ where: { userId: id } });

      if (!user) return null;

      return UserDto.fromDataToDomain(
        Object.assign(new UserEntity(), user)
      ) as User;
    } catch (error) {
      throw new Error("Error to get user by id");
    }
  }
}
