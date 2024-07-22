export interface AuthPropertiesRequired {
  email: string;
  password: string;
}

export class Auth {
  private readonly email: string;
  private readonly password: string;

  constructor(props: AuthPropertiesRequired) {
    Object.assign(this, props);
  }

  get properties() {
    return {
      email: this.email,
      password: this.password,
    };
  }
}
