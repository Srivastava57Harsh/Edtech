import { Router, Request, Response, response } from 'express';
import LoggerInstance from '../../loaders/logger';
import { displayAllCourses, displayUserCourses, getNonTokenCourse, getTokenCourse } from './controller';
import { getCourseValidator } from './validator';

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

async function handleGetCourse(req: Request, res: Response) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      LoggerInstance.info(token);
      const response = await getTokenCourse(token.substring(7, token.length), req.body.courseId);
      res.status(200).json({
        message: `${response.message}`,
        data: response,
      });
    } else {
      const response = await getNonTokenCourse(req.body.courseId);
      res.status(200).json({
        message: `${response.message}`,
        data: response,
      });
    }
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

dashboardRouter.post('/courses', handleDisplayAllCourses);
dashboardRouter.post('/user/courses', handleUserCourses);
dashboardRouter.get('/getCourse', getCourseValidator, handleGetCourse);

export default dashboardRouter;
