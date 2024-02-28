//import axios from 'axios';
import { Request, Response } from 'express';

/**
 * healthcheck for server
 * @param { Request } req
 * @param { Response } res
 * @returns { void }
 */
export const healthcheck = async(req: Request, res: Response): Promise<void> => {
    // try {
    //     const mobileNumber = 8072964823;
    //     const otp = Math.floor(100000 + Math.random() * 900000);
    //     const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
    //         params: {
    //             authorization: process.env.SMS_API_KEY,
    //             variables_values: `Your OTP is ${otp}`,
    //             route: 'otp',
    //             numbers: mobileNumber
    //         }
    //     });
    //     res.json({ success: true, message: 'OTP sent successfully!'+response });
    // } catch (error) {
    //     console.error('Error sending OTP:', error);
    //     res.status(500).json({ success: false, message: 'Failed to send OTP.'+error });
    // }
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        name: process.env.npm_package_name,
        version: process.env.npm_package_version,
    });
};
