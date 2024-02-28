import dotenv from 'dotenv';
//DO NOT COMMIT YOUR .env FILE
dotenv.config({ path: '.env' });
import { Config } from './types';

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS,MAIL_TLS } = process.env;


export const config: Config = {
    serviceName: process.env.SERVICENAME || 'Hello water',
    port: Number(process.env.PORT) || 3000,
    loggerLevel: 'debug',
    db: {
        dialect: "postgres",
        username: process.env.DB_USER || 'postgres',
        database: process.env.DB_NAME || 'postgres',
        password: process.env.DB_PASS || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        max: Number(process.env.DB_MAX_CLIENTS) || 20,
        idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS) || 30000,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    secretKey: '',
    mailer: {
        host: MAIL_HOST||"smtp.gmail.com",
        port: Number(MAIL_PORT) || 587,
        user: MAIL_USER || "email@gmail.com",
        pass: MAIL_PASS || "password",
        tls:MAIL_TLS||"yes"
    }
};
