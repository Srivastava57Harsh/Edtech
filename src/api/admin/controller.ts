import { createToken, verifyToken } from './../../shared/token';
import database from '../../loaders/database';
import Admin, { LoginResponse } from './model';
import * as bcrypt from 'bcrypt';
import config from '../../config';
import { ObjectId } from 'mongodb';
import LoggerInstance from '../../loaders/logger';

export async function loginAdmin(email: string, password: string): Promise<LoginResponse> {
  try {
    const userData = await (await database()).collection('admin').findOne({ email: email });
    if (!userData) {
      return {
        message: 'Admin does not exist, Sign Up instead',
        status: 404,
      };
    } else {
      if (userData.isVerified) {
        if (!userData.isLoggedin) {
          if (bcrypt.compareSync(password, userData.password)) {
            const userStatus = (await database()).collection('users');
            await userStatus.updateOne({ email: email }, { $set: { isLoggedin: true } });
            return {
              message: 'Login Successful',
              status: 200,
              accessToken: createToken({ id: userData._id.toString() }, config.jwtSecret, '30d'),
              refreshToken: createToken({ id: userData._id.toString() }, config.jwtSecret, '1y'),
            };
          } else {
            return {
              message: 'Password does not match',
              status: 401,
            };
          }
        } else {
          return {
            message: 'Admin Already Logged into some other device. Please log out from all other devices.',
            status: 406,
          };
        }
      } else {
        return {
          message: 'Admin is not Verified',
          status: 401,
        };
      }
    }
  } catch (e) {
    LoggerInstance.error(e);
    return {
      message: `Something went wrong, [ERROR : ${e}]`,
      status: 500,
    };
  }
}

export async function logoutAdmin(email: string): Promise<any> {
  try {
    const userData = await (await database()).collection('admin').findOne({ email: email });
    if (!userData) {
      return {
        message: 'Admin does not exist, Sign Up instead',
        status: 404,
      };
    } else {
      if (userData.isLoggedin) {
        const userStatus = (await database()).collection('users');
        await userStatus.updateOne({ email: email }, { $set: { isLoggedin: false } });
        return {
          message: 'Admin successfully Logged out.',
          status: 200,
        };
      } else {
        return {
          message: 'Admin is already logged out.',
          status: 406,
        };
      }
    }
  } catch (e) {
    LoggerInstance.error(e);
    return {
      message: `Something went wrong, [ERROR : ${e}]`,
      status: 500,
    };
  }
}

export async function getProfile(token: string): Promise<Admin> {
  let id: string;
  try {
    id = verifyToken(token, config.jwtSecret).id;
  } catch (e) {
    LoggerInstance.error(e);
    throw {
      message: 'Unauthorized Access',
      status: 401,
    };
  }
  const user = await (await database())
    .collection('admin')
    .findOne({ _id: new ObjectId(id) }, { projection: { email: 1, name: 1, phone: 1 } });
  if (!user) {
    throw {
      message: 'Admin does not exist',
      status: 404,
    };
  }
  return user;
}

export async function addCourse(course: any): Promise<any> {
  try {
    await (await database()).collection('courses').insertOne(course);
    return {
      bool: true,
      message: 'Success',
      status: 200,
    };
  } catch (e) {
    LoggerInstance.error(e);
    return {
      bool: false,
      message: 'Course could not be added.',
      status: 400,
    };
  }
}