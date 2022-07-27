import database from '../../loaders/database';
import { ObjectId } from 'mongodb';

//TODO: Fix empty array
export async function displayAllCourses(): Promise<any> {
  const courseData = await (await database()).collection('courses').find({}).toArray();
  return {
    bool: true,
    message: 'Success',
    status: 200,
    data: courseData,
  };
}

export async function displayUserCourses(email: string): Promise<any> {
  const userExists = await (await database()).collection('users').findOne({ email: email });
  if (!userExists) {
    throw {
      bool: false,
      message: 'User does not exist. Please sign up!',
      status: 400,
    };
  } else {
    if (userExists.courses.length > 0) {
      let courseData = [];
      for (let i = 0; i < userExists.courses.length; i++) {
        const courseEntity = await (await database())
          .collection('courses')
          .findOne({ _id: new ObjectId(userExists.courses[i]) });
        if (!courseEntity) {
          continue;
        } else {
          courseData.push(courseEntity);
        }
      }

      return {
        bool: true,
        message: 'Success, Courses are listed below.',
        status: 200,
        data: courseData,
      };
    } else {
      throw {
        message: 'No courses are bought by the user',
        status: 404,
      };
    }
  }
}
