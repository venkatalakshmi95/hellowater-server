import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import productRepo from '../repositories/ProductRepository'
import Product from '../models/ProductModel';
/**
 * sample controller
 * @param { Request } req
 * @param { Response } res
 * @returns { Promise<void> }
 */
export const getAllProduct = async (req: Request, res: Response): Promise<void> => {
    let productsdetails: Product[];
    try {
        productsdetails= await productRepo.retrieveAll();
        console.log(productsdetails);
     
        res.status(200).json({
            status: 'ok',
            message: productsdetails,
            statusCode: 200,
        });
    } catch (error) {
        logger.error(`getAllProduct error: ${error}`);
        res.status(500).json({
            status: 'error',
            message: error,
            statusCode: 500,
        });
    }
};


export const getAllCustomerByProduct = async (req: Request, res: Response): Promise<void> => {
    let productsdetails: Product[];
    try {
        productsdetails= await productRepo.getCustomersByProduct();
        console.log(productsdetails);
     
        res.status(200).json({
            status: 'ok',
            message: productsdetails,
            statusCode: 200,
        });
    } catch (error) {
        logger.error(`getAllProduct error: ${error}`);
        res.status(500).json({
            status: 'error',
            message: error,
            statusCode: 500,
        });
    }
};


export const getAllCustomerByProductId = async (req: Request, res: Response): Promise<void> => {
    let productsdetail: Product;
    try {
        productsdetail= await productRepo.getCustomersByProductId(req.params.productId);
        console.log(productsdetail);
     
        res.status(200).json({
            status: 'ok',
            message: productsdetail,
            statusCode: 200,
        });
    } catch (error) {
        logger.error(`getAllProduct error: ${error}`);
        res.status(500).json({
            status: 'error',
            message: error,
            statusCode: 500,
        });
    }
};