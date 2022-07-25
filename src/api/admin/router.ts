import { Router, Request, Response } from 'express';
import LoggerInstance from '../../loaders/logger';
import { addCourse, getAdmin, loginAdmin, logoutAdmin } from './controller';
import { addCourseValidator, getAdminValidator, loginValidator } from './validator';
const adminAuthRouter = Router();

async function handleLogin(req: Request, res: Response) {
  try {
    const result = await loginAdmin(req.body.email, req.body.password);
    res.status(result.status).json({
      message: result.message,
      accessToken: result.accessToken ?? '',
      refreshToken: result.refreshToken ?? '',
    });
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

async function handleLogout(req: Request, res: Response) {
  try {
    const result = await logoutAdmin(req.body.email);
    res.status(result.status).json({
      message: result.message,
    });
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

async function handlegetAdmin(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    LoggerInstance.info(token);
    const user = await getAdmin(token.substring(7, token.length));
    res.status(200).json({
      message: 'Success',
      data: user,
    });
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

async function handleAddCourse(req: Request, res: Response) {
  try {
    const addCoursestatus = await addCourse(req.body);
    res.status(200).json({
      message: addCoursestatus.message,
    });
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

adminAuthRouter.post('/login', loginValidator, handleLogin);
adminAuthRouter.post('/logout', handleLogout);
adminAuthRouter.get('/getAdmin', getAdminValidator, handlegetAdmin);
adminAuthRouter.post('/addCourse', addCourseValidator, handleAddCourse);

export default adminAuthRouter;
