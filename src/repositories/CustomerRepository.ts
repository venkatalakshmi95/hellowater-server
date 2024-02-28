
//import { includes } from "lodash";
import Customer from "../models/CustomerModel";
import ProductModel from "../models/ProductModel";
import Vendor from "../models/VendorModel";

interface ICustomerRepository {
    save(customer: Customer): Promise<Customer>;
  //  retrieveByProductID(productId: string): Promise<Customer[]>;
    retrieveAll(): Promise<Customer[]>;
    getByCustomerId(customerId: string): Promise<Customer>
}

class CustomerRepository implements ICustomerRepository {
    async getByCustomerId(customerId: string): Promise<Customer> {
        try {

            return await Customer.findOne({
                where: {
                    id: customerId
                },
                include: [
                    ProductModel, Vendor
                ]
            }
            ) || new Customer();
        } catch (error) {
            throw new Error("Failed to retrieve Customer!" + error);
        }
    }
    async updateCustomer(customer: Customer): Promise<boolean> {
        try {

            const updatedCount = await Customer.update(customer, {
                where: { id: customer.id }
            })

            return updatedCount[0] > 0 ? true : false;
        } catch (error) {
            throw new Error("Failed to update Customer!" + error);
        }
    }

    async save(customer: Customer): Promise<Customer> {
        try {
            return await Customer.create({
                customerName: customer.customerName,
                email: customer.email,
                password: customer.password
            });
        } catch (err) {
            throw new Error("Failed to create Customer!" + err);
        }
    }

    async retrieveAll(): Promise<Customer[]> {
        try {

            return await Customer.findAll();
        } catch (error) {
            throw new Error("Failed to retrieve Customers!" + error);
        }
    }

}



export default new CustomerRepository();
