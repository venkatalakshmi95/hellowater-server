import express, { Application, Request, Response } from "express";
import userRouter from './router/UserRoutes';

import { healthcheck } from './controllers/controller-healthcheck';
import Database from "./utils/database";
import customerRouter from "./router/CustomerRoutes";
import productRoutes from "./router/ProductRoutes";
import vendorRoutes from "./router/vendorRoutes";
class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    this.databaseSync();
  }

  protected databaseSync(): void {
    const db = new Database();
    db.sequelize?.sync({ alter: true });
  }


  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("welcome home");
    });
    this.app.use("/healthcheck", healthcheck);
    this.app.use("/api/v1/user", userRouter);
    this.app.use("/api/v1/customer", customerRouter);
    this.app.use("/api/v1/product", productRoutes);
    this.app.use("/api/v1/vendor", vendorRoutes )
  }
}

export default new App().app;