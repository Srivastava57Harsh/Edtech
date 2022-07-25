import { createToken, verifyToken } from './../../shared/token';
import database from '../../loaders/database';
import * as bcrypt from 'bcrypt';
import config from '../../config';
import { ObjectId } from 'mongodb';
import LoggerInstance from '../../loaders/logger';

//TODO: Fix empty array
export async function displayCourses(): Promise<any> {
  const courseData = await (await database()).collection('courses').find({}).toArray();
  return {
    bool: true,
    message: 'Success',
    status: 200,
    data: courseData,
  };
}
