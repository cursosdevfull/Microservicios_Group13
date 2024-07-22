import { v4 as uuidv4 } from "uuid";

export interface UserPropertiesRequired {
  name: string;
  email: string;
  password: string;
  roles: any[];
}

export interface UserPropertiesOptionals {
  userId: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export type UserProperties = UserPropertiesRequired &
  Partial<UserPropertiesOptionals>;

export type UserPropertiesUpdate = Partial<
  Omit<UserPropertiesRequired, "email"> &
    Pick<UserPropertiesOptionals, "refreshToken">
>;

export class User {
  private readonly userId: string;
  private name: string;
  private readonly email: string;
  private password: string;
  private roles: any[];
  private refreshToken: string;
  private readonly createdAt: Date;
  private updatedAt: Date | undefined;
  private deletedAt: Date | undefined;

  constructor(props: UserProperties) {
    Object.assign(this, props);
    this.userId = props.userId ? props.userId : uuidv4();
    this.createdAt = props.createdAt ? props.createdAt : new Date();
    this.refreshToken = props.refreshToken ? props.refreshToken : uuidv4();
  }

  get properties() {
    return {
      userId: this.userId,
      name: this.name,
      email: this.email,
      roles: this.roles,
      refreshToken: this.refreshToken,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(props: UserPropertiesUpdate) {
    Object.assign(this, props);
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }
}
