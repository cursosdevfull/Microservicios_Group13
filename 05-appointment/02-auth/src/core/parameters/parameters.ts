export interface IDatabaseConfig {
  host: string;
  port: number;
  entities: any[];
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  poolSize: number;
  maxQueryExecutionTime: number;
}

export class Parameters {
  static get port() {
    return process.env.PORT ? Number(process.env.PORT) : 3010;
  }

  static get hostname(): string {
    return process.env.HOSTNAME || "localhost";
  }

  static get dbConfig(): IDatabaseConfig {
    return {
      host:
        process.env.DB_HOST ||
        "database-1.cmuv7any6zxa.us-east-1.rds.amazonaws.com",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      entities: [],
      username: process.env.MYSQL_USER || "admin",
      password: process.env.MYSQL_PASSWORD || "3lgiGAnt32024?",
      database: process.env.MYSQL_DATABASE || "appointment",
      synchronize: process.env.DB_SYNC === "true" || true,
      logging: process.env.DB_LOGGING === "true" || false,
      poolSize: process.env.DB_POOL_SIZE
        ? Number(process.env.DB_POOL_SIZE)
        : 10,
      maxQueryExecutionTime: process.env.DB_MAX_QUERY_EXECUTION_TIME
        ? Number(process.env.DB_MAX_QUERY_EXECUTION_TIME)
        : 1000,
    };
  }

  static get USER_BACKEND(): string {
    return process.env.USER_BACKEND || "http://localhost:3000";
  }

  static get ACCESS_TOKEN_SECRET(): string {
    return (
      process.env.ACCESS_TOKEN_SECRET || "1eec19fe-0b50-46db-ba83-e770534e7ff1"
    );
  }

  static get TOKEN_EXPIRATION(): string {
    return process.env.TOKEN_EXPIRATION || "4h";
  }
}
