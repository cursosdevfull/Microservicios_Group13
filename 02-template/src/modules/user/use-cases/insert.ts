import { users } from '../data/user.data';

export interface IInsertUserUseCase {
  id: number;
  name: string;
  email: string;
}

export class InsertUserUseCase {
  constructor() {}

  handle(name: string, email: string): IInsertUserUseCase | null {
    const emailFound = users.some((user) => user.email === email);
    if (!emailFound) {
      const id = users.length + 1;
      users.push({ id, name, email });
      return { id, name, email };
    }

    return null;
  }
}
