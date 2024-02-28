import { createVendor, getAllVendor, getVendorByProduct } from "../controllers/VendorController";
import BaseRoutes from "./base/BaseRouter";

class VendorRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', createVendor);
    this.router.get('/getall', getAllVendor);
    this.router.get('/getByProduct/:productId',getVendorByProduct)
  }
}

export default new VendorRoutes().router