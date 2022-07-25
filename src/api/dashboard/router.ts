import { Router, Request, Response, response } from 'express';
import LoggerInstance from '../../loaders/logger';
import { displayCourses } from './controller';

const dashboardRouter = Router();

async function handleDisplayAllCourses(req: Request, res: Response) {
  try {
    const response = await displayCourses();
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

dashboardRouter.post('/courses', handleDisplayAllCourses);

export default dashboardRouter;
