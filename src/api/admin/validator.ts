import { NextFunction, Request, Response } from 'express';
import LoggerInstance from '../../loaders/logger';
import { CourseSchema, courseDataSchema, getAdminSchema, loginSchema } from './schema';

export async function loginValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    req.body = await loginSchema.validate(req.body, { stripUnknown: true });
    next();
  } catch (e) {
    LoggerInstance.error(e);
    res.status(422).json({
      message: 'Validation Failed',
      error: e.errors.map(error => error),
    });
  }
}

export async function getAdminValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    req.body = await getAdminSchema.validate(req.headers);
    next();
  } catch (e) {
    LoggerInstance.error(e);
    res.status(422).json({
      message: 'Token Required',
      error: e.errors.map(error => error),
    });
  }
}

export async function addCourseValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    req.body = await CourseSchema.validate(req.body, { stripUnknown: true });
    for (let i = 0; i < req.body.data.length; i++) {
      await courseDataSchema.validate(req.body.data[i], { stripUnknown: true });
    }

    next();
  } catch (e) {
    LoggerInstance.error(e);
    res.status(422).json({
      message: 'Validation field',
      error: e.errors.map(error => error),
    });
  }
}
