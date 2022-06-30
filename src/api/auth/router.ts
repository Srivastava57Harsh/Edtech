import { Router, Request, Response } from 'express';
import LoggerInstance from '../../loaders/logger';
import { createUser, getProfile, verifyUser, loginUser } from './controller';
import { getProfileValidator, loginValidator, signUpValidator, verificationValidator } from './validator';
const authRouter = Router();

async function handleSignUp(req: Request, res: Response) {
  try {
    const result = await createUser(req.body);
    if (result.bool) {
      res.status(201).json({
        message: 'Success',
      });
    } else {
      throw {
        status: 400,
        message: result.message,
      };
    }
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

async function handleLogin(req: Request, res: Response) {
  try {
    const result = await loginUser(req.body.email, req.body.password);
    res.status(result.status).json({
      message: result.message,
      token: result.token ?? '',
    });
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

async function handleVerification(req: Request, res: Response) {
  try {
    const result = await verifyUser(req.body.phone, req.body.status);
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

async function handleGetProfile(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    LoggerInstance.info(token);
    const user = await getProfile(token.substring(7, token.length));
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

authRouter.post('/login', loginValidator, handleLogin);
authRouter.post('/signUp', signUpValidator, handleSignUp);
authRouter.post('/verification', verificationValidator, handleVerification);
authRouter.get('/', getProfileValidator, handleGetProfile);
export default authRouter;
