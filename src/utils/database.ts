import { Sequelize } from "sequelize-typescript";
import { config } from './../config';
import UserModel from "../models/UserModel";
import ProductModel from "../models/ProductModel";
import CustomerModel from "../models/CustomerModel";
import VendorModel from "../models/VendorModel";

class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    this.sequelize = new Sequelize({
        dialect: "postgres",
        username: config.db.username,
        database: config.db.database,
        password: config.db.password,
        host: config.db.host,
        port: config.db.port,
      pool: {
        max: config.db.pool.max,
        min: config.db.pool.min,
        acquire: config.db.pool.acquire,
        idle: config.db.pool.idle
      },
      models: [UserModel,ProductModel,CustomerModel,VendorModel]
    });

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the Database:", err);
      });
  }
}

export default Database;