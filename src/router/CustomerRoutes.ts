import { createCustomer, getAllCustomer, getCustomerById,  updateCustomer } from "../controllers/CustomerController";
import BaseRoutes from "./base/BaseRouter";

class CustomerRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', createCustomer);
    this.router.get('/getall', getAllCustomer);
    // this.router.get('/getByProduct/:productId', getCustomerByProduct)
    this.router.get('/getCustomerDetail/:customerId', getCustomerById)
    this.router.post('/update', updateCustomer);
  }
}

export default new CustomerRoutes().router