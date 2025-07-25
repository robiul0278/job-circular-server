import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { string, ZodError } from 'zod'
import handleZodError from '../errors/handleZodError'
import handleDuplicateError from '../errors/handleDuplicateError';
import handleCastError from '../errors/handleCastError';
import AppError from '../errors/AppError';
import { TErrorSources } from '../interface/error';
import handleValidationError from '../errors/handleValidationError';
import config from '../../config';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  //setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!'
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err?.message
    errorSources = [{
      path:  err?.path as string,
      message: err.message,
    }]
  } else if (err instanceof Error) {
    message = err?.message
    errorSources = [{
      path: "",
      message: err.message,
    }]
  }

  else if (err instanceof Error) {
    message = err.message
  }


  //ultimate return
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === 'development' ? err?.stack : null,
  })
};
