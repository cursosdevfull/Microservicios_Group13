import { validate } from "uuid";

import { User, UserProperties } from "./user";

export class UserFactory {
  static create(props: UserProperties): User {
    if (props.userId && !validate(props.userId)) {
      throw new Error("Invalid user id");
    }

    if (props.name.length < 3)
      throw new Error("Name must be at least 3 characters long");

    if (props.password.length < 6)
      throw new Error("Password must be at least 6 characters long");

    if (!props.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
      throw new Error("Invalid email");

    if (props.roles.length === 0) throw new Error("Roles must be at least one");

    return new User(props);
  }
}
