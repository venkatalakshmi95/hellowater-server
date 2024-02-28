// config
export interface Config {
    serviceName: string;
    port: number;
    loggerLevel: string;
    db: PgConfig;
    mailer:MailConfig;
    secretKey: string;
}

// dbUtils
export interface PgConfig {
    username: string;
    database: string;
    password: string;
    host: string;
    port: number;
    max: number;
    idleTimeoutMillis: number;
    dialect: string,
    pool: {
        max: number,
        min: number,
        acquire: number,
        idle: number
    }
}

// dbUtils
export interface MailConfig {
    host: string;
    port: number;
    user: string;
    pass: string;
    tls:string;
}
