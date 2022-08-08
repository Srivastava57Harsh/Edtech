import database from '../../loaders/database';
import { ObjectId } from 'mongodb';
import { verifyToken } from '../../shared/token';
import LoggerInstance from '../../loaders/logger';
import config from '../../config';

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

export async function getTokenCourse(token: string, courseId: string): Promise<any> {
  const courseEntity = await (await database()).collection('courses').findOne({ _id: new ObjectId(courseId) });
  if (!courseEntity) {
    throw {
      message: 'Course does not exist',
      status: 404,
    };
  }

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
  const user = await (await database()).collection('users').findOne({ _id: new ObjectId(id) });
  if (!user) {
    throw {
      message: 'User does not exist',
      status: 404,
    };
  } else {
    const activityStatus = await (await database()).collection('userStatus').findOne({ email: user.email });
    if (!activityStatus) {
      throw {
        message: 'User does not exist, Sign Up instead',
        status: 404,
      };
    }
    if (token === activityStatus.currentToken) {
      if (user.courses.includes(courseId)) {
        return {
          message: 'Success, Course Details Below',
          status: 200,
          courseDetails: courseEntity,
        };
      } else {
        return {
          message: 'Success, Course Details Below',
          status: 200,
          courseDetails: {
            _id: courseEntity._id,
            name: courseEntity.name,
            price: courseEntity.price,
            slug: courseEntity.slug,
            imageURL: courseEntity.imageURL,
            description: courseEntity.description,
          },
        };
      }
    } else {
      throw {
        message: 'Unauthorized Access',
        status: 401,
      };
    }
  }
}

export async function getNonTokenCourse(courseId: string): Promise<any> {
  const courseEntity = await (await database()).collection('courses').findOne({ _id: new ObjectId(courseId) });
  if (!courseEntity) {
    throw {
      message: 'Course does not exist',
      status: 404,
    };
  } else {
    return {
      message: 'Success, Course Details Below',
      status: 200,
      courseDetails: {
        _id: courseEntity._id,
        name: courseEntity.name,
        price: courseEntity.price,
        slug: courseEntity.slug,
        imageURL: courseEntity.imageURL,
        description: courseEntity.description,
      },
    };
  }
}
