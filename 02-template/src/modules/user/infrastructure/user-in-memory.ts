import { UserModel } from "./models/user.model";

export const users: UserModel[] = [];

export class UserInMemory {
  static async add(user: UserModel): Promise<UserModel> {
    return await new Promise((resolve, reject) => {
      const timeout = Math.floor(Math.random() * 1000) + 1000;

      setTimeout(() => {
        const randomValue = Math.random();
        if (randomValue > 0.5) {
          users.push(user);
          resolve(user);
        } else {
          reject("Error adding user");
        }
      }, timeout);
    });
  }
}
