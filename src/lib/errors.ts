import { HttpStatusCode } from '@/types/common.type';
import httpStatus from 'http-status';

export interface IApiError extends Error {
  statusCode: HttpStatusCode;
  rawErrors?: string[];
}

export class ApiError extends Error implements IApiError {
  statusCode: HttpStatusCode;
  rawErrors: string[];
  constructor(statusCode: HttpStatusCode, message: string, rawErrors?: string[]) {
    super(message);
    this.statusCode = statusCode;
    this.rawErrors  = [];

    if (rawErrors) {
      this.rawErrors = rawErrors;
    }
    Error.captureStackTrace(this, this.constructor);
  }
}

export class HttpBadRequestError extends ApiError {
  constructor(message: string, errors: string[]) {
    super(httpStatus.BAD_REQUEST, message, errors);
  }
}

export class HttpInternalServerError extends ApiError {
  constructor(message: string, errors?: string[]) {
    super(httpStatus.INSUFFICIENT_STORAGE, message, errors);
  }
}

export class HttpUnAuthorizedError extends ApiError {
  constructor(message: string) {
    super(httpStatus.UNAUTHORIZED, message);
  }
}

export class HttpNotFoundError extends ApiError {
  constructor(message: string, errors?: string[]) {
    super(httpStatus.NOT_FOUND, message, errors);
  }
}
