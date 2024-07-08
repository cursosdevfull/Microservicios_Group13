import { validate } from "uuid";

export enum EGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export class User {
  private readonly userId: string;
  private name: string;
  private readonly email: string;
  private password: string;
  private age: number;
  private gender: EGender;
  private readonly createdAt: Date;
  private updatedAt: Date | undefined;
  private deletedAt: Date | undefined;

  constructor(
    userId: string,
    name: string,
    email: string,
    password: string,
    age: number,
    gender: EGender
  ) {
    if (!validate(userId)) {
      throw new Error("Invalid user id");
    }

    if (!name) {
      throw new Error("Name is required");
    }

    if (name.length < 3) {
      throw new Error("Name must have at least 3 characters");
    }

    if (!email) {
      throw new Error("Email is required");
    }

    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      throw new Error("Invalid email");
    }

    if (!password) {
      throw new Error("Password is required");
    }

    if (
      !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
    ) {
      throw new Error(
        "Password must have at least 8 characters, one uppercase letter, one lowercase letter and one number"
      );
    }

    if (age < 18 || age > 130) {
      throw new Error("Age must be greater than 18 and less than 130");
    }

    this.userId = userId;
    this.name = name;
    this.email = email;
    this.age = age;
    this.gender = gender;
    this.password = password;
    this.createdAt = new Date();
  }

  properties() {
    return {
      userId: this.userId,
      name: this.name,
      email: this.email,
      age: this.age,
      gender: this.gender,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update() {
    if (!this.deletedAt) {
      this.updatedAt = new Date();
    }
  }

  delete() {
    if (!this.deletedAt) {
      this.deletedAt = new Date();
    }
  }
}
