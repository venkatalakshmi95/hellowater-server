import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import customerRepo from '../repositories/CustomerRepository'
import {createUser} from '../controllers/UserController'
import Customer from '../models/CustomerModel';
import User, { UserRole } from '../models/UserModel';

export const getAllCustomer = async (req: Request, res: Response): Promise<void> => {
    let customersdetails: Customer[];
    try {
        customersdetails= await customerRepo.retrieveAll();
        console.log(customersdetails);
     
        res.status(200).json({
            status: 'ok',
            message: customersdetails,
            statusCode: 200,
        });
    } catch (error) {
        logger.error(`getAllCustomer error: ${error}`);
        res.status(500).json({
            status: 'error',
            message: error,
            statusCode: 500,
        });
    }
};

export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
    let customersdetail: Customer;
    try {
        customersdetail= await customerRepo.getByCustomerId(req.params.customerId);
        console.log(customersdetail);
     
        res.status(200).json({
            status: 'ok',
            message: customersdetail,
            statusCode: 200,
        });
    } catch (error) {
        logger.error(`getAllCustomer error: ${error}`);
        res.status(500).json({
            status: 'error',
            message: error,
            statusCode: 500,
        });
    }
};

export const updateCustomer = async (
    req: Request,
    res: Response
): Promise<void> => {
   
    try {
        const result = await customerRepo.updateCustomer(req.body);
        res.status(200).json({
            status: 'ok',
            message: result,
            statusCode: 200,
        });
    } catch (error) {
        logger.error(`createCustomer error: ${error}`);
        res.status(500).json({
            status: 'error',
            message: error,
            statusCode: 500,
        });
    }
};

export const createCustomer = async (
    req: Request,
    res: Response
): Promise<void> => {
    let customer: Customer;
    try {
        customer = await customerRepo.save(req.body);
        const user:User=req.body
        user.userName=customer.customerName
        user.userRole=UserRole.CUSTOMER;
        await createUser(user)
        res.status(200).json({
            status: 'ok',
            message: customer,
            statusCode: 200,
        });
    } catch (error) {
        logger.error(`createCustomer error: ${error}`);
        res.status(500).json({
            status: 'error',
            message: error,
            statusCode: 500,
        });
    }
};
