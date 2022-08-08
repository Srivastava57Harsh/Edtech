import { createToken, verifyToken } from './../../shared/token';
import database from '../../loaders/database';
import LoggerInstance from '../../loaders/logger';
import User, { FetchCourse, LoginResponse } from './model';
import * as bcrypt from 'bcrypt';
import config from '../../config';
import { ObjectId } from 'mongodb';
import { access } from 'fs';

export async function createUser(user: User): Promise<any> {
  const userStatus = {
    currentToken: 'NO-TOKEN-GENRATED',
    email: '',
  };
  const userExists = await (await database()).collection('users').findOne({ email: user.email });
  if (userExists) {
    throw {
      bool: false,
      message: 'User already exists',
      status: 400,
    };
  } else {
    try {
      const saltData = bcrypt.genSaltSync(config.salt);
      user.password = bcrypt.hashSync(user.password, saltData);
      user.isVerified = true;
      user.isLoggedin = false;
      user.courses = [];
      userStatus.email = user.email;
      await (await database()).collection('users').insertOne(user);
      await (await database()).collection('userStatus').insertOne(userStatus);
      return {
        bool: true,
        message: 'Success, User created.',
        status: 200,
      };
    } catch (e) {
      LoggerInstance.error(e);
      throw {
        bool: false,
        message: 'User could not be created',
        status: 400,
      };
    }
  }
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const userData = await (await database()).collection('users').findOne({ email: email });
  if (!userData) {
    throw {
      message: 'User does not exist, Sign Up instead',
      status: 404,
    };
  } else {
    if (userData.isVerified) {
      if (bcrypt.compareSync(password, userData.password)) {
        if (!userData.isLoggedin) {
          const userStatus = (await database()).collection('users');
          await userStatus.updateOne({ email: email }, { $set: { isLoggedin: true } });
          const activityStatus = (await database()).collection('userStatus');
          await activityStatus.updateOne(
            { email: email },
            { $set: { currentToken: createToken({ id: userData._id.toString() }, config.jwtSecret, '30d') } },
          );
          return {
            message: 'Login Successful',
            status: 200,
            accessToken: createToken({ id: userData._id.toString() }, config.jwtSecret, '30d'),
            refreshToken: createToken({ id: userData._id.toString() }, config.jwtSecret, '1y'),
          };
        } else {
          throw {
            message: 'User Already Logged into some other device. Please log out from all other devices.',
            status: 406,
          };
        }
      } else {
        throw {
          message: 'Password does not match',
          status: 401,
        };
      }
    } else {
      throw {
        message: 'User is not Verified',
        status: 401,
      };
    }
  }
}

export async function logoutUser(email: string): Promise<any> {
  const userData = await (await database()).collection('users').findOne({ email: email });
  if (!userData) {
    throw {
      message: 'User does not exist, Sign Up instead',
      status: 404,
    };
  } else {
    if (userData.isLoggedin) {
      const userStatus = (await database()).collection('users');
      await userStatus.updateOne({ email: email }, { $set: { isLoggedin: false } });
      const activity = (await database()).collection('userStatus');
      await activity.updateOne(
        { email: email },
        { $set: { currentToken: `default:${bcrypt.hashSync(email, bcrypt.genSaltSync(config.salt))}` } },
      );
      return {
        message: 'User successfully Logged out.',
        status: 200,
      };
    } else {
      throw {
        message: 'User is already logged out.',
        status: 406,
      };
    }
  }
}

export async function getProfile(token: string): Promise<User> {
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
    .collection('users')
    .findOne({ _id: new ObjectId(id) }, { projection: { email: 1, name: 1, phone: 1, id: 1 } });
  if (!user) {
    throw {
      message: 'User does not exist',
      status: 404,
    };
  }
  const activityStatus = await (await database()).collection('userStatus').findOne({ email: user.email });
  if (!activityStatus) {
    throw {
      message: 'User does not exist, Sign Up instead',
      status: 404,
    };
  }
  if (token === activityStatus.currentToken) {
    return user;
  } else {
    throw {
      message: 'Unauthorized Access',
      status: 401,
    };
  }
}

export async function forgotPassword(email: string, secretQuestion: string, secretAnswer: string): Promise<any> {
  const userExists = await (await database()).collection('users').findOne({ email: email });
  if (!userExists) {
    throw {
      bool: false,
      message: 'User does not exist. Please sign up!',
      status: 400,
    };
  } else {
    if (userExists.secretQuestion === secretQuestion && userExists.secretAnswer === secretAnswer) {
      return {
        bool: true,
        message: 'Success, User found. Kindly reset your password.',
        status: 200,
        resetToken: createToken({ id: userExists._id.toString() }, config.jwtSecret + userExists.password, '10m'),
        userId: userExists._id,
      };
    } else {
      throw {
        bool: false,
        message: 'Question and Answers do not match. Please try Again.',
        status: 401,
      };
    }
  }
}

export async function resetPassword(id: string, token: string, newPassword: string): Promise<any> {
  const userExists = await (await database()).collection('users').findOne({ _id: new ObjectId(id) });
  if (!userExists) {
    throw {
      bool: false,
      message: 'User does not exist. Please sign up!',
      status: 400,
    };
  } else {
    let verification: string;
    try {
      verification = verifyToken(token, config.jwtSecret + userExists.password);
      const userStatus = (await database()).collection('users');
      const saltData = bcrypt.genSaltSync(config.salt);
      newPassword = bcrypt.hashSync(newPassword, saltData);
      await userStatus.updateOne({ _id: new ObjectId(id) }, { $set: { password: newPassword } });
      await userStatus.updateOne({ _id: new ObjectId(id) }, { $set: { isLoggedin: false } });
      return {
        bool: true,
        message: 'Password successfully changed.',
        status: 200,
      };
    } catch (e) {
      LoggerInstance.error(e);
      throw {
        message: 'Unauthorized Access',
        status: 401,
      };
    }
  }
}
