import BaseRoutes from "./base/BaseRouter";
import { createUser, getAllUser, loginUser } from '../controllers/UserController';
import { verifyAuth } from "../utils/auth";

class TestRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', createUser);
    this.router.get('/getall',verifyAuth, getAllUser);
    this.router.post('/signin',loginUser)
  }
}

export default new TestRoutes().router