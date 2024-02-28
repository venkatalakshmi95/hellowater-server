import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/UserModel';

export const SECRET_KEY: Secret = 'hellowater';

export interface CustomRequest extends Request {
    token: string | JwtPayload
}

export const auth = async (token: any) => {
    try {
        const decoded: any = jwt.verify(token, SECRET_KEY);
        if (decoded.exp <= Date.now())
            throw new Error('Access Expired');

        return await User.findByPk(decoded._id);
    } catch (err) {
        throw new Error('Please authenticate' + err);
    }
};

export const createToken = (foundUser: User, res: Response) => {
    try {
        const now = new Date();
        const expires_in = now.setHours(now.getHours() + 1);
        console.log("expires_in"+ expires_in)
        const token = jwt.sign({ _id: foundUser.id?.toString(), name: foundUser.userName }, SECRET_KEY, {
            expiresIn: expires_in,
        });

        return token;
    } catch (error) {
        res.status(500).send('error while authenticate');
    }
}


/**
 *
 * @param req
 */
const getToken = (req: Request): string => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) throw new Error('No token, authorization denied');

    return token;
};

/**
 *
 * @param req
 * @param res
 * @param next
 */
export const verifyAuth = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    if (req.method == 'OPTIONS') return next();
    const token = getToken(req);

    try {
        const authUser = await auth(token);
        if (authUser) {
            res.locals = { authUser };
            return next();
        } else {
            return res.status(401).json('authorization denied');
        }

    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' + err });
    }
};
