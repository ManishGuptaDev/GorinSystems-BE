import { type Response } from 'express';
import { HttpStatusCode } from '@/types/common.type';

abstract class Api {
    /**
     * 
     * @param res -  The express response object.
     * @param data - The data to be sent in the response.
     * @param statusCode - The HTTP status code for the response.
     * @param success - The success status of the response.
     * @param message - The message accompanying the response.
     * @returns - The express response object with the provided data and status code.
     */
    public send<T>(res: Response, data: T, statusCode: HttpStatusCode = 200, success: boolean = true, message: string = 'success') {
        return res.status(statusCode).json({
            success,
            data,
            message,
        });
    }
}

export default Api