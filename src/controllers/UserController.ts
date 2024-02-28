import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import userRepo from '../repositories/UserRepository'
import User from '../models/UserModel';
import { createToken } from '../utils/auth';
import bcrypt from 'bcrypt';

/**
 * sample controller
 * @param { Request } req
 * @param { Response } res
 * @returns { Promise<void> }
 */
export const getAllUser = async (req: Request, res: Response): Promise<void> => {
    let usersdetails: User[];
    try {
        usersdetails = await userRepo.retrieveAll();
        console.log(usersdetails);

        res.status(200).json({
            status: 'ok',
            message: usersdetails,
            statusCode: 200,
        });
    } catch (error) {
        logger.error(`getAllUser error: ${error}`);
        res.status(500).json({
            status: 'error',
            message: error,
            statusCode: 500,
        });
    }
};
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    let user: User;
    try {
        const reqUser = req.body;
        user = await userRepo.findone(reqUser);
        console.log(user);
        const password = user.password ? user.password : '';
        const isMatch = bcrypt.compareSync(reqUser.password, password);
        if (isMatch) {
            const token: any = createToken(user, res);
            logger.info("token", token)
            res.cookie("token", token);
            res.status(200).json({
                status: 'ok',
                message: user,
                statusCode: 200,
            });
        }
    } catch (error) {
        logger.error(`getAllUser error: ${error}`);
        res.status(500).json({
            status: 'error',
            message: error,
            statusCode: 500,
        });
    }
};

/**
 * sample controller using transaction
 * @param { Request } req
 * @param { Response } res
 * @returns { Promise<void> }
 */
export const createUser = async (newUser: User): Promise<void> => {
    try {
        await userRepo.save(newUser);
    } catch (error) {
        logger.error(`createUser error: ${error}`);
        throw new Error("Error  = " + error)
    }
};
