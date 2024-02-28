import { getAllCustomerByProduct, getAllCustomerByProductId, getAllProduct } from "../controllers/ProductController";
import BaseRoutes from "./base/BaseRouter";

class ProductRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/getAll',getAllProduct)
    this.router.get('/getAllCustomerByProduct',getAllCustomerByProduct)
    this.router.get('/getAllCustomerByProductId/:productId',getAllCustomerByProductId)
  }
}

export default new ProductRoutes().router