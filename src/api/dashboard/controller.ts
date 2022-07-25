import { createToken, verifyToken } from './../../shared/token';
import database from '../../loaders/database';
import * as bcrypt from 'bcrypt';
import config from '../../config';
import { ObjectId } from 'mongodb';
import LoggerInstance from '../../loaders/logger';

export async function displayCourses(): Promise<any> {
  let courseDataArray = [];
  const courseData = await (
    await database()
  )
    .collection('courses')
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;

      for (let i = 0; i < result.length; i++) {
        courseDataArray.push(result[i]);
      }
      console.log(courseDataArray);
    });
  return {
    bool: true,
    message: 'Success',
    status: 200,
    data: courseDataArray,
  };
}
