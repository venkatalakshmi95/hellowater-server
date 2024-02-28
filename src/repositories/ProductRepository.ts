
import Product from "../models/ProductModel";
import VendorModel from "../models/VendorModel";

interface IProductRepository {
    retrieveAll(): Promise<Product[]>;
    getCustomersByProduct(): Promise<Product[]>;
    getCustomersByProductId(productIdParam: string): Promise<Product>;
}

class ProductRepository implements IProductRepository {
    async getCustomersByProduct(): Promise<Product[]> {
        try {

            return await Product.findAll({
                include: [
                    VendorModel
                ]
            }
            )
        } catch (error) {
            throw new Error("Failed to retrieve Products!" + error);
        }
    }

    async getCustomersByProductId(productIdParam: string): Promise<Product> {
        try {

            return await Product.findOne({
                where: {
                    id: productIdParam
                },
                include: [
                    VendorModel
                ]
            }
            ) || new Product();
        } catch (error) {
            throw new Error("Failed to retrieve Products!" + error);
        }
    }


    async retrieveAll(): Promise<Product[]> {
        try {

            return await Product.findAll();
        } catch (error) {
            throw new Error("Failed to retrieve Products!" + error);
        }
    }

}



export default new ProductRepository();
