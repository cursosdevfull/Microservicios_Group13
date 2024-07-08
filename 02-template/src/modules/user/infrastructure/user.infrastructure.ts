import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/user";
import { InsertUserDto } from "./dtos/insert-user.dto";
import { UserInsertDatabaseException } from "./exceptions/user.exception";
import { UserModel } from "./models/user.model";
import { UserInMemory } from "./user-in-memory";

export type InsertResult = UserModel | UserInsertDatabaseException;

export class UserInfrastructure implements UserRepository {
  async insert(user: User): Promise<InsertResult> {
    try {
      return await UserInMemory.add(InsertUserDto.fromDomainToData(user));
    } catch (error: unknown) {
      console.error(error);
      return new UserInsertDatabaseException(
        (error as Error).message,
        (error as Error).stack
      );
    }
  }
}
