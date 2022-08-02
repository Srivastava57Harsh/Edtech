import { NextFunction, Request, Response } from 'express';
import LoggerInstance from '../../loaders/logger';
import { getProfileSchema } from '../auth/schema';
import { getCourseSchema } from './schema';

export async function getCourseValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    req.body = await getCourseSchema.validate(req.body, { stripUnknown: true });
    if (req.headers.authorization) {
      req.headers = await getProfileSchema.validate(req.headers);
    }
    next();
  } catch (e) {
    LoggerInstance.error(e);
    res.status(422).json({
      message: 'Validation Failed',
      error: e.errors.map(error => error),
    });
  }
}
