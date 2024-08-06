export class Parameters {
  static get port() {
    return process.env.PORT ? Number(process.env.PORT) : 3006;
  }

  static get hostname(): string {
    return process.env.HOSTNAME || "localhost";
  }

  static get urlServiceAppointmentCreate(): string {
    return (
      process.env.URL_SERVICE_APPOINTMENT_CREATE ||
      "http://localhost:3002/appointment"
    );
  }

  static get urlServiceAuthLogin(): string {
    return (
      process.env.URL_SERVICE_AUTH_LOGIN || "http://localhost:3001/auth/login"
    );
  }

  static get urlServiceRegisterUser(): string {
    return (
      process.env.URL_SERVICE_REGISTER_USER || "http://localhost:3000/user"
    );
  }

  static get urlServiceValidateToken(): string {
    return (
      process.env.URL_SERVICE_VALIDATE_TOKEN ||
      "http://localhost:3001/auth/validate-token"
    );
  }
}
