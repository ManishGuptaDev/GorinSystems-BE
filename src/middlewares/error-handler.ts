import { ErrorRequestHandler, type NextFunction, type Request, type Response } from "express";
import { Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import { ApiError } from "@/lib/errors";

interface ErrorBody {
  success: false;
  message: string;
  rawErrors?: string[];
  stack?: string;
}

export const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
      const statusCode =
        error.statusCode || error instanceof Prisma.PrismaClientKnownRequestError
          ? httpStatus.BAD_REQUEST
          : httpStatus.INTERNAL_SERVER_ERROR;
      const message = error.message || httpStatus[statusCode];
      error = new ApiError(statusCode, message, err.stack);
    }
    next(error);
  };

export const errorHandler: ErrorRequestHandler  = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status: number = err.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR;
  const errorBody: ErrorBody = {
    success: false,
    message: err.message,
    rawErrors: err.rawErrors,
  };

  res.status(status).send(errorBody);
};
