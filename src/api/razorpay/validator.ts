import { NextFunction, Request, Response } from 'express';
import LoggerInstance from '../../loaders/logger';
import { getProfileSchema } from '../auth/schema';
import { createOrderSchema, orderStatusSchema } from './schema';

export async function createOrderValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    req.body = await createOrderSchema.validate(req.body, { stripUnknown: true });
    req.headers = await getProfileSchema.validate(req.headers);

    next();
  } catch (e) {
    LoggerInstance.error(e);
    res.status(422).json({
      message: 'Validation Failed',
      error: e.errors.map(error => error),
    });
  }
}

export async function orderStatusValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    req.body = await orderStatusSchema.validate(req.body, { stripUnknown: true });
    next();
  } catch (e) {
    LoggerInstance.error(e);
    res.status(422).json({
      message: 'Validation Failed',
      error: e.errors.map(error => error),
    });
  }
}
