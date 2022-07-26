import { Router, Request, Response, response } from 'express';
import LoggerInstance from '../../loaders/logger';
import { displayAllCourses, displayUserCourses } from './controller';

const dashboardRouter = Router();

async function handleDisplayAllCourses(req: Request, res: Response) {
  try {
    const response = await displayAllCourses();
    res.status(200).json({
      message: response.message,
      courses: response.data,
    });
    return;
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

async function handleUserCourses(req: Request, res: Response) {
  try {
    const response = await displayUserCourses(req.body.email);
    res.status(200).json({
      message: `${response.message}`,
      data: response.data || null,
    });
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

dashboardRouter.post('/all/courses', handleDisplayAllCourses);
dashboardRouter.post('/user/courses', handleUserCourses);

export default dashboardRouter;
