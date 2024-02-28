import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import vendorRepo from '../repositories/VendorRepository'
import Vendor from '../models/VendorModel';
import User, { UserRole } from '../models/UserModel';
import { createUser } from './UserController';

export const getAllVendor = async (req: Request, res: Response): Promise<void> => {
    let vendorsdetails: Vendor[];
    try {
        vendorsdetails= await vendorRepo.retrieveAll();
        console.log(vendorsdetails);
     
        res.status(200).json({
            status: 'ok',
            message: vendorsdetails,
            statusCode: 200,
        });
    } catch (error) {
        logger.error(`getAllVendor error: ${error}`);
        res.status(500).json({
            status: 'error',
            message: error,
            statusCode: 500,
        });
    }
};


export const getVendorByProduct = async (req: Request, res: Response): Promise<void> => {
    let vendorsdetails: Vendor[];
    try {
        vendorsdetails= await vendorRepo.retrieveByProductID(req.params.productId);
        console.log(vendorsdetails);
     
        res.status(200).json({
            status: 'ok',
            message: vendorsdetails,
            statusCode: 200,
        });
    } catch (error) {
        logger.error(`getAllVendor error: ${error}`);
        res.status(500).json({
            status: 'error',
            message: error,
            statusCode: 500,
        });
    }
};

export const createVendor = async (
    req: Request,
    res: Response
): Promise<void> => {
    let vendor: Vendor;
    try {
        vendor = await vendorRepo.save(req.body);
        const user:User=req.body
        user.userName=vendor.vendorName
        user.userRole=UserRole.VENDOR;
        await createUser(user)
        res.status(200).json({
            status: 'ok',
            message: vendor,
            statusCode: 200,
        });
    } catch (error) {
        logger.error(`createVendor error: ${error}`);
        res.status(500).json({
            status: 'error',
            message: error,
            statusCode: 500,
        });
    }
};
