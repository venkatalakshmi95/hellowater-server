
import Vendor from "../models/VendorModel";

interface IVendorRepository {
    save(vendor: Vendor): Promise<Vendor>;
    retrieveByProductID(productId: string): Promise<Vendor[]>;
    retrieveAll(): Promise<Vendor[]>;

}

class VendorRepository implements IVendorRepository {

    async retrieveByProductID(productIdParam: string): Promise<Vendor[]> {
        try {

            return await Vendor.findAll({
                where: {
                    productId: productIdParam
                }
            });
        } catch (error) {
            throw new Error("Failed to retrieve Vendors!" + error);
        }
    }

    async save(vendor: Vendor): Promise<Vendor> {
        try {
            return await Vendor.create({
                vendorName: vendor.vendorName,
                email: vendor.email,
                password: vendor.password,
                productId: vendor.productId
            });
        } catch (err) {
            throw new Error("Failed to create Vendor!" + err);
        }
    }

    async retrieveAll(): Promise<Vendor[]> {
        try {

            return await Vendor.findAll();
        } catch (error) {
            throw new Error("Failed to retrieve Vendors!" + error);
        }
    }

}



export default new VendorRepository();
